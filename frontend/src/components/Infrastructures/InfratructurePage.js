import React, {useState} from "react";

import CreateInfrastructureModal from "./CreateInfrastructureModal/CreateInfrastructureModal";
import SearchBar from "../SearchBar/SearchBar";

const InfratructurePage = ( {userData} ) => {

    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <SearchBar />

        {userData.roleId === 1 && (
            <button onClick={() => setShowModal(true)}>Crea Infrastruttura</button>   
        )}


        {showModal && (
            <CreateInfrastructureModal 
                onClose={() => setShowModal(false)} 
            />
        )}
        </div>
    );
}

export default InfratructurePage;
