import { useState } from "react";
import "../css/Score.css";
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
    <main className="Score">
      {settingUp ? (
        <SetupMenu onStateChange={handleStateChange} />
      ) : (
        <ScoringPage data={state}/>
      )}
    </main>
  );
};

export default Score;
