import React from "react";

const TextArea = (props) => {
  return <textarea className={props.class} placeholder={props.placeholder}></textarea>;
};

export default TextArea;
