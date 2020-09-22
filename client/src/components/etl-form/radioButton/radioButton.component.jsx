import React from 'react';

const RadioButton = ({toggleRadioButton, checked, label, id }) => {
  return(
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="run-time-radios"
          id={id}
          checked={checked}
          onChange={toggleRadioButton}
        />
        <label className="form-check-label" htmlFor={id}>
          {label}
      </label>
      </div>
  )
}

export default RadioButton;