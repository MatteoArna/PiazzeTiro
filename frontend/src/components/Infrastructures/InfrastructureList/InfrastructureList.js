import React from 'react';
import InfrastructureItem from '../InfrastructureItem/InfrastructureItem';
import './InfrastructureList.css';

const InfrastructureList = ({ infrastructures, infrastructureTypes, onItemClick, headquarters, isCivilian, showOnlyTypes }) => {

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

    return (
        <div className="infrastructure-list">
            {Object.entries(groupedInfrastructures).map(([headquarterId, infrastructures]) => (
                <div key={headquarterId} className="headquarter-group">
                    <div className="headquarter-title">{getHeadquarterName(headquarterId)}<hr /></div>
                    {showOnlyTypes ? (
                        // Mostra solo i tipi di infrastruttura senza ripetizioni
                        Array.from(new Set(infrastructures.map(infrastructure => infrastructure.typeId)))
                            .map((typeId, index) => (
                                <InfrastructureItem
                                    key={index}
                                    infrastructure={infrastructures.find(infra => infra.typeId === typeId)}
                                    onClick={(item) => onItemClick(item)}
                                    infrastructureType={getInfrastructureType(typeId)}
                                    showOnlyType={showOnlyTypes}
                                />
                            ))
                    ) : (
                        infrastructures.map(infrastructure => (
                            <InfrastructureItem
                                key={infrastructure.id}
                                infrastructure={infrastructure}
                                onClick={(item) => onItemClick(item)}
                                infrastructureType={getInfrastructureType(infrastructure.typeId)}
                                showOnlyType={showOnlyTypes}
                            />
                        ))
                    )}
                </div>
            ))}
        </div>
    );
};

export default InfrastructureList;
