import { useEffect, useState } from "react";
import useInfrastructureType from "../../useInfrastructureType";

const useInfrastructurePage = () => {
  
    const {infrastructureTypes, loadInfrastructureTypes } = useInfrastructureType();

    const [elements, setElements] = useState([]);

    useEffect(() => {
        const elements = infrastructureTypes.map((element) => ({
            id: element.id,
            title: element.type,
            subtitle: element.HeadQuarter.name,
            more: element.price + " chf",
        }));
        setElements(elements);
    }, [infrastructureTypes]);

    return {
        elements,
        infrastructureTypes,
        loadInfrastructureTypes
    };
};

export default useInfrastructurePage;