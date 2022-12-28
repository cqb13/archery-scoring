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
  const [dateMap] = useState(new Map());
  const [currentGame, setCurrentGame] = useState(1);
  const [note, setNote] = useState();
  const [noteOpen, setNoteOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const scoreCollection = collection(db, "users", user.uid, "scores");
        const scoreQuery = query(
          scoreCollection,
          orderBy("date", "desc"),
          limit(10)
        );
        const scoreQuerySnapshot = await getDocs(scoreQuery);
        scoreQuerySnapshot.forEach((doc) => {
          const date = new Date(doc.data().date).toLocaleDateString();
          const time = new Date(doc.data().date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          });
          const name = doc.data().name;

          //TODO: add a condition if there is a date and time and a name, and a new same date and time without a name, append (1) in place of the name on the first one, and (2) on the second one, and so on
          //TODO: add a condition if there is a date and time and a name, and a new same date and time and a name, append (1) in place of the end of the name on the first one, and (2) on the second one, and so on
          if (name) dateMap.set(date + " " + time + " | " + name, doc.id);
          else dateMap.set(date + " " + time, doc.id);
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
      setNote(scoreSnap.data().note);
    }
  };

  const changeGame = (date) => {
    setScore();
    getScoreDoc(dateMap.get(date));
  };

  const switchGame = (e) => {
    let reverseDates = Array.from(dateMap.keys()).slice().reverse();
    if (e.target.value === "<") {
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
  };

  const toggleNote = () => {
    setNoteOpen(!noteOpen);
  };

  return (
    <>
      <h1>History</h1>
      <hr />
      {score ? (
        <div>
          <div className="Info-Bar">
            <DropdownMenu options={Array.from(dateMap.keys())} setGame={setCurrentGame} changeGame={changeGame} currentGame={currentGame} />
            <div className="Switch-Game-Container">
              <Button class="Switch-Game" type="switch" value="<" onClick={switchGame}>{"<"}</Button>
              <h2 className="Game-Count">Game {currentGame}/{dateMap.size}</h2>
              <Button class="Switch-Game" type="switch" value=">" onClick={switchGame}>{">"}</Button>
            </div>
            <h2>{location}</h2>
            <h2>{distance}{distanceUnit}</h2>
            <h2>{bow}</h2>
            <Button onClick={toggleNote}>Note</Button>
          </div>
          <ScoringChart score={JSON.parse(score)} arrowsPerEnd={arrowsPerEnd} splits={splits} history={true} />
          <FinalScoreStats score={JSON.parse(score)} history={true} />
        </div>
      ) : null}
      {noteOpen ? (
        <div className="Popup-Overlay">
          <div className="Popup">
            <h1>Note</h1>
            <hr />
            <pre className="Note">{note}</pre>
            <Button onClick={toggleNote}>Close</Button>
          </div>
        </div>
      ) : null}
      {!user ? <Button class='Account-Button' onClick={googleSignIn}>Sign In</Button> : null}
      {user && !score ? <h2>no saved scores!</h2> : null}
    </>
  );
};

export default History;
