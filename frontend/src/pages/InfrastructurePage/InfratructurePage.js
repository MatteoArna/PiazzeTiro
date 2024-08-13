import React, { useState } from "react";

//Components
import GeneralList from '../../components/GeneralList/GeneralList';
import CreateInfrastructureModal from "../../components/Infrastructures/CreateInfrastructureModal/CreateInfrastructureModal";
import FilterMenu from "../../components/Infrastructures/FilterMenu/FilterMenu";

//Hooks
import useInfrastructurePage from "../../hooks/custom/infrastructurePage/useInfrastructurePage";
import useAdmin from "../../hooks/custom/infrastructurePage/useAdmin";
import useBooker from "../../hooks/custom/infrastructurePage/useBooker";

import './InfrastructurePage.css'; 
import ReservationModal from "../../components/Infrastructures/ReservationModal/ReservationModal";

import { showAlert } from "../../components/Alert";

import { useTranslation } from 'react-i18next';

const InfrastructurePage = ({ userData }) => {
    const [editMode, setEditMode] = useState(false);

    const {
        elements, 
        infrastructureTypes, 
        loadInfrastructureTypes,
        selectedHeadQuarter,
        selectHeadquarter
    } = useInfrastructurePage();

    const {
        closeModal, 
        showModal, 
        showCreateModal,
        showUpdateModal,
        createInfrastructureType, 
        updateInfrastructureType, 
        selectedInfrastructureType,
        headquarters,
        infrastructures,
        createInfrastructure,
        deleteInfrastructure,
        users,
        targets,
        addTarget
    } = useAdmin(infrastructureTypes);

    const {
        handleShowReservationModal,
        handleCloseReservationModal,
        showReservationModal,
        selectedReservationInfrastructureType,
        reservationInfrastructures,
        createReservation,
        error
    } = useBooker(infrastructureTypes);

    const { t } = useTranslation();

    const handleCreateInfrastractureType = async (data) => {
        try{
            await createInfrastructureType(data);
            await loadInfrastructureTypes();
            showAlert('success', t('infrastructures.creation_success'));
        }catch(err){
            showAlert('error', t('infrastructures.creation_error'));
        }
        
    };

    const handleUpdateInfrastructureType = async (data) => {
        try{
            await updateInfrastructureType(data);
            await loadInfrastructureTypes();
            showAlert('success', t('infrastructures.edit_success'));
        }catch(err){
            showAlert('error', t('edit_error'));
        }
        
    };

    const handleCreateReservation = async (data) => {
        try{
            await createReservation(data);
            showAlert('success', t('infrastructures.reservation_created_success'));
        }catch(err){
            showAlert('error', t('infrastructures.reservation_created_error'));
        }
    };

    const handleElementClicked = (elementId) => {
        if(editMode)
            showUpdateModal(elementId);
        else if (userData.status === 4)
            handleShowReservationModal(elementId);
        else
            showAlert('error', t('ifnrastructures.no_allowment'));
    };

    return (
        <div className="infrastructure-page">
            <div className="filter-menus">
                <FilterMenu 
                    title={t('infrastructures.headquarter')}
                    options={headquarters}
                    activeOption={selectedHeadQuarter}
                    onSelect={(id) => selectHeadquarter(id)}
                />
                {userData.roleId === 'admin' && (
                    <div className="edit-mode-toggle">
                        <input 
                            type="checkbox" 
                            id="editMode" 
                            checked={editMode}
                            onChange={(e) => setEditMode(e.target.checked)}
                        />
                        <label htmlFor="editMode">{t('infrastructures.edit_mode')}</label>
                    </div>
                )}
                
            </div>
            {userData.roleId === 'admin' && (
                <button onClick={showCreateModal}>{t('infrastructures.create_infrastructure')}</button>   
            )}
            
            <GeneralList
                listElements={elements}
                onElementClicked={(elementId) => handleElementClicked(elementId)}
            />  

            {showModal && (
                <CreateInfrastructureModal
                    onClose={closeModal}
                    headquarters={headquarters}
                    targets={targets}
                    infrastructureType={selectedInfrastructureType}
                    infrastructures={infrastructures}
                    onCreateInfrastructure={createInfrastructure}
                    onDeleteInfrastructure={(id) => deleteInfrastructure(id)}
                    onSubmit={selectedInfrastructureType ? (data) => handleUpdateInfrastructureType(data) : (data) => handleCreateInfrastractureType(data)}
                    onAddTarget={addTarget}
                />   
            )}

            {showReservationModal && (
                <ReservationModal
                    onClose={handleCloseReservationModal}
                    infrastructureType={selectedReservationInfrastructureType}
                    infrastructures={reservationInfrastructures}
                    onSubmit={(data) => handleCreateReservation(data)}
                    userData={userData}
                    users={users}
                />   
            )}
        </div>
    );
};

export default InfrastructurePage;
