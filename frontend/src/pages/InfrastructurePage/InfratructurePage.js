import React from "react";
import GeneralList from '../../components/GeneralList/GeneralList';
import CreateInfrastructureModal from "../../components/Infrastructures/CreateInfrastructureModal/CreateInfrastructureModal";
//import useInfrastructurePage from '../../hooks/custom/useInfrastructurePage';


import useInfrastructurePage from "../../hooks/custom/infrastructurePage/useInfrastructurePage";
import useAdmin from "../../hooks/custom/infrastructurePage/useAdmin";

import './InfrastructurePage.css'; 

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
                onElementClicked={(elementId) => userData.roleId === 'admin' ? showUpdateModal(elementId) : console.log("Funzione non ancora implementata")}
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
        </div>
    );


};

export default InfrastructurePage;
