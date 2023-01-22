const sortScores = async (scores) => {
  scores.forEach((split) => {
    split.forEach((end) => {
      end.sort((a, b) => {
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
};

export default sortScores;
