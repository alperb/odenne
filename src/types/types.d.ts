import { Effect } from "../lib/effects";
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

export interface DamageDone {
    damage: number;
    source: DamageSource;
    target: Player;
    cancel: CancelInfo;
}

export interface DamageSource {
    player: Player;
    source: Skill | Effect;
}

export interface CancelInfo {
    isCancelled: boolean;
    sourceMember?: Player;
    source?: Skill | Effect;
}

export interface DeciderSummary {
    damageTaken: DamageDone[]
    damageDone: DamageDone[]
    effects: Effect[]
}