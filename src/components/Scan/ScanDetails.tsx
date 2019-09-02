import React, { useState } from "react";
import _ from "lodash";
import { Button, Container, Header, Icon } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentAppointment,
  getCurrentPatient,
  getCurrentScan
} from "../../redux/reducers";
import MeshViewer from "../MeshViewer/MeshViewer";
import { details } from "../../redux/actions";

const StanDetails = () => {
  const [ready, setReady] = useState(false);
  const scan = useSelector(getCurrentScan);
  const appointment = useSelector(getCurrentAppointment);
  const patient = useSelector(getCurrentPatient);
  const dispatch = useDispatch();
  if (!scan || !patient || !appointment) {
    return null;
  }
  _.defer(() => setReady(true));
  return (
    <Container>
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
