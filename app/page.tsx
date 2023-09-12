"use client";

import ErrorPopup from "@/components/general/errorPopup";
import ScoringChart from "@/components/scoring/scoringChart";
import { useState } from "react";
import DraggableElement from "@/components/wrappers/draggable";
import SessionOptions from "@/components/scoring/sessionOptions";
import ScoreSetupMenu from "@/components/scoring/scoreSetupMenu";
import FinalScoringStats from "@/components/scoring/finalScoringStats";
import SaveScorePopup from "@/components/scoring/saveScorePopup";

export default function Home() {
  const [setup, setSetup] = useState(true);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savingPopup, setSavingPopup] = useState(false);

  const [location, setLocation] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("");
  const [distance, setDistance] = useState(18);
  const [ends, setEnds] = useState(10);
  const [arrowsPerEnd, setArrowsPerEnd] = useState(3);
  const [splitEnds, setSplitEnds] = useState(1);
  const [bow, setBow] = useState("");

  const [data, setData] = useState({} as any);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateSetup = (value: boolean) => setSetup(value);
  const updateFinished = (value: boolean) => setFinished(value);
  const updateSaving = (value: boolean) => setSaving(value);
  const updateSavingPopup = (value: boolean) => setSavingPopup(value);

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
  }

  const startScoring = () => {
    if (!checkIfReady()) return;

    setSetup(false);
  };

  const checkIfReady = () => {
    if (location === "") {
      setError(true);
      setErrorMessage("Please select a location");
      return false;
    }

    if (distanceUnit === "") {
      setError(true);
      setErrorMessage("Please select a distance unit");
      return false;
    }

    if (bow === "") {
      setError(true);
      setErrorMessage("Please select a bow");
      return false;
    }

    return true;
  };

  const beginSaving = () => {
    updateSavingPopup(true);
  };

  const updateError = (value: boolean) => setError(value);

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
        <section className=''>
          <div className='flex flex-col gap-2'>
            <ScoringChart
              arrowsPerEnd={arrowsPerEnd}
              history={false}
              splits={splitEnds}
              ends={ends}
              done={false}
              updateData={updateData}
            />
            {finished ? (
              <FinalScoringStats score={data}/>
            ) : null}
            <SessionOptions
              done={finished}
              updateFinished={updateFinished}
              updateSetup={updateSetup}
              beginSaving={beginSaving}
              defaultSetup={defaultSetup}
            />
          </div>
        </section>
      )}
      {savingPopup ? (
        <SaveScorePopup updateSavingPopup={updateSavingPopup}/>
      ) : null}
      {error ? (
        <ErrorPopup
          title='Error'
          message={errorMessage}
          timeout={5000}
          updateError={updateError}
        />
      ) : null}
    </main>
  );
}
