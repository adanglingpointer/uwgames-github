import './Styles/App.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';

function HomePage() {

  return (

    <div className="HomePage">


  <main>
    <h2>Welcome to UnlimitedWeb!</h2>
    <p>UnlimitedWeb is a virtual community where you play games to earn coins, and use them to buy properties and businesses!</p>
    <p><em>We are in beta (v1.0.5).</em></p>
    <br />
    <img src={require("./Images/home.png")} className="mainpage" />
  </main>

    </div>

  );
}

export default HomePage;



