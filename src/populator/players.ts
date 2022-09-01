import _ from "lodash";
import { OriginalPlayer, Stats } from "../odenne/types/player";
import Odenne from "../odenne/odenne";
import OdenneOptions from "../odenne/helpers/options";
import crandom from "crandom";
import { STATUSCODES } from "../odenne/types/types";
import fs from 'fs';

const statsMap: Record<string, Stats> = {
    "1_low": { attack: 75, health: 50, defense: 50 },
    "1_med": { attack: 90, health: 60, defense: 50 },
    "1_high": { attack: 100, health: 80, defense: 60 },

    "5_low": { attack: 110, health: 90, defense: 70 },
    "5_med": { attack: 120, health: 105, defense: 80 },
    "5_high": { attack: 130, health: 110, defense: 90 },

    "10_low": { attack: 140, health: 120, defense: 100 },
    "10_med": { attack: 150, health: 135, defense: 120 },
    "10_high": { attack: 160, health: 140, defense: 130 },

    "15_low": { attack: 170, health: 150, defense: 140 },
    "15_med": { attack: 180, health: 165, defense: 145 },
    "15_high": { attack: 190, health: 170, defense: 150 },

    "20_low": { attack: 270, health: 180, defense: 160 },
    "20_med": { attack: 350, health: 200, defense: 175 },
    "20_high": { attack: 430, health: 220, defense: 190 },

    "25_low": { attack: 560, health: 250, defense: 210 },
    "25_med": { attack: 660, health: 280, defense: 230 },
    "25_high": { attack: 760, health: 310, defense: 250 },

    "30_low": { attack: 880, health: 370, defense: 280 },
    "30_med": { attack: 1000, health: 430, defense: 310 },
    "30_high": { attack: 1120, health: 490, defense: 340 },

    "35_low": { attack: 1270, health: 590, defense: 440 },
    "35_med": { attack: 1420, health: 690, defense: 540 },
    "35_high": { attack: 1570, health: 790, defense: 640 },

    "40_low": { attack: 1670, health: 590, defense: 440 },
    "40_med": { attack: 1820, health: 690, defense: 540 },
    "40_high": { attack: 1970, health: 790, defense: 640 },

    "45_low": { attack: 2350, health: 890, defense: 740 },
    "45_med": { attack: 2550, health: 990, defense: 840 },
    "45_high": { attack: 2750, health: 1090, defense: 940 },

    "50_low": { attack: 2950, health: 1190, defense: 1040 },
    "50_med": { attack: 3150, health: 1290, defense: 1140 },
    "50_high": { attack: 3350, health: 1390, defense: 1240 },

    "55_low": { attack: 3550, health: 1490, defense: 1340 },
    "55_med": { attack: 3750, health: 1590, defense: 1440 },
    "55_high": { attack: 3950, health: 1690, defense: 1540 },
}

const rookies = {
    "arms" : {
    "code" : "rookie.arm",
    "crafting" : [

    ],
    "deconstruct" : [

    ],
    "durability" : 100,
    "emoji" : {
        "id" : "864633317185159168"
    },
    "function" : [

    ],
    "id" : "bdf5fd01-ab64-4f1d-aa8f-d8871110f03a",
    "image" : {
        "original" : [
            "item/set/rookie/mage/leftshoulderarm.png",
            "item/set/rookie/mage/rightshoulderarm.png"
        ],
        "wearings" : "item/wearings/rookie/mage/arm.png"
    },
    "isTradeable" : true,
    "name" : "Rookie Arms",
    "placement" : "arms",
    "rarity" : 0,
    "set" : "rookie.set",
    "soulbind" : {
        "date" : 0,
        "isBindable" : false,
        "isBound" : false,
        "player" : {
            "characterId" : "",
            "snowflake" : ""
        }
    },
    "stack" : 1,
    "stats" : {

    },
    "type" : "armor"
},
"chest" : {
    "code" : "rookie.chest",
    "crafting" : [

    ],
    "deconstruct" : [

    ],
    "durability" : 100,
    "emoji" : {
        "id" : "864633322427645952"
    },
    "function" : [

    ],
    "id" : "3178fe18-f678-4bfc-9969-a48a36d3beac",
    "image" : {
        "original" : "item/set/rookie/mage/chestwaist.png",
        "wearings" : "item/wearings/rookie/mage/chest.png"
    },
    "isTradeable" : true,
    "name" : "Rookie Chest",
    "placement" : "chest",
    "rarity" : 0,
    "set" : "rookie.set",
    "soulbind" : {
        "date" : 0,
        "isBindable" : false,
        "isBound" : false,
        "player" : {
            "characterId" : "",
            "snowflake" : ""
        }
    },
    "stack" : 1,
    "stats" : {

    },
    "type" : "armor"
},
"lefthand" : {
    "code" : "rookie.book",
    "crafting" : [

    ],
    "deconstruct" : [

    ],
    "durability" : 100,
    "emoji" : {
        "id" : "864633323682398219"
    },
    "function" : [

    ],
    "id" : "d6f6e01d-2c4d-4075-8f72-279b3d16a7e3",
    "image" : {
        "original" : "item/set/rookie/mage/leftbook.png",
        "wearings" : "item/wearings/rookie/mage/spellbook.png"
    },
    "isTradeable" : true,
    "name" : "Rookie Book",
    "placement" : "lefthand",
    "rarity" : 0,
    "set" : "rookie.set",
    "soulbind" : {
        "date" : 0,
        "isBindable" : true,
        "isBound" : false,
        "player" : {
            "characterId" : "",
            "snowflake" : ""
        }
    },
    "stack" : 1,
    "stats" : {

    },
    "type" : "weapon"
},
"leggings" : {
    "code" : "rookie.legs",
    "crafting" : [

    ],
    "deconstruct" : [

    ],
    "durability" : 100,
    "emoji" : {
        "id" : "864633322118316104"
    },
    "function" : [

    ],
    "id" : "670d092f-ee47-4eab-8020-33e7c998edc3",
    "image" : {
        "original" : "item/set/rookie/mage/legs.png",
        "wearings" : "item/wearings/rookie/mage/legs.png"
    },
    "isTradeable" : true,
    "name" : "Rookie Legs",
    "placement" : "leggings",
    "rarity" : 0,
    "set" : "rookie.set",
    "soulbind" : {
        "date" : 0,
        "isBindable" : false,
        "isBound" : false,
        "player" : {
            "characterId" : "",
            "snowflake" : ""
        }
    },
    "stack" : 1,
    "stats" : {

    },
    "type" : "armor"
},
"righthand" : {
    "id" : "1642f2e0-ea45-48c1-a9d6-b1364cb514bf",
    "code" : "rookie.staff",
    "name" : "Rookie Staff",
    "stats" : {},
    "durability" : 100,
    "emoji" : {
        "id" : "864633319185186836"
    },
    "set" : "rookie.set",
    "placement" : "righthand",
    "function" : [

    ],
    "stack" : 1,
    "image" : {
        "original" : "item/set/rookie/mage/rightwand.png",
        "wearings" : "item/wearings/rookie/mage/wand.png"
    },
    crafting: [],
    deconstruct: [],
    "isTradeable" : true,
    "rarity" : 0,
    "soulbind" : {
        "date" : 0,
        "isBindable" : true,
        "isBound" : false,
        "player" : {
            "characterId" : "",
            "snowflake" : ""
        }
    },
    "type" : "weapon"
}
}

function createPlayer(key: string, stats: Stats): OriginalPlayer {
    return {
        characterId: '',
        snowflake: '',
        stats: {
            ...stats,
            penetration: 0,
            critic: 0,
            accuracy: 50,
        },
        name: key,
        discriminator: '',
        wearings: {
            "arms" : {
                "code" : "rookie.arm",
                "crafting" : [

                ],
                "deconstruct" : [

                ],
                "durability" : 100,
                "emoji" : {
                    "id" : "864633317185159168"
                },
                "function" : [

                ],
                "id" : "bdf5fd01-ab64-4f1d-aa8f-d8871110f03a",
                "image" : {
                    "original" : [
                        "item/set/rookie/mage/leftshoulderarm.png",
                        "item/set/rookie/mage/rightshoulderarm.png"
                    ],
                    "wearings" : "item/wearings/rookie/mage/arm.png"
                },
                "isTradeable" : true,
                "name" : "Rookie Arms",
                "placement" : "arms",
                "rarity" : 0,
                "set" : "rookie.set",
                "soulbind" : {
                    "date" : 0,
                    "isBindable" : false,
                    "isBound" : false,
                    "player" : {
                        "characterId" : "",
                        "snowflake" : ""
                    }
                },
                "stack" : 1,
                "stats" : {

                },
                "type" : "armor"
            },
            "chest" : {
                "code" : "rookie.chest",
                "crafting" : [

                ],
                "deconstruct" : [

                ],
                "durability" : 100,
                "emoji" : {
                    "id" : "864633322427645952"
                },
                "function" : [

                ],
                "id" : "3178fe18-f678-4bfc-9969-a48a36d3beac",
                "image" : {
                    "original" : "item/set/rookie/mage/chestwaist.png",
                    "wearings" : "item/wearings/rookie/mage/chest.png"
                },
                "isTradeable" : true,
                "name" : "Rookie Chest",
                "placement" : "chest",
                "rarity" : 0,
                "set" : "rookie.set",
                "soulbind" : {
                    "date" : 0,
                    "isBindable" : false,
                    "isBound" : false,
                    "player" : {
                        "characterId" : "",
                        "snowflake" : ""
                    }
                },
                "stack" : 1,
                "stats" : {

                },
                "type" : "armor"
            },
            "lefthand" : {
                "code" : "rookie.book",
                "crafting" : [

                ],
                "deconstruct" : [

                ],
                "durability" : 100,
                "emoji" : {
                    "id" : "864633323682398219"
                },
                "function" : [

                ],
                "id" : "d6f6e01d-2c4d-4075-8f72-279b3d16a7e3",
                "image" : {
                    "original" : "item/set/rookie/mage/leftbook.png",
                    "wearings" : "item/wearings/rookie/mage/spellbook.png"
                },
                "isTradeable" : true,
                "name" : "Rookie Book",
                "placement" : "lefthand",
                "rarity" : 0,
                "set" : "rookie.set",
                "soulbind" : {
                    "date" : 0,
                    "isBindable" : true,
                    "isBound" : false,
                    "player" : {
                        "characterId" : "",
                        "snowflake" : ""
                    }
                },
                "stack" : 1,
                "stats" : {

                },
                "type" : "weapon"
            },
            "leggings" : {
                "code" : "rookie.legs",
                "crafting" : [

                ],
                "deconstruct" : [

                ],
                "durability" : 100,
                "emoji" : {
                    "id" : "864633322118316104"
                },
                "function" : [

                ],
                "id" : "670d092f-ee47-4eab-8020-33e7c998edc3",
                "image" : {
                    "original" : "item/set/rookie/mage/legs.png",
                    "wearings" : "item/wearings/rookie/mage/legs.png"
                },
                "isTradeable" : true,
                "name" : "Rookie Legs",
                "placement" : "leggings",
                "rarity" : 0,
                "set" : "rookie.set",
                "soulbind" : {
                    "date" : 0,
                    "isBindable" : false,
                    "isBound" : false,
                    "player" : {
                        "characterId" : "",
                        "snowflake" : ""
                    }
                },
                "stack" : 1,
                "stats" : {

                },
                "type" : "armor"
            },
            "righthand" : {
                "id" : "1642f2e0-ea45-48c1-a9d6-b1364cb514bf",
                "code" : "rookie.staff",
                "name" : "Rookie Staff",
                "stats" : {},
                "durability" : 100,
                "emoji" : {
                    "id" : "864633319185186836"
                },
                "set" : "rookie.set",
                "placement" : "righthand",
                "function" : [

                ],
                "stack" : 1,
                "image" : {
                    "original" : "item/set/rookie/mage/rightwand.png",
                    "wearings" : "item/wearings/rookie/mage/wand.png"
                },
                crafting: [],
                deconstruct: [],
                "isTradeable" : true,
                "rarity" : 0,
                "soulbind" : {
                    "date" : 0,
                    "isBindable" : true,
                    "isBound" : false,
                    "player" : {
                        "characterId" : "",
                        "snowflake" : ""
                    }
                },
                "type" : "weapon"
            },
            skills: [
                0, -1, -1, -1, -1
            ]
        },
        class: '',
        isDead: false,
        boost: {
            isBoost: false,
            boost: {}
        }
    }
}

const players: OriginalPlayer[] = [];

for(const statMap of Object.keys(statsMap)){
    const player = _.cloneDeep(createPlayer(statMap, statsMap[statMap]));
    players.push(player);
}

function randomizeStats(stats: Record<string, number[]>) {
    const newStats: Record<string, number> = {};
    for (const key of Object.keys(stats)) {
            const randomized = crandom.rand(stats[key][0], stats[key][1], -1);
            newStats[key] = randomized ? randomized : stats[key][0];
    }
    return newStats;
}

function createMob(mob: Record<string, unknown>): OriginalPlayer{
    return {
        snowflake: 'IRRELEVANT',
        characterId: 'IRRELEVANT',
        name: mob.name as string,
        discriminator: 'IRRELEVANT',
        wearings: {
            ...rookies,
            skills: mob.skills as number[],
        },
        stats: randomizeStats(mob.stats as Record<string, number[]>),
        class: 'enemy',
        boost: {
            isBoost: false,
            boost: {},
        },
        isDead: false,
    }
}

const mobs: Record<string, unknown>[] = [
    {
        "id": "brown_wolf",
        "name": "Brown Wolf",
        "type": "wolf",
        "rarity": "common",
        "tier": 1,
        "stats":{
            "attack":[80,140],
            "defense":[5,10],
            "health":[20,45],
            "critic": [0, 5],
            "penetration": [0, 5],
            "accuracy": [90, 100]
        },
        "image": "mobs/brown_wolf.png",
        "skills": [
            69001,
            69002,
            69003
        ],
        "constants": {
            "gold": [1,15],
            "exp": [150,250]
        },
        "items" : {
            "righthand": "rookie.staff",
            "lefthand": "rookie.book",
            "chest": "rookie.chest",
            "arms": "rookie.arm",
            "leggings": "rookie.legs"
        },
        "rewards": ["elven.bow"],
        "keys": [
            {"item": "common.dungeonkey", "count": [0,1]}
        ],
        "armorgem": [
            {"item": "common.armorgem", "count": [0,1]}
        ],
        "weapon_drop":{
            "common": 60
        }
    },
    {
        "id": "punarut_cultist",
        "name": "Punarut Cultist",
        "type": "punarut",
        "rarity": "common",
        "tier": 1,
        "stats":{
            "attack":[80,140],
            "defense":[5,10],
            "health":[20,45],
            "critic": [0, 5],
            "penetration": [0, 5],
            "accuracy": [90, 100]
        },
        "image": "mobs/punarut_cultist.png",
        "skills": [
            69010,
            69011,
            69012
        ],
        "constants": {
            "gold": [1,15],
            "exp": [150,250]
        },
        "items" : {
            "righthand": "rookie.staff",
            "lefthand": "rookie.book",
            "chest": "rookie.chest",
            "arms": "rookie.arm",
            "leggings": "rookie.legs"
        },
        "rewards": ["elven.bow"],
        "keys": [
            {"item": "common.dungeonkey", "count": [0,1]}
        ],
        "armorgem": [
            {"item": "common.armorgem", "count": [0,1]}
        ],
        "weapon_drop":{
            "common": 60
        }
    },
    {
        "id": "goblin_bandit",
        "name": "Goblin Bandit",
        "type": "goblin",
        "rarity": "common",
        "tier": 1,
        "stats":{
            "attack":[80,140],
            "defense":[5,10],
            "health":[20,45],
            "critic": [0, 5],
            "penetration": [0, 5],
            "accuracy": [90, 100]
        },
        "image": "mobs/goblin_bandit.png",
        "skills": [
            69007,
            69008,
            69009
        ],
        "constants": {
            "gold": [1,15],
            "exp": [150,250]
        },
        "items" : {
            "righthand": "rookie.staff",
            "lefthand": "rookie.book",
            "chest": "rookie.chest",
            "arms": "rookie.arm",
            "leggings": "rookie.legs"
        },
        "rewards": ["elven.bow"],
        "keys": [
            {"item": "common.dungeonkey", "count": [1,3]}
        ],
        "armorgem": [
            {"item": "common.armorgem", "count": [1,3]}
        ],
        "weapon_drop":{
            "common": 60
        }
    },
    {
        "id": "skeleton_troop",
        "name": "Skeleton Troop",
        "type": "skeleton",
        "rarity": "common",
        "tier": 1,
        "stats":{
            "attack":[80,140],
            "defense":[5,10],
            "health":[20,45],
            "critic": [0, 5],
            "penetration": [0, 5],
            "accuracy": [90, 100]
        },
        "image": "mobs/skeleton_troop.png",
        "skills": [
            69004,
            69005,
            69006
        ],
        "constants": {
            "gold": [1,15],
            "exp": [150,250]
        },
        "items" : {
            "righthand": "rookie.staff",
            "lefthand": "rookie.book",
            "chest": "rookie.chest",
            "arms": "rookie.arm",
            "leggings": "rookie.legs"
        },
        "rewards": ["elven.bow"],
        "keys": [
            {"item": "common.dungeonkey", "count": [0,1]}
        ],
        "armorgem": [
            {"item": "common.armorgem", "count": [0,1]}
        ],
        "weapon_drop":{
            "common": 60
        }
    },
    {
        "id": "frostgolem",
        "name": "Ice Golem",
        "type": "golem",
        "rarity": "uncommon",
        "tier": 2,
        "stats":{
            "attack":[300,450],
            "defense":[30,90],
            "health":[100,180],
            "critic": [0, 5],
            "penetration": [0, 5],
            "accuracy": [90, 100]
        },
        "image": "mobs/icegolem.png",
        "skills": [
            69016,
            69017,
            69018
        ],
        "constants": {
            "gold": [15,25],
            "exp": [250,400]
        },
        "items" : {
            "righthand": "elven.staff",
            "lefthand": "elven.book",
            "chest": "elven.chest",
            "arms": "elven.arm",
            "leggings": "elven.legs"
        },
        "rewards": ["elven.bow"],
        "keys": [
            {"item": "common.dungeonkey", "count": [1,3]},
            {"item": "uncommon.dungeonkey", "count": [0,1]}
        ],
        "armorgem": [
            {"item": "common.armorgem", "count": [1,3]},
            {"item": "uncommon.armorgem", "count": [0,1]}
        ],
        "weapon_drop":{
            "common": 50,
            "uncommon": 20
        }
    },
    {
        "id": "firegolem",
        "name": "Fire Golem",
        "type": "golem",
        "rarity": "rare",
        "tier": 3,
        "stats":{
            "attack":[530,750],
            "defense":[150,300],
            "health":[160,350],
            "critic": [0, 5],
            "penetration": [0, 5],
            "accuracy": [90, 100]
        },
        "image": "mobs/firegolem.png",
        "skills": [
            69019,
            69020,
            69021
        ],
        "constants": {
            "gold": [25,40],
            "exp": [400,600]
        },
        "items" : {
            "righthand": "elven.staff",
            "lefthand": "elven.book",
            "chest": "elven.chest",
            "arms": "elven.arm",
            "leggings": "elven.legs"
        },
        "rewards": ["elven.bow"],
        "keys": [
            {"item": "common.dungeonkey", "count": [2,5]},
            {"item": "uncommon.dungeonkey", "count": [1,3]},
            {"item": "rare.dungeonkey", "count": [0,1]}
        ],
        "armorgem": [
            {"item": "common.armorgem", "count": [2,5]},
            {"item": "uncommon.armorgem", "count": [1,3]},
            {"item": "rare.armorgem", "count": [0,1]}
        ],
        "weapon_drop":{
            "common": 45,
            "uncommon": 30,
            "rare": 5
        }
    },
    {
        "id": "punarut_leader",
        "name": "Punarut Leader",
        "type": "punarut",
        "rarity": "epic",
        "tier": 1,
        "stats":{
            "attack":[1700, 2600],
            "defense":[600,850],
            "health":[700, 950],
            "critic": [0, 5],
            "penetration": [0, 5],
            "accuracy": [90, 100]
        },
        "image": "mobs/punarut_leader.png",
        "skills": [
            69022,
            69023,
            69024
        ],
        "constants": {
            "gold": [40,70],
            "exp": [600,1000]
        },
        "items" : {
            "righthand": "elven.staff",
            "lefthand": "elven.book",
            "chest": "elven.chest",
            "arms": "elven.arm",
            "leggings": "elven.legs"
        },
        "rewards": ["elven.bow"],
        "keys": [
            {"item": "common.dungeonkey", "count": [3,6]},
            {"item": "uncommon.dungeonkey", "count": [2,5]},
            {"item": "rare.dungeonkey", "count": [1,3]},
            {"item": "epic.dungeonkey", "count": [0,1]}
        ],
        "armorgem": [
            {"item": "common.armorgem", "count": [3,6]},
            {"item": "uncommon.armorgem", "count": [2,5]},
            {"item": "rare.armorgem", "count": [1,3]},
            {"item": "epic.armorgem", "count": [0,1]}
        ],
        "weapon_drop":{
            "common": 35,
            "uncommon": 35,
            "rare": 8,
            "epic": 2
        }
    },
    {
        "id": "skeleton_king",
        "name": "Skeleton King",
        "type": "skeleton",
        "rarity": "legendary",
        "tier": 1,
        "stats":{
            "attack":[2800,3800],
            "defense":[1100,1500],
            "health":[1000,1500],
            "critic": [0, 5],
            "penetration": [0, 5],
            "accuracy": [90, 100]
        },
        "image": "mobs/skeleton_king.png",
        "skills": [
            69031,
            69032,
            69033
        ],
        "constants": {
            "gold": [70,110],
            "exp": [1000,1500]
        },
        "items" : {
            "righthand": "elven.staff",
            "lefthand": "elven.book",
            "chest": "elven.chest",
            "arms": "elven.arm",
            "leggings": "elven.legs"
        },
        "rewards": ["elven.bow"],
        "keys": [
            {"item": "uncommon.dungeonkey", "count": [3,6]},
            {"item": "rare.dungeonkey", "count": [2,5]},
            {"item": "epic.dungeonkey", "count": [1,3]},
            {"item": "legendary.dungeonkey", "count": [0,1]}
        ],
        "armorgem": [
            {"item": "uncommon.armorgem", "count": [3,6]},
            {"item": "rare.armorgem", "count": [2,5]},
            {"item": "epic.armorgem", "count": [1,3]},
            {"item": "legendary.armorgem", "count": [0,1]}
        ],
        "weapon_drop":{
            "uncommon": 40,
            "rare": 35,
            "epic": 5
        }
    },
    {
        "id": "punarut_council",
        "name": "Punarut Council",
        "type": "punarut",
        "rarity": "mythic",
        "tier": 14,
        "stats":{
            "attack":[4000,5800],
            "defense":[1500,2500],
            "health":[1500,2500],
            "critic": [0, 5],
            "penetration": [0, 5],
            "accuracy": [90, 100]
        },
        "image": "mobs/punarut_council.png",
        "skills": [
            69025,
            69026,
            69027
        ],
        "constants": {
            "gold": [110,160],
            "exp": [1500,2500]
        },
        "items" : {
            "righthand": "elven.staff",
            "lefthand": "elven.book",
            "chest": "elven.chest",
            "arms": "elven.arm",
            "leggings": "elven.legs"
        },
        "rewards": ["elven.bow"],
        "keys": [
            {"item": "rare.dungeonkey", "count": [3,6]},
            {"item": "epic.dungeonkey", "count": [2,5]},
            {"item": "legendary.dungeonkey", "count": [1,3]},
            {"item": "mythic.dungeonkey", "count": [0,1]}
        ],
        "armorgem": [
            {"item": "rare.armorgem", "count": [3,6]},
            {"item": "epic.armorgem", "count": [2,5]},
            {"item": "legendary.armorgem", "count": [1,3]},
            {"item": "mythic.armorgem", "count": [0,1]}
        ],
        "weapon_drop":{
            "uncommon": 30,
            "rare": 40,
            "epic": 15
        }
    },
    {
        "id": "infernaldragon",
        "name": "Infernal Dragon",
        "type": "dragon",
        "rarity": "ultimate",
        "tier": 14,
        "stats":{
            "attack":[6000,8500],
            "defense":[3000,5500],
            "health":[2500,3300],
            "critic": [0, 5],
            "penetration": [100, 200],
            "accuracy": [90, 100]
        },
        "image": "mobs/infernaldragon.png",
        "skills": [
            69028,
            69029,
            69030
        ],
        "constants": {
            "gold": [160,250],
            "exp": [3000,6000]
        },
        "items" : {
            "righthand": "elven.staff",
            "lefthand": "elven.book",
            "chest": "elven.chest",
            "arms": "elven.arm",
            "leggings": "elven.legs"
        },
        "rewards": ["elven.bow"],
        "keys": [
            {"item": "epic.dungeonkey", "count": [3,6]},
            {"item": "legendary.dungeonkey", "count": [2,5]},
            {"item": "mythic.dungeonkey", "count": [1,3]},
            {"item": "ultimate.dungeonkey", "count": [0,1]}

        ],
        "armorgem": [
            {"item": "epic.armorgem", "count": [3,6]},
            {"item": "legendary.armorgem", "count": [2,5]},
            {"item": "mythic.armorgem", "count": [1,3]},
            {"item": "ultimate.armorgem", "count": [0,1]}
        ],
        "weapon_drop":{
            "rare": 35,
            "epic": 25
        }
    }
];

interface MatchCombinedResult {
    stats: Stats,
    mobStats: Stats,
    mobId: string,
    result: number,
    name: string
}

const match_results: MatchCombinedResult[] = [];

function getEstimatedTime(playerLength: number, estimatedRoundTime: number): number{
    return (players.length - playerLength) * estimatedRoundTime;
}

let processedPlayerLength = 0;

for(const player of players){
    const timer = Date.now();
    for(const mob of mobs){
        for(let i = 0; i < 100; i++){
            const beginStats = _.cloneDeep(player.stats);
            const enemy = createMob(mob);
            const enemyStats = _.cloneDeep(enemy.stats);

            // console.log(`Battle between: ${player.name} and ${mob.id}`)
            const options = new OdenneOptions()
                .addToTeam(0, _.cloneDeep(player))
                .setPVE(1)
                .addToTeam(1, enemy);


            const battle = new Odenne(options);
            
            battle.start();
            while(battle.status.get() === STATUSCODES.STARTED){
                battle.advance();
            }

            const bulkLog = battle.UI.getBulkLog();
            const response = {
                logs: bulkLog,
                end: battle.Referee.result,
            }
            const winStatus = response.end.winner;
            const result: MatchCombinedResult = {
                stats: beginStats,
                name: player.name,
                mobStats: enemyStats,
                mobId: mob.id as string,
                result: winStatus
            }
            match_results.push(result);
        }
    }
    const end = Date.now() - timer;
    console.log(`Estimated time remaining: ${Math.floor(getEstimatedTime(processedPlayerLength, end) / 1000)} seconds`);
    processedPlayerLength++;
}
console.log('total Match count: ', match_results.length);
fs.writeFileSync("./match_results.json", JSON.stringify(match_results));

