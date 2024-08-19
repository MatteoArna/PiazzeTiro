import React, { useEffect } from "react";

import useInfrastructure from "../useInfrastructure";

const useReservationApprover = (reservation) => {

    const {infrastructures, loading, error, loadInfrastructuresByTypeId} = useInfrastructure();

    useEffect(() => {
        console.log(reservation);
        loadInfrastructuresByTypeId(reservation.InfrastructureType.id);
    }, [loadInfrastructuresByTypeId]);

    const formatDate = (date) => {
        //Convert the date in yyyy-mm-dd format
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const dt = dateObj.getDate();

        return `${year}-${month.toString().padStart(2, '0')}-${dt.toString().padStart(2, '0')}`;
    }

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
        formatDate
    };
};

export default useReservationApprover;