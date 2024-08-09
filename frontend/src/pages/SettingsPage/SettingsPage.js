import React from "react";

import useSettingsPage from "../../hooks/custom/useSettingsPage";
import SettingsOption from "../../components/SettingsOption/SettingsOption";

const SettingsPage = () => {
    const {
        targets,
        headquarters,
        
        loading,
        error,

        createTarget,
        createHadquarter

    } = useSettingsPage();

    return (
        <>
            <h1>Settings</h1>
            <SettingsOption 
                name="Target"
                input1="Name"
                input2="Price"
                input2Type="number"  // Specifica che il secondo input è un numero
                onCreate={createTarget}
                elements={targets}
            />

            <SettingsOption
                name="Headquarter"
                input1="Name"
                input2="Address"
                input2Type="text"  // Specifica che il secondo input è un testo
                onCreate={createHadquarter}
                elements={headquarters}
            />
        </>
    );
}

export default SettingsPage;
