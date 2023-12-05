import { loadRawData } from "../utils/load.js";

console.log("Advent of Code 2023 - Day 5");

const seedsData = `79 14 55 13`;
const mapsData = `seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`;

class CMap {
  constructor(name) {
    this.map = [];
    this.name = name;
  }

  addRange(source, destination, length) {
    // console.log(`Add ${source}-${destination} ${length}`);
    this.map.push({
      source: { from: source, to: source + length },
      destination: { from: destination, to: destination + length },
    });
  }

  get(src) {
    for (const range of this.map) {
      if (src >= range.source.from && src < range.source.to) {
        return src - range.source.from + range.destination.from;
      }
    }
    return src;
  }
}

const maps = new Map();

function parseMaps(input) {
  const parts = input.split("\r\n\r\n");
  for (const part of parts) {
    const lines = part.split("\r\n");
    const id = lines.shift().split(" ")[0];
    const m = new CMap(id);
    for (const line of lines) {
      const values = line.split(" ").map((v) => Number(v));
      m.addRange(values[1], values[0], values[2]);
    }
    maps.set(id, m);
  }
  return maps;
}

function one(input, seedData) {
  const res = [];
  const maps = parseMaps(input);
  const seedToSoil = maps.get("seed-to-soil");
  const soilToFertilizer = maps.get("soil-to-fertilizer");
  const fertilizerToWater = maps.get("fertilizer-to-water");
  const waterToLight = maps.get("water-to-light");
  const lightToTemperature = maps.get("light-to-temperature");
  const temperatureToHumidity = maps.get("temperature-to-humidity");
  const humidityToLocation = maps.get("humidity-to-location");
  const chain = [
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  ];
  const seeds = seedData.split(" ").map((v) => Number(v));
  for (const seed of seeds) {
    let val = seed;
    // console.log(`Seed is ${val}`);
    for (const step of chain) {
      val = step.get(val);
      // console.log(step.name, val);
    }
    console.log(seed, val);
    res.push(val);
  }
  console.log(Math.min.apply(Math, res));
}

// one(mapsData, seedsData);
one(await loadRawData("maps.txt"), await loadRawData("seeds.txt"));
