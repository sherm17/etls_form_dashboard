import React from 'react';
import './sidebar.style.scss';

import { connect } from 'react-redux';

const SideBar = ({ runFreqValues }) => {
  // const filterBarDisplay = runFreqValues.map((runFreq, index) => {
  //   const runOccasion = runFreq.run_frequency;
  //   return (
  //     <div className="custom-control custom-checkbox pb-2" key={index}> 
  //       <input type="checkbox" className="custom-control-input" id="defaultUnchecked" />
  //       <label className="custom-control-label" htmlFor="defaultUnchecked">{runOccasion}</label>
  //     </div>
  //   )
  // });
  
  // return (
  //   <div className="sidebar">
  //     <h2 className="mb-4">Date Filter</h2>
  //     {
  //       filterBarDisplay
  //     }
  //   </div>
  // )
  return (
    <div>side bar</div>
  )
}

const mapStateToProps = (state) => {
  console.log(state);
  const { runFrequencies } = state.etlRunFreq

  return {
    runFreqValues: runFrequencies
  }
}

export default connect(mapStateToProps, null)(SideBar);