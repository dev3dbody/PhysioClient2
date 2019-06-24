import React from "react";
import { useSelector } from "react-redux";
import Main from "./Main/Main";
import Patient from "./Patient/Patient";
import Appointment from "./Appointment/Appointment";
import Treatment from "./Treatment/Treatment";
import EditPatient from "./Patient/EditPatient";
import Scanner from "./Scanner/Scanner";
import { getScreen } from "../redux/reducers";

const Switch: React.FunctionComponent = () => {
  const screen = useSelector(getScreen);
  switch (screen) {
    case "PATIENT":
      return <Patient />;
    case "ADD_PATIENT":
      return <EditPatient />;
    case "EDIT_PATIENT":
      return <EditPatient />;
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
