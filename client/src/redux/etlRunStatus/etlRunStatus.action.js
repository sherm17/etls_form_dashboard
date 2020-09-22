import EtlRunStatusTypes from './etlRunStatus.type';

const etlStatusFetchSuccess = (runStatusData) => ({
  type: EtlRunStatusTypes.FETCH_SUCCESS,
  runStatusData
});

const etlStatusHasErrored = (bool) => ({
  type: EtlRunStatusTypes.FETCH_ERROR,
  hasErrored: bool
});

const etlStatusIsLoading = (bool) => ({
  type: EtlRunStatusTypes.IS_LOADING,
  isLoading: bool
});

const fetchRunStatuses = (url) => {
  return (dispatch) => {
    dispatch(etlStatusIsLoading(true));
    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(etlStatusResponse => {
        dispatch(etlStatusIsLoading(false));
        dispatch(etlStatusFetchSuccess(etlStatusResponse));
      })
      .catch(e => {
        dispatch(etlStatusHasErrored(true))
      });
  }
}

export default fetchRunStatuses;