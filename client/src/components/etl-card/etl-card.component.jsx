import React from 'react';

import './etl-card.style.scss';

const EtlCard = ({ etlName, isCompleted, startTime, endTime }) => {
  return (
    <div className="etl-card">
      <div className="card-header">
        <div className="etl-name pl-3">
          {etlName}
        </div>
        <div className={`etl-run-status ${isCompleted === true ? "success" : "failed"}`}>
          <p className="run-results">
            {
              isCompleted === true ? "Success" : "Failed"
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