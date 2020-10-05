  import React from 'react';
import './etl-cards-view.style.scss';

// components
import EtlCard from '../etl-card/etl-card.component';

const EtlCardView = ({ etlRunStatusList }) => {
  const allEtlCardsDisplay = etlRunStatusList.map(etlInfo => {
    const { 
      completed, start_time, end_time, name, date_ran, running, started
    } = etlInfo;

    return <EtlCard 
        etlName={name}
        isCompleted={completed}
        startTime={start_time}
        endTime={end_time}
        key={name}
        dateRan={date_ran}
        running={running}
        started={started}
      />;
    });

  return (
    <div className="card-view mt-4 pl-4 pr-4">
      {
        allEtlCardsDisplay
      }
    </div>
  )
}

export default EtlCardView;