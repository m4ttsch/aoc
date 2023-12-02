export default function solve(input: string) {
  return input.split("\n").reduce((total, game) => {
    if (game === "") return total; // last newline split gives '', skip
    const results = game.split(": ")[1];
    const draws = results.split("; ");

    let minBlue = 0;
    let minRed = 0;
    let minGreen = 0;

    draws.forEach((draw) => {
      const selections = draw.split(", ");
      selections.forEach((selection) => {
        const [qty, color] = selection.split(" ");

        if (color === "blue") {
          minBlue = Math.max(+qty, minBlue);
        } else if (color === "green") {
          minGreen = Math.max(+qty, minGreen);
        } else {
          minRed = Math.max(+qty, minRed);
        }
      });
    });

    return total + minBlue * minRed * minGreen;
  }, 0);
}
