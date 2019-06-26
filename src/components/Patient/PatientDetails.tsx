import React from "react";
import { useSelector } from "react-redux";
import { Button, Dropdown, Header, Icon } from "semantic-ui-react";
import { getCurrentPatient } from "../../redux/reducers";

const PatientDetails: React.FunctionComponent<{}> = () => {
  const patient = useSelector(getCurrentPatient);

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
          primary
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
    </>
  );
};

export default PatientDetails;
