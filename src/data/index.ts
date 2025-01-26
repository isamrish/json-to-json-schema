const levels: Record<string, unknown> = {};

for (let i = 1; i <= 10; i++) {
  levels[`level${i}`] = require(`./level${i}.json`);
}

export default levels;
