import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Message, Grid, Form, Button, Icon } from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

import { createRequest, updateRequest, navigate } from "../../redux/actions";
import { getCurrentPatient } from "../../redux/reducers";
import Validator from "../../lib/validator";
import _ from "lodash";

const PatientEdit: React.FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  const patient = useSelector(getCurrentPatient);
  const initValues = patient || {
    name: "",
    surname: "",
    birthDate: "",
    comment: ""
  };
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

  const [values, setValues] = useState({
    errors: { name: "", surname: "" },
    ...initValues
  });
  const handleChange = async (field: string, value: string) => {
    const errors = await validator.validate(values);
    setValues(state => ({ ...state, [field]: value, errors }));
  };

  const handleSubmit = () =>
    dispatch(
      patient
        ? updateRequest("patients", values as any)
        : createRequest("patients", values)
    );

  return (
    <Form>
      <Form.Input
        error={!!values.errors.name}
        value={values.name}
        fluid
        label="Imię"
        placeholder="Imię"
        onChange={(_, data) => handleChange("name", data.value)}
      />
      <Form.Input
        error={!!values.errors.surname}
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
      {!_.isEmpty(values.errors) && (
        <Message negative>
          <Message.Header>Formularz zawiera błedy</Message.Header>
          {_.keys(values.errors).map(key => (
            <p>{Reflect.get(values.errors, key)}</p>
          ))}
        </Message>
      )}
    </Form>
  );
};

export default PatientEdit;
