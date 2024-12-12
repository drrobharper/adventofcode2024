import inputToArray from './utils/input-to-array';
import readInput from './utils/read-input';
import { removeBlankLines } from './utils/remove-blank-lines';

type Rule = {left: number, right: number};

type RulesAndPages = {
  rules: Rule[],
  pages: number[][]
}

const getRulesAndPages = (data: string[]): RulesAndPages => {
  return {
    rules: data.filter((line) => line.match(/\d+\|\d+/) !== null).map((line) => {
      const matches = line.split('|');
      return { left: parseInt(matches[0], 10), right: parseInt(matches[1], 10) };
    }),
    pages: data.filter((line) => line.split(',').length > 1).map((line) => {
      return line.split(',').map((num) => parseInt(num, 10));
    })
  }
}

const checkPage = (pages: number[], rules: Rule[]): boolean => {
  for (let i = 0; i < pages.length; i++) {
    //find relevant rules
    const relevantRules = rules.filter(({left}) => pages[i] === left);
    for (const rule of relevantRules) {
      if (pages.filter((_, idx) => idx < i).includes(rule.right)) return false
    }
  }
  return true;
}

const correctPage = (pages: number[], rules: Rule[]): { pages: number[], valid: boolean } => {
  for (let i = 0; i < pages.length; i++) {
    //find relevant rules
    const relevantRules = rules.filter(({left}) => pages[i] === left);
    for (const rule of relevantRules) {
      if (pages.filter((_, idx) => idx < i).includes(rule.right)) {
        const corrected = pages.filter((x) => x !== rule.right);
        corrected.splice(corrected.indexOf(rule.left) + 1, 0, rule.right)
        return { pages: corrected, valid: false }
      }
    }
  }
  return { pages, valid: true };
}



const runRules = (data: RulesAndPages): number[][] => {
  return data.pages.filter((page) => checkPage(page, data.rules))
}

const sumMiddlePages = (pages: number[][]): number => {
  return pages.reduce((acc, val) => {
    return acc + val[Math.floor(val.length / 2)];
  }, 0)
}

const findInvalid = (data: RulesAndPages): RulesAndPages => {
  const invalid = data.pages.filter((page) => !checkPage(page, data.rules))
  return {
    ...data,
    pages: invalid
  }
}

const correctInvalid = (data: RulesAndPages): number[][] => {
  return data.pages.map((page) => {
    let result = {pages: page, valid: false};
    do {
      result = correctPage(result.pages, data.rules);
    } while (!result.valid);
    return result.pages
  });
}

readInput('./data/day5.txt')
  .then(inputToArray)
  .then(getRulesAndPages)
  .then(runRules)
  .then(sumMiddlePages)
  .then(console.log);

readInput('./data/day5.txt')
  .then(inputToArray)
  .then(getRulesAndPages)
  .then(findInvalid)
  .then(correctInvalid)
  .then(sumMiddlePages)
  .then(console.log);
