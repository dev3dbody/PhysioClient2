import React from "react";
import { useSelector } from "react-redux";
import Main from "./Main/Main";
import PatientList from "./Patient/PatientList";
import Appointment from "./Appointment/Appointment";
import Treatment from "./Treatment/Treatment";
import PatientEdit from "./Patient/PatientEdit";
import Scanner from "./Scanner/Scanner";
import { getScreen } from "../redux/reducers";

const Switch: React.FunctionComponent = () => {
  const screen = useSelector(getScreen);
  switch (screen) {
    case "PATIENT":
      return <PatientList />;
    case "ADD_PATIENT":
      return <PatientEdit />;
    case "EDIT_PATIENT":
      return <PatientEdit />;
    case "APPOINTMENT":
      return <Appointment />;
    case "TREATMENT":
      return <Treatment />;
    case "SCANNER":
      return <Scanner />;
    default:
      return <Main />;
  }
};

export default Switch;
