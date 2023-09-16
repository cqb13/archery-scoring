"use client";

import Button from "@components/general/button";
import { useState, useEffect } from "react";

type Props = {
  arrowsPerEnd: number;
  history: boolean;
  splits: number;
  score?: number;
  done: boolean;
  ends?: number;
  updateData?: (value: any) => void;
};

export default function ScoringChart(props: Props) {
  const [currentSplit, setCurrentSplit] = useState(0);
  const [data, setData] = useState({} as any);

  useEffect(() => {
    if (!props.updateData) return;
    props.updateData(data);
  }, [data, props]);

  const handleSwitch = (direction: string) => {
    if (direction === "back") {
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

  const handleChange = (event: any, rowIndex: any, columnIndex: any) => {
    if (props.history) return;
    let delay = event.target.value.startsWith("1") ? 1000 : 0;
    const updatedData = data[currentSplit].map((row: any, rIndex: any) => {
      if (rIndex === rowIndex) {
        return row.map((column: any, cIndex: any) => {
          if (cIndex === columnIndex) {
            switch (event.target.value) {
              case "m":
              case "M":
              case "x":
              case "X":
                setTimeout(() => {
                  switchFocus(event, columnIndex, rowIndex);
                }, delay);
                return event.target.value;
              default:
                break;
            }
            return /^(0|[1-9]|1[0-1])$/.test(event.target.value)
              ? event.target.value
              : "";
          }
          return column;
        });
      }
      return row;
    });
    // keeps end splits from being overwritten
    setData((prevData: any) => {
      const newArray = [...prevData];
      newArray[currentSplit] = updatedData;
      return newArray;
    });

    if (/^(0|[1-9]|1[0-1])$/.test(event.target.value)) {
      setTimeout(() => {
        switchFocus(event, columnIndex, rowIndex);
      }, delay);
    }
  };

  const switchFocus = (event: any, columnIndex: number, rowIndex: number) => {
    let arrowsPerEnd = props.arrowsPerEnd;
    let ends = props.ends;
    let currentArrow = columnIndex + 1;
    let currentEnd = rowIndex + 1;

    // set the focus the next arrow
    if (currentArrow < arrowsPerEnd) {
      document.getElementById(`${currentArrow + 1}-${currentEnd}`)?.focus();
      return;
    } else {
      if (!ends) return;
      // if the end is not the last end, set the focus to the first arrow of the next end
      if (currentEnd < ends) {
        document.getElementById(`1-${currentEnd + 1}`)?.focus();
        return;
      }
    }
  };

  const addScores = (a: string, b: string) => {
    if (b === "m" || b === "M") return parseInt(a, 10) + 0;
    if (b === "x" || b === "X") return parseInt(a, 10) + 10;
    return parseInt(a, 10) + parseInt(b, 10);
  };

  useEffect(() => {
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
  }, [props.arrowsPerEnd, props.ends, props.splits, props.score]);

  return (
    <section className='flex flex-col gap-2'>
      {props.splits > 1 ? (
        <div className='flex gap-4 items-center justify-center border border-gray-300 shadow-card p-2 rounded-md'>
          <Button title='back' onClick={() => handleSwitch("back")} />
          <h2 className='w-56 text-center '>
            Split {currentSplit + 1}/{props.splits}
          </h2>
          <Button title='next' onClick={() => handleSwitch("next")} />
        </div>
      ) : null}
      <table className='shadow-card block rounded-md p-10 border border-gray-300'>
        <thead className=''>
          <th>End</th>
          {Array.from(Array(props.arrowsPerEnd), (x, i) => i + 1).map(
            (_, columnIndex) => (
              <th key={columnIndex}>Arrow {columnIndex + 1}</th>
            )
          )}
          <div className='flex items-center justify-between gap-2'>
            <th>Total</th>
            <th>Running Total</th>
          </div>
        </thead>
        <tbody>
          {data[currentSplit]?.map((row: number[], rowIndex: number) => (
            <tr key={rowIndex} className='w-full'>
              <td>{rowIndex + 1}</td>
              {row.map((column: number, columnIndex: number) => (
                <td key={columnIndex}>
                  <input
                    type='text'
                    id={`${columnIndex + 1}-${rowIndex + 1}`}
                    pattern='[0-9mxMX]*'
                    className='bg-lightest border border-gray-300 rounded-sm outline-none focus:border-highlight px-2 w-11/12'
                    value={column}
                    onChange={(event) =>
                      handleChange(event, rowIndex, columnIndex)
                    }
                  />
                </td>
              ))}
              <div className='flex gap-2 items-center justify-between'>
                <td className='text-center w-full'>
                  {data[currentSplit][rowIndex].some(
                    (value: string) => value === ""
                  )
                    ? "0"
                    : data[currentSplit][rowIndex].reduce(
                        (a: string, b: string) => {
                          return addScores(a, b);
                        },
                        0
                      )}
                </td>
                <td className='text-center w-full'>
                  {data[currentSplit][rowIndex].some(
                    (value: string) => value === ""
                  )
                    ? "0"
                    : data[currentSplit]
                        .slice(0, rowIndex + 1)
                        .reduce((a: any, b: any) => {
                          return (
                            a +
                            b.reduce((c: any, d: any) => {
                              return addScores(c, d);
                            }, 0)
                          );
                        }, 0)}
                </td>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
