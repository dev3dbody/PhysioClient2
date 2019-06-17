import React, { CSSProperties } from "react";
import Switch from "./components/Switch";
import Navigation from "./components/Navigation";

const style = {
  display: "flex" /* establish flex container */,
  flexDirection: "column" /* make main axis vertical */,
  justifyContent: "center" /* center items vertically, in this case */,
  alignItems: "center" /* center items horizontally, in this case */,
  height: "90vmin"
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
