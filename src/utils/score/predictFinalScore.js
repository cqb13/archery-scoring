const predictFinalScore = (scores, ends) => {
  let endTotals = [];
  let actualValues = [];

  for (let i = 0; i < scores.length; i++) {
    let total = 0;
    for (let j = 0; j < scores[i].length; j++) {
      total += Number(scores[i][j]);
    }
    endTotals.push(total);
  }

  for (let i = 0; i < endTotals.length; i++) {
    if (endTotals[i] > 0) {
      actualValues.push(endTotals[i]);
    }
  }

  let currentEndAverage = actualValues.reduce((a, b) => a + b, 0) / actualValues.length;

  let predictedFinalScore = currentEndAverage * ends;

  return Math.round(predictedFinalScore);
};

export default predictFinalScore;
