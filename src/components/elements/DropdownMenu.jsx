import React, { useState } from "react";

const CustomDropdownMenu = (props) => {
  const [dates] = useState(props.options);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const updateDate = props.updateDate;

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleDateChange = (date) => {
    setSelected(date);
    updateDate(date);
    setOpen(false);
  };

  return (
    <div className="custom-dropdown-menu">
      <button onClick={toggleDropdown}>{selected || props.options[0]}</button>
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

export default CustomDropdownMenu;
