import React from "react";
import { useState } from "react";
import ScoringChart from "./ScoringChart";
import FinalScoreStats from "./FinalScoreStats";
import Button from "../elements/Button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import googleSignIn from "../../utils/googleSignIn";

const ScoringPage = (props) => {
  const [user] = useAuthState(auth);
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

  const save = () => {
    if (user) {
      // Save to database
      reset();
    } else {
      googleSignIn();
    }
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
      {done ? <FinalScoreStats score={score} reset={reset} save={save}/> : null}
    </div>
  );
}

export default ScoringPage;
