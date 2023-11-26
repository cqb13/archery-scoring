"use client";

import NotificationPopup from "@/components/general/notificationPopup";
import { useScoreContext } from "@/lib/context/scoreContext";
import { useAuthContext } from "@/lib/context/authContext";
import getUserDoc from "@/utils/firebase/db/getUserDoc";
import Dropdown from "@/components/general/dropdown";
import Button from "@/components/general/button";
import Slider from "@/components/general/slider";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Score() {
  const scoreContext = useScoreContext() as any;
  const { user } = useAuthContext() as any;
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("");
  const [distance, setDistance] = useState(18);
  const [ends, setEnds] = useState(10);
  const [arrowsPerEnd, setArrowsPerEnd] = useState(3);
  const [splitEnds, setSplitEnds] = useState(1);
  const [bow, setBow] = useState("");

  const [notification, setNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(
    {} as "success" | "error"
  );
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  const [profiles, setProfiles] = useState([] as any[]);
  const [profileName, setProfileName] = useState("");

  const updateLocation = (value: string) => setLocation(value);
  const updateDistanceUnit = (value: string) => setDistanceUnit(value);
  const updateDistance = (value: number) => setDistance(value);
  const updateEnds = (value: number) => setEnds(value);
  const updateArrowsPerEnd = (value: number) => setArrowsPerEnd(value);
  const updateSplitEnds = (value: number) => setSplitEnds(value);
  const updateBow = (value: string) => setBow(value);

  useEffect(() => {
    if (user) {
      getUserDoc(user).then((doc: any) => {
        const dbProfiles = doc.profiles;
        const setupProfile = doc.setupDefaultProfile;
        setProfiles(dbProfiles);
        loadProfile(dbProfiles[setupProfile - 1]);
      });
    }
  }, [user]);

  const loadProfile = (profile: any) => {
    setLocation(profile.location);
    setProfileName(profile.profileName);
    setDistanceUnit(profile.distanceUnit);
    setDistance(profile.distance);
    setEnds(profile.ends);
    setArrowsPerEnd(profile.arrowsPerEnd);
    setSplitEnds(profile.splitEnds);
    setBow(profile.bow);
  };

  const startScoring = () => {
    if (!checkIfReady()) return;

    scoreContext.updateLocation(location);
    scoreContext.updateDistanceUnit(distanceUnit);
    scoreContext.updateDistance(distance);
    scoreContext.updateEnds(ends);
    scoreContext.updateArrowsPerEnd(arrowsPerEnd);
    scoreContext.updateSplitEnds(splitEnds);
    scoreContext.updateBow(bow);

    router.push("/score/scoring");
  };

  const checkIfReady = () => {
    setNotificationType("error");
    setNotificationTitle("Error");

    if (location === "") {
      setNotification(true);
      setNotificationMessage("Please select a location");
      return false;
    }

    if (distanceUnit === "") {
      setNotification(true);
      setNotificationMessage("Please select a distance unit");
      return false;
    }

    if (bow === "") {
      setNotification(true);
      setNotificationMessage("Please select a bow");
      return false;
    }

    return true;
  };

  const updateNotification = (value: boolean) => setNotification(value);

  const switchProfile = (newProfileName: any) => {
    profiles.forEach((profile) => {
      if (profile.profileName == newProfileName) {
        loadProfile(profile);
        return;
      }
    });
  };

  return (
    <>
      <section className='flex flex-col gap-2 items-center'>
        <Dropdown
          title='Location'
          items={["Indoor", "Outdoor"]}
          newSelectedItem={location}
          setSelected={updateLocation}
        />
        <div className='flex gap-2 items-center max-smSm:flex-col'>
          <Slider
            title='Distance'
            jump={1}
            defaultValue={distance}
            min={1}
            max={100}
            update={updateDistance}
          />
          <Dropdown
            title='Distance Unit'
            items={["M (meters)", "YD (yards)", "FT (feet)"]}
            setSelected={updateDistanceUnit}
          />
        </div>
        <Slider
          title='Ends'
          jump={1}
          defaultValue={ends}
          min={1}
          max={40}
          update={updateEnds}
        />
        <Slider
          title='Arrow Per End'
          jump={1}
          defaultValue={arrowsPerEnd}
          min={1}
          max={12}
          update={updateArrowsPerEnd}
        />
        <Slider
          title='Split Ends'
          jump={1}
          defaultValue={splitEnds}
          min={1}
          max={4}
          update={updateSplitEnds}
        />
        <Dropdown
          title='Bow'
          items={["Barebow", "Olympic Recurve", "Compound"]}
          setSelected={updateBow}
        />
        {user ? (
          <div>
            <h2 className='text-center'>Scoring Profiles</h2>
            <Dropdown
              title={profileName}
              items={profiles.map((profile) => profile.profileName)}
              setSelected={setProfileName}
              onNewSelection={switchProfile}
            />
          </div>
        ) : null}
        <Button title='Start Scoring' onClick={startScoring} />
      </section>
      {notification ? (
        <NotificationPopup
          title={notificationTitle}
          type={notificationType}
          message={notificationMessage}
          timeout={5000}
          updateNotification={updateNotification}
        />
      ) : null}
    </>
  );
}
