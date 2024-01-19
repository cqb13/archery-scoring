"use client";

import NotificationPopup from "@/components/general/notificationPopup";
import FinalScoringStats from "@/components/scoring/finalScoringStats";
import SessionOptions from "@/components/scoring/sessionOptions";
import SaveScorePopup from "@/components/scoring/saveScorePopup";
import { useScoreContext } from "@/lib/context/scoreContext";
import ScoringChart from "@/components/scoring/scoringChart";
import SignUpPopup from "@/components/misc/signUpPopup";
import { useAuthContext } from "@context/authContext";
import countTotals from "@/utils/score/countTotals";
import saveSession from "@/utils/score/saveSession";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Scoring() {
  const scoreContext = useScoreContext() as any;
  const router = useRouter();

  const [finished, setFinished] = useState(false);
  const [savingPopup, setSavingPopup] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [signUpPopup, setSignUpPopup] = useState(false);

  const { user } = useAuthContext() as { user: any };

  const [location, setLocation] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("");
  const [distance, setDistance] = useState(0);
  const [ends, setEnds] = useState(0);
  const [arrowsPerEnd, setArrowsPerEnd] = useState(0);
  const [splitEnds, setSplitEnds] = useState(0);
  const [bow, setBow] = useState("");

  const [data, setData] = useState({} as any);

  const [notification, setNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(
    {} as "success" | "error"
  );
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  const updateFinished = (value: boolean) => setFinished(value);
  const updateSavingPopup = (value: boolean) => setSavingPopup(value);

  useEffect(() => {
    const url = new URL(window.location.href);
    const dataNew = url.searchParams.get("data");
    const location = url.searchParams.get("location");
    const distanceUnit = url.searchParams.get("distanceUnit");
    const distance = url.searchParams.get("distance");
    const ends = url.searchParams.get("ends");
    const arrowsPerEnd = url.searchParams.get("arrowsPerEnd");
    const splitEnds = url.searchParams.get("splitEnds");
    const bow = url.searchParams.get("bow");

    if (!dataNew) {
      return;
    }

    if (
      data &&
      location &&
      distanceUnit &&
      distance &&
      ends &&
      arrowsPerEnd &&
      splitEnds &&
      bow
    ) {
      setData(JSON.parse(dataNew));
      setLocation(location);
      setDistanceUnit(distanceUnit);
      setDistance(parseInt(distance));
      setEnds(parseInt(ends));
      setArrowsPerEnd(parseInt(arrowsPerEnd));
      setSplitEnds(parseInt(splitEnds));
      setBow(bow);
    }
  }, []);

  const updateData = (value: any) => {
    const stringifiedValue = JSON.stringify(value);
    router.push(`/score/scoring?data=${stringifiedValue}&${configToString()}`);
    setData(value);
  };

  const configToString = () => {
    return (
      "location=" +
      location +
      "&distanceUnit=" +
      distanceUnit +
      "&distance=" +
      distance +
      "&ends=" +
      ends +
      "&arrowsPerEnd=" +
      arrowsPerEnd +
      "&splitEnds=" +
      splitEnds +
      "&bow=" +
      bow
    );
  };

  useEffect(() => {
    setLocation(scoreContext.location);
    setDistanceUnit(scoreContext.distanceUnit);
    setDistance(scoreContext.distance);
    setEnds(scoreContext.ends);
    setArrowsPerEnd(scoreContext.arrowsPerEnd);
    setSplitEnds(scoreContext.splitEnds);
    setBow(scoreContext.bow);

    if (scoreContext.bow === "") {
      router.push("/score/setup");
    }
  }, []);

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
    router.push("/score/setup");
  };

  const updateNotification = (value: boolean) => setNotification(value);

  return (
    <>
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
          goToSetup={() => router.push("/score/setup")}
          beginSaving={beginSaving}
          defaultSetup={defaultSetup}
        />
      </section>
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
    </>
  );
}
