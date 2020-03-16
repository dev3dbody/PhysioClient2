import React, { CSSProperties } from "react";
import Switch from "./components/Switch";
import Navigation from "./components/Navigation";
import Flash from "./components/Flash";

const style = {
  margin: "2em"
} as CSSProperties;

const App: React.FunctionComponent = () => (
  <>
    <Navigation />
    <div style={style}>
      <Switch />
    </div>
    <Flash />
  </>
)

export default App;
