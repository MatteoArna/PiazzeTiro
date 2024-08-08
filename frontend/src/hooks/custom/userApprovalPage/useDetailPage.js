import { useCallback, useEffect, useState } from "react";
import { getStatus } from '../../../utils/userUtil';
import { fetchAllRoles } from "../../../services/userRoleService";


const useDetailPage = (user) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [roles, setRoles] = useState([]);


    const handleFetchAllRoles = async () => {
        try {
            const response = await fetchAllRoles();
            setRoles(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (user) {
            setName(`${user.firstName} ${user.lastName}`);
            setStatus(getStatus(user.status));
            handleFetchAllRoles();
        }
    }, [user], handleFetchAllRoles);

    // Restituire un oggetto di stato anche quando l'utente non è definito
    return {
        society: user?.society || "",
        name,
        email: user?.email || "",
        status,
        roles,
    };
};

export default useDetailPage;
