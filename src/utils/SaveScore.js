import { collection, addDoc, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const SaveToDB = async (user, score, data, totalScore) => {
  const { location, distance, distanceUnit, ends, arrowsPerEnd, sessions, bow } = data;

  const encodedScore = JSON.stringify(score);
  const usersCollection = collection(db, "users");
  const userDoc = doc(usersCollection, user.uid);

  const users = collection(db, "users");

  const userRef = doc(users, user.uid);
  const usersDoc = await getDoc(userRef);
  const highScore = usersDoc.data().highScore;
  const lowScore = usersDoc.data().lowScore;
  const allScores = usersDoc.data().allScores;

  if (allScores) {
    let newAllScores = [...allScores, totalScore];
    await setDoc(userDoc, {
      allScores: newAllScores
    }, { merge: true });
  } else {
    await setDoc(userDoc, {
      allScores: [totalScore]
    }, { merge: true });
  }

  if (totalScore > highScore) {
    await setDoc(userDoc, {
      highScore: totalScore
    }, { merge: true });
  }

  if (totalScore < lowScore && lowScore !== 0) {
    await setDoc(userDoc, {
      lowScore: totalScore
    }, { merge: true });
  } else if (lowScore === 0) {
    await setDoc(userDoc, {
      lowScore: totalScore
    }, { merge: true });
  }

  const scoreCollection = collection(userDoc, "scores");

  await addDoc(scoreCollection, {
    location: location,
    distance: distance,
    distanceUnit: distanceUnit,
    ends: ends,
    arrowsPerEnd: arrowsPerEnd,
    sessions: sessions,
    bow: bow,
    score: encodedScore,
    totalScore: totalScore,
    createdAt: serverTimestamp()
  });
};

export default SaveToDB;
