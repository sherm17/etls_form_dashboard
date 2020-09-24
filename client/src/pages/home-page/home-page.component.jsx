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

    if (etlRunStatusArr && etlRunStatusArr.length > 0) {
      etlRunStatusArr.forEach(etl => {
        const { completed, started } = etl;
        numOfEtl += 1;
        if (!started) {
          etlNoResponseCount += 1;
        } else if (completed === true) {
          etlSuccessCount += 1;
        } else if (completed === false) {
          etlFailedCount += 1;
        } 
      });
    }

    const etlRunDataForPieGraph = [
      etlSuccessCount,
      etlFailedCount,
      etlNoResponseCount
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