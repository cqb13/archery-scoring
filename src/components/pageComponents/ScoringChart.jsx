import React, { useState, useEffect } from 'react';
import Button from "../elements/Button";

function ScoringChart(props) {
  const [data, setData] = useState([[]]);
  const [currentSplit, setCurrentSplit] = useState(0);
  const arrowsPerEnd = props.arrowsPerEnd;
  const returnData = props.returnData;
  const history = props.history;
  const splits = props.splits;
  const score = props.score;
  const ends = props.ends;
  const done = props.done;

  const handleChange = (event, rowIndex, columnIndex) => {
    if (history) return;
    const updatedData = data[currentSplit].map((row, rIndex) => {
      if (rIndex === rowIndex) {
        return row.map((column, cIndex) => {
          if (cIndex === columnIndex) {
            switch (event.target.value) {
              case 'm':
              case 'M':
              case 'x':
              case 'X':
                return event.target.value;
              default:
                break;
            }
            return /^\d+$/.test(event.target.value) ? event.target.value : '';
          }
          return column;
        });
      }
      return row;
    });

    // keeps end splits from being overwritten
    setData(prevData => {
      const newArray = [...prevData];
      newArray[currentSplit] = updatedData;
      return newArray;
    })
  };

  const handleSwitch = (event) => {
    if (event.target.value === '<') {
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
  }

  const addScores = (a, b) => {
    if (b === 'm' || b === 'M') return parseInt(a, 10) + 0;
    if (b === 'x' || b === 'X') return parseInt(a, 10) + 10;
    return parseInt(a, 10) + parseInt(b, 10);
  }

  const handleDone = () => {
    returnData(data)
  }

  useEffect(() => {  
    if (history) {
      setData(score)
    } else {
      let endsPerSplit = ends / splits;

      if (endsPerSplit % 1 !== 0) {
        endsPerSplit = Math.floor(endsPerSplit);
        const setupArray = Array.from(Array(splits), () => new Array(endsPerSplit).fill(Array.from(Array(arrowsPerEnd), () => '')));
        setupArray[splits - 1].push(Array.from(Array(arrowsPerEnd), () => ''));
        setData(setupArray);
        return;
      }
      
      const setupArray = Array.from(Array(splits), () => new Array(endsPerSplit).fill(Array.from(Array(arrowsPerEnd), () => '')));
      setData(setupArray);
    }

  }, [arrowsPerEnd, ends, splits]);

  return (
    <>
    {splits > 1 ? <h2>Split {currentSplit + 1}</h2> : null}
    <div className='Chart-Container'>
    {splits > 1 ? <Button class="Switch-Chart" type="switch" value="<" onClick={handleSwitch} >{"<"}</Button> : null}
    <div className='Scoring-Chart'>
      <table>
        <thead>
          <tr>
            <th>End</th>
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
              <td>{rowIndex + 1}</td>
              {row.map((column, columnIndex) => (
                <td key={columnIndex}>
                <input
                  type="text"
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
    </div>
    {splits > 1 ? <Button class="Switch-Chart" type="switch" value=">" onClick={handleSwitch} >{">"}</Button> : null}
    </div>
    {!done && !history ? <Button class="Done" type="button" value="Done" onClick={handleDone} >Done</Button> : null}
    </>
  );
}

export default ScoringChart;
           