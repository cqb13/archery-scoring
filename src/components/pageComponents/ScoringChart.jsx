import predictFinalScore from "../../utils/score/predictFinalScore";
import React, { useState, useEffect } from "react";
import isMobile from "../../utils/isMobile";
import CheckBox from "../elements/CheckBox";
import Button from "../elements/Button";

//TODO: clean up this code
function ScoringChart(props) {
  const [finalScorePrediction, setFinalScorePrediction] = useState(false);
  const [currentSplit, setCurrentSplit] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const arrowsPerEnd = props.arrowsPerEnd;
  const [data, setData] = useState([[]]);
  const returnData = props.returnData;
  const history = props.history;
  const splits = props.splits;
  const score = props.score;
  const mobile = isMobile();
  const ends = props.ends;
  const done = props.done;

  const handleChange = (event, rowIndex, columnIndex) => {
    if (history) return;
    let delay = event.target.value.startsWith("1") ? 1000 : 0;
    const updatedData = data[currentSplit].map((row, rIndex) => {
      if (rIndex === rowIndex) {
        return row.map((column, cIndex) => {
          if (cIndex === columnIndex) {
            switch (event.target.value) {
              case "m":
              case "M":
              case "x":
              case "X":
                setTimeout(() => {switchFocus(event) }, delay);
                return event.target.value;
              default:
                break;
            }
            return /^(0|[1-9]|1[0-1])$/.test(event.target.value) ? event.target.value : "";
          }
          return column;
        });
      }
      return row;
    });

    // keeps end splits from being overwritten
    setData((prevData) => {
      const newArray = [...prevData];
      newArray[currentSplit] = updatedData;
      return newArray;
    });

    if (/^(0|[1-9]|1[0-1])$/.test(event.target.value)) {
      setTimeout(() => {switchFocus(event) }, delay);
    }

    setFinalScore(predictFinalScore(updatedData, ends));
  };

  const specialInput = (event) => {
    const value = event.target.value;

    for (let i = 0; i < data[currentSplit].length; i++) {
      for (let j = 0; j < data[currentSplit][i].length; j++) {
        if (data[currentSplit][i][j] === "") {
          handleChange({ target: { value: value } }, i, j);
          return;
        }
      }
    }
  }

  const switchFocus = (event) => {
    if (event.target.nextSibling) {
      event.target.nextSibling.focus();
    } else if (event.target.parentNode.nextSibling) {
      event.target.parentNode.nextSibling.firstChild.focus();
    }
  }

  const handleSwitch = (event) => {
    if (event.target.value === "<") {
      if (currentSplit === 0) {
        setCurrentSplit(splits - 1);
        return;
      }
      setCurrentSplit(currentSplit - 1);
    } else {
      if (currentSplit === splits - 1) {
        setCurrentSplit(0);
        return;
      }
      setCurrentSplit(currentSplit + 1);
    }
  };

  const toggleFinalScorePrediction = () => {
    setFinalScorePrediction(!finalScorePrediction);
  };

  const addScores = (a, b) => {
    if (b === "m" || b === "M") return parseInt(a, 10) + 0;
    if (b === "x" || b === "X") return parseInt(a, 10) + 10;
    return parseInt(a, 10) + parseInt(b, 10);
  };

  const handleDone = () => {
    returnData(data);
  };

  useEffect(() => {
    if (history) {
      setData(score);
    } else {
      let endsPerSplit = ends / splits;

      if (endsPerSplit % 1 !== 0) {
        endsPerSplit = Math.floor(endsPerSplit);
        const setupArray = Array.from(Array(splits), () =>
          new Array(endsPerSplit).fill(
            Array.from(Array(arrowsPerEnd), () => "")
          )
        );
        setupArray[splits - 1].push(Array.from(Array(arrowsPerEnd), () => ""));
        setData(setupArray);
        return;
      }

      const setupArray = Array.from(Array(splits), () =>
        new Array(endsPerSplit).fill(Array.from(Array(arrowsPerEnd), () => ""))
      );
      setData(setupArray);
    }
  }, [arrowsPerEnd, ends, splits]);

  return (
    <section className="Vertical-Container">
      <section className="Horizontal-Container">
        {splits > 1 ? <Button class="Small-Button" type="switch" value="<" onClick={handleSwitch} >{"<"}</Button> : null}
        {splits > 1 ? <h2>Split {currentSplit + 1}/{splits}</h2> : null}
        {splits > 1 ? <Button class="Small-Button" type="switch" value=">" onClick={handleSwitch} >{">"}</Button> : null}
      </section>

    <main className='Scoring-Chart Colored-Container'>
      <table>
        <thead>
          <tr>
            {mobile & arrowsPerEnd > 3? (
              null
            ) : (
                <th>End</th>
            )}
            {Array.from(Array(arrowsPerEnd), (x, i) => i + 1).map((_, columnIndex) => (
              <th key={columnIndex}>Arrow {columnIndex + 1}</th>
            ))}
            <th>Total</th>
            <th>Running Total</th>
          </tr>
        </thead>
        <tbody>
          {data[currentSplit].map((row, rowIndex) => (
            <tr key={rowIndex}>
              {mobile & arrowsPerEnd > 3? (
                null
              ) : <td>{rowIndex + 1}</td>}
              {row.map((column, columnIndex) => (
                <td key={columnIndex}>
                <input
                  type="text"
                  class="Chart-Value-Input"
                  pattern="[0-9mxMX]*"
                  inputmode="numeric"
                  value={column}
                  onChange={event => handleChange(event, rowIndex, columnIndex)}
                />
              </td>
              ))}
              <td>{
                data[currentSplit][rowIndex].some(value => value === '') ? '0' :
                data[currentSplit][rowIndex].reduce((a, b) => {
                  return addScores(a, b)
                }, 0)
                }</td>
              <td>{
                data[currentSplit][rowIndex].some(value => value === '') ? '0' :
                data[currentSplit].slice(0, rowIndex + 1).reduce((a, b) => {
                  return a + b.reduce((c, d) => {
                    return addScores(c, d);
                  }, 0);
                }, 0)
              }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>

    {!done && !history ? (
      <div className="Vertical-Container">
        <CheckBox class='Score-Prediction' name='prediction' value={finalScorePrediction ? `Predicted final score: ${finalScore}` : 'Predict final score?'} onChange={toggleFinalScorePrediction}/>
        <section className="Horizontal-Container">
          {mobile ? <Button class="Mobile-Letter-Input" value="x" onClick={specialInput}>X</Button> : null}
          <Button class="Done" value="Done" onClick={handleDone} >Done</Button>
          {mobile ? <Button class="Mobile-Letter-Input" value="m" onClick={specialInput}>M</Button> : null}
        </section>
      </div>
    ) : null}
    </section>
  );
}

export default ScoringChart;
