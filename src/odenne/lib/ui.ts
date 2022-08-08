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
        const summ: UILog = {
            log: this.getCurrentRoundLog(),
            players: [[this.getName(0)], [this.getName(1)]],
            healths: [this.getHealth(0), this.getHealth(1)],
            shields: [this.getShields(0), this.getShields(1)],
            critics: [this.getCritics(0), this.getCritics(1)],
            attacks: [this.getAttacks(0), this.getAttacks(1)],
            accuracies: [this.getAccuracies(0), this.getAccuracies(1)],
            penetrations: [this.getPenetrations(0), this.getPenetrations(1)],

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
        const healths: number[] = [];
        this.Odenne.teams[teamIndex].players.forEach(p => {
            healths.push(_.clone(p.getStat('health')));
        });
        return healths;
    }

    getName(teamIndex: number): string {
        return this.Odenne.teams[teamIndex].players[0].original.name;
    }

    getStats(teamIndex: number){
        const stats: Stats[] = [];
        this.Odenne.teams[teamIndex].players.forEach(p => {
            stats.push(p.player.stats);
        });
        return stats;
    }

    getShields(teamIndex: number): number[] {
        const shields: number[] = [];
        this.Odenne.teams[teamIndex].players.forEach(p => {
            shields.push(p.player.shields.temporary.reduce((prev, next) => prev + next.value, 0) + p.player.shields.permanent);
        });
        return shields;
    }

    getCritics(teamIndex: number): number[] {
        const critics: number[] = []
        this.Odenne.teams[teamIndex].players.forEach(player => {
            critics.push(player.player.stats.critic);
        });
        return critics;
    }

    getAttacks(teamIndex: number): number[] {
        const attacks: number[] = []
        this.Odenne.teams[teamIndex].players.forEach(player => {
            attacks.push(player.player.stats.attack);
        });
        return attacks;
    }

    getPenetrations(teamIndex: number): number[] {
        const penetrations: number[] = []
        this.Odenne.teams[teamIndex].players.forEach(player => {
            penetrations.push(player.player.stats.penetration);
        });
        return penetrations;
    }

    getAccuracies(teamIndex: number): number[] {
        const accuracies: number[] = []
        this.Odenne.teams[teamIndex].players.forEach(player => {
            accuracies.push(player.player.stats.accuracy);
        });
        return accuracies;
    }

    saveRound(event: EventLog, log: Log){
        this.event = event;
        this.log = log;
        this.getRound();
    }
}