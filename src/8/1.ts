export default function solve(input: string): number {
  const [steps, nodes] = input.split("\n\n");

  const map = new Map<string, [string, string]>();

  for (const node of nodes.trim().split("\n")) {
    const [key, left, right] = node.match(/(.+) = \((.+), (.+)\)/)!.slice(1);
    map.set(key, [left, right]);
  }

  let count = 0;
  let i = 0;
  let cur = "AAA";

  while (true) {
    const [left, right] = map.get(cur)!;
    const step = steps[i];

    cur = step === "L" ? left : right;
    i = (i + 1) % steps.length;
    count++;

    if (cur === "ZZZ") {
      return count;
    }
  }
}
