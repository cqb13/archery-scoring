import Button from "@components/general/button";
import { update } from "firebase/database";

export default function SessionOptions({
  done,
  updateFinished,
  updateSetup,
  beginSaving,
  defaultSetup
}: {
  done: boolean;
  updateFinished: (value: boolean) => void;
  updateSetup: (value: boolean) => void;
  beginSaving: () => void;
  defaultSetup: () => void;
}) {
  const finishScoring = () => {
    updateFinished(true);
  };

  const returnToSetup = () => {
    defaultSetup();
    updateFinished(false);
    updateSetup(true);
  };

  const continueScoring = () => {
    updateFinished(false);
  };

  return (
    <section>
      {done ? (
        <div className='flex gap-2'>
          <Button title='Return to Setup' onClick={returnToSetup} />
          <Button title='Continue' onClick={continueScoring} />
          <Button title='Save Session' onClick={beginSaving} />
        </div>
      ) : (
        <div>
          <Button title='Finish Scoring' onClick={finishScoring} />
        </div>
      )}
    </section>
  );
}
