import path from 'path';
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from '../proto.output/odenne-server'
import { GRPCService } from "../../types/grpc";
import OdenneServiceHelper from '../helpers/odenneServiceHelper';

export default class OdenneService implements GRPCService  {
    port: number;
	host: string;
	file: string;
	packageDefinition: protoLoader.PackageDefinition;
	grpcObj: ProtoGrpcType;
    serverPackage
    server: grpc.Server;

    constructor(host: string, port: number) {
        this.host = host;
        this.port = port;

        this.file = path.join(__dirname, '../proto/odenne.proto');
        this.packageDefinition = protoLoader.loadSync(path.resolve(__dirname, this.file))
        this.grpcObj = (grpc.loadPackageDefinition(this.packageDefinition) as unknown) as ProtoGrpcType;
        this.serverPackage = this.grpcObj.odenneServerPackage;

        this.server = new grpc.Server();
    }

    serverBind() {
        this.server.bindAsync(`${this.host}:${this.port}`, grpc.ServerCredentials.createInsecure(), (err) => {
            if (err) {
                console.log(err);
                return;
            }
            this.server.start();
        });
    }

    addServices() {
        this.server.addService(this.serverPackage.OdenneServer.service, {
            'battle': OdenneServiceHelper.battle,
        });
    }


    start(): void {
        this.addServices();

        console.log(`${this.constructor.name} is running on port ${this.port}`)
        this.serverBind();
    }

}