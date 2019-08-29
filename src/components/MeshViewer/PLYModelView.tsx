import React, { useState, useEffect } from "react";
import MeshViewer from "./MeshViewer";
import PouchDb from "pouchdb";

interface PLYModelViewProps {
  scanId: string;
}

const PLYModelView: React.FunctionComponent<PLYModelViewProps> = ({
  scanId
}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const db = new PouchDb("scans");
      const blob = (await db.getAttachment(scanId, "scan.ply")) as any;
      setData((await new Response(blob).arrayBuffer()) as any);
    })();
  }, [scanId]);
  return <MeshViewer data={data} />;
};

export default PLYModelView;
