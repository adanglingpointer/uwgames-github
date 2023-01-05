import "../Styles/App.css";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "../Styles/index.css";

function GamesPage(props) {
  function getClick(event) {
    props.checkClick(event.target.getAttribute("name"));
  }

  return (
    <div className="GamesPage">
      <div className="main-content">
        <h1>Games</h1>
        <div className="game-categories">
          <ul>
            <li>
              <a href="#">Action</a>
            </li>
            <li>
              <a href="#">Adventure</a>
            </li>
            <li>
              <a href="#">Casino</a>
            </li>
            <li>
              <a href="#">Puzzle</a>
            </li>
            <li>
              <a href="#">RPG</a>
            </li>
            <li>
              <a href="#">Strategy</a>
            </li>
          </ul>
        </div>
        <div className="featured-games">
          <h2>Featured Games</h2>
          <div className="game-boxes">
            <div className="game-box">
              <img
                src="delivery.png"
                alt="Game 1"
                className="game-img"
                name="heli"
                onClick={getClick}
              />
              <h3>
                <span onClick={getClick} name="heli" className="nav-link">
                  Parcel Delivery
                </span>
              </h3>
              <p>
                <span onClick={getClick} name="heli" className="nav-link">
                  Deliver the package through the cave.
                </span>
              </p>
            </div>
            <div className="game-box">
              <img src="game2.png" alt="Game 2" />
              <p>Game 2</p>
            </div>
            <div className="game-box">
              <img src="game3.png" alt="Game 3" />
              <p>Game 3</p>
            </div>
          </div>
        </div>
        <div className="all-games">
          <h2>All Games</h2>
          <div className="game-grid">
            <div className="game-card">
              <img src="game4.png" alt="Game 4" />
              <p>Game 4</p>
            </div>
            <div className="game-card">
              <img src="game5.png" alt="Game 5" />
              <p>Game 5</p>
            </div>
            <div className="game-card">
              <img src="game6.png" alt="Game 6" />
              <p>Game 6</p>
            </div>
            <div className="game-card">
              <img src="game7.png" alt="Game 7" />
              <p>Game 7</p>
            </div>
            <div className="game-card">
              <img src="game8.png" alt="Game 8" />
              <p>Game 8</p>
            </div>
            <div className="game-card">
              <img src="game9.png" alt="Game 9" />
              <p>Game 9</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamesPage;
