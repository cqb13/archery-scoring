import React from "react";

const Profile = (props) => {
  const name = props.name;
  const highScore = props.highScore;

  //TODO: Later create component for stats and pass in props
  return (
    <div className="Profile">
      <div className="Profile-Header">
        <h1 class="Welcome">{"Welcome " + name}</h1>
      </div>
      <div className="Profile-Body">
        <h2>Stats</h2>
        <div className="Stats-Container">
          <div className="Stat">
            <h2>High Score: {highScore}</h2>
          </div>
          <div className="Stat">
            <h2>Average Score: </h2>
          </div>
          <div className="Stat">
            <h2>Lowest Score: </h2>
          </div>
          <div className="Stat">
            <h2>Games Played: </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
