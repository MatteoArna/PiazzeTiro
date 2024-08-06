import React from 'react';
import './InfrastructureItem.css';


const InfrastructureItem = ({ infrastructure, onClick, infrastructureType, showOnlyType }) => {

  return (
    <div className="infrastructure-item" onClick={() => onClick(infrastructure)}>
      <div className="infrastructure-info">
      {showOnlyType ? null : <div className="infrastructure-name">{infrastructure.name} -</div>}
      <div className="infrastructure-type"> {infrastructureType}</div>
      {showOnlyType ? null : <div className="infrastructure-price">{infrastructure.price} chf/h</div>}
      </div>
      <div className="infrastructure-arrow">›</div>
    </div>
  );
};

export default InfrastructureItem;
