import React from 'react';
import './etl-cards-view.style.scss';

// components
import EtlCard from '../etl-card/etl-card.component';

const EtlCardView = ({ etlRunStatusList }) => {
  const allEtlCardsDisplay = etlRunStatusList.map(etlInfo => {
    const { completed, start_time, end_time, etl_name } = etlInfo;

return <EtlCard 
      etlName={etl_name}
      isCompleted={completed}
      startTime={start_time}
      endTime={end_time}
      key={etl_name}
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