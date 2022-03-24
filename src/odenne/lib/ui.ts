import _ from "lodash";
import Odenne from "../odenne";
import { Stats } from "../types/player";
import { EventLog, UILog } from "../types/types";
import { Log } from "./keeper";

export default class OdenneUI {
    Odenne: Odenne;
    event!: EventLog;
    log!: Log;
    bulkLog!: UILog[];

    constructor(Odenne: Odenne){
        this.Odenne = Odenne;
        this.bulkLog = [];
    }

    getRound(){
        let summ: UILog = {
            log: this.getCurrentRoundLog(),
            players: [[this.getName(0)], [this.getName(1)]],
            healths: [this.getHealth(0), this.getHealth(1)],
            shields: [this.getShields(0), this.getShields(1)],
            turn: this.Odenne.Referee.turn.team
        }
        this.bulkLog.push(summ);
        return summ;
    }

    getBulkLog(): UILog[] {
        return this.bulkLog;
    }

    getCurrentRoundLog(){
        return this.event?.log ?? `Nothing happened in this round`;
    }

    getHealth(teamIndex: number): number[] {
        let healths: number[] = [];
        this.Odenne.teams[teamIndex].players.forEach(p => {
            healths.push(_.clone(p.player.stats.health));
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
        this.getRound();
    }
}