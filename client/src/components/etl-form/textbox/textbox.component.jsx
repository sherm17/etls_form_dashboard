import React from "react";

const Textbox = ({label, id, val, handleTextboxChange}) => {
  return (
    <div className="form-group">
      <label htmlFor="etl-description">{label}</label>
      <textarea
        name={label}
        className="form-control"
        id={id}
        rows="3"
        value={val}
        onChange={handleTextboxChange}
      />
    </div>
  )
};

export default Textbox;