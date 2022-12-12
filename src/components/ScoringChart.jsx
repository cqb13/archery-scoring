import React from "react";

class ScoringChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  render() {
    return (
      <div className="Scoring-Chart">
        <h1>Under Construction</h1>
        <ul>
          <li>{this.state.data.location}</li>
          <li>{this.state.data.distance}</li>
          <li>{this.state.data.distanceUnit}</li>
          <li>{this.state.data.ends}</li>
          <li>{this.state.data.arrowsPerEnd}</li>
          <li>{this.state.data.sessions}</li>
          <li>{this.state.data.bow}</li>
        </ul>
      </div>
    );
  }
}

export default ScoringChart;
