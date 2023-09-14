export default function countTotalSplits(allScores: any) {
  return allScores.reduce((count: any, score: any) => {
    score = JSON.parse(score);
    return count + score.length;
  }, 0);
}
