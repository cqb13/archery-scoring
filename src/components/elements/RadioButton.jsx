import React from "react";
import "../../css/components/RadioButton.css";

const RadioButton = (props) => {
  const hangleChange = (event) => {
    props.onChange(event);
  };

  return (
    <div className="RadioButton">
      <input
        type="radio"
        className={props.class}
        name={props.name}
        value={props.value}
        onChange={hangleChange}
      />
      <label>{props.value}</label>
    </div>
  );
};

export default RadioButton;
