import { score } from "./util";

export default function solve(input: string) {
  return input
    .trim()
    .split("\n\n")
    .reduce((sum, pattern) => {
      const grid = pattern
        .trim()
        .split("\n")
        .map((row) => row.split(""));

      const { val } = score(grid)[0];
      return sum + val;
    }, 0);
}
