import React from 'react';

const CheckboxForRunDay = ({
  id, label, handleWeeklyRunDayCheck, isChecked
}) => {

  return (
    <div className="form-check form-check-inline" label={label} key={label}>
      <input
        className="form-check-input"
        type="checkbox"
        onChange={handleWeeklyRunDayCheck}
        id={label}
        value={label}
        checked={isChecked}
      />
      <label
        className="form-check-label"
        htmlFor={label}>
        {label}
      </label>
    </div>
  )
}

export default CheckboxForRunDay

