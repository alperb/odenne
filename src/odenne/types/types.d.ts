import { Effect } from "../lib/effects";
import { Skill } from "../lib/skills";
import { Mob, Player } from "../lib/teams";
import { SHIELDTYPES } from "./player";

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
    bypass?: boolean;
}

export interface ShieldDone{
    value: number;
    type: SHIELDTYPES;
    source: DamageSource;
    target: Player | Mob;
    cancel: CancelInfo;
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
    shieldTaken: ShieldDone[]
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

export interface GetRandomPlayerOptions {
    considerTaunt: boolean;
}

export const enum SKILLTYPES {
    BASIC = 'basicattack',
    ABILITY = 'ability',
    ULTIMATE = 'ultimate'
}

export const enum EventTypes {
    DAMAGE = 0,
    DAMAGE_CANCEL = 1,
    CC = 2,
    STATS_INCREASE = 3,
    INVULNERABLE = 4,
    DAMAGE_AND = 5,
    REFLECT = 6,
    ROUND_STEAL = 7,
    SHIELD_GAIN = 8,
    GAIN_CC_IMMUNITY = 9
}
export interface EventLog {
    type: EventTypes;
    log: string;
}

export interface EventParameters {
    type: EventTypes;
    attacker?: string;
    damage?: number;
    skill?: string;
    defender?: string;
    statvalue?: number;
    stattype?: string;
    reason?: string;
    shieldValue?: number;
    shieldType?: string;

    [key: string] : string | number;
}

// UI

export interface UILog {
    log: string;
    players: string[][];
    healths: number[][];
    turn: number;
    shields: number[][];
    critics: number[][];
    attacks: number[][];
    penetrations: number[][];
    accuracies: number[][];
}

export const enum WINNER {
    TEAM1 = 0,
    TEAM2 = 1,
    DRAW = 2
}

export const enum EndResult {
    TEAM_DEAD = 'team_dead',
    LIMIT_EXCEEDED = 'limit_exceeded'
}

export interface MatchResult {
    winner: number;
    reason: EndResult
}