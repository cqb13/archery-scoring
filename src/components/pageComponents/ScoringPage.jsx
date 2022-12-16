import React from "react";
import ScoringChart from "./ScoringChart";

class ScoringPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  render() {
    return (
      <div className='Scoring-Page'>
        <h1>Score</h1>
        <hr />
        <ScoringChart
          arrowsPerEnd={this.state.data.arrowsPerEnd}
          ends={this.state.data.ends}
          splits={this.state.data.sessions}
        />
      </div>
    );
  }
}

export default ScoringPage;
