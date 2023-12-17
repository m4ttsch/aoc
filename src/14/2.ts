const GRID_DIM = 100;

function count(grid: string[][], cellT: string) {
  return grid.reduce(
    (sum, row) =>
      sum + row.reduce((sum, cell) => (cell === cellT ? sum + 1 : sum), 0),
    0,
  );
}

function toString(grid: string[][]): string {
  return grid.map((r) => r.join("")).join("\n");
}

function fromString(input: string): string[][] {
  return input
    .trim()
    .split("\n")
    .map((row) => row.split(""));
}

function cycle(grid: string[][]): string {
  // North
  let cache = new Array(GRID_DIM).fill(0);

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

  // West
  cache = new Array(GRID_DIM).fill(0);

  grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell === "O") {
        grid[r][c] = grid[r][cache[r]];
        grid[r][cache[r]++] = cell;
      } else if (cell === "#") {
        cache[r] = c + 1;
      }
    });
  });

  // South
  cache = new Array(GRID_DIM).fill(GRID_DIM - 1);

  grid.forEach((_row, rr) => {
    const r = GRID_DIM - 1 - rr;
    const row = grid[r];
    row.map((cell, c) => {
      if (cell === "O") {
        grid[r][c] = grid[cache[c]][c];
        grid[cache[c]--][c] = cell;
      } else if (cell === "#") {
        cache[c] = r - 1;
      }
    });
  });

  // East
  cache = new Array(GRID_DIM).fill(GRID_DIM - 1);

  grid.forEach((row, r) => {
    row.forEach((_cell, cc) => {
      const c = GRID_DIM - 1 - cc;
      const cell = row[c];

      if (cell === "O") {
        grid[r][c] = grid[r][cache[r]];
        grid[r][cache[r]--] = cell;
      } else if (cell === "#") {
        cache[r] = c - 1;
      }
    });
  });

  return toString(grid);
}

export default function solve(input: string): number {
  const grid = fromString(input);
  const seen = [toString(grid)];

  let loopLen = 0;
  let loopStart = 0;

  for (let i = 0; i < 1e9; i++) {
    const next = cycle(grid);
    const index = seen.findIndex((g) => g === next);

    if (index !== -1) {
      loopStart = index;
      loopLen = seen.length - loopStart;
      break;
    }

    seen.push(next);
  }

  const realIter = 1e9 - loopStart;
  const mod = realIter % loopLen;

  const loopGrid = seen.slice(loopStart)[mod];

  return fromString(loopGrid).reduce(
    (load, row, r) =>
      load +
      row.reduce((sum, cell) => (cell === "O" ? sum + GRID_DIM - r : sum), 0),
    0,
  );
}
