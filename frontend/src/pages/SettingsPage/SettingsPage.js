import React from "react";

import useSettingsPage from "../../hooks/custom/useSettingsPage";
import SettingsOption from "../../components/SettingsOption/SettingsOption";

import { useTranslation } from "react-i18next";

const SettingsPage = () => {
    const {
        targets,
        headquarters,
        
        loading,
        error,

        createTarget,
        createHadquarter

    } = useSettingsPage();

    const {t} = useTranslation();

    return (
        <>
            <h1>{t('settings.settings')}</h1>
            <SettingsOption 
                name={t('settings.targets')}
                input1={t('settings.name')}
                input2={t('settings.price')}
                input2Type="number"  // Specifica che il secondo input è un numero
                onCreate={createTarget}
                elements={targets}
            />

            <SettingsOption
                name={t('settings.headquarters')}
                input1={t('settings.name')}
                input2={t('settings.address')}
                input2Type="text"  // Specifica che il secondo input è un testo
                onCreate={createHadquarter}
                elements={headquarters}
            />
        </>
    );
}

export default SettingsPage;
