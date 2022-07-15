import * as grpc from "@grpc/grpc-js";
import { CreateSessionRequest } from "../grpc/proto.output/odenneServerPackage/CreateSessionRequest";
import { CreateSessionResponse } from "../grpc/proto.output/odenneServerPackage/CreateSessionResponse";
import MongoService from "../database/mongo";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default class OdenneService {
    static battle(req: any, res: any) {
        res(null, req.request.name);
    }

    static async createSession(req: grpc.ServerUnaryCall<CreateSessionRequest, CreateSessionResponse>, res: grpc.sendUnaryData<CreateSessionResponse>) {
        // Create session key for the player
        // Save the session key in the database
        // Return the session key to the player
        const insertionResult = await MongoService.client.db('valenia').collection('dungeon-sessions').insertOne({player: req.request.player})
        
    }
}