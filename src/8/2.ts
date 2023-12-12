export default function solve(input: string): string {
  const [steps, nodes] = input.split("\n\n");

  const map = new Map<string, [string, string]>();

  for (const node of nodes.trim().split("\n")) {
    const [key, left, right] = node.match(/(.+) = \((.+), (.+)\)/)!.slice(1);
    map.set(key, [left, right]);
  }

  const starts = [...map.keys()].filter((key) => key.endsWith("A"));

  const periodicities = starts.map((start) => {
    let count = 0;
    let i = 0;
    let cur = start;

    while (true) {
      const [left, right] = map.get(cur)!;
      const step = steps[i];

      cur = step === "L" ? left : right;
      i = (i + 1) % steps.length;
      count++;

      if (cur.endsWith("Z")) {
        return count;
      }
    }
  });

  return periodicities.join("-");
  // const multiples = new Map<number, number>();
  //
  // for (let i = 1; ; i++) {
  //   periodicities.forEach((p) => {
  //     const product = p * i;
  //     const found = multiples.get(product) ?? 0;
  //
  //     if (found === periodicities.length - 1) {
  //       return product;
  //     }
  //
  //     multiples.set(product, found + 1);
  //   });
  // }
}
