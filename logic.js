const diceThrows = [];
const diceIHave = [0, 0, 0, 0, 0, 0];

var timesThrownPerTurn = 0;

var sameThrows = 0;
var sameThrows2 = 0;
var sequenceThrows = 0;

var acesThrown = 0;
var twosThrown = 0;
var threesThrown = 0;
var foursThrown = 0;
var fivesThrown = 0;
var sixesThrown = 0;

var acesScore = 0;
var twosScore = 0;
var threesScore = 0;
var foursScore = 0;
var fivesScore = 0;
var sixesScore = 0;
var upperTotal = 0;
var bonusScore = 0;

var threeOfAKindScore = 0;
var fourOfAKindScore = 0;
var fullHouseScore = 0;
var smallStraightScore = 0;
var largeStraightScore = 0;
var yahtzeeScore = 0;
var chanceScore = 0;
var bottomTotal = 0;

var totalOverall = 0;

var yahtzeeThrown = false;
var twoOfAKindThrown = false;
var threeOfAKindThrown = false;
var fourOfAKindThrown = false;
var fullHouseThrown = false;
var smallStraightThrown = false;
var largeStraightThrown = false;

function throwDice() {
  for (let i = 0; i < 5; i++) {
    diceThrows[i] = Math.floor(Math.random() * 6) + 1;
  }
  document.getElementById("diceRolls").innerHTML = JSON.stringify(diceThrows);
}

function isItAYahtzee() {
  for (let j = 1; j <= 6; j++) {
    sameThrows = 0;
    for (let i = 0; i < 5; i++) {
      if (diceThrows[i] == j) {
        sameThrows++;
      }
    }
    if (sameThrows == 5) {
      yahtzeeThrown = true;
    }
  }
}

function isItAFOK() {
  for (let j = 1; j <= 6; j++) {
    sameThrows = 0;
    for (let i = 0; i < 5; i++) {
      if (diceThrows[i] == j) {
        sameThrows++;
      }
    }
    if (sameThrows >= 4) {
      fourOfAKindThrown = true;
    }
  }
}

function isItATOK() {
  for (let j = 1; j <= 6; j++) {
    sameThrows = 0;
    for (let i = 0; i < 5; i++) {
      if (diceThrows[i] == j) {
        sameThrows++;
      }
    }
    if (sameThrows >= 3) {
      threeOfAKindThrown = true;
    }
  }
}

function isItAFH() {
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

  if (threeOfAKindThrown && twoOfAKindThrown) {
    fullHouseThrown = true;
  }
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

    if (sequenceThrows >= 4) {
      smallStraightThrown = true;
    }
  }
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

    if (sequenceThrows == 5) {
      largeStraightThrown = true;
    }
  }
}

function aces() {
  for (let i = 0; i < 5; i++) {
    if (diceThrows[i] == 1) {
      acesThrown++;
    }
  }
  acesScore = acesThrown * 1;
  document.getElementById("aces").innerHTML = JSON.stringify(acesScore);
  upperTotal += acesScore;
  bonus();
  acesScore = 0;
}

function twos() {
  for (let i = 0; i < 5; i++) {
    if (diceThrows[i] == 2) {
      twosThrown++;
    }
  }
  twosScore = twosThrown * 2;
  document.getElementById("twos").innerHTML = JSON.stringify(twosScore);
  upperTotal += twosScore;
  bonus();
}

function threes() {
  for (let i = 0; i < 5; i++) {
    if (diceThrows[i] == 3) {
      threesThrown++;
    }
  }
  threesScore = threesThrown * 3;
  document.getElementById("threes").innerHTML = JSON.stringify(threesScore);
  upperTotal += threesScore;
  bonus();
}

function fours() {
  for (let i = 0; i < 5; i++) {
    if (diceThrows[i] == 4) {
      foursThrown++;
    }
  }
  foursScore = foursThrown * 4;
  document.getElementById("fours").innerHTML = JSON.stringify(foursScore);
  upperTotal += foursScore;
  bonus();
}

function fives() {
  for (let i = 0; i < 5; i++) {
    if (diceThrows[i] == 5) {
      fivesThrown++;
    }
  }
  fivesScore = fivesThrown * 5;
  document.getElementById("fives").innerHTML = JSON.stringify(fivesScore);
  upperTotal += fivesScore;
  bonus();
}

function sixes() {
  for (let i = 0; i < 5; i++) {
    if (diceThrows[i] == 6) {
      sixesThrown++;
    }
  }
  sixesScore = sixesThrown * 6;
  document.getElementById("sixes").innerHTML = JSON.stringify(sixesScore);
  upperTotal += sixesScore;
  bonus();
}

function bonus() {
  if (upperTotal >= 63) {
    bonusScore = 35;
    upperTotal += bonusScore;
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
console.log(upperTotal);
