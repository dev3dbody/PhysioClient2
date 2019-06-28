import React from "react";
import { Message } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { getFlashes } from "../redux/reducers";

const Flash: React.FunctionComponent = () => {
  const flashes = useSelector(getFlashes);
  if (!flashes) {
    return null;
  }
  // id, duration, type,
  return (
    <>
      {flashes.map(({ type, text }) => (
        <Message
          info={type === "info"}
          success={type === "success"}
          error={type === "error"}
          warning={type === "warning"}
        >
          <p>{text}</p>
        </Message>
      ))}
    </>
  );
};

export default Flash;
