import React, { useState } from "react";
import axios from "axios";
import "../styles/Loginbox.css";

function Loginbox(props) {

  const [loading, setLoading] = useState(false);

  function delay(time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

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
    
    if(signUpData.name === "" || signUpData.email === "" || signUpData.username === "" || signUpData.password === ""){
      alert("Please fill in all the fields");
      return;
    }

    if(signUpData.username.includes(" ")){
      alert("Username cannot contain spaces");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!emailPattern.test(signUpData.email)){
      alert("Please enter a valid email address");
      return;
    }


    try {

      setLoading(true);

      const response = await axios.post("/signup", signUpData);
      if (response.data.message == "User saved successfully") {
        localStorage.setItem("userData", JSON.stringify(response.data.data));
        props.setUserData(response.data.data);
        console.log(response.data.data)
        await delay(1500); 
        localStorage.setItem("isLoggedIn", true);
        props.setIsLoggedIn(true);
      }else{
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLoginSubmit(event) {

    event.preventDefault();

    if(loginData.usernameoremail === "" || loginData.password === ""){
      alert("Please fill in all the fields");
      return;
    }

    if(loginData.usernameoremail.trim().includes(" ")){
      alert("Username or Email cannot contain spaces");
      return;
    }

    try {

      setLoading(true);

      const response = await axios.post("/login", loginData);
      if (response.data.message == "Login successful") {
        props.setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        props.setUserData(response.data.data);
        localStorage.setItem("userData", JSON.stringify(response.data.data));
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
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
          maxLength={20}
        />
        <input
          className="setPasswordInput"
          placeholder="Set your Password"
          name="password"
          value={signUpData.password}
          onChange={handleSignUpChange}
          autoComplete="off"
        />
        <button type="submit" disabled={loading}> {loading ? "Submitting..." : "Sign Up"} </button>
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
        <button type="submit" disabled={loading}> {loading ? "Submitting..." : "Login"} </button>
      </form>
    </div>
  );
}

export default Loginbox;