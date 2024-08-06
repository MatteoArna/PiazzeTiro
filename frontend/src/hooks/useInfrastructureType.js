import { useState, useEffect, useCallback } from "react";
import { fetchInfrastructureTypes, createInfrastructureType, updateInfrastructureType } from "../services/infrastructureTypeService";

const useInfrastructureType = (initialLoading = true) => {
    const [infrastructureTypes, setInfrastructureTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadInfrastructureTypes = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetchInfrastructureTypes();
            setInfrastructureTypes(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if(initialLoading){
            loadInfrastructureTypes();
        }
    }, [loadInfrastructureTypes]);

    const handleCreateInfrastructureType = async (data) => {
        try {
            await createInfrastructureType(data);
            loadInfrastructureTypes(); // Ricarica i tipi di infrastrutture dal backend dopo la creazione
        } catch (error) {
            setError(error);
        }
    };

    const handleUpdateInfrastructureType = async (id, data) => {
        try {
            await updateInfrastructureType(id, data);
            loadInfrastructureTypes();
        } catch (error) {
            setError(error);
        }
    };

    return {
        infrastructureTypes,
        loading,
        error,
        loadInfrastructureTypes,
        createInfrastructureType: handleCreateInfrastructureType,
        updateInfrastructureType: handleUpdateInfrastructureType,
    };
};

export default useInfrastructureType;
