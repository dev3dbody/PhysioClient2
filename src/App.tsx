import React, { useEffect, CSSProperties } from "react";
import Switch from "./components/Switch";
import Navigation from "./components/Navigation";
import Flash from "./components/Flash";
import { useDispatch, useSelector } from "react-redux";
import { loadSettingsRequest, changeSettingRequest } from "./redux/actions";
import { getSettingByKey } from "./redux/reducers";

const style = {
  margin: "2em"
} as CSSProperties;

const App: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const marqueeClock = useSelector(getSettingByKey)("marqueeClock");

  useEffect(() => {
    dispatch(loadSettingsRequest());
  }, [dispatch]);

  return (
    <>
      <Navigation />
      <div style={style}>
        <Switch />
      </div>
      <Flash />
      {marqueeClock && (
        <span
          onClick={() => dispatch(changeSettingRequest("marqueeClock", ""))}
          style={{ background: "red" }}
        >
          {Date()}
        </span>
      )}
    </>
  );
};

export default App;
