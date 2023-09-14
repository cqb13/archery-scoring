"use client";

import { useState, useEffect } from "react";
import { useAuthContext } from "@context/authContext";
import Button from "@/components/general/button";
import { db, auth } from "@lib/firebase";
import Image from "next/image";
import getUserDoc from "@/utils/firebase/db/getUserDoc";
import Input from "@/components/general/input";
import Dropdown from "@/components/general/dropdown";
import updateDisplayName from "@/utils/firebase/db/updateDisplayName";
import updateProfileType from "@/utils/firebase/db/updateProfileType";
import deleteAccount from "@/utils/firebase/account/deleteAccount";
import googleSignOut from "@/utils/firebase/account/googleSignOut";
import { useRouter } from "next/navigation";
import getAverageScore from "@/utils/score/getAverageScore";
import countTotalSplits from "@/utils/score/countTotalSplits";
import StatBox from "@/components/account/statBox";

export default function History() {
  // general
  const [signedIn, setSignedIn] = useState(false);
  const [userDoc, setUserDoc] = useState({} as any);
  const { user } = useAuthContext() as { user: any };
  const router = useRouter();

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
  }, []);

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
      {currentWindow == "stats" ? (
        <section className='flex flex-wrap justify-center gap-2'>
          <StatBox name='Average Score' value={averageScore} />
          <StatBox name='High Score' value={highScore} />
          <StatBox name='Low Score' value={lowScore} />
          <StatBox name='Total Games' value={totalGames} />
          <StatBox name='Total Splits' value={totalSplits} />
        </section>
      ) : null}
      {currentWindow == "social" ? <h1>Ill get around to this at some point</h1> : null}
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
              <Button title='Delete Account' onClick={() => {}} />
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
