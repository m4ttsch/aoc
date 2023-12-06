export class Range {
  constructor(
    public readonly start: number,
    public readonly end: number,
  ) {}

  /*
   * There are four types of intersections between `this` and `other`
   * 1. `this` intersects with `other` from the left
   * -----t------
   *         -----o------
   *
   * 2. `this` intersects with `other` from the right
   *         -----t-----
   * -----o-----
   *
   * 3. `this` is a superset of `other` (this is 1 & 2 combined)
   * -----t-----
   *   ---o---
   *
   * 4. `this` is a subset of `other`
   *   ---t---
   * -----o-----
   */
  public intersects(other: Range): boolean {
    return (
      this.includes(other.start) || // case 1
      this.includes(other.end) || // case 2
      this.isSubsetOf(other) // case 4
    );
  }

  public includes(number: number): boolean {
    return number >= this.start && number <= this.end;
  }

  public isSubsetOf(other: Range): boolean {
    return this.start >= other.start && this.end <= other.end;
  }
  public intersection(other: Range): number {}
}
