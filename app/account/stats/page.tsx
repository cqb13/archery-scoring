"use client";

import countTotalSplits from "@/utils/score/countTotalSplits";
import getAverageScore from "@/utils/score/getAverageScore";
import StatDisplay from "@/components/account/statDisplay";
import getUserDoc from "@/utils/firebase/db/getUserDoc";
import { useAuthContext } from "@context/authContext";
import { useState, useEffect } from "react";
import { auth } from "@lib/firebase";

export default function Stats() {
  const { user } = useAuthContext() as { user: any };

  const [averageScore, setAverageScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lowScore, setLowScore] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [totalSplits, setTotalSplits] = useState(0);

  useEffect(() => {
    getUserDoc(auth.currentUser).then((doc: any) => {
      setAverageScore(getAverageScore(doc.allScores));
      setTotalSplits(countTotalSplits(doc.allScores));
      setTotalGames(doc.allScores.length);
      setHighScore(doc.highScore);
      setLowScore(doc.lowScore);
    });
  }, [user]);

  return (
    <section className='flex flex-col gap-2'>
      <StatDisplay
        name="General Stats"
        averageScore={averageScore}
        highScore={highScore}
        lowScore={lowScore}
        totalGames={totalGames}
        totalSplits={totalSplits}
      />
    </section>
  );
}
