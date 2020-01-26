import React, { useEffect, useState } from "react";
import PouchDb from "pouchdb";
import MeshViewer from "./MeshViewer";

interface MeshViewerProps {
  scanId: string;
}
const ModelViewer: React.FunctionComponent<MeshViewerProps> = ({ scanId }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const db = new PouchDb("scans");
      const blob = (await db.getAttachment(scanId, "scan.ply")) as any;
      // eslint-disable-next-line no-undef
      setData((await new Response(blob).arrayBuffer()) as any);
    })();
  }, [scanId]);
  return <MeshViewer data={data} />;
};

export default ModelViewer;
