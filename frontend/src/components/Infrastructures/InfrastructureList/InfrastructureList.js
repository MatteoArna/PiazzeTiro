import React, { useEffect } from 'react';
import InfrastructureItem from '../InfrastructureItem/InfrastructureItem';
import './InfrastructureList.css';

import useHeadquarter from '../../../hooks/useHeadquarter';
import useInfrastructureType from '../../../hooks/useInfrastructureType';
import { useAuth } from '../../../hooks/useAuth';

const InfrastructureList = ({ infrastructures, onItemClick, isAdmin, isCivilian }) => {

    const { auth } = useAuth();
    const { headquarters, loading, error, loadHeadquarters } = useHeadquarter(auth.token);
    const { infrastructureTypes } = useInfrastructureType(auth.token);

    useEffect(() => {
        if (auth.token) {
            loadHeadquarters();
        }
    }, [auth.token, loadHeadquarters]);

    const getInfrastructureType = (typeId) => {
        const type = infrastructureTypes.find((type) => type.id === typeId);
        return type ? type.type : 'Unknown type';
    };

    const getHeadquarterName = (headquarterId) => {
        const hq = headquarters.find(hq => hq.id === parseInt(headquarterId));
        return hq ? hq.name : 'Unknown Headquarter';
    };

    // Crea un oggetto per raggruppare le infrastrutture per headquarter
    const groupedInfrastructures = infrastructures.reduce((acc, infrastructure) => {
        const headquarterId = infrastructure.headquarterId;
        if (!acc[headquarterId]) {
            acc[headquarterId] = [];
        }
        acc[headquarterId].push(infrastructure);
        return acc;
    }, {});

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading headquarters</div>;
    }

    return (
        <div className="infrastructure-list">
            {Object.entries(groupedInfrastructures).map(([headquarterId, infrastructures]) => (
                <div key={headquarterId} className="headquarter-group">
                    <div className="headquarter-title">{getHeadquarterName(headquarterId)}<hr /></div>
                    {infrastructures.map(infrastructure => (
                        <InfrastructureItem 
                            key={infrastructure.id} 
                            infrastructure={infrastructure} 
                            onClick={(item) => onItemClick(item)}
                            infrastructureType={getInfrastructureType(infrastructure.typeId)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default InfrastructureList;
