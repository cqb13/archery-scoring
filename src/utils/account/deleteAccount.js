import { collection, doc, getDocs, deleteDoc, query } from "firebase/firestore";
import googleSignOut from "./googleSignOut";
import { db } from "../../firebase";

const deleteAccount = async (toggleDelete, user) => {
  const users = collection(db, "users");
  const userRef = doc(users, user.uid);
  const scoreCollection = collection(users, user.uid, "scores");
  let ids = [];
  const scoreQuery = query(scoreCollection);

  const scoreQuerySnapshot = await getDocs(scoreQuery);
  scoreQuerySnapshot.forEach((doc) => {
    ids.push(doc.id);
  });

  ids.forEach(async (id) => {
    await deleteDoc(doc(scoreCollection, id));
  });

  deleteDoc(userRef);
  googleSignOut();
  toggleDelete();
};

export default deleteAccount;
