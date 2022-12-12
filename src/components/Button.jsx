import React from "react";

const Button = (props) => {
  const handleClick = (event) => {
    props.onClick(event);
  };

  return (
    <button
      onClick={handleClick}
      className={props.class}
      type={props.type}
      disabled={props.disabled}
      value={props.value}
    > 
      {props.children}
    </button>
  );
};

export default Button;
