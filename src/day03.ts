import inputToArray from './utils/input-to-array';
import readInput from './utils/read-input';
import { removeBlankLines } from './utils/remove-blank-lines';

const multiply = (mul: string): number => {
  const match = mul.match(/mul\((\d+)\,(\d+)\)/);
  if (!match) throw new Error('Whoopsy');
  return parseInt(match[1], 10) * parseInt(match[2], 10);
};

const part1 = (data: string): number => {
  const matches = data.match(/mul\(\d+,\d+\)/g);
  if (!matches) throw new Error('Oops');
  return matches.reduce((acc, val) => {
    acc += multiply(val);
    return acc;
  }, 0);
};

const part2 = (data: string): number => {
  const matches = data.match(/mul\((\d+)\,(\d+)\)|do\(\)|don\'t\(\)/g);
  if (!matches) throw new Error('Oops');
  let skip = false;
  return matches.reduce((acc, val) => {
    if (val === "don't()") {
      skip = true;
    } else if (val === 'do()') {
      skip = false;
    } else if (!skip) {
      acc += multiply(val);
    }
    return acc;
  }, 0);
};

readInput('./data/day3.txt')
  .then((data: string) => ({
    part1: part1(data),
    part2: part2(data),
  }))
  .then(console.log);
