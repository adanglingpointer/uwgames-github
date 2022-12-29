import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';
import {regUser} from './ApiCalls';
import App from './App';

function LoginContent(props) {

    const [userLogin, setUser] = useState({
        username: "",
        password: "",
        withCredentials: true
    });
    const [statusMsg, setStatusMsg] = useState('')

    
    async function logMeIn(e) {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:3020/login", userLogin, {withCredentials: true});
        let { message } = response.data;
        if (message === "success") {
          props.setLogin(true);

          props.checkClick('home');
          props.changeStatus(true);

        }
      } catch (error) {
        console.log(error);
      }
    }

    async function regMe(e) {
      e.preventDefault();
      try {
        let didWork = await regUser(userLogin.username, userLogin.password);
        if (didWork=='yas') {
          setStatusMsg(() => {
            return "yas";
          })
        } else {
          setStatusMsg(() => {
            return didWork;
          })
        }
      } catch (err) {
        console.log(err)
      }

    }
    
    function handleChange(e) {
        const {name, value} = e.target;
        setUser(prevVal => {
            return {
                ...prevVal,
                [name]: value
            }
        });
    }

  return (

    <div className="LoginContent">


<div class="login-container">
    <h1>Welcome to UnlimitedWeb</h1>
    <form>
      <label for="username">Username:</label><br />
      <input type="text" id="username" name="username" onChange={handleChange} /><br />
      <label for="password">Password:</label><br />
      <input type="password" id="password" name="password" onChange={handleChange} /><br /><br />
      <div className="flex-me">
      <input type="submit" value="Login" onClick={((userLogin.username).trim()) !='' && ((userLogin.password).trim()) !='' ? logMeIn : null} /> <input type="submit" value="Register" onClick={((userLogin.username).trim()) !='' && ((userLogin.password).trim()) !='' ? regMe : null} />
      </div>
    </form> 
  </div>

  <p id="status" name="status">{statusMsg}</p>

    </div>

  );
}

export default LoginContent;



