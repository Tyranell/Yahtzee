const diceThrows = [];
const diceIHave = [];

const heldDice = [0, 0, 0, 0, 0];
const isDiceHeld = [0, 0, 0, 0, 0];

let timesThrownPerTurn = 0;

let sameThrows = 0;
let sameThrows2 = 0;
let sequenceThrows = 0;

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

let numbersSame = 0;
const scoreSimpleNums = [0, 0, 0, 0, 0, 0];
const simpleNumsCounted = [0, 0, 0, 0, 0, 0];

let firstYahtzeeThrown = false;
let yahtzeeThrown = false;
let twoOfAKindThrown = false;
let threeOfAKindThrown = false;
let fourOfAKindThrown = false;
let fullHouseThrown = false;
let smallStraightThrown = false;
let largeStraightThrown = false;
let chanceThrown = false;
let isGameBeingReset = false;

function throwDice() {
  if (timesThrownPerTurn < 3) {
    for (let i = 0; i < 5; i++) {
      diceThrows[i] = Math.floor(Math.random() * 6) + 1;
      if (heldDice[i] > 0) {
        diceThrows[i] = heldDice[i];
      }
    }
    timesThrownPerTurn++;
  }
  document.getElementById("timesRolled").innerHTML =
    JSON.stringify(timesThrownPerTurn);
  document.getElementById("diceRoll1").innerHTML = JSON.stringify(
    diceThrows[0]
  );
  document.getElementById("diceRoll2").innerHTML = JSON.stringify(
    diceThrows[1]
  );
  document.getElementById("diceRoll3").innerHTML = JSON.stringify(
    diceThrows[2]
  );
  document.getElementById("diceRoll4").innerHTML = JSON.stringify(
    diceThrows[3]
  );
  document.getElementById("diceRoll5").innerHTML = JSON.stringify(
    diceThrows[4]
  );
}

function isItAYahtzee() {
  for (let j = 1; j <= 6; j++) {
    sameThrows = 0;
    for (let i = 0; i < 5; i++) {
      if (diceThrows[i] == j) {
        sameThrows++;
      }
    }
    if (sameThrows == 5 && !firstYahtzeeThrown) {
      yahtzeeScore += 50;
      lowerTotalScore += yahtzeeScore;
      totalOverall += yahtzeeScore;
      yahtzeeThrown = true;
    } else if (sameThrows == 5 && firstYahtzeeThrown && yahtzeeScore > 0) {
      yahtzeeScore += 100;
      lowerTotalScore += yahtzeeScore;
      totalOverall += yahtzeeScore;
      yahtzeeThrown = true;
    }
  }
  if (!firstYahtzeeThrown || yahtzeeThrown) {
    firstYahtzeeThrown = true;
    yahtzeeThrown = false;
    resetArrays();
  }
  timesThrownPerTurn = 0;
  lowerTotal();
  document.getElementById("yahtzee").innerHTML = JSON.stringify(yahtzeeScore);
  document.getElementById("timesRolled").innerHTML =
    JSON.stringify(timesThrownPerTurn);
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

function bonus() {
  if (upperTotalScore >= 63) {
    bonusScore = 35;
  }
  totalOverall += bonusScore;
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
  bonus();
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

  while (scoreSimpleNums.length > 0 && isGameBeingReset) {
    scoreSimpleNums.pop();
  }

  while (simpleNumsCounted.length > 0 && isGameBeingReset) {
    simpleNumsCounted.pop();
  }

  for (let i = 0; i < 5; i++) {
    heldDice[i] = 0;
    isDiceHeld[i] = 0;
    diceThrows[i] = 0;
  }

  if (isGameBeingReset) {
    for (let i = 0; i < 6; i++) {
      scoreSimpleNums[i] = 0;
      simpleNumsCounted[i] = 0;
    }
  }
  document.getElementById("diceRoll1").innerHTML = JSON.stringify(
    diceThrows[0]
  );
  document.getElementById("diceRoll2").innerHTML = JSON.stringify(
    diceThrows[1]
  );
  document.getElementById("diceRoll3").innerHTML = JSON.stringify(
    diceThrows[2]
  );
  document.getElementById("diceRoll4").innerHTML = JSON.stringify(
    diceThrows[3]
  );
  document.getElementById("diceRoll5").innerHTML = JSON.stringify(
    diceThrows[4]
  );
  document.getElementById("aces").innerHTML = JSON.stringify(
    scoreSimpleNums[0]
  );
  document.getElementById("twos").innerHTML = JSON.stringify(
    scoreSimpleNums[1]
  );
  document.getElementById("threes").innerHTML = JSON.stringify(
    scoreSimpleNums[2]
  );
  document.getElementById("fours").innerHTML = JSON.stringify(
    scoreSimpleNums[3]
  );
  document.getElementById("fives").innerHTML = JSON.stringify(
    scoreSimpleNums[4]
  );
  document.getElementById("sixes").innerHTML = JSON.stringify(
    scoreSimpleNums[5]
  );
}

function resetGame() {
  isGameBeingReset = true;

  resetArrays();
  timesThrownPerTurn = 0;

  sameThrows = 0;
  sameThrows2 = 0;
  sequenceThrows = 0;

  upperTotalScore = 0;
  bonusScore = 0;

  threeOfAKindScore = 0;
  fourOfAKindScore = 0;
  fullHouseScore = 0;
  smallStraightScore = 0;
  largeStraightScore = 0;
  yahtzeeScore = 0;
  chanceScore = 0;
  lowerTotalScore = 0;

  totalOverall = 0;

  yahtzeeThrown = false;
  firstYahtzeeThrown = false;
  twoOfAKindThrown = false;
  threeOfAKindThrown = false;
  fourOfAKindThrown = false;
  fullHouseThrown = false;
  smallStraightThrown = false;
  largeStraightThrown = false;
  chanceThrown = false;

  numbersSame = 0;

  document.getElementById("FOK").innerHTML = JSON.stringify(fourOfAKindScore);
  document.getElementById("TOK").innerHTML = JSON.stringify(threeOfAKindScore);
  document.getElementById("TOK").innerHTML = JSON.stringify(fullHouseScore);
  document.getElementById("smStraight").innerHTML =
    JSON.stringify(smallStraightScore);
  document.getElementById("smStraight").innerHTML =
    JSON.stringify(smallStraightScore);
  document.getElementById("lrgStraight").innerHTML =
    JSON.stringify(largeStraightScore);
  document.getElementById("bonus").innerHTML = JSON.stringify(bonusScore);
  document.getElementById("chance").innerHTML = JSON.stringify(chanceScore);
  document.getElementById("timesRolled").innerHTML =
    JSON.stringify(timesThrownPerTurn);

  document.getElementById("btn2").style = "visiblilty: visible;";
  document.getElementById("btn3").style = "visiblilty: visible;";
  document.getElementById("btn4").style = "visiblilty: visible;";
  document.getElementById("btn5").style = "visiblilty: visible;";
  document.getElementById("btn6").style = "visiblilty: visible;";
  document.getElementById("btn7").style = "visiblilty: visible;";
  document.getElementById("btn8").style = "visiblilty: visible;";
  document.getElementById("btn9").style = "visiblilty: visible;";
  document.getElementById("bt10").style = "visiblilty: visible;";
  document.getElementById("bt11").style = "visiblilty: visible;";
  document.getElementById("bt12").style = "visiblilty: visible;";
  document.getElementById("bt13").style = "visiblilty: visible;";
  document.getElementById("bt14").style = "visiblilty: visible;";
  upperTotal();
  lowerTotal();

  isGameBeingReset = false;
}

function holdDice(diceNum) {
  if (isDiceHeld[diceNum] == 0) {
    heldDice[diceNum] = diceThrows[diceNum];
    isDiceHeld[diceNum] = 1;
  } else if (isDiceHeld[diceNum] == 1) {
    heldDice[diceNum] = 0;
    isDiceHeld[diceNum] = 0;
  }

  console.log(heldDice, isDiceHeld);
}

function simpleNums(nums) {
  numbersSame = 0;
  for (let i = 0; i < 5; i++) {
    if (diceThrows[i] == nums && simpleNumsCounted[nums - 1] == 0) {
      numbersSame++;
    }
  }

  simpleNumsCounted[nums - 1] = 1;
  scoreSimpleNums[nums - 1] = numbersSame * nums;
  document.getElementById("aces").innerHTML = JSON.stringify(
    scoreSimpleNums[0]
  );
  document.getElementById("twos").innerHTML = JSON.stringify(
    scoreSimpleNums[1]
  );
  document.getElementById("threes").innerHTML = JSON.stringify(
    scoreSimpleNums[2]
  );
  document.getElementById("fours").innerHTML = JSON.stringify(
    scoreSimpleNums[3]
  );
  document.getElementById("fives").innerHTML = JSON.stringify(
    scoreSimpleNums[4]
  );
  document.getElementById("sixes").innerHTML = JSON.stringify(
    scoreSimpleNums[5]
  );

  for (let i = 0; i < 6; i++) {
    if (simpleNumsCounted[i] == 1) {
      upperTotalScore += scoreSimpleNums[i];
      totalOverall += scoreSimpleNums[i];
      simpleNumsCounted[i] = 2;
    }
  }

  timesThrownPerTurn = 0;
  upperTotal();
  document.getElementById("timesRolled").innerHTML =
    JSON.stringify(timesThrownPerTurn);
  resetArrays();
}

//Geen echte code, ik hou ze hier om me te herinneren aan hoe dit programma begon
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

let acesCounted = false;
let twosCounted = false;
let threesCounted = false;
let foursCounted = false;
let fivesCounted = false;
let sixesCounted = false;

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
  upperTotal();
  document.getElementById("timesRolled").innerHTML =
    JSON.stringify(timesThrownPerTurn);
  resetArrays();
}*/
