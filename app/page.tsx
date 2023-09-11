"use client";

import Dropdown from "@/components/general/dropdown";
import Slider from "@/components/general/slider";
import Button from "@/components/general/button";
import ErrorPopup from "@/components/general/errorPopup";
import ScoringChart from "@/components/scorring/scoringChart";
import { useState } from "react";
import DraggableElement from "@/components/wrappers/draggable";

export default function Home() {
  const [setup, setSetup] = useState(true);
  const [location, setLocation] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("");
  const [distance, setDistance] = useState(18);
  const [ends, setEnds] = useState(10);
  const [arrowsPerEnd, setArrowsPerEnd] = useState(3);
  const [splitEnds, setSplitEnds] = useState(1);
  const [bow, setBow] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateLocation = (value: string) => setLocation(value);
  const updateDistanceUnit = (value: string) => setDistanceUnit(value);
  const updateDistance = (value: number) => setDistance(value);
  const updateEnds = (value: number) => setEnds(value);
  const updateArrowsPerEnd = (value: number) => setArrowsPerEnd(value);
  const updateSplitEnds = (value: number) => setSplitEnds(value);
  const updateBow = (value: string) => setBow(value);

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

  const updateError = (value: boolean) => setError(value);

  return (
    <main className="flex items-center justify-center pt-4 text-black">
      {setup
        ? <section className="flex flex-col gap-2 items-center">
            <Dropdown
              title="Location"
              items={["Indoor", "Outdoor"]}
              setSelected={updateLocation}
            />
            <div className="flex gap-2 items-center">
              <Slider
                title="Distance"
                jump={1}
                defaultValue={18}
                min={1}
                max={100}
                update={updateDistance}
              />
              <Dropdown
                title="Distance Unit"
                items={["M (meters)", "YD (yards)", "FT (feet)"]}
                setSelected={updateDistanceUnit}
              />
            </div>
            <Slider
              title="Ends"
              jump={1}
              defaultValue={10}
              min={1}
              max={40}
              update={updateEnds}
            />
            <Slider
              title="Arrow Per End"
              jump={1}
              defaultValue={3}
              min={1}
              max={12}
              update={updateArrowsPerEnd}
            />
            <Slider
              title="Split Ends"
              jump={1}
              defaultValue={1}
              min={1}
              max={4}
              update={updateSplitEnds}
            />
            <Dropdown
              title="Bow"
              items={["Barebow", "Olympic Recurve", "Compound"]}
              setSelected={updateBow}
            />
            <Button title="Start Scoring" onClick={startScoring} />
          </section>
        : <section>
            <ScoringChart
              arrowsPerEnd={arrowsPerEnd}
              history={false}
              splits={splitEnds}
              ends={ends}
              done={false}
            />
          </section>}
      {error
        ? <ErrorPopup
            title="Error"
            message={errorMessage}
            timeout={5000}
            updateError={updateError}
          />
        : null}
    </main>
  );
}
