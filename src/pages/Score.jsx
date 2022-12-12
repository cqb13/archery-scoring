import { useState } from "react";
import SetupMenu from "../components/SetupMenu";
import ScoringChart from "../components/ScoringChart";

const Score = () => {
  const [state, setState] = useState();
  const [settingUp, setSettingUp] = useState(true);

  const handleStateChange = (newState) => {
    setState(newState);
    setSettingUp(false);
  };

  return (
    <div>
      <header>
        <h1>Scoring Session Settings</h1>
      </header>
      <hr />
      <main>
        {settingUp ? (
          <SetupMenu onStateChange={handleStateChange} />
        ) : (
          <ScoringChart data={state}/>
        )}
      </main>
    </div>
  );
};

export default Score;
