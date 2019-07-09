import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Button,
  Dropdown,
  Header,
  Icon,
  Segment
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
      <Grid columns={2} stackable>
        <Grid.Row>
          <Grid.Column width={7} style={{ margin: "1em 0.5em 3em 0" }}>
            <Header as="h4">Data urodzenia: {patient.birthDate} </Header>
            <Header as="h4">Data ostatniej wizyty: (DD/MM/YYYY) </Header>
            <Header as="h4">Inne informacje:</Header>
            <Segment>
              Pellentesque habitant morbi tristique senectus. Quisque at gravida
              mauris. Maecenas aliquam, odio dapibus tempor faucibus, sapien
              ante condimentum est, sed feugiat tortor sem at arcu. Vivamus
              egestas sem eget euismod pellentesque.
            </Segment>
          </Grid.Column>
          <Grid.Column width={8} style={{ margin: "1em 0 3em 0.5em" }}>
            <Header as="h4">
              Ostatnia wizyta (data i godzina): (DD/MM/YYYY, 10:30)
            </Header>
            <Header as="h5">Skan z ostatniej wizyty:</Header>
            <p>( tutaj skan )</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Button onClick={() => dispatch(navigate("PATIENT"))} basic>
        <Icon name="arrow left" /> Wróć
      </Button>
    </Container>
  );
};

export default PatientDetails;
