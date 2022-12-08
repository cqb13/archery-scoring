import "../css/SetupMenu.css";
import Slider from "./Slider";
import RadioButton from "./RadioButton";
import TextArea from "./TextArea";
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
        <h3>Split Ends</h3>
        <Slider class="Sessions" min="1" max="4" default="1" />
      </div>
      <div className="Options Container">
        <RadioButton class="Bow-Selector" name="bow" value="Barebow" />
        <RadioButton class="Bow-Selector" name="bow" value="Olympic Recurve" />
        <RadioButton class="Bow-Selector" name="bow" value="Compound" />
      </div>
      <div className="Details-Container Container">
        <TextArea class="Details" placeholder="Enter Some Details"/>
      </div>
      <Button class="Begin-Button" type="begin">Begin</Button>
    </div>
  );
};

export default SetupMenu;
