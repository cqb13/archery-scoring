import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDoc, doc, getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import { auth, db } from "../firebase";
import Button from "../components/elements/Button";
import googleSignIn from "../utils/googleSignIn";
import FinalScoreStats from "../components/pageComponents/FinalScoreStats";
import ScoringChart from "../components/pageComponents/ScoringChart";
import DropdownMenu from "../components/elements/DropdownMenu";

//!!!: when switching between charts of the same type, values of main chart are not updated
const History = () => {
  const [user] = useAuthState(auth);
  const [score, setScore] = useState();
  const [arrowsPerEnd, setArrowsPerEnd] = useState();
  const [splits, setSplits] = useState();
  const [distance, setDistance] = useState();
  const [distanceUnit, setDistanceUnit] = useState();
  const [location, setLocation] = useState();
  const [bow, setBow] = useState();
  const [setDate] = useState();
  const [dateMap] = useState(new Map());
  const [currentGame, setCurrentGame] = useState(1);

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
        getScoreDoc(dateMap.values().next().value);
        setCurrentGame(dateMap.size);
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

  const switchGame = (e) => {
    let reverseDates = Array.from(dateMap.keys()).slice().reverse();
    if (e.target.value === '<') {
      if (currentGame === 1) {
        setCurrentGame(dateMap.size);
        changeGame(reverseDates[reverseDates.length - 1]);
      } else {
        setCurrentGame(currentGame - 1);
        changeGame(reverseDates[currentGame - 2]);
      }
    } else {
      if (currentGame === dateMap.size) {
        setCurrentGame(1);
        changeGame(reverseDates[0]);
      } else {
        setCurrentGame(currentGame + 1);
        changeGame(reverseDates[currentGame]);
      }
    }
  }

  return (
    <>
      <h1>History</h1>
      <hr />
      {user && score ? (
        <div>
          <div className="Info-Bar">
          <DropdownMenu options={Array.from(dateMap.keys())} updateDate={setDate} setGame={setCurrentGame} changeGame={changeGame} currentGame={currentGame}/>
            <div className="Switch-Game-Container">
              <Button class="Switch-Game" type="switch" value="<" onClick={switchGame}>{"<"}</Button>
              <h2 className="Game-Count">Game {currentGame}/{dateMap.size}</h2>
              <Button class="Switch-Game" type="switch" value=">" onClick={switchGame}>{">"}</Button>
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
