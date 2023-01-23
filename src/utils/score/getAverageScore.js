const getAverageScore = (allScores) => {
  let allGameScores = JSON.parse(allScores);
  let totalScore = 0;

  allGameScores.forEach((score) => {
    totalScore += score;
  });

  return totalScore / allGameScores.length;
};

export default getAverageScore;
