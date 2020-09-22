import EtlTableInfoType from "./etlTableInfo.type";

const INITIAL_STATE = {
  etlInfo: {},
  etlNames: [],
  updateSuccess: null,
  etlAddSuccess: null,
  deleteEtlSuccess: null,
  timeFormatCorrect: null,
  etlAlreadyExist: false
}


export function etlTableInfoReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EtlTableInfoType.ETL_INFO_FETCH_SUCCESS:
      const etlTableInfoData = action.etlTableInfo.data;
      let etlInfoObj = {}
      const etlNamesArr = []
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
      const { name } = updatedEtlInfo;
      const etlInfoCopy = { ...state.etlInfo };
      etlInfoCopy[name] = updatedEtlInfo;

      return {
        ...state,
        etlInfo: etlInfoCopy,
        updateSuccess: true
      }

    case EtlTableInfoType.ETL_ADD_SUCCESS:
      return {
        ...state, 
        etlAddSuccess: true,
        timeFormatCorrect: null,  
      }

    case EtlTableInfoType.ETL_ADD_ERROR:
      console.log("FAIIILED TO ADD ETL TO DATABASE");
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

    case EtlTableInfoType.ETL_DELETE_RESET:
      return {
        ...state,
        deleteEtlSuccess: null,
        timeFormatCorrect: null, 
      }

    case EtlTableInfoType.ETL_INFO_UPDATE_RESET:
      return {
        ...state,
        updateSuccess: null,
        timeFormatCorrect: null,
      }

    case EtlTableInfoType.ETL_TIME_FORMAT_WRONG:
      return {
        ...state,
        timeFormatCorrect: false,
      }

    case EtlTableInfoType.ETL_ALREADY_EXIST: {
      console.log("ETL ALREADY EXCIST");
      return {
        ...state,
        etlAlreadyExist: true
      }
    }

    case EtlTableInfoType.ETL_DOES_NOT_ALREADY_EXIST: {
      return {
        ...state,
        etlAlreadyExist: false
      }
    }

    case EtlTableInfoType.RESET_ETL_UPDATE_VALUES: {
      return {
        ...state,
        updateSuccess: null,
        etlAddSuccess: null,
        deleteEtlSuccess: null,
        timeFormatCorrect: null,
        etlAlreadyExist: false
      }
    }

    default:
      return state;
  }
}