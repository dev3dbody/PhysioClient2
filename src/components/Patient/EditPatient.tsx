import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

import { createRequest, updateRequest } from "../../redux/actions";
import { getCurrentPatient } from "../../redux/reducers";

const EditPatient: React.FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  const patient = useSelector(getCurrentPatient);
  console.log(patient);
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
        value={values.name}
        fluid
        label="Imię"
        placeholder="Imię"
        onChange={(_, data) => handleChange("name", data.value)}
      />
      <Form.Input
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
      <Form.Button onClick={handleSubmit}>Submit</Form.Button>
    </Form>
  );
};

export default EditPatient;
