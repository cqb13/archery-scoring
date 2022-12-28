import React from "react";

const Profile = (props) => {
  return (
    <div className='Profile'>
      <div className='Profile-Header'>
        <h1 class='Welcome'>{"Welcome " + props.name}</h1>
      </div>
      <div className='Profile-Body'>
        <h2>Stats</h2>
        <div className='Stats-Container'>
          <div className='Stat'>
            <h2>High Score: {props.highScore}</h2>
          </div>
          <div className='Stat'>
            <h2>Average Score: {props.averageScore}</h2>
          </div>
          <div className='Stat'>
            <h2>Lowest Score: {props.lowScore}</h2>
          </div>
          <div className='Stat'>
            <h2>Games Played: {props.gamesPlayed}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
