import React, { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import 'react-quill/dist/quill.snow.css';
import './CreateInfrastructureModal.css';
import ReactQuill from "react-quill";

import { useTranslation } from "react-i18next";

const CreateInfrastructureModal = ({ onClose, onSubmit, infrastructureType, infrastructures = [], headquarters = [], targets = [], onCreateInfrastructure, onDeleteInfrastructure, onAddTarget }) => {
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [headQuarter, setHeadQuarter] = useState('');
    const [targetToAdd, setTargetToAdd] = useState('');

    const [targetsToAvoid, setTargetsToAvoid] = useState([]);

    const {t} = useTranslation();

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

    const handleAddTarget = (targetId) => {
        setTargetsToAvoid([...targetsToAvoid, targetId]);
        onAddTarget(targetId);
    }

    return (
        <Modal title={infrastructureType ? t('infrastructures.edit_infrastructure') : t('infrastructures.create_infrastructure')} isOpen={true} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="type">{t('infrastructures.name')}</label>
                    <input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">{t('infrastructures.description')}</label>
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
                    <label htmlFor="price">{t('infrastructures.price')}</label>
                    <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="headQuarter">{t('infrastructures.headquarter')}</label>
                    <select id="headQuarter" value={headQuarter} onChange={(e) => setHeadQuarter(e.target.value)} required>
                        <option value="">{t('infrastructures.select_headquarter')}</option>
                        {headquarters.length > 0 ? (
                            headquarters.map((hq) => (
                                <option key={hq.id} value={hq.id}>{hq.name}</option>
                            ))
                        ) : (
                            <option value="" disabled>Loading...</option>
                        )}
                    </select>
                </div>

                {infrastructureType && (
                    <>
                        <div className="form-group">
                            <label htmlFor="targets">{t('infrastructures.available_targets')}</label>
                            {infrastructureType.targets.map((target) => (
                                <div key={target.id} className="target-item">
                                    <input
                                        type="text"
                                        id="target"
                                        value={target.target}
                                        disabled={true}
                                    />
                                </div>
                            ))}
                            <select 
                                id="target" 
                                value={targetToAdd} 
                                onChange={(e) => setTargetToAdd(e.target.value)}
                            >
                                <option value="">{t('infrastructures.select_target')}</option>
                                {
                                    targets
                                        .filter(target => 
                                            !infrastructureType?.targets.some(addedTarget => (addedTarget.targetId === target.id) || targetsToAvoid.includes(target.id))
                                        )
                                        .map(filteredTarget => (
                                            <option key={filteredTarget.id} value={filteredTarget.id}>
                                                {filteredTarget.name}
                                            </option>
                                        ))
                                }
                            </select>

                            <button 
                                type="button" 
                                className="add-button"
                                onClick={() => handleAddTarget(targetToAdd)} 
                            >
                                {t('infrastructures.add_target')}
                            </button>
                        </div>

                        <div className="form-group">
                            <label htmlFor="infrastructures"> {t('infrastructures.linked_infrastructures')}</label>
                            {infrastructures.map((infrastructure) => (
                                <div key={infrastructure.id} className="infrastructure-item">
                                    <input
                                        type="text"
                                        id="infrastructure"
                                        value={infrastructure.name}
                                        disabled={true}
                                    />
                                    <button type="button" className="delete-button" onClick={() => onDeleteInfrastructure(infrastructure.id)}>{t('infrastructures.delete')}</button>
                                </div>
                            ))}

                            <button type="button" className="add-button" onClick={onCreateInfrastructure}>{t('infrastructures.add_infrastructure')}</button>
                        </div>
                    </>
                )}
                
                <button type="submit" className="submit-button">{infrastructureType ? t('infrastructures.edit_infrastructure') : t('infrastructures.create_infrastructure')}</button>
            </form>
        </Modal>
    );
}

export default CreateInfrastructureModal;
