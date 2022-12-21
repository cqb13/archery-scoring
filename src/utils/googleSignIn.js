import { collection, getDoc, setDoc, doc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase";

const users = collection(db, "users");

const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const userRef = doc(users, user.uid);
  const userDoc = await getDoc(userRef);
  if (!userDoc.exists()) {
    await setDoc(userRef, {
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email
    });
  }
};

export default googleSignIn;
