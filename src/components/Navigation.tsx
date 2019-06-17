import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getScreen } from "../redux/reducers";
import { Breadcrumb } from "semantic-ui-react";
import { navigate } from "../redux/actions";

const Navigation: React.FunctionComponent = () => {
  const screen = useSelector(getScreen);
  const dispatch = useDispatch();
  const sections = [
    {
      key: "MAIN",
      content: "Widok główny",
      onClick: () => dispatch(navigate("MAIN"))
    }
  ];

  if (screen === "PATIENT") {
    sections.push({
      key: "PATIENT",
      content: "Widok pacjentów",
      onClick: () => dispatch(navigate("PATIENT"))
    });
  }

  if (screen === "APPOINTMENT") {
    sections.push({
      key: "APPOINTMENT",
      content: "Widok wizyt",
      onClick: () => dispatch(navigate("APPOINTMENT"))
    });
  }

  return <Breadcrumb size="massive" sections={sections} />;
};

export default Navigation;
