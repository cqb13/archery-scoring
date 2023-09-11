"use client";

import { useState, useEffect } from "react";
import Button from "@components/general/button";

type Props = {
  arrowsPerEnd: number;
  history: boolean;
  splits: number;
  score?: number;
  done: boolean;
  ends: number;
};

export default function ScoringChart(props: Props) {
  const [currentSplit, setCurrentSplit] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [data, setData] = useState({} as any);

  const handleSwitch = (event: React.ChangeEvent<HTMLButtonElement>) => {
    if (event.target.value === "next") {
      if (currentSplit === 0) {
        setCurrentSplit(props.splits - 1);
        return;
      }
      setCurrentSplit(currentSplit - 1);
    } else {
      if (currentSplit === props.splits - 1) {
        setCurrentSplit(0);
        return;
      }
      setCurrentSplit(currentSplit + 1);
    }
  };


  useEffect(
    () => {
      if (history && props.score) {
        setData(props.score);
      } else {
        if (!props.splits || !props.ends || !props.arrowsPerEnd) return;
        let endsPerSplit = props.ends / props.splits;

        if (endsPerSplit % 1 !== 0) {
          endsPerSplit = Math.floor(endsPerSplit);
          const setupArray = Array.from(Array(props.splits), () =>
            new Array(endsPerSplit).fill(
              Array.from(Array(props.arrowsPerEnd), () => "")
            )
          );
          setupArray[props.splits - 1].push(
            Array.from(Array(props.arrowsPerEnd), () => "")
          );
          setData(setupArray);
          return;
        }

        const setupArray = Array.from(Array(props.splits), () =>
          new Array(endsPerSplit).fill(
            Array.from(Array(props.arrowsPerEnd), () => "")
          )
        );
        setData(setupArray);
      }
    },
    [props.arrowsPerEnd, props.ends, props.splits]
  );

  return (
    <section className="flex flex-col gap-2">
      {props.splits > 1
        ? <div className="flex gap-4 items-center justify-center border border-gray-300 shadow-card p-2 rounded-md">
            <Button title="back" onClick={handleSwitch} />
            <h2 className="w-56 text-center ">Split {currentSplit + 1}/{props.splits}</h2>
            <Button title="next" onClick={handleSwitch} />
          </div>
        : null}
      <table className="shadow-card block rounded-md p-2 border border-gray-300">
        <thead className="flex gap-2">
          {window.innerWidth > 768 ? <th>End</th> : null}
          {Array.from(Array(props.arrowsPerEnd), (x, i) => i + 1).map((_, columnIndex) => (
            <th key={columnIndex}>Arrow {columnIndex + 1}</th>
          ))}
          <th>Total</th>
          <th>Running Total</th>
        </thead>
        <tbody>
        {data[currentSplit].map((row: number[], rowIndex: number) => (
              <tr key={rowIndex}>
                {window.innerWidth < 768 && props.arrowsPerEnd > 3? (
                  null
                ) : <td>{rowIndex + 1}</td>}
                {row.map((column: number, columnIndex: number) => (
                  <td key={columnIndex}>
                  <input
                    type="text"
                    pattern="[0-9mxMX]*"
                    value={column}
                    //onChange={event => handleChange(event, rowIndex, columnIndex)}
                  />
                </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}
