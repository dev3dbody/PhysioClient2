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
  const handleChange = ({ field, value }: { field: string; value: any }) =>
    setValues(state => ({ ...state, [field]: value }));

  const handleSubmit = () =>
    dispatch(
      patient
        ? updateRequest("patients", values as any)
        : createRequest("patients", values)
    );

  return (
    <Form>
      <Grid columns="3">
        <Grid.Row divided>
          <Grid.Column width="6">
            <Form.Input
              value={values.name}
              fluid
              label="Imię"
              placeholder="Imię"
              onChange={(_, data) =>
                handleChange({ field: "name", value: data.value })
              }
            />
          </Grid.Column>
          <Grid.Column width="6">
            <Form.Input
              value={values.surname}
              fluid
              label="Nazwisko"
              placeholder="Nazwisko"
              onChange={(_, data) =>
                handleChange({ field: "surname", value: data.value })
              }
            />
          </Grid.Column>
          <Grid.Column width="4">
            <SemanticDatepicker
              label="Data urodzenia"
              date={new Date(values.birthDate)}
              type="basic"
              onDateChange={newDate => {
                if (newDate) {
                  handleChange({
                    field: "birthDate",
                    value: newDate.toString()
                  });
                }
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Column width="12">
          <Form.TextArea
            value={values.comment}
            fluid
            label="Inne informacje"
            placeholder="Inne informacje"
            onChange={(_, data) =>
              handleChange({ field: "comment", value: data.value })
            }
          />
        </Grid.Column>
      </Grid>

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
