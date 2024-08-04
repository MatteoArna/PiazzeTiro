import React, { useState, useEffect } from "react";

import CreateInfrastructureModal from "./CreateInfrastructureModal/CreateInfrastructureModal";
import FilterMenu from "./FilterMenu/FilterMenu";
import ReservationModal from "./ReservationModal/ReservationModal"; // Importa il nuovo componente

import { useAuth } from "../../hooks/useAuth";
import { showAlert } from "../Alert";
import useInfrastructure from "../../hooks/useInfrastructure";
import InfrastructureList from "./InfrastructureList/InfrastructureList";
import useInfrastructureType from "../../hooks/useInfrastructureType";
import useHeadquarter from "../../hooks/useHeadquarter";

import './InfrastructurePage.css'; // Importiamo il file CSS

const InfrastructurePage = ({ userData }) => {
    const { auth } = useAuth();
    const { infrastructures, loading, error, createInfrastructure, loadInfrastructures, updateInfrastructure } = useInfrastructure(auth.token);
    const { infrastructureTypes, loadInfrastructureTypes } = useInfrastructureType(auth.token);
    const { headquarters, loadHeadquarters } = useHeadquarter(auth.token);

    const [selectedInfrastructure, setSelectedInfrastructure] = useState(null);
    const [filteredInfrastructures, setFilteredInfrastructures] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedHeadquarter, setSelectedHeadquarter] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [showReservationModal, setShowReservationModal] = useState(false); // Stato per gestire l'apertura del ReservationModal

    useEffect(() => {
        loadInfrastructures();
        loadInfrastructureTypes();
        loadHeadquarters();
    }, [loadInfrastructures, loadInfrastructureTypes, loadHeadquarters]);

    useEffect(() => {
        applyFilters();
    }, [infrastructures, selectedType, selectedHeadquarter]);

    const handleOnClose = () => {
        setShowModal(false);
        setSelectedInfrastructure(null);
    }

    const handleOnClick = (item) => {
        if (userData.roleId === 1) {
            setSelectedInfrastructure(item);
            setShowModal(true);
        } else {
            setSelectedInfrastructure(item);
            setShowReservationModal(true); // Apri il ReservationModal per gli utenti non admin
        }
    }

    const handleOnSubmit = async (data) => {
        if (selectedInfrastructure) {
            await updateInfrastructure(selectedInfrastructure.id, data);
            showAlert('success', 'Infrastruttura aggiornata con successo');
        } else {
            await createInfrastructure(data);
            showAlert('success', 'Infrastruttura creata con successo');
        }
    }

    const handleInfrastructureFilter = (typeId) => {
        setSelectedType(typeId);
    }

    const handleHeadquarterFilter = (headquarterId) => {
        setSelectedHeadquarter(headquarterId);
    }

    const applyFilters = () => {
        let filtered = infrastructures;

        if (selectedType) {
            filtered = filtered.filter(infrastructure => infrastructure.typeId === selectedType);
        }

        if (selectedHeadquarter) {
            filtered = filtered.filter(infrastructure => infrastructure.headquarterId === selectedHeadquarter);
        }

        setFilteredInfrastructures(filtered);
    }

    //Pagina dedicata ai civili
    if(userData.roleId === 0) {
        return(
            <h1>Coming Soon...</h1>
        );
    }

    return (
        <div className="infrastructure-page">
            <div className="filter-menus">
                <FilterMenu
                    title="Infrastructures"
                    options={infrastructureTypes}
                    activeOption={selectedType}
                    onSelect={handleInfrastructureFilter}
                />
                <FilterMenu
                    title="Headquarters"
                    options={headquarters}
                    activeOption={selectedHeadquarter}
                    onSelect={handleHeadquarterFilter}
                />
            </div>

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

            {showReservationModal && (
                <ReservationModal
                    isOpen={showReservationModal}
                    onSubmit={() => showAlert('success', 'Infrastruttura riservata, scaricato troverai il pdf da compilare')}
                    onClose={() => setShowReservationModal(false)}
                    userData={userData}
                    infrastructure={selectedInfrastructure}
                />
            )}

            {loading && <div>Loading...</div>}
            {error && <div>Error loading infrastructures: {error.message}</div>}
            <InfrastructureList infrastructures={filteredInfrastructures} onItemClick={(item) => handleOnClick(item)}  />
        </div>
    );
}

export default InfrastructurePage;
