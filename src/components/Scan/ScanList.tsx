import React, { useEffect } from "react";
import { Button, Header, Icon, Label, Segment, Table } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import truncate from 'lodash/truncate';
import {
  getCurrentPatient,
  getScansWithPatients,
  getCurrentAppointment,
  getComparedScansIds
} from "../../redux/reducers";
import {
  compareAdd,
  compareRemove,
  details,
  listRequest
} from "../../redux/actions";


const ScanList: React.FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  const scans = useSelector(getScansWithPatients);
  const comparedScanIds = useSelector(getComparedScansIds);

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
            <Table.HeaderCell>Data i godzina</Table.HeaderCell>
            <Table.HeaderCell>Notatki</Table.HeaderCell>
            <Table.HeaderCell>Porównanie</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {scans.map(({ _id, date, comment, patientId, appointmentId, order }) => {
            const isCompared = !!comparedScanIds.find(id => id === _id);
            return (
              <Table.Row
                onClick={() => {
                  dispatch(details(patientId, appointmentId, _id));
                }}
                key={_id}
              >
                <Table.Cell>{order}</Table.Cell>
                <Table.Cell>{date}</Table.Cell>
                <Table.Cell>{truncate(comment, { length: 32, separator: '...' })}</Table.Cell>
                <Table.Cell className="">
                  {isCompared ? (
                    <Button
                      negative
                      onClick={e => {
                        e.stopPropagation();
                        dispatch(compareRemove(_id));
                      }}
                    >
                      <Icon name="trash" />
                      Usuń z porównania
                    </Button>
                  ) : (
                    <Button
                      positive
                      onClick={e => {
                        e.stopPropagation();
                        dispatch(compareAdd(_id));
                      }}
                    >
                      <Icon name="plus circle" />
                      Dodaj do porównania
                    </Button>
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
};

export default ScanList;
