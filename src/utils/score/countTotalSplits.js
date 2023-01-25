const countTotalSplits = (allScores) => {
  return allScores.reduce((count, score) => {
    score = JSON.parse(score);
    return count + score.length;
  }, 0);
};

export default countTotalSplits;
