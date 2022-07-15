import GRPCServers from "./utils/grpc-servers";

export default class GRPCInit {
    services: GRPCServers

    constructor() {
        this.services = new GRPCServers();

        this.init();
    }

    init() {
        this.services.start();
    }
    
    getServices() {
        return this.services;
    }

    getServiceCount(): number {
        return this.services.getServiceCount();
    }
}