import { handCompare, score, count, Score } from "./util";

function bestScore(input: string): number {
  const initScore = score(input);

  switch (count(input, "J")) {
    case 4: // four -> five of a kind JJJJA
      return Score.FiveOAK;
    case 3:
      if (initScore === Score.FullHouse) {
        // JJJAA full house -> five of kind
        return Score.FiveOAK;
      } else if (initScore === Score.ThreeOAK) {
        // JJJAK three of kind -> four of a kind
        return Score.FourOAK;
      } else {
        throw new Error("Other score found with 3J");
      }
    case 2:
      if (initScore === Score.FullHouse) {
        // JJAAA full house -> five of a kind
        return Score.FiveOAK;
      } else if (initScore === Score.ThreeOAK) {
        // JJAAA three of kind -> five of a kind
        return Score.FiveOAK;
      } else if (initScore === Score.TwoPair) {
        // JJAAK two pair -> four of a kind
        return Score.FourOAK;
      } else if (initScore === Score.Pair) {
        // JJA23 pair -> four of kind
        return Score.ThreeOAK;
      } else if (initScore === Score.HighCard) {
        // JJA23 high -> three of a kind
        return Score.ThreeOAK;
      } else {
        throw new Error("Other score found with 2J");
      }
    case 1:
      if (initScore === Score.FourOAK) {
        // JAAAA four -> five
        return Score.FiveOAK;
      } else if (initScore === Score.ThreeOAK) {
        // JAAAK three -> four
        return Score.FourOAK;
      } else if (initScore === Score.TwoPair) {
        // JAAKK two pair -> full house
        return Score.FullHouse;
      } else if (initScore === Score.Pair) {
        // JAA23 pair -> three
        return Score.ThreeOAK;
      } else if (initScore === Score.HighCard) {
        // JA234 high -> pair
        return Score.Pair;
      } else {
        throw new Error("Other score with 1J");
      }
    default:
      return initScore;
  }
}

export default function solve(input: string): number {
  return input
    .trim()
    .split("\n")
    .map((line) => line.split(" "))
    .toSorted((a, b) => handCompare(a[0], b[0], bestScore, "J23456789TQKA"))
    .reduce((sum, [, bid], i) => sum + +bid * (i + 1), 0);
}
