import EtlRunFreqTypes from './etlRunFreq.type';

const INITIAL_STATE = {
  hasErrored: false,
  runFrequencies: [],
}

export function etlRunFreq(state = INITIAL_STATE, action) {
  switch(action.type) {
    case EtlRunFreqTypes.RUN_FREQ_INFO_FETCH_SUCCESS:
      const { runFreq } = action;
      const distinctRunTimes = runFreq.data;  
      return {
        ...state,
        runFrequencies: distinctRunTimes
      };
    case EtlRunFreqTypes.RUN_FREQ_INFO_FETCH_ERROR:
      return {
        ...state,
        hasErrored: action.hasErrored
      }
    default:
      return state;
  }
}

