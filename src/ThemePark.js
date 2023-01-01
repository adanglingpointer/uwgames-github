import React from "react";
import {sendGame} from './ApiCalls';
import {getGame} from './ApiCalls'
import axios from 'axios';

export default function ThemePark() {
    React.useEffect(() => {
        // enter game logic here
    }, []);

    return ( 
      <div>
  
      <h1> Game Title </h1>
      <p id = "updates"> Click to start! </p>
      <canvas id = "game" width = "500" height = "500"></canvas>
  
      </div>
    );
  }