import React, { useState } from "react";

const DropdownMenu = (props) => {
  const [dates] = useState(props.options);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();
  const changeGame = props.changeGame;
  const setGame = props.setGame;

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleDateChange = (date) => {
    setSelected(date);
    changeGame(date);
    setOpen(false);
    let reverseDates = dates.slice().reverse();
    setGame(reverseDates.indexOf(date) + 1);
  };

  const reverseDates = dates.slice().reverse();
  const selectedDate = reverseDates[props.currentGame - 1];

  return (
    <div className='Custom-Dropdown-Menu'>
      <button className='Custom-Dropdown-Menu-Toggle' onClick={toggleDropdown}>
        {selected || selectedDate}
      </button>
      {open && (
        <ul>
          {dates.map((d) => (
            <li onClick={() => handleDateChange(d)}>{d}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
