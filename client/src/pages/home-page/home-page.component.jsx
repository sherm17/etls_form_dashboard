import React, { Component } from "react";
import "./home-page.style.scss";

import { connect } from "react-redux";

// components
import SideBar from "../../components/sidebar/sidebar.component";
import EtlCardView from "../../components/etl-cards-view/etl-cards-view.component";
import PieChart from "../../components/etl_run_status_piechart/piechart.component";

// actions
import fetchEtlTableInfo from "../../redux/etlTableInfo/etlTableInfo.action";
import fetchRunStatuses from "../../redux/etlRunStatus/etlRunStatus.action"
import fetchRunFreq from "../../redux/etlRunFreq/etlRunFreq.action";
/*
  Home page will be comprised of sidebar and card view of ETL statuses

*/


class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const urlForEtlStatuses = "http://localhost:3001/etl/run_statuses/8-26-2020";
    const urlForEtlRunFreq = "http://localhost:3001/etl/run_freqency";

    const { getRunStatusesForEtls, getEtlRunFrequencys } = this.props;
    getRunStatusesForEtls(urlForEtlStatuses);
    getEtlRunFrequencys(urlForEtlRunFreq);

    // getEtlRunStatuses(urlForEtlStatuses);
    // getEtlRunFreq(urlForEtlRunFreq);
  }

  render() {
    const { etlRunStatusArr } = this.props;
    

    let numOfEtl = 0;
    let numOfEtlSuccess = 0;
    let numOfEtlFailure = 0;

    if ( etlRunStatusArr && etlRunStatusArr.length > 0) {
      numOfEtl = etlRunStatusArr.length;
      
      etlRunStatusArr.forEach(etl => {
        const { completed } = etl;
        if (completed) numOfEtlSuccess += 1;
        else numOfEtlFailure += 1;
      })
    }


    let etlSuccessCount = 0;
    let etlFailedCount = 0;
    let etlNoResponseCount = 0;

    

    if (etlRunStatusArr) {
      etlRunStatusArr.forEach(etl => {
        const { completed } = etl;
        if (completed === true) {
          etlSuccessCount += 1;
        } else if (completed == false) {
          etlFailedCount += 1;
        } else {
          etlNoResponseCount += 1
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
              ETL Success: {numOfEtlSuccess}
            </div>
            <div>
              ETL Failed: {numOfEtlFailure}
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
  const { etlTableInfo } = state;
  const { etlInfo } = etlTableInfo;

  const { etlRunStatuses } = state;
  const runStatuesArr = etlRunStatuses.runStatuses.data;
  const etlArr = [];

  return {
    etlRunStatusArr: runStatuesArr
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);