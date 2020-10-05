import React, { Component } from "react";
import "./home-page.style.scss";

import { connect } from "react-redux";

// components
import EtlCardView from "../../components/etl-cards-view/etl-cards-view.component";
import PieChart from "../../components/etl_run_status_piechart/piechart.component";

// actions
import fetchRunStatuses from "../../redux/etlRunStatus/etlRunStatus.action"
import fetchRunFreq from "../../redux/etlRunFreq/etlRunFreq.action";
/*
  Home page will be comprised of sidebar and card view of ETL statuses

*/


class HomePage extends Component {


  componentDidMount() {
    // const urlForEtlStatuses = "http://localhost:3001/etl/run_statuses/8-26-2020";
    const urlForEtlStatusesToday = "http://localhost:3001/etl/run_statuses"
    const urlForEtlRunFreq = "http://localhost:3001/etl/run_freqency";

    const { getRunStatusesForEtls, getEtlRunFrequencys } = this.props;
    getRunStatusesForEtls(urlForEtlStatusesToday);
    getEtlRunFrequencys(urlForEtlRunFreq);
  }

  render() {
    const { etlRunStatusArr } = this.props;

    let numOfEtl = 0;
    let etlSuccessCount = 0;
    let etlFailedCount = 0;
    let etlNoResponseCount = 0;
    let etlRunningCount = 0;

    const todaysDate = new Date();
    const month = String(todaysDate.getMonth() + 1).padStart(2, '0'); 
    const day  = String(todaysDate.getDate()).padStart(2, '0');
    const year = todaysDate.getFullYear();
  
    const todaysDateStr = `${year}-${month}-${day}`;

    if (etlRunStatusArr && etlRunStatusArr.length > 0) {
      etlRunStatusArr.forEach(etl => {
        let { completed, started, running, date_ran } = etl;
        numOfEtl += 1;        

        if (date_ran) {
          const yearMonthDayRegex = /^\d\d\d\d-\d\d-\d\d/g;
          const dateRanYearMonthDayStr = date_ran.match(yearMonthDayRegex)[0];

          if (dateRanYearMonthDayStr === todaysDateStr) {
            if (started) {
              if (running) {
                etlRunningCount += 1;
              } else if (completed) {
                etlSuccessCount += 1;
              } else if (!completed) {
                etlFailedCount += 1;
              } 
            } else{
              etlNoResponseCount += 1;
            }
          } else {
            etlNoResponseCount += 1;
          }
        } else {
          etlNoResponseCount += 1;
        }
      });
    }

    const etlRunDataForPieGraph = [
      etlSuccessCount,
      etlFailedCount,
      etlNoResponseCount,
      etlRunningCount
    ];

    return (
      <div className="homepage">
        <div className="main-display">
          <PieChart data={etlRunDataForPieGraph} />
          <div className="run-summary" style={{textAlign: "center"}} >
            <div>
              ETL Total:{numOfEtl}
            </div>
            <div>
              ETL Success: {etlSuccessCount}
            </div>
            <div>
              ETL Failed: {etlFailedCount}
            </div>
            <div>
              ETL did not start: {etlNoResponseCount}
            </div>
            <div>
              ETL running: {etlRunningCount}
            </div>
          </div>

          {
            etlRunStatusArr !== undefined
              ?
              <EtlCardView
                etlRunStatusList={etlRunStatusArr}
              /> :
              ""
          }

        </div>

      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRunStatusesForEtls: url => dispatch(fetchRunStatuses(url)),
    getEtlRunFrequencys: url => dispatch(fetchRunFreq(url))
  }
}

const mapStateToProps = (state) => {
  const { etlRunStatuses } = state;
  const runStatuesArr = etlRunStatuses.runStatuses.data;

  return {
    etlRunStatusArr: runStatuesArr
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);