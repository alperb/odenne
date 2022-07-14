import { GRPCService } from "../../types/grpc";
import OdenneService from "../services/odenne-service";

export default class GRPCServers implements GRPCService {

    services: Map<string, GRPCService>

    constructor() {
        this.services = new Map([
            ["odenne-service", new OdenneService("localhost", 5020)]
        ]);
    }

    start(): void {
        this.services.forEach(service => {
            service.start();
        });
    }

    getServiceCount(): number {
        return this.services.size;
    }
}