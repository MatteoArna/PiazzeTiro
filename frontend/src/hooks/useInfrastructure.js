import { useState, useEffect, useCallback } from 'react';
import { fetchInfrastructures, deleteInfrastructure, createInfrastructure, updateInfrastructure, fetchInfrastructuresByTypeId } from '../services/infrastructureService';

const useInfrastructure = () => {
    const [infrastructures, setInfrastructures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadAllInfrastructures = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetchInfrastructures();
            setInfrastructures(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const loadInfrastructuresByTypeId = useCallback(async (typeId) => {
        try {
            setLoading(true);
            const response = await fetchInfrastructuresByTypeId(typeId);
            setInfrastructures(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleCreateInfrastructure = useCallback(async (data) => {
        try{
            setLoading(true);
            await createInfrastructure(data);
            infrastructures.push(data);
        }catch(e){
            setError(e);
        }finally{
            setLoading(false);
        }   
    }, []);     

    const handleUpdateInfrastructure = useCallback(async (id, data) => {
        try{
            setLoading(true);
            await updateInfrastructure(id, data);
        }catch(e){
            setError(e);
        }finally{
            setLoading(false);
        }
    }, []);

    const handleDeleteInfrastructure = useCallback(async (id) => {
        try{
            setLoading(true);
            await deleteInfrastructure(id);
            infrastructures.filter(infrastructure => infrastructure.id !== id);
        }catch(e){
            setError(e);
        }finally{
            setLoading(false);
        }
    }, []);


    return {
        infrastructures,
        loading,
        error,
        createInfrastructure: handleCreateInfrastructure,
        updateInfrastructure: handleUpdateInfrastructure,
        deleteInfrastructure: handleDeleteInfrastructure,
        loadInfrastructuresByTypeId,
    };



    /*const loadInfrastructures = useCallback(async () => {
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
    */


};

export default useInfrastructure;
