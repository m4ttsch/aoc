export default function solve(input: string) {
  const cards = input.trim().split("\n");
  const counts = new Array(cards.length).fill(1);

  for (let i = 0; i < counts.length; i++) {
    const nums = [...cards[i].split(": ")[1].matchAll(/\d+/g)].map((m) => m[0]);
    const uniq = new Set(nums).size;
    const numMatches = nums.length - uniq;

    for (let k = 1; k <= numMatches; k++) {
      if (i + k < counts.length) {
        counts[i + k] += counts[i];
      }
    }
  }

  return counts.reduce((sum, el) => sum + el);
}
