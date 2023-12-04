export default function solve(input: string) {
  const cards = input.trim().split("\n");

  return cards.reduce((sum, line) => {
    const nums = [...line.split(": ")[1].matchAll(/\d+/g)].map((m) => m[0]);
    const uniq = new Set(nums).size;
    const numMatches = nums.length - uniq;

    return numMatches ? sum + 2 ** (numMatches - 1) : sum;
  }, 0);
}
