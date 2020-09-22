import React from 'react';

const Input = ({ label, instructions, placeholder, inputId, instructionId, val, handleInputChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="etl-end-time">{label}</label>
      <input
        type="text"
        className="form-control"
        id={inputId}
        placeholder={placeholder}
        aria-describedby={instructionId}
        value={val}
        onChange={handleInputChange}
        name={inputId}
      />
      <small id={instructionId} className="form-text text-muted">
        {
          instructions
        }
      </small>
    </div>
  )
};

export default Input;
