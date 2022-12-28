import React from "react";
import { useState, useEffect } from "react";
import Button from "../elements/Button";

const FinalScoreStats = (props) => {
  const [totalScore, setTotalScore] = useState(0);
  const history = props.history;
  const score = props.score;
  const reset = props.reset;
  const save = props.save;
  const [scoreStats, setScoreStats] = useState([[]]);

  useEffect(() => {
    const stats = score.map((split) => {
      const splitStats = [0, 0, 0, 0, 0];
      split.forEach((end) => {
        end.forEach((arrow) => {
          switch (arrow) {
            case "10":
              splitStats[0]++;
              splitStats[4] += 10;
              break;
            case "9":
              splitStats[1]++;
              splitStats[4] += 9;
              break;
            case "8":
              splitStats[4] += 8;
              break;
            case "7":
              splitStats[4] += 7;
              break;
            case "6":
              splitStats[4] += 6;
              break;
            case "5":
              splitStats[4] += 5;
              break;
            case "4":
              splitStats[4] += 4;
              break;
            case "3":
              splitStats[4] += 3;
              break;
            case "2":
              splitStats[4] += 2;
              break;
            case "1":
              splitStats[4] += 1;
              break;
            case "x":
            case "X":
              splitStats[2]++;
              splitStats[4] += 10;
              break;
            case "m":
            case "M":
            case "0":
              splitStats[3]++;
              splitStats[4] += 0;
              break;
            default:
              break;
          }
        });
      });
      return splitStats;
    });
    const total = stats.reduce((a, b) => {
      return a + b[4];
    }, 0);
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
        <div className="Button-Container">
          <Button class="Final-Button" onClick={reset}>Finish</Button>
          <Button class="Final-Button" onClick={handleSave}>Save</Button>
        </div>
      ) : null}
    </div>
  );
};

export default FinalScoreStats;
