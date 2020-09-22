import EtlRunStatusTypes from './etlRunStatus.type';

const INITIAL_STATE = {
  hasErrored: false,
  isLoading: false,
  runStatuses: [],
};

export function etlRunStatuses(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EtlRunStatusTypes.FETCH_SUCCESS:
      console.log("FETCH STATUS RUN SUCCESS");
      // get unique run freq days
      const { runStatusData } = action;
      const { data } = runStatusData;
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

// export function etlRunStatusHasErrored(state = false, action) {
//   switch (action.type) {
//     case (EtlRunStatusTypes.FETCH_ERROR):
//       return action.hasErrored
//     default:
//       return state;
//   }
// }

// export function etlRunStatusIsLoading(state = false, action) {
//   switch (action.type) {
//     case (EtlRunStatusTypes.IS_LOADING):
//       return action.isLoading;
//     default:
//       return state;
//   }
// }



