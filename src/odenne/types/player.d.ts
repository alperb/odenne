import { Skill, SkillResult } from "../lib/skills";
import { DamageSource } from "./types";

export interface OriginalPlayer {
    snowflake: string;
    characterId: string;
    name: string;
    discriminator: string;
    stats: Stats;
    wearings: Wearings;
    class: string;
    boost: PlayerBoostBonus;
    skills: Array<Record<string, unknown>>;
    isDead: boolean;
}

export interface PlayerBoostBonus{
    isBoost: boolean;
    boost: Boost;
}

// export interface Wearings {[key: string]: (Item | {[key: number]: number})};

export interface Wearings {
    [key: string]: Item | Array<number>,
}

export interface Stats {[key: string]: number}

export type Item = {
    id: string;
    code: string;
    name: string;
    stats: Stats;
    emoji: {
        id: string;
    }
    set: string;
    placement: string;
    function: Array<Record<string, unknown>>; // TODO: not known yet
    stack: number;
    image: ItemImages;
    crafting: Array<Record<string, unknown>>; // TODO: now known yet
    deconstruct: Array<Record<string, unknown>>; // TODO: now known yet
    durability: number;
    rarity: number;
    isTradeable: boolean;
    type: string;
    soulbind: ItemSoulbind;
}

export interface ItemSoulbind {
    date: number;
    isBindable: boolean;
    isBound: boolean;
    player: {
        snowflake: string;
        characterId: string;
    }
}

export interface ItemImages {
    original: string | Array<string>;
    wearings: string | Array<string>;
    inventory?: string | Array<string>;
}

export const enum ItemPlacement {
    chest = 'chest',
    arms = 'arms',
    leggings = 'leggings',
    lefthand = 'lefthand',
    righthand = 'righthand'
}

export interface OriginalSkill {
    id: number;
    name: string;
    min?: number;
    max?: number;
    shieldMin?: number;
    shieldMax?: number; 
    damage?: number;
}

export interface SkillArtifact {
    min?: number;
    max?: number;
}

export const enum DAMAGETYPES {
    RANGED = 'ranged',
    CONST = 'constant',
    NONE = 'none'
}

export const enum SHIELDTYPES {
    TEMP = 'temporary',
    PERM = 'permanent',
}

export interface SkillPipe {
    (skill: Skill): SkillResult;
}

export interface OdennePlayer {
    stats: Stats;
    boost?: Boost;
    skills: Array<Skill>;
    baseStats: Stats;
    shields: {
        temporary: TempShield[],
        permanent: number
    }
}

export interface Boost {
    name?: string;
    duration?: float;
    health?: int[];
    attack?: int[];
    defense?: int[];
    penetration?: int[];
    accuracy?: int[];
    critic?: int[];
}

export interface TempShield {
    value: number;
    count: number;
    source: DamageSource;
}