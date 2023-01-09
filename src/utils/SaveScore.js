import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const SaveToDB = async (user, score, data, totalScore, name, note, createdAt) => {
  const { location, distance, distanceUnit, ends, arrowsPerEnd, sessions, bow } = data;

  const encodedScore = JSON.stringify(score);
  const usersCollection = collection(db, "users");
  const userDoc = doc(usersCollection, user.uid);

  const userDocRef = await getDoc(userDoc);
  const highScore = userDocRef.data().highScore;
  const allScores = userDocRef.data().allScores;
  const lowScore = userDocRef.data().lowScore;

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
    distanceUnit: distanceUnit || "Unknown", 
    location: location || "Unknown",
    arrowsPerEnd: arrowsPerEnd,
    totalScore: totalScore,
    bow: bow || "Unknown",
    score: encodedScore,
    sessions: sessions,
    distance: distance,
    name: name || "",
    note: note || "",
    date: createdAt,
    ends: ends
  });
};

export default SaveToDB;
