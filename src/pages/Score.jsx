import { useState } from "react";
import SetupMenu from "../components/pageComponents/SetupMenu";
import ScoringPage from "../components/pageComponents/ScoringPage";

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
          <ScoringPage data={state}/>
        )}
      </main>
    </div>
  );
};

export default Score;
