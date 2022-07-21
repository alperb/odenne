import path from 'path';
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from '../proto.output/odenne'
import { GRPCService } from "../../types/grpc";
import OdenneServiceHelper from '../helpers/odenneServiceHelper';
import { OdenneServerClient } from '../proto.output/odenneServerPackage/OdenneServer';
import { CreateSessionRequest } from '../proto.output/odenneServerPackage/CreateSessionRequest';
import { CreateSessionResponse } from '../proto.output/odenneServerPackage/CreateSessionResponse';
import { BattleResponse } from '../proto.output/odenneServerPackage/BattleResponse';
import { BattleRequest } from '../proto.output/odenneServerPackage/BattleRequest';
// import { UILog } from '../proto.output/odenneServerPackage/UILog';
import { UILog } from '../../odenne/types/types';
import { PlayerStatistics } from '../proto.output/odenneServerPackage/PlayerStatistics';
import { MatchResult } from '../proto.output/odenneServerPackage/MatchResult';

export default class OdenneTestClient {
    file: string;
    packageDefinition: protoLoader.PackageDefinition;
    grpcObj: ProtoGrpcType;
    client: OdenneServerClient;

    constructor(){
        this.file = path.join(__dirname, '../proto/odenne.proto');
        this.packageDefinition = protoLoader.loadSync(path.resolve(__dirname, this.file))
        this.grpcObj = (grpc.loadPackageDefinition(this.packageDefinition) as unknown) as ProtoGrpcType;
        this.client = new this.grpcObj.odenneServerPackage.OdenneServer('localhost:5020', grpc.credentials.createInsecure());
    }

    testCreateSession(): Promise<CreateSessionResponse> {
        return new Promise<CreateSessionResponse>((resolve, reject) => {
            const waffle =  {
                "badges": [
                  "6213e0112f386967ce30d912",
                  "62901dd6e21a1170936ac873"
                ],
                "boost": {
                  "isBoost": false,
                  "boost": {
                    "duration": 1656318202.067306,
                    "health": [
                      0,
                      30
                    ],
                    "name": "Milk"
                  }
                },
                "class": "archer",
                "creation_date": 1653882569868,
                "credits": 292685,
                "experience": 10003155,
                "frame": "627858a512239ed799270977",
                "guild": "629b47c124576a92168a6bfa",
                "id": "a892c1fb-6e5c-4fa3-a65a-205268b3d62d",
                "inventoryCapacity": 54,
                "isDead": false,
                "isDueling": {
                  "status": false,
                  "lastUpdate": 1657757530.356504
                },
                "lastChangeName": 0,
                "league": {
                  "league": {
                    "images": {
                      "bank": {},
                      "duel": {},
                      "inventory": {},
                      "profile": {}
                    },
                    "mmrRange": [
                      0,
                      149
                    ],
                    "name": "Iron 1",
                    "rankOrder": 0,
                    "rewards": {},
                    "texts": {
                      "downgrade": "",
                      "upgrade": ""
                    },
                    "type": "v-points",
                    "utility": {
                      "emoji": "908830825099952158",
                      "image": "/leagues/iron.png"
                    }
                  },
                  "leaguePoint": 19,
                  "loseStreak": [],
                  "matchSeries": {
                    "isSeries": false,
                    "series": []
                  },
                  "status": {
                    "demoteRank": false,
                    "fallOfSeries": false,
                    "promoteRank": false
                  },
                  "streak": {
                    "lose": 0,
                    "win": 1
                  },
                  "top10Matches": [
                    1,
                    1,
                    1,
                    1,
                    0,
                    1,
                    1,
                    1,
                    1,
                    0
                  ],
                  "winRate": {
                    "draw": 0,
                    "lose": 2,
                    "win": 9
                  }
                },
                "name": "waffle",
                "owned_frames": [
                  "615a73f3b552823bf4a7b3df",
                  "627858a512239ed799270977"
                ],
                "power": 9765,
                "presets": [],
                "rank_points": 38,
                "skills": [
                  0,
                  10
                ],
                "starting_channel": "933510767955820614",
                "starting_server": "759433456475570207",
                "stats": {
                  "accuracy": 50,
                  "attack": 185,
                  "critic": 0,
                  "defense": 60,
                  "health": 61,
                  "penetration": 0
                },
                "tempInventory": [],
                "title": {
                  "_id": "612be84c0c8fa0bf8e04971c",
                  "title": "`Developer`"
                },
                "wearings": {
                  "arms": {
                    "class": "archer",
                    "code": "raider.arm",
                    "crafting": [],
                    "deconstruct": [],
                    "durability": 100,
                    "emoji": {
                      "id": "942126966289596466"
                    },
                    "function": [],
                    "id": "79b1bdc8-aac3-4cc5-8c68-15bcebc9fd2e",
                    "image": {
                      "inventory": "item/inventory-items/raider/archer/arm.png",
                      "original": [
                        "item/set/raider/archer/leftshoulderarm.png",
                        "item/set/raider/archer/rightshoulderarm.png"
                      ],
                      "wearings": "item/wearings/raider/archer/arm.png"
                    },
                    "isTradeable": true,
                    "name": "Waffle Arms",
                    "placement": "arms",
                    "rarity": 5,
                    "set": "raider.set",
                    "soulbind": {
                      "date": 1656525334203.6062,
                      "isBindable": true,
                      "isBound": true,
                      "player": {
                        "characterId": "a892c1fb-6e5c-4fa3-a65a-205268b3d62d",
                        "snowflake": "181348050436882432"
                      }
                    },
                    "stack": 1,
                    "stats": {
                      "attack": 999,
                      "defense": 999,
                      "health": 999
                    },
                    "type": "armor"
                  },
                  "chest": {
                    "class": "archer",
                    "code": "raider.chest",
                    "crafting": [],
                    "deconstruct": [],
                    "durability": 100,
                    "emoji": {
                      "id": "942126966277017610"
                    },
                    "function": [],
                    "id": "08502c7f-5a2f-4c47-931c-fceafc41675b",
                    "image": {
                      "inventory": "item/inventory-items/raider/archer/chest.png",
                      "original": "item/set/raider/archer/chestwaist.png",
                      "wearings": "item/wearings/raider/archer/chest.png"
                    },
                    "isTradeable": true,
                    "name": "Waffle Chest",
                    "placement": "chest",
                    "rarity": 5,
                    "set": "raider.set",
                    "soulbind": {
                      "date": 1656525191699.1812,
                      "isBindable": true,
                      "isBound": true,
                      "player": {
                        "characterId": "a892c1fb-6e5c-4fa3-a65a-205268b3d62d",
                        "snowflake": "181348050436882432"
                      }
                    },
                    "stack": 1,
                    "stats": {
                      "attack": 999,
                      "defense": 999,
                      "health": 999
                    },
                    "type": "armor"
                  },
                  "lefthand": {
                    "class": "archer",
                    "code": "raider.arrow",
                    "crafting": [],
                    "deconstruct": [],
                    "durability": 100,
                    "emoji": {
                      "id": "942126965228462090"
                    },
                    "function": [],
                    "id": "8366193e-842c-4abb-be67-7f6fdc248c71",
                    "image": {
                      "inventory": "item/inventory-items/raider/archer/arrow.png",
                      "original": "item/set/raider/archer/arrow.png",
                      "wearings": "item/wearings/raider/archer/arrow.png"
                    },
                    "isTradeable": true,
                    "name": "Waffle Arrow",
                    "placement": "lefthand",
                    "rarity": 5,
                    "set": "raider.set",
                    "soulbind": {
                      "date": 1656525356276.5178,
                      "isBindable": true,
                      "isBound": true,
                      "player": {
                        "characterId": "a892c1fb-6e5c-4fa3-a65a-205268b3d62d",
                        "snowflake": "181348050436882432"
                      }
                    },
                    "stack": 1,
                    "stats": {
                      "attack": 9999,
                      "critic": 9999,
                      "penetration": 9999
                    },
                    "type": "weapon"
                  },
                  "leggings": {
                    "class": "archer",
                    "code": "raider.legs",
                    "crafting": [],
                    "deconstruct": [],
                    "durability": 100,
                    "emoji": {
                      "id": "942126966537060453"
                    },
                    "function": [],
                    "id": "11641f4c-41c2-4fdc-8530-e42a7fa2b9f0",
                    "image": {
                      "inventory": "item/inventory-items/raider/archer/legs.png",
                      "original": "item/set/raider/archer/legs.png",
                      "wearings": "item/wearings/raider/archer/legs.png"
                    },
                    "isTradeable": true,
                    "name": "Waffle Legs",
                    "placement": "leggings",
                    "rarity": 5,
                    "set": "raider.set",
                    "soulbind": {
                      "date": 1656525334898.929,
                      "isBindable": true,
                      "isBound": true,
                      "player": {
                        "characterId": "a892c1fb-6e5c-4fa3-a65a-205268b3d62d",
                        "snowflake": "181348050436882432"
                      }
                    },
                    "stack": 1,
                    "stats": {
                      "attack": 999,
                      "defense": 999,
                      "health": 999
                    },
                    "type": "armor"
                  },
                  "righthand": {
                    "class": "archer",
                    "code": "raider.bow",
                    "crafting": [],
                    "deconstruct": [],
                    "durability": 100,
                    "emoji": {
                      "id": "942126966268657735"
                    },
                    "function": [],
                    "id": "a4ca21a6-42e9-4421-912a-afe52bd4ec19",
                    "image": {
                      "inventory": "item/inventory-items/raider/archer/bow.png",
                      "original": "item/set/raider/archer/bow.png",
                      "wearings": "item/wearings/raider/archer/bow.png"
                    },
                    "isTradeable": true,
                    "name": "Waffle Bow",
                    "placement": "righthand",
                    "rarity": 5,
                    "set": "raider.set",
                    "soulbind": {
                      "date": 1656525355490.405,
                      "isBindable": true,
                      "isBound": true,
                      "player": {
                        "characterId": "a892c1fb-6e5c-4fa3-a65a-205268b3d62d",
                        "snowflake": "181348050436882432"
                      }
                    },
                    "stack": 1,
                    "stats": {
                      "attack": 9999,
                      "critic": 9999,
                      "penetration": 9999
                    },
                    "type": "weapon"
                  },
                  "skills": [
                    0,
                    10,
                    -1,
                    -1,
                    -1
                  ]
                },
                "discriminator": "0000",
                "statpoints": {
                  "available": 9,
                  "attack": 0,
                  "health": 0,
                  "defense": 0
                },
                "oldSlots": {
                  "inventoryCapacity": 32
                },
                "snowflake": "181348050436882432",
                "valenia_points": 0,
                "subscription": {
                  "current": {
                    "end": 1659117551681,
                    "start": 1656524651681,
                    "type": 6
                  },
                  "history": [
                    {
                      "end": 1661659349392,
                      "start": 1653883349392,
                      "type": 2
                    },
                    {
                      "end": 1685587278314,
                      "start": 1654483278314,
                      "type": 7
                    },
                    {
                      "end": 1661128302411,
                      "start": 1655942502411,
                      "type": 7
                    },
                    {
                      "end": 1659117514918,
                      "start": 1656524614918,
                      "type": 7
                    }
                  ],
                  "isActive": true
                }
            }
            this.client.createSession({player: Buffer.from(JSON.stringify(waffle), 'utf-8')} as CreateSessionRequest, (err, response) => {
                if(err) {
                    reject(err);
                } else {
                    resolve((response as CreateSessionResponse));
                }
            })
        })
    }

    testBattle(): Promise<unknown> {
        return new Promise<unknown>((resolve, reject) => {
            this.testCreateSession()
            .then(rr => {
                const sessionkey = rr.session;
                const enemy = {
                    name: 'Bilganin Annesi',
                    skills: [0, 10, 20, 30, 120],
                    stats: {
                        attack: [0, 100],
                        health: [0, 100],
                        defense: [0, 100],
                        penetration: [0, 100],
                        accuracy: [0, 100],
                        critic: [0, 100],
                    }
                }
                this.client.battle({session: sessionkey, enemy: Buffer.from(JSON.stringify(enemy), 'utf-8')} as BattleRequest, (err, response) => {
                    if(err) {
                        reject(err);
                    } else {
                        if(response){
                            const readableResponse = {
                                result: response.result,
                                logs: JSON.parse((response.logs as Buffer).toString('utf-8')) as UILog[],
                                stats: JSON.parse((response.stats as Buffer).toString('utf-8')) as PlayerStatistics[][],
                                end: response.end as MatchResult,
                            }
                            resolve(readableResponse);
                        }
                        
                    }
                });
            });
            
        })
    }
}