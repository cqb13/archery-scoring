import { useState, useEffect } from "react";
import Button from "../elements/Button";
import React from "react";

const FinalScoreStats = (props) => {
  const [scoreStats, setScoreStats] = useState([[]]);
  const [totalScore, setTotalScore] = useState(0);
  const continueScoring = props.continueScoring;
  const history = props.history;
  const score = props.score;
  const reset = props.reset;
  const save = props.save;

  useEffect(() => {
    const stats = score.map((split) => {
      const splitStats = [0, 0, 0, 0, 0];
      split.forEach((end) => {
        end.forEach((arrow) => {
          if (arrow === "x" || arrow === "X") {
            splitStats[2]++;
            splitStats[4] += 10;
          } else if (arrow === "10") {
            splitStats[0]++;
            splitStats[4] += 10;
          } else if (arrow === "9") {
            splitStats[1]++;
            splitStats[4] += 9;
          } else if (arrow === "m" || arrow === "M" || arrow === "0") {
            splitStats[3]++;
            splitStats[4] += 0;
          } else {
            splitStats[4] += Number(arrow);
          }
        });
      });
      return splitStats;
    });
    const total = stats.reduce((a, b) => a + b[4], 0);
    setTotalScore(total);
    setScoreStats(stats);
  }, [score]);

  const handleSave = () => {
    save(totalScore);
  };

  return (
    <div className="Final-Score-Stats">
      <table>
        <thead>
          <th>Split</th>
          <th>10's</th>
          <th>9's</th>
          <th>X's</th>
          <th>M's</th>
          <th>Score</th>
        </thead>

        <tbody>
          {scoreStats.length > 1 ? (
            scoreStats.map((split, splitIndex) => (
              <tr key={splitIndex}>
                <td>{splitIndex + 1}</td>
                {split.map((stat, statIndex) => (
                  <td key={statIndex}>{stat}</td>
                ))}
              </tr>
            ))
          ) : null }
          <tr>
            <td>Total</td>
            {scoreStats.reduce((a, b) => {
              return a.map((c, i) => {
                return c + b[i];
              });
            }).map((stat, statIndex) => (
              <td key={statIndex}>{stat}</td>
            ))}
          </tr>
        </tbody>
      </table>
      {!history ? (
        <div className="Horizontal-Button-Container">
          <Button class="Final-Button" onClick={reset}>Finish</Button>
          <Button class="Final-Button" onClick={continueScoring}>Continue</Button>
          <Button class="Final-Button" onClick={handleSave}>Save</Button>
        </div>
      ) : null}
    </div>
  );
};

export default FinalScoreStats;
