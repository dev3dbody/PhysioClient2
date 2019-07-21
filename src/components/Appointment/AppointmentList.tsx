import React, { useEffect } from "react";
import { Header, Icon, Label, Segment, Table } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { getAppointments, getPatients } from "../../redux/reducers";
import { details, listRequest } from "../../redux/actions";
import moment from "moment";

interface AppointmentListProps {
  patientId?: string;
}

const AppointmentList: React.FunctionComponent<AppointmentListProps> = ({
  patientId: selectedPatientId
}) => {
  const dispatch = useDispatch();
  let appointments = useSelector(getAppointments);
  const patients = useSelector(getPatients);

  if (selectedPatientId) {
    appointments = appointments.filter(
      appointment => appointment.patientId === selectedPatientId
    );
  }

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

  let currentHeader: string = "";
  let ribbon: JSX.Element | null;

  return (
    <>
      <Header as="h2">
        <Icon name="group" />
        <Header.Content>
          Wizyty
          <Header.Subheader>{appointments.length} rekordów</Header.Subheader>
        </Header.Content>
      </Header>
      <Table singleLine selectable padded>
        <Table.Header>
          <Table.Row>
            {!selectedPatientId && <Table.HeaderCell>Pacjent</Table.HeaderCell>}
            <Table.HeaderCell>Data i godzina wizyty</Table.HeaderCell>
            <Table.HeaderCell>Inne informacje</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {appointments.map(({ _id, interview, visitDate, patientId }) => {
            const newHeader = moment(visitDate).fromNow();
            if (newHeader !== currentHeader) {
              currentHeader = newHeader;
              ribbon = <Label ribbon>{currentHeader}</Label>;
            } else {
              ribbon = null;
            }
            const patient = patients.find(patient => patient._id === patientId);
            return (
              <Table.Row
                onClick={() => {
                  dispatch(details("patients", patientId));
                  dispatch(details("appointments", _id));
                }}
                key={_id}
              >
                {!selectedPatientId && (
                  <Table.Cell>
                    {ribbon}
                    {patient && `${patient.name} ${patient.surname}`}
                  </Table.Cell>
                )}
                <Table.Cell>
                  {selectedPatientId && ribbon} {visitDate}
                </Table.Cell>
                <Table.Cell>{interview}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
};

export default AppointmentList;
