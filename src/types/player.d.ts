import { Skill, SkillResult } from "../lib/skills";

export interface OriginalPlayer {
    name: string;
    discriminator: string;
    stats: Stats;
    wearings: Wearings;
    class: string;
    boost: PlayerBoostBonus;
    skills: Array<Object>;
    isDead: boolean;
}

export interface PlayerBoostBonus{
    isBoost: boolean;
    boost: {
        boost?: boolean;
        health?: Array<number>;
        expiration?: number;
    }
}

// export interface Wearings {[key: string]: (Item | {[key: number]: number})};

export interface Wearings {
    [key: string]: Item | Array<number>,
}

export interface Stats {[key: string]: number};

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
    function: Array<Object>; // TODO: not known yet
    stack: number;
    image: ItemImages;
    crafting: Array<Object>; // TODO: now known yet
    deconstruct: Array<Object>; // TODO: now known yet
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

export interface SkillPipe {
    (skill: Skill): SkillResult;
}

export interface OdennePlayer {
    stats: Stats;
    skills: Array<Skill>;
}