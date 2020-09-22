import React from 'react';

const CheckboxForRunDay = ({
  id, label, handleWeeklyRunDayCheck, isChecked
}) => {

  // if (label === 'Monday') {
  //   console.log('Monday');
  //   console.log(isChecked);
  // }
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

{/* <div className="run-days">
  <div className="form-check form-check-inline" key={`${currDay}-div`}>
    <input className="form-check-input" type="checkbox" key={`${currDay}-input`} id={currDay} checked={isChecked}
      onChange={handleRunDayCheck}
    />
    <label className="form-check-label" key={`${currDay}-label`} htmlFor={currDay}>{currDay}</label>
  </div>
</div> */}