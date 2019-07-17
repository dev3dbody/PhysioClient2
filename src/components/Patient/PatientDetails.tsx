import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Segment, Button, Dropdown, Header, Icon } from "semantic-ui-react";
import { getCurrentPatient } from "../../redux/reducers";
import { edit, navigate } from "../../redux/actions";

const PatientDetails: React.FunctionComponent<{}> = () => {
  const patient = useSelector(getCurrentPatient);
  const dispatch = useDispatch();

  if (!patient) {
    return null;
  }

  return (
    <>
      <Button.Group floated="right">
        <Button primary>
          <Icon name="add to calendar" />
          Nowa wizyta
        </Button>
        <Dropdown
          data-cy="dropdown-button-icon"
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
      <Segment>TUTAJ OSTATNIE WIZYTY</Segment>
      <Button
        data-cy="back-button"
        onClick={() => dispatch(navigate("PATIENT"))}
        basic
      >
        <Icon name="arrow left" /> Wróć
      </Button>
    </>
  );
};

export default PatientDetails;
