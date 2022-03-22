import Odenne from "../odenne";
import { Stats } from "../types/player";
import { EventLog } from "../types/types";
import { Log } from "./keeper";
import { Event } from "./narrator";

export default class OdenneUI {
    Odenne: Odenne;
    event!: EventLog;
    log!: Log;
    constructor(Odenne: Odenne){
        this.Odenne = Odenne;
    }

    getCurrentRoundLog(){
        return `${this.event.log}`;
    }

    getHealth(teamIndex: number): number[] {
        let healths: number[] = [];
        this.Odenne.teams[teamIndex].players.forEach(p => {
            healths.push(p.player.stats.health);
        });
        return healths;
    }

    getName(teamIndex: number): string {
        return this.Odenne.teams[teamIndex].players[0].original.name;
    }

    getStats(teamIndex: number){
        let stats: Stats[] = [];
        this.Odenne.teams[teamIndex].players.forEach(p => {
            stats.push(p.player.stats);
        });
        return stats;
    }

    getShields(teamIndex: number): number[] {
        let shields: number[] = [];
        this.Odenne.teams[teamIndex].players.forEach(p => {
            shields.push(p.player.shields.temporary.reduce((prev, next) => prev + next.value, 0) + p.player.shields.permanent);
        });
        return shields;
    }

    saveRound(event: EventLog, log: Log){
        this.event = event;
        this.log = log;
    }
}