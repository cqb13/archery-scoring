import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const getUserDoc = async (user) => {
  const users = collection(db, "users");
  const userRef = doc(users, user.uid);
  const docSnap = await getDoc(userRef);
  return docSnap.data();
};

export default getUserDoc;
