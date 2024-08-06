import { useState, useEffect, useCallback } from 'react';
import { fetchInfrastructures, fetchInfrastructureById, createInfrastructure, updateInfrastructure } from '../services/infrastructureService';

const useInfrastructure = (id = null) => {
    const [infrastructures, setInfrastructures] = useState([]);
    const [infrastructure, setInfrastructure] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadInfrastructures = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchInfrastructures();
            setInfrastructures(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const loadInfrastructureById = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchInfrastructureById(id);
            setInfrastructure(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (id) {
            loadInfrastructureById(id);
        }
    }, [id, loadInfrastructureById]);

    const handleCreateInfrastructure = useCallback(async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await createInfrastructure(data);
            setInfrastructures(prevInfrastructures => [...prevInfrastructures, response.data]);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleUpdateInfrastructure = useCallback(async (id, data) => {
        setLoading(true);
        setError(null);
        try {
            await updateInfrastructure(id, data);
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
    }, []);

    return {
        infrastructures,
        infrastructure,
        loading,
        error,
        loadInfrastructures,
        loadInfrastructureById,
        createInfrastructure: handleCreateInfrastructure,
        updateInfrastructure: handleUpdateInfrastructure,
    };
};

export default useInfrastructure;
