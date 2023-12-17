export default function solve(input: string) {
  return input
    .trim()
    .split(",")
    .reduce(
      (sum, step) =>
        sum +
        [...step].reduce(
          (sum, char) => ((sum + char.charCodeAt(0)) * 17) % 256,
          0,
        ),
      0,
    );
}
