const DIGITS = "0123456789";
const GEAR = "*";
const DELTAS = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];

export default function solve(input: string) {
  const lines = input.split("\n");
  const gearAdjacents = new Map<string, number[]>();

  for (let r = 0; r < lines.length; r++) {
    const line = lines[r];
    let c = 0;

    while (c < line.length) {
      let num = 0;
      let isGearNumber = false;
      let gearCoords = "";

      while (DIGITS.includes(line[c])) {
        num = num * 10 + +line[c];

        for (const [dr, dc] of DELTAS) {
          const r2 = r + dr;
          const c2 = c + dc;

          if (r2 >= 0 && r2 < lines.length && c2 >= 0 && c2 < line.length) {
            const neighbor = lines[r2][c2];

            if (GEAR.includes(neighbor)) {
              isGearNumber = true;
              gearCoords = `${r2}-${c2}`;
            }
          }
        }

        if (c + 1 === line.length) {
          break;
        } else {
          c++;
        }
      }

      if (isGearNumber) {
        gearAdjacents.set(
          gearCoords,
          (gearAdjacents.get(gearCoords) ?? []).concat(num),
        );
      }

      c++;
    }
  }

  return [...gearAdjacents.values()].reduce((acc, cur) => {
    if (cur.length === 2) {
      return acc + cur[0] * cur[1];
    } else {
      return acc;
    }
  }, 0);
}
