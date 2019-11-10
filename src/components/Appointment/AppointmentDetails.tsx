import fs from "fs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Button, Dropdown, Header, Icon, Segment } from "semantic-ui-react";
import {
  getCurrentAppointment,
  getCurrentPatient,
  getScansWithPatients,
  getSettingByKey
} from "../../redux/reducers";
import {
  details,
  edit,
  createRequest,
  listRequest,
  loadSettingsRequest
} from "../../redux/actions";
import Scanner from "../../lib/scanner";
import ScanList from "../Scan/ScanList";

const AppointmentDetails: React.FunctionComponent<{}> = () => {
  const patient = useSelector(getCurrentPatient);
  const appointment = useSelector(getCurrentAppointment);
  const dispatch = useDispatch();
  const [busy, setBusy] = useState(false);
  const scans = useSelector(getScansWithPatients);
  const serverHost = useSelector(getSettingByKey)("serverHost");
  const pathToScans = useSelector(getSettingByKey)("pathToScans");

  useEffect(() => {
    dispatch(listRequest("scans"));
    dispatch(loadSettingsRequest());
  }, [dispatch]);

  if (!patient || !appointment) {
    return null;
  }

  return (
    <>
      <Button.Group floated="right">
        <Button
          disabled={busy}
          primary
          onClick={() => {
            setBusy(true);
            const scanner = new Scanner({ serverHost });
            // TODO: Add fake progressbar here for 15 sec.
            scanner.scan((error: any, data: any) => {
              // TODO: Hide progressbar here
              setBusy(false);
              let scanTime = moment().format("YYYY-MM-DD @ HH:mm");
              const scanOrder = scans.length + 1;
              dispatch(
                createRequest("scans", {
                  order: scanOrder,
                  appointmentId: appointment._id,
                  patientId: patient._id,
                  mesh: data,
                  date: scanTime
                })
              );
              // Save here on the disk
              const dir =
                pathToScans +
                "/" +
                patient.surname +
                patient.name +
                "_" +
                patient._id;
              if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
              }
              fs.writeFile(
                dir +
                  "/" +
                  patient.surname +
                  "_" +
                  scanTime +
                  "_ID_" +
                  scanOrder +
                  ".ply",
                new Buffer(data),
                err => {
                  console.log("Error writting mesh=" + err);
                }
              );
            });
          }}
        >
          <Icon name="video camera" />
          Nowe badanie
        </Button>
        <Dropdown
          onChange={() => {
            dispatch(edit("appointments", appointment._id));
          }}
          className="button icon"
          options={[
            { key: "edit", icon: "edit", text: "Modyfikuj", value: "edit" }
          ]}
          trigger={<React.Fragment />}
        />
      </Button.Group>
      <Header as="h2">
        <Icon name="user circle" />
        <Header.Content>
          Wizyta {appointment.visitDate}
          <Header.Subheader>
            {patient.name} {patient.surname}
          </Header.Subheader>
        </Header.Content>
      </Header>
      <Segment>
        {appointment.interview.split("\n").map((line, key) => (
          <p key={key}>{line}</p>
        ))}
      </Segment>
      <ScanList />
      <Button onClick={() => dispatch(details(patient._id))} basic>
        <Icon name="arrow left" /> wróć do szczegółów pacjenta
      </Button>
    </>
  );
};

export default AppointmentDetails;
