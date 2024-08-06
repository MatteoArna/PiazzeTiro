import React from "react";
import GeneralList from '../../components/GeneralList/GeneralList';
import CreateInfrastructureModal from "../../components/Infrastructures/CreateInfrastructureModal/CreateInfrastructureModal";
import useInfrastructurePage from '../../hooks/custom/useInfrastructurePage';
import './InfrastructurePage.css'; // Importiamo il file CSS

const InfrastructurePage = ({ userData }) => {
    const { 
        elements, 
        showCreateModal, 
        closeModal, 
        showModal, 
        headquarters, 
        infrastructureTypes, 
        createInfrastructureType, 
        loadInfrastructureTypes,
        selectedInfrastructureType,
        showUpdateModal,
        updateInfrastructureType,
        infrastructures,
        createInfrastructure,
        deleteInfrastructure
    } = useInfrastructurePage();

    const handleSubmit = async (data) => {
        await createInfrastructureType(data);
        loadInfrastructureTypes(); // Ricarica i tipi di infrastrutture dal backend dopo la creazione
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
                    onSubmit={selectedInfrastructureType ? (data) => updateInfrastructureType(data) : (data) => createInfrastructureType(data)}
                />   
            )}
        </div>
    );
};

export default InfrastructurePage;
