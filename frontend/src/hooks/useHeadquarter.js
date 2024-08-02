import { useState, useEffect, useCallback } from 'react';
import { fetchHeadquarters } from '../services/headquarterService';

const useHeadquarter = (token) => {
    const [headquarters, setHeadquarters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadHeadquarters = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetchHeadquarters(token);
            setHeadquarters(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            loadHeadquarters();
        }
    }, [token, loadHeadquarters]);

    return {
        headquarters,
        loading,
        error,
        loadHeadquarters
    };
}

export default useHeadquarter;
