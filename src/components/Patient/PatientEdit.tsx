import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Form, Button, Icon } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import {
  createRequest,
  updateRequest,
  navigate,
  removeRequest
} from "../../redux/actions";
import { getCurrentPatient } from "../../redux/reducers";
import { INewPatient } from "../../redux/reducers/data";
import Validator, { IErrors } from "../../lib/validator";
import ValidatorMessage from "../ValidatorMessage";
import _ from "lodash";
import moment from "moment";

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
    ],
    birthDate: [
      {
        test: value => value === "" || moment(value, "YYYY-MM-DD").isValid(),
        message: "Wpisz poprawną datę"
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
          <Grid.Column width="5">
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
          <Grid.Column width="5">
            <Form.Field error={!!fields.errors.birthDate}>
              <label>Data urodzenia</label>
              <DateInput
                duration={0}
                closable
                closeOnMouseLeave
                clearable
                dateFormat="YYYY-MM-DD"
                localization="pl"
                startMode="year"
                name="birthDate"
                placeholder="Data urodzenia"
                value={fields.values.birthDate}
                iconPosition="right"
                popupPosition={"bottom right"}
                onClear={() => handleChange("birthDate", "")}
                onChange={(e, { value, format }) => {
                  if (value) {
                    const date = moment(value, format);
                    if (date.isValid()) {
                      handleChange("birthDate", date.format("YYYY-MM-DD"));
                    } else {
                      handleChange("birthDate", "");
                    }
                  }
                }}
              />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
        <Grid.Column width="10">
          <Form.TextArea
            data-cy="description"
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
              <Button
                data-cy="patient-save-button"
                onClick={handleSubmit}
                positive
              >
                Zapisz
              </Button>
              <Button.Or text="lub" />
              <Button
                data-cy="patient-cancel-button"
                onClick={() => dispatch(navigate("PATIENT"))}
              >
                Anuluj
              </Button>
            </Button.Group>
          </Grid.Column>
          {patient && (
            <Grid.Column textAlign="right">
              <Button
                negative
                onClick={() => {
                  dispatch(removeRequest("patients", patient));
                  dispatch(navigate("PATIENT"));
                }}
              >
                <Icon name="trash" /> Usuń
              </Button>
            </Grid.Column>
          )}
          <Grid.Column textAlign="right">
            <Button
              data-cy="patient-delete-button"
              negative
              onClick={() => dispatch(navigate("PATIENT"))}
            >
              <Icon name="trash" /> Usuń
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

export default PatientEdit;
