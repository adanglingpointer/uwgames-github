import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './HomePage';
import GamesPage from './GamesPage.js';
import HeaderContent from './HeaderContent';
import FooterContent from './FooterContent';
import LoginContent from './LoginContent';
import Heli from './Heli';
import axios from 'axios';
import {checkLogIn, getGame} from './ApiCalls';

function App() {
  var [currentPage, setCurrentPage] = useState('home');
  var [loggedIn, changeStatus] = useState(false);

    // -=-=-= testing function =-=-=- //
    function testMe(event) {
      //
    }
    // -=-=-= end of testing =-=-=- //


    //  set the default view to login page
    var currentView = <LoginContent setLogin={logInUser} checkClick={handleClick} />;

    // check cookie to authenticate user on page load
    checkLogIn();

  //  handle navigation link clicks
  function handleClick(event){
    setCurrentPage(event);
  }



  //  set the login status of user based on server response
  function logInUser(e){
    if (e==true) {
      changeStatus(true);
      currentPage = "home";
      currentView = <HomePage />;
    } else if (e==false) {
      changeStatus(false);
    }

  }

    if (loggedIn==true) {
      checkLogIn(changeStatus);
      if (currentPage === 'home') {
        currentView = <HomePage />;
      } else if (currentPage === 'games') {
        currentView = <GamesPage checkClick={handleClick} />;
      } else if (currentPage === 'heli') {
        currentView = <Heli />;
      } else if (currentPage === 'login') {
        currentView = <LoginContent setLogin={logInUser} checkClick={handleClick} />;
      }
    } else if (loggedIn == false) {
        checkLogIn(changeStatus);
      }

  return (
    <div className="App">

<HeaderContent checkClick={handleClick} />

{currentView}

<FooterContent />

    </div>
  );
}

export default App;
