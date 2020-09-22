import { combineReducers } from 'redux';
import { etlRunStatuses } from './etlRunStatus/etlRunStatus.reducer';
import { etlRunFreq } from './etlRunFreq/etlRunFreq.reducer';
import { etlNames } from './etlNames/etlNames.reducer';
import { etlTableInfoReducer } from './etlTableInfo/etlTableInfo.reducer';

const rootReducer = combineReducers({
  etlRunStatuses,
  etlRunFreq,
  etlNames,
  etlTableInfo: etlTableInfoReducer
});

export default rootReducer;