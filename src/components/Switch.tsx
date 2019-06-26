import React from "react";
import { useSelector } from "react-redux";
import PatientList from "./Patient/PatientList";
import Appointment from "./Appointment/Appointment";
import Treatment from "./Treatment/Treatment";
import PatientEdit from "./Patient/PatientEdit";
import Scanner from "./Scanner/Scanner";
import { getScreen } from "../redux/reducers";
import PatientDetails from "./Patient/PatientDetails";

const Switch: React.FunctionComponent = () => {
  const screen = useSelector(getScreen);
  switch (screen) {
    case "ADD_PATIENT":
      return <PatientEdit />;
    case "EDIT_PATIENT":
      return <PatientEdit />;
    case "PATIENT_DETAILS":
      return <PatientDetails />;
    case "APPOINTMENT":
      return <Appointment />;
    case "TREATMENT":
      return <Treatment />;
    case "SCANNER":
      return <Scanner />;
    default:
      return <PatientList />;
  }
};

export default Switch;
