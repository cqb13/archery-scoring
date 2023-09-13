import { doc, getDoc } from "firebase/firestore";
import { db } from "@lib/firebase";

export default async function getUserDoc(user: any) {
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);
  return docSnap.data();
}
