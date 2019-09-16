import React from "react";
import { Input, Menu, Icon, Label } from "semantic-ui-react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { navigate } from "../redux/actions";
import { getComparedScansCount, getScreen } from "../redux/reducers";
import { IScreen } from "../redux/reducers/screen";

const Navigation: React.FunctionComponent = () => {
  const activeScreen = useSelector(getScreen);
  const comparedScansCount = useSelector(getComparedScansCount);
  const dispatch = useDispatch();
  const items = [
    {
      name: "Pacjenci",
      actions: ["PATIENT" as IScreen, "EDIT_PATIENT" as IScreen]
    },
    { name: "Wizyty", actions: ["APPOINTMENT" as IScreen] },
    { name: "Ustawienia", actions: ["SETTINGS" as IScreen] }
  ];

  return (
    <Menu data-cy="navigation" size="massive" pointing>
      {items.map(({ name, actions }: { name: string; actions: IScreen[] }) => (
        <Menu.Item
          data-cy={`top-navigation-${actions[0]}`}
          key={name}
          name={name}
          active={_.indexOf(actions, activeScreen) !== -1}
          onClick={() => dispatch(navigate(actions[0] as IScreen))}
        />
      ))}
      <Menu.Menu position="right">
        <Menu.Item disabled={!comparedScansCount}>
          <Icon name="table" />
          {comparedScansCount > 0 && (
            <Label horizontal> {comparedScansCount} </Label>
          )}
        </Menu.Item>
        <Menu.Item>
          <Input icon="search" placeholder="Szukaj..." />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Navigation;
