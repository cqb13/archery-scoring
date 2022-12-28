import React from "react";
import { useState } from "react";
import ScoringChart from "./ScoringChart";
import FinalScoreStats from "./FinalScoreStats";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import googleSignIn from "../../utils/googleSignIn";
import SaveToDB from "../../utils/SaveScore";
import SaveDetails from "../elements/SaveDetails";

const ScoringPage = (props) => {
  const [user] = useAuthState(auth);
  const [data] = useState(props.data);
  const [score, setScore] = useState();
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const setUp = props.reset;

  const handleScore = (finalScore) => {
    setScore(finalScore);
    setDone(true);
  };

  const reset = () => {
    setDone(false);
    setUp();
  };

  const save = (finalScore) => {
    if (user) {
      setSaving(true);
      setTotalScore(finalScore);
    } else {
      googleSignIn();
    }
  };

  const confirmSave = (name, note, createdAt) => {
    SaveToDB(user, score, data, totalScore, name, note, createdAt);
    reset();
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
      {saving ? <SaveDetails confirmSave={confirmSave} cancel={setSaving}/> : null}
    </div>
  );
};

export default ScoringPage;
