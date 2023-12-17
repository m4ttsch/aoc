function hash(input: string): number {
  return [...input].reduce(
    (sum, char) => ((sum + char.charCodeAt(0)) * 17) % 256,
    0,
  );
}

export default function solve(input: string) {
  const boxes: { label: string; focal: string }[][] = new Array(256);

  for (let i = 0; i < boxes.length; i++) {
    boxes[i] = [];
  }

  input
    .trim()
    .split(",")
    .forEach((step) => {
      if (step.endsWith("-")) {
        const label = step.slice(0, -1);
        const box = hash(label);
        const slot = boxes[box];
        const lensIndex = slot.findIndex((lens) => lens.label === label);

        if (lensIndex !== -1) {
          slot.splice(lensIndex, 1);
        }
      } else {
        const [label, focal] = step.split("=");
        const box = hash(label);
        const slot = boxes[box];
        const lens = slot.find((lens) => lens.label === label);

        if (lens) {
          lens.focal = focal;
        } else {
          slot.push({ label, focal });
        }
      }
    });

  return boxes.reduce(
    (sum, box, b) =>
      sum +
      box.reduce((sum, { focal }, s) => sum + (b + 1) * (s + 1) * +focal, 0),
    0,
  );
}
