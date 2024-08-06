import { useState } from 'react';

import useInfrastructureType from '../../useInfrastructureType';
import useHeadquarter from '../../useHeadquarter';
import useInfrastructure from '../../useInfrastructure';

const useAdmin = (infrastructureTypes) => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    
    const [selectedInfrastructureType, setSelectedInfrastructureType] = useState(null);
    const {infrastructures, loadInfrastructuresByTypeId, createInfrastructure, deleteInfrastructure} = useInfrastructure();

    const { createInfrastructureType, updateInfrastructureType } = useInfrastructureType(false);
    
    const { headquarters } = useHeadquarter();
    


    const handleShowCreateModal = () => {
        setShowCreateModal(true);
    }

    const handleShowEditModal = (infrastructureTypeId) => {
        setSelectedInfrastructureType(infrastructureTypes.find((element) => element.id === infrastructureTypeId));
        loadInfrastructuresByTypeId(infrastructureTypeId);
        setShowEditModal(true);
    }

    const handleCloseModal = () => {
        setShowCreateModal(false);
        setShowEditModal(false);
        setSelectedInfrastructureType(null);
    }

    const handleCreateInfrastructureType = async (data) => {
        await createInfrastructureType(data);
        handleCloseModal();
    }

    const handleUpdateInfrastructureType = async (data) => {
        await updateInfrastructureType(selectedInfrastructureType.id, data);
        handleCloseModal();
    }

    const handleCreateInfrastracture = async () => {
        const data = {
            name: selectedInfrastructureType.type + " " + (infrastructures.length + 1),
            statusId: 1,
            typeId: selectedInfrastructureType.id,
        };
        await createInfrastructure(data);
        await loadInfrastructuresByTypeId(selectedInfrastructureType.id);
    }

    const handleDeleteInfrastructure = async (infrastructureId) => {
        await deleteInfrastructure(infrastructureId);
        await loadInfrastructuresByTypeId(selectedInfrastructureType.id);
    }
    
    return {
        selectedInfrastructureType,
        showModal: showCreateModal || showEditModal,
        showCreateModal: handleShowCreateModal,
        showUpdateModal: handleShowEditModal,
        closeModal: handleCloseModal,
        createInfrastructureType: handleCreateInfrastructureType,
        updateInfrastructureType: handleUpdateInfrastructureType,
        headquarters,
        infrastructures,
        createInfrastructure: handleCreateInfrastracture,
        deleteInfrastructure: handleDeleteInfrastructure,
    };
};

export default useAdmin;