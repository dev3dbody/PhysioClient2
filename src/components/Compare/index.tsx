import React, { useEffect, useState } from "react";
import { Grid, GridColumn, Button, Header, Icon } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { getComparedScans } from "../../redux/reducers";
import { compareRemove, compareClear, listRequest } from "../../redux/actions";
import MeshViewer from "../MeshViewer/MeshViewer";

const Compare: React.FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  const scans = useSelector(getComparedScans);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    dispatch(listRequest("scans"));
  }, [dispatch]);
  _.defer(() => setReady(true));
  return (
    <>
      <Button
        data-cy="new-patient"
        floated="right"
        negative
        onClick={() => dispatch(compareClear())}
      >
        <Icon name="trash" /> Wyczyść wszystkie
      </Button>
      <Header as="h2">
        <Icon name="group" />
        <Header.Content>
          Porównanie badań
          <Header.Subheader>Imię i Nazwisko</Header.Subheader>
        </Header.Content>
      </Header>
      <Grid columns="3">
        {scans.map(scan => (
          <GridColumn>
            <MeshViewer data={ready && scan && scan.mesh ? scan.mesh : null} />
            <Button
              negative
              onClick={e => {
                e.stopPropagation();
                dispatch(compareRemove(scan._id));
              }}
            >
              <Icon name="trash" />
              Usuń z porównania
            </Button>
          </GridColumn>
        ))}
      </Grid>
    </>
  );
};

export default Compare;
