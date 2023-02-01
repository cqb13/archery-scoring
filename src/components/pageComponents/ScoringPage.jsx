import googleSignIn from "../../utils/account/googleSignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import SaveToDB from "../../utils/score/SaveScore";
import SaveDetails from "../elements/SaveDetails";
import FinalScoreStats from "./FinalScoreStats";
import ScoringChart from "./ScoringChart";
import Popup from "../elements/Popup";
import { auth } from "../../firebase";
import { useState } from "react";
import React from "react";

const ScoringPage = (props) => {
  const [totalScore, setTotalScore] = useState(0);
  const [saving, setSaving] = useState(false);
  const [popup, setPopup] = useState(false);
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
      togglePopup();
    }
  };

  const confirmSave = (name, note, createdAt) => {
    SaveToDB(user, score, data, totalScore, name, note, createdAt);

    reset();
  };

  const togglePopup = () => {
    setPopup(!popup);
  };

  const signIn = () => {
    togglePopup();
    googleSignIn();
  };

  return (
    <div className='Scoring-Page'>
      <ScoringChart
        arrowsPerEnd={data.arrowsPerEnd}
        ends={data.ends}
        splits={data.sessions}
        done={done}
        returnData={handleScore}
      />
      {done ? (
        <FinalScoreStats
          score={score}
          reset={reset}
          save={save}
          continueScoring={continueScoring}
        />
      ) : null}
      {saving ? (
        <SaveDetails confirmSave={confirmSave} cancel={setSaving} />
      ) : null}
      {popup ? (
        <Popup 
          title="Sign In" 
          message={`You must sign in to save your score.`} 
          confirmButtonValue={"Sign In"}
          confirmButtonFunction={signIn}
          cancelButtonValue={"Cancel"}
          cancelButtonFunction={togglePopup}
          >
        </Popup>
      ) : null}
    </div>
  );
};

export default ScoringPage;
