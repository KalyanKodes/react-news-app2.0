import React from "react";
import axios from "axios";

const signupFunction = async (e, userName, password, stateChanger) => {
    e.preventDefault();
    console.log("a;slhdflaksdj");
    console.log("userName:", userName);
    console.log("Password:", password);

    try {
        const response = await axios.post("http://localhost:3001/signup", {
            username: userName,
            password: password,
        });

        console.log("Response:", response.data);
        stateChanger(true);
    } catch (error) {
        console.error("Error uploading user details:", error.response.data);
        alert("Failed to upload user details");
    }
};

const loginFunction = async (e, userName, password, stateChanger) => {
    e.preventDefault();
    console.log("userName:", userName);
    console.log("Password:", password);

    try {
        const response = await axios.post("http://localhost:3001/login", {
            username: userName,
            password: password,
        });

        console.log("Response:", response.data);
        stateChanger(true);
    } catch (error) {
        console.error("Error uploading user details:", error.response.data);
        alert("Failed to upload user details");
    }
};

function Form({ setLoginStatus }) {
    // State variables for controlling form inputs and signup/login toggle
    const [showSignup, setShowSignUp] = React.useState(true);
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <div className="auth-container">
            {/* Title based on whether user is signing up or logging in */}
            <h1 className="auth-title">
                {showSignup ? "Sign Up" : "Login"} to access the News app
            </h1>
            {/* Form handling signup/login based on 'showSignup' state */}
            <form onSubmit={ showSignup ? (e) => signupFunction(e, userName, password, setLoginStatus) : (e) => loginFunction(e, userName, password, setLoginStatus) } >
                {/* Username input field */}
                <div className="form-group">
                    <label htmlFor="userName" className="form-label">Username:</label>
                    <input type="text" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} required className="form-input" />
                </div>
                {/* Password input field */}
                <div className="form-group">
                    <label htmlFor="password" className="form-label">
                        Password:
                    </label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-input" />
                </div>
                {/* Submit button */}
                <button type="submit" className="submit-button"> {showSignup ? "Sign Up" : "Login"} </button>
                {/* Toggle between signup and login */}
                <p style={{ cursor: "pointer" }} onClick={() => setShowSignUp(!showSignup)} > {showSignup ? "Already" : "Don't"} have an account? </p>
            </form>
        </div>
    );
}

export default Form;
