import React from "react";
import { Input, Menu } from "semantic-ui-react";
import { navigate } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { getScreen } from "../redux/reducers";
import { IScreen } from "../redux/reducers/screen";
import _ from "lodash";

const Navigation: React.FunctionComponent = () => {
  const activeScreen = useSelector(getScreen);
  console.info({ activeScreen });
  const dispatch = useDispatch();
  const items = [
    {
      name: "Pacjenci",
      actions: ["PATIENT" as IScreen, "EDIT_PATIENT" as IScreen]
    },
    { name: "Wizyty", actions: ["APPOINTMENT" as IScreen] }
  ];

  return (
    <Menu size="massive" pointing>
      {items.map(({ name, actions }: { name: string; actions: IScreen[] }) => (
        <Menu.Item
          name={name}
          active={_.indexOf(actions, activeScreen) !== -1}
          onClick={() => dispatch(navigate(actions[0] as IScreen))}
        />
      ))}
      <Menu.Menu position="right">
        <Menu.Item>
          <Input icon="search" placeholder="Szukaj..." />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Navigation;
