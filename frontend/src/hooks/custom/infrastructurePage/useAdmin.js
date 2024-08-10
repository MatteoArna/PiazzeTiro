import { useEffect, useState } from 'react';

import useInfrastructureType from '../../useInfrastructureType';
import useHeadquarter from '../../useHeadquarter';
import useInfrastructure from '../../useInfrastructure';
import useUser from '../../useUser';
import useTarget from '../../useTarget';

const useAdmin = (infrastructureTypes) => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    
    const [selectedInfrastructureType, setSelectedInfrastructureType] = useState(null);
    const {infrastructures, loadInfrastructuresByTypeId, createInfrastructure, deleteInfrastructure} = useInfrastructure();

    const {targets} = useTarget();

    const { users } = useUser();

    const [filteredUsers, setFilteredUsers] = useState([]);

    const { createInfrastructureType, updateInfrastructureType, addTarget } = useInfrastructureType(false);
    
    const { headquarters } = useHeadquarter();
    
    useEffect(() => {
        const usersFiltered = users.filter(user => user.UserRole.role === 'army');
        setFilteredUsers(usersFiltered);
        console.log("Filtered users:", usersFiltered);
    }, [users]); // Rimuovi filteredUsers dalle dipendenze
    


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

    const handleAddTarget = async (targetId) => {
        const response = await addTarget(selectedInfrastructureType.id, targetId);
        const addedTarget = targets.find((target) => target.id === Number(targetId));
        const data = {
            id: response.id,
            target: addedTarget.name,
            infrastructureTypeId: selectedInfrastructureType.id,
            targetId: targetId
        };
        selectedInfrastructureType.targets.push(data);
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
        users: filteredUsers,
        targets,
        addTarget: handleAddTarget
    };
};

export default useAdmin;