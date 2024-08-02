// HeadquarterMenu.js
import React, { useState } from 'react';
import './HeadQuarterMenu.css';

const HeadQuarterMenu = ({ headquarter, types, onTypeClick }) => {
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeClick = (type) => {
    setSelectedType(type);
    onTypeClick(type);
  };

  return (
    <div className="headquarter-menu">
      <h2>{headquarter.name}</h2>
      <div className="type-buttons">
        {types.map(type => (
          <button
            key={type.id}
            className={`type-button ${selectedType === type ? 'active' : ''}`}
            onClick={() => handleTypeClick(type)}
          >
            {type.type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeadQuarterMenu;
