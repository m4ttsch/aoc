function extrapolate(seq: number[]): number {
  if (seq.every((el) => el === 0)) {
    return 0;
  }

  const diffs = seq.slice(1).map((el, i) => el - seq[i]);
  return seq.at(-1)! + extrapolate(diffs);
}

export default function solve(input: string): number {
  return input
    .trim()
    .split("\n")
    .reduce((sum, line) => {
      const seq = line.split(" ").map((num) => Number(num));
      return sum + extrapolate(seq);
    }, 0);
}
