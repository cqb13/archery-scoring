import Stat from "../elements/Stat";

const Profile = (props) => {
  return (
    <div className='Profile'>
      <div className='Profile-Header'>
        <h1 class='Welcome'>{"Welcome " + props.name}</h1>
      </div>
      <div className='Colored-Container'>
        <h2 className='Container-Title'>Stats</h2>
        <div className='Stats-Container'>
          <Stat title='High Score' stat={props.highScore}></Stat>
          <Stat title='Low Score' stat={props.lowScore}></Stat>
          <Stat title='Average Score' stat={props.averageScore}></Stat>
          <Stat title='Games Played' stat={props.gamesPlayed}></Stat>
          <Stat title='Total Splits' stat={props.totalSplits} note='Includes Splits'></Stat>
        </div>
      </div>
    </div>
  );
};

export default Profile;
