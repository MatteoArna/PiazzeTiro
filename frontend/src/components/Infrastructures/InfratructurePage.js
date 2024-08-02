import React, { useState, useEffect } from "react";

import CreateInfrastructureModal from "./CreateInfrastructureModal/CreateInfrastructureModal";
import SearchBar from "../SearchBar/SearchBar";

import { useAuth } from "../../hooks/useAuth";
import {showAlert} from "../Alert";
import useInfrastructure from "../../hooks/useInfrastructure";
import InfrastructureList from "./InfrastructureList/InfrastructureList";

const InfratructurePage = ({ userData }) => {
    const { auth } = useAuth();
    const { infrastructures, loading, error, createInfrastructure, loadInfrastructures, updateInfrastructure } = useInfrastructure(auth.token);
    const [selectedInfrastructure, setSelectedInfrastructure] = useState(null);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadInfrastructures();
    }, [loadInfrastructures]);

    const handleOnClose = () => {
        setShowModal(false);
        setSelectedInfrastructure(null);
    }

    const handleEditRequest = (item) => {
        setSelectedInfrastructure(item);
        setShowModal(true);
    }

    const handleOnSubmit = async (data) => {
        if(selectedInfrastructure) {
            await updateInfrastructure(selectedInfrastructure.id, data);
            showAlert('success', 'Infrastruttura aggiornata con successo');
        }else{
            await createInfrastructure(data);
            showAlert('success', 'Infrastruttura creata con successo');
        }
    }


    return (
        <div>
            <SearchBar />

            {userData.roleId === 1 && (
                <button onClick={() => setShowModal(true)}>Crea Infrastruttura</button>   
            )}

            {showModal && (
                <CreateInfrastructureModal 
                    onClose={handleOnClose} 
                    infrastructure={selectedInfrastructure}
                    onSubmit={(data) => handleOnSubmit(data)}
                />
            )}
            
            {loading && <div>Loading...</div>}
            {error && <div>Error loading infrastructures: {error.message}</div>}
            <InfrastructureList infrastructures={infrastructures} onItemClick={(item) => handleEditRequest(item)}/>
        </div>
    );
}

export default InfratructurePage;
