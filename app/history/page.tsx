"use client";

import getAllSessions from "@/utils/score/getAllSessions";
import FinalScoringStats from "@/components/scoring/finalScoringStats";
import deleteSession from "@/utils/firebase/db/deleteSession";
import ConfirmPopup from "@/components/misc/confirmPopup";
import ScoringChart from "@/components/scoring/scoringChart";
import { useAuthContext } from "@context/authContext";
import Dropdown from "@/components/general/dropdown";
import { doc, getDoc } from "firebase/firestore";
import Button from "@/components/general/button";
import { useEffect, useState } from "react";
import { auth, db } from "@lib/firebase";

export default function History() {
  const [currentGame, setCurrentGame] = useState(1);
  const [currentGameName, setCurrentGameName] = useState("");
  const [gameNameList, setGameNameList] = useState([] as string[]);
  const [dateMap, setDateMap] = useState(new Map());
  const { user } = useAuthContext() as { user: any };

  // popup
  const [deletePopup, setDeletePopup] = useState(false);

  // session info
  const [arrowsPerEnd, setArrowsPerEnd] = useState(0);
  const [distanceUnit, setDistanceUnit] = useState("m");
  const [totalScore, setTotalScore] = useState(0);
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState(0);
  const [splits, setSplits] = useState(0);
  const [score, setScore] = useState({} as any);
  const [note, setNote] = useState("");
  const [bow, setBow] = useState("");

  useEffect(() => {
    if (!user) return;
    setupHistory();
  }, [user]);

  const setupHistory = async () => {
    let { sortedMap, dateMap } = await getAllSessions(auth.currentUser);

    setDateMap(dateMap);
    setCurrentGame(dateMap.size);
    setCurrentGameName(sortedMap.keys().next().value);

    let listOfGames = Array.from(sortedMap.keys());
    setGameNameList(listOfGames);

    getScoreDoc(sortedMap.values().next().value);
  };

  const getScoreDoc = async (id: string) => {
    if (!auth.currentUser) return;
    const scoreDoc = doc(db, "users", auth.currentUser.uid, "scores", id);
    const scoreSnap = await getDoc(scoreDoc);
    if (scoreSnap.exists()) {
      setArrowsPerEnd(scoreSnap.data().arrowsPerEnd);
      setDistanceUnit(scoreSnap.data().distanceUnit);
      setTotalScore(scoreSnap.data().totalScore);
      setLocation(scoreSnap.data().location);
      setDistance(scoreSnap.data().distance);
      let jsonScore = JSON.parse(scoreSnap.data().score);
      setSplits(jsonScore.length);
      setScore(jsonScore);
      setNote(scoreSnap.data().note);
      setBow(scoreSnap.data().bow);
    }
  };

  //!!! dropdown name not updating
  const changeGame = (date: string) => {
    setCurrentGameName(date);
    let reverseGameNameList = gameNameList.slice().reverse();
    setCurrentGame(reverseGameNameList.indexOf(date) + 1);
    getScoreDoc(dateMap.get(date));
  };

  const switchGame = (direction: string) => {
    let reverseDates = Array.from(dateMap.keys()).slice().reverse();
    if (direction === "back") {
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

  const deleteAction = () => {
    setDeletePopup(true);
  };

  const confirmDelete = async () => {
    let reverseDates = Array.from(dateMap.keys()).slice().reverse();
    const scoreDoc = doc(
      db,
      "users",
      user.uid,
      "scores",
      dateMap.get(reverseDates[currentGame - 1])
    );
    const userDoc = doc(db, "users", user.uid);
    const userData = await getDoc(userDoc);

    await deleteSession({ scoreDoc, userDoc, userData, totalScore });

    dateMap.delete(reverseDates[currentGame - 1]);
    setCurrentGame(dateMap.size);
    setGameNameList(Array.from(dateMap.keys()));
    changeGame(dateMap.keys().next().value);
    setDeletePopup(false);
  };

  const cancelDelete = () => {
    setDeletePopup(false);
  };

  const extractName = (name: string) => {
    let splitName = name.split(" | ");
    if (splitName.length === 1) return "fuck this should not happen";
    return splitName[1];
  };

  return (
    <main className='flex flex-col gap-2 items-center justify-center pt-4 text-black'>
      {user ? (
        <>
          <section className='flex gap-2 w-full items-center justify-center max-smSm:flex-col'>
            <Dropdown
              title={currentGameName}
              items={gameNameList}
              customClass=' w-full'
              setSelected={changeGame}
            />
            <div className='flex items-center justify-center gap-2'>
              <Button title='Back' onClick={() => switchGame("back")} />
              <h2 className='whitespace-nowrap'>{`Game ${currentGame}/${gameNameList.length}`}</h2>
              <Button title='Next' onClick={() => switchGame("next")} />
            </div>
          </section>
          <section className='flex gap-2 items-center justify-center'>
            <h2 className='whitespace-nowrap'>
              {`${location} ${distance}${distanceUnit} ${bow}`}
            </h2>
            <Button title='Note' onClick={() => {}} />
            <Button title='Delete' onClick={deleteAction} />
          </section>
          {score.length > 0 ? (
            <section className='flex flex-col gap-2'>
              <ScoringChart
                arrowsPerEnd={arrowsPerEnd}
                history={true}
                splits={splits}
                done={false}
                score={score}
              />
              <FinalScoringStats score={score} />
            </section>
          ) : null}
        </>
      ) : (
        <h1 className=' animate-pulse border-gray-300 p-10 rounded-md shadow-card'>
          Authenticating User
        </h1>
      )}
      {deletePopup ? (
        <ConfirmPopup
          title='Delete Game'
          message='Are you sure you want to delete this game?'
          expectedValue={extractName(currentGameName)}
          confirm={confirmDelete}
          cancel={cancelDelete}
        />
      ) : null}
    </main>
  );
}
