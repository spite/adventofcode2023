import { loadData } from "../utils/load.js";

console.log("Advent of Code 2023 - Day 4");

const example1 = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`.split("\n");

function checkCard(card) {
  const regex = /Card[ ]*([\d]*): (.*) \| (.*)/gm;
  let m;

  while ((m = regex.exec(card)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    const id = Number(m[1]);
    const winningNumbers = new Set(
      m[2]
        .replaceAll("  ", " ")
        .split(" ")
        .filter((v) => v !== "")

        .map((v) => Number(v))
    );
    const ownNumbers = new Set(
      m[3]
        .replaceAll("  ", " ")
        .split(" ")
        .filter((v) => v !== "")
        .map((v) => Number(v))
    );

    const intersection = new Set(
      [...ownNumbers].filter((x) => winningNumbers.has(x))
    );

    let price = 0;

    if (intersection.size) {
      price = 2 ** (intersection.size - 1);
    } else {
      price = 0;
    }

    console.log(id, winningNumbers, ownNumbers, intersection, price);

    return price;
  }
  debugger;
}

function one(input) {
  const res = input.map((card) => checkCard(card)).reduce((ac, v) => ac + v, 0);
  console.log(res);
}

// one(example1);
one(await loadData("data.txt"));
