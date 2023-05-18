// @ts-ignore
import audio from './audio/dice-roll.mp3';
// @ts-ignore
import audioAlt1 from "./audio/go-dice-roll.mp3";
// @ts-ignore
import audioAlt2 from "./audio/lets-roll.mp3";

const audioElement = new Audio(audio);
const audioElementAlt1 = new Audio(audioAlt1);
const audioElementAlt2 = new Audio(audioAlt2);

const crypto = window.crypto;

function generate() {
  const r = new Uint8Array(1);
  do {
    crypto.getRandomValues(r);
  } while (r[0] >= 250);
  return (r[0] % 10) + 1;
}

function doRoll(dice: number, diff: number, setScore: (x: string) => void, addRoll: (x: number[]) => void) {
  let total = 0;
  let record = [];
  for (let i = 0; i < dice; i++) {
    let roll = generate();
    record.push(roll);
    if (roll === 1) {
      total--;
    } else if (roll >= diff) {
      total++;
    }
  }
  record.sort((a, b) => a - b);
  addRoll([diff, ...record]);
  setScore("?")

  let choice = Math.floor(Math.random() * 100);
  if (choice < 98) {
    audioElement.play();
  } else if (choice < 99) {
    audioElementAlt1.play();
  } else {
    audioElementAlt2.play();
  }

  const newScore = (total < 0) ? "💀" : total.toString();
  window.setTimeout(() => setScore(newScore), 450);
}

export function createRoller(
    dice: number,
    setDice: (x: number) => void,
    diff: number,
    setDiff: (x: number) => void,
    setScore: (x: string) => void,
    addRoll: (x: number[]) => void
) {

  return {
    roll: function () {
      doRoll(dice, diff, setScore, addRoll);
    },

    diceSet: function (value: number) {
      if (value >= 1 && value <= 100) {
        setDice(value);
        doRoll(value, diff, setScore, addRoll);
      }
    },

    diffSet: function (value: number) {
      if (value >= 2 && value <= 10) {
        setDiff(value);
        doRoll(dice, value, setScore, addRoll);
      }
    },

    diceDown: function () {
      if (dice > 1) {
        const newDice = dice - 1;
        setDice(newDice);
        doRoll(newDice, diff, setScore, addRoll);
      }
    },

    diceUp: function () {
      if (dice < 100) {
        const newDice = dice + 1;
        setDice(newDice);
        doRoll(newDice, diff, setScore, addRoll);
      }
    },

    diffUp: function () {
      if (diff < 10) {
        const newDiff = diff + 1;
        setDiff(newDiff);
        doRoll(dice, newDiff, setScore, addRoll);
      }
    },

    diffDown: function () {
      if (diff > 2) {
        const newDiff = diff - 1;
        setDiff(newDiff);
        doRoll(dice, newDiff, setScore, addRoll);
      }
    }
  }
}
