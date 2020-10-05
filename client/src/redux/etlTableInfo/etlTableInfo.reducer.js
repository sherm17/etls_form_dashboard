import EtlTableInfoType from "./etlTableInfo.type";

const INITIAL_STATE = {
  etlInfo: {},
  etlNames: [],
  updateSuccess: null,
  etlAddSuccess: null,
  deleteEtlSuccess: null,
  timeFormatCorrect: null,
  etlAlreadyExist: false,
  etlRunTimeFormatCorrect: true
}

const startingState = {
  updateSuccess: null,
  etlAddSuccess: null,
  deleteEtlSuccess: null,
  timeFormatCorrect: null,
  etlAlreadyExist: false,
  etlRunTimeFormatCorrect: true
}

export function etlTableInfoReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EtlTableInfoType.ETL_INFO_FETCH_SUCCESS:
      const etlTableInfoData = action.etlTableInfo.data;
      let etlInfoObj = {}
      const etlNamesArr = [];
      etlTableInfoData.forEach(etlInfo => {
        const { name, run_frequency } = etlInfo;
        const existingEtlInfo = etlInfoObj[name];

        if (existingEtlInfo) {
          existingEtlInfo.run_frequency = "Multiple-Days"
          existingEtlInfo.days_ran.push(run_frequency)
        } else {
          etlNamesArr.push(name);
          if (run_frequency === "Daily") {
            etlInfo["showDailyRunCheckbox"] = true;
            etlInfo["days_ran"] = [];
          } else {
            etlInfo["days_ran"] = [run_frequency];
            etlInfo["showDailyRunCheckbox"] = false;
          }
          etlInfoObj[name] = etlInfo;
        }
      });

      return {
        ...state,
        etlInfo: etlInfoObj,
        etlNames: etlNamesArr
      }

    case EtlTableInfoType.ETL_INFO_UPDATE_SUCCESS:
      const { updatedEtlInfo } = action;
      const etlInfoCopy = { ...state.etlInfo };

      var { name } = updatedEtlInfo;
      etlInfoCopy[name] = updatedEtlInfo;

      return {
        ...state,
        etlInfo: etlInfoCopy,
        updateSuccess: true, 
        timeFormatCorrect: null,
        etlRunTimeFormatCorrect: true
      }

    case EtlTableInfoType.ETL_INFO_UPDATE_ERROR:
      return {
        ...state,
        updateSuccess: false
      }

    case EtlTableInfoType.ETL_ADD_SUCCESS:
      const { newEtlData } = action;
      const newEtlName = newEtlData.name;
      const etlInfoToModify = { ...state.etlInfo };
      etlInfoToModify[newEtlName] = newEtlData;
      return {
        ...state, 
        etlInfo: etlInfoToModify,
        etlAddSuccess: true,
        timeFormatCorrect: null,  
        updateSuccess: null,
        etlRunTimeFormatCorrect: true,
        etlAlreadyExist: false
      }

    case EtlTableInfoType.ETL_ADD_ERROR:
      return {
        ...state,
        etlAddSuccess: false,
        timeFormatCorrect: null,
      }

    case EtlTableInfoType.ETL_DELETE_SUCCESS:
      const { etlName } = action;
      const copyOfEtlInfo = { ...state.etlInfo };
      const copyOfEtlNames = [...state.etlNames];

      delete copyOfEtlInfo[etlName];

      return {
        ...state,
        etlInfo: copyOfEtlInfo,
        deleteEtlSuccess: true,
        etlNames: copyOfEtlNames.filter(name =>  name !== etlName),
        timeFormatCorrect: null,
      }

    case EtlTableInfoType.ETL_TIME_FORMAT_WRONG:
      return {
        ...state,
        ...startingState,
        timeFormatCorrect: false,
      }

    case EtlTableInfoType.ETL_ALREADY_EXIST: {
      return {
        ...state,
        ...startingState,
        etlAlreadyExist: true
      }
    }

    case EtlTableInfoType.ETL_DOES_NOT_ALREADY_EXIST: {
      return {
        ...state,
        ...startingState,
        etlAlreadyExist: false
      }
    }

    case EtlTableInfoType.RESET_ETL_UPDATE_VALUES: {
      return {
        ...state,
        ...startingState
      }
    }

    case EtlTableInfoType.ETL_TIME_FORMAT_INCORRECT: {
      return {
        ...state,
        ...startingState,
        etlRunTimeFormatCorrect: false,
        
      }
    }

    default:
      return state;
  }
}