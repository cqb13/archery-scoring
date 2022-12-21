import { collection, addDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const SaveToDB = async (user, score, data) => {
  const { location, distance, distanceUnit, ends, arrowsPerEnd, sessions, bow } = data;

  const encodedScore = JSON.stringify(score);

  const usersCollection = collection(db, "users");

  const userDoc = doc(usersCollection, user.uid);

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
    createdAt: serverTimestamp()
  });
};

export default SaveToDB;
