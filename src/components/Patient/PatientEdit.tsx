import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Form, Button, Icon } from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

import { createRequest, updateRequest, navigate } from "../../redux/actions";
import { getCurrentPatient } from "../../redux/reducers";

const PatientEdit: React.FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  const patient = useSelector(getCurrentPatient);
  const initValues = patient || {
    name: "",
    surname: "",
    birthDate: "",
    comment: ""
  };

  const [values, setValues] = useState(initValues);
  const handleChange = (field: string, value: string) =>
    setValues(state => ({ ...state, [field]: value }));

  const handleSubmit = () =>
    dispatch(
      patient
        ? updateRequest("patients", values as any)
        : createRequest("patients", values)
    );

  return (
    <Form>
      <Form.Input
        data-cy="first_name"
        value={values.name}
        fluid
        label="Imię"
        placeholder="Imię"
        onChange={(_, data) => handleChange("name", data.value)}
      />
      <Form.Input
        data-cy="last_name"
        value={values.surname}
        fluid
        label="Nazwisko"
        placeholder="Nazwisko"
        onChange={(_, data) => handleChange("surname", data.value)}
      />
      <SemanticDatepicker
        date={new Date(values.birthDate)}
        type="basic"
        onDateChange={newDate => {
          if (newDate) {
            handleChange("birthDate", newDate.toString());
          }
        }}
      />
      <Form.Input
        data-cy="description"
        value={values.comment}
        fluid
        label="Inne informacje"
        placeholder="Inne informacje"
        onChange={(_, data) => handleChange("comment", data.value)}
      />
      <Grid>
        <Grid.Row columns="2">
          <Grid.Column>
            <Button.Group>
              <Button onClick={handleSubmit} positive>
                Zapisz
              </Button>
              <Button.Or text="lub" />
              <Button onClick={() => dispatch(navigate("PATIENT"))}>
                Anuluj
              </Button>
            </Button.Group>
          </Grid.Column>
          <Grid.Column textAlign="right">
            <Button negative onClick={() => dispatch(navigate("PATIENT"))}>
              <Icon name="trash" /> Usuń
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

export default PatientEdit;
