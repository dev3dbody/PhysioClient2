import { Message } from "semantic-ui-react";
import React from "react";
import { IErrors } from "../lib/validator";

const ValidatorMessage = ({ errors }: { errors: IErrors }) => (
  <>
    {!!Object.keys(errors).length && (
      <Message negative>
        <Message.Header data-cy="validation-error-message">
          Formularz zawiera błędy
        </Message.Header>
        <ul>
          {Object.values(errors).map(error => (
            <li>{error}</li>
          ))}
        </ul>
      </Message>
    )}
  </>
);

export default ValidatorMessage;
