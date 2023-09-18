import countTotalSplits from "./countTotalSplits";

export default function getAverageScore(allScores: any) {
  let total = 0;

  allScores.forEach((score: any) => {
    score = score.replace(/[[\]]/g, "").split(",").map(Number);
    total += score.reduce((a: any, b: any) => a + b);
  });

  let average = total / countTotalSplits(allScores);

  let averageScore = Math.round(average * 10) / 10;

  if (isNaN(averageScore)) {
    return 0;
  }

  return averageScore;
}
