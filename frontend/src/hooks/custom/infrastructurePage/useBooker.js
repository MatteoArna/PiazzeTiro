import { useEffect, useState } from "react";

import useInfrastructure from "../../useInfrastructure";
import useBooking from "../../useBooking";

const useBooker = (infrastructureTypes) => {
    const { infrastructures, loadInfrastructuresByTypeId } = useInfrastructure();
    const [showReservationModal, setShowReservationModal] = useState(false);

    const [selectedInfrastructureType, setSelectedInfrastructureType] = useState(null);

    const { createBooking } = useBooking();

    const handleShowReservationModal = async (infrastructureTypeId) => {
        setSelectedInfrastructureType(infrastructureTypes.find((element) => element.id === infrastructureTypeId));
        loadInfrastructuresByTypeId(infrastructureTypeId);
        setShowReservationModal(true);
    }

    const handleCloseReservationModal = () => {
        setShowReservationModal(false);
        setSelectedInfrastructureType(null);
    }

    /**
     * Creates a reservation by invoking createBooking.
     * This function might throw an error if the booking creation fails.
     * 
     * @param {Object} data - The reservation data.
     * @throws {Error} If the booking creation fails.
     */
    const handleCreateReservation = async (data) => {
        await createBooking(data);
    }

    return {
        handleShowReservationModal,
        handleCloseReservationModal,
        showReservationModal,
        selectedReservationInfrastructureType: selectedInfrastructureType,

        reservationInfrastructures: infrastructures,

        createReservation: handleCreateReservation,

    };
};

export default useBooker;