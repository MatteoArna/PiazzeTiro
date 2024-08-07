import React, { useEffect } from "react";

import useInfrastructure from "../useInfrastructure";

const useReservationApprover = (reservation) => {

    const {infrastructures, loading, error, loadInfrastructuresByTypeId} = useInfrastructure();

    useEffect(() => {
        console.log(reservation);
        loadInfrastructuresByTypeId(reservation.InfrastructureType.id);
    }, [loadInfrastructuresByTypeId]);


    const translateDate = (date) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString();
    }

    const translateTime = (time) => {
        return time.slice(0, 5);
    }

    return {
        translateDate,
        translateTime,
        infrastructures,
    };
};

export default useReservationApprover;