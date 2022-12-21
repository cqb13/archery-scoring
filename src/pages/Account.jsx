import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Button from "../components/elements/Button";
import Profile from "../components/pageComponents/Profile";
import googleSignOut from "../utils/googleSignOut";
import googleSignIn from "../utils/googleSignIn";
import {
  collection,
  doc,
  getDoc
} from "firebase/firestore";

const Account = () => {
  const [highScore, setHighScore] = useState(0);
  const [user] = useAuthState(auth);

  const users = collection(db, "users");
  const userRef = doc(users, user.uid);
  const getUserDoc = async () => {
    const docSnap = await getDoc(userRef);
    return docSnap.data().highScore;
  };

  if (user) {
    getUserDoc().then((res) => {
      setHighScore(res);
    });
  }

  return (
    <div className="Account">
      <h1>Account</h1>
      <hr />
      {user ? (
        <div>
          <Profile
            name={user.displayName}
            pfp={user.photoURL}
            highScore={highScore}
          />
          <Button class="Account-Button" onClick={googleSignOut}>
            Sign Out
          </Button>
        </div>
      ) : (
        <Button class="Account-Button" onClick={googleSignIn}>
          Sign In
        </Button>
      )}
    </div>
  );
};

export default Account;
