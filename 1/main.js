import { loadData } from "../utils/load.js";

console.log("Advent of Code 2023 - Day 1");

const example = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`.split("\n");

const example2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`.split("\n");

function getDigits(input) {
  const res = [];
  for (let i = 0; i < input.length; i++) {
    const char = (input[i], input.charCodeAt(i));
    if (char >= 48 && char <= 57) {
      res.push(Number(input[i]));
    }
  }
  return res;
}

function calculateCalibration(input) {
  const digits = getDigits(input);
  const res = digits[0] * 10 + digits[digits.length - 1];
  return res;
}

function one(input) {
  const res = input
    .map((n) => calculateCalibration(n))
    .reduce((ac, v) => ac + v, 0);
  console.log(res);
}

const numberStrings = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function match(input, exp, matches) {
  const regex = new RegExp(exp, "gm");
  let m;
  while ((m = regex.exec(input)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    m.forEach((match, groupIndex) => {
      matches.push({
        pos: m.index,
        num: numberStrings[match] || Number(match),
      });
    });
  }
}

function convertStringsToNumbers(input) {
  const matches = [];
  match(input, `\\d`, matches);

  for (const n of Object.keys(numberStrings)) {
    match(input, n, matches);
  }

  const sorted = matches.sort((a, b) => a.pos - b.pos);
  const res = sorted[0].num * 10 + sorted[sorted.length - 1].num;
  return res;
}

function two(input) {
  const modified = input.map((v) => convertStringsToNumbers(v));
  const res = modified.reduce((ac, v) => ac + v, 0);
  console.log(res);
}

// one(example);
one(await loadData("1.txt"));
// two(example2);
two(await loadData("1.txt"));
