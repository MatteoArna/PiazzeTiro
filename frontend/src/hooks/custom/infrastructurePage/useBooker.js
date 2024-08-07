import { useState } from "react";

import useInfrastructure from "../../useInfrastructure";
import useBooking from "../../useBooking";

const useBooker = (isArmy, infrastructureTypes) => {
    const { infrastructures, loadInfrastructuresByTypeId } = useInfrastructure();
    const [showReservationModal, setShowReservationModal] = useState(false);

    const [selectedInfrastructureType, setSelectedInfrastructureType] = useState(null);

    const { createBooking } = useBooking();

    const handleShowReservationModal = (infrastructureTypeId) => {
        setSelectedInfrastructureType(infrastructureTypes.find((element) => element.id === infrastructureTypeId));
        if(isArmy){
            loadInfrastructuresByTypeId(infrastructureTypeId);
        }
        setShowReservationModal(true);
    }

    const handleCloseReservationModal = () => {
        setShowReservationModal(false);
        setSelectedInfrastructureType(null);
    }

    const handleCreateReservation = async (data) => {
        createBooking(data);
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