import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Button,
  Dropdown,
  Header,
  Icon,
  Segment,
  Image,
  Table
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
            <Button.Group primary floated="right">
              <Button primary>
                <Icon name="add to calendar" />
                Nowa wizyta
              </Button>
              <Dropdown
                floating
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
      <Grid divided style={{ paddingTop: "0.5em" }}>
        <Grid.Row>
          <Grid.Column width={7} style={{ padding: "0 2em 3em 0" }}>
            <p>
              <strong>Data urodzenia: </strong>
              {patient.birthDate}
            </p>
            <p>
              <strong>Ostatnia wizyta: </strong>24.05.2017
            </p>
            <Header as="h4">Inne informacje:</Header>
            <Segment>
              {patient.comment.split("\n").map((line, key) => (
                <p key={key}>{line}</p>
              ))}
            </Segment>
            <Header as="h3" style={{ margin: "2em 0 1em 0" }}>
              Ostatnie wizyty
            </Header>
            <Table celled style={{ margin: "0" }}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Data i godzina</Table.HeaderCell>
                  <Table.HeaderCell>Notatki</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell width={2}>
                    <Header as="h5" image>
                      <Icon name="checked calendar" />
                      <Header.Content>
                        02.02.2017
                        <Header.Subheader>09:00</Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell width={4}>
                    Nulla nisl quam, porttitor in sem vel, feugiat convallis
                    augue. Fusce efficitur dui ligula, et bibendum dui ultrices
                    at. Aliquam erat volutpat.
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={2}>
                    <Header as="h5" image>
                      <Icon name="checked calendar" />
                      <Header.Content>
                        04.08.2016
                        <Header.Subheader>11:00</Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell width={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque id sem non tellus feugiat dignissim eu vitae
                    nisl.
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={2}>
                    <Header as="h5" image>
                      <Icon name="checked calendar" />
                      <Header.Content>
                        11.05.2016
                        <Header.Subheader>14:15</Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell width={4}>
                    Nullam semper mattis tortor id efficitur.
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={2}>
                    <Header as="h5" image>
                      <Icon name="checked calendar" />
                      <Header.Content>
                        25.06.2015
                        <Header.Subheader>10:00</Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell width={4}>
                    Nam ut egestas orci. Donec cursus massa lacinia ligula
                    varius, nec porta odio dapibus.
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={2}>
                    <Header as="h5" image>
                      <Icon name="checked calendar" />
                      <Header.Content>
                        04.12.2014
                        <Header.Subheader>12:30</Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell width={4}>
                    Ut vel mollis leo. Suspendisse consectetur neque sed gravida
                    ornare. Fusce ipsum urna, ornare vel viverra et, blandit et
                    velit.
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Button
              size="small"
              attached="bottom"
              content="Pokaż starsze wizyty"
            />
          </Grid.Column>
          <Grid.Column width={9} style={{ padding: "0 0 3em 2em" }}>
            <Header as="h4">Ostatnie badanie - 02.02.2017, 09:00</Header>
            <Segment>
              <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
            </Segment>
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
