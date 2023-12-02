const DIGITS = "0123456789";

export default function solve(input: string) {
  return input.split("\n").reduce((sum, line) => {
    let first = -1;
    let last = -1;

    for (let char of line) {
      if (DIGITS.includes(char)) {
        if (first === -1) {
          first = +char;
        }
        last = +char;
      }
    }

    return sum + first * 10 + last;
  }, 0);
}
