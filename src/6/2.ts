export default function solve(_input: string) {
  const time = 46807866;
  const distance = 214117714021024;

  let winning = 0;

  for (let i = 0; i <= time; i++) {
    const velocity = i;
    const remaining = time - i;

    if (velocity * remaining > distance) {
      winning += 1;
    }
  }

  return winning;
}
