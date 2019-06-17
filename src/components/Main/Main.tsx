import React, { useEffect } from "react";
import { Button, Loader } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { navigate, listRequest } from "../../redux/actions";
import { getPatientsCount } from "../../redux/reducers";
import { getPatientsLoading } from "../../redux/reducers/loading";

const Main: React.FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  const loadingPatients = useSelector(getPatientsLoading);
  const patientsCount = useSelector(getPatientsCount);

  useEffect(() => {
    dispatch(listRequest("patients"));
  }, [dispatch]);

  if (loadingPatients) {
    return <Loader />;
  }
  return (
    <Button.Group vertical>
      <Button onClick={() => dispatch(navigate("ADD_PATIENT"))}>
        Dodaj użytkownika
      </Button>
      <Button onClick={() => dispatch(navigate("PATIENT"))}>
        Przeglądaj użytkowników ({patientsCount})
      </Button>
      <Button onClick={() => dispatch(navigate("SCANNER"))}>
        Test skanera
      </Button>
    </Button.Group>
  );
};
export default Main;
