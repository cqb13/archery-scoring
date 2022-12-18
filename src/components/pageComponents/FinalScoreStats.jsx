import React from "react";
import { useState, useEffect } from "react";

const FinalScoreStats = (props) => {
  const score = props.score;
  const [tenCount, setTenCount] = useState(0);
  const [nineCount, setNineCount] = useState(0);
  const [xCount, setXCount] = useState(0);
  const [mCount, setMCount] = useState(0);

  useEffect(() => {
    //TODO: in the future, use an array to store values, inorder to easily account for end splitss
    const countGiven = (value) => {
      let count = 0;

      for (let i = 0; i < score.length; i++) {
        for (let j = 0; j < score[i].length; j++) {
          for (let k = 0; k < score[i][j].length; k++) {
            if (score[i][j][k] === value) {
              count++;
            }
          }
        }
      }
      return count;
    };

    setTenCount(countGiven("10"));
    setNineCount(countGiven("9"));
    setXCount(countGiven("x") + countGiven("X"));
    setMCount(countGiven("m") + countGiven("M"));
  }, [score]);

  return (
    <ul>
      <li>Tens: {tenCount}</li>
      <li>Nines: {nineCount}</li>
      <li>Xs: {xCount}</li>
      <li>Misses: {mCount}</li>
    </ul>
  );
};

export default FinalScoreStats;
