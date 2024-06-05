import React, { useState } from "react";
import "../styles/Loginbox.css";

function Loginbox() {
  const [showSignUp, setShowSignUp] = useState(false);

  const redDivStyles = {
    left: showSignUp ? "50%" : "0",
    right: showSignUp ? "0" : "50%",
    borderRadius: showSignUp ? "0 20px 20px 0" : "20px 0 0 20px",
  };

  const handleToggleForm = () => {
    setShowSignUp((prevState) => !prevState);
  };

  return (
    <div className="loginBox">
      <div className="redDiv" style={redDivStyles}>
        <h1>{showSignUp ? "Welcome to the Club" : "Welcome Back"}</h1>
        <h2>{showSignUp ? "SignUp to Continue" : "Login to Continue"}</h2>
        <p onClick={handleToggleForm}>
          {showSignUp ? "Already have an account?" : "Don't have an account?"}
        </p>
      </div>
      <form className={`signUpForm ${showSignUp ? "" : "hidden"}`}>
        <input className="setNameInput" placeholder="Enter your Name"/>
        <input className="setEmailInput" placeholder="Enter your Email"/>
        <input className="setUsernameInput" placeholder="Set your Username"/>
        <input  className="setPasswordInput" placeholder="Set your Password"/>
        <button>Sign Up</button>
      </form>
      <form className={`loginForm ${showSignUp ? "hidden" : ""}`}>
        <input className="enterUsernameOrEmailInput" placeholder="Enter Username or Email"/>
        <input className="enterPasswordInput" placeholder="Enter your password"/>
        <button>Login</button>
      </form>
    </div>
  );
}

export default Loginbox;
