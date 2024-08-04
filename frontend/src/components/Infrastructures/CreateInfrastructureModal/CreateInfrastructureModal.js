import React, { useEffect, useState } from "react";

// Components
import Modal from "../../Modal/Modal";

// Hooks
import useHeadquarter from "../../../hooks/useHeadquarter";
import useInfrastructureType from "../../../hooks/useInfrastructureType";
import { useAuth } from '../../../hooks/useAuth';

// Styles
import 'react-quill/dist/quill.snow.css';
import './CreateInfrastructureModal.css';

// Other
import ReactQuill from "react-quill";

const CreateInfrastructureModal = ({ onClose, onSubmit, infrastructure }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [headQuarter, setHeadQuarter] = useState('');
    const [infrastructureType, setInfrastructureType] = useState('');
    const [status, setStatus] = useState('');

    const { auth } = useAuth();
    const { headquarters, loadHeadquarters } = useHeadquarter(auth.token);
    const { infrastructureTypes, loadInfrastructureTypes } = useInfrastructureType(auth.token);

    useEffect(() => {
        if (auth.token) {
            loadHeadquarters();
            loadInfrastructureTypes();
        }
    }, [auth.token, loadHeadquarters, loadInfrastructureTypes]);

    useEffect(() => {
        if (infrastructure) {
            setName(infrastructure.name);
            setDescription(infrastructure.description);
            setPrice(infrastructure.price);
            setHeadQuarter(infrastructure.headquarterId);
            setStatus(infrastructure.statusId);
            setInfrastructureType(infrastructure.typeId);
        }
    }, [infrastructure]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            name,
            description,
            price,
            headquarterId: headQuarter,
            statusId: status,
            typeId: infrastructureType
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
                        {headquarters.map((hq) => (
                            <option key={hq.id} value={hq.id}>{hq.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="infrastructureType">Tipo Infrastruttura</label>
                    <select id="infrastructureType" value={infrastructureType} onChange={(e) => setInfrastructureType(e.target.value)} required>
                        <option value="">Seleziona il tipo dell'infrastruttura</option>
                        {infrastructureTypes.map((type) => (
                            <option key={type.id} value={type.id}>{type.type}</option>
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
                <button type="submit">{infrastructure ? "Modifica" : "Crea"}</button>
            </form>
        </Modal>
    );
}

export default CreateInfrastructureModal;
