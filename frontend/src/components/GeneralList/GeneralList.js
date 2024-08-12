import React from "react";

import GeneralElement from "./GeneralElement/GeneralElement";
import './GeneralList.css';

const GeneralList = ({ listElements = [], onElementClicked }) => {
    return(
        <div className="general-list">
            {listElements.map((element) => (
                <GeneralElement
                    key={element.id}
                    id={element.id}
                    title={element.title}
                    subtitle={element.subtitle}
                    description={element.description}
                    more={element.more}
                    isRed={element.isRed}
                    onClick={onElementClicked}
                />
            ))}
        </div>
    );
};

export default GeneralList;