import React from "react";
import {sendGame} from './ApiCalls';
import {getGame} from './ApiCalls'
import axios from 'axios';

export default function HeliGame() {
  React.useEffect(() => {
    //  game logic goes here
  }, []);

  return ( 
    <div>

    <h1> Game Title </h1>
    <p id = "updates"> Clickt o start! </p>
    <canvas id = "game" width = "500" height = "500"></canvas>

    </div>
  );
}
