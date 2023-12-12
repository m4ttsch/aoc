import { handCompare } from "./util";

export default function solve(input: string): number {
  return input
    .trim()
    .split("\n")
    .map((line) => line.split(" "))
    .toSorted((a, b) => handCompare(a[0], b[0]))
    .reduce((sum, [, bid], i) => sum + +bid * (i + 1), 0);
}
