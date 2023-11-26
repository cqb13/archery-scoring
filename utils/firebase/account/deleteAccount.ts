import { collection, doc, getDocs, deleteDoc, query } from "firebase/firestore";
import googleSignOut from "./googleSignOut";
import { db } from "@lib/firebase";

export default async function deleteAccount(user: any) {
  const users = collection(db, "users");
  const userRef = doc(users, user.uid);
  const scoreCollection = collection(users, user.uid, "scores");
  let ids: any = [];
  const scoreQuery = query(scoreCollection);

  const scoreQuerySnapshot = await getDocs(scoreQuery);
  scoreQuerySnapshot.forEach((doc) => {
    ids.push(doc.id);
  });

  ids.forEach(async (id: any) => {
    await deleteDoc(doc(scoreCollection, id));
  });

  await deleteDoc(userRef);
  googleSignOut();
}
