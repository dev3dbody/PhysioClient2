import React from "react";
import { useSelector } from "react-redux";
import PatientList from "./Patient/PatientList";
import AppointmentList from "./Appointment/AppointmentList";
import ScanList from "./Scan/ScanList";
import ScanDetails from "./Scan/ScanDetails";
import PatientEdit from "./Patient/PatientEdit";
import Scanner from "./Scanner/Scanner";
import { getCurrentPatient, getScreen } from "../redux/reducers";
import PatientDetails from "./Patient/PatientDetails";
import AppointmentDetails from "./Appointment/AppointmentDetails";
import AppointmentEdit from "./Appointment/AppointmentEdit";
import Settings from "./Settings";
import Compare from "./Compare";

const Switch: React.FunctionComponent = () => {
  const screen = useSelector(getScreen);
  const patient = useSelector(getCurrentPatient);
  switch (screen) {
    case "EDIT_APPOINTMENT":
    case "ADD_APPOINTMENT":
      return <AppointmentEdit patientId={patient ? patient._id : ""} />;
    case "EDIT_PATIENT":
    case "ADD_PATIENT":
      return <PatientEdit />;
    case "PATIENT_DETAILS":
      return <PatientDetails />;
    case "APPOINTMENT_DETAILS":
      return <AppointmentDetails />;
    case "SCAN_DETAILS":
      return <ScanDetails />;
    case "APPOINTMENT":
      return <AppointmentList />;
    case "TREATMENT":
      return <ScanList />;
    case "SETTINGS":
      return <Settings />;
    case "COMPARE":
      return <Compare />;
    case "SCANNER":
      return <Scanner />;
    default:
      return <PatientList />;
  }
};

export default Switch;
