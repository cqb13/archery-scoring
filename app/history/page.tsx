"use client";

import { useEffect, useState } from "react";
import getAllSessions from "@/utils/score/getAllSessions";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@lib/firebase";
import Dropdown from "@/components/general/dropdown";
import Button from "@/components/general/button";

export default function History() {
  const [currentGame, setCurrentGame] = useState(1);
  const [currentGameName, setCurrentGameName] = useState("");
  const [gameNameList, setGameNameList] = useState([] as string[]);
  const [dateMap, setDateMap] = useState(new Map());

  // session info
  const [arrowsPerEnd, setArrowsPerEnd] = useState(0);
  const [distanceUnit, setDistanceUnit] = useState("m");
  const [totalScore, setTotalScore] = useState(0);
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState(0);
  const [splits, setSplits] = useState([]);
  const [score, setScore] = useState(0);
  const [note, setNote] = useState("");
  const [bow, setBow] = useState("");

  useEffect(() => {
    getAllSessions(auth.currentUser).then(({ sortedMap, dateMap }) => {
      setDateMap(dateMap);
      setCurrentGame(dateMap.size);
      setCurrentGameName(sortedMap.keys().next().value);

      let listOfGames = Array.from(sortedMap.keys());
      setGameNameList(listOfGames);

      getScoreDoc(sortedMap.values().next().value);
    });
  }, []);

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
      setSplits(scoreSnap.data().sessions);
      setScore(scoreSnap.data().score);
      setNote(scoreSnap.data().note);
      setBow(scoreSnap.data().bow);
    }
  };

  const changeGame = (date: string) => {
    setScore(0); // !!!: does this need to be here???
    getScoreDoc(dateMap.get(date));
  };

  const switchGame = (event: any) => {
    let reverseDates = Array.from(dateMap.keys()).slice().reverse();
    if (event.target.value === "back") {
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

  return (
    <main className='flex flex-col gap-2 items-center justify-center pt-4 text-black'>
      <section className='flex gap-2 w-full items-center justify-center'>
        <Dropdown
          title={currentGameName}
          items={gameNameList}
          customClass=' w-full'
          setSelected={() => {}}
        />
        <div className='flex items-center justify-center gap-2'>
          <Button title='Back' onClick={switchGame} />
          <h2 className='whitespace-nowrap'>{`Game ${currentGame}/${gameNameList.length}`}</h2>
          <Button title='Next' onClick={switchGame} />
        </div>
      </section>
      <section className='flex gap-2'>
        <h2 className="whitespace-nowrap">
          {`${location} ${distance} ${distanceUnit} ${bow}`}
        </h2>
        <Button title='Note' onClick={() => {}} />
        <Button title='Delete' onClick={() => {}} />
      </section>
    </main>
  );
}
