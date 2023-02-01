import RadioButton from "../elements/RadioButton";
import isMobile from "../../utils/isMobile";
import Button from "../elements/Button";
import Slider from "../elements/Slider";
import React, { useState } from "react";

const SetupMenu = (props) => {
  const updateState = props.updateState;
  const [location, setLocation] = useState("Indoor");
  const [distanceUnit, setDistanceUnit] = useState("m");
  const [arrowsPerEnd, setArrowsPerEnd] = useState(3);
  const [bow, setBow] = useState("Recurve");
  const [distance, setDistance] = useState(18);
  const [sessions, setSessions] = useState(1);
  const [ends, setEnds] = useState(10);
  const mobile = isMobile();

  const handleLocationChange = (event) => {
    const { value } = event.target;
    setLocation(value);
    const buttons = document.querySelectorAll(".Location-Button");
    buttons.forEach((button) => {
      button.className = "Location-Button";
      if (button.value === value) {
        button.className = "Location-Button Selected";
      }
    });
  };

  const handleArrowsPerEndChange = (event) => {
    setArrowsPerEnd(parseInt(event.target.value));
  };

  const handleDistanceChange = (event) => {
    setDistance(parseInt(event.target.value));
  };

  const handleSessionsChange = (event) => {
    setSessions(parseInt(event.target.value));
  };

  const handleEndsChange = (event) => {
    setEnds(parseInt(event.target.value));
  };

  const handleDistanceUnitChange = (event) => {
    setDistanceUnit(event.target.value);
  };

  const handleBowChange = (event) => {
    setBow(event.target.value);
  };

  const handleBegin = () => {
    updateState({location, distanceUnit, arrowsPerEnd, bow, distance, sessions, ends});
  };

  return (
    <section>
      <section className='Vertical-Container'>
        <h3>Location</h3>
        <section className='Horizontal-Container'>
          <Button class='Location-Button' type='location' value='Outdoor' onClick={handleLocationChange}>
            Outdoor
          </Button>
          <Button class='Location-Button' type='location' value='Indoor' onClick={handleLocationChange}>
            Indoor
          </Button>
        </section>
      </section>
      <section className='Vertical-Container'>
        <h3>Distance</h3>
        <section className='Horizontal-Container'>
          <RadioButton class='Distance-Unit-Selector' name='distance' value='m' onChange={handleDistanceUnitChange}/>
          <RadioButton class='Distance-Unit-Selector' name='distance' value='yd' onChange={handleDistanceUnitChange}/>
          <RadioButton class='Distance-Unit-Selector'name='distance' value='ft' onChange={handleDistanceUnitChange}/>
        </section>
        <Slider class='Distance-Slider' min='1' max='100' default='18' onChange={handleDistanceChange}/>
      </section>
      <section className='Vertical-Container'>
        <h3>Ends</h3>
        <section className="Vertical-Container">
          <Slider class='Ends-Slider' min='1' max='40' default='10' onChange={handleEndsChange}/>
          <h3>Arrows Per End</h3>
          <Slider class='Arrows-Per-End-Slider' min='1' max='12' default='3' onChange={handleArrowsPerEndChange}/>
          <h3>Split Ends</h3>
          <Slider class='Sessions' min='1' max='4' default='1' onChange={handleSessionsChange}/>
        </section>
      </section>
      <section className='Vertical-Container'>
        <h3>Bow Type</h3>
        <section className={mobile ? "Vertical-Container" : "Horizontal-Container"}>
          <RadioButton class='Bow-Selector' name='bow' value='Barebow' onChange={handleBowChange}/>
          <RadioButton class='Bow-Selector' name='bow' value='Olympic Recurve' onChange={handleBowChange}/>
          <RadioButton class='Bow-Selector' name='bow' value='Compound' onChange={handleBowChange}/>
        </section>
      </section>
      <Button class='Begin-Button' type='begin' onClick={handleBegin}>
        Begin
      </Button>
    </section>
  );
};

export default SetupMenu;
