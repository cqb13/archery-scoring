"use client";

import { useEffect, useState } from "react";
import getAllSessions from "@/utils/score/getAllSessions";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@lib/firebase";

export default function History() {
  const [currentGame, setCurrentGame] = useState(1);
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
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>Some Stuff</h1>
    </main>
  );
}
