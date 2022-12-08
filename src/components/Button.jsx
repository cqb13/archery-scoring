import React from 'react';

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={props.class}
      type={props.type}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
