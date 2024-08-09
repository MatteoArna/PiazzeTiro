import React, { useState } from "react";
import GeneralList from "../../components/GeneralList/GeneralList";
import ItemCreator from "../ItemCreator/ItemCreator";
import Modal from "../Modal/Modal"; // Importa il componente Modal
import "./SettingsOption.css"; // Importa il CSS

const SettingsOption = ({ name, input1, input2 = null, input2Type = "text", onCreate, elements }) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className="settings-option-container">
            <div className="settings-option-link" onClick={toggleModal}>
                <div className="settings-option-content">
                    <div className="settings-option-info">
                        <div className="settings-option-title">{name}</div>
                    </div>
                    <div className="settings-option-arrow">›</div>
                </div>
            </div>

            <Modal 
                title={name}
                isOpen={showModal}
                onClose={toggleModal}
            >
                <ItemCreator
                    input1={input1}
                    input2={input2}
                    input2Type={input2Type} // Passa il tipo di input2
                    onCreate={onCreate}
                />  
                <GeneralList
                    listElements={elements}
                    onElementClicked={(e) => console.log(e)}
                />
            </Modal>
        </div>
    );
};

export default SettingsOption;
