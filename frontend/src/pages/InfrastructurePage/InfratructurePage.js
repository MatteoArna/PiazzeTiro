import React from "react";
import GeneralList from '../../components/GeneralList/GeneralList';
import CreateInfrastructureModal from "../../components/Infrastructures/CreateInfrastructureModal/CreateInfrastructureModal";


import useInfrastructurePage from "../../hooks/custom/infrastructurePage/useInfrastructurePage";
import useAdmin from "../../hooks/custom/infrastructurePage/useAdmin";
import useBooker from "../../hooks/custom/infrastructurePage/useBooker";

import './InfrastructurePage.css'; 
import ReservationModal from "../../components/Infrastructures/ReservationModal/ReservationModal";

const InfrastructurePage = ({ userData }) => {
    const {elements, infrastructureTypes, loadInfrastructureTypes} = useInfrastructurePage();

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
        deleteInfrastructure
    } = useAdmin(infrastructureTypes);

    const {
        handleShowReservationModal,
        handleCloseReservationModal,
        showReservationModal,
        selectedReservationInfrastructureType,
        reservationInfrastructures,
        createReservation
    } = useBooker(infrastructureTypes);


    const handleCreateInfrastractureType = async (data) => {
        await createInfrastructureType(data);
        await loadInfrastructureTypes();
    };

    const handleUpdateInfrastructureType = async (data) => {
        await updateInfrastructureType(data);
        await loadInfrastructureTypes();
    };


    return (
        <div>
            {userData.roleId === 'admin' && (
                <button onClick={showCreateModal}>Crea Infrastruttura</button>   
            )}
            <GeneralList
                listElements={elements}
                onElementClicked={(elementId) => userData.roleId === 'admin' ? showUpdateModal(elementId) : handleShowReservationModal(elementId)}
            />  

            {showModal && (
                <CreateInfrastructureModal
                    onClose={closeModal}
                    headquarters={headquarters}
                    infrastructureType={selectedInfrastructureType}
                    infrastructures={infrastructures}
                    onCreateInfrastructure={createInfrastructure}
                    onDeleteInfrastructure={(id) => deleteInfrastructure(id)}
                    onSubmit={selectedInfrastructureType ? (data) => handleUpdateInfrastructureType(data) : (data) => handleCreateInfrastractureType(data)}
                />   
            )}

            {showReservationModal && (
                <ReservationModal
                    onClose={handleCloseReservationModal}
                    infrastructureType={selectedReservationInfrastructureType}
                    infrastructures={reservationInfrastructures}
                    onSubmit={(data) => createReservation(data)}
                    userData={userData}
                />   
            )}
        </div>
    );


};

export default InfrastructurePage;
