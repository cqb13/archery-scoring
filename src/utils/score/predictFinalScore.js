const predictFinalScore = (scores, ends) => {
  let actualValues = [];
  let endTotals = [];

  for (let i = 0; i < scores.length; i++) {
    let total = 0;
    for (let j = 0; j < scores[i].length; j++) {
      if (scores[i][j] === "X" || scores[i][j] === "x") {
        total += 10;
      } else if (scores[i][j] === "M" || scores[i][j] === "m") {
        total += 0;
      } else {
        total += Number(scores[i][j]);
      }
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

  if (currentEndAverage === null) {
    predictedFinalScore = 0;
  }

  return Math.round(predictedFinalScore);
};

export default predictFinalScore;
