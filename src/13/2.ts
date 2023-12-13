import { score } from "./util";

export default function solve(input: string) {
  return input
    .trim()
    .split("\n\n")
    .reduce((sum, pattern, i) => {
      const grid = pattern
        .trim()
        .split("\n")
        .map((row) => row.split(""));

      const prev = score(grid)[0];

      for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
          const char = grid[r][c];

          if (char === ".") {
            grid[r][c] = "#";
          } else if (char === "#") {
            grid[r][c] = ".";
          }

          const scores = score(grid);
          const newScore = scores.find(
            (score) => score.type !== prev.type || score.val !== prev.val,
          );
          if (newScore) {
            return sum + newScore.val;
          }

          grid[r][c] = char;
        }
      }

      return sum;
    }, 0);
}
