import React from "react";
import { useState } from "react";
import ScoringChart from "./ScoringChart";
import FinalScoreStats from "./FinalScoreStats";

/*
  add a done button @ the bottom of the chart,
    when clicked, it will sort the rows from highest to lowest
    
    then it will create another chart with the number of 10s 9s
      if there are x's then it will create a seperate column for them

      if there are end splits 
        then each end split will have a seperate row in the chart, with totals being added later

  this component should be rendered in the ScoringPage component
*/

const ScoringPage = (props) => {
  const [data] = useState(props.data);
  const [score, setScore] = useState();
  const [done, setDone] = useState(false);
  const setUp = props.reset;

  const handleScore = (finalScore) => {
    setScore(finalScore);
    setDone(true);
  };

  const reset = () => {
    setDone(false);
    setUp();
  };

  return (
    <div className='Scoring-Page'>
      <h1>Score</h1>
      <hr />
      <ScoringChart
        arrowsPerEnd={data.arrowsPerEnd}
        ends={data.ends}
        splits={data.sessions}
        done={done}
        returnData={handleScore}
      />
      {done ? <FinalScoreStats score={score} reset={reset}/> : null}
    </div>
  );
}

export default ScoringPage;
