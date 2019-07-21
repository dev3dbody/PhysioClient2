import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Header, Icon, Segment } from "semantic-ui-react";
import { getCurrentPatient } from "../../redux/reducers";
import { edit, navigate } from "../../redux/actions";
import AppointmentList from "../Appointment/AppointmentList";

const PatientDetails: React.FunctionComponent<{}> = () => {
  const patient = useSelector(getCurrentPatient);
  const dispatch = useDispatch();

  if (!patient) {
    return null;
  }

  return (
    <>
      <Button.Group floated="right">
        <Button primary onClick={() => dispatch(navigate("ADD_APPOINTMENT"))}>
          <Icon name="add to calendar" />
          Nowa wizyta
        </Button>
        <Dropdown
          onChange={() => {
            console.info("onc");
            dispatch(edit("patients", patient._id));
          }}
          className="button icon"
          options={[
            { key: "edit", icon: "edit", text: "Modyfikuj", value: "edit" }
          ]}
          trigger={<React.Fragment />}
        />
      </Button.Group>
      <Header as="h2">
        <Icon name="user circle" />
        <Header.Content>
          {patient.name} {patient.surname}
          <Header.Subheader>Szczegóły Pacjenta</Header.Subheader>
        </Header.Content>
      </Header>
      <Segment>TUTAJ DANE PACJENTA</Segment>
      <AppointmentList patientId={patient._id} />
      <Button onClick={() => dispatch(navigate("PATIENT"))} basic>
        <Icon name="arrow left" /> Wróć do listy pacjentów
      </Button>
    </>
  );
};

export default PatientDetails;
