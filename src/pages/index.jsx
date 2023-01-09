import ScoringPage from "../components/pageComponents/ScoringPage";
import SetupMenu from "../components/pageComponents/SetupMenu";
import { useState } from "react";

const Score = () => {
  const [settingUp, setSettingUp] = useState(true);
  const [state, setState] = useState();

  const handleStateChange = (newState) => {
    setState(newState);
    setSettingUp(false);
  };

  const reset = () => {
    setSettingUp(true);
  };

  return (
    <main className='Score'>
      {settingUp ? (
        <SetupMenu onStateChange={handleStateChange} />
      ) : (
        <ScoringPage data={state} reset={reset} />
      )}
    </main>
  );
};

export default Score;
