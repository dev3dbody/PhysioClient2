import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Form, Button, Icon, Header } from "semantic-ui-react";

import {
  createRequest,
  updateRequest,
  navigate,
  details
} from "../../redux/actions";
import { getCurrentAppointment, getCurrentPatient } from "../../redux/reducers";
import { INewAppointment } from "../../redux/reducers/data";
import moment from "moment";

interface AppointmentEditProps {
  patientId: string;
}

const AppointmentEdit: React.FunctionComponent<AppointmentEditProps> = ({
  patientId
}) => {
  const dispatch = useDispatch();
  const appointment = useSelector(getCurrentAppointment);
  const patient = useSelector(getCurrentPatient);

  let initValues: INewAppointment = {
    patientId,
    interview: "",
    visitDate: moment().format("YYYY-MM-DD")
  };
  let _id: string = "";
  let _rev: string = "";

  if (appointment !== undefined) {
    ({ _id, _rev, ...initValues } = appointment);
  }

  type IFormState = {
    values: INewAppointment;
  };

  const [fields, setFields] = useState({
    values: initValues
  });
  const handleChange = async (field: string, value: string) => {
    setFields((state: IFormState) => ({
      values: { ...state.values, [field]: value }
    }));
  };

  const handleSubmit = async () => {
    return dispatch(
      appointment === undefined
        ? createRequest("appointments", fields.values)
        : updateRequest("appointments", { _id, _rev, ...fields.values })
    );
  };

  return (
    <>
      {patient && (
        <Header as="h2">
          <Icon name="user circle" />
          <Header.Content>
            {patient.name} {patient.surname}
            <Header.Subheader>Nowa wizyta</Header.Subheader>
          </Header.Content>
        </Header>
      )}
      <Form>
        <Form.TextArea
          autoFocus
          data-cy="description"
          value={fields.values.interview}
          label="Inne informacje"
          placeholder="Inne informacje"
          onChange={(_, data) => handleChange("interview", `${data.value}`)}
        />
        <Grid>
          <Grid.Row columns="2">
            <Grid.Column>
              <Button.Group>
                <Button onClick={handleSubmit} positive>
                  Zapisz
                </Button>
                <Button.Or text="lub" />
                <Button
                  onClick={() => dispatch(details("patients", patientId))}
                >
                  Anuluj
                </Button>
              </Button.Group>
            </Grid.Column>
            <Grid.Column textAlign="right">
              {appointment && (
                <Button negative onClick={() => dispatch(navigate("PATIENT"))}>
                  <Icon name="trash" /> Usuń
                </Button>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </>
  );
};

export default AppointmentEdit;
