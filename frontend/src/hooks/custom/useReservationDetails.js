import { useState, useEffect } from 'react';
import useUser from '../useUser';
import useInfrastructure from '../useInfrastructure';

const useReservationDetails = (reservation) => {
    const { userData, loading: userLoading, error: userError, loadUserById } = useUser(reservation.idCustomer);
    const { infrastructure, loading: infraLoading, error: infraError, loadInfrastructureById } = useInfrastructure();

    const [society, setSociety] = useState(null);

    useEffect(() => {
        if (reservation.idInfrastructure) {
            loadInfrastructureById(reservation.idInfrastructure);
        }
    }, [reservation.idCustomer, reservation.idInfrastructure, loadUserById, loadInfrastructureById]);

    useEffect(() => {
        if (userData) {
            setSociety(userData.society);
        }
    }, [userData]);

    const loading = userLoading || infraLoading;
    const error = userError || infraError;

    return {
        society,
        userData,
        infrastructure,
        loading,
        error
    };
};

export default useReservationDetails;
