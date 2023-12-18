const DIM = 110;

export default function solve(input: string) {
  const grid = input
    .trim()
    .split("\n")
    .map((row) => row.split(""));

  const seen = grid.map(() => Array(DIM).fill("."));
  const cache = new Set<string>();
  let sum = 0;

  function dfs(...args: number[]): void {
    const [r, c, vr, vc] = args;

    if (r < 0 || r >= DIM || c < 0 || c >= DIM) {
      return;
    }

    if (cache.has(`${args}`)) {
      // We've already processed this branch, onward
      return;
    }

    cache.add(`${args}`);

    if (seen[r][c] === ".") {
      sum++;
      seen[r][c] = "#";
    }

    const cell = grid[r][c];

    if (cell === "\\") {
      dfs(r + vc, c + vr, vc, vr);
    } else if (cell === "/") {
      dfs(r - vc, c - vr, -vc, -vr);
    } else if (cell === "-" && vr !== 0) {
      dfs(r, c - 1, 0, -1);
      dfs(r, c + 1, 0, 1);
    } else if (cell === "|" && vc !== 0) {
      dfs(r - 1, c, -1, 0);
      dfs(r + 1, c, 1, 0);
    } else {
      dfs(r + vr, c + vc, vr, vc);
    }
  }

  dfs(0, 0, 0, 1);

  return sum;
}
