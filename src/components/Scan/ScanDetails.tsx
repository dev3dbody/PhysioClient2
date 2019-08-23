import React, { useState } from "react";
import _ from "lodash";
import { Container, Header, Icon } from "semantic-ui-react";
import { useSelector } from "react-redux";
import {
  getCurrentAppointment,
  getCurrentPatient,
  getCurrentScan
} from "../../redux/reducers";
import MeshViewer from "../MeshViewer/MeshViewer";

const StanDetails = () => {
  const [ready, setReady] = useState(false);
  const scan = useSelector(getCurrentScan);
  const appointment = useSelector(getCurrentAppointment);
  const patient = useSelector(getCurrentPatient);
  if (!scan || !patient || !appointment) {
    return null;
  }
  _.defer(() => setReady(true));
  return (
    <Container>
      <Header as="h2">
        <Icon name="user circle" />
        <Header.Content>
          Wizyta {appointment.visitDate}
          <Header.Subheader>
            {patient.name} {patient.surname}
          </Header.Subheader>
        </Header.Content>
      </Header>
      <MeshViewer data={ready ? scan.mesh : null} />
    </Container>
  );
};

export default StanDetails;
