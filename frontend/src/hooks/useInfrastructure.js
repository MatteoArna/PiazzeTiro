import { useState } from "react";
import { fetchInfrastructures, createInfrastructure } from "../services/infrastructureService";

const useInfrastructure = (token) => {
    const [infrastructures, setInfrastructures] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadInfrastructures = async () => {
        try {
            setLoading(true);
            const response = await fetchInfrastructures(token);
            setInfrastructures(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateInfrastructure = async (data) => {
        try {
            setLoading(true);
            const response = await createInfrastructure(token, data);
            setInfrastructures(prevInfrastructures => [...prevInfrastructures, response.data]);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    } 

    return {
        infrastructures,
        loading,
        error,
        loadInfrastructures,
        statuses,
        createInfrastructure: handleCreateInfrastructure,
    };
}

export default useInfrastructure;
