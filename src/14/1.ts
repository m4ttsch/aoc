const GRID_DIM = 100;

export default function solve(input: string): number {
  const grid = input
    .trim()
    .split("\n")
    .map((row) => row.split(""));

  const cache = Array(GRID_DIM).fill(0);

  grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell === "O") {
        grid[r][c] = grid[cache[c]][c];
        grid[cache[c]++][c] = cell;
      } else if (cell === "#") {
        cache[c] = r + 1;
      }
    });
  });

  return grid.reduce(
    (load, row, r) =>
      load +
      row.reduce((sum, cell) => (cell === "O" ? sum + GRID_DIM - r : sum), 0),
    0,
  );
}
