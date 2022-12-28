import React from "react";

const RadioButton = (props) => {
  const handleChange = (event) => {
    props.onChange(event);
  };

  return (
    <div className='RadioButton'>
      <input
        type='radio'
        className={props.class}
        name={props.name}
        value={props.value}
        onChange={handleChange}
      />
      <label>{props.value}</label>
    </div>
  );
};

export default RadioButton;
