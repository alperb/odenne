import OdenneOptions from './odenne/helpers/options';
import Odenne from './odenne/odenne';


const player1 = {
    "class": "warrior",
    "wearings": {
        "leggings": {
            "placement": "leggings",
            "function": [],
            "stack": 1,
            "set": "rookie.set",
            "image": {
                "original": "item/set/rookie/archer/legs.png",
                "wearings": "item/wearings/rookie/archer/legs.png"
            },
            "code": "rookie.legs",
            "deconstruct": [],
            "durability": 100,
            "crafting": [],
            "stats": {},
            "rarity": 0,
            "class": "archer",
            "id": "a3c97036-2052-45eb-9569-f433d876beda",
            "isTradeable": true,
            "emoji": {
                "id": "864633251677863946"
            },
            "type": "armor",
            "soulbind": {
                "date": 0,
                "isBindable": false,
                "isBound": false,
                "player": {
                    "snowflake": "",
                    "characterId": ""
                }
            },
            "name": "Rookie Legs"
        },
        "righthand": {
            "rarity": 0,
            "set": "rookie.set",
            "type": "weapon",
            "stats": {},
            "emoji": {
                "id": "864633251326459955"
            },
            "image": {
                "original": "item/set/rookie/archer/rightbow.png",
                "wearings": "item/wearings/rookie/archer/bow.png"
            },
            "deconstruct": [],
            "id": "b84edf47-8949-4c56-b5c2-fd6b3517f344",
            "code": "rookie.bow",
            "isTradeable": true,
            "durability": 0,
            "name": "Rookie Bow",
            "soulbind": {
                "isBindable": true,
                "isBound": false,
                "player": {
                    "snowflake": "",
                    "characterId": ""
                },
                "date": 1
            },
            "function": [],
            "placement": "righthand",
            "stack": 1,
            "class": "archer",
            "crafting": []
        },
        "lefthand": {
            "name": "Rookie arrow",
            "function": [],
            "deconstruct": [],
            "stack": 1,
            "stats": {},
            "durability": 0,
            "code": "rookie.arrow",
            "isTradeable": true,
            "emoji": {
                "id": "864633251993223179"
            },
            "class": "archer",
            "image": {
                "original": "item/set/rookie/archer/leftarrow.png",
                "wearings": "item/wearings/rookie/archer/arrow.png"
            },
            "set": "ancient.set",
            "id": "e1be694f-abe5-48e1-b70f-786cbb37b813",
            "placement": "lefthand",
            "rarity": 0,
            "soulbind": {
                "date": 0,
                "isBindable": true,
                "isBound": false,
                "player": {
                    "characterId": "",
                    "snowflake": ""
                }
            },
            "type": "weapon",
            "crafting": []
        },
        "skills": [
            3000,
            3010,
            3020,
            3040,
            3110
        ],
        "chest": {
            "id": "1bf5a276-e827-42a7-9b70-9bc001d1b6fd",
            "code": "ancient.chest",
            "name": "Ancient Chest",
            "type": "armor",
            "placement": "chest",
            "durability": 0,
            "rarity": 4,
            "set": "ancient.set",
            "isTradeable": true,
            "soulbind": {
                "isBindable": true,
                "isBound": true,
                "player": {
                    "snowflake": "181348050436882432",
                    "characterId": "a30e405d-d75c-4874-9f77-70fa5d106027"
                },
                "date": 1633911564442.767
            },
            "stack": 1,
            "stats": {
                "penetration": 0
            },
            "function": [],
            "class": "archer",
            "image": {
                "original": "item/set/ancient/archer/chestwaist.png",
                "inventory": "item/inventory-items/ancient/archer/chest.png",
                "wearings": "item/wearings/ancient/archer/chest.png"
            },
            "emoji": {
                "id": "865966374558629909"
            },
            "deconstruct": [],
            "crafting": []
        },
        "arms": {
            "set": "rookie.set",
            "stack": 1,
            "class": "archer",
            "isTradeable": true,
            "name": "Rookie Arms",
            "image": {
                "original": ["item/set/rookie/archer/leftshoulderarm.png", "item/set/rookie/archer/rightshoulderarm.png"],
                "wearings": "item/wearings/rookie/archer/arm.png"
            },
            "deconstruct": [],
            "stats": {},
            "id": "b045e142-8ee0-4c30-83b0-e9f6d989b4d0",
            "function": [],
            "type": "armor",
            "emoji": {
                "id": "864633250193997834"
            },
            "placement": "arms",
            "durability": 100,
            "crafting": [],
            "soulbind": {
                "isBindable": false,
                "isBound": false,
                "player": {
                    "snowflake": "",
                    "characterId": ""
                },
                "date": 0
            },
            "rarity": 0,
            "code": "rookie.arm"
        }
    },
    "boost": {
        "isBoost": false,
        "boost": {}
    },
    "stats": {
        "defense": 250,
        "attack": 380,
        "health": 300,
        critic: 0,
        penetration: 0,
        accuracy: 100
    },
    "name": "Waffle",
    "isDead": false,
    "skills": [],
    discriminator: '#1234',
    snowflake: '123',
    characterId: '123'
}
const player2 = {
    "class": "archer",
    "wearings": {
        "leggings": {
            "placement": "leggings",
            "function": [],
            "stack": 1,
            "set": "rookie.set",
            "image": {
                "original": "item/set/rookie/archer/legs.png",
                "wearings": "item/wearings/rookie/archer/legs.png"
            },
            "code": "rookie.legs",
            "deconstruct": [],
            "durability": 100,
            "crafting": [],
            "stats": {},
            "rarity": 0,
            "class": "archer",
            "id": "a3c97036-2052-45eb-9569-f433d876beda",
            "isTradeable": true,
            "emoji": {
                "id": "864633251677863946"
            },
            "type": "armor",
            "soulbind": {
                "date": 0,
                "isBindable": false,
                "isBound": false,
                "player": {
                    "snowflake": "",
                    "characterId": ""
                }
            },
            "name": "Rookie Legs"
        },
        "righthand": {
            "rarity": 0,
            "set": "rookie.set",
            "type": "weapon",
            "stats": {},
            "emoji": {
                "id": "864633251326459955"
            },
            "image": {
                "original": "item/set/rookie/archer/rightbow.png",
                "wearings": "item/wearings/rookie/archer/bow.png"
            },
            "deconstruct": [],
            "id": "b84edf47-8949-4c56-b5c2-fd6b3517f344",
            "code": "rookie.bow",
            "isTradeable": true,
            "durability": 0,
            "name": "Rookie Bow",
            "soulbind": {
                "isBindable": true,
                "isBound": false,
                "player": {
                    "snowflake": "",
                    "characterId": ""
                },
                "date": 1
            },
            "function": [],
            "placement": "righthand",
            "stack": 1,
            "class": "archer",
            "crafting": []
        },
        "lefthand": {
            "name": "Rookie arrow",
            "function": [],
            "deconstruct": [],
            "stack": 1,
            "stats": {},
            "durability": 0,
            "code": "rookie.arrow",
            "isTradeable": true,
            "emoji": {
                "id": "864633251993223179"
            },
            "class": "archer",
            "image": {
                "original": "item/set/rookie/archer/leftarrow.png",
                "wearings": "item/wearings/rookie/archer/arrow.png"
            },
            "set": "ancient.set",
            "id": "e1be694f-abe5-48e1-b70f-786cbb37b813",
            "placement": "lefthand",
            "rarity": 0,
            "soulbind": {
                "date": 0,
                "isBindable": true,
                "isBound": false,
                "player": {
                    "characterId": "",
                    "snowflake": ""
                }
            },
            "type": "weapon",
            "crafting": []
        },
        "skills": [
            0,
            10,
            20,
            30,
            110
        ],
        "chest": {
            "id": "1bf5a276-e827-42a7-9b70-9bc001d1b6fd",
            "code": "ancient.chest",
            "name": "Ancient Chest",
            "type": "armor",
            "placement": "chest",
            "durability": 0,
            "rarity": 4,
            "set": "ancient.set",
            "isTradeable": true,
            "soulbind": {
                "isBindable": true,
                "isBound": true,
                "player": {
                    "snowflake": "181348050436882432",
                    "characterId": "a30e405d-d75c-4874-9f77-70fa5d106027"
                },
                "date": 1633911564442.767
            },
            "stack": 1,
            "stats": {
                "defense": 0
            },
            "function": [],
            "class": "archer",
            "image": {
                "original": "item/set/ancient/archer/chestwaist.png",
                "inventory": "item/inventory-items/ancient/archer/chest.png",
                "wearings": "item/wearings/ancient/archer/chest.png"
            },
            "emoji": {
                "id": "865966374558629909"
            },
            "deconstruct": [],
            "crafting": []
        },
        "arms": {
            "set": "rookie.set",
            "stack": 1,
            "class": "archer",
            "isTradeable": true,
            "name": "Rookie Arms",
            "image": {
                "original": ["item/set/rookie/archer/leftshoulderarm.png", "item/set/rookie/archer/rightshoulderarm.png"],
                "wearings": "item/wearings/rookie/archer/arm.png"
            },
            "deconstruct": [],
            "stats": {},
            "id": "b045e142-8ee0-4c30-83b0-e9f6d989b4d0",
            "function": [],
            "type": "armor",
            "emoji": {
                "id": "864633250193997834"
            },
            "placement": "arms",
            "durability": 100,
            "crafting": [],
            "soulbind": {
                "isBindable": false,
                "isBound": false,
                "player": {
                    "snowflake": "",
                    "characterId": ""
                },
                "date": 0
            },
            "rarity": 0,
            "code": "rookie.arm"
        }
    },
    "boost": {
        "isBoost": false,
        "boost": {}
    },
    "stats": {
        "defense": 120,
        "attack": 420,
        "health": 250,
        critic: 0,
        penetration: 0,
        accuracy: 100
    },
    "name": "Edip",
    "isDead": false,
    "skills": [],
    discriminator: '#1234',
    snowflake: '1234',
    characterId: '1234'
}

const options = new OdenneOptions();
options
    .addToTeam(0, player1)
    //.addToTeam(0, player15)
    .addToTeam(1, player2)
    //.addToTeam(1, player25);

import { STATUSCODES } from './odenne/types/types';

try{
    const battle = new Odenne(options);

    battle.start();
        // console.log('=======================');
    while(battle.status.get() === STATUSCODES.STARTED){
        try{
            battle.advance();
            console.log(battle.UI.getCurrentRoundLog());
            console.log({t1: battle.UI.getHealth(0), t2: battle.UI.getHealth(1)});

            console.log({a: battle.teams[0].players[0].player.stats.attack, b: battle.teams[0].players[0].getStat("attack")});
            console.log({a: battle.teams[1].players[0].player.stats.attack, b: battle.teams[1].players[0].getStat("attack")});

            console.log({d: battle.teams[0].players[0].player.stats.defense, b: battle.teams[0].players[0].getStat("defense")});
            console.log({d: battle.teams[1].players[0].player.stats.defense, b: battle.teams[1].players[0].getStat("defense")});

            console.log({c: battle.teams[0].players[0].player.stats.critic});
            console.log({c: battle.teams[1].players[0].player.stats.critic});

            console.log({p: battle.teams[0].players[0].player.stats.penetration});
            console.log({p: battle.teams[1].players[0].player.stats.penetration});

            console.log({s: battle.teams[0].players[0].player.shields.temporary[0]});
            console.log({s: battle.teams[1].players[0].player.shields.temporary[0]});
        }
        catch(e){
            const used = process.memoryUsage().heapUsed / 1024 / 1024;
            console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
            console.log(e);
        }
    }
        
    // console.log('=======================');
    // console.log(battle.Statistics.teams[1][0].totalDamageDone);
    // console.log('=======================');
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
}
catch(e){
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
    console.log(e);
}