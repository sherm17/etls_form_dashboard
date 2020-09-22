import EtlRunFreqType from './etlRunFreq.type';

const etlTableInfoFetchSuccess = (runFreq) => {
  return {
    type: EtlRunFreqType.RUN_FREQ_INFO_FETCH_SUCCESS,
    runFreq
  }
};

const etlTableInfoFetchHasErrored = (bool) => {
  return {
    type: EtlRunFreqType.RUN_FREQ_INFO_FETCH_ERROR,
    hasErrored: bool
  }
};

const fetchRunFreq = (url) => {
  return (dispatch) => {
    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(runFreqResponse => {
        dispatch(etlTableInfoFetchSuccess(runFreqResponse));
      })
      .catch(e => {
        dispatch(etlTableInfoFetchHasErrored(true));
      });
  }
}

export default fetchRunFreq;