import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import Button from "../components/elements/Button";
import googleSignIn from "../utils/googleSignIn";
import FinalScoreStats from "../components/pageComponents/FinalScoreStats";
import ScoringChart from "../components/pageComponents/ScoringChart";

const History = () => {
  const [user] = useAuthState(auth);
  const [score, setScore] = useState();
  const [arrowsPerEnd, setArrowsPerEnd] = useState();
  const [ends, setEnds] = useState();
  const [splits, setSplits] = useState();
  const [distance, setDistance] = useState();
  const [distanceUnit, setDistanceUnit] = useState();
  const [location, setLocation] = useState();
  const [date, setDate] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const scoreDoc = doc(db, "users", user.uid, "scores", "QBcoXjiCVJjvbphlyVM5");
        const scoreSnap = await getDoc(scoreDoc);
        if (scoreSnap.exists()) {
          setScore(scoreSnap.data().score);
          setArrowsPerEnd(scoreSnap.data().arrowsPerEnd);
          setEnds(scoreSnap.data().ends);
          setSplits(scoreSnap.data().sessions);
          setDistance(scoreSnap.data().distance);
          setDistanceUnit(scoreSnap.data().distanceUnit);
          setLocation(scoreSnap.data().location);
          setDate(scoreSnap.data().createdAt.toDate().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
        } 
      }
    };
    fetchData();
  }, [user]);

  return (
    <>
      <h1>History</h1>
      <hr />
      {user && score ? (
        <div>
          <div className="Info-Bar">
            {/*make a dropdown to pick a specifc date from list of all dates*/}
            <h2>{date}</h2>
            <div className="Switch-Game-Container">
              <Button class="Switch-Game" type="switch" value="<" >{"<"}</Button>
              {/*create an component (same style as bellow), replace the current chart with text input for chart num*/}
              <h2 className="Game-Count">Game 1/1</h2>
              <Button class="Switch-Game" type="switch" value=">" >{">"}</Button>
            </div>
            <h2>{location}</h2>
            <h2>{distance}{distanceUnit}</h2>
          </div>
          <ScoringChart score={JSON.parse(score)} arrowsPerEnd={arrowsPerEnd} splits={splits} history={true}/>
          <FinalScoreStats score={JSON.parse(score)} history={true}/>
        </div>
      ) : (
        <Button class='Account-Button' onClick={googleSignIn}>
          Sign In
        </Button>
      )}
    </>
  );
};

export default History;
