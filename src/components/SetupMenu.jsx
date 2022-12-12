import React from "react";
import "../css/SetupMenu.css";
import Slider from "./Slider";
import RadioButton from "./RadioButton";
import Button from "./Button";
import "../css/components/RadioButton.css"

class SetupMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "Indoor",
      distance: 18,
      distanceUnit: "m",
      ends: 10,
      arrowsPerEnd: 3,
      sessions: 1,
      bow: "Recurve"
    };
  }

  handleLocationChange = (event) => {
    this.setState({location: event.target.value});
  }

  handleDistanceChange = (event) => {
    this.setState({distance: event.target.value});
  }

  handleDistanceUnitChange = (event) => {
    this.setState({distanceUnit: event.target.value});
  }

  handleEndsChange = (event) => {
    this.setState({ends: event.target.value});
  }

  handleArrowsPerEndChange = (event) => {
    this.setState({arrowsPerEnd: event.target.value});
  }

  handleSessionsChange = (event) => {
    this.setState({sessions: event.target.value});
  }

  handleBowChange = (event) => {
    this.setState({bow: event.target.value});
  }

  handleBegin = (newState) => {
    this.setState(newState, () => {
      this.props.onStateChange(this.state);
    });
  }

  render() {
    return (
      <div className='Setup-Menu'>
        <div className='Location Container'>
          <div className='Button-Container Container'>
            <Button class="Location-Button" type="location" value="Outdoor" onClick={this.handleLocationChange}>Outdoor</Button>
            <Button class="Location-Button" type="location" value="Indoor" onClick={this.handleLocationChange}>Indoor</Button>
          </div>
        </div>
        <h3>Distance</h3>
        <div className="Distance Container">
          <div className="Options Container">
            <RadioButton class="Distance-Unit-Selector" name="distance" value="m" onChange={this.handleDistanceUnitChange}/>
            <RadioButton class="Distance-Unit-Selector" name="distance" value="yd" onChange={this.handleDistanceUnitChange}/>
            <RadioButton class="Distance-Unit-Selector" name="distance" value="ft" onChange={this.handleDistanceUnitChange}/>
          </div>
          <Slider class="Distance-Slider" min="1" max="100" default="18" onChange={this.handleDistanceChange}/>
        </div>
        <div className="Ends Container">
          <h3>Ends</h3>
          <Slider class="Ends-Slider" min="1" max="40" default="10" onChange={this.handleEndsChange}/>
          <h3>Arrows Per End</h3>
          <Slider class="Arrows-Per-End-Slider" min="1" max="12" default="3" onChange={this.handleArrowsPerEndChange}/>
          <h3>Split Ends</h3>
          <Slider class="Sessions" min="1" max="4" default="1" onChange={this.handleSessionsChange}/>
        </div>
        <div className="Options Container">
          <RadioButton class="Bow-Selector" name="bow" value="Barebow" onChange={this.handleBowChange}/>
          <RadioButton class="Bow-Selector" name="bow" value="Olympic Recurve" onChange={this.handleBowChange}/>
          <RadioButton class="Bow-Selector" name="bow" value="Compound" onChange={this.handleBowChange}/>
        </div>
          <Button class="Begin-Button" type="begin" onClick={this.handleBegin}>Begin</Button>
      </div>
    );
  }
}


export default SetupMenu;
