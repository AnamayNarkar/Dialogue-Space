import React, { useState } from "react";
import axios from "axios";
import "../styles/Loginbox.css";

function Loginbox(props) {

  const [showSignUp, setShowSignUp] = useState(false);
  const redDivStyles = {
    left: showSignUp ? "50%" : "0",
    right: showSignUp ? "0" : "50%",
    borderRadius: showSignUp ? "0 20px 20px 0" : "20px 0 0 20px",
  };

  const handleToggleForm = () => {
    setShowSignUp((prevState) => !prevState);
  };

  const [loginData, setLoginData] = useState({
    usernameoremail: "",
    password: "",
  });

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const handleLoginChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const handleSignUpChange = (event) => {
    setSignUpData({ ...signUpData, [event.target.name]: event.target.value });
  };

  async function handleSignUpSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post("/signup", signUpData);
      if (response.data.message == "User saved successfully") {
        props.setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        props.setUserData(response.data.data);
        localStorage.setItem("userData", JSON.stringify(response.data.data));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function handleLoginSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post("/login", loginData);
      if (response.data.message == "Login successful") {
        props.setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        props.setUserData(response.data.data);
        localStorage.setItem("userData", JSON.stringify(response.data.data));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="loginBox">
      <div className="redDiv" style={redDivStyles}>
        <h1>{showSignUp ? "Welcome to the Club" : "Welcome Back"}</h1>
        <h2>{showSignUp ? "SignUp to Continue" : "Login to Continue"}</h2>
        <p onClick={handleToggleForm}>
          {showSignUp ? "Already have an account?" : "Don't have an account?"}
        </p>
      </div>
      <form
        className={`signUpForm ${showSignUp ? "" : "hidden"}`}
        onSubmit={handleSignUpSubmit}
      >
        <input
          className="setNameInput"
          placeholder="Enter your Name"
          name="name"
          value={signUpData.name}
          onChange={handleSignUpChange}
          autoComplete="off"
        />
        <input
          className="setEmailInput"
          placeholder="Enter your Email"
          name="email"
          value={signUpData.email}
          onChange={handleSignUpChange}
          autoComplete="off"
        />
        <input
          className="setUsernameInput"
          placeholder="Set your Username"
          name="username"
          value={signUpData.username}
          onChange={handleSignUpChange}
          autoComplete="off"
        />
        <input
          className="setPasswordInput"
          placeholder="Set your Password"
          name="password"
          value={signUpData.password}
          onChange={handleSignUpChange}
          autoComplete="off"
        />
        <button type="submit">Sign Up</button>
      </form>
      <form
        className={`loginForm ${showSignUp ? "hidden" : ""}`}
        onSubmit={handleLoginSubmit}
      >
        <input
          className="enterUsernameOrEmailInput"
          placeholder="Enter Username or Email"
          name="usernameoremail"
          value={loginData.usernameoremail}
          onChange={handleLoginChange}
          autoComplete="off"
        />
        <input
          className="enterPasswordInput"
          placeholder="Enter your password"
          name="password"
          value={loginData.password}
          onChange={handleLoginChange}
          autoComplete="off"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Loginbox;
