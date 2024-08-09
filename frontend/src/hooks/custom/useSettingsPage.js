
import { useEffect, useState } from "react";

import useTarget from "../useTarget";
import useHeadquarter from "../useHeadquarter";

const useSettingsPage = () => {
    const {targets, loading: loadingTarget, errorTarget, createTarget} = useTarget();
    const {headquarters, loading: loadingHeadquarter, error: errorHeadquarter, createHeadquarter} = useHeadquarter();

    const [targetElements, setTargetElements] = useState([]);
    const [headquarterElements, setHeadquarterElements] = useState([]);

    const loadTargetElements = async () => {
        if(targets.length > 0){
            const elements = targets.map((element) => ({
                id: element.id,
                title: element.name,
                more: element.price + " chf",
            }));
    
            setTargetElements(elements);
        }
    }

    const loadHeadquarterElements = async () => {
        if(headquarters.length > 0){
            const elements = headquarters.map((element) => ({
                id: element.id,
                title: element.name,
                more: element.address,
            }));
    
            setHeadquarterElements(elements);
        }
    }

    useEffect(() =>{
        loadTargetElements();
        loadHeadquarterElements();
    }, [targets, headquarters]);

    const handleCreateTarget = async (data) => {
        const dataToSubmit = {
            name: data.input1Value,
            price: data.input2Value
        }
        const response = await createTarget(dataToSubmit);
        setTargetElements([...targetElements, {
            id: response.id,
            title: response.name,
            more: response.price + " chf"
        }]);
    }

    const handleCreateHeadquarter = async (data) => {
        const dataToSubmit = {
            name: data.input1Value,
            address: data.input2Value,
        }
        const response = await createHeadquarter(dataToSubmit);
        setHeadquarterElements([...headquarterElements, {
            id: response.id,
            title: response.name,
            more: response.address
        }]);
    }


    return {
        targets: targetElements,
        headquarters: headquarterElements,
        loading: loadingTarget || loadingHeadquarter,
        error: errorTarget || errorHeadquarter,
        createTarget: handleCreateTarget,
        createHadquarter: handleCreateHeadquarter
    };
};

export default useSettingsPage;
