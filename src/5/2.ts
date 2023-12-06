import { Range } from "./Range";

const SEED_REGEX = /(\d+) (\d+)/g;
const MAPS_REGEX = /(\d+ ) (\d+) (\d+)/g;

export default function solve(almanac: string): number {
  const [seedsRaw, ...mapsRaw] = almanac.split("\n\n");

  const seeds = Array.from(seedsRaw.matchAll(SEED_REGEX)).map((m) => {
    return new Range(+m[1], +m[2]);
  });

  /*
   * Range maps define key/value pairs over ranges.
   * Ranges are tuples of the form: [rangeStart: number, rangeEnd: number]
   */
  const rangeMaps = mapsRaw.map((mapRaw) => {
    return (
      [...mapRaw.matchAll(MAPS_REGEX)]
        .map<[Range, Range]>((m) => [
          new Range(+m[2], +m[2] + +m[3]),
          new Range(+m[1], +m[1] + +m[3]),
        ])
        /*
         * We sort each map ascending by start of range key. This ordering will
         * help us compute gaps in a later step.
         */
        .toSorted((a, b) => a[0].start - b[0].start)
    );
  });

  let min = Number.MAX_SAFE_INTEGER;

  for (const initRange of seeds) {
    const finalRanges = rangeMaps.reduce(
      (prevRanges, map) => {
        return prevRanges.flatMap((range) => {
          const intersections = map.filter(([k]) => range.intersects(k));
          const identityRange: [Range, Range] = [range, range];

          const filled = [identityRange];

          for (const intersection of intersections) {
            // WTAF
          }

          /*
           * Given the complete mapping of source sub-ranges to destination
           * sub-range, now perform the mapping
           */
          return filled.map(([, value]) => value);
        });
      },
      [initRange],
    );

    min = finalRanges.reduce((min, range) => Math.min(min, range.start), min);
  }

  return min;
}
