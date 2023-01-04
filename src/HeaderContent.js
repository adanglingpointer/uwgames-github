import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./home.css";
import axios from "axios";
import App from "./App";

function HeaderContent(props) {
  var [nCoins, updateCoins] = useState(props.numCoins);

  useEffect(() => {
    // This code will run after the component has mounted
    updateCoins(props.numCoins);
  }, [props.numCoins]);

  props.getCoins();

  function getClick(event) {
    props.checkClick(event.target.getAttribute("id"));
  }

  async function doLogout() {
    try {
      const response = await axios.get("http://localhost:3020/logout", {
        withCredentials: true,
      });
      let { message } = response.data;
      return message;
    } catch (error) {
      console.log(error);
    }
  }

  function handleLogout(e) {
    doLogout();
    props.checkClick("login");
    return;
  }

  var handleOptionChange = event => {
    // console.log(event.target.selectedIndex);
    let selectedPage = event.target.selectedIndex;
    console.log(selectedPage);
    switch (selectedPage) {
      case 0:
        props.checkClick("home");
        break;
      case 1:
        break;
      case 2:
        props.checkClick("games");
        break;
      case 5:
        handleLogout();
      default:
        break;
    }
  }

  return (
    <div className="HeaderContent">
      <header>
        <h1>Unlimited Web</h1>
        <nav>
          <ul>
            <li>
              <span onClick={getClick} id="home" className="nav-link">
                Home
              </span>
            </li>
            <li>
              <a href="#">News</a>
            </li>
            <li>
              <span onClick={getClick} id="games" className="nav-link">
                Games
              </span>
            </li>
            <li>
              <a href="#">Community</a>
            </li>
            <li>
              <a href="#">Shop</a>
            </li>
            <li>
              <span onClick={handleLogout} id="login" className="nav-link">
                Logout
              </span>
            </li>
          </ul>

          <select onChange={handleOptionChange}>
            <option value="/" selected="selected">Home</option>
            <option value="/">News</option>
            <option value="/">Games</option>
            <option value="/">Community</option>
            <option value="/">Shop</option>
            <option value="/">Logout</option>
          </select>
          <p className="coins">¤ {nCoins ? nCoins : 0} &nbsp;</p>
        </nav>
        
      </header>
      
    </div>
  );
}

export default HeaderContent;
