import { useAuthState } from "react-firebase-hooks/auth";
import googleSignIn from "../../utils/account/googleSignIn";
import SaveToDB from "../../utils/score/SaveScore";
import SaveDetails from "../elements/SaveDetails";
import FinalScoreStats from "./FinalScoreStats";
import ScoringChart from "./ScoringChart";
import { auth } from "../../firebase";
import { useState } from "react";
import React from "react";

const ScoringPage = (props) => {
  const [totalScore, setTotalScore] = useState(0);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState();
  const [data] = useState(props.data);
  const [user] = useAuthState(auth);
  const setUp = props.reset;

  const handleScore = (finalScore) => {
    setScore(finalScore);
    setDone(true);
  };

  const continueScoring = () => {
    setDone(false);
  }

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
      {done ? <FinalScoreStats score={score} reset={reset} save={save} continueScoring={continueScoring}/> : null}
      {saving ? <SaveDetails confirmSave={confirmSave} cancel={setSaving}/> : null}
    </div>
  );
};

export default ScoringPage;
