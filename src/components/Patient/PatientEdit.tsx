import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Message, Grid, Form, Button, Icon } from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

import { createRequest, updateRequest, navigate } from "../../redux/actions";
import { getCurrentPatient } from "../../redux/reducers";
import { INewPatient } from "../../redux/reducers/data";
import Validator, { IErrors } from "../../lib/validator";

const PatientEdit: React.FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  const patient = useSelector(getCurrentPatient);

  let initValues: INewPatient = {
    name: "",
    surname: "",
    birthDate: "",
    comment: ""
  };
  let _id: string = "";
  let _rev: string = "";

  if (patient !== undefined) {
    ({ _id, _rev, ...initValues } = patient);
  }

  const validator = new Validator({
    name: [
      {
        test: value => value.length > 1,
        message: "Imię musi mieć przynajmniej dwa znaki"
      }
    ],
    surname: [
      {
        test: value => value.length > 1,
        message: "Nazwisko musi mieć przynajmniej dwa znaki"
      }
    ]
  });

  type IFormState = {
    values: INewPatient;
    errors: IErrors;
  };

  const [fields, setFields] = useState({
    errors: {} as IErrors,
    values: initValues
  });
  const handleChange = async (field: string, value: string) => {
    const errors = await validator.validate(fields.values);
    setFields((state: IFormState) => ({
      values: { ...state.values, [field]: value },
      errors
    }));
  };

  const handleSubmit = () =>
    dispatch(
      patient === undefined
        ? createRequest("patients", fields.values)
        : updateRequest("patients", { _id, _rev, ...fields.values })
    );

  return (
    <Form>
      <Form.Input
        error={!!fields.errors.name}
        value={fields.values.name}
        fluid
        label="Imię"
        placeholder="Imię"
        onChange={(_, data) => handleChange("name", data.value)}
      />
      <Form.Input
        error={!!fields.errors.surname}
        value={fields.values.surname}
        fluid
        label="Nazwisko"
        placeholder="Nazwisko"
        onChange={(_, data) => handleChange("surname", data.value)}
      />
      <SemanticDatepicker
        date={new Date(fields.values.birthDate)}
        type="basic"
        onDateChange={newDate => {
          if (newDate) {
            handleChange("birthDate", newDate.toString());
          }
        }}
      />
      <Form.Input
        value={fields.values.comment}
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
      {Object.keys(fields.errors).length && (
        <Message negative>
          <Message.Header>Formularz zawiera błedy</Message.Header>
          {Object.values(fields.errors).map(error => (
            <p>{error}</p>
          ))}
        </Message>
      )}
    </Form>
  );
};

export default PatientEdit;
