import { useState, useEffect, useCallback } from "react";
import { fetchInfrastructures, createInfrastructure, updateInfrastructure } from "../services/infrastructureService";

const useInfrastructure = (token) => {
    const [infrastructures, setInfrastructures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadInfrastructures = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetchInfrastructures(token);
            setInfrastructures(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [token]);

    const handleCreateInfrastructure = useCallback(async (data) => {
        try {
            setLoading(true);
            const response = await createInfrastructure(token, data);
            setInfrastructures(prevInfrastructures => [...prevInfrastructures, response.data]);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            loadInfrastructures();
        }
    }, [token, loadInfrastructures]);

    const handleUpdateInfrastructure = useCallback(async (id, data) => {
        try {
            setLoading(true);
            await updateInfrastructure(token, id, data);
            setInfrastructures(prevInfrastructures => prevInfrastructures.map(infrastructure => {
                if (infrastructure.id === id) {
                    return { ...infrastructure, ...data };
                }
                return infrastructure;
            }));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [token]);

    return {
        infrastructures,
        loading,
        error,
        loadInfrastructures,
        createInfrastructure: handleCreateInfrastructure,
        updateInfrastructure: handleUpdateInfrastructure,
    };
}

export default useInfrastructure;
