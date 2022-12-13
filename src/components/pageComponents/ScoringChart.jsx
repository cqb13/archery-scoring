import React from "react";
import "../../css/ScoringChart.css";

class ScoringChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrows: this.props.arrowsPerEnd,
      ends: this.props.ends
    };
  }

  // setup score map and chart
  componentDidMount() {
    let scoreMap = [];
    let totalArrows = this.state.arrows * this.state.ends;
    for (let i = 0; i < totalArrows; i++) {
      scoreMap.push(0);
    }
    this.setState({scoreMap: scoreMap});

    let chart = document.querySelector(".Scoring-Chart");
    let section = document.createElement("div");
    section.className = "Section";
    for (let i = 0; i < this.state.ends; i++) {
      for (let j = 0; j < this.state.arrows; j++) {
        let newSection = section.cloneNode();
        newSection.id = i + "-" + j;
        newSection.innerHTML = parseInt(i + 1) + "-" + parseInt(j + 1);
        chart.appendChild(newSection);
      }
    }

    this.componentDidMount = () => {};
  }

  render() {
    return (
      <div className="Scoring-Chart">
      
      </div>
    );
  }
}

export default ScoringChart;
