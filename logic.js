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
let upperTotalScore = 0;
let bonusScore = 0;

let threeOfAKindScore = 0;
let fourOfAKindScore = 0;
let fullHouseScore = 0;
let smallStraightScore = 0;
let largeStraightScore = 0;
let yahtzeeScore = 0;
let chanceScore = 0;
let lowerTotalScore = 0;

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
let chanceThrown = false;

function throwDice() {
  if (timesThrownPerTurn < 3) {
    for (let i = 0; i < 5; i++) {
      diceThrows[i] = Math.floor(Math.random() * 6) + 1;
    }
    timesThrownPerTurn++;
  }
  document.getElementById("timesRolled").innerHTML =
    JSON.stringify(timesThrownPerTurn);
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
      yahtzeeScore += 50;
      lowerTotalScore += yahtzeeScore;
      totalOverall += yahtzeeScore;
    }
  }
  yahtzeeThrown = true;
  timesThrownPerTurn = 0;
  lowerTotal();
  document.getElementById("yahtzee").innerHTML = JSON.stringify(yahtzeeScore);
  document.getElementById("timesRolled").innerHTML =
    JSON.stringify(timesThrownPerTurn);
  resetArrays();
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
      lowerTotalScore += fourOfAKindScore;
      totalOverall += fourOfAKindScore;
    }
  }
  fourOfAKindThrown = true;
  timesThrownPerTurn = 0;
  lowerTotal();
  document.getElementById("FOK").innerHTML = JSON.stringify(fourOfAKindScore);
  document.getElementById("timesRolled").innerHTML =
    JSON.stringify(timesThrownPerTurn);
  sameThrows = 0;
  resetArrays();
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
      for (let i = 0; i < 5; i++) {
        threeOfAKindScore += diceThrows[i];
      }
      lowerTotalScore += threeOfAKindScore;
      totalOverall += threeOfAKindScore;
    }
  }
  threeOfAKindThrown = true;
  timesThrownPerTurn = 0;
  lowerTotal();
  document.getElementById("TOK").innerHTML = JSON.stringify(threeOfAKindScore);
  document.getElementById("timesRolled").innerHTML =
    JSON.stringify(timesThrownPerTurn);
  sameThrows = 0;
  resetArrays();
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
    fullHouseScore += 25;
    lowerTotalScore += fullHouseScore;
    totalOverall += fullHouseScore;
    threeOfAKindThrown = false;
    twoOfAKindThrown = false;
  }
  fullHouseThrown = true;
  timesThrownPerTurn = 0;
  lowerTotal();
  document.getElementById("FH").innerHTML = JSON.stringify(fullHouseScore);
  document.getElementById("timesRolled").innerHTML =
    JSON.stringify(timesThrownPerTurn);
  sameThrows = 0;
  sameThrows2 = 0;
  resetArrays();
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
      smallStraightScore += 30;
      lowerTotalScore += smallStraightScore;
      totalOverall += smallStraightScore;
    }
  }
  smallStraightThrown = true;
  timesThrownPerTurn = 0;
  lowerTotal();
  document.getElementById("smStraight").innerHTML =
    JSON.stringify(smallStraightScore);
  document.getElementById("timesRolled").innerHTML =
    JSON.stringify(timesThrownPerTurn);
  resetArrays();
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
      lowerTotalScore += largeStraightScore;
      totalOverall += largeStraightScore;
    }
  }
  largeStraightThrown = true;
  timesThrownPerTurn = 0;
  lowerTotal();
  document.getElementById("lrgStraight").innerHTML =
    JSON.stringify(largeStraightScore);
  document.getElementById("timesRolled").innerHTML =
    JSON.stringify(timesThrownPerTurn);
  resetArrays();
}

function aces() {
  for (let i = 0; i < 5; i++) {
    if (diceThrows[i] == 1) {
      acesThrown++;
    }
  }
  if (!acesCounted) {
    acesScore = acesThrown * 1;
    upperTotalScore += acesScore;
    timesThrownPerTurn = 0;
    totalOverall += acesScore;
  }
  document.getElementById("aces").innerHTML = JSON.stringify(acesScore);
  acesCounted = true;
  bonus();
  upperTotal();
  document.getElementById("timesRolled").innerHTML =
    JSON.stringify(timesThrownPerTurn);
  resetArrays();
}

function twos() {
  for (let i = 0; i < 5; i++) {
    if (diceThrows[i] == 2) {
      twosThrown++;
    }
  }
  if (!twosCounted) {
    twosScore = twosThrown * 2;
    upperTotalScore += twosScore;
    timesThrownPerTurn = 0;
    totalOverall += twosScore;
  }
  document.getElementById("twos").innerHTML = JSON.stringify(twosScore);
  twosCounted = true;
  bonus();
  upperTotal();
  document.getElementById("timesRolled").innerHTML =
    JSON.stringify(timesThrownPerTurn);
  resetArrays();
}

function threes() {
  for (let i = 0; i < 5; i++) {
    if (diceThrows[i] == 3) {
      threesThrown++;
    }
  }
  if (!threesCounted) {
    threesScore = threesThrown * 3;
    upperTotalScore += threesScore;
    timesThrownPerTurn = 0;
    totalOverall += threesScore;
  }
  document.getElementById("threes").innerHTML = JSON.stringify(threesScore);
  threesCounted = true;
  bonus();
  upperTotal();
  document.getElementById("timesRolled").innerHTML =
    JSON.stringify(timesThrownPerTurn);
  resetArrays();
}

function fours() {
  for (let i = 0; i < 5; i++) {
    if (diceThrows[i] == 4) {
      foursThrown++;
    }
  }
  if (!foursCounted) {
    foursScore = foursThrown * 4;
    upperTotalScore += foursScore;
    timesThrownPerTurn = 0;
    totalOverall += foursScore;
  }
  document.getElementById("fours").innerHTML = JSON.stringify(foursScore);
  foursCounted = true;
  bonus();
  upperTotal();
  document.getElementById("timesRolled").innerHTML =
    JSON.stringify(timesThrownPerTurn);
  resetArrays();
}

function fives() {
  for (let i = 0; i < 5; i++) {
    if (diceThrows[i] == 5) {
      fivesThrown++;
    }
  }
  if (!fivesCounted) {
    fivesScore = fivesThrown * 5;
    upperTotalScore += fivesScore;
    timesThrownPerTurn = 0;
    totalOverall += fivesScore;
  }
  document.getElementById("fives").innerHTML = JSON.stringify(fivesScore);
  fivesCounted = true;
  bonus();
  upperTotal();
  document.getElementById("timesRolled").innerHTML =
    JSON.stringify(timesThrownPerTurn);
  resetArrays();
}

function sixes() {
  for (let i = 0; i < 5; i++) {
    if (diceThrows[i] == 6) {
      sixesThrown++;
    }
  }
  if (!sixesCounted) {
    sixesScore = sixesThrown * 6;
    upperTotalScore += sixesScore;
    timesThrownPerTurn = 0;
    totalOverall += sixesScore;
  }
  document.getElementById("sixes").innerHTML = JSON.stringify(sixesScore);
  sixesCounted = true;
  bonus();
  upperTotal();
  document.getElementById("timesRolled").innerHTML =
    JSON.stringify(timesThrownPerTurn);
  resetArrays();
}

function bonus() {
  if (upperTotal >= 63) {
    bonusScore = 35;
  }
  document.getElementById("bonus").innerHTML = JSON.stringify(bonusScore);
}

function chance() {
  if (!chanceThrown) {
    for (let i = 0; i < 5; i++) {
      chanceScore += diceThrows[i];
    }
    chanceThrown = true;
    timesThrownPerTurn = 0;
    lowerTotalScore += chanceScore;
    totalOverall += chanceScore;
  }
  lowerTotal();
  document.getElementById("chance").innerHTML = JSON.stringify(chanceScore);
  document.getElementById("timesRolled").innerHTML =
    JSON.stringify(timesThrownPerTurn);
  resetArrays();
}

function upperTotal() {
  document.getElementById("upperTotal").innerHTML =
    JSON.stringify(upperTotalScore);
  totalTotal();
}

function lowerTotal() {
  document.getElementById("lowerTotal").innerHTML =
    JSON.stringify(lowerTotalScore);
  totalTotal();
}

function totalTotal() {
  document.getElementById("totalTotal").innerHTML =
    JSON.stringify(totalOverall);
}

function resetArrays() {
  while (diceThrows.length > 0) {
    diceThrows.pop();
  }

  while (diceIHave.length > 0) {
    diceIHave.pop();
  }
  document.getElementById("diceRolls").innerHTML = JSON.stringify(diceThrows);
}

/*function reset() {}
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
