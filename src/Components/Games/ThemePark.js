import React, { useState, useEffect } from "react";
import "../Styles/ThemePark.css";
import axios from "axios";

let ourApiKey = "abc";

export default function ThemePark() {

  var introdiv;
        //  intro
        var loanoption=0;
        var getThemeParkInfo; // will keep updated

        var [nRounds, setnRounds] = useState(2);
        var [introdiv, setintrodiv] = useState(``);
        var [introStage, setintroStage] = useState(3);
        var [nCount, setnCount] = useState(1);
        var [checkedDB, setcheckedDB] = useState(0);
        var [theLawyer, setLawyer] = useState("");
        var [maintWorker, setMaintWorker] = useState("");
        var [rides, setRidesLocal] = useState([])

  useEffect(() => {

    async function getGameInfo() {
      try {
        const response = await axios.get(
          "https://apiserve.unlimitedweb.us/games/themepark" + "?key=" + ourApiKey,
          { withCredentials: true }
        );
        let { message } = response.data;
        setcheckedDB(1);
        return message;     
 //       setnCount(nCount++);
      } catch (error) {
        console.log(error);
      }
    }

    if (checkedDB<1) {
    getThemeParkInfo = getGameInfo()
      .then((response) => {
        setnRounds(response);
        console.log(response);
        if (response === 1) {
 //        alert("yerp");
            setintroStage(-3);
            setnCount(nCount++);
//
            let getTheRides = getRides()
            .then((response2) => {
//              if ((!rides.indexOf(response2)) && (response2 != "")) { 
              setRidesLocal(response2);
              console.log(response2);

              if (response2.indexOf("bumpercars") != -1){
                console.log("bumpercars exists in array");
                document.getElementById("bumpercars-owned").innerText="Owned!";
                document.getElementById("buy-bumpercars").disabled=true;
                document.getElementById("buy-bumpercars").style.backgroundColor = "grey";
              }

              if (response2.indexOf("haunted") != -1){
                console.log("haunted exists in array");
                document.getElementById("haunted-owned").innerText="Owned!";
                document.getElementById("buy-haunted").disabled=true;
                document.getElementById("buy-haunted").style.backgroundColor = "grey";
              }

              if (response2.indexOf("starship") != -1){
                console.log("starship exists in array");
                document.getElementById("starship-owned").innerText="Owned!";
                document.getElementById("buy-starship").disabled=true;
                document.getElementById("buy-starship").style.backgroundColor = "grey";
              }

            })
            .catch((err) => {
              console.log(err);
            });
//
        } else {
//         alert("nerp " + nRounds + " " + response);
          setintroStage(3);
          setnCount(nCount++);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }

    async function getRides() {
      try {
        const response = await axios.get(
          "https://apiserve.unlimitedweb.us/games/themepark/rides" + "?key=" + ourApiKey,
          { withCredentials: true }
        );

        let { message } = response.data;
 //       console.log(message);
        return message;
      } catch (error) {
  //      console.log(error);
      }
    }

    async function setGameInfo(data) {
      try {
        const response = await axios.post(
          "https://apiserve.unlimitedweb.us/games/themepark/setl" + "?key=" + ourApiKey, {lawyer: data}, { withCredentials: true }
        );

        let { message } = response.data;
 //       console.log(message);
        return message;
      } catch (error) {
  //      console.log(error);
      }
    }

    async function setGameInfo2(data) {
      try {
        const response = await axios.post(
          "https://apiserve.unlimitedweb.us/games/themepark/setm" + "?key=" + ourApiKey, {maint: data}, { withCredentials: true }
        );

        let { message } = response.data;
 //       console.log(message);
        return message;
      } catch (error) {
  //      console.log(error);
      }
    }

    async function setRides(data) {
      try {
        const response = await axios.post(
          "https://apiserve.unlimitedweb.us/games/themepark/setrides" + "?key=" + ourApiKey, {newride: data}, { withCredentials: true }
        );

        let { message } = response.data;
 //       console.log(message);
        return message;
      } catch (error) {
  //      console.log(error);
      }
    }

//  start game with $1,000,000 in debt
var money = -1000000;
var sProfit;

//  start with no public interest in the park
var interest = 0;
var visitors = 0;  //  how many visitors at any given time inside the park
var ticketPrice = 0;  //  depends on how many attractions, interest, and visitors

//  set an empty array to hold employees, rides, and shops
//let employees=["rick","rudolf"];
let employees=[];
// let rides=[];
let shops=[];

//  set a timer for when we run ads
let inAd = 0;

//  setting some random number placeholders
var newRandomNumber;
var newRandomNumber2;

function updateProfit() {

  //  disable buttons for items we can't afford
  //  we are allowed to borrow up to $2,000,000 against investors
  if (money<((-2000000)+25000)){
      document.getElementById("buy-bumpercars").disabled=true;
      document.getElementById("buy-bumpercars").style.backgroundColor = "grey";
  }


  if (money<((-2000000)+30000)){
      document.getElementById("buy-haunted").disabled=true;
      document.getElementById("buy-haunted").style.backgroundColor = "grey";
  }

  if (money<((-2000000)+40000)){
      document.getElementById("buy-starship").disabled=true;
      document.getElementById("buy-starship").style.backgroundColor = "grey";
  }

  if (money<((-2000000)+50000)){
      document.getElementById("buy-carousel").disabled=true;
      document.getElementById("buy-carousel").style.backgroundColor = "grey";
  }

  if (money<((-2000000)+500000)){
      document.getElementById("buy-doubleshot").disabled=true;
      document.getElementById("buy-doubleshot").style.backgroundColor = "grey";
  }

  if (money<((-2000000)+1000000)){
      document.getElementById("buy-freakout").disabled=true;
      document.getElementById("buy-freakout").style.backgroundColor = "grey";
  }

  if (money<((-2000000)+28000000)){
      document.getElementById("buy-eltoro").disabled=true;
      document.getElementById("buy-eltoro").style.backgroundColor = "grey";
  }

  if (money<((-2000000)+8000)){
      document.getElementById("buy-hotdog").disabled=true;
      document.getElementById("buy-hotdog").style.backgroundColor = "grey";
  }

  if (money<((-2000000)+50000)){
      document.getElementById("buy-pizza").disabled=true;
      document.getElementById("buy-pizza").style.backgroundColor = "grey";
  }


// advertisement scheduling
  if (inAd>0){
    inAd--;
    document.getElementById("advertise").innerText=inAd;
  } else {
    let nPrice = 100*(interest*interest*interest*2);
    document.getElementById("advertise").disabled=false;
    document.getElementById("advertise").style.backgroundColor = "#3498db";
    document.getElementById("advertise").innerText="Advertise for $" + nPrice;
 if (interest==0) {document.getElementById("advertise").innerText=document.getElementById("advertise").innerText+" (free Google Ads credit!)";}
  }

  if ((money-(100*(interest*interest*interest*interest)))<=-2000000){
    if (rides.length==0) {
      document.getElementById("advertise").disabled=true;
      document.getElementById("advertise").style.backgroundColor = "grey";
    }
  }

  //  if we don't have staff yet, we'll exit function
  if (employees.indexOf("staff")===-1){
    return;
  }

  // employee paychecks
  if (employees.indexOf("staff") !== -1){
    money-=100;
  }

  //  lawyers
  // rudolf = bad
  // fredrick = okay
  // liam = great
  if (employees.indexOf("rudolf") !== -1){
    money-=25;
    newRandomNumber = Math.floor(Math.random() * 2000);
    if (newRandomNumber==250){
      newRandomNumber2 = Math.floor(Math.random() * 3);
      if (newRandomNumber2==0){
        console.log("You're being sued for an injury to the tune of $500,000!");
        money-=500000;
      }
      if (newRandomNumber2==1){
        console.log("You're being sued for an injury to the tune of $1,000,000!");
        money-=1000000;
      }
      if (newRandomNumber2==2){
        console.log("You're being sued for an injury to the tune of $2,000,000!");
        money-=2000000;
      }
    }
  }
  if (employees.indexOf("fredrick") !== -1){
    money-=50;
    newRandomNumber = Math.floor(Math.random() * 5000);
    if (newRandomNumber==350){
      newRandomNumber2 = Math.floor(Math.random() * 3);
      if (newRandomNumber2==0){
        console.log("You're being sued for an injury to the tune of $500,000!");
        money-=500000;
      }
      if (newRandomNumber2==1){
        console.log("You're being sued for an injury to the tune of $1,000,000!");
        money-=1000000;
      }
      if (newRandomNumber2==2){
        console.log("You're being sued for an injury to the tune of $2,000,000!");
        money-=2000000;
      }
    }
  }
  if (employees.indexOf("liam") !== -1){
    money-=75;
    newRandomNumber = Math.floor(Math.random() * 10000);
    if (newRandomNumber==725){
      newRandomNumber2 = Math.floor(Math.random() * 3);
      if (newRandomNumber2==0){
        console.log("You're being sued for an injury to the tune of $500,000!");
        money-=500000;
      }
      if (newRandomNumber2==1){
        console.log("You're being sued for an injury to the tune of $1,000,000!");
        money-=1000000;
      }
      if (newRandomNumber2==2){
        console.log("You're being sued for an injury to the tune of $2,000,000!");
        money-=2000000;
      }
    }
  }


  //  maintenance workers
  // rick - awful
  // jim - okay
  // tony - great
  if (employees.indexOf("rick") !== -1){
    money-=20;
    newRandomNumber = Math.floor(Math.random() * 500);
    if (newRandomNumber==125){
      newRandomNumber2 = Math.floor(Math.random() * 3);
      if (newRandomNumber2==0){
        console.log("A ride broke down, costing $2,000 in repairs!");
        money-=2000;
      }
      if (newRandomNumber2==1){
        console.log("A ride broke down, costing $20,000 in repairs!");
        money-=20000;
      }
      if (newRandomNumber2==2){
        console.log("A ride broke down, costing $200,000 in repairs!");
        money-=200000;
      }
    }
  }
  if (employees.indexOf("jim") !== -1){
    money-=40;
    newRandomNumber = Math.floor(Math.random() * 1000);
    if (newRandomNumber==250){
      newRandomNumber2 = Math.floor(Math.random() * 3);
      if (newRandomNumber2==0){
        console.log("A ride broke down, costing $2,000 in repairs!");
        money-=2000;
      }
      if (newRandomNumber2==1){
        console.log("A ride broke down, costing $20,000 in repairs!");
        money-=20000;
      }
      if (newRandomNumber2==2){
        console.log("A ride broke down, costing $200,000 in repairs!");
        money-=200000;
      }
    }
  }
  if (employees.indexOf("tony") !== -1){
    money-=60;
    newRandomNumber = Math.floor(Math.random() * 2000);
    if (newRandomNumber==500){
      newRandomNumber2 = Math.floor(Math.random() * 3);
      if (newRandomNumber2==0){
        console.log("A ride broke down, costing $2,000 in repairs!");
        money-=2000;
      }
      if (newRandomNumber2==1){
        console.log("A ride broke down, costing $20,000 in repairs!");
        money-=20000;
      }
      if (newRandomNumber2==2){
        console.log("A ride broke down, costing $200,000 in repairs!");
        money-=200000;
      }
    }
  }

  //  lucky payouts
  newRandomNumber = Math.floor(Math.random() * 500);
  if (newRandomNumber==301){
    newRandomNumber2 = Math.floor(Math.random() * 3);
    if (newRandomNumber2==0){
      console.log("You ran a local charity, raising $1,000 for your park as well.");
      money+=1000;
    }
    if (newRandomNumber2==1){
      console.log("You plant some more trees and are given a $50,000 grant.");
      money+=50000;
    }
    if (newRandomNumber2==2){
      console.log("You pick up a new sponsor giving you $500,000");
      money+=500000;
    }
  }

  //  paying for utilities
  money-=500;


  //  income from shops
  if (employees.indexOf("hotdog") !== -1){
    money+=20;
  }
  if (employees.indexOf("pizza") !== -1){
    money+=50;
  }


  visitors = Math.floor((interest*rides.length)*(Math.floor((Math.random() * 5)+1))/5);
  ticketPrice = interest*2;
  //  we set a cap on ticket price to $50
  if (ticketPrice>50){
    ticketPrice=50;
  }
  sProfit = visitors*ticketPrice;  //  profit per second
  money += sProfit;
  
  document.getElementById("money").innerHTML = money;
  document.getElementById("pInterest").innerText=interest;
  document.getElementById("nVisitors").innerText=visitors;
  document.getElementById("pTickets").innerText=ticketPrice;
}


function advertisePark() {
  if (interest<25 && inAd==0) {
    if (interest!=0) {
      money=money-(100*(interest*interest*interest*2));
    }
  interest+=1;
  document.getElementById("money").innerHTML = money;
    inAd=10*interest;
    document.getElementById("advertise").disabled=true;
    document.getElementById("advertise").style.backgroundColor = "grey";
  }
}

function hireManager() {
  if (money>=100) {
    if (employees.indexOf("manager") == -1){
    employees.push("manager");
    console.log("manager added");
  }
  else {
    console.log("manager must already be an employee");
    console.log(employees.indexOf("manager"));
  }
  document.getElementById("hire-manager").disabled=true;
  document.getElementById("hire-manager").style.backgroundColor = "grey";
  money-=100;
  }
}

function buyBumperCars() {
  if (money>=((-2000000)+25000)){
    if (rides.indexOf("bumpercars") == -1){
      rides.push("bumpercars");
      money-=25000;
      document.getElementById("bumpercars-owned").innerText="Owned!";
      document.getElementById("buy-bumpercars").disabled=true;
      document.getElementById("buy-bumpercars").style.backgroundColor = "grey";
      interest++;
      //
      let setNewRide = setRides("bumpercars")
      .then((response) => {
        console.log(response);
        alert(response);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
}

function buyHauntedManshion() {
  if (money>=((-2000000)+30000)){
    if (rides.indexOf("haunted") == -1){
      rides.push("haunted");
      money-=30000;
      document.getElementById("haunted-owned").innerText="Owned!";
      document.getElementById("buy-haunted").disabled=true;
      document.getElementById("buy-haunted").style.backgroundColor = "grey";
      interest++;
      //
      let setNewRide = setRides("haunted")
      .then((response) => {
        console.log(response);
        alert(response);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
}

function buyStarShip() {
  if (money>=((-2000000)+40000)){
    if (rides.indexOf("starship") == -1){
      rides.push("starship");
      money-=40000;
      document.getElementById("starship-owned").innerText="Owned!";
      document.getElementById("buy-starship").disabled=true;
      document.getElementById("buy-starship").style.backgroundColor = "grey";
      interest++;
    }
  }
}

function buyCarousel() {
  if (money>=((-2000000)+50000)){
    if (rides.indexOf("carousel") == -1){
      rides.push("carousel");
      money-=50000;
      document.getElementById("carousel-owned").innerText="Owned!";
      document.getElementById("buy-carousel").disabled=true;
      document.getElementById("buy-carousel").style.backgroundColor = "grey";
      interest++;
    }
  }
}

function buyDoubleshot() {
  if (money>=((-2000000)+500000)){
    if (rides.indexOf("doubleshot") == -1){
      rides.push("doubleshot");
      money-=500000;
      document.getElementById("doubleshot-owned").innerText="Owned!";
      document.getElementById("buy-doubleshot").disabled=true;
      document.getElementById("buy-doubleshot").style.backgroundColor = "grey";
      interest+=2;
    }
  }
}

function buyFreakout() {
  if (money>=((-2000000)+1000000)){
    if (rides.indexOf("freakout") == -1){
      rides.push("freakout");
      money-=1000000;
      document.getElementById("freakout-owned").innerText="Owned!";
      document.getElementById("buy-freakout").disabled=true;
      document.getElementById("buy-freakout").style.backgroundColor = "grey";
      interest+=3;
    }
  }
}

function buyEltoro() {
  if (money>=((-2000000)+28000000)){
    if (rides.indexOf("eltoro") == -1){
      rides.push("eltoro");
      money-=28000000;
      document.getElementById("eltoro-owned").innerText="Owned!";
      document.getElementById("buy-eltoro").disabled=true;
      document.getElementById("buy-eltoro").style.backgroundColor = "grey";
      interest+=5;
    }
  }
}

function buyHotdog() {
  if (money>=((-2000000)+8000)){
    if (rides.indexOf("hotdog") == -1){
      rides.push("hotdog");
      money-=8000;
      document.getElementById("hotdog-owned").innerText="Owned!";
      document.getElementById("buy-hotdog").disabled=true;
      document.getElementById("buy-hotdog").style.backgroundColor = "grey";
    }
  }
}

function buyPizza() {
  if (money>=((-2000000)+50000)){
    if (rides.indexOf("pizza") == -1){
      rides.push("pizza");
      money-=50000;
      document.getElementById("pizza-owned").innerText="Owned!";
      document.getElementById("buy-pizza").disabled=true;
      document.getElementById("buy-pizza").style.backgroundColor = "grey";
    }
  }
}

function hireStaff() {
    if (employees.indexOf("staff") == -1){
      employees.push("staff");
      document.getElementById("hire-staff").disabled=true;
      document.getElementById("hire-staff").style.backgroundColor = "grey";
    }
}

const unpick2 = () => {
  document.getElementById('loanoption2').checked=false;
  loanoption=1;
}

const unpick1 = () => {
  document.getElementById('loanoption1').checked=false;
  loanoption=2;
}

function hireRudolf() {

  let setThemeParkInfo = setGameInfo("rudolf")
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });

  setLawyer("rudolf");
  introStage--;
  introOne();
}

function hireFredrick() {

  let setThemeParkInfo = setGameInfo("fred")
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });

  setLawyer("fred");
  introStage--;
  introOne();
}

function hireLiam() {

  let setThemeParkInfo = setGameInfo("liam")
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });

  setLawyer("liam");
  introStage--;
  introOne();
}

function hireRick() {

  let setThemeParkInfo2 = setGameInfo2("rick")
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });

  setMaintWorker("rick");
  introStage--;
  introOne();
}

function hireJim() {

  let setThemeParkInfo2 = setGameInfo2("jim")
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });

  setMaintWorker("jim");
  introStage--;
  introOne();
}

function hireTony() {

  let setThemeParkInfo2 = setGameInfo2("tony")
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });

  setMaintWorker("tony");
  introStage--;
  introOne();
}

function startGame() {
  document.getElementById("intro").style.visibility="hidden";
  document.getElementById("backdrop").style.visibility="hidden";
}

const toggleOption1 = (event) => {
  document.getElementById("loan1").classList.toggle("show");
}

const toggleOption2 = (event) => {
  document.getElementById("loan2").classList.toggle("show");
}

//function introOne() {
  var introOne = (e) => {
  console.log("intro stage " + introStage);
  switch (introStage) {

    case -2:
      {
        document.getElementById("intro").innerHTML = `<h3>Fin'!</h3>
        <p>Alright pal, you're officially on your own.  A few things to keep in mind:<br />
         - You can borrow up to $2 Million (you're already -$1M) to purchase rides and shops, but the advertising agency allows you borrow unlimited money, 
         so be careful on how much you're spending.<br />
         - Your park will not officially open to the public until you hire the rest of your staff.<br />
         - The more popular your park becomes, the more visitors and the higher you can charge for admission.<br />
         - After reaching your breaking point (depending on the option you've chosen (break even or 2x)) you can either continue to invest into your park 
         or cash out (at a percentage) as Coins to use with the rest of the Unlimited Web.<br /></p>
         <br />
         <button class="introbutton" id="startgame">Let's Go!</button>
        `
        document.getElementById("startgame").addEventListener("click", startGame);
//        setnCount(nCount++);
        break;
      }

    case -1:
      {
        document.getElementById("intro").innerHTML = `<h3>The Maintenance Worker</h3>
        <p>Ride maintenance and repair is crutial to the everyday operation, and to the safety of your visitors.  The better your repair guy, the less likely 
          rides are to break down, and the cheaper they will be to fix.  However, with great talent comes a great paystub.</p>
          <br />
          <h4>Rick</h4>
          <p>Rick is currently a part-time maintenance worker for a local apartment complex.  He is somewhat handy, and willing to learn (as much as his brain allows 
            him to grasp).</p>
          <button class="introbutton" id="hirerick">Hire Rick</button>
          <br />
          <h4>Jim</h4>
          <p>Jim is a funny guy who knows his stuff from years of experience.  Although he knows how to put a wrench to good use, he tends to put his mouth and 
             humor first.  He can meet expectations, but admittedly--he sort of creeps out the other staff.</p>
          <button class="introbutton" id="hirejim">Hire Jim</button>
          <br />
          <h4>Tony</h4>
          <p>Tony is the type of guy who you see once during clock in and once at the end of the day.  He works nonstop during his shift, never complains, and gets 
            things accomplished before you realize they even needed attending to.  Tony is looking for a decent check so that he can settle on his career until 
            retirement.</p>
          <button class="introbutton" id="hiretony">Hire Tony</button>
        `
        document.getElementById("hirerick").addEventListener("click", hireRick);
        document.getElementById("hirejim").addEventListener("click", hireJim);
        document.getElementById("hiretony").addEventListener("click", hireTony);
//        setnCount(nCount++);
        break;
      }

    case 0:
      {
        document.getElementById("intro").innerHTML = `<h3>The Lawyer</h3>
        <p>Your legal counsil is very important for your park in order to prevent lawsuits, damages, and monetary claims.  The more adept your lawyer is, 
          The less likely you are to pay out to visitors, however, the more expensive it is for the lawyer's salary.</p>
          <br/>
          <h4>Rudolf</h4>
          <p>Rudolf lost his paper Degree, but he promises that he graduated from a local community college with straight B's!  What he lacks in experience, 
          he does not make up for in organization.  He may not be the greatest, but he's willing to try his best on most days.</p>
          <button class="introbutton" id="hirerudolf">Hire Rudolf</button>
          <br />
          <h4>Fredrick</h4>
          <p>Fred is a serious fella, and he meets standards.  He has gratitude for the job, but believes in a work-life balance, so you won't catch him working off the clock.  
          Fred has had experience before working for a fast food franchise (in the legal department, of course).</p>
          <button class="introbutton" id="hirefredrick">Hire Fredrick</button>
          <br />
          <h4>Liam</h4>
          <p>Touted for his extensive record of winning high-end legal cases in and out of court, Liam's pride is worn on his sleeve.  Liam knows that you will 
          expect nothing but the best of his abilities, and he expects a salary to match.  There's no legal battle that Liam is afraid to fight.</p>
          <button class="introbutton" id="hireliam">Hire Liam</button>
          `
//          setnCount(nCount++);
          document.getElementById("hirerudolf").addEventListener("click", hireRudolf);
          document.getElementById("hirefredrick").addEventListener("click", hireFredrick);
          document.getElementById("hireliam").addEventListener("click", hireLiam);
          break;
      }

    case 1:
      {
        if (!document.getElementById("loanoption1").checked && !document.getElementById("loanoption2").checked){
          alert('Please choose an option');
          break;
        }
        document.getElementById("intro").innerHTML = `<h3>The staff</h3>
        <p>Okay, fantastic!  You are really on a roll!</p>
        <p>In order to have an operational amusement park, it's a necessity that you hire some staff!</p>
        <p>Don't worry, we don't expect you to do the recruiting yourself, we've already found some applicants.  Click Next to choose the right one.</p>
        <button id="intro3">Next</button>
        `
        introStage--;
 //       setnCount(nCount++);
        document.getElementById("intro3").addEventListener("click", introOne);
        break;
      }

    case 2:
      {
        document.getElementById("intro").innerHTML = `<h3>The Investors</h3>
        <p>"Hey, kid,"</p>
        <p>"I hears yous lookin' for some investors to starts up your own business. Is that right?"</p>
        <p>"Truth is, we don't know no-one in town, ya see, but we know how to do business, and where to do business. And this town is the spot!"</p>
        <p>"Here's what we can offer ya, so think it over and uh, ya know--let us know."</p>
        <button id="option1" class="introbutton">Option #1 - .01% back after 2x paid ↯</button><br/>
          <div id="loan1" class="loan1">
            We lend you up to $2 Million.  $1M is needed for licenses, property, etc, and the other Million is for you to purchase rides and shops.  After your park 
            has made $4 Million in profit, you can cash out .01% profit above that.<br />
            <input type="radio" name="loan1" value="loan1" id="loanoption1">
            <label for="loan1">Pick option 1</label>
          </div>
        <button id="option2" class="introbutton">Option #2 - .005% back after break even ↯</button>
          <div id="loan2" class="loan2">
            We lend you up to $2 Million.  $1M is needed for licenses, property, etc, and the other Million is for you to purchase rides and shops.  After your park 
            has broken even ($0 debt), you can cash out .005% profit above that.<br />
            <input type="radio" name="loan2" value="loan2" id="loanoption2">
            <label for="loan2">Pick option 2</label>
          </div>
          <br />
          <button id="intro2">Next</button>
        `
        introStage--;
        document.getElementById("option1").addEventListener("click", toggleOption1);
        document.getElementById("option2").addEventListener("click", toggleOption2);
        document.getElementById("loanoption1").addEventListener("click", unpick2);
        document.getElementById("loanoption2").addEventListener("click", unpick1);
        document.getElementById("intro2").addEventListener("click", introOne);

        // document.getElementById("intro1").addEventListener("click", introOne);  doesn't fucking work
 //       setnCount(nCount++);
        break;    
      }

      case 3:
        {
  //        setnCount(nCount++);
          break;
        }
      
  
    default:
      break;
  }
}

document.getElementById("buy-bumpercars").addEventListener("click", buyBumperCars);
document.getElementById("buy-haunted").addEventListener("click", buyHauntedManshion);
document.getElementById("buy-starship").addEventListener("click", buyStarShip);
document.getElementById("buy-carousel").addEventListener("click", buyCarousel);
document.getElementById("buy-doubleshot").addEventListener("click", buyDoubleshot);
document.getElementById("buy-freakout").addEventListener("click", buyFreakout);
document.getElementById("buy-eltoro").addEventListener("click", buyEltoro);
document.getElementById("buy-hotdog").addEventListener("click", buyHotdog);
document.getElementById("buy-pizza").addEventListener("click", buyPizza);
document.getElementById("advertise").addEventListener("click", advertisePark);
document.getElementById("hire-staff").addEventListener("click", hireStaff);


//document.getElementById("intro1").addEventListener("click", introOne);  doesn't fucking work


  switch (introStage) {
    case 3:
      {
        setintrodiv(`<div class="backdrop" id="backdrop"></div>
        <div class="intro" id="intro">
        <h3>Welcome!</h3>
        <p>Hey there!  Welcome to the Theme Park wizard.</p>
        <p>It appears that this is your first time opening an amusement park.  No worries, this wizard will guide you through the process.</p>
        <p>Today is your lucky day, because new investors just arrived in town and are looking to fund their newest biggest venture!  Click next to meet them.</p>
        <button id='intro1'>Next</button>
        </div>`);

        introStage--;

        if (nCount==1){
        setnCount(nCount++);
        }
        
        // document.getElementById("intro1").addEventListener("click", introOne); 
        break;
      }
      default:
        {
//          this.alert(introStage);
          break;
        }
  }

if (document.getElementById("intro1")) {
  document.getElementById("intro1").addEventListener("click", introOne); 
  setnCount(nCount++);
}


setInterval(updateProfit, 1000);
//setnCount(nCount++);
  }, [nCount]);

  return (
    <div class="game-container">

{(introStage!=-3) ? <div className="backdrop2" id="backdrop2" dangerouslySetInnerHTML={{__html: introdiv}} /> : <div>meh</div>}

  <div class="header">
    <div class="title"></div>
    <div class="currency">$</div>
    <div class="money" id="money">-1000000</div>
  </div>
  <div class="businesses">

    <button class="advertise" id="advertise">Advertise Park</button>
    <p>Public Interest: <span id="pInterest">0</span></p>
    <p>Visitors: <span id="nVisitors">0</span></p>
    <p>Ticket Price: $<span id="pTickets">0</span></p>

    <h2>Rides</h2>

    <div class="business">
      <div class="business-icon"><img src={require("../Images/bumper-cars.jpg")} /></div>
      <div class="business-name">BUMPER-CARS</div>
      <div class="business-stats">
        <div class="business-owned" id="bumpercars-owned">Available for purchase</div>
        <div class="business-income">Interest: 1</div>
        <div class="business-cost">Cost: $25,000</div>
      </div>
      <button class="business-button" id="buy-bumpercars">Buy</button>
    </div>

    <div class="business">
      <div class="business-icon"><img src={require("../Images/haunted-mansion.jpg")} /></div>
      <div class="business-name">HAUNTED-MANSION</div>
      <div class="business-stats">
        <div class="business-owned" id="haunted-owned">Available for purchase</div>
        <div class="business-income">Interest: 1</div>
        <div class="business-cost">Cost: $30,000</div>
      </div>
      <button class="business-button" id="buy-haunted">Buy</button>
    </div>

    <div class="business">
      <div class="business-icon"><img src={require("../Images/starship.jpg")} /></div>
      <div class="business-name">STARSHIP</div>
      <div class="business-stats">
        <div class="business-owned" id="starship-owned">Available for purchase</div>
        <div class="business-income">Interest: 1</div>
        <div class="business-cost">Cost: $40,000</div>
      </div>
      <button class="business-button" id="buy-starship">Buy</button>
    </div>

    <div class="business">
      <div class="business-icon"><img src={require("../Images/carousel.jpg")} /></div>
      <div class="business-name">CAROUSEL</div>
      <div class="business-stats">
        <div class="business-owned" id="carousel-owned">Available for purchase</div>
        <div class="business-income">Interest: 1</div>
        <div class="business-cost">Cost: $50,000</div>
      </div>
      <button class="business-button" id="buy-carousel">Buy</button>
    </div>

    <div class="business">
      <div class="business-icon"><img src={require("../Images/doubleshot.jpg")} /></div>
      <div class="business-name">DOUBLESHOT</div>
      <div class="business-stats">
        <div class="business-owned" id="doubleshot-owned">Available for purchase</div>
        <div class="business-income">Interest: 2</div>
        <div class="business-cost">Cost: $500,000</div>
      </div>
      <button class="business-button" id="buy-doubleshot">Buy</button>
    </div>

    <div class="business">
      <div class="business-icon"><img src={require("../Images/freakout.jpg")} /></div>
      <div class="business-name">FREAK-OUT</div>
      <div class="business-stats">
        <div class="business-owned" id="freakout-owned">Available for purchase</div>
        <div class="business-income">Interest: 3</div>
        <div class="business-cost">Cost: $1,000,000</div>
      </div>
      <button class="business-button" id="buy-freakout">Buy</button>
    </div>

    <div class="business">
      <div class="business-icon"><img src={require("../Images/eltoro.jpg")} /></div>
      <div class="business-name">EL TORO</div>
      <div class="business-stats">
        <div class="business-owned" id="eltoro-owned">Available for purchase</div>
        <div class="business-income">Interest: 5</div>
        <div class="business-cost">Cost: $28,000,000</div>
      </div>
      <button class="business-button" id="buy-eltoro">Buy</button>
    </div>

  </div>

  <div class="businesses">
    
    <h2>Shops</h2>

    <div class="business">
      <div class="business-icon hotdog-stand"><img src={require("../Images/hotdog.jpg")} /></div>
      <div class="business-name">Hotdog Stand</div>
      <div class="business-stats">
        <div class="business-owned" id="hotdog-owned">Available for purchase</div>
        <div class="business-income">Profit: $20/s</div>
        <div class="business-cost">Cost: $8,000</div>
      </div>
      <button class="business-button" id="buy-hotdog">Buy</button>
    </div>

    <div class="business">
      <div class="business-icon pizza-stand"><img src={require("../Images/pizza.jpg")} /></div>
      <div class="business-name">Pizza Shop</div>
      <div class="business-stats">
        <div class="business-owned" id="pizza-owned">Available for purchase</div>
        <div class="business-income">Profit: $50/s</div>
        <div class="business-cost">Cost: $50,000</div>
      </div>
      <button class="business-button" id="buy-pizza">Buy</button>
    </div>



  </div>


  <div class="managers">
    <h2>Employees</h2>
    <div class="manager">
      <div class="manager-icon"></div>
      <div class="manager-name">Staff</div>
      <div class="manager-stats">
        <div class="manager-cost">Cost: $100/s</div>
      </div>
      <span class="">Staff are required for your park to open to the public.</span>
      <button class="manager-button" id="hire-staff">Hire</button>
    </div>
  </div>
</div>
  )
}