import { collection, doc, getDoc } from "firebase/firestore";
import Profile from "../components/pageComponents/Profile";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "../components/elements/Button";
import googleSignOut from "../utils/account/googleSignOut";
import googleSignIn from "../utils/account/googleSignIn";
import deleteAccount from "../utils/account/deleteAccount";
import React, { useState } from "react";
import { auth, db } from "../firebase";

const Account = () => {
  const [deleteAccountPopup, setDeleteAccountPopup] = useState(false);
  const [averageScore, setAverageScore] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lowScore, setLowScore] = useState(0);
  const [user] = useAuthState(auth);

  const getUserDoc = async () => {
    const users = collection(db, "users");
    const userRef = doc(users, user.uid);
    const docSnap = await getDoc(userRef);
    return docSnap.data();
  };

  if (user) {
    getUserDoc().then((res) => {
      setAverageScore(getAverageScore(res.allScores));
      setGamesPlayed(res.allScores.length);
      setHighScore(res.highScore);
      setLowScore(res.lowScore);
    });
  }

  const getAverageScore = (allScores) => {
    let average = allScores.reduce((a, b) => a + b, 0) / allScores.length;
    return Math.round((average + Number.EPSILON) * 100) / 100;
  };

  const toggleDelete = () => {
    setDeleteAccountPopup(!deleteAccountPopup)
  }

  return (
    <div className='Account'>
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
          <div className='Vertical-Button-Container'>
            <Button class='Account-Button' onClick={googleSignOut}>
              Sign Out
            </Button>
            <Button class='Delete-Account-Button' onClick={toggleDelete}>
              Delete Account
            </Button>
          </div>
        </div>
      ) : (
        <Button class='Account-Button' onClick={googleSignIn}>
          Sign In
        </Button>
      )}
      {deleteAccountPopup ? (
        <div className="Popup-Overlay">
          <div className="Popup">
            <h1>Delete Account</h1>
            <hr />
            <h2 className="Warning-Text" >Are you sure you want to delte this account?</h2>
            <h2 className="Warning-Text" >All your data will be lost!</h2>
            <h2 className="Warning-Text" >This action cannot be undone!</h2>
            <div className="Horizontal-Button-Container">
              <Button onClick={() => deleteAccount(toggleDelete, user)} class="Delete-Button" >Yes</Button>
              <Button onClick={toggleDelete} class="Delete-Button" >No</Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Account;
