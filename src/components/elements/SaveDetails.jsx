import React, { useState, useEffect } from "react";
import Button from "./Button";

const SaveDetails = (props) => {
  const [name, setName] = useState();
  const [note, setNote] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const confirm = props.confirmSave;
  const cancel = props.cancel;

  useEffect(() => {
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const time = today.getHours() + ":" + today.getMinutes();
    setDate(date);
    setTime(time);
  }, []);

  const handleConfirm = () => {
    const createdAt = date + "," + time;
    confirm(name, note, createdAt);
  };

  const handleCancel = () => {
    cancel(false);
  };

  const handleNoteChange = (e) => {
    if (e.target.value.length < 200) {
      setNote(e.target.value);
    }
  };

  const handleNameChange = (e) => {
    if (e.target.value.length < 15) {
      setName(e.target.value);
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  return (
    <div className='Popup-Overlay'>
      <div className='Popup'>
        <h1>Save Details</h1>
        <hr />
        <div className='Save-Details-Container'>
          <input type='text' placeholder='Name this session' value={name} onChange={handleNameChange}/>
          <div className='Save-Details-Item'>
            <input type='date' value={date} onChange={handleDateChange}/>
            <input type='time' value={time} onChange={handleTimeChange}/>
          </div>
          <textarea cols='30' rows='10' placeholder='Add a note' value={note} onChange={handleNoteChange} ></textarea>
        </div>
        <div className='Button-Container'>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </div>
      </div>
    </div>
  );
};

export default SaveDetails;
