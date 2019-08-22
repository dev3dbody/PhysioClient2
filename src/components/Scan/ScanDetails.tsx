import React, { useState } from "react";
import _ from "lodash";
import { Container } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { getCurrentScan } from "../../redux/reducers";
import MeshViewer from "../MeshViewer/MeshViewer";

const StanDetails = () => {
  const [ready, setReady] = useState(false);
  const scan = useSelector(getCurrentScan);
  if (!scan) {
    return null;
  }
  _.defer(() => setReady(true));
  return (
    <Container>
      <MeshViewer data={ready ? scan.mesh : null} />
    </Container>
  );
};

export default StanDetails;
