import React from "react";
import "../css/components/RadioButton.css";

const RadioButton = (props) => {
  return (
    <div className="RadioButton">
      <input type="radio" name={props.name} value={props.value} />
      <label>{props.value}</label>
    </div>
  );
};

export default RadioButton;
