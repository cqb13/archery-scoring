import countTotalSplits from "./countTotalSplits";

const getAverageScore = (allScores) => {
  let total = 0;

  allScores.forEach((score) => {
    score = score.replace(/[[\]]/g, '').split(',').map(Number);
    total += score.reduce((a, b) => a + b);
  });

  return total / countTotalSplits(allScores);
};

export default getAverageScore;
