import { collection, getDoc, doc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import setupAccount from "./setupAccount";
import { auth, db } from "@lib/firebase";

const users = collection(db, "users");

export default async function googleSignIn() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const userRef = doc(users, user.uid);
  const userDoc = await getDoc(userRef);
  if (!userDoc.exists()) {
    await setupAccount(user, userRef);
  }
}
