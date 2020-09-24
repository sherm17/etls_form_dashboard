import React from 'react';

import './etl-card.style.scss';

const EtlCard = ({ etlName, isCompleted, startTime, endTime , started}) => {
  let etlRunStatus;
  let etlRunStatusClass;
  if (started) {
    if (isCompleted) {
      etlRunStatus = "Success";
      etlRunStatusClass = "success";
    } else {
      etlRunStatus = "Failed"
      etlRunStatusClass = "failed";
    }
  } else {
    etlRunStatus = "Did not run";
    etlRunStatusClass = "no-response";
  }
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