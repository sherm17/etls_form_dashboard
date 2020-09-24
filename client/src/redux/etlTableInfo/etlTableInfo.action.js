import EtlTableInfoType from "./etlTableInfo.type";

const etlTableInfoFetchSuccess = (etlTableInfo) => {
  return {
    type: EtlTableInfoType.ETL_INFO_FETCH_SUCCESS,
    etlTableInfo
  }
}

const etlTableInfoFetchHasErrored = (bool) => {
  return {
    type: EtlTableInfoType.ETL_INFO_FETCH_ERROR,
    hasErrored: bool
  }
}

const fetchEtlTableInfo = (url) => {
  return (dispatch) => {
    fetch(url)  
      .then(res => res.json())
      .then(etlInfo => dispatch(etlTableInfoFetchSuccess(etlInfo)))
      .catch(e => dispatch(etlTableInfoFetchHasErrored(true)))
  }
}

const etlTableInfoUpdateSuccess = (updatedEtlInfo) => {
  return {
    type: EtlTableInfoType.ETL_INFO_UPDATE_SUCCESS,
    updatedEtlInfo
  }
}

const etlTableInfoUpdateHasErrored = (bool) => {
  return {
    type: EtlTableInfoType.ETL_INFO_UPDATE_ERROR,
    bool
  }
}

export function makePostRequestToUpdateEtl(url, updatedData) {
  return (dispatch) => {
    fetch(url, {
      method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData) // body updatedData type must match "Content-Type" header
      })
      .then(res => res.json())
      .then(newEtlInfo => dispatch(etlTableInfoUpdateSuccess(updatedData)))
      .catch(e => dispatch(etlTableInfoUpdateHasErrored(true)))
  }
}

const addNewEtlSuccess = (newEtldata) => {
  return {
    type: EtlTableInfoType.ETL_ADD_SUCCESS,
    newEtldata
  }
}

const addNewEtlHasErrored = (bool) => {
  return {
    type: EtlTableInfoType.ETL_ADD_ERROR,
    bool
  }
}

export function makePostRequestForNewEtl(url, newEtlData) {
  return (dispatch) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newEtlData)
    })
    .then((e) => dispatch(addNewEtlSuccess(newEtlData)))
    .catch(e => dispatch(addNewEtlHasErrored(true)))
  }
}

const deleteEtlSuccess = (etlName) => ({
  type: EtlTableInfoType.ETL_DELETE_SUCCESS,
  etlName
});

const deleteEtlHasErrored = (bool) => ({
  type: EtlTableInfoType.ETL_DELETE_ERROR,
  bool
});

export function makeDeleteRequestToDeleteEtl(url) {
  const nameOfEtl = url.split("/").slice(-1)[0];
  return (dispatch) => {
    fetch(url, {
      "method": "DELETE",
    })
    .then(() => dispatch(deleteEtlSuccess(nameOfEtl)))
    .catch(() => dispatch(deleteEtlHasErrored(true)))
  }
}

export function goResetEtlDeleteSuccess() {
  return {
    type: EtlTableInfoType.ETL_DELETE_RESET
  }
}

export function goResetEtlUpdateSuccess() {
  return {
    type: EtlTableInfoType.ETL_INFO_UPDATE_RESET
  }
}

export function timeFormatIsIncorrect() {
  return {
    type: EtlTableInfoType.ETL_TIME_FORMAT_WRONG
  }
}

export function setEtlAlreadyExist(alreadyExist) {
  console.log("in set etl already exist action function");
  console.log(alreadyExist);
  if (alreadyExist) {
    return {
      type: EtlTableInfoType.ETL_ALREADY_EXIST
    }
  } else {
    return {
      type: EtlTableInfoType.ETL_DOES_NOT_ALREADY_EXIST
    }
  }
}

export function resetEtlUpdateVals() {
  return {
    type: EtlTableInfoType.RESET_ETL_UPDATE_VALUES
  }
}

export default fetchEtlTableInfo;