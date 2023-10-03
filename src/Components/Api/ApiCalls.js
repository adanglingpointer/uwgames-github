import axios from "axios";

const ourApiKey = "abc";

//  send over cookie session info to authenticate each new page load
export async function checkLogIn(changeStatus) {
  try {
    const response = await axios.get(
      "https://apiserve.unlimitedweb.us/authme?key=" + ourApiKey,
      { withCredentials: true }
    );
    let { message } = response.data;
    if (message === "hey") {
      changeStatus(true);
    } else {
      changeStatus(false);
    }
  } catch (error) {
    console.error(error);
  }
}

//  register a user
export async function regUser(user, pass) {
  try {
    const response = await axios.post(
      "https://apiserve.unlimitedweb.us/register/" +
        user +
        "/" +
        pass +
        "?key=" +
        ourApiKey,
      { withCredentials: true }
    );
    let { message } = response.data;
    if (message === "yas") {
      return message;
    } else {
      return message;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}

//  send game info
export async function sendGame(game, times, score, coins) {
  let theUser;

  try {
    const response = await axios.get(
      "https://apiserve.unlimitedweb.us/authuser?key=" + ourApiKey,
      { withCredentials: true }
    );
    let { message } = response.data;
    theUser = message;
  } catch (error) {
    console.error(error);
    return error;
  }

  try {
    const response = await axios.post(
      "https://apiserve.unlimitedweb.us/gamescore/" +
        theUser +
        "/" +
        game +
        "/" +
        times +
        "/" +
        score +
        "/" +
        coins +
        "?key=" +
        ourApiKey,
      { withCredentials: true }
    );
    let { message } = response.data;
    if (message === "success") {
      return message;
    } else {
      return message;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}

//  get game info
export async function getGame(game) {
  let theUser;
  var theMessage;

  try {
    const response = await axios.get(
      "https://apiserve.unlimitedweb.us/authuser?key=" + ourApiKey,
      { withCredentials: true }
    );
    let { message } = response.data;
    theUser = message;
  } catch (error) {
    console.error(error);
    return error;
  }

  try {
    const response = await axios.get(
      "https://apiserve.unlimitedweb.us/games/gettimes/" +
        theUser +
        "/" +
        game +
        "?key=" +
        ourApiKey,
      { withCredentials: true }
    );
    let { message } = response.data;
    theMessage = message;
    return message;
  } catch (error) {
    return error;
  }
}

//  get coin info
export async function getCoins() {
  let theUser;
  var theMessage;

  try {
    const response = await axios.get(
      "https://apiserve.unlimitedweb.us/authuser?key=" + ourApiKey,
      { withCredentials: true }
    );
    let { message } = response.data;
    theUser = message;
  } catch (error) {
    console.error(error);
    return error;
  }

  try {
    const response = await axios.get(
      "https://apiserve.unlimitedweb.us/user/getcoins/" + theUser + "?key=" + ourApiKey,
      { withCredentials: true }
    );
    let { message } = response.data;
    theMessage = message;
    return message;
  } catch (error) {
    console.error(error);
    return error;
  }
}
