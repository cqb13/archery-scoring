import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import addScoreArrayValues from "./addScoreArrayValues";
import sortScores from "./sortScores";
import { db } from "../../firebase";

const SaveToDB = async ( user, score, data, totalScore, name, note, createdAt ) => { 
  
  const { location, distance, distanceUnit, ends, arrowsPerEnd, sessions, bow } = data;

  const sortedScore = await sortScores(score);

  const encodedScore = JSON.stringify(sortedScore);
  const usersCollection = collection(db, "users");
  const userDoc = doc(usersCollection, user.uid);

  const userDocRef = await getDoc(userDoc);
  const highScore = userDocRef.data().highScore;
  const allScores = userDocRef.data().allScores;
  const lowScore = userDocRef.data().lowScore;

  const splitScoreArrayValues = addScoreArrayValues(score);
  const encodedSplitScoreArrayValues = JSON.stringify(splitScoreArrayValues);

  if (allScores) {
    let newAllScores = [...allScores, encodedSplitScoreArrayValues];
    await setDoc(
      userDoc,
      {
        allScores: newAllScores
      },
      { merge: true }
    );
  } else {
    await setDoc(
      userDoc,
      {
        allScores: [totalScore]
      },
      { merge: true }
    );
  }

  splitScoreArrayValues.sort((a, b) => a - b);
  const lowestValue = splitScoreArrayValues[0];
  const highestValue = splitScoreArrayValues[splitScoreArrayValues.length - 1];

  if (highestValue > highScore) {
    await setDoc(
      userDoc,
      {
        highScore: highestValue
      },
      { merge: true }
    );
  }

  if (lowestValue < lowScore && lowScore !== 0) {
    await setDoc(
      userDoc,
      {
        lowScore: lowestValue
      },
      { merge: true }
    );
  } else if (lowScore === 0) {
    await setDoc(
      userDoc,
      {
        lowScore: lowestValue
      },
      { merge: true }
    );
  }

  const scoreCollection = collection(userDoc, "scores");

  await addDoc(scoreCollection, {
    totalScore: encodedSplitScoreArrayValues,
    distanceUnit: distanceUnit || "Unknown",
    location: location || "Unknown",
    arrowsPerEnd: arrowsPerEnd,
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
