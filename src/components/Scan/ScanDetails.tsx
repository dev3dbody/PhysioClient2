import React, { useState } from "react";
import _ from "lodash";
import { Button, Container, Dropdown, Header, Icon } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentAppointment,
  getCurrentPatient,
  getCurrentScan,
  isScanCompared
} from "../../redux/reducers";
import MeshViewer from "../MeshViewer/MeshViewer";
import {
  compareAdd,
  compareRemove,
  details,
  removeRequest
} from "../../redux/actions";

const StanDetails = () => {
  const [ready, setReady] = useState(false);
  const scan = useSelector(getCurrentScan);
  const appointment = useSelector(getCurrentAppointment);
  const patient = useSelector(getCurrentPatient);
  const isCompared = useSelector(isScanCompared);
  const dispatch = useDispatch();
  if (!scan || !patient || !appointment) {
    return null;
  }
  _.defer(() => setReady(true));
  return (
    <Container>
      <Button.Group floated="right">
        <Button
          positive={!isCompared}
          negative={isCompared}
          onClick={() => {
            dispatch(
              isCompared ? compareRemove(scan._id) : compareAdd(scan._id)
            );
          }}
        >
          <Icon name={isCompared ? "trash" : "plus circle"} />
          {isCompared ? "Usuń z porównania" : "Dodaj do porównania"}
        </Button>
        <Dropdown
          onChange={() => {
            dispatch(removeRequest("scans", scan));
            dispatch(details(patient._id, appointment._id));
          }}
          className="button icon"
          options={[
            { key: "edit", icon: "delete", text: "Usuń", value: "edit" }
          ]}
          trigger={<React.Fragment />}
        />
      </Button.Group>
      <Header as="h2">
        <Icon name="user circle" />
        <Header.Content>
          Badanie nr {scan.order}
          <Header.Subheader>
            {patient.name} {patient.surname} z dnia {appointment.visitDate}
          </Header.Subheader>
        </Header.Content>
      </Header>
      <MeshViewer data={ready ? scan.mesh : null} />
      <Button
        onClick={() => dispatch(details(patient._id, appointment._id))}
        basic
      >
        <Icon name="arrow left" /> wróć do wizyty
      </Button>
    </Container>
  );
};

export default StanDetails;
