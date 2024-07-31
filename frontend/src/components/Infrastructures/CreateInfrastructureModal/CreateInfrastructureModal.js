import React from "react";

const CreateInfrastructureModal = ( {onClose, onSubmit, infrastructure} ) => {

    const [name, setName]  = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [headQuarter, setHeadQuarter] = useState('');
    const [status, setStatus] = useState('');

    // headQuarters, status

    return (
        <div>
            <h1>Create Infrastructure</h1>
        </div>
    );
}

export default CreateInfrastructureModal;