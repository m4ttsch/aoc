export default function solve(input: string): number {
  const [seedsRaw, ...mapsRaw] = input.split("\n\n");
  const seeds = [...seedsRaw.matchAll(/\d+/g)].map((seed) => +seed);

  const maps: [number, number, number][][] = mapsRaw.map((mapRaw) => {
    return [...mapRaw.matchAll(/(\d+) (\d+) (\d+)/g)].map((match) => {
      return [+match[1], +match[2], +match[3]]; // dest, src, len
    });
  });

  return seeds.reduce((min, seed) => {
    const location = maps.reduce((key, map) => {
      const slice = map.find(([, src, len]) => {
        return src <= key && src + len >= key;
      });

      if (!slice) {
        return key;
      } else {
        return slice[0] + key - slice[1];
      }
    }, seed);

    return Math.min(min, location);
  }, Number.MAX_SAFE_INTEGER);
}
