import React, { useEffect } from "react";
import { Header, Icon, Label, Segment, Table } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";

import {
  getCurrentPatient,
  getAppointmentsWithPatients
} from "../../redux/reducers";
import { details, listRequest } from "../../redux/actions";

const AppointmentList: React.FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  const selectedPatient = useSelector(getCurrentPatient);
  const appointments = useSelector(getAppointmentsWithPatients);

  useEffect(() => {
    dispatch(listRequest("appointments"));
  }, [dispatch]);

  if (!appointments.length) {
    return (
      <Segment placeholder>
        <Header icon>
          <Icon name="user md" />
          Jeszcze nie zarejestrowano żadnej wizyty
        </Header>
      </Segment>
    );
  }

  let currentHeader = "";
  let ribbon: JSX.Element | null;

  return (
    <>
      {!selectedPatient && (
        <Header as="h2">
          <Icon name="group" />
          <Header.Content>
            Wizyty
            <Header.Subheader>{appointments.length} rekordów</Header.Subheader>
          </Header.Content>
        </Header>
      )}
      <Table padded selectable fixed>
        <Table.Header>
          <Table.Row>
            {!selectedPatient && <Table.HeaderCell>Pacjent</Table.HeaderCell>}
            <Table.HeaderCell width={5}>Data i godzina wizyty</Table.HeaderCell>
            <Table.HeaderCell width={7}>Inne informacje</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {appointments.map(
            ({ _id, interview, visitDate, patientId, patient }) => (
              <Table.Row
                onClick={() => {
                  dispatch(details(patientId, _id));
                }}
                key={_id}
              >
                {!selectedPatient && (
                  <Table.Cell verticalAlign="top">
                    {patient && `${patient.name} ${patient.surname}`}
                  </Table.Cell>
                )}
                <Table.Cell verticalAlign="top">
                  {selectedPatient && ribbon} {visitDate}
                </Table.Cell>
                <Table.Cell>{interview}</Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table>
    </>
  );
};

export default AppointmentList;
