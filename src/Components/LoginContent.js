import "./Styles/App.css";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./Styles/index.css";
import "./Styles/LoginContent.css";
import axios from "axios";
import { regUser } from "./Api/ApiCalls";

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
        "https://apiserve.unlimitedweb.us/login",
        userLogin,
        { withCredentials: true }
      );
      let { message } = response.data;
      if (message === "success") {
        props.setLogin(true);

        props.checkClick("home");
        props.changeStatus(true);
      }
      // NEW SHIT
      else {
        props.setLogin(false);
        props.checkClick("home");
        props.changeStatus(false);
      }
      // END NEW
    } catch (error) {
      console.log(error);
    }
  }



  async function regMe(e) {
    e.preventDefault();
    try {
      let regStatus = await regUser(userLogin.username, userLogin.password);
        let isSuccess = regStatus.includes("may");
        if (isSuccess) {
          setRegButtonStyle({cursor: 'not-allowed', backgroundColor: 'grey'});
          setRegButtonDisabled(true);
          setInputStyle({background: 'LightGreen'})
        } else {
        }
        setStatusMsg(() => {
          return regStatus;
        });
    } catch (err) {
      console.log(err);
    }
  }

  function isUppercase(letter) {
    return letter === letter.toUpperCase();
  }

  function isNumber(str) {
    return !isNaN(Number(str));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    
    // only username is a controlled input (userState value==input value) so that we can manage live input
    // prevent a space from being entered in username
    if (userLogin.username==value.replace(/\s/g, '').trim()) {
      return;
    }

    // prevent a capital letter from being entered in username
    if (value[(value.length-1)]){
      if (!isNumber(value[(value.length-1)])){
        if (isUppercase(value[(value.length-1)])) {
          console.log("true");
          return;
        }
      }
    }

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
            value={userLogin.username}
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
        v1.0.5; Please be prepared for frequent changes, including database, users, and coins possibly deleted/reset through stages of development.
        often during Beta.
      </p>
      <p className="cookies">
      🍪 By using Unlimited Web you agree to the storing of cookies on your device to utilize account creation, authentication, and navigation. 🕵🏽‍♀️
      </p>
    </div>
  );
}

export default LoginContent;
