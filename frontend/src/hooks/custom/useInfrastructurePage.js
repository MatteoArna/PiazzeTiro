import React, {useEffect, useState} from "react";

import useInfrastructure from "../useInfrastructure";
import useHeadquarter from "../useHeadquarter";
import useInfrastructureType from "../useInfrastructureType";

const InfrastructurePage = () => {
    const { infrastructures, loading, error, createInfrastructure, updateInfrastructure } = useInfrastructure();
    const { headquarters } = useHeadquarter();
    const { infrastructureTypes } = useInfrastructureType();

    const [listElements, setListElements] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [infrastructureToEdit, setInfrastructureToEdit] = useState(null);

    useEffect(() => {
        if (infrastructures.length > 0) {
            const elements = infrastructures.map((element) => ({
                id: element.id,
                title: element.name,
                subtitle: element.InfrastructureType.type,
                description: element.HeadQuarter.name,
                more: element.price + " chf"
            }));
            setListElements(elements);
        }
    }, [infrastructures]);

    const handleCreateInfrastructure = async (data) => {
        try {
            console.log(data);
            await createInfrastructure(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateInfrastructure = async (id, data) => {
        try {
            await updateInfrastructure(id, data);
        } catch (error) {
            console.error(error);
        }
    };
    

    const openCreateModal = () => {
        setShowModal(true);
    };

    const openEditModal = (infrastructureId) => {
        setInfrastructureToEdit(infrastructures.find((infrastructure) => infrastructure.id === infrastructureId));
        setShowModal(true);
    };

    const closeModal = () => {
        setInfrastructureToEdit(null);
        setShowModal(false);
    };



    return {
        listElements,
        openCreateModal,
        openEditModal,
        closeModal,
        infrastructureToEdit,
        showModal,
        headquarters,
        infrastructureTypes,
        createInfrastructure: handleCreateInfrastructure,
        updateInfrastructure: handleUpdateInfrastructure
    };
};

export default InfrastructurePage

