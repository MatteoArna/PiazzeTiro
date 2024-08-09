import { useState, useEffect, useCallback } from 'react';
import { fetchHeadquarters, createHeadquarter } from '../services/headquarterService';

const useHeadquarter = () => {
    const [headquarters, setHeadquarters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadHeadquarters = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetchHeadquarters();
            setHeadquarters(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadHeadquarters();
    }, [loadHeadquarters]);

    const handleCreateHeadquarter = useCallback(async (data) => {
        try{
            setLoading(true);
            const response = await createHeadquarter(data);
            setHeadquarters(response.data);
            return response.data;
        }catch (err){
            setError(err);
        }finally{
            setLoading(false);
        }
    }, []);

    return {
        headquarters,
        loading,
        error,
        createHeadquarter: handleCreateHeadquarter
    };
}

export default useHeadquarter;
