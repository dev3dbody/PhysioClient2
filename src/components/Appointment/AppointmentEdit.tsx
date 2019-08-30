import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Form, Button, Icon, Header } from "semantic-ui-react";
import { DateTimeInput } from "semantic-ui-calendar-react";
import moment from "moment";

import {
  removeRequest,
  createRequest,
  updateRequest,
  navigate,
  details
} from "../../redux/actions";
import { getCurrentAppointment, getCurrentPatient } from "../../redux/reducers";
import { INewAppointment } from "../../redux/reducers/data";

interface AppointmentEditProps {
  patientId: string;
}

const AppointmentEdit: React.FunctionComponent<AppointmentEditProps> = ({
  patientId
}) => {
  const dispatch = useDispatch();
  const appointment = useSelector(getCurrentAppointment);
  const patient = useSelector(getCurrentPatient);
  const dateFormat = "YYYY-MM-DD @ HH:mm";

  let initValues: INewAppointment = {
    patientId,
    interview: "",
    visitDate: moment().format(dateFormat)
  };
  let _id = "";
  let _rev = "";

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

  const handleSubmit = async () =>
    dispatch(
      appointment === undefined
        ? createRequest("appointments", fields.values)
        : updateRequest("appointments", { _id, _rev, ...fields.values })
    );

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
        <Form.Field>
          <label>Data wizyty</label>
          <DateTimeInput
            duration={0}
            closable
            closeOnMouseLeave
            dateFormat={dateFormat}
            localization="pl"
            placeholder="Data wizyty"
            value={fields.values.visitDate}
            iconPosition="right"
            popupPosition="bottom right"
            onChange={(e, { value, format }) => {
              if (value) {
                const date = moment(value, format);
                if (date.isValid()) {
                  handleChange("visitDate", date.format(dateFormat));
                } else {
                  handleChange("visitDate", "");
                }
              }
            }}
          />
        </Form.Field>
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
                <Button
                  data-cy="visit-save-button"
                  onClick={handleSubmit}
                  positive
                >
                  Zapisz
                </Button>
                <Button.Or text="lub" />
                <Button
                  data-cy="visit-cancel-button"
                  onClick={() => dispatch(details(patientId))}
                >
                  Anuluj
                </Button>
              </Button.Group>
            </Grid.Column>
            <Grid.Column textAlign="right">
              {appointment && (
                <Button
                  data-cy="visit-delete-button"
                  negative
                  onClick={() => {
                    dispatch(navigate("PATIENT"));
                    dispatch(removeRequest("appointments", appointment));
                  }}
                >
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
