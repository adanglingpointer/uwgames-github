import "./App.css";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HomePage from "./HomePage";
import GamesPage from "./GamesPage.js";
import HeaderContent from "./HeaderContent";
import FooterContent from "./FooterContent";
import LoginContent from "./LoginContent";
import Heli from "./Heli";
import axios from "axios";
import { checkLogIn, getCoins } from "./ApiCalls";

function App() {
  var [currentPage, setCurrentPage] = useState("home");
  var [loggedIn, changeStatus] = useState(false);
  var [userCoins, setUserCoins] = useState(0);

  React.useEffect(() => {}, []);

  // -=-=-= testing function =-=-=- //
  function testMe(event) {
    //
  }
  // -=-=-= end of testing =-=-=- //

  //  set the default view to login page
  var currentView = (
    <LoginContent setLogin={logInUser} checkClick={handleClick} />
  );

  // check cookie to authenticate user on page load
  checkLogIn();

  //  handle navigation link clicks
  function handleClick(event) {
    console.log("setCurrentPage "+event);
    setCurrentPage(event);
  }

  async function fetchCoins() {
    const getUserCoins = await getCoins();
    setUserCoins(getUserCoins);
  }
  fetchCoins();

  //  set the login status of user based on server response
  function logInUser(e) {
    if (e == true) {
      changeStatus(true);
    } else if (e == false) {
      changeStatus(false);
    }
  }

  if (loggedIn == true) {
    checkLogIn(changeStatus);
    if (currentPage === "home") {
      currentView = <HomePage />;
    } else if (currentPage === "games") {
      currentView = <GamesPage checkClick={handleClick} />;
    } else if (currentPage === "heli") {
      currentView = <Heli updateCoins={fetchCoins} />;
    } else if (currentPage === "login") {
      currentView = (
        <LoginContent setLogin={logInUser} checkClick={handleClick} />
      );
    }
  } else if (loggedIn == false) {
    checkLogIn(changeStatus);
  }

  return (
    <div className="App">
      <HeaderContent
        checkClick={handleClick}
        numCoins={userCoins}
        getCoins={fetchCoins}
      />

      {currentView}

      <FooterContent />
    </div>
  );
}

export default App;
