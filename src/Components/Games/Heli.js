import React from "react";
import { sendGame } from "../Api/ApiCalls";
import axios from "axios";
import "../Styles/Heli.css";

const ourApiKey = "abc";

export default function HeliGame(props) {
  React.useEffect(() => {
    var nRounds1; // will keep updated
    var nRounds2; // will always be from DB call

    async function getGameInfo(game) {
      try {
        const response = await axios.get(
          "https://apiserve.unlimitedweb.us/games/gettimes/" + game + "?key=" + ourApiKey,
          { withCredentials: true }
        );
        let { message } = response.data;
        return message;
      } catch (error) {
        console.log(error);
      }
    }

    nRounds2 = getGameInfo("heli")
      .then((response) => {
        nRounds2 = response;
        nRounds1 = nRounds2;
        if (nRounds2 >= 3) {
          update();
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // Set up the canvas and get the 2D context
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    // Set up initial game state
    let state = {
      playerX: 100,
      playerY: 350,
      playerSpeed: 3,
      landingPadX: 100,
      landingPadY: 400,
      walls: [
        {
          x: 400,
          y: 0,
        },
        {
          x: 400,
          y: 400,
        },
      ],
    };

    let isOnMobile = false;
    let started = false;

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      isOnMobile = true;
    }

    let spaceKeyDown = false;
    let nSteps = 0; // steps in the game to keep track of progression to increase difficulty
    let level = 1; // level of difficulty
    let gameEnd = 0;
    var clickStart = 2;

    // Draw the game
    function draw() {
      if (gameEnd < 1) {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the landing pad
        ctx.fillStyle = "red";
        ctx.fillRect(state.landingPadX, state.landingPadY, 50, 20);

        // Draw the player
        // Draw the spaceship body (circle and a triangle)
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(state.playerX + 25, state.playerY + 25, 25, 0, Math.PI * 2); // circle
        ctx.lineTo(state.playerX + 50, state.playerY + 50); // bottom-right point of the triangle
        ctx.lineTo(state.playerX, state.playerY + 50); // bottom-left point of the triangle
        ctx.fill();

        // Draw a border around the spaceship
        ctx.strokeStyle = "silver";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw a window on the spaceship
        ctx.fillStyle = "gold";
        ctx.beginPath();
        ctx.arc(state.playerX + 15, state.playerY + 15, 5, 0, Math.PI * 2);
        ctx.fill();

        // Draw an engine on the spaceship
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.moveTo(state.playerX + 50, state.playerY + 50); // start at the bottom-right point of the triangle
        ctx.lineTo(state.playerX + 60, state.playerY + 40); // draw a line to the right
        ctx.lineTo(state.playerX + 50, state.playerY + 30); // draw a line to the top-right point of the triangle
        ctx.fill();

        // Draw the walls
        ctx.fillStyle = "grey";
        state.walls.forEach((wall) => {
          ctx.fillRect(wall.x, wall.y, 50, 50);
        });

        // Randomly create new walls
        let rWall = Math.round(Math.random() * 100 + 400 + level);

        if (level < 30) {
          let rWall = Math.round(Math.random() * 100 + 400 + level);
          // Every 25 steps, 6 new walls are created
          if (nSteps % 25 === 0) {
            state.walls.push(
              {
                x: 400,
                y: rWall - 450,
              },
              {
                x: 400,
                y: rWall - level,
              }
            );
            state.walls.push(
              {
                x: 400,
                y: rWall - 500,
              },
              {
                x: 400,
                y: rWall - level + 50,
              }
            );
            state.walls.push(
              {
                x: 400,
                y: rWall - 550,
              },
              {
                x: 400,
                y: rWall - level + 100,
              }
            );
          }
        } // end of levels 1-199

        if (level > 30 && level < 150) {
          let myTestVar = document.getElementById("updates").innerHTML;
          document.getElementById("updates").innerHTML =
            "The walls are getting tighter!";
          let rWall = Math.round(Math.random() * 100 + 400);
          if (nSteps % 25 === 0) {
            state.walls.push(
              {
                x: 400,
                y: rWall - 450,
              },
              {
                x: 400,
                y: rWall - level * 0.5,
              }
            );
            state.walls.push(
              {
                x: 400,
                y: rWall - 500,
              },
              {
                x: 400,
                y: rWall - level * 0.5 + 50,
              }
            );
            state.walls.push(
              {
                x: 400,
                y: rWall - 550,
              },
              {
                x: 400,
                y: rWall - level * 0.5 + 100,
              }
            );
          }
        }

        if (level > 150 && level < 200) {
          document.getElementById("updates").innerHTML =
            "Take a deep breath, we might make it alive..";
          let rWall = Math.round(Math.random() * 100 + 400);
          if (nSteps % 25 === 0) {
            state.walls.push(
              {
                x: 400,
                y: rWall - 450,
              },
              {
                x: 400,
                y: rWall,
              }
            );
            state.walls.push(
              {
                x: 400,
                y: rWall - 500,
              },
              {
                x: 400,
                y: rWall,
              }
            );
            state.walls.push(
              {
                x: 400,
                y: rWall - 550,
              },
              {
                x: 400,
                y: rWall,
              }
            );
          }
        }

        if (level == 200) {
          document.getElementById("updates").innerHTML =
            "Watch out, it's getting cramped ahead!";
        }
        if (level == 300) {
          document.getElementById("updates").innerHTML =
            "I can see some relief ahead, hold on!";
        }
        if (level == 350) {
          document.getElementById("updates").innerHTML = "Wow, that was close!";
        }
        if (level == 400) {
          document.getElementById("updates").innerHTML = "Oh no...";
        }
        if (level == 450) {
          document.getElementById("updates").innerHTML =
            "You have GOT to stay focused!!!";
        }
        if (level == 550) {
          document.getElementById("updates").innerHTML =
            "You are almost there, don't give up!";
        }

        if (level > 200 && level < 350) {
          let rWall = Math.round(Math.random() * 100 + 400);
          if (nSteps % 25 === 0) {
            state.walls.push(
              {
                x: 400,
                y: rWall - 450,
              },
              {
                x: 400,
                y: rWall - level * 0.4,
              }
            );
            state.walls.push(
              {
                x: 400,
                y: rWall - 500,
              },
              {
                x: 400,
                y: rWall - level * 0.4 + 50,
              }
            );
            state.walls.push(
              {
                x: 400,
                y: rWall - 550,
              },
              {
                x: 400,
                y: rWall - level * 0.4 + 100,
              }
            );
          }
        }

        if (level > 350 && level < 450) {
          let rWall = Math.round(Math.random() * 100 + 400);
          if (nSteps % 25 === 0) {
            state.walls.push(
              {
                x: 400,
                y: rWall - 450,
              },
              {
                x: 400,
                y: rWall,
              }
            );
            state.walls.push(
              {
                x: 400,
                y: rWall - 500,
              },
              {
                x: 400,
                y: rWall,
              }
            );
            state.walls.push(
              {
                x: 400,
                y: rWall - 550,
              },
              {
                x: 400,
                y: rWall,
              }
            );
          }
        }

        if (level > 450 && level < 650) {
          let rWall = Math.round(Math.random() * 100 + 400);
          if (nSteps % 25 === 0) {
            state.walls.push(
              {
                x: 400,
                y: rWall - 450,
              },
              {
                x: 400,
                y: rWall - level * 0.3,
              }
            );
            state.walls.push(
              {
                x: 400,
                y: rWall - 500,
              },
              {
                x: 400,
                y: rWall - level * 0.3 + 50,
              }
            );
            state.walls.push(
              {
                x: 400,
                y: rWall - 550,
              },
              {
                x: 400,
                y: rWall - level * 0.3 + 100,
              }
            );
          }
        }

        // Increase the step count for every frame
        nSteps++;

        // Increase the level every 25 steps
        if (nSteps % 25 === 0) {
          level++;
        }

        // Check for player collision against all walls
        state.walls.forEach((wall, index) => {
          // If the player reached the bottom or top wall, adjusting +/-50 either way to account for player size
          if (
            (state.playerY == state.walls[index].y + 50 ||
              state.playerY == state.walls[index].y - 50) &&
            gameEnd < 1
          ) {
            // If this specific wall is close enough in proximity
            if (
              Math.abs(state.playerX - state.walls[index].x) < 50 &&
              gameEnd < 1
            ) {
              nRounds1 = nRounds2 + 1;
              sendGame("heli", nRounds1, level, level);
              gameEnd = 1;
              started = false;

              props.updateCoins();

              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.font = "24px sans-serif";
              ctx.fillStyle = "red";
              ctx.fillText("Game Over", 200, 200);
              ctx.fillText("Score: " + level, 220, 225);
              ctx.fillText("Coins earned: " + level, 175, 250);
              clickStart = 0;

              if (nRounds1 < 3) {
                ctx.fillText("Click to try again", 175, 300);
              } else if (nRounds1 >= 3) {
                ctx.fillText("Try again tomorrow!", 150, 300);
              }
              return;
            }
          }
        });

        if ((state.playerY >= 600 || state.playerY <= -400) && gameEnd < 1) {
          gameEnd = 1;
          started = false;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.font = "24px sans-serif";
          ctx.fillStyle = "red";
          ctx.fillText("You've gone missing in the void,", 100, 200);
          ctx.fillText("never to be heard from again.", 100, 250);
          clickStart = 0;

          if (nRounds2 < 3) {
            ctx.fillText("Click to try again", 175, 300);
          } else if (nRounds2 >= 3) {
            ctx.fillText("Try again tomorrow!", 175, 350);
          }
          return;
        }

        if (state.walls.length > 100) {
          state.walls.shift();
        }
      }
    }

    function reset() {
      nRounds2 = getGameInfo("heli")
        .then((response) => {
          nRounds2 = response;
          nRounds1 = nRounds2;
          if (nRounds2 >= 3) {
            gameEnd = 1;
            started = false;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = "24px sans-serif";
            ctx.fillStyle = "red";
            ctx.fillText("Game Over", 200, 200);
            ctx.fillText("Try again tomorrow!", 150, 300);
            clickStart = 0;
          } else if (nRounds2 < 3) {
            state = {
              playerX: 100,
              playerY: 350,
              playerSpeed: 3,
              landingPadX: 100,
              landingPadY: 400,
              walls: [
                {
                  x: 400,
                  y: 0,
                },
                {
                  x: 400,
                  y: 400,
                },
              ],
            };
            started = false;
            spaceKeyDown = false;
            nSteps = 0; // steps in the game to keep track of progression to increase difficulty
            level = 1; // level of difficulty
            gameEnd = 0;
            document.getElementById("updates").innerHTML =
              "Fly into the cave and don't hit the walls!";
            draw();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // Move the walls down the screen
    function moveWalls() {
      if (gameEnd < 1) {
        state.walls.forEach((wall) => {
          wall.x += -2;
        });

        if (!spaceKeyDown) {
          state.playerY += state.playerSpeed;
        } else if (spaceKeyDown) {
          state.playerY -= state.playerSpeed;
        }

        state.landingPadX -= 2;
      }
    }

    // Start the game loop
    //update();
    draw();

    // Set up game over logic
    function gameOver() {
      if (level == 655) {
        nRounds1 = nRounds2 + 1;
        sendGame("heli", nRounds1, level, level * 1.5);
        gameEnd = 1;
        started = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "24px sans-serif";
        ctx.fillStyle = "red";
        ctx.fillText("You Win!!!", 200, 200);
        ctx.fillText("Score: " + level, 220, 225);
        ctx.fillText("Coins earned ", 175, 250);
        ctx.fillText("with x1.5 bonus: " + level * 1.5, 175, 275);
        clickStart = 0;

        if (nRounds1 < 3) {
          ctx.fillText("Click to try again", 175, 300);
        } else if (nRounds1 >= 3) {
          ctx.fillText("Try again tomorrow!", 150, 300);
        }
        return;
      }
    }

    // Add the game over logic to the update function
    function update() {
      if (gameEnd < 1) {
        if (nRounds2 >= 3) {
          gameEnd = 1;
          started = false;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.font = "24px sans-serif";
          ctx.fillStyle = "red";
          ctx.fillText("Game Over", 200, 200);
          clickStart = 0;
          ctx.fillText("Try again tomorrow!", 150, 300);
        } else if (nRounds2 < 3) {
          // Move the walls and player
          moveWalls();

          // Check for game over
          gameOver();

          // Draw the game
          draw();

          // Request the next frame
          requestAnimationFrame(update);
        }
      }
    }

    // Detect is user is on mobile, and if so, also add event listeners for device
    if (isOnMobile) {
      // Add event listeners for the touchstart and touchend events
      //      document.addEventListener('touchstart', function(event) {
        console.log("working on dis jawn, thinks its mobile");
      var touchStartListener = (event) => {
        
        // if (event.button === 0) {
          if (started == false) {
            if (clickStart < 2) {
              if (clickStart == 1) {
                reset();
              }
              clickStart++;
            } else {
              clickStart = 0;
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              started = true;
              update();
              update();
            }
          }
          spaceKeyDown = true;
        // }
        event.preventDefault();
      };

      document.addEventListener("touchstart", touchStartListener);

      document.addEventListener("touchend", function (event) {
        // Set the screenHeld variable to false when the user releases their finger from the screen
        spaceKeyDown = false;
        // event.preventDefault();
      });
    } else {
      // User is on desktop, so check for mouse clicks instead
      // Add event listeners for the mousedown and mouseup events
      var checkMouseDown = (event) => {
        // If the left mouse button is pressed, set the leftMouseButtonDown variable to true
        if (event.button === 0) {
          if (started == false) {
            if (clickStart < 2) {
              if (clickStart == 1) {
                reset();
              }
              clickStart++;
            } else {
              clickStart = 0;
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              //  reset();
              started = true;
              update();
              update();
            }
          }
          spaceKeyDown = true;
           event.preventDefault();
        }
      };

      document.addEventListener("mousedown", checkMouseDown);

      document.addEventListener("mouseup", function (event) {
        // If the left mouse button is released, set the leftMouseButtonDown variable to false
        if (event.button === 0) {
          spaceKeyDown = false;
          event.preventDefault();
        }
      });
    }

    return function cleanUp() {
      // removing click/touch listeners to prevent form input issues (ie. logout from this page and log back in)
      document.removeEventListener("mousedown", checkMouseDown);
      document.removeEventListener("touchstart", touchStartListener);
    };
  }, []);

  return (
    <div id="parcelgame">
      <h1> Parcel Delivery </h1>
      <p id="updates"> Fly into the cave and don't hit the walls!</p>
      <canvas id="game" width="500" height="500"></canvas>
    </div>
  );
}
