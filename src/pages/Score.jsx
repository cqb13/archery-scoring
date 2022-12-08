import SetupMenu from "../components/SetupMenu";

const Score = () => {
  return (
    <div>
      <header>
        <h1>Scoring Session Settings</h1>
      </header>
      <hr />
      <main>
        {/*when begin is pressed on setup menu, switch  to score chart, setup using info from setup menu*/}
        <SetupMenu />
      </main>
    </div>
  );
};

export default Score;
