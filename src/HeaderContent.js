import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {checkLogIn, getCoins} from './ApiCalls';
import axios from 'axios';
import App from './App';

function HeaderContent(props) {

  var [nCoins, updateCoins] = useState(0);

    //  get user's coins
    async function setCoins() {
      const userCoins = await getCoins();
      updateCoins(userCoins);
    }
    setCoins();

  function getClick(event) {
    props.checkClick(event.target.getAttribute('id'));
  }

  async function doLogout() {
    try {
      const response = await axios.get("http://localhost:3020/logout", {withCredentials: true});
      let { message } = response.data;
      return message;
    } catch (error) {
      console.log(error);
    }
  }

  function handleLogout(e) {
    doLogout();
    props.checkClick('login');
    return;
  }


    return (
        <div className="HeaderContent">

<head>

      <link rel="stylesheet" type="text/css" href="home.css" />

  <title>UnlimitedWeb</title>
</head>

<header>
    <h1>UnlimitedWeb</h1>
    <nav>
      <ul>
        <li><span onClick={getClick} id="home" className="nav-link">Home</span></li>
        <li><a href="#">News</a></li>
        <li><span onClick={getClick} id="games" className="nav-link">Games</span></li>
        <li><a href="#">Community</a></li>
        <li><a href="#">Shop</a></li>
        <li><span onClick={handleLogout} id="login" className="nav-link">Logout</span></li>
      </ul>
    </nav>
  </header>
  <p className="coins">¤ {(nCoins) ? nCoins : 0} &nbsp;</p>

</div>
  );
}

export default HeaderContent;