import { Data } from "@/types";

const levels: Record<string, Data> = {};

const labels = [
  "Simple Key-Value Pair",
  "Key-Value Pair with Basic Types",
  "Nested Object",
  "Array of Primitive Types",
  "Array of Objects",
  "Mixed Data Types",
  "Object with Optional and Nullable Fields",
  "Deeply Nested Object",
  "Complex Data with Constraints",
  "Dynamic and Complex Structure",
];

for (let i = 1; i <= 10; i++) {
  levels[`level${i}`] = {
    label: labels[i - 1],
    data: require(`./level${i}.json`),
  };
}

export default levels;
