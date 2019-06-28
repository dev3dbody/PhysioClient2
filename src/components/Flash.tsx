import React from "react";
import { Message } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { getFlashes } from "../redux/reducers";

const Flash: React.FunctionComponent = () => {
  const flashes = useSelector(getFlashes);
  // id, duration, type,
  return (
    <>
      {flashes.map(({ text }) => (
        <Message>
          <p>{text}</p>
        </Message>
      ))}
    </>
  );
};

export default Flash;
