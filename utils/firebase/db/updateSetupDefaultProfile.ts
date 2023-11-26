import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@lib/firebase";

export default async function updateSetupDefaultProfile(
  user: any,
  profileId: number
) {
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    await updateDoc(userRef, { setupDefaultProfile: profileId });
  }
}
