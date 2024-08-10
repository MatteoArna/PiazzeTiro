import { useCallback, useEffect, useState } from "react"
import { fetchAllTargets, createTarget } from "../services/targetService";

const useTarget = (id = null) => {
    const [targets, setTargets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const loadAllTargets = async () => {
        try{
            setLoading(true);
            const response = await fetchAllTargets();
            setTargets(response.data);
        }catch(err){
            setError(err);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        loadAllTargets();
    }, []);

    const handleCreateTarget = useCallback(async (data) => {
        try{
            setLoading(true);
            const response = await createTarget(data);
            setTargets(response.data);
            return response.data;
        }catch (err){
            setError(err);
        }finally{
            setLoading(false);
        }
    }, []);

    return {
        targets,
        loading,
        error,
        createTarget: handleCreateTarget
    }
}

export default useTarget;