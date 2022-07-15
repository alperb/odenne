import * as grpc from "@grpc/grpc-js";
import { CreateSessionRequest } from "../grpc/proto.output/odenneServerPackage/CreateSessionRequest";
import { CreateSessionResponse } from "../grpc/proto.output/odenneServerPackage/CreateSessionResponse";
import { OriginalPlayer, PlayerizableEnemy } from "../odenne/types/player";
import crypto from 'crypto';

// Let's get the main actor
import Odenne from '../odenne/odenne';
import OdenneOptions from '../odenne/helpers/options';
import { BattleRequest } from "../grpc/proto.output/odenneServerPackage/BattleRequest";
import { BattleResponse } from "../grpc/proto.output/odenneServerPackage/BattleResponse";
import { assert } from "console";
import { Player } from "../odenne/lib/teams";
import { STATUSCODES } from "../odenne/types/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default class OdenneServiceHandler {

    static KEYLENGTH = 16;

    static generateSessionKey(){
        return crypto.randomBytes(OdenneServiceHandler.KEYLENGTH).toString('hex');
    }

    static runBattle(playerizedEnemy: OriginalPlayer, players: Player[]) {
        const battle = OdenneServiceHandler.getBattle(playerizedEnemy, players);
        battle.start();
        while(battle.status.get() === STATUSCODES.STARTED){
            battle.advance();
        }
        return battle;
    }

    static getBattle(playerizedEnemy: OriginalPlayer, players: Player[]){
        const battleOptions = new OdenneOptions();
        battleOptions
            .setPVE(1)
            .addToTeam(1, playerizedEnemy)
        const battle = new Odenne(battleOptions);
        
        // insert created players to the team
        for(const player of players){
            battle.teams[0].insertCreatedPlayer(player);
        }
        return battle;
    }

    static getPlayerizedEnemy(enemy: Buffer){
        return Odenne.playerizeEnemy(JSON.parse(Buffer.from(enemy).toString()));
    }

    static battle(req: grpc.ServerUnaryCall<BattleRequest, BattleResponse>, res: grpc.sendUnaryData<BattleResponse>) {
        try{
            // check session key validity
            const sessionKey = req.request.session as string;
            assert(Odenne.space.has(sessionKey), `Session key ${sessionKey} is not valid`);
            
            // playerize given enemy
            const playerized = OdenneServiceHandler.getPlayerizedEnemy(req.request.enemy as Buffer);
            
            // get player from session
            const players: Player[] = (Odenne.space.get(sessionKey) as Player[]);

            // run the battle
            const battle = OdenneServiceHandler.runBattle(playerized, players);

            // update the session
            const session_players = battle.teams[0].players;
            Odenne.space.set(sessionKey, session_players);

            // return the battle result
            const bulkLog = battle.UI.getBulkLog();
            const response: BattleResponse = {
                result: 1,
                logs: Buffer.from(JSON.stringify(bulkLog), 'utf-8'),
                end: battle.Referee.result,
                stats: Buffer.from(JSON.stringify(battle.Statistics.teams), 'utf-8')
            }
            res(null, response);
        }
        catch(e){
            console.log(e);

            const response: BattleResponse = {
                result: 0,
                error: (e as Error).stack
            }

            res(null, response);
        }
    }

    static createBattleForPlayerExtraction(player: OriginalPlayer){
        const battleOptions = new OdenneOptions();
        battleOptions.addToTeam(0, player);
        const battle = new Odenne(battleOptions);
        
        // Extract the player
        return battle.teams[0].players;
    }

    static createSession(req: grpc.ServerUnaryCall<CreateSessionRequest, CreateSessionResponse>, res: grpc.sendUnaryData<CreateSessionResponse>) {
        try{
            // parse the incoming original player
            const player: OriginalPlayer = JSON.parse(Buffer.from(req.request.player as Buffer).toString());
            
            // Create session key for the player
            const sessionKey = OdenneServiceHandler.generateSessionKey();

            const createdPlayers = OdenneServiceHandler.createBattleForPlayerExtraction(player);
            
            // Save the player to the space
            Odenne.space.set(sessionKey, createdPlayers);

            // Return the session key to the player
            const response: CreateSessionResponse = {
                status: 1,
                session: sessionKey
            };
            res(null, response);
        }
        catch(e) {
            console.log(e);

            const response: CreateSessionResponse = {
                status: 0,
                error: (e as Error).stack
            }

            res(null, response);
        }
    }
}