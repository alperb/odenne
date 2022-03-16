import Odenne from "../odenne";
import { Log } from "./keeper";
import { Event } from "./narrator";

export default class OdenneUI {
    Odenne: Odenne;
    event!: Event;
    log!: Log;
    constructor(Odenne: Odenne){
        this.Odenne = Odenne;
    }

    getCurrentRoundLog(){
        return `${this.event.getLog()}`;
    }

    getHealth(teamIndex: number){
        return this.Odenne.teams[teamIndex].players[0].player.stats.health;
    }

    saveRound(event: Event, log: Log){
        this.event = event;
        this.log = log;
    }
}