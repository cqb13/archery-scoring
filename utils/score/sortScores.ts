export default async function sortScores(scores: any) {
  scores.forEach((split: any) => {
    split.forEach((end: any) => {
      end.sort((a: any, b: any) => {
        if (a === "x" || a === "X") {
          return -1;
        }
        if (b === "x" || b === "X") {
          return 1;
        }

        if (a === "m" || a === "M") {
          return 1;
        }
        if (b === "m" || b === "M") {
          return -1;
        }

        return b - a;
      });
    });
  });

  return scores;
}
