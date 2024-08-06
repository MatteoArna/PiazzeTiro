import { useEffect, useState } from "react";
import useHeadquarter from "../useHeadquarter";
import useInfrastructureType from "../useInfrastructureType";
import useInfrastructure from "../useInfrastructure";

const useInfrastructurePage = () => {
    const { infrastructureTypes, loading: infrTypeLoading, error: infrTypeError, loadInfrastructureTypes, createInfrastructureType, updateInfrastructureType } = useInfrastructureType();
    const { headquarters } = useHeadquarter();
    const { infrastructures, loadInfrastructuresByTypeId, createInfrastructure, deleteInfrastructure } = useInfrastructure();

    const [selectedInfrastructureType, setSelectedInfrastructureType] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [elements, setElements] = useState([]);

    useEffect(() => {
        const elements = infrastructureTypes.map((element) => ({
            id: element.id,
            title: element.type,
            subtitle: element.HeadQuarter.name,
            more: element.price + " chf",
        }));
        setElements(elements);
    }, [infrastructureTypes]);

    const handleShowCreateModal = () => {
        setShowModal(true);
    };

    const handleShowUpdateModal = (infrastructureTypeId) => {
        setSelectedInfrastructureType(infrastructureTypes.find((element) => element.id === infrastructureTypeId));
        loadInfrastructuresByTypeId(infrastructureTypeId);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedInfrastructureType(null);
        setShowModal(false);
    };

    const handleCreateInfrastructureType = async (data) => {
        await createInfrastructureType(data);
    };

    const handleUpdateInfrastructureType = async (data) => {
        await updateInfrastructureType(selectedInfrastructureType.id, data);
    };

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
        elements,
        infrastructures,
        headquarters,
        showCreateModal: handleShowCreateModal,
        showUpdateModal : handleShowUpdateModal,
        closeModal: handleCloseModal,
        createInfrastructureType: handleCreateInfrastructureType,
        updateInfrastructureType: handleUpdateInfrastructureType,
        deleteInfrastructure: handleDeleteInfrastructure,
        loadInfrastructureTypes,
        showModal,
        loading: infrTypeLoading,
        error: infrTypeError,
        selectedInfrastructureType,
        createInfrastructure : handleCreateInfrastracture,

    };
};

export default useInfrastructurePage;
