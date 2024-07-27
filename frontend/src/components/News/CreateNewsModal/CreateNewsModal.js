import React, { forwardRef, useState, useEffect } from 'react';
import { showAlert } from '../../Alert';

// Components
import Modal from '../../Modal/Modal';

// Hooks
import usePages from '../../../hooks/usePages';

// Styles
import 'react-quill/dist/quill.snow.css';

// Other
import ReactQuill from 'react-quill';

const CreateNewsModal = forwardRef(({ onClose, onSubmit, page }, ref) => {
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [typeId, setTypeId] = useState('');

  const { pageTypes } = usePages();

  useEffect(() => {
    if (page) {
      setSummary(page.summary);
      setContent(page.content);
      setTypeId(page.typeId);
    }
  }, [page]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const pageData = new FormData();
      pageData.append('summary', summary);
      pageData.append('content', content);
      pageData.append('typeId', typeId);

      // Aggiungi il file solo se esiste e se non stiamo modificando una pagina esistente con un file non modificato
      if (file) {
        pageData.append('file', file);
      }

      // Debug: Log FormData values
      for (let [key, value] of pageData.entries()) {
        console.log(`${key}: ${value}`);
      }

      onSubmit(pageData);
      onClose();
    } catch (error) {
      console.error('Error saving news:', error);
      showAlert('error', 'Errore nel salvataggio della pagina', error.response ? error.response.data.message : 'Si è verificato un problema, riprova più tardi.');
    }
  };

  return (
    <Modal title={page ? 'Modifica News' : 'Crea News'} isOpen={true} onClose={onClose}>
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
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                ['clean']
              ],
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          {pageTypes.length > 0 ? (
            <select
              id="type"
              name="type"
              value={typeId}
              onChange={(e) => setTypeId(e.target.value)}
              required
              className="custom-select"
            >
              <option value="">Select Type</option>
              {pageTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.type}
                </option>
              ))}
            </select>
          ) : (
            <p>Loading types...</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="file">File</label>
          <input type="file" id="file" name="file" onChange={handleFileChange} className="custom-file-input" />
        </div>
        <button type="submit">{page ? 'Modifica News' : 'Crea News'}</button>
      </form>
    </Modal>
  );
});

export default CreateNewsModal;
