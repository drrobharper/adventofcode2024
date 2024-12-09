import inputToArray from './utils/input-to-array';
import readInput from './utils/read-input';
import { removeBlankLines } from './utils/remove-blank-lines';

const getReports = (data: string[]): number[][] => {
  return data.map((line) => line.split(' ').map((num) => parseInt(num, 10)));
};

const isSafe = (report: number[]): boolean => {
  if (report[1] > report[0]) {
    for (let i = 1; i < report.length; i++) {
      const diff = report[i] - report[i - 1];
      if (diff < 1 || diff > 3) return false;
    }
    return true;
  } else if (report[1] < report[0]) {
    for (let i = 1; i < report.length; i++) {
      const diff = report[i - 1] - report[i];
      if (diff < 1 || diff > 3) return false;
    }
    return true;
  } else return false;
};

const isSafeWithOneRemoved = (report: number[]): boolean => {
  const safe = isSafe(report);
  if (safe) return true;
  for (let i = 0; i < report.length; i++) {
    const reportWithOneRemoved = report.filter((val, idx) => idx !== i);
    if (isSafe(reportWithOneRemoved)) return true;
  }
  return false;
};

const part1 = (reports: number[][]): number => {
  return reports.filter(isSafe).length;
};

const part2 = (reports: number[][]): number => {
  return reports.filter(isSafeWithOneRemoved).length;
};

readInput('./data/day2.txt')
  .then(inputToArray)
  .then(removeBlankLines)
  .then(getReports)
  .then((reports: number[][]) => ({
    part1: part1(reports),
    part2: part2(reports),
  }))
  .then(console.log);
