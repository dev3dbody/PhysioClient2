import { credentials, loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';

class Scanner {
  clientProto: any;
  serverHost: string;

  constructor({ serverHost = 'localhost:50051' }: { serverHost: string | boolean }) {
    const PROTO_PATH = './third-party/PhysioProto/scanner_communication.proto';
    const packageDefinition = loadSync(
      PROTO_PATH,
      {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
      });
    this.clientProto = loadPackageDefinition(packageDefinition).scanner;
    if (typeof serverHost === "string") {
      this.serverHost = serverHost;
    } else {
      this.serverHost = 'localhost:50051'
    }
  }

  scan(callback: any) {
    const client = new this.clientProto.ScannerCommunication(this.serverHost,
      credentials.createInsecure());
    const call = client.StartScan()
    const bufferData: Buffer[] = []
    call.on('data', (result: any) => {
      bufferData.push(Buffer.from(result.mesh));
    });
    call.on('error', (err: any) => {
      console.info(err);
      client.close();
    });
    call.on('end', () => {
      callback(null, Buffer.concat(bufferData).buffer);
      client.close();
    });
  }
}
export default Scanner;
