import "../css/SetupMenu.css";
import Slider from "./Slider";
import RadioButton from "./RadioButton";
import Button from "./Button";
import "../css/components/RadioButton.css"

const SetupMenu = () => {
  const handleClick = (e) => {
    let buttons = document.querySelectorAll(".Location-Button");
    buttons.forEach((button) => {
      button.classList.remove("Selected");
    });
    e.target.classList.add("Selected");
  };

  const handleBegin = () => {
    let location = document.querySelector(".Location-Button.Selected").innerText;
    let distanceUnit = document.querySelector(".Distance-Unit-Selector:checked").value;
    let distance = document.querySelector(".Distance-Slider").value;
    let ends = document.querySelector(".Ends-Slider").value;
    let arrowsPerEnd = document.querySelector(".Arrows-Per-End-Slider").value;
    let sessions = document.querySelector(".Sessions").value;
    let bow = document.querySelector(".Bow-Selector:checked").value;
    console.log(location, distanceUnit, bow);
    console.log(distance, ends, arrowsPerEnd, sessions)
  };

  return (
    <div className='Setup-Menu'>
      <div className='Location Container'>
        <div className='Button-Container Container'>
          <Button onClick={handleClick} class="Location-Button" type="location">Outdoor</Button>
          <Button onClick={handleClick} class="Location-Button" type="location">Indoor</Button>
        </div>
      </div>
      <h3>Distance</h3>
      <div className="Distance Container">
        <div className="Options Container">
          <RadioButton class="Distance-Unit-Selector" name="distance" value="m" />
          <RadioButton class="Distance-Unit-Selector" name="distance" value="yd" />
          <RadioButton class="Distance-Unit-Selector" name="distance" value="ft" />
        </div>
        <Slider class="Distance-Slider" min="1" max="100" default="18" />
      </div>
      <div className="Ends Container">
        <h3>Ends</h3>
        <Slider class="Ends-Slider" min="1" max="40" default="10" />
        <h3>Arrows Per End</h3>
        <Slider class="Arrows-Per-End-Slider" min="1" max="12" default="3" />
        <h3>Split Ends</h3>
        <Slider class="Sessions" min="1" max="4" default="1" />
      </div>
      <div className="Options Container">
        <RadioButton class="Bow-Selector" name="bow" value="Barebow" />
        <RadioButton class="Bow-Selector" name="bow" value="Olympic Recurve" />
        <RadioButton class="Bow-Selector" name="bow" value="Compound" />
      </div>
      <Button class="Begin-Button" type="begin" onClick={handleBegin}>Begin</Button>
    </div>
  );
};

export default SetupMenu;
