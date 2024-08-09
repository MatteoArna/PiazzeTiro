import React, { useState } from "react";
import "./ItemCreator.css"; // Importa il CSS

const ItemCreator = ({ input1, input2 = null, input2Type = "text", onCreate }) => {
    const [input1Value, setInput1Value] = useState("");
    const [input2Value, setInput2Value] = useState(input2 ? "" : null);

    const handleSubmit = (event) => {
        event.preventDefault();
        onCreate({ input1Value, input2Value });
        setInput1Value(""); // Reset the input fields after submission
        if (input2) setInput2Value("");
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder={input1} 
                value={input1Value}
                onChange={(e) => setInput1Value(e.target.value)} 
                required
            />
            {input2 && (
                <input 
                    type={input2Type} 
                    placeholder={input2}
                    value={input2Value || ""}
                    onChange={(e) => setInput2Value(e.target.value)} 
                    {...(input2Type === "number" && { min: "0", step: "any" })}
                />
            )}
            <button type="submit">Submit</button>
        </form>
    );
};

export default ItemCreator;
