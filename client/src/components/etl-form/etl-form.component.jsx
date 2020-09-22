import React, { Component } from "react";
import { connect } from "react-redux"
import "./etl-form.style.scss";

// data imports
import checkboxesData from "./checkbox/checkbox.data";
import radioButtonData from "./radioButton/radioButton.data";
import inputData from "./input/input.data";
import textboxData from "./textbox/textbox.data";

// components
import RadioButton from "./radioButton/radioButton.component";
import Input from "./input/input.component";
import CheckboxForRunDay from "./checkbox/checkbox.component";
import Textbox from "./textbox/textbox.component";
import Button from "./button/button.component";

// actions
import { 
  makePostRequestToUpdateEtl, makePostRequestForNewEtl, makeDeleteRequestToDeleteEtl, goResetEtlDeleteSuccess,
  goResetEtlUpdateSuccess, timeFormatIsIncorrect, setEtlAlreadyExist, resetEtlUpdateVals
  } from "../../redux/etlTableInfo/etlTableInfo.action";


const EtlChangeMessage = ({ message }) => {
  return (
    <div>
      {message}
    </div>
  )
}

class EtlForm extends Component {
    constructor(props) {
      super(props)

      this.state = {
        selectedEtlName: "Choose ETL to Edit",

        showDailyRunCheckbox: true,
        days_ran: [],

        selectedEtlStartTime: "",
        selectedEtlEndTime: "",
        selectedEtlPath: "",
        selectedEtlDataAffect: "",
        selectedEtlDesc: "",
        selectedEtlComments: "",
        selectedEtlRunTime: "Daily",

        newEtlName: ""
      }
    }

    componentDidMount() {
      const {resetEtlUpdateVals } = this.props;
      resetEtlUpdateVals();
    }
    

    handleEtlSelection = (e) => {
      /*
        Handle etl selection menun change. Update state with info about etl
      */

      const { resetEtlDeleteSuccess, resetEtlUpdateSuccess } = this.props;
      resetEtlDeleteSuccess();
      resetEtlUpdateSuccess();
      // console.log(this.props);

      e.preventDefault();
      const etlName = e.target.value;
      const selectedEtlKey = e.target.key;

      // Default values
      let showDailyRunCheckbox = true;
      let days_ran = [];
      let selectedEtlStartTime = "";
      let selectedEtlEndTime = "";
      let selectedEtlPath = "";
      let selectedEtlDataAffect = "";
      let selectedEtlDesc = "";
      let selectedEtlComments = "";
      let selectedEtlRunTime = "";
      let isRanDaily = true;
      let start_time = "", end_time = "";
      let etl_path = "";
      let data_affected = "";
      let run_frequency = "";
      let comments = "";
      let description = "";
      let selectedEtlName = etlName;

      if (etlName !== "Choose ETL to Edit") {
        // Overwrite default values with selected etl info
        const { etlInfo } = this.props;
        const selectedEtlInfo = etlInfo[etlName];

        comments = selectedEtlInfo.comments;
        data_affected = selectedEtlInfo.data_affected;
        description = selectedEtlInfo.description;
        end_time = selectedEtlInfo.end_time;
        etl_path = selectedEtlInfo.etl_path;
        run_frequency = selectedEtlInfo.run_frequency;
        start_time = selectedEtlInfo.start_time;
        days_ran = selectedEtlInfo.days_ran;
        isRanDaily = selectedEtlInfo.showDailyRunCheckbox;

        selectedEtlName = etlName;
        
      }

      this.setState({
        selectedEtlName: selectedEtlName,

        selectedEtlStartTime: start_time,
        selectedEtlEndTime: end_time,
        selectedEtlPath: etl_path,

        showDailyRunCheckbox: isRanDaily,
        days_ran: days_ran,
        selectedEtlRunTime: run_frequency,

        selectedEtlDataAffect: data_affected,
        selectedEtlDesc: description,
        selectedEtlComments: comments,

      }, () => console.log(this.state));
    }

    toggleRadioButton = (e) => {
      /*
        Handle radio button toggle - used to update newRunFreq and showDailyRunCheckBox 
        in state. showDailyRunCheckBox is used to display checkboxes for Monday-Friday
      */
      const { showDailyRunCheckbox, selectedEtlRunTime } = this.state;
      let newRunFreq = "Daily";

      if (showDailyRunCheckbox) {
        newRunFreq = "Multiple-Days";
      }

      this.setState({
        showDailyRunCheckbox: !this.state.showDailyRunCheckbox,
        selectedEtlRunTime: newRunFreq
      }, () => console.log(this.state));
    }

    handleWeeklyRunDayCheck = (e) => {
      /*
        Updates days_ran variable in state to include 
      */
      const currCheckedDay = e.target.value;
      const checkboxIsChecked = e.target.checked;
      if (checkboxIsChecked) {
        this.setState({
          days_ran: [...this.state.days_ran, currCheckedDay]
        }, () => console.log(this.state.days_ran));
      } else {
        const filterOutDay = this.state.days_ran.filter(day => day !== currCheckedDay);
        this.setState({
          days_ran: [...filterOutDay]
        }, () => console.log(this.state.days_ran))
      }
    }

    replaceNullWithEmptyString = val => {
      return val == null ? "" : val;
    }

    constructEtlSelectionMenu = (etlNamesList) => {
      const { selectedEtlName } = this.state;
      const etlNameSelections = [<option value="Choose ETL to Edit" key={"default"} >Choose ETL to Edit</option>]

      if (etlNamesList) {
        etlNamesList.forEach(name => {
          etlNameSelections.push(<option key={name} value={name}>{name}</option>)
        });
      }

      return <select className="custom-select"
        value={selectedEtlName}
        onChange={this.handleEtlSelection}
      >
        {etlNameSelections}
      </select>

    }

    handleInputChange = (e) => {
      let currInputVal = e.target.value;
      const inputName = e.target.name;

      // currInputVal = currInputVal == "" ? null : currInputVal;
      this.setState({
        [inputName]: currInputVal
      }, () => console.log(this.state));
    }

    handleTextboxChange = (e) => {
      const textboxVal = e.target.value;
      const name = e.target.name;
      let textTypeToUpdate;
      if (name === "ETL Comments") {
        textTypeToUpdate = "selectedEtlComments";
      } else if (name === "Data Affected") {
        textTypeToUpdate = "selectedEtlDataAffect";
      } else if (name === "ETL Description") {
        textTypeToUpdate = "selectedEtlDesc";
      }
      this.setState({
        [textTypeToUpdate]: textboxVal
      });
    }

    timeIsCorrectFormat = (timeStr) => {
      console.log(timeStr);
      return /^\d\d:\d\d:\d\d$/.test(timeStr);
    }

    handleSubmit = (e) => {
      /*
        Handles form submit
      */
      e.preventDefault();

      const etlUrlEndPoint = "http://localhost:3001/etl/";
      const createetlUrl = "";
      
      const { 
        selectedEtlName, selectedEtlStartTime, selectedEtlEndTime,
        selectedEtlPath, selectedEtlDataAffect, selectedEtlDesc,
        selectedEtlComments, selectedEtlRunTime, days_ran, showDailyRunCheckbox, newEtlName
      } = this.state;

      const { 
        updateEtlInfo, isEditing, createNewEtl, setTimeFormatIncorrect, etlInfo, setEtlAlreadyExist 
      } = this.props;

      
      const startTimeIsValidFormat = this.timeIsCorrectFormat(selectedEtlStartTime);
      const endTimeIsValidFormat = this.timeIsCorrectFormat(selectedEtlEndTime);

      const updatedEtlInfo = {
        name:  isEditing ? selectedEtlName : newEtlName,
        description: selectedEtlDesc,
        data_affected: selectedEtlDataAffect,
        comments: selectedEtlComments,
        run_frequency: selectedEtlRunTime,
        start_time: selectedEtlStartTime,
        end_time: selectedEtlEndTime,
        etl_path: selectedEtlPath,
        days_ran: days_ran,
        showDailyRunCheckbox
      }

      if (startTimeIsValidFormat && endTimeIsValidFormat) {
        if (isEditing) { 
          updateEtlInfo(etlUrlEndPoint, updatedEtlInfo);
        } else {
          const etlAlreadyExist = etlInfo.hasOwnProperty(newEtlName);
          if (etlAlreadyExist) {
            setEtlAlreadyExist(true)
          } else {
            createNewEtl(etlUrlEndPoint, updatedEtlInfo);
            setEtlAlreadyExist(false)
          }
        }
      } else {
        setTimeFormatIncorrect();
      }
    }

    handleDeletingEtl = (e) => {
      e.preventDefault();
      const { selectedEtlName } = this.state;
      const { deleteEtl } = this.props;
      const deleteEtlUrl = `http://localhost:3001/etl/${selectedEtlName}`;

      deleteEtl(deleteEtlUrl);

      // reset state values to original values as if landed 
      // on page for first time
      this.setState({
        selectedEtlName: "",

        showDailyRunCheckbox: "Choose ETL to Edit",
        days_ran: [],

        selectedEtlStartTime: "",
        selectedEtlEndTime: "",
        selectedEtlPath: "",
        selectedEtlDataAffect: "",
        selectedEtlDesc: "",
        selectedEtlComments: "",
        selectedEtlRunTime: "",

        newEtlName: "",

      }, () => console.log(this.state))
    }


    render() {
      console.log("----rerendering------");
      let { showDailyRunCheckbox, selectedEtlStartTime, selectedEtlEndTime,
        selectedEtlDataAffect, selectedEtlDesc, selectedEtlPath,
        selectedEtlComments, selectedEtlRunTime, selectedEtlName, newEtlName
      } = this.state;

      const { 
        isEditing, etlDeleteWasSuccessful, etlUpdateWasSuccessful, etlAddWasSuccessful, timeFormatEntryIsCorrect, etlAlreadyExist,
        etlInfo
      } = this.props;
      let displayMessageForSubmit;

      if (etlDeleteWasSuccessful !== null) {
        if (etlDeleteWasSuccessful) {
          displayMessageForSubmit = "ETL delete successful";
        } else if (!etlDeleteWasSuccessful) {
          displayMessageForSubmit = "ETL delete was not successful. An error may have occured";
        }
      }

      if (etlUpdateWasSuccessful !== null) {
        if (etlUpdateWasSuccessful) {
          displayMessageForSubmit = "ETL update was successful";
        } else if (! etlUpdateWasSuccessful) {
          displayMessageForSubmit = "ETL update was not successful. An error may have occured";
        }
      }

      if (etlAddWasSuccessful !== null) {
        if (etlAddWasSuccessful) {
          displayMessageForSubmit = "ETL add was successful";
        } else if (! etlAddWasSuccessful) {
          displayMessageForSubmit = "ETL add was not successful. An error may have occured";
        }
      }

      if (timeFormatEntryIsCorrect !== null) {
        if (!timeFormatEntryIsCorrect) {
          displayMessageForSubmit = "Time format is incorrect";
        }
      }

      if (etlAlreadyExist) {
        displayMessageForSubmit = "ETL name already exist. Please choose another name";
      }
  
      selectedEtlComments = this.replaceNullWithEmptyString(selectedEtlComments);
      selectedEtlStartTime = this.replaceNullWithEmptyString(selectedEtlStartTime);
      selectedEtlEndTime = this.replaceNullWithEmptyString(selectedEtlEndTime);
      selectedEtlDataAffect = this.replaceNullWithEmptyString(selectedEtlDataAffect);
      selectedEtlDesc = this.replaceNullWithEmptyString(selectedEtlDesc);
      selectedEtlPath = this.replaceNullWithEmptyString(selectedEtlPath);

      const { etlNames } = this.props;
      
      // console.log(etlNames);
      const etlNameSelectionMenu = this.constructEtlSelectionMenu(etlNames);

      let disableButton;
      
      if (isEditing) {
        disableButton = selectedEtlName === "Choose ETL to Edit" ? true : false;
      } else {
        disableButton = newEtlName.length === 0 ? true : false;
      }

      // create multiple inputs based on data/label passed in
      const inputsDisplay = inputData.map(data => {
        const { type } = data;
        if (isEditing && type === "newEtl") return

        let currVal;
        switch (type) {
          case "startTIme":
            currVal = selectedEtlStartTime;
            break;
          case "endTime":
            currVal = selectedEtlEndTime;
            break;
          case "etlPath":
            currVal = selectedEtlPath;
            break;
          case "dataAffected":
            currVal = selectedEtlDataAffect
            break;
          default:
            break;
        }
        return (
          <Input
            key={type}
            val={currVal}
            {...data}
            handleInputChange={this.handleInputChange}
          />
        );
      });

      const radioButtonDisplay = radioButtonData.map(data => {
        const { label } = data;
        const { showDailyRunCheckbox } = this.state;
        let checked = showDailyRunCheckbox;

        if (label == "Weekly") {
          checked = !showDailyRunCheckbox
        }

        return (
          <RadioButton
            key={label}
            toggleRadioButton={this.toggleRadioButton}
            checked={checked}
            {...data}
          />
        )
      });

      const textboxDisplay = textboxData.map(data => {
        const { label, val } = data;

        let currText;
        switch (label) {
          case "Data Affected":
            currText = selectedEtlDataAffect;
            break;
          case "ETL Comments":
            currText = selectedEtlComments;
            break;
          case "ETL Description":
            currText = selectedEtlDesc;
            break;
          default:
            break;
        }
        return (
          <Textbox
            key={label}
            val={currText}
            {...data}
            handleTextboxChange={this.handleTextboxChange}
          />
        )
      });

      const checkBoxesDisplay = checkboxesData.map(data => {
        const { days_ran, showDailyRunCheckbox } = this.state;
        const { label } = data;
        let isChecked = false;

        if (!showDailyRunCheckbox) {
          if (days_ran.includes(label)) {
            isChecked = true;
          }
        }

        return (
          <CheckboxForRunDay
            isChecked={isChecked}
            {...data}
            handleWeeklyRunDayCheck={this.handleWeeklyRunDayCheck}
          />
        )
      });

      return (
        <div className="edit-form-container">
          <form className="" >
            {
              isEditing ? etlNameSelectionMenu : ""
            }
            {
              inputsDisplay
            }
            {
              radioButtonDisplay
            }
            {
              showDailyRunCheckbox ? "" : checkBoxesDisplay
            }
            {
              textboxDisplay
            }
            <Button 
              isDisabled={disableButton}
              className={`btn btn-primary ${selectedEtlName ? "" : "disabled"}`}
              handleClick={this.handleSubmit}
            >
              Submit
            </Button>
          {
            isEditing ?    
            <Button
              isDisabled={disableButton}
              className={`btn btn-danger ${selectedEtlName ? "" : "disabled"}`}
              handleClick={this.handleDeletingEtl}
            >
            Delete
            </Button>
            :
            ""
          }

          </form>
          {
            selectedEtlName === "Choose ETL to Edit" && isEditing? <p className="red">Please select an ETL to edit</p> : ""
          }
          <EtlChangeMessage message={displayMessageForSubmit} />
        </div>
      )
    }
  }

const mapStateToProps = (state) => {
  const etlNamesList = state.etlTableInfo.etlNames;
  const etlInfoObj = state.etlTableInfo.etlInfo;
  const etlDeleteIsSuccessful = state.etlTableInfo.deleteEtlSuccess;
  const etlUpdateIsSuccessful = state.etlTableInfo.updateSuccess;
  const etlAddIsSuccessful = state.etlTableInfo.etlAddSuccess;
  const etlTimeFormatIsCorrect = state.etlTableInfo.timeFormatCorrect
  const etlAlreadyExist = state.etlTableInfo.etlAlreadyExist
  // Do a check to see if dispatch has finished
  if (etlNamesList) {
    return {
      etlNames: etlNamesList,
      etlInfo: etlInfoObj,
      etlDeleteWasSuccessful: etlDeleteIsSuccessful,
      etlUpdateWasSuccessful: etlUpdateIsSuccessful,
      etlAddWasSuccessful: etlAddIsSuccessful,
      timeFormatEntryIsCorrect:  etlTimeFormatIsCorrect,
      etlAlreadyExist: etlAlreadyExist

    }
  } else {
    return {
      etlName: undefined,
      etlInfo: undefined
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateEtlInfo: (url, data) => dispatch(makePostRequestToUpdateEtl(url, data)),
    createNewEtl: (url, data) => dispatch(makePostRequestForNewEtl(url, data)),
    deleteEtl: (url) => dispatch(makeDeleteRequestToDeleteEtl(url)),
    resetEtlDeleteSuccess: () => dispatch(goResetEtlDeleteSuccess()),
    resetEtlUpdateSuccess: () => dispatch(goResetEtlUpdateSuccess()),
    setTimeFormatIncorrect: () => dispatch(timeFormatIsIncorrect()),
    setEtlAlreadyExist: (bool) => dispatch(setEtlAlreadyExist(bool)),
    resetEtlUpdateVals: () => dispatch(resetEtlUpdateVals())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EtlForm);
