import React, { useEffect } from "react";
import { Header, Icon, Label, Segment, Table } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
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
      <Segment placeholder data-cy="no-visit-yet-statement">
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
      <Table singleLine selectable padded>
        <Table.Header>
          <Table.Row>
            {!selectedPatient && <Table.HeaderCell>Pacjent</Table.HeaderCell>}
            <Table.HeaderCell>Data i godzina wizyty</Table.HeaderCell>
            <Table.HeaderCell>Inne informacje</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {appointments.map(
            ({ _id, interview, visitDate, patientId, patient }) => {
              const newHeader = moment(visitDate).fromNow();
              if (newHeader !== currentHeader) {
                currentHeader = newHeader;
                ribbon = <Label ribbon>{currentHeader}</Label>;
              } else {
                ribbon = null;
              }
              return (
                <Table.Row
                  onClick={() => {
                    dispatch(details(patientId, _id));
                  }}
                  key={_id}
                >
                  {!selectedPatient && (
                    <Table.Cell>
                      {ribbon}
                      {patient && `${patient.name} ${patient.surname}`}
                    </Table.Cell>
                  )}
                  <Table.Cell>
                    {selectedPatient && ribbon} {visitDate}
                  </Table.Cell>
                  <Table.Cell data-cy="visit-interview">{interview}</Table.Cell>
                </Table.Row>
              );
            }
          )}
        </Table.Body>
      </Table>
    </>
  );
};

export default AppointmentList;
