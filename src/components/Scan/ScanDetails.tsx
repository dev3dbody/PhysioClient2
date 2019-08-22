import React from "react";
import { Container } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { getCurrentScan } from "../../redux/reducers";
import MeshViewer from "../MeshViewer/MeshViewer";

const StanDetails: React.FunctionComponent<{}> = () => {
  const scan = useSelector(getCurrentScan);
  if (!scan) {
    return null;
  }
  return (
    <Container>
      <MeshViewer data={scan.mesh} />
    </Container>
  );
};

export default StanDetails;
