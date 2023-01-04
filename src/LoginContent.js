import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./LoginContent.css";
import axios from "axios";
import { regUser } from "./ApiCalls";
import App from "./App";

function LoginContent(props) {
  const [userLogin, setUser] = useState({
    username: "",
    password: "",
    withCredentials: true,
  });
  const [statusMsg, setStatusMsg] = useState("");
  const [regButtonStyle, setRegButtonStyle] = useState({backgroundColor: ''});
  const [regButtonDisabled, setRegButtonDisabled] = useState(false);
  const [inputStyle, setInputStyle] = useState({background: 'transparent'})

  async function logMeIn(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3020/login",
        userLogin,
        { withCredentials: true }
      );
      let { message } = response.data;
      if (message === "success") {
        props.setLogin(true);

        props.checkClick("home");
        props.changeStatus(true);
      }
    } catch (error) {
      console.log(error);
    }
  }



  async function regMe(e) {
    e.preventDefault();
    try {
      let regStatus = await regUser(userLogin.username, userLogin.password);
        // setStatusMsg(() => {
        //   return regStatus;
        // });
        let isSuccess = regStatus.includes("may");
        if (isSuccess) {
          console.log(regStatus);
          setRegButtonStyle({cursor: 'not-allowed', backgroundColor: 'grey'});
          setRegButtonDisabled(true);
          setInputStyle({background: 'LightGreen'})
        } else {
          console.log(regStatus);
        }
        setStatusMsg(() => {
          return regStatus;
        });
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInputStyle({background: 'transparent'})
    setUser((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  }

  return (
    <div className="LoginContent">
      <div class="login-container">
        <h1>Welcome to Unlimited Web</h1>
        <form>
          <label for="username">Username:</label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            style={inputStyle}
            onChange={handleChange}
          />
          <br />
          <label for="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            style={inputStyle}
            onChange={handleChange}
          />
          <br />
          <br />
          <div className="flex-me">
            <input
              type="submit"
              value="Login"
              onClick={
                userLogin.username.trim() != "" &&
                userLogin.password.trim() != ""
                  ? logMeIn
                  : null
              }
            />{" "}
            <input
              type="submit"
              value="Register"
              style={regButtonStyle}
              disabled={regButtonDisabled}
              onClick={
                userLogin.username.trim() != "" &&
                userLogin.password.trim() != ""
                  ? regMe
                  : null
              }
            />
          </div>
        </form>
      </div>

      <p id="status" name="status">
        {statusMsg}
      </p>
      <p>
        v1.0.2; Please be prepared for database, users, and coins to be deleted
        often during Beta.
      </p>
      <p className="cookies">
      🍪 By using Unlimited Web you agree to the storing of cookies on your device to utilize account creation, authentication, and navigation. 🕵🏽‍♀️
      </p>
    </div>
  );
}

export default LoginContent;
