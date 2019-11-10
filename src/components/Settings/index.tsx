import React, { useEffect, useState } from "react";
import { Button, Form, Header, Icon } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { changeSettingRequest, loadSettingsRequest } from "../../redux/actions";
import { getSettingByKey } from "../../redux/reducers";

const SettingsEdit: React.FunctionComponent<{
  serverHost: string | boolean;
  pathToScans: string | boolean;
}> = ({ serverHost, pathToScans }) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState({
    values: {
      serverHost,
      pathToScans
    }
  });
  const handleChange = async (field: string, value: string) => {
    setFields((state: any) => ({
      values: { ...state.values, [field]: value }
    }));
  };
  return (
    <Form>
      <Form.Input
        value={fields.values.serverHost}
        fluid
        label="Adres serwera obsługującego skaner"
        onChange={(__, { value }) => handleChange("serverHost", value)}
      />
      <Form.Input
        value={fields.values.pathToScans}
        fluid
        label="Folder na dysku przechowujący skany"
        onChange={(__, { value }) => handleChange("pathToScans", value)}
      />
      <Button
        onClick={() => {
          dispatch(
            changeSettingRequest("serverHost", fields.values
              .serverHost as string)
          );
          dispatch(
            changeSettingRequest("pathToScans", fields.values
              .pathToScans as string)
          );
        }}
        positive
      >
        Zapisz
      </Button>
    </Form>
  );
};

const Settings: React.FunctionComponent<{}> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSettingsRequest());
  }, [dispatch]);

  const serverHost = useSelector(getSettingByKey)("serverHost");
  const pathToScans = useSelector(getSettingByKey)("pathToScans");
  return (
    <>
      <Header as="h2">
        <Icon name="group" />
        <Header.Content>
          Ustawienia
          <Header.Subheader>Konfiguracja systemu</Header.Subheader>
        </Header.Content>
      </Header>
      {serverHost && pathToScans && (
        <SettingsEdit {...{ serverHost, pathToScans }} />
      )}
    </>
  );
};

export default Settings;
