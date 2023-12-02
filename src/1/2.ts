const DIGITS = [
  { numeral: "zero", decimal: 0 },
  { numeral: "one", decimal: 1 },
  { numeral: "two", decimal: 2 },
  { numeral: "three", decimal: 3 },
  { numeral: "four", decimal: 4 },
  { numeral: "five", decimal: 5 },
  { numeral: "six", decimal: 6 },
  { numeral: "seven", decimal: 7 },
  { numeral: "eight", decimal: 8 },
  { numeral: "nine", decimal: 9 },
];

export default function solve(input: string) {
  return input.split("\n").reduce((sum, line) => {
    let first = -1;
    let last = -1;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      let digit = -1;

      for (const { numeral, decimal } of DIGITS) {
        // @ts-expect-error Lil' type coercion
        if (char == decimal) {
          digit = decimal;
        }

        if (line.slice(i, i + numeral.length) === numeral) {
          digit = decimal;
        }
      }

      if (digit !== -1) {
        last = digit;

        if (first === -1) {
          first = digit;
        }
      }
    }

    return sum + first * 10 + last;
  }, 0);
}
