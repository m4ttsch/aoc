export default function solve(input: string) {
  const races = [
    [46, 214],
    [80, 1177],
    [78, 1402],
    [66, 1024],
  ];

  return races.reduce((mult, [time, distance]) => {
    let winning = 0;

    for (let i = 0; i <= time; i++) {
      const velocity = i;
      const remaining = time - i;

      if (velocity * remaining > distance) {
        winning += 1;
      }
    }

    return winning * mult;
  }, 1);
}
