import React, { CSSProperties } from "react";
import { useDispatch } from "react-redux";
import Switch from "./components/Switch";
import Navigation from "./components/Navigation";
import Flash from "./components/Flash";

const style = {
  margin: "2em"
} as CSSProperties;

const App: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Navigation />
      <div style={style}>
        <Switch />
      </div>
      <Flash />
    </>
  );
};

export default App;
