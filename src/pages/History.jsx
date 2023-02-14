import { getDoc, doc, getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import FinalScoreStats from "../components/pageComponents/FinalScoreStats";
import ScoringChart from "../components/pageComponents/ScoringChart";
import mergeDateTimeToValue from "../utils/mergeDateTimeToValue";
import DropdownMenu from "../components/elements/DropdownMenu";
import { useAuthState } from "react-firebase-hooks/auth";
import googleSignIn from "../utils/account/googleSignIn";
import removeGame from "../utils/score/removeGame";
import React, { useState, useEffect } from "react";
import Button from "../components/elements/Button";
import sortDateTime from "../utils/sortDateTime";
import Popup from "../components/elements/Popup";
import isMobile from "../utils/isMobile";
import { auth, db } from "../firebase";

const History = () => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [distanceUnit, setDistanceUnit] = useState();
  const [arrowsPerEnd, setArrowsPerEnd] = useState();
  const [dateMap, setDateMap] = useState(new Map());
  const [currentGame, setCurrentGame] = useState(1);
  const [noteOpen, setNoteOpen] = useState(false);
  const [totalScore, setTotalScore] = useState();
  const [distance, setDistance] = useState();
  const [location, setLocation] = useState();
  const [splits, setSplits] = useState();
  const [score, setScore] = useState();
  const [note, setNote] = useState();
  const [user] = useAuthState(auth);
  const [bow, setBow] = useState();
  const mobile = isMobile();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const scoreCollection = collection(db, "users", user.uid, "scores");
        const scoreQuery = query(
          scoreCollection,
          orderBy("date", "desc"),
          limit(scoreCollection.length)
        );
        const scoreQuerySnapshot = await getDocs(scoreQuery);
        scoreQuerySnapshot.forEach((doc) => {
          const date = new Date(doc.data().date).toLocaleDateString();
          const time = new Date(doc.data().date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          });
          const name = doc.data().name;

          if (name) dateMap.set(date + " " + time + " | " + name, doc.id);
          else dateMap.set(date + " " + time, doc.id);
        });

        const sortedDates = sortDateTime(dateMap.keys());
        
        const sortedMap = mergeDateTimeToValue(sortedDates, dateMap);

        setDateMap(sortedMap);

        getScoreDoc(sortedMap.values().next().value);
        setCurrentGame(dateMap.size);
      }
    };
    fetchData();
  }, [user]);

  const getScoreDoc = async (id) => {
    const scoreDoc = doc(db, "users", user.uid, "scores", id);
    const scoreSnap = await getDoc(scoreDoc);
    if (scoreSnap.exists()) {
      setArrowsPerEnd(scoreSnap.data().arrowsPerEnd);
      setDistanceUnit(scoreSnap.data().distanceUnit);
      setTotalScore(scoreSnap.data().totalScore);
      setLocation(scoreSnap.data().location);
      setDistance(scoreSnap.data().distance);
      setSplits(scoreSnap.data().sessions);
      setScore(scoreSnap.data().score);
      setNote(scoreSnap.data().note);
      setBow(scoreSnap.data().bow);
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

  const toggleDelete = () => {
    setDeleteOpen(!deleteOpen);
  };

  const deleteGame = async () => {
    let reverseDates = Array.from(dateMap.keys()).slice().reverse();
    const scoreDoc = doc(db, "users", user.uid, "scores", dateMap.get(reverseDates[currentGame - 1]));
    const userDoc = doc(db, "users", user.uid);
    const userData = await getDoc(userDoc);

    await removeGame({scoreDoc, userDoc, userData, totalScore})

    dateMap.delete(reverseDates[currentGame - 1]);
    setCurrentGame(dateMap.size);
    changeGame(dateMap.keys().next().value);
    toggleDelete();
  };

  return (
    <div className="History">
      {score ? (
        <div>
          <div className={mobile ? "Vertical-Button-Container" : "Horizontal-Container"}>
            <DropdownMenu options={Array.from(dateMap.keys())} setGame={setCurrentGame} changeGame={changeGame} currentGame={currentGame} />
            <div className="Horizontal-Container Switch-Game">
              <Button type="switch" value="<" onClick={switchGame}>{"<"}</Button>
              <h2 className="Game-Count">Game {currentGame}/{dateMap.size}</h2>
              <Button type="switch" value=">" onClick={switchGame}>{">"}</Button>
            </div>
          </div>
          <section className={mobile ? "Vertical-Container" : "Special"}>
            <h2 className="test">{location} {distance}{distanceUnit} {bow}</h2>
            <div className="Horizontal-Container">
              <Button class="Small-Button" onClick={toggleNote}>Note</Button>
              <Button class="Warning-Text Small-Button" onClick={toggleDelete}>X</Button>
            </div>
          </section>
          <ScoringChart score={JSON.parse(score)} arrowsPerEnd={arrowsPerEnd} splits={splits} history={true} />
          <FinalScoreStats score={JSON.parse(score)} history={true} />
        </div>
      ) : null}
      {deleteOpen ? (
        <Popup 
          title="Delete Game?" 
          message={`Are you sure you want to delete this game?\nThis action cannot be undone!`} 
          messageClass="Warning-Text"
          confirmButtonValue={"Yes"}
          confirmButtonFunction={deleteGame}
          confirmButtonClass="Delete-Button"
          cancelButtonValue={"No"}
          cancelButtonFunction={toggleDelete}
          cancelButtonClass="Delete-Button"
          >
        </Popup>
      ) : null}
      {noteOpen ? (
        <Popup 
          title="Note" 
          confirmButtonValue={"Close"}
          confirmButtonFunction={toggleNote}
          confirmButtonClass=""
          >
          <pre className="Note">{note}</pre>
        </Popup>
      ) : null}
      {!user ? <Button class='Account-Button Sign-In' onClick={googleSignIn}>Sign In</Button> : null}
      {user && !score ? <h2>no saved scores!</h2> : null}
    </div>
  );
};

export default History;
