import React, { useState } from "react";
import FormInput from "./FormInput";
import axios from "axios";
import "../style.css";
import { Link, Navigate } from "react-router-dom";

const SignUp = () => {
    const [values, setValues] = useState({
        // here all input fields will be stored in state object
        Username: "",
        Email: "",
        Password: "",
        confirmPassword: "",
    });

    const [signUp,setSignUp] = useState(false);

    // const [values,setValues] = useState("");

    console.log(values);

    // now we will create a input object which will have an array of objects each object is here info about each form field
    // in form input element has name attribute which is used to uniquely determine the that input only it is helpful to retrieve its info in backend

    const inputValues = [
        {
            id: 1,
            name: "Username",
            placeholder: "Username",
            label: "Username",
            errorMessage:
                "Username should be 3-16 characters and shouldn't include any special character!",
            type: "text",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true,
        },
        {
            id: 2,
            name: "Email",
            placeholder: "Email",
            label: "Email",
            errorMessage: "It should be valid Email!",
            type: "email",
            required: true,
        },
        {
            id: 4,
            name: "Password",
            placeholder: "Password",
            label: "Password",
            errorMessage:
                "Password should be 8-20 characters and include at least 1 letter, 1 number, 1 special character!",
            type: "password",
            pattern:
                "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
            required: true,
        },
        {
            id: 5,
            name: "confirmPassword",
            placeholder: "Confirm Password",
            label: "Confirm Password",
            errorMessage: "Passwords do not match!",
            type: "password",
            pattern: values.Password,
            required: true,
        },
    ];

    // to set values of state object we can this via setValues(key: updatedValue) we need to pass new object with updated values

    const handleValuesChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(
                "https://descriptive-bubble-production.up.railway.app/auth/signup",
                {
                    name: values.Username,
                    email: values.Email,
                    password: values.Password,
                }
            )
            .then((response) => {
                console.log(response);
                setSignUp(true);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return signUp ? <Navigate to="/home" replace={true}/> : (
        <div className="signup-form">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Registration</h1>
                {/* <FormInput value={values.username} {...inputValues[0]} onChange={handleValuesChange} /> */}
                {inputValues.map((input) => {
                    return (
                        <FormInput
                            key={input.id}
                            value={values[input.name]}
                            onChange={handleValuesChange}
                            {...input}
                        />
                    );
                })}
                <button type="submit"> Submit </button>
                <Link to="/signin">
                    <button className="signin-btn"> Already Have an account </button>
                </Link>
            </form>
        </div>
    );
};

export default SignUp;
