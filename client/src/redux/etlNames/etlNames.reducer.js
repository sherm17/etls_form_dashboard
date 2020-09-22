import etlNamesType from './etlNames.type';


export function etlNames(state = [], action) {
  switch(action.type) {
    case etlNamesType.ETL_NAME_FETCH_SUCCESS:
      return {
        ...action.etlNamesData
      }
    default:
      return state
  }
}

