import countTotalSplits from "../utils/score/countTotalSplits";
import getAverageScore from "../utils/score/getAverageScore";
import deleteAccount from "../utils/account/deleteAccount";
import googleSignOut from "../utils/account/googleSignOut";
import googleSignIn from "../utils/account/googleSignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import getUserDoc from "../utils/account/getUserDoc";
import Button from "../components/elements/Button";
import Popup from "../components/elements/Popup";
import Stat from "../components/elements/Stat";
import isMobile from "../utils/isMobile";
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
  const mobile = isMobile();

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
      {user ? (
        <div>
          <h1 class='Welcome'>{"Welcome " + user.displayName}</h1>
          <div className='Colored-Container Vertical-Container'>
            <h2 className='Container-Title'>Stats</h2>
            <div className={mobile ? 'Vertical-Container' : 'Stats-Container'}>
              <Stat title='High Score' stat={highScore}></Stat>
              <Stat title='Low Score' stat={lowScore}></Stat>
              <Stat title='Average Score' stat={averageScore}></Stat>
              <Stat title='Games Played' stat={gamesPlayed}></Stat>
              <Stat title='Total Splits' stat={totalSplits}></Stat>
            </div>
          </div>
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
        <Button class='Account-Button Sign-In' onClick={googleSignIn}>
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
