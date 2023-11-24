"use client";

import { useAuthContext } from "@context/authContext";
import Button from "@/components/general/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@lib/firebase";

export default function AccountLayout({ children }: { children: any }) {
  const [currentWindow, setCurrentWindow] = useState("account");
  const { user } = useAuthContext() as { user: any };
  const router = useRouter();

  const updateCurrentWindow = (window: string) => {
    if (window == currentWindow) return;
    setCurrentWindow(window);

    if (window == "stats") {
      router.push("/account/stats");
    } else if (window == "social") {
      router.push("/account/social");
    } else if (window == "account") {
      router.push("/account");
    }
  };

  useEffect(() => {
    if (!user) return;
    auth.onAuthStateChanged((user) => {
      if (user) {
        return;
      } else {
        router.push("/");
      }
    });
  }, [user]);

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
        <>{children}</>
      ) : (
        <h1 className=' animate-pulse border-gray-300 p-10 rounded-md shadow-card'>
          Authenticating User
        </h1>
      )}
    </main>
  );
}
