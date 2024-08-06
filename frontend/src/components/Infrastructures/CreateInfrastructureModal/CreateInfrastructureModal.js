import React, { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import 'react-quill/dist/quill.snow.css';
import './CreateInfrastructureModal.css';
import ReactQuill from "react-quill";

const CreateInfrastructureModal = ({ onClose, onSubmit, infrastructureType, infrastructures = [], headquarters = [], onCreateInfrastructure, onDeleteInfrastructure }) => {
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [headQuarter, setHeadQuarter] = useState('');

    useEffect(() => {
        if (infrastructureType) {
            setType(infrastructureType.type);
            setDescription(infrastructureType.description);
            setPrice(infrastructureType.price);
            setHeadQuarter(infrastructureType.headquarterId);
        }
    }, [infrastructureType]);

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const data = {
            type,
            description,
            price,
            headquarterId: headQuarter,
        };
    
        onSubmit(data);
        onClose();
    };

    return (
        <Modal title={infrastructureType ? 'Modifica Infrastruttura' : 'Crea Infrastruttura'} isOpen={true} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="type">Nome</label>
                    <input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} required />
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
                    <label htmlFor="price">Prezzo</label>
                    <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="headQuarter">Sede</label>
                    <select id="headQuarter" value={headQuarter} onChange={(e) => setHeadQuarter(e.target.value)} required>
                        <option value="">Seleziona una sede</option>
                        {headquarters.length > 0 ? (
                            headquarters.map((hq) => (
                                <option key={hq.id} value={hq.id}>{hq.name}</option>
                            ))
                        ) : (
                            <option value="" disabled>Loading...</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="infrastructures">Infrastrutture</label>
                    {infrastructures.map((infrastructure) => (
                        <div key={infrastructure.id} className="infrastructure-item">
                            <input
                                type="text"
                                id="infrastructure"
                                value={infrastructure.name}
                                disabled={true}
                            />
                            <button type="button" className="delete-button" onClick={() => onDeleteInfrastructure(infrastructure.id)}>X</button>
                        </div>
                    ))}

                    <button type="button" onClick={onCreateInfrastructure}>Aggiungi Infrastruttura</button>
                </div>
                <button type="submit">{infrastructureType ? "Modifica" : "Crea"}</button>
            </form>
        </Modal>
    );
}

export default CreateInfrastructureModal;
