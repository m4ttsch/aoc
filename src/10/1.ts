const DELTAS = [
  [-1, 0], // North
  [1, 0], // South
  [0, -1], // West
  [0, 1], // East
];

type Delta = (typeof DELTAS)[number];
type Pipe = "F" | "7" | "L" | "J" | "-" | "|" | "S";

const PIPE_DELTAS = new Map<Pipe, Delta[]>([
  ["F", [DELTAS[1], DELTAS[3]]], // South, East
  ["7", [DELTAS[1], DELTAS[2]]], // South, West
  ["L", [DELTAS[0], DELTAS[3]]], // North, East
  ["J", [DELTAS[0], DELTAS[2]]], // North, West
  ["|", [DELTAS[0], DELTAS[1]]], // North, South
  ["-", [DELTAS[2], DELTAS[3]]], // East, West
  ["S", DELTAS],
]);

const DELTA_PIPES = new Map<Delta, Pipe[]>([
  [DELTAS[0], ["F", "7", "|"]],
  [DELTAS[1], ["L", "J", "|"]],
  [DELTAS[2], ["F", "L", "-"]],
  [DELTAS[3], ["7", "J", "-"]],
]);

export default function solve(input: string): number {
  const grid = input
    .trim()
    .split("\n")
    .map((line) => line.split("") as Pipe[]);

  const R_MAX = grid.length;
  const C_MAX = grid[0].length;

  /*
   * Find coordinates of the 'S' space
   */
  let start: [number, number] = [-1, -1];

  for (let r = 0; r < R_MAX; r++) {
    for (let c = 0; c < C_MAX; c++) {
      if (grid[r][c] === "S") {
        start = [r, c];
      }
    }
  }

  const seen: boolean[][] = new Array(R_MAX)
    .fill(0)
    .map(() => new Array(C_MAX).fill(false));

  let next = start;
  let length = 0;

  while (true) {
    const [r, c] = next;
    seen[r][c] = true;
    const pipe = grid[r][c];

    const availableDeltas = PIPE_DELTAS.get(pipe)!;
    const match = availableDeltas.find((delta) => {
      try {
        const [nr, nc] = [r + delta[0], c + delta[1]];
        const neighbor = grid[nr][nc];

        if (seen[nr][nc]) {
          return false; // ALREADY PROCESSED
        }

        if (pipe !== "S") {
          return true;
        }

        const validPipes = DELTA_PIPES.get(delta)!;
        return validPipes.includes(neighbor);
      } catch (e) {
        if (e instanceof TypeError) {
          return false; // Index out of bounds
        } else {
          throw e;
        }
      }
    });

    if (!match) {
      break;
    }

    next = [next[0] + match[0], next[1] + match[1]];
    length++;
  }

  return (length + 1) / 2;
}
