import React, { useEffect } from "react";
import { Label, Table, Button, Header, Icon, Segment } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { getPatients } from "../../redux/reducers";
import { details, navigate, listRequest } from "../../redux/actions";

const PatientList: React.FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  const patients = useSelector(getPatients);

  useEffect(() => {
    dispatch(listRequest("patients", { sortBy: "surnname" }));
  }, [dispatch]);

  if (!patients.length) {
    return (
      <Segment placeholder>
        <Header icon>
          <Icon name="user md" />
          Jeszcze nie zarejestrowano żadnego pacjenta
        </Header>
        <Button primary onClick={() => dispatch(navigate("ADD_PATIENT"))}>
          <Icon name="add user" /> Dodaj pacjenta
        </Button>
      </Segment>
    );
  }

  let currentLetter: string = "";
  let ribbon: JSX.Element | null;

  return (
    <>
      <Button primary onClick={() => dispatch(navigate("ADD_PATIENT"))}>
        <Icon name="add user" /> Dodaj pacjenta
      </Button>
      <Table singleLine selectable padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Imię i Nazwisko</Table.HeaderCell>
            <Table.HeaderCell>Data urodzenia</Table.HeaderCell>
            <Table.HeaderCell>Inne informacje</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {patients.map(({ _id, name, surname, birthDate, comment }) => {
            if (surname && currentLetter !== surname[0].toUpperCase()) {
              currentLetter = surname[0].toUpperCase();
              ribbon = <Label ribbon>{surname[0].toUpperCase()}</Label>;
            } else {
              ribbon = null;
            }
            return (
              <Table.Row
                onClick={() => dispatch(details("patients", _id))}
                key={_id}
              >
                <Table.Cell>
                  {ribbon}
                  {name} {surname}
                </Table.Cell>
                <Table.Cell>{birthDate}</Table.Cell>
                <Table.Cell>{comment}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
};

export default PatientList;
