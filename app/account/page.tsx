"use client";

import { useState, useEffect } from "react";
import { useAuthContext } from "@context/authContext";
import Button from "@/components/general/button";
import { db, auth } from "@lib/firebase";
import Image from "next/image";
import getUserDoc from "@/utils/firebase/db/getUserDoc";
import Input from "@/components/general/input";
import Dropdown from "@/components/general/dropdown";

export default function History() {
  const [signedIn, setSignedIn] = useState(false);
  const [userDoc, setUserDoc] = useState({} as any);
  const { user } = useAuthContext() as { user: any };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }
    });

    getUserDoc(auth.currentUser).then((doc: any) => {
      setUserDoc(doc);
    });
  }, [user]);

  const [currentWindow, setCurrentWindow] = useState("stats");

  const updateCurrentWindow = (window: string) => {
    setCurrentWindow(window);
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
      {currentWindow == "stats" ? <h1>Stats</h1> : null}
      {currentWindow == "social" ? <h1>Social</h1> : null}
      {currentWindow == "account" ? (
        <section className='shadow-card p-10 border border-gray-300 rounded-md flex gap-2 w-full max-mdLg:flex-col max-mdLg:items-center'>
          <Image
            src={userDoc?.photoURL.replaceAll("s96-c", "s500-c")}
            alt='use pfp'
            className='rounded-2xl'
            width={300}
            height={300}
          />
          <div className="flex gap-2 w-full max-smSm:flex-col">
            <div className='flex flex-col py-4 gap-2 w-full'>
              <p>Display Name</p>
              <Input
                value='name'
                placeholder='current name'
                type='text'
                updateValue={() => {}}
              />
              <Button title='Update Name' onClick={() => {}} />
              <div className='flex items-center justify-center'>
                <Dropdown
                  title='Profile Type'
                  items={["Private", "Public", "Email Only"]}
                  setSelected={() => {}}
                />
              </div>
            </div>
            <div className='flex flex-col-reverse py-4 gap-2 w-full'>
              <Button title='Sign Out' onClick={() => {}} />
              <Button title='Delete Account' onClick={() => {}} />
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
