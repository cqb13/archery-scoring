import React from "react";
import Button from "./Button";

const Popup = (props) => {
  const confirmAction = props.confirmButtonFunction;
  const cancelAction = props.cancelButtonFunction;

  return (
    <div className='Popup-Overlay'>
      <div className='Popup'>
        <h1>{props.title}</h1>
        <hr />
        {props.message ? (
            <pre class={props.messageClass}>{props.message}</pre>
        ) : null}

        {props.children ? (
            <>{props.children}</>
        ): null}
        
        <div className='Horizontal-Button-Container'>
            {props.confirmButtonValue ? (
                <Button onClick={confirmAction} class={props.confirmButtonClass} >{props.confirmButtonValue}</Button>
            ) : null}

            {props.cancelButtonValue ? (
                <Button onClick={cancelAction} class={props.cancelButtonClass} >{props.cancelButtonValue}</Button>
            ) : null}
        </div>
      </div>
    </div>
  );
};

export default Popup;
