import React from 'react';
import './add-etl.style.scss';

import { connect } from "react-redux";
import fetchEtlTableInfo from "../../redux/etlTableInfo/etlTableInfo.action";


// components
import EtlForm from "../../components/etl-form/etl-form.component";

const AddEtlPage = ({getEtlTableInfo}) => {
  const etlTableInfoUrl = "http://localhost:3001/etl/etl_info";
  getEtlTableInfo(etlTableInfoUrl)
  return (
    <EtlForm isEdit={false} />
  )
};

const mapDispatchToProps = dispatch => {
  return {
    getEtlTableInfo: url => dispatch(fetchEtlTableInfo(url))
  }
}

export default connect(null, mapDispatchToProps)(AddEtlPage);