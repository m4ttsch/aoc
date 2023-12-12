type Coord = [number, number];

export default function solve(input: string): number {
  const universe = input
    .trim()
    .split("\n")
    .map((row) => row.split(""));

  const galaxyRows = new Set();
  const galaxyCols = new Set();
  const galaxyCoords: Coord[] = [];

  for (let r = 0; r < universe.length; r++) {
    for (let c = 0; c < universe[0].length; c++) {
      if (universe[r][c] === "#") {
        galaxyRows.add(r);
        galaxyCols.add(c);
        galaxyCoords.push([r, c]);
      }
    }
  }

  let lengthSum = 0;

  for (let i = 0; i < galaxyCoords.length; i++) {
    for (let j = i + 1; j < galaxyCoords.length; j++) {
      const [rA, cA] = galaxyCoords[i];
      const [rB, cB] = galaxyCoords[j];

      for (let r = rA; r < rB; r++) {
        if (galaxyRows.has(r)) {
          lengthSum++;
        } else {
          lengthSum += 1000000;
        }
      }

      const cStart = Math.min(cA, cB);
      const cEnd = Math.max(cA, cB);

      for (let c = cStart; c < cEnd; c++) {
        if (galaxyCols.has(c)) {
          lengthSum++;
        } else {
          lengthSum += 1000000;
        }
      }
    }
  }

  return lengthSum;
}
