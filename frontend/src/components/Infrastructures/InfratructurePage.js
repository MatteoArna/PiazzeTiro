import React, {useState} from "react";

import CreateInfrastructureModal from "./CreateInfrastructureModal/CreateInfrastructureModal";
import SearchBar from "../SearchBar/SearchBar";

import { useAuth } from "../../hooks/useAuth";
import useInfrastructure from "../../hooks/useInfrastructure";

const InfratructurePage = ( {userData} ) => {
    const { auth } = useAuth();
    const { infrastructures, loading, error, createInfrastructure } = useInfrastructure(auth.token);

    const [showModal, setShowModal] = useState(false);

    const handleCreateInfrastructure = async (data) => {
        try {
            //Print all infos about the infrastructure
            await createInfrastructure(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <SearchBar />

        {userData.roleId === 1 && (
            <button onClick={() => setShowModal(true)}>Crea Infrastruttura</button>   
        )}


        {showModal && (
            <CreateInfrastructureModal 
                onClose={() => setShowModal(false)} 
                onSubmit={(data) => handleCreateInfrastructure(data)}
            />
        )}
        </div>
    );
}

export default InfratructurePage;
