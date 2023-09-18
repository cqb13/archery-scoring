"use client";

import updateDisplayName from "@/utils/firebase/db/updateDisplayName";
import ConfirmPopup from "@/components/misc/confirmPopup";
import NotificationPopup from "@/components/general/notificationPopup";
import updateProfileType from "@/utils/firebase/db/updateProfileType";
import deleteAccount from "@/utils/firebase/account/deleteAccount";
import googleSignOut from "@/utils/firebase/account/googleSignOut";
import countTotalSplits from "@/utils/score/countTotalSplits";
import getAverageScore from "@/utils/score/getAverageScore";
import getUserDoc from "@/utils/firebase/db/getUserDoc";
import { useAuthContext } from "@context/authContext";
import Dropdown from "@/components/general/dropdown";
import StatBox from "@/components/account/statBox";
import Button from "@/components/general/button";
import Input from "@/components/general/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db, auth } from "@lib/firebase";
import Image from "next/image";
import { set } from "firebase/database";

export default function History() {
  // general
  const [signedIn, setSignedIn] = useState(false);
  const [userDoc, setUserDoc] = useState({} as any);
  const { user } = useAuthContext() as { user: any };
  const router = useRouter();

  // popup
  const [deletePopup, setDeletePopup] = useState(false);

  const [notification, setNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(
    {} as "success" | "error"
  );
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  // stats
  const [averageScore, setAverageScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lowScore, setLowScore] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [totalSplits, setTotalSplits] = useState(0);

  // account
  const [name, setName] = useState("");
  const [namePlaceholder, setNamePlaceholder] = useState("");
  const [profileType, setProfileType] = useState("Private");

  useEffect(() => {
    if (!user) return;
    auth.onAuthStateChanged((user) => {
      if (user) {
        setSignedIn(true);
      } else {
        router.push("/");
      }
    });

    getUserDoc(auth.currentUser).then((doc: any) => {
      setUserDoc(doc);
      setNamePlaceholder(doc.displayName);
      setProfileType(doc.profileType);
      setAverageScore(getAverageScore(doc.allScores));
      setTotalSplits(countTotalSplits(doc.allScores));
      setTotalGames(doc.allScores.length);
      setHighScore(doc.highScore);
      setLowScore(doc.lowScore);
    });
  }, [user]);

  const [currentWindow, setCurrentWindow] = useState("stats");

  const updateCurrentWindow = (window: string) => {
    setCurrentWindow(window);
  };

  const updateName = () => {
    updateDisplayName(auth.currentUser, name);
    setName("");
  };

  const changeProfileType = (type: string) => {
    setProfileType(type);
    updateProfileType(auth.currentUser, type);
  };

  const deleteAction = () => {
    setDeletePopup(true);
  };

  const confirmDelete = async () => {
    await deleteAccount(auth.currentUser);
    router.push("/");
  };

  const cancelDelete = () => {
    setDeletePopup(false);
  };

  return (
    <main className='flex flex-col items-center m-auto pt-4 text-black p-24 w-4/5 max-lgLg:w-11/12 max-lgSm:w-full max-lgSm:p-10 max-smSm:p-5 max-xs:p-2'>
      <div className='flex gap-2 w-full mb-2'>
        <Button
          title='Stats'
          onClick={() => updateCurrentWindow("stats")}
          selected={currentWindow == "stats" ? true : false}
        />
        <Button
          title='Social'
          onClick={() => updateCurrentWindow("social")}
          selected={currentWindow == "social" ? true : false}
        />
        <Button
          title='Account'
          onClick={() => updateCurrentWindow("account")}
          selected={currentWindow == "account" ? true : false}
        />
      </div>
      {user ? (
        <>
          {currentWindow == "stats" ? (
            <section className='flex flex-wrap justify-center gap-2'>
              <StatBox name='Average Score' value={averageScore} />
              <StatBox name='High Score' value={highScore} />
              <StatBox name='Low Score' value={lowScore} />
              <StatBox name='Total Games' value={totalGames} />
              <StatBox name='Total Splits' value={totalSplits} />
            </section>
          ) : null}
          {currentWindow == "social" ? (
            <h1>Ill get around to this at some point</h1>
          ) : null}
          {currentWindow == "account" ? (
            <section className='shadow-card p-10 border border-gray-300 rounded-md flex gap-2 w-full max-mdLg:flex-col max-mdLg:items-center'>
              <Image
                src={userDoc?.photoURL.replaceAll("s96-c", "s500-c")}
                alt='use pfp'
                className='rounded-2xl'
                width={300}
                height={300}
              />
              <div className='flex gap-2 w-full max-smSm:flex-col'>
                <div className='flex flex-col py-4 gap-2 w-full'>
                  <Input
                    value={name}
                    placeholder={`username: ${namePlaceholder}`}
                    type='text'
                    updateValue={setName}
                  />
                  <Button title='Update Name' onClick={updateName} />
                  <div className='flex flex-col items-center justify-center'>
                    <p>Social Profile</p>
                    <Dropdown
                      title={profileType}
                      items={["Private", "Public", "Email Only"]}
                      setSelected={changeProfileType}
                    />
                  </div>
                </div>
                <div className='flex flex-col-reverse py-4 gap-2 w-full'>
                  <Button title='Sign Out' onClick={() => googleSignOut()} />
                  <Button title='Delete Account' onClick={deleteAction} />
                </div>
              </div>
            </section>
          ) : null}
        </>
      ) : (
        <h1 className=' animate-pulse border-gray-300 p-10 rounded-md shadow-card'>
          Authenticating User
        </h1>
      )}
      {deletePopup ? (
        <ConfirmPopup
          title='Delete Game'
          message='Are you sure you want to delete your account?'
          expectedValue={"DELETE ACCOUNT"}
          confirm={confirmDelete}
          cancel={cancelDelete}
          setNotification={setNotification}
          setNotificationType={setNotificationType}
          setNotificationTitle={setNotificationTitle}
          setNotificationMessage={setNotificationMessage}
        />
      ) : null}
      {notification ? (
        <NotificationPopup
          title={notificationTitle}
          message={notificationMessage}
          type={notificationType}
          timeout={5000}
          updateNotification={setNotification}
        />
      ) : null}
    </main>
  );
}
