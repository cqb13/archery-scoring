import React, { useState, useEffect } from 'react';
import "../../css/ScoringChart.css"

function ScoringChart(props) {
  //TODO: when finished scoreing, sort the row values from highest to lowest
  const [data, setData] = useState([[]]);
  //TODO: monkey code (new values from sliders are strings not ints)
  const arrowsPerEnd = parseInt(props.arrowsPerEnd);
  const ends = parseInt(props.ends);

  const handleChange = (event, rowIndex, columnIndex) => {
    // Update the value of the text box at the specified row and column
    const updatedData = data.map((row, rIndex) => {
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
    setData(updatedData);
  };

  useEffect(() => {
    setData(Array.from(Array(ends), () => new Array(arrowsPerEnd).fill('')));
  }, [arrowsPerEnd, ends]);

  return (
    <div className='Scoring-Chart'>
      <table>
        <thead>
          <tr>
            <th>End</th>
            {data[0].map((_, columnIndex) => (
              <th key={columnIndex}>Arrow {columnIndex + 1}</th>
            ))}
            <th>Total</th>
            <th>Running Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
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
                data[rowIndex][data[rowIndex].length - 1] === '' ? '0' :
                data[rowIndex].reduce((a, b) => {
                  if (b === 'm' || b === 'M' || b === '') return parseInt(a, 10) + 0;
                  if (b === 'x' || b === 'X') return parseInt(a, 10) + 10;
                  return parseInt(a, 10) + parseInt(b, 10);
                }, 0)
                }</td>
              <td>{
                //TODO: if any of the values in the row are empty, the running total should be empty
                //!!!: value is NaN if last value is not filled last
                data[rowIndex][data[rowIndex].length - 1] === '' ? '0' :
                data.slice(0, rowIndex + 1).reduce((a, b) => {
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
  );
}

export default ScoringChart;
           