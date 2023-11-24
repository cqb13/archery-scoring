"use client";

import NotificationPopup from "@/components/general/notificationPopup";
import updateDisplayName from "@/utils/firebase/db/updateDisplayName";
import updateProfileType from "@/utils/firebase/db/updateProfileType";
import deleteAccount from "@/utils/firebase/account/deleteAccount";
import googleSignOut from "@/utils/firebase/account/googleSignOut";
import ConfirmPopup from "@/components/misc/confirmPopup";
import getUserDoc from "@/utils/firebase/db/getUserDoc";
import { useAuthContext } from "@context/authContext";
import Dropdown from "@/components/general/dropdown";
import Button from "@/components/general/button";
import Input from "@/components/general/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@lib/firebase";
import Image from "next/image";

export default function History() {
  // general
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

  // account
  const [name, setName] = useState("");
  const [namePlaceholder, setNamePlaceholder] = useState("");
  const [profileType, setProfileType] = useState("Private");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    if (!user) return;
    auth.onAuthStateChanged((user) => {
      if (user) {
        return;
      } else {
        router.push("/");
      }
    });

    getUserDoc(auth.currentUser).then((doc: any) => {
      setUserDoc(doc);
      setNamePlaceholder(doc.displayName);
      setProfileType(doc.profileType);
      const bigPhotoURL = doc.photoURL.replace("s96-c", "s500-c");
      setPhotoURL(bigPhotoURL);
    });
  }, [user]);

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
    <>
      <section className='shadow-card p-10 border border-gray-300 rounded-md flex gap-2 w-full max-mdLg:flex-col max-mdLg:items-center'>
        <Image
          src={photoURL}
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
    </>
  );
}
