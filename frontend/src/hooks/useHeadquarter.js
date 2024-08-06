import { useState, useEffect, useCallback } from 'react';
import { fetchHeadquarters } from '../services/headquarterService';

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

    return {
        headquarters,
        loading,
        error,
    };
}

export default useHeadquarter;
