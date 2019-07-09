import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Button,
  Dropdown,
  Header,
  Icon
} from "semantic-ui-react";
import { getCurrentPatient } from "../../redux/reducers";
import { edit, navigate } from "../../redux/actions";

const PatientDetails: React.FunctionComponent<{}> = () => {
  const patient = useSelector(getCurrentPatient);
  const dispatch = useDispatch();

  if (!patient) {
    return null;
  }

  return (
    <Container>
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column>
            <Header as="h2">
              <Icon name="user circle" />
              <Header.Content>
                {patient.name} {patient.surname}
                <Header.Subheader>Szczegóły Pacjenta</Header.Subheader>
              </Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Button style={{ margin: "2px" }}>Dalej</Button>
            <Button style={{ margin: "2px" }}>Edytuj</Button>
            <Button secondary style={{ margin: "2px" }}>
              Usuń
            </Button>
            <Button.Group primary>
              <Button primary style={{ margin: "2px 0 2px 30px" }}>
                <Icon name="add to calendar" />
                Nowa wizyta
              </Button>
              <Dropdown
                floating
                style={{ margin: "2px" }}
                onChange={() => {
                  console.info("onc");
                  dispatch(edit("patients", patient._id));
                }}
                className="button icon"
                options={[
                  {
                    key: "edit",
                    icon: "edit",
                    text: "Modyfikuj",
                    value: "edit"
                  }
                ]}
                trigger={<React.Fragment />}
              />
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>TUTAJ DANE PACJENTA</Grid.Column>
          <Grid.Column>TUTAJ OSTATNIE WIZYTY</Grid.Column>
          <Grid.Column>TUTAJ SKANY</Grid.Column>
        </Grid.Row>
        <Button onClick={() => dispatch(navigate("PATIENT"))} basic>
          <Icon name="arrow left" /> Wróć
        </Button>
      </Grid>
    </Container>
  );
};

export default PatientDetails;
