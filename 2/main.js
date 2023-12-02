import { loadData } from "../utils/load.js";

console.log("Advent of Code 2023 - Day 2");

const example1 = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`.split("\n");

function parseBalls(balls) {
  const sets = balls.split(";");
  const res = {};

  for (const set of sets) {
    const parts = set.split(", ");
    for (const part of parts) {
      const els = part.trim().split(" ");
      // console.log(els[0], els[1]);
      const id = els[1];
      const val = Number(els[0]);
      if (res[id]) {
        res[id] = Math.max(res[id], val);
      } else {
        res[id] = val;
      }
    }
  }
  return res;
}

function parseGame(game) {
  const regex = /Game (\d*): ([\S ]*)/gm;
  let m;
  const res = {};
  // console.log("Parse");

  while ((m = regex.exec(game)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    res.id = Number(m[1]);
    res.balls = parseBalls(m[2]);
  }
  return res;
}

function validateGame(game) {
  // console.log(game);
  // only 12 red cubes, 13 green cubes, and 14 blue cubes
  if (game.balls.red > 12 || game.balls.green > 13 || game.balls.blue > 14) {
    // console.log(game.id, game.balls);
    return false;
  }
  return true;
}

function one(input) {
  const res = input
    .map((v) => parseGame(v))
    .filter((v) => validateGame(v))
    .reduce((ac, v) => (ac += v.id), 0);
  console.log(res);
}

function calculatePower(game) {
  game.power = game.balls.red * game.balls.green * game.balls.blue;
  return game;
}

function two(input) {
  const res = input
    .map((v) => calculatePower(parseGame(v)))
    .reduce((ac, v) => (ac += v.power), 0);
  console.log(res);
}

// one(example1);
// one(await loadData("data.txt"));
// two(example1);
two(await loadData("data.txt"));
