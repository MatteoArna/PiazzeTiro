import { useState, useEffect, useCallback } from "react";
import { fetchInfrastructureTypes } from "../services/infrastructureTypeService";

const useInfrastructureType = (token) => {
    const [infrastructureTypes, setInfrastructureTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadInfrastructureTypes = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetchInfrastructureTypes(token);
            setInfrastructureTypes(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        loadInfrastructureTypes();
    }, [loadInfrastructureTypes]);

    return {
        infrastructureTypes,
        loading,
        error,
        loadInfrastructureTypes
    };
}

export default useInfrastructureType;