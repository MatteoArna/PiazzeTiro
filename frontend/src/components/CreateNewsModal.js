import React, { forwardRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { showAlert } from '../components/Alert'; // Importa il nuovo componente Alert
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importa lo stile di React Quill
import '../styles/CreateNewsModal.css';

const CreateNewsModal = forwardRef(({ onClose, isClosing, pageTypes, editPage }, ref) => {
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [typeId, setTypeId] = useState('');
  const { auth } = useAuth();

  useEffect(() => {
    if (editPage) {
      setSummary(editPage.summary);
      setContent(editPage.content);
      setTypeId(editPage.typeId);
      if (editPage.file) {
        setFile(editPage.file);
        setFilePreview(`${process.env.REACT_APP_API_URL}/${editPage.file}`);
      }
    }
  }, [editPage]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('summary', summary);
    formData.append('content', content);
    formData.append('typeId', typeId);
    if (file) {
      formData.append('file', file);
    }

    try {
      const url = editPage 
        ? `${process.env.REACT_APP_API_URL}/pages/${editPage.id}`
        : `${process.env.REACT_APP_API_URL}/pages`;
      const method = editPage ? 'put' : 'post';

      const response = await axios[method](url, formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201 || response.status === 200) {
        showAlert('success', editPage ? 'Pagina modificata con successo!' : 'Pagina creata con successo!');
        onClose();
        setTimeout(() => {
          window.location.reload(); // Ricarica la pagina per mostrare la nuova news
        }, 2000); // Attendere 2 secondi prima di ricaricare
      } else {
        showAlert('error', 'Errore nella creazione della pagina', 'Si è verificato un problema, riprova più tardi.');
      }
    } catch (error) {
      console.error('Error creating news:', error);
      showAlert('error', 'Errore nella creazione della pagina', error.response ? error.response.data.message : 'Si è verificato un problema, riprova più tardi.');
    }
  };

  return (
    <div className={`modal-overlay ${isClosing ? 'fadeOut' : ''}`}>
      <div className={`modal-content ${isClosing ? 'scaleOut' : ''}`} ref={ref}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>{editPage ? 'Modifica News' : 'Crea News'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="summary">Summary</label>
            <input
              type="text"
              id="summary"
              name="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <ReactQuill
              value={content}
              onChange={setContent}
              theme="snow"
              modules={{
                toolbar: [
                  [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                  [{size: []}],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{'list': 'ordered'}, {'list': 'bullet'}, 
                   {'indent': '-1'}, {'indent': '+1'}],
                  ['clean']
                ],
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              name="type"
              value={typeId}
              onChange={(e) => setTypeId(e.target.value)}
              required
            >
              <option value="">Select Type</option>
              {pageTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.type}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="file">File</label>
            <input type="file" id="file" name="file" onChange={handleFileChange} />
            {filePreview && (
              file.type.startsWith('image/') ? (
                <img src={filePreview} alt="Preview" className="file-preview" />
              ) : (
                <a href={filePreview} download={file.name} className="file-download">Download File</a>
              )
            )}
          </div>
          <button type="submit">{editPage ? 'Modifica News' : 'Crea News'}</button>
        </form>
      </div>
    </div>
  );
});

export default CreateNewsModal;
