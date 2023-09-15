import { deleteDoc, setDoc } from "firebase/firestore";

export default async function deleteGame({
  scoreDoc,
  userDoc,
  userData,
  totalScore
}: {
  scoreDoc: any;
  userDoc: any;
  userData: any;
  totalScore: any;
}) {
  const allScores = userData.data().allScores;
  const highScore = userData.data().highScore;
  const lowScore = userData.data().lowScore;

  // removes score from all scores list
  const index = allScores.indexOf(totalScore);
  if (index > -1) {
    allScores.splice(index, 1);
  }

  await setDoc(
    userDoc,
    {
      allScores: allScores
    },
    { merge: true }
  );

  //updates base stats
  if (lowScore === totalScore) {
    const newLowScore = Math.min(...allScores);
    await setDoc(
      userDoc,
      {
        lowScore: newLowScore
      },
      { merge: true }
    );
  }

  if (highScore === totalScore) {
    let newHighScore = Math.max(...allScores);
    await setDoc(
      userDoc,
      {
        highScore: newHighScore
      },
      { merge: true }
    );
  }

  if (allScores.length === 0) {
    await setDoc(
      userDoc,
      {
        lowScore: 0,
        highScore: 0
      },
      { merge: true }
    );
  }

  await deleteDoc(scoreDoc);
}
