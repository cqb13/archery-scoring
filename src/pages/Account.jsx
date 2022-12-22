import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Button from "../components/elements/Button";
import Profile from "../components/pageComponents/Profile";
import googleSignOut from "../utils/googleSignOut";
import googleSignIn from "../utils/googleSignIn";
import { collection, doc, getDoc } from "firebase/firestore";

const Account = () => {
  const [highScore, setHighScore] = useState(0);
  const [lowScore, setLowScore] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [user] = useAuthState(auth);

  const getUserDoc = async () => {
    const users = collection(db, "users");
    const userRef = doc(users, user.uid);
    const docSnap = await getDoc(userRef);
    return docSnap.data()
  };

  if (user) {
    getUserDoc().then((res) => {
      setHighScore(res.highScore);
      setLowScore(res.lowScore);
      setGamesPlayed(res.allScores.length);
      setAverageScore(res.allScores.reduce((a, b) => a + b, 0) / res.allScores.length);
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
            lowScore={lowScore}
            gamesPlayed={gamesPlayed}
            averageScore={averageScore}
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
