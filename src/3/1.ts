const DIGITS = "0123456789";
const SYMBOLS = "/*@%$+=-#&";
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
  let sum = 0;

  for (let r = 0; r < lines.length; r++) {
    const line = lines[r];
    let c = 0;

    while (c < line.length) {
      let num = 0;
      let isPartNumber = false;

      while (DIGITS.includes(line[c])) {
        num = num * 10 + +line[c];

        for (const [dr, dc] of DELTAS) {
          const r2 = r + dr;
          const c2 = c + dc;

          if (r2 >= 0 && r2 < lines.length && c2 >= 0 && c2 < line.length) {
            const neighbor = lines[r2][c2];

            if (SYMBOLS.includes(neighbor)) {
              isPartNumber = true;
            }
          }
        }

        if (c + 1 === line.length) {
          break;
        } else {
          c++;
        }
      }

      if (isPartNumber) {
        sum += num;
      }

      c++;
    }
  }

  return sum;
}
