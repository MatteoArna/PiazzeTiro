import React from 'react';

import './GeneralElement.css';

const GeneralElement = ({ id, title, subtitle, description, more, onClick }) => {
    return (
        <div className="general-element" onClick={() => onClick(id)}>
            <div className="general-content">
                <div className="general-info">
                    <div className="title">{title}</div>
                    <div className="subtitle">{subtitle}</div>
                    <div className="description">{description}</div>
                </div>
                <div className="more">{more}</div>
            </div>
            <div className="arrow">›</div>
        </div>
    );
};

export default GeneralElement;