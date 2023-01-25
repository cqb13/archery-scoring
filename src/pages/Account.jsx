import countTotalSplits from "../utils/score/countTotalSplits";
import getAverageScore from "../utils/score/getAverageScore";
import deleteAccount from "../utils/account/deleteAccount";
import Profile from "../components/pageComponents/Profile";
import googleSignOut from "../utils/account/googleSignOut";
import googleSignIn from "../utils/account/googleSignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import getUserDoc from "../utils/account/getUserDoc";
import Button from "../components/elements/Button";
import Popup from "../components/elements/Popup";
import React, { useState } from "react";
import { auth } from "../firebase";

const Account = () => {
  const [deleteAccountPopup, setDeleteAccountPopup] = useState(false);
  const [averageScore, setAverageScore] = useState(0);
  const [totalSplits, setTotalSplits] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lowScore, setLowScore] = useState(0);
  const [user] = useAuthState(auth);

  if (user) {
    getUserDoc(user).then((res) => {
      setAverageScore(getAverageScore(res.allScores));
      setTotalSplits(countTotalSplits(res.allScores));
      setGamesPlayed(res.allScores.length);
      setHighScore(res.highScore);
      setLowScore(res.lowScore);
    });
  }

  const toggleDelete = () => {
    setDeleteAccountPopup(!deleteAccountPopup);
  };

  const confirmDelete = () => {
    deleteAccount(user);
    toggleDelete();
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
            totalSplits={totalSplits}
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
        <Popup 
          title="Delete Account?" 
          message={`Are you sure you want to delete this account?\nAll your data will be lost!\nThis action cannot be undone!`} 
          messageClass="Warning-Text"
          confirmButtonValue={"Yes"}
          confirmButtonFunction={confirmDelete}
          confirmButtonClass="Delete-Button"
          cancelButtonValue={"No"}
          cancelButtonFunction={toggleDelete}
          cancelButtonClass="Delete-Button"
          >
        </Popup>
      ) : null}
    </div>
  );
};

export default Account;
