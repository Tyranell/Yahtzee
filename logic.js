const diceThrows = [];
const diceIHave = [];

let timesThrownPerTurn = 0;

let sameThrows = 0;
let sameThrows2 = 0;
let sequenceThrows = 0;

let acesThrown = 0;
let twosThrown = 0;
let threesThrown = 0;
let foursThrown = 0;
let fivesThrown = 0;
let sixesThrown = 0;

let acesScore = 0;
let twosScore = 0;
let threesScore = 0;
let foursScore = 0;
let fivesScore = 0;
let sixesScore = 0;
let upperTotal = 0;
let bonusScore = 0;

let threeOfAKindScore = 0;
let fourOfAKindScore = 0;
let fullHouseScore = 0;
let smallStraightScore = 0;
let largeStraightScore = 0;
let yahtzeeScore = 0;
let chanceScore = 0;
let bottomTotal = 0;

let totalOverall = 0;

let acesCounted = false;
let twosCounted = false;
let threesCounted = false;
let foursCounted = false;
let fivesCounted = false;
let sixesCounted = false;

let yahtzeeThrown = false;
let twoOfAKindThrown = false;
let threeOfAKindThrown = false;
let fourOfAKindThrown = false;
let fullHouseThrown = false;
let smallStraightThrown = false;
let largeStraightThrown = false;

function throwDice() {
  for (let i = 0; i < 5; i++) {
    diceThrows[i] = Math.floor(Math.random() * 6) + 1;
  }
  document.getElementById("diceRolls").innerHTML = JSON.stringify(diceThrows);
}

function isItAYahtzee() {
  yahtzeeThrown = false;
  for (let j = 1; j <= 6; j++) {
    sameThrows = 0;
    for (let i = 0; i < 5; i++) {
      if (diceThrows[i] == j) {
        sameThrows++;
      }
    }
    if (sameThrows == 5 && !yahtzeeThrown) {
      yahtzeeThrown = true;
      yahtzeeScore += 50;
    }
  }
  document.getElementById("yahtzee").innerHTML = JSON.stringify(yahtzeeScore);
}

function isItAFOK() {
  for (let j = 1; j <= 6; j++) {
    sameThrows = 0;
    for (let i = 0; i < 5; i++) {
      if (diceThrows[i] == j) {
        sameThrows++;
      }
    }
    if (sameThrows >= 4 && !fourOfAKindThrown) {
      for (let i = 0; i < 5; i++) {
        fourOfAKindScore += diceThrows[i];
      }
    }
  }
  fourOfAKindThrown = true;
  document.getElementById("FOK").innerHTML = JSON.stringify(fourOfAKindScore);
}

function isItATOK() {
  for (let j = 1; j <= 6; j++) {
    sameThrows = 0;
    for (let i = 0; i < 5; i++) {
      if (diceThrows[i] == j) {
        sameThrows++;
      }
    }
    if (sameThrows >= 3 && !threeOfAKindThrown) {
      threeOfAKindThrown = true;
      for (let i = 0; i < 5; i++) {
        threeOfAKindScore += diceThrows[i];
      }
    }
  }
  document.getElementById("TOK").innerHTML = JSON.stringify(threeOfAKindScore);
}

function isItAFH() {
  threeOfAKindThrown = false;
  twoOfAKindThrown = false;
  for (let j = 1; j <= 6; j++) {
    sameThrows = 0;
    for (let i = 0; i < 5; i++) {
      if (diceThrows[i] == j) {
        sameThrows++;
      }
    }
    if (sameThrows == 3) {
      threeOfAKindThrown = true;
    }
  }
  for (let j = 1; j <= 6; j++) {
    sameThrows2 = 0;
    for (let i = 0; i < 5; i++) {
      if (diceThrows[i] == j) {
        sameThrows2++;
      }
    }
    if (sameThrows2 == 2) {
      twoOfAKindThrown = true;
    }
  }

  if (threeOfAKindThrown && twoOfAKindThrown && !fullHouseThrown) {
    fullHouseThrown = true;
    fullHouseScore += 25;
  }
  document.getElementById("FH").innerHTML = JSON.stringify(fullHouseScore);
}

function isItASmallStraight() {
  sequenceThrows = 0;
  for (let j = 1; j <= 6; j++) {
    for (let i = 0; i < 5; i++) {
      if (diceThrows[i] == j) {
        diceIHave[j - 1] = 1;
      }
    }
  }

  for (let i = 0; i < 6; i++) {
    if (diceIHave[i] == 1) {
      sequenceThrows++;
    } else {
      sequenceThrows = 0;
    }

    if (sequenceThrows >= 4 && !smallStraightThrown) {
      smallStraightThrown = true;
      smallStraightScore += 30;
    }
  }
  document.getElementById("smStraight").innerHTML =
    JSON.stringify(smallStraightScore);
}

function isItALargeStraight() {
  sequenceThrows = 0;
  for (let j = 1; j <= 6; j++) {
    for (let i = 0; i < 5; i++) {
      if (diceThrows[i] == j) {
        diceIHave[j - 1] = 1;
      }
    }
  }

  for (let i = 0; i < 6; i++) {
    if (diceIHave[i] == 1) {
      sequenceThrows++;
    } else {
      sequenceThrows = 0;
    }

    if (sequenceThrows == 5 && !largeStraightThrown) {
      largeStraightScore += 40;
    }
  }
  largeStraightThrown = true;
  document.getElementById("lrgStraight").innerHTML =
    JSON.stringify(largeStraightScore);
}

function aces() {
  for (let i = 0; i < 5; i++) {
    if (diceThrows[i] == 1) {
      acesThrown++;
    }
  }
  if (!acesCounted) {
    acesScore = acesThrown * 1;
    upperTotal += acesScore;
  }
  document.getElementById("aces").innerHTML = JSON.stringify(acesScore);
  acesCounted = true;
  bonus();
}

function twos() {
  for (let i = 0; i < 5; i++) {
    if (diceThrows[i] == 2) {
      twosThrown++;
    }
  }
  if (!twosCounted) {
    twosScore = twosThrown * 2;
    upperTotal += twosScore;
  }
  document.getElementById("twos").innerHTML = JSON.stringify(twosScore);
  twosCounted = true;
  bonus();
}

function threes() {
  for (let i = 0; i < 5; i++) {
    if (diceThrows[i] == 3) {
      threesThrown++;
    }
  }
  if (!threesCounted) {
    threesScore = threesThrown * 3;
    upperTotal += threesScore;
  }
  document.getElementById("threes").innerHTML = JSON.stringify(threesScore);
  threesCounted = true;
  bonus();
}

function fours() {
  for (let i = 0; i < 5; i++) {
    if (diceThrows[i] == 4) {
      foursThrown++;
    }
  }
  if (!foursCounted) {
    foursScore = foursThrown * 4;
    upperTotal += foursScore;
  }
  document.getElementById("fours").innerHTML = JSON.stringify(foursScore);
  foursCounted = true;
  bonus();
}

function fives() {
  for (let i = 0; i < 5; i++) {
    if (diceThrows[i] == 5) {
      fivesThrown++;
    }
  }
  if (!fivesCounted) {
    fivesScore = fivesThrown * 5;
    upperTotal += fivesScore;
  }
  document.getElementById("fives").innerHTML = JSON.stringify(fivesScore);
  fivesCounted = true;
  bonus();
}

function sixes() {
  for (let i = 0; i < 5; i++) {
    if (diceThrows[i] == 6) {
      sixesThrown++;
    }
  }
  if (!sixesCounted) {
    sixesScore = sixesThrown * 6;
    upperTotal += sixesScore;
  }
  document.getElementById("sixes").innerHTML = JSON.stringify(sixesScore);
  sixesCounted = true;
  bonus();
}

function bonus() {
  if (upperTotal >= 63) {
    bonusScore = 35;
  }
  document.getElementById("bonus").innerHTML = JSON.stringify(bonusScore);
}

/*
console.log(yahtzeeThrown);
console.log(fourOfAKindThrown);
console.log(threeOfAKindThrown);
console.log(fullHouseThrown);
console.log(diceIHave);
console.log(smallStraightThrown);
console.log(largeStraightThrown);
console.log(acesScore);
console.log(twosScore);
console.log(threesScore);
console.log(foursScore);
console.log(fivesScore);
console.log(sixesScore); 
*/
