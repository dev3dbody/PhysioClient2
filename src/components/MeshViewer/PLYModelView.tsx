import React from "react";
import fs from "fs";
import MeshViewer from "./MeshViewer";
// import sizeof from "object-sizeof";

class PLYModelView extends React.Component<{}, { data: any }> {
  state = {
    data: null
  };

  constructor(props: Readonly<{}>) {
    super(props);
    this.handleLoadModel = this.handleLoadModel.bind(this);
  }

  componentDidMount() {
    fs.readFile("./src/models/model.ply", this.handleLoadModel);
  }

  handleLoadModel(err: any, data: { buffer: any }) {
    this.setState({ data: data.buffer });
    // console.log("Loaded PLY data model with size: " + sizeof(data));
  }

  render() {
    return <MeshViewer data={this.state.data} />;
  }
}

export default PLYModelView;
