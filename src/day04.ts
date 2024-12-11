import inputToArray from './utils/input-to-array';
import readInput from './utils/read-input';
import { removeBlankLines } from './utils/remove-blank-lines';

const north = (grid: string[][], i: number, j: number): boolean => {
  return grid[i]?.[j] + grid[i - 1]?.[j] + grid[i - 2]?.[j] + grid[i - 3]?.[j] === 'XMAS';
}

const northEast = (grid: string[][], i: number, j: number): boolean => {
  return grid[i]?.[j] + grid[i - 1]?.[j + 1] + grid[i - 2]?.[j + 2] + grid[i - 3]?.[j + 3] === 'XMAS';
}

const east = (grid: string[][], i: number, j: number): boolean => {
  return grid[i]?.[j] + grid[i]?.[j + 1] + grid[i]?.[j + 2] + grid[i]?.[j + 3] === 'XMAS';
}

const southEast = (grid: string[][], i: number, j: number): boolean => {
  return grid[i]?.[j] + grid[i + 1]?.[j + 1] + grid[i + 2]?.[j + 2] + grid[i + 3]?.[j + 3] === 'XMAS';
}

const south = (grid: string[][], i: number, j: number): boolean => {
  return grid[i]?.[j] + grid[i + 1]?.[j] + grid[i + 2]?.[j] + grid[i + 3]?.[j] === 'XMAS';
}

const southWest = (grid: string[][], i: number, j: number): boolean => {
  return grid[i]?.[j] + grid[i + 1]?.[j - 1] + grid[i + 2]?.[j - 2] + grid[i + 3]?.[j - 3] === 'XMAS';
}

const west = (grid: string[][], i: number, j: number): boolean => {
  return grid[i]?.[j] + grid[i]?.[j - 1] + grid[i]?.[j - 2] + grid[i]?.[j - 3] === 'XMAS';
}

const northWest = (grid: string[][], i: number, j: number): boolean => {
  return grid[i]?.[j] + grid[i - 1]?.[j - 1] + grid[i - 2]?.[j - 2] + grid[i - 3]?.[j - 3] === 'XMAS';
}

const compass = [
 north, northEast, east, southEast, south, southWest, west, northWest
]

const findXmas = (grid: string[][], i: number, j: number): number => {
  return compass.map((func) => func(grid, i, j)).filter(Boolean).length
}

const isX = (grid: number[][], i: number, j: number): boolean => {
  try {
    return grid[i - 1][j - 1] + grid[i + 1][j + 1] === 6 && grid[i - 1][j + 1] + grid[i + 1][ j - 1] === 6;
  } catch (err) {
    return false;
  }
}

const part1 = (grid: string[][]): number => {
  let count = 0;
  for (let i = 0; i < grid.length; i++){
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 'X') {
        count += findXmas(grid, i, j);
      }
    }
  }
  return count;
};

const lookup: Record<string,number> = {
  X: 0,
  A: 1,
  M: 2,
  S: 4
}

const part2 = (grid: string[][]): number => {
  let count = 0;
  const gridAsNumbers: number[][] = grid.map((row) => row.map((item) => lookup[item]));
  for (let i = 0; i < gridAsNumbers.length; i++){
    for (let j = 0; j < gridAsNumbers[i].length; j++) {
      if (gridAsNumbers[i][j] === 1) {
        if (isX(gridAsNumbers, i, j)) count++;
      }
    }
  }
  return count;
};

const toLetterGrid = (data: string[]): string[][] => {
  return data.map((line: string) => line.split(''));
}

readInput('./data/day4.txt')
  .then(inputToArray)
  .then(removeBlankLines)
  .then(toLetterGrid)
  .then((data: string[][]) => ({
    part1: part1(data),
    part2: part2(data),
  }))
  .then(console.log);
