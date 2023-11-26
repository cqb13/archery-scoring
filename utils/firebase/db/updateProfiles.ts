import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@lib/firebase";

export default async function updateProfiles(user: any, profiles: any[]) {
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    await updateDoc(userRef, { profiles: profiles });
  }
}
