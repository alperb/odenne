import OdenneOptions from './helpers/options';
import Odenne from './odenne';


let player1 = {
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
            120,
            110,
            60,
            13
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
                "defense": 69
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
        "defense": 156,
        "attack": 150,
        "health": 120,
        critic: 70,
        penetration: 110,
        accuracy: 30
    },
    "name": "Waffle",
    "isDead": false,
    "skills": [],
    discriminator: '#1234'
}
let player2 = {
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
            120,
            110,
            60,
            13
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
                "defense": 69
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
        "defense": 156,
        "attack": 150,
        "health": 120,
        critic: 70,
        penetration: 110,
        accuracy: 30
    },
    "name": "Edip",
    "isDead": false,
    "skills": [],
    discriminator: '#1234'
}

const options = new OdenneOptions();
options
    .addToTeam(0, player1)
    .addToTeam(1, player2);

    
try{
    let battle = new Odenne(options);

    console.log(battle.teams);
}
catch(e){
    console.log(e);
}