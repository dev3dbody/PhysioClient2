import React, { CSSProperties } from "react";
import Switch from "./components/Switch";
import Navigation from "./components/Navigation";

const style = {
  margin: "2em"
} as CSSProperties;

const App: React.FunctionComponent = () => (
  <>
    <Navigation />
    <div style={style}>
      <Switch />
    </div>
  </>
);

export default App;
