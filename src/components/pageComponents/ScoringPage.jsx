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
      <div className="Scoring-Page">
        <ScoringChart arrowsPerEnd={this.state.data.arrowsPerEnd} ends={this.state.data.ends}/>
      </div>
    );
  }
}

export default ScoringPage;
