import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Form, Button, Icon } from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

import { createRequest, updateRequest, navigate } from "../../redux/actions";
import { getCurrentPatient } from "../../redux/reducers";
import { INewPatient } from "../../redux/reducers/data";
import Validator, { IErrors } from "../../lib/validator";
import ValidatorMessage from "../ValidatorMessage";
import _ from "lodash";

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
    setFields((state: IFormState) => ({
      values: { ...state.values, [field]: value },
      errors: { ..._.omit(state.errors, [field]) }
    }));
  };

  const handleSubmit = async () => {
    const errors = await validator.validate(fields.values);
    if (!_.isEmpty(errors)) {
      setFields((state: IFormState) => ({
        values: { ...state.values },
        errors
      }));
      return;
    }
    return dispatch(
      patient === undefined
        ? createRequest("patients", fields.values)
        : updateRequest("patients", { _id, _rev, ...fields.values })
    );
  };

  return (
    <Form>
      <Grid columns="3">
        <Grid.Row divided>
          <Grid.Column width="6">
            <Form.Input
              error={!!fields.errors.name}
              data-cy="first_name"
              value={fields.values.name}
              fluid
              label="Imię"
              placeholder="Imię"
              onChange={(_, data) => handleChange("name", data.value)}
            />
          </Grid.Column>
          <Grid.Column width="6">
            <Form.Input
              error={!!fields.errors.surname}
              data-cy="last_name"
              value={fields.values.surname}
              fluid
              label="Nazwisko"
              placeholder="Nazwisko"
              onChange={(_, data) => handleChange("surname", data.value)}
            />
          </Grid.Column>
          <Grid.Column width="4">
            <SemanticDatepicker
              data-cy="description"
              label="Data urodzenia"
              date={new Date(fields.values.birthDate)}
              type="basic"
              onDateChange={newDate => {
                if (newDate) {
                  handleChange("birthDate", newDate.toString());
                }
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Column width="12">
          <Form.TextArea
            value={fields.values.comment}
            label="Inne informacje"
            placeholder="Inne informacje"
            onChange={(_, data) => handleChange("comment", `${data.value}`)}
          />
        </Grid.Column>
      </Grid>
      <ValidatorMessage errors={fields.errors} />
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
