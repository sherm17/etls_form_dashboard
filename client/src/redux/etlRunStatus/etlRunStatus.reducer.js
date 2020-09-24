import EtlRunStatusTypes from './etlRunStatus.type';

const INITIAL_STATE = {
  hasErrored: false,
  isLoading: false,
  runStatuses: [],
};

export function etlRunStatuses(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EtlRunStatusTypes.FETCH_SUCCESS:
      return {
        ...state,
        runStatuses: action.runStatusData
      }
    case EtlRunStatusTypes.FETCH_ERROR:
      return {
        ...state,
        hasErrored: action.hasErrored
      }
    case EtlRunStatusTypes.IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }
    default:
      return state;
  }
}
