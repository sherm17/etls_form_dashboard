import React from 'react';
import './edit-etl.style.scss';

// components
import EtlForm from "../../components/etl-form/etl-form.component";

import { connect } from "react-redux";

// actions
import fetchEtlTableInfo from "../../redux/etlTableInfo/etlTableInfo.action";

const EditEtlPage = ({ getEtlTableInfo }) => {
  const etlTableInfoUrl = "http://localhost:3001/etl/etl_info";
  getEtlTableInfo(etlTableInfoUrl);
  return (
    <EtlForm isEditing={true} />
  )
};

const mapDispatchToProps = dispatch => {
  return {
    getEtlTableInfo: url => dispatch(fetchEtlTableInfo(url))
  }
}

export default connect(null, mapDispatchToProps)(EditEtlPage);