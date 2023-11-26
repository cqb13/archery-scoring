"use client";
import { createContext, useContext, useState, ReactNode } from "react";
export const ScoreContext = createContext({});

export const useScoreContext = () => useContext(ScoreContext);

interface ScoreContextProviderProps {
  children: ReactNode;
}

export function ScoreContextProvider({
  children
}: ScoreContextProviderProps): JSX.Element {
  const [location, setLocation] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("");
  const [distance, setDistance] = useState(0);
  const [ends, setEnds] = useState(0);
  const [arrowsPerEnd, setArrowsPerEnd] = useState(0);
  const [splitEnds, setSplitEnds] = useState(0);
  const [bow, setBow] = useState("");

  const updateLocation = (value: string) => setLocation(value);
  const updateDistanceUnit = (value: string) => setDistanceUnit(value);
  const updateDistance = (value: number) => setDistance(value);
  const updateEnds = (value: number) => setEnds(value);
  const updateArrowsPerEnd = (value: number) => setArrowsPerEnd(value);
  const updateSplitEnds = (value: number) => setSplitEnds(value);
  const updateBow = (value: string) => setBow(value);

  return (
    <ScoreContext.Provider
      value={{
        location,
        distanceUnit,
        distance,
        ends,
        arrowsPerEnd,
        splitEnds,
        bow,
        updateLocation,
        updateDistanceUnit,
        updateDistance,
        updateEnds,
        updateArrowsPerEnd,
        updateSplitEnds,
        updateBow
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
}
