"use client";

import NotificationPopup from "@/components/general/notificationPopup";
import FinalScoringStats from "@/components/scoring/finalScoringStats";
import SessionOptions from "@/components/scoring/sessionOptions";
import ScoreSetupMenu from "@/components/scoring/scoreSetupMenu";
import SaveScorePopup from "@/components/scoring/saveScorePopup";
import ScoringChart from "@/components/scoring/scoringChart";
import SignUpPopup from "@/components/misc/signUpPopup";
import { useAuthContext } from "@context/authContext";
import countTotals from "@/utils/score/countTotals";
import saveSession from "@/utils/score/saveSession";
import { useState, useEffect } from "react";

export default function Home() {
  const [setup, setSetup] = useState(true);
  const [finished, setFinished] = useState(false);
  const [savingPopup, setSavingPopup] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [signUpPopup, setSignUpPopup] = useState(false);

  const { user } = useAuthContext() as { user: any };

  const [location, setLocation] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("");
  const [distance, setDistance] = useState(18);
  const [ends, setEnds] = useState(10);
  const [arrowsPerEnd, setArrowsPerEnd] = useState(3);
  const [splitEnds, setSplitEnds] = useState(1);
  const [bow, setBow] = useState("");

  const [data, setData] = useState({} as any);

  const [notification, setNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(
    {} as "success" | "error"
  );
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  const updateSetup = (value: boolean) => setSetup(value);
  const updateFinished = (value: boolean) => setFinished(value);
  const updateSavingPopup = (value: boolean) => setSavingPopup(value);
  const updateSignUpPopup = (value: boolean) => setSignUpPopup(value);

  const updateLocation = (value: string) => setLocation(value);
  const updateDistanceUnit = (value: string) => setDistanceUnit(value);
  const updateDistance = (value: number) => setDistance(value);
  const updateEnds = (value: number) => setEnds(value);
  const updateArrowsPerEnd = (value: number) => setArrowsPerEnd(value);
  const updateSplitEnds = (value: number) => setSplitEnds(value);
  const updateBow = (value: string) => setBow(value);

  const updateData = (value: any) => setData(value);

  const defaultSetup = () => {
    setLocation("");
    setDistanceUnit("");
    setDistance(18);
    setEnds(10);
    setArrowsPerEnd(3);
    setSplitEnds(1);
    setBow("");
  };

  useEffect(() => {
    if (user) setSignedIn(true);
    else setSignedIn(false);
  }, [user]);

  const startScoring = () => {
    if (!checkIfReady()) return;

    setSetup(false);
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

  const beginSaving = () => {
    if (!signedIn) {
      setSignUpPopup(true);
      return;
    }

    updateSavingPopup(true);
  };

  const continueSaving = async ({
    title,
    date,
    time,
    note
  }: {
    title: string;
    date: string;
    time: string;
    note: string;
  }) => {
    updateSavingPopup(false);
    setNotification(true);
    setNotificationType("success");
    setNotificationTitle("Success");
    setNotificationMessage("Session saved!");

    let cleanDistanceUnit = distanceUnit;
    // we are using distance unit from dropdown, but we don't need all the extra info
    if (distanceUnit.includes("(")) {
      cleanDistanceUnit = distanceUnit.substring(0, distanceUnit.indexOf("("));
    }
    cleanDistanceUnit = cleanDistanceUnit.trim();
    cleanDistanceUnit = cleanDistanceUnit.toLowerCase();

    const sessionInfo = {
      location,
      distance,
      distanceUnit: cleanDistanceUnit,
      ends,
      arrowsPerEnd,
      splitEnds,
      bow
    };
    let score = data;
    const { total } = countTotals({ score });
    const createdAt = date + "," + time;

    await saveSession({
      user,
      data,
      sessionInfo,
      total,
      title,
      note,
      createdAt
    });

    setSetup(true);
  };

  const updateNotification = (value: boolean) => setNotification(value);

  return (
    <main className='flex items-center justify-center pt-4 text-black'>
      {setup ? (
        <ScoreSetupMenu
          updateLocation={updateLocation}
          updateDistanceUnit={updateDistanceUnit}
          updateDistance={updateDistance}
          updateEnds={updateEnds}
          updateArrowsPerEnd={updateArrowsPerEnd}
          updateSplitEnds={updateSplitEnds}
          updateBow={updateBow}
          startScoring={startScoring}
        />
      ) : (
        <section className='flex flex-col gap-2'>
          <ScoringChart
            arrowsPerEnd={arrowsPerEnd}
            history={false}
            splits={splitEnds}
            ends={ends}
            done={false}
            updateData={updateData}
          />
          {finished ? <FinalScoringStats score={data} /> : null}
          <SessionOptions
            done={finished}
            updateFinished={updateFinished}
            updateSetup={updateSetup}
            beginSaving={beginSaving}
            defaultSetup={defaultSetup}
          />
        </section>
      )}
      {signUpPopup ? <SignUpPopup updateSignUpPopup={setSignUpPopup} /> : null}
      {savingPopup ? (
        <SaveScorePopup
          updateSavingPopup={updateSavingPopup}
          continueSaving={continueSaving}
          updateNotification={updateNotification}
          updateNotificationType={setNotificationType}
          updateNotificationTitle={setNotificationTitle}
          updateNotificationMessage={setNotificationMessage}
        />
      ) : null}
      {notification ? (
        <NotificationPopup
          title={notificationTitle}
          type={notificationType}
          message={notificationMessage}
          timeout={5000}
          updateNotification={updateNotification}
        />
      ) : null}
    </main>
  );
}
