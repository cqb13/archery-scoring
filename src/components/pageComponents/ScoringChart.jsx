import React, { useState, useEffect } from 'react';
import "../../css/ScoringChart.css"

function ScoringChart(props) {
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
            // Only allow numbers to be entered in the text box
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
            {data[0].map((_, columnIndex) => (
              <th key={columnIndex}>Arrow {columnIndex + 1}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((column, columnIndex) => (
                <td key={columnIndex}>
                  <input
                    type="text"
                    value={column}
                    onChange={event => handleChange(event, rowIndex, columnIndex)}
                  />
                </td>
              ))}
              <td>{row.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScoringChart;
           