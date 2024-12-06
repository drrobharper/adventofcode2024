import inputToArray from './utils/input-to-array';
import readInput from './utils/read-input';
import { removeBlankLines } from './utils/remove-blank-lines';

type Lists = {
  left: number[];
  right: number[];
}

const getLists = (
  data: string[]
): Lists => {
  const output: Lists = {
    left: [],
    right: [],
  };
  const lists = data.reduce((acc, val) => {
    const a = val.match(/(\d+)\s+(\d+)/);
    if (a === null) throw new Error('Grrrr');
    output.left.push(parseInt(a[1]));
    output.right.push(parseInt(a[2]));
    return output
  }, output);
  lists.left.sort();
  lists.right.sort();
  return lists;
};

const part1 = (lists: Lists): number => {
  return lists.left.reduce((acc, val, idx) => {
    return acc + Math.abs(val - lists.right[idx]);
  }, 0)
}

const part2 = (lists: Lists): number => {
  return lists.left.reduce((acc, val) => {
    return acc + Math.abs(val * lists.right.filter((x) => x === val).length);
  }, 0)
}

readInput('./data/day1.txt')
  .then(inputToArray)
  .then(removeBlankLines)
  .then(getLists)
  .then((lists: Lists) => ({
    part1: part1(lists),
    part2: part2(lists)
  }))
  .then(console.log);
