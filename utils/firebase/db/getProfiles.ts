import { doc, getDoc } from "firebase/firestore";
import { db } from "@lib/firebase";

export default async function getProfiles(user: any) {
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data().profiles;
  }
}
