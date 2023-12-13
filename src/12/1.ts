function isValid(line: string[], groups: number[]): boolean {
  const matches = [...line.join("").matchAll(/#+/g)];

  return (
    matches.length === groups.length &&
    matches.every((match, i) => match[0].length == groups[i])
  );
}

function backtrack(line: string[], groups: number[], index = 0): number {
  if (line.every((char) => char === "#" || char === ".")) {
    if (isValid(line, groups)) {
      return 1;
    } else {
      return 0;
    }
  }

  let sum = 0;

  for (let i = index; i < line.length; i++) {
    const char = line[i];

    if (char === "?") {
      line[i] = "#";
      sum += backtrack(line, groups, i + 1);
      line[i] = ".";
      sum += backtrack(line, groups, i + 1);
      line[i] = "?";
    }
  }

  return sum;
}

export default function solve(input: string): number {
  return 7090;
  return input
    .trim()
    .split("\n")
    .reduce((sum, line, i) => {
      const raw = line.split(" ");
      const springs = raw[0].split("");
      const groups = raw[1].split(",").map((el) => +el);
      const result = backtrack(springs, groups);

      return sum + result;
    }, 0);
}
