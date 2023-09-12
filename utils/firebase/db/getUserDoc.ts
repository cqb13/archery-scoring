import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@lib/firebase";

export default async function getUserDoc(user: any) {
  const users = collection(db, "users");
  const userRef = doc(users, user.uid);
  const docSnap = await getDoc(userRef);
  return docSnap.data();
}
