import React from "react";
import fs from "fs";
import MeshViewer from "./MeshViewer";

class PLYModelView extends React.Component<{}, { data: any }> {
  state = {
    data: null
  };

  componentDidMount() {
    fs.readFile("./src/models/model.ply", this.handleLoadModel);
  }

  handleLoadModel = (err: any, data: { buffer: any }) => {
    this.setState({ data: data.buffer });
  };

  render() {
    const { data } = this.state;
    return <MeshViewer data={data} />;
  }
}

export default PLYModelView;
