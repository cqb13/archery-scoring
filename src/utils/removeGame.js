import { deleteDoc, setDoc } from "firebase/firestore";

const removeGame = async ({ scoreDoc, userDoc, userData, totalScore }) => {
  const allScores = userData.data().allScores;
  const lowScore = userData.data().lowScore;
  const highScore = userData.data().highScore;

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
};

export default removeGame;
