import { credentials, loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { ServiceClient } from "@grpc/grpc-js/build/src/make-client";

class Scanner {
  client: ServiceClient;

  constructor() {
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
    const helloProto = loadPackageDefinition(packageDefinition).scanner;
    // @ts-ignore
    this.client = new helloProto.ScannerCommunication('localhost:50051',
      credentials.createInsecure());
  }

  scan(callback: any) {
    const call = this.client.StartScan()
    const bufferData: Buffer[] = []
    call.on('data', (result: any) => {
      bufferData.push(Buffer.from(result.mesh));
    });
    call.on('error', (err: any) => console.info(err));
    call.on('end', () => callback(null, Buffer.concat(bufferData).buffer));
  }
}
export default new Scanner();
