const inputData = [
  {
    type: "newEtl",
    label: "Enter New Etl Name",
    instructions: "",
    placeholder: "e.g geoprocessGISData",
    inputId: "newEtlName",
    instructionId: "",
    value: "",
  },
  {
    type: "startTIme",
    label: "Enter Start Time",
    instructions: "Enter time in 00:00:00 format.",
    placeholder: "e.g 12:30:00",
    inputId: "selectedEtlStartTime",
    instructionId: "start-time-help",
    value: "",
  },
  {
    type: "endTime",
    label: "Enter End Time",
    instructions: "Enter time in 00:00:00 format.",
    placeholder: "e.g 12:30:00",
    inputId: "selectedEtlEndTime",
    instructionId: "end-time-help",
    value: ""
  },
  {
    type: "etlPath",
    label: "Enter ETL Path",
    instructions: "",
    placeholder: "e.g C:/ETL/CannabisRetail/CannabisLocation.py",
    inputId: "selectedEtlPath",
    instructionId: "",
    value: ""
  },
]

export default inputData;