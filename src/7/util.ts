export function count(src: string, char: string): number {
  return [...src].reduce((sum, c) => sum + Number(char === c), 0);
}

export enum Score {
  HighCard = 1,
  Pair = 2,
  TwoPair = 3,
  ThreeOAK = 4,
  FullHouse = 5,
  FourOAK = 6,
  FiveOAK = 7,
}

export function score(input: string): number {
  const uniq = [...new Set(input)];

  switch (uniq.length) {
    case 1:
      return Score.FiveOAK;
    case 2:
      if (uniq.some((u) => count(input, u) === 4)) {
        return Score.FourOAK;
      } else {
        return Score.FullHouse;
      }
    case 3:
      if (uniq.some((u) => count(input, u) === 3)) {
        return Score.ThreeOAK;
      } else {
        return Score.TwoPair;
      }
    case 4:
      return Score.Pair;
    default:
      return Score.HighCard;
  }
}

export function handCompare(
  a: string,
  b: string,
  scorer = score,
  cards = "23456789TJQKA",
): number {
  const scoreA = scorer(a);
  const scoreB = scorer(b);

  if (scoreA !== scoreB) {
    return scoreA > scoreB ? 1 : -1;
  }

  for (let i = 0; i < 5; i++) {
    const scoreAi = cards.indexOf(a[i]);
    const scoreBi = cards.indexOf(b[i]);

    if (scoreAi !== scoreBi) {
      return scoreAi > scoreBi ? 1 : -1;
    }
  }

  return 0;
}
