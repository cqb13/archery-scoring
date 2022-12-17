import React, { useState, useEffect } from 'react';
import Button from "../elements/Button";

/*
  add a done button @ the bottom of the chart,
    when clicked, it will sort the rows from highest to lowest
    
    then it will create another chart with the number of 10s 9s
      if there are x's then it will create a seperate column for them

      if there are end splits 
        then each end split will have a seperate row in the chart, with totals being added later

  this component should be rendered in the ScoringPage component
*/

function ScoringChart(props) {
  const [data, setData] = useState([[]]);
  const [currentSplit, setCurrentSplit] = useState(0);
  const arrowsPerEnd = props.arrowsPerEnd;
  const splits = props.splits;
  const ends = props.ends;

  const handleChange = (event, rowIndex, columnIndex) => {
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

  useEffect(() => {    
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
                  if (b === 'm' || b === 'M' || b === '') return parseInt(a, 10) + 0;
                  if (b === 'x' || b === 'X') return parseInt(a, 10) + 10;
                  return parseInt(a, 10) + parseInt(b, 10);
                }, 0)
                }</td>
              <td>{
                data[currentSplit][rowIndex].some(value => value === '') ? '0' :
                data[currentSplit].slice(0, rowIndex + 1).reduce((a, b) => {
                  return a + b.reduce((c, d) => {
                    if (d === 'm' || d === 'M') return parseInt(c, 10) + 0;
                    if (d === 'x' || d === 'X') return parseInt(c, 10) + 10;
                    return parseInt(c, 10) + parseInt(d, 10);
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
    </>
  );
}

export default ScoringChart;
           