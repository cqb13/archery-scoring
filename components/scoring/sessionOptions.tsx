import Button from "@components/general/button";

export default function SessionOptions({
  done,
  updateFinished,
  goToSetup,
  beginSaving,
  defaultSetup
}: {
  done: boolean;
  updateFinished: (value: boolean) => void;
  goToSetup: () => void;
  beginSaving: () => void;
  defaultSetup: () => void;
}) {
  const finishScoring = () => {
    updateFinished(true);
  };

  const returnToSetup = () => {
    defaultSetup();
    updateFinished(false);
    goToSetup();
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
