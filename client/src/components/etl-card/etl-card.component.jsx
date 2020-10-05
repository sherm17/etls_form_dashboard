import React from 'react';

import './etl-card.style.scss';

const EtlCard = ({ 
  etlName, isCompleted, startTime, endTime , started, dateRan, running
}) => {

  
  let etlRunStatus;
  let etlRunStatusClass;

  const todaysDate = new Date();
  const month = String(todaysDate.getMonth() + 1).padStart(2, '0'); 
  const day  = String(todaysDate.getDate()).padStart(2, '0');
  const year = todaysDate.getFullYear();

  const todaysDateStr = `${year}-${month}-${day}`;

  if (dateRan) {
    const yearMonthDayRegex = /^\d\d\d\d-\d\d-\d\d/g;
    const dateRanYearMonthDayStr = dateRan.match(yearMonthDayRegex)[0];

    if (dateRanYearMonthDayStr === todaysDateStr) {
      if (started && isCompleted) {
        etlRunStatus = "Success";
        etlRunStatusClass = "success";
      } else if (started && running) {
        etlRunStatus = "Running";
        etlRunStatusClass = "running";
      }
    } else {
      etlRunStatus = "Did not run";
      etlRunStatusClass = "no-response";
    }
  } else {
    etlRunStatus = "Did not run";
    etlRunStatusClass = "no-response";
  }


  // if (started) {
  //   if (isCompleted) {
  //     etlRunStatus = "Success";
  //     etlRunStatusClass = "success";
  //   } else {
  //     etlRunStatus = "Failed"
  //     etlRunStatusClass = "failed";
  //   }
  // } else {
  //   etlRunStatus = "Did not run";
  //   etlRunStatusClass = "no-response";
  // }


  return (
    <div className="etl-card">
      <div className="card-header">
        <div className="etl-name pl-3">
          {etlName}
        </div>
        <div className={`etl-run-status ${etlRunStatusClass}`}>
          <p className="run-results">
            {
              etlRunStatus
            }
          </p>
        </div>
      </div>
      <div className="card-body">
        <p className="card-text">
          start time: {startTime}
        </p>
        <p className="card-text">
          end time: {endTime}
        </p>
      </div>
    </div>
  )
}

export default EtlCard;