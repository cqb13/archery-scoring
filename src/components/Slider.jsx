import React, { useState } from "react";
import "../css/components/Slider.css"

const Slider = (props) => {
  const [value, setValue] = useState(props.default);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <label className="Slider">
    <input
      type="range"
      min={props.min}
      max={props.max}
      value={value}
      onChange={handleChange}
    />
    <input type="text" className="Slider-Value" value={value} onChange={handleChange}/>
    </label>
  );
};

export default Slider;
