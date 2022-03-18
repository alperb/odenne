import { Effect } from "../lib/effects";
import { Skill } from "../lib/skills";
import { Mob, Player } from "../lib/teams";

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
    target: Player | Mob;
    cancel: CancelInfo;
    critic?: CriticResult;
    isTrue: boolean;
}

export interface DamageSource {
    player: Player | Mob;
    source: Skill | Effect;
}

export interface CancelInfo {
    isCancelled: boolean;
    sourceMember?: Player | Mob;
    source?: Skill | Effect;
}

export interface DeciderSummary {
    damageTaken: DamageDone[]
    damageDone: DamageDone[]
    effects: Effect[]
}

export interface EffectConfig {
    targetMember: Player | Mob;
    sourceMember: Player | Mob;
    source: Skill | Effect;
    count?: number;
}

export interface CriticResult {
    isCritic: boolean;
    percentage?: number;
    damage?: number;
}

export interface BonusDetails {
    value: number;
    type: number;
    count: number;
}