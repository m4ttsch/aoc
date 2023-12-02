const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

export default function solve(input: string) {
  return input.split("\n").reduce((total, game) => {
    if (game === "") return total; // last newline split gives '', skip
    const [header, results] = game.split(": ");
    const draws = results.split("; ");

    const allDrawsPossible = draws.every((draw) => {
      const selections = draw.split(", ");

      return selections.every((selection) => {
        const [qty, color] = selection.split(" ");

        return (
          (color === "blue" && +qty <= MAX_BLUE) ||
          (color === "red" && +qty <= MAX_RED) ||
          (color === "green" && +qty <= MAX_GREEN)
        );
      });
    });

    const id = +header.match(/\d+/)![0];
    return allDrawsPossible ? total + id : total;
  }, 0);
}
