import React from "react";
import { Input, Menu } from "semantic-ui-react";
import { navigate } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { getScreen } from "../redux/reducers";
import { IScreen } from "../redux/reducers/screen";

const Navigation: React.FunctionComponent = () => {
  const activeScreen = useSelector(getScreen);
  const dispatch = useDispatch();
  const items = [
    { name: "Pacjenci", action: "PATIENT" as IScreen },
    { name: "Wizyty", action: "APPOINTMENT" as IScreen }
  ];

  return (
    <Menu size="massive" pointing>
      {items.map(({ name, action }: { name: string; action: IScreen }) => (
        <Menu.Item
          name={name}
          active={activeScreen === action}
          onClick={() => dispatch(navigate(action))}
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
