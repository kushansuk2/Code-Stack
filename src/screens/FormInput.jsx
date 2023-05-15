import React, { useState } from "react";
import "../style.css";

const FormInput = (props) => {
    const [firstClick, setFirstClick] = useState(false);

    const handleFirstClickChange = (e) => {
        setFirstClick(true);
    };

    const { label, onChange, errorMessage, value, ...inputProps } = props; // here just takw what you want and put others in... others
    // <input name={name} placeholder={placeholder} label={label} type={type} value={value}></input> this syntax can be written in short like this
    return (
        <div className="Form-input-container">
            <label>{label}</label>
            <input
                onChange={onChange}
                value={value}
                {...inputProps}
                onBlur={handleFirstClickChange}
                onFocus={(e) => {
                    inputProps.name === "confirmPassword" &&
                        setFirstClick(true);
                }}
                firstclick={firstClick.toString()}
            ></input>
            <span>{errorMessage}</span>
        </div>
    );
};

export default FormInput;
