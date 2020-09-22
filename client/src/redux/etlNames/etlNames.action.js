import etlNamesType from './etlNames.type';

const etlNamesFetchSuccess = (etlNamesData) => {
  return {
    type: etlNamesType.ETL_NAME_FETCH_SUCCESS,
    etlNamesData
  }
}

const etlNamesFetchHasErrored= (bool) => {
  return {
    type: etlNamesType.ETL_NAME_FETCH_ERROR,
    bool
  }
}

export function fetchEtlNames(url) {
  return (dispatch) => {
    fetch(url)
      .then(res=> {
        return res.json();
      })
      .then(etlNamesResponse => {
        dispatch(etlNamesFetchSuccess(etlNamesResponse))
      })
      .catch(e => {
        dispatch(etlNamesFetchHasErrored(true))
      })
  }
}
