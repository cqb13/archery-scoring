import React from "react";
import "../../css/components/TextArea.css";

const TextArea = (props) => {
  return <textarea className={props.class} placeholder={props.placeholder}></textarea>;
};

export default TextArea;
