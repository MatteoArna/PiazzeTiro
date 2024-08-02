import { useState, useEffect, useCallback } from "react";
import { fetchInfrastructureTypes } from "../services/infrastructureTypeService";

const useInfrastructureType = (token) => {
    const [infrastructureTypes, setInfrastructureTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadInfrastructureTypes = useCallback(async () => {
        try {
            if (infrastructureTypes.length === 0) { // Condizione per evitare richieste multiple
                setLoading(true);
                const response = await fetchInfrastructureTypes(token);
                setInfrastructureTypes(response.data);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [token, infrastructureTypes.length]);

    useEffect(() => {
        if (token) {
            loadInfrastructureTypes();
        }
    }, [token, loadInfrastructureTypes]);

    return {
        infrastructureTypes,
        loading,
        error,
        loadInfrastructureTypes
    };
}

export default useInfrastructureType;
