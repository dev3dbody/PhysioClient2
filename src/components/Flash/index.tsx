import React from "react";
import { Icon, Message } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { getFlashes } from "../../redux/reducers";
import "./index.css";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";
import { removeFlashMessage } from "../../redux/actions/flash";

const Index: React.FunctionComponent = () => {
  const flashes = useSelector(getFlashes);
  if (!flashes) {
    return null;
  }

  const types = {
    info: { label: "Informacja", icon: "info" as SemanticICONS },
    success: { label: "Sukces!", icon: "check" as SemanticICONS },
    error: { label: "Błąd!", icon: "times" as SemanticICONS },
    warning: { label: "Ostrzeżenie", icon: "warning" as SemanticICONS }
  };

  return (
    <div className="Flash">
      {flashes.map(({ id, type, text }) => (
        <Message
          onDismiss={() => removeFlashMessage(id)}
          icon
          key={id}
          floating
          {...{ [type]: true }}
        >
          <Icon name={types[type].icon} />
          <Message.Content>
            <Message.Header>{types[type].label}</Message.Header>
            {text}
          </Message.Content>
        </Message>
      ))}
    </div>
  );
};

export default Index;
