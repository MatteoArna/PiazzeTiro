import React, { useState } from 'react';
import './FilterMenu.css';

const FilterMenu = ({ title, options, activeOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    if (activeOption === option.id) {
      onSelect(''); // Deseleziona se la stessa opzione viene cliccata di nuovo
    } else {
      onSelect(option.id);
    }
  };

  return (
    <div className="filter-menu">
      <h3 onClick={toggleMenu} className={isOpen ? 'open' : ''}>
        {options.find(option => option.id === activeOption)?.name || title}
      </h3>
      {isOpen && (
        <div className="filter-buttons">
          {options.map(option => (
            <button
              key={option.id}
              className={`filter-button ${activeOption === option.id ? 'active' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterMenu;
