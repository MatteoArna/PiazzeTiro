import React, { useEffect, useState } from "react";

// Components
import Modal from "../../Modal/Modal";

// Hooks
import useHeadquarter from "../../../hooks/useHeadquarter";
import { useAuth } from '../../../hooks/useAuth';

// Styles
import 'react-quill/dist/quill.snow.css';

// Other
import ReactQuill from "react-quill";

const CreateInfrastructureModal = ({ onClose, onSubmit, infrastructure }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [headQuarter, setHeadQuarter] = useState('');
    const [status, setStatus] = useState('');

    const { auth } = useAuth();
    const { headquarters } = useHeadquarter(auth.token);

    useEffect(() => {
        if (infrastructure) {
            setName(infrastructure.name);
            setDescription(infrastructure.description);
            setPrice(infrastructure.price);
            setHeadQuarter(infrastructure.headQuarter);
            setStatus(infrastructure.status);
        }
    }, [infrastructure]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!name || !description || !price || !headQuarter || !status) {
            alert('Tutti i campi sono obbligatori!');
            return;
        }

        const data = {
            name,
            description,
            price,
            headquarterId: headQuarter,
            statusId: status
        };

        onSubmit(data);
        onClose();
    };

    return (
        <Modal title={infrastructure ? 'Modifica Infrastruttura' : 'Crea Infrastruttura'} isOpen={true} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Descrizione</label>
                    <ReactQuill
                        value={description}
                        onChange={setDescription}
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
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Prezzo/h</label>
                    <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="headQuarter">Sede</label>
                    <select id="headQuarter" value={headQuarter} onChange={(e) => setHeadQuarter(e.target.value)} required>
                        <option value="">Seleziona una sede</option>
                        {headquarters.map((headquarter) => (
                            <option key={headquarter.id} value={headquarter.id}>{headquarter.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="status">Stato</label>
                    <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
                        <option value="">Seleziona uno stato</option>
                        <option value="2">Nascosta</option>
                        <option value="1">In manutenzione</option>
                        <option value="0">Disponibile</option>
                    </select>
                </div>
                <button type="submit">Salva</button>
            </form>
        </Modal>
    );
}

export default CreateInfrastructureModal;
