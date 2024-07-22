import React, { forwardRef, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import Swal from 'sweetalert2';
import '../styles/CreateNewsModal.css';

const CreateNewsModal = forwardRef(({ onClose, isClosing, pageTypes }, ref) => {
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [typeId, setTypeId] = useState('');
  const { auth } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newsData = {
      summary,
      content,
      file: '', // Lascia il file come stringa vuota per ora
      typeId
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/pages`, newsData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Pagina creata con successo!',
          showConfirmButton: false,
          timer: 2000, // Durata di 2 secondi
        });
        onClose();
        setTimeout(() => {
          window.location.reload(); // Ricarica la pagina per mostrare la nuova news
        }, 2000); // Attendere 2 secondi prima di ricaricare
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Errore nella creazione della pagina',
          text: 'Si è verificato un problema, riprova più tardi.',
        });
      }
    } catch (error) {
      console.error('Error creating news:', error);
      Swal.fire({
        icon: 'error',
        title: 'Errore nella creazione della pagina',
        text: error.response ? error.response.data.message : 'Si è verificato un problema, riprova più tardi.',
      });
    }
  };

  return (
    <div className={`modal-overlay ${isClosing ? 'fadeOut' : ''}`}>
      <div className={`modal-content ${isClosing ? 'scaleOut' : ''}`} ref={ref}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Modal per creare una news</h2>
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
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="file">File</label>
            <input type="file" id="file" name="file" />
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
          <button type="submit">Create News</button>
        </form>
      </div>
    </div>
  );
});

export default CreateNewsModal;
