import React, { useEffect } from "react";
import { Header, Icon, Label, Segment, Table } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentPatient,
  getScans,
  getCurrentAppointment
} from "../../redux/reducers";
import { details, listRequest } from "../../redux/actions";

const ScanList: React.FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  const selectedPatient = useSelector(getCurrentPatient);
  const selectedAppointment = useSelector(getCurrentAppointment);
  const scans = useSelector(getScans);

  useEffect(() => {
    dispatch(listRequest("scans"));
  }, [dispatch]);

  if (!scans.length) {
    return (
      <Segment placeholder>
        <Header icon>
          <Icon name="user md" />
          Jeszcze nie zarejestrowano żadnego badania
        </Header>
      </Segment>
    );
  }

  return (
    <>
      <Table singleLine selectable padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nr badania</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {scans.map(({ _id, patientId, order }) => {
            return (
              <Table.Row
                onClick={() => {
                  dispatch(details(patientId, _id));
                }}
                key={_id}
              >
                <Table.Cell>{order}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
};

export default ScanList;
