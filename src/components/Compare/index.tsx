import React, { RefObject, useEffect, useState } from "react";
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

  const refs = scans.map(() => React.createRef<MeshViewer>());
  const onCameraUpdate = (type: string, data: any) => {
    if (type === "controls") {
      // eslint-disable-next-line array-callback-return
      refs.map(({ current }) => {
        if (!current) {
          return;
        }
        if (data.source !== current) {
          current.camera.position.copy(data.source.camera.position);
          current.camera.quaternion.copy(data.source.camera.quaternion);
          current.camera.scale.copy(data.source.camera.scale);
        }
      });
    }

    if (type === "changeCamera") {
      // eslint-disable-next-line array-callback-return
      refs.map(({ current }) => {
        if (!current) {
          return;
        }
        if (data.source !== current) {
          current.changeCamera(data.placement, true);
        }
      });
    }

    if (type === "changeCameraTopBottom") {
      // eslint-disable-next-line array-callback-return
      refs.map(({ current }) => {
        if (!current) {
          return;
        }
        if (data.source !== current) {
          current.changeCameraTopBottom(data.placement, true);
        }
      });
    }
  };

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
        {scans.map((scan, key) => (
          <GridColumn key={key}>
            <MeshViewer
              ref={refs[key]}
              onCameraUpdate={onCameraUpdate}
              data={ready && scan && scan.mesh ? scan.mesh : null}
            />
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
