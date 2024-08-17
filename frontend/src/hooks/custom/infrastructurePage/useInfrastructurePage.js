import { useCallback, useEffect, useState } from "react";
import useInfrastructureType from "../../useInfrastructureType";

const useInfrastructurePage = () => {
  
    const {infrastructureTypes, loadInfrastructureTypes } = useInfrastructureType();

    const [selectedHeadQuarter, setSelectedHeadQuarter] = useState();

    const [elements, setElements] = useState([]);

    useEffect(() => {
        const elements = infrastructureTypes.map((element) => ({
            id: element.id,
            title: element.type,
            subtitle: element.HeadQuarter.name,
            //more: element.price + " chf",
        }));
        setElements(elements);
    }, [infrastructureTypes]);

    const handleSelectHeadquarter = useCallback((id) => {
        console.log("handleSelectHeadquarter", id);
        setSelectedHeadQuarter(id);
    
        const updatedElements = infrastructureTypes
            .filter((element) => !id || element.headquarterId === id)
            .map((element) => ({
                id: element.id,
                title: element.type,
                subtitle: element.HeadQuarter.name,
                more: element.price + " chf",
            }));
    
        setElements(updatedElements);
    }, [infrastructureTypes]);
    

    return {
        elements,
        infrastructureTypes,
        loadInfrastructureTypes,

        selectedHeadQuarter,
        selectHeadquarter : handleSelectHeadquarter
    };
};

export default useInfrastructurePage;