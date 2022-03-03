import { Skill } from "../lib/skills";
import { Player } from "../lib/teams";

export interface OdenneTurn {
    type: TurnTypes;
    team: number;
    player: {
        id: number, 
        player?: Player
    };
}

export const enum TurnTypes {
    ATTACK = 0,
    DEFENSE = 1
}

export const enum STATUSCODES {
    INITIALIZED = 'INITIALIZED',
    PREPARING = 'PREPARING',
    STARTED = 'STARTED',
    FINISHED = 'FINISHED',
    ERRORED = 'ERRORED'
}