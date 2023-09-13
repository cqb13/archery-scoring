"use client"

import { useState, useEffect } from 'react';
import { useAuthContext } from "@context/authContext";
import Button from '@/components/general/button';
import { db, auth } from '@lib/firebase';

export default function History() {
    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setSignedIn(true);
            } else {
                setSignedIn(false);
            }
        });
    }, []);

    const [currentWindow, setCurrentWindow] = useState('stats');

    const updateCurrentWindow = (window: string) => {
        setCurrentWindow(window);
    }

    return (
      <main className="flex items-center justify-center pt-4 text-black p-24">
        <div className='flex gap-2 w-full'>
            <Button title='Stats' onClick={() => updateCurrentWindow("stats")} selected={currentWindow == "stats" ? true : false}/>
            <Button title='Social' onClick={() => updateCurrentWindow("social")} selected={currentWindow == "social" ? true : false}/>
            <Button title='Account' onClick={() => updateCurrentWindow("account")} selected={currentWindow == "account" ? true : false}/>
        </div>
        
      </main>
    )
  }
  