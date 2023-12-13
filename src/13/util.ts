type Ret = {
  type: "c" | "r";
  val: number;
};
export function score(grid: string[][]): Ret[] {
  const colMap = new Map<number, string>();
  const rowMap = new Map<number, string>();

  let rowAnswers: Ret[] = [],
    colAnswers: Ret[] = [];

  for (let r = 0; r < grid.length; r++) {
    rowMap.set(r, grid[r].join(""));
  }

  for (let c = 0; c < grid[0].length; c++) {
    let col = "";
    for (let r = 0; r < grid.length; r++) {
      col = col + grid[r][c];
    }

    colMap.set(c, col);
  }

  for (let c = 1; c < grid[0].length; c++) {
    let [start, end] = [c - 1, c];
    let found = true;

    while (start >= 0 && end < grid[0].length) {
      if (colMap.get(start) !== colMap.get(end)) {
        found = false;
        break;
      }

      start--;
      end++;
    }

    if (found) {
      colAnswers.push({ type: "c", val: c });
    }
  }

  for (let r = 1; r < grid.length; r++) {
    let [start, end] = [r - 1, r];
    let found = true;

    while (start >= 0 && end < grid.length) {
      if (rowMap.get(start) !== rowMap.get(end)) {
        found = false;
        break;
      }

      start--;
      end++;
    }

    if (found) {
      rowAnswers.push({ type: "r", val: r * 100 });
    }
  }

  return [...colAnswers, ...rowAnswers];
}
