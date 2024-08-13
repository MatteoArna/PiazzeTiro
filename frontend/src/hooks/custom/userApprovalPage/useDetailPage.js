import { useCallback, useEffect, useState } from "react";
import { getStatus } from '../../../utils/userUtil';
import { fetchAllRoles } from "../../../services/userRoleService";

import { useTranslation } from "react-i18next";

const useDetailPage = (user) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [roles, setRoles] = useState([]);

  const {t} = useTranslation();

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
            setStatus(getStatus(user.status, t));
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
