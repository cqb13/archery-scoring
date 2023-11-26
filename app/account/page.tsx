"use client";

import updateSetupDefaultProfile from "@/utils/firebase/db/updateSetupDefaultProfile";
import NotificationPopup from "@/components/general/notificationPopup";
import updateDisplayName from "@/utils/firebase/db/updateDisplayName";
import updateProfileType from "@/utils/firebase/db/updateProfileType";
import deleteAccount from "@/utils/firebase/account/deleteAccount";
import googleSignOut from "@/utils/firebase/account/googleSignOut";
import updateProfiles from "@/utils/firebase/db/updateProfiles";
import ConfirmPopup from "@/components/misc/confirmPopup";
import getUserDoc from "@/utils/firebase/db/getUserDoc";
import { useAuthContext } from "@context/authContext";
import Dropdown from "@/components/general/dropdown";
import Slider from "@/components/general/slider";
import Button from "@/components/general/button";
import Input from "@/components/general/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@lib/firebase";
import Image from "next/image";

export default function History() {
  // general
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

  // profiles
  const [profiles, setProfiles] = useState([] as any[]);
  const [currentProfile, setCurrentProfile] = useState({} as any);
  const [profileName, setProfileName] = useState("");
  const [setupDefaultProfile, setSetupDefaultProfile] = useState<number>(0);

  // scoring
  const [location, setLocation] = useState<string>("");
  const [distanceUnit, setDistanceUnit] = useState<string>("");
  const [distance, setDistance] = useState<number>(0);
  const [ends, setEnds] = useState<number>(0);
  const [arrowsPerEnd, setArrowsPerEnd] = useState<number>(0);
  const [splitEnds, setSplitEnds] = useState<number>(0);
  const [bow, setBow] = useState<string>("");

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
      setNamePlaceholder(doc.displayName);
      setProfileType(doc.profileType);
      setSetupDefaultProfile(doc.setupDefaultProfile);
      processProfiles(doc.profiles);
      const bigPhotoURL = doc.photoURL.replace("s96-c", "s500-c");
      setPhotoURL(bigPhotoURL);
    });
  }, [user]);

  const processProfiles = async (dbProfiles: string[]) => {
    loadProfile(dbProfiles[0]);
    setProfiles(dbProfiles);
  };

  const loadProfile = (profile: any) => {
    setCurrentProfile(profile);
    setLocation(profile.location);
    setProfileName(profile.profileName);
    setDistanceUnit(profile.distanceUnit);
    setDistance(profile.distance);
    setEnds(profile.ends);
    setArrowsPerEnd(profile.arrowsPerEnd);
    setSplitEnds(profile.splitEnds);
    setBow(profile.bow);
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

  const saveProfile = () => {
    const profileId = currentProfile.profileId;
    const tempProfiles = [...profiles]; // Create a shallow copy of the profiles array

    if (!checkIfUniqueProfileName(profileName, profileId)) {
      setNotification(true);
      setNotificationType("error");
      setNotificationTitle("Error");
      setNotificationMessage("Profile name already exists");
      return;
    }

    let tempProfile = { ...currentProfile }; // Create a shallow copy of the currentProfile object
    tempProfile.location = location;
    tempProfile.profileName = profileName;
    tempProfile.distanceUnit = distanceUnit;
    tempProfile.distance = distance;
    tempProfile.ends = ends;
    tempProfile.arrowsPerEnd = arrowsPerEnd;
    tempProfile.splitEnds = splitEnds;
    tempProfile.bow = bow;

    if (JSON.stringify(currentProfile) === JSON.stringify(tempProfile)) {
      setNotification(true);
      setNotificationType("error");
      setNotificationTitle("Error");
      setNotificationMessage("No changes made");
      return;
    }

    tempProfiles[profileId - 1] = tempProfile;
    setProfiles(tempProfiles);
    updateProfiles(user, tempProfiles);

    setNotification(true);
    setNotificationType("success");
    setNotificationTitle("Success");
    setNotificationMessage("Profile updated");
  };

  const checkIfUniqueProfileName = (name: string, profileId: number) => {
    for (let i = 0; i < profiles.length; i++) {
      if (
        profiles[i].profileName == name &&
        profiles[i].profileId != profileId
      ) {
        return false;
      }
    }
    return true;
  };

  const switchProfile = (newProfileName: any) => {
    profiles.forEach((profile) => {
      if (profile.profileName == newProfileName) {
        loadProfile(profile);
        return;
      }
    });
  };

  const updateSetupProfile = () => {
    setSetupDefaultProfile(currentProfile.profileId);
    updateSetupDefaultProfile(user, currentProfile.profileId);
  };

  return (
    <>
      <div className='w-full flex flex-col gap-2'>
        <section className='shadow-card p-10 border border-gray-300 rounded-md flex flex-col gap-2 w-full max-mdLg:flex-col max-mdLg:items-center'>
          <h2>Account Settings</h2>
          <div className='flex gap-2'>
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
          </div>
        </section>
        <section className='shadow-card p-10 border border-gray-300 rounded-md flex flex-col gap-2 w-full max-mdLg:flex-col max-mdLg:items-center'>
          <h2>Scoring Profiles</h2>
          <div className='flex gap-2 items-center'>
            <div className='flex flex-col gap-2'>
              <Dropdown
                title={location}
                items={["Indoor", "Outdoor"]}
                newSelectedItem={location}
                setSelected={setLocation}
              />
              <Dropdown
                title={distanceUnit}
                items={["M (meters)", "YD (yards)", "FT (feet)"]}
                newSelectedItem={distanceUnit}
                setSelected={setDistanceUnit}
              />
              <Dropdown
                title={bow}
                items={["Barebow", "Olympic Recurve", "Compound"]}
                newSelectedItem={bow}
                setSelected={setBow}
              />
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <Slider
                title='Distance'
                jump={1}
                defaultValue={distance}
                min={1}
                max={100}
                update={setDistance}
              />
              <Slider
                title='Ends'
                jump={1}
                defaultValue={ends}
                min={1}
                max={40}
                update={setEnds}
              />
              <Slider
                title='Arrow Per End'
                jump={1}
                defaultValue={arrowsPerEnd}
                min={1}
                max={12}
                update={setArrowsPerEnd}
              />
              <Slider
                title='Split Ends'
                jump={1}
                defaultValue={splitEnds}
                min={1}
                max={4}
                update={setSplitEnds}
              />
            </div>
            <div className='flex flex-col gap-2'>
              {profiles ? (
                <Dropdown
                  title={profileName}
                  items={profiles.map((profile) => profile.profileName)}
                  setSelected={setProfileName}
                  onNewSelection={switchProfile}
                />
              ) : null}
              <Input
                value={profileName}
                placeholder={"profile name"}
                type='text'
                updateValue={setProfileName}
              />
              <Button title='Save' onClick={saveProfile} />
              <Button
                title='Set as Default'
                disabled={setupDefaultProfile == currentProfile.profileId}
                onClick={updateSetupProfile}
              />
            </div>
          </div>
        </section>
      </div>
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
