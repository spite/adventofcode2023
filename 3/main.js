import { loadData } from "../utils/load.js";

console.log("Advent of Code 2023 - Day 3");

const example1 = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`.split("\n");

function markBuffer(buffer, width, height, i, j) {
  for (let di = i - 1; di < i + 2; di++) {
    for (let dj = j - 1; dj < j + 2; dj++) {
      if (di >= 0 && di < height && dj >= 0 && dj < width) {
        buffer[di][dj].adjacent = true;
        buffer[di][dj].symbol.push({ symbol: buffer[i][j].char, i, j });
      }
    }
  }
}

function processInput(input) {
  const height = input.length;
  const width = input[0].length;
  const buffer = new Array(height);
  for (let i = 0; i < height; i++) {
    buffer[i] = new Array(width);
    for (let j = 0; j < width; j++) {
      const char = input[i][j];
      buffer[i][j] = {
        char,
        isSymbol: !isNumber(char) && char !== ".",
        adjacent: false,
        symbol: [],
      };
    }
  }

  // expand symbols;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (buffer[i][j].isSymbol) {
        markBuffer(buffer, width, height, i, j);
      }
    }
  }

  console.log(buffer);
  return buffer;
}

function isNumber(char) {
  const v = char.charCodeAt(0);
  return v >= 48 && v <= 57;
}

function findNumbers(input) {
  const numbers = [];
  for (const line of input) {
    let inNumber = false;
    let number = "";
    let adjacent = false;
    for (const char of line) {
      if (isNumber(char.char)) {
        number += char.char;
        inNumber = true;
        adjacent |= char.adjacent;
      } else {
        if (inNumber && adjacent) {
          numbers.push(number);
        }
        number = "";
        adjacent = false;
        inNumber = false;
      }
    }
    if (inNumber && adjacent) {
      numbers.push(number);
    }
  }
  return numbers.map((n) => Number(n));
}

function findGears(input) {
  const numbers = [];
  const gears = new Map();
  for (const line of input) {
    let inNumber = false;
    let number = "";
    let adjacent = false;
    let adjacents = [];
    for (const char of line) {
      if (isNumber(char.char)) {
        number += char.char;
        inNumber = true;
        adjacent |= char.adjacent;
        if (adjacent) {
          adjacents.push(char.symbol);
        }
      } else {
        if (inNumber && adjacent) {
          const adj = adjacents.flat().filter((v) => v.symbol === "*");
          if (adj.length) {
            for (const a of adj) {
              const id = a.i * input[0].length + a.j;
              if (!gears.has(id)) {
                gears.set(id, []);
              }
              if (gears.get(id).indexOf(number) === -1) {
                gears.get(id).push(number);
              }
            }
          }
        }
        number = "";
        adjacent = false;
        inNumber = false;
        adjacents = [];
      }
    }
    if (inNumber && adjacent) {
      const adj = adjacents.flat().filter((v) => v.symbol === "*");
      if (adj.length) {
        for (const a of adj) {
          const id = a.i * input[0].length + a.j;
          if (!gears.has(id)) {
            gears.set(id, []);
          }
          gears.get(id).push(number);
        }
      }
    }
  }

  for (const g of gears) {
    if (g[1].length === 2) {
      numbers.push(g[1][0] * g[1][1]);
    }
  }

  return numbers;
}

function one(input) {
  const numbers = findNumbers(input);
  console.log(numbers);
  console.log(numbers.reduce((ac, v) => v + ac, 0));
}

function two(input) {
  const numbers = findGears(input);
  console.log(numbers);
  console.log(numbers.reduce((ac, v) => v + ac, 0));
}

// one(processInput(example1));
// one(processInput(await loadData("data.txt")));
// two(processInput(example1));
two(processInput(await loadData("data.txt")));
