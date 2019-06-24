import React, { useEffect } from "react";
import { Table, Button, Header, Icon, Segment } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { getPatients } from "../../redux/reducers";
import { edit, navigate, listRequest } from "../../redux/actions";

const Patient: React.FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  const patients = useSelector(getPatients);

  useEffect(() => {
    dispatch(listRequest("patients"));
  }, [dispatch]);

  if (!patients.length) {
    return (
      <Segment placeholder>
        <Header icon>
          <Icon name="user md" />
          Jeszcze nie zarejestrowano żadnego pacjenta
        </Header>
        <Button
          icon="user add"
          primary
          onClick={() => dispatch(navigate("ADD_PATIENT"))}
        >
          Dodaj pacjenta
        </Button>
      </Segment>
    );
  }

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Imię</Table.HeaderCell>
          <Table.HeaderCell>Nazwisko</Table.HeaderCell>
          <Table.HeaderCell>Data urodzenia</Table.HeaderCell>
          <Table.HeaderCell>Inne informacje</Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {patients.map(({ _id, name, surname, birthDate, comment }) => (
          <Table.Row>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{surname}</Table.Cell>
            <Table.Cell>{birthDate}</Table.Cell>
            <Table.Cell>{comment}</Table.Cell>
            <Table.Cell>
              <Button
                icon="edit"
                onClick={() => dispatch(edit("patients", _id))}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default Patient;
