import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDoc, doc, getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import { auth, db } from "../firebase";
import Button from "../components/elements/Button";
import googleSignIn from "../utils/googleSignIn";
import FinalScoreStats from "../components/pageComponents/FinalScoreStats";
import ScoringChart from "../components/pageComponents/ScoringChart";
import DropdownMenu from "../components/elements/DropdownMenu";

const History = () => {
  const [user] = useAuthState(auth);
  const [score, setScore] = useState();
  const [arrowsPerEnd, setArrowsPerEnd] = useState();
  const [splits, setSplits] = useState();
  const [distance, setDistance] = useState();
  const [distanceUnit, setDistanceUnit] = useState();
  const [location, setLocation] = useState();
  const [bow, setBow] = useState();
  const [date, setDate] = useState();
  const [dateMap] = useState(new Map());

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const scoreCollection = collection(db, "users", user.uid, "scores");
        const scoreQuery = query(scoreCollection, orderBy("createdAt", "desc"), limit(10));
        const scoreQuerySnapshot = await getDocs(scoreQuery);
        scoreQuerySnapshot.forEach((doc) => {
          const date = doc.data().createdAt.toDate().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
          dateMap.set(date, doc.id);
        });
        //TODO: use function to get latest by date
        getScoreDoc(dateMap.values().next().value);
      }
    };
    fetchData();
  }, [user]);

  const getScoreDoc = async (id) => {
    const scoreDoc = doc(db, "users", user.uid, "scores", id);
    const scoreSnap = await getDoc(scoreDoc);
    if (scoreSnap.exists()) {
      setScore(scoreSnap.data().score);
      setArrowsPerEnd(scoreSnap.data().arrowsPerEnd);
      setDistance(scoreSnap.data().distance);
      setSplits(scoreSnap.data().sessions);
      setDistanceUnit(scoreSnap.data().distanceUnit);
      setLocation(scoreSnap.data().location);
      setBow(scoreSnap.data().bow);
    } 
  };

  const changeGame = (date) => {
    getScoreDoc(dateMap.get(date));
  }

  return (
    <>
      <h1>History</h1>
      <hr />
      {user && score ? (
        <div>
          <div className="Info-Bar">
            {/*make a dropdown to pick a specifc date from list of all dates*/}
            <DropdownMenu options={Array.from(dateMap.keys())} updateDate={changeGame}/>
            <div className="Switch-Game-Container">
              <Button class="Switch-Game" type="switch" value="<" >{"<"}</Button>
              {/*create an component (same style as bellow), replace the current chart with text input for chart num*/}
              <h2 className="Game-Count">Game 1/{dateMap.size}</h2>
              <Button class="Switch-Game" type="switch" value=">" >{">"}</Button>
            </div>
            <h2>{location}</h2>
            <h2>{distance}{distanceUnit}</h2>
            <h2>{bow}</h2>
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
