import Odenne from "../odenne";
import { Round } from "./rounds";

export default class Keeper {
    Odenne: Odenne;
    logs: Array<Log>;

    constructor(Odenne: Odenne){
        this.Odenne = Odenne;
        this.logs = [];
    }

    /**
     * Creates a new Log
     * @returns {Log} Log
     */
    log(attackRound: Round, defenseRound?: Round): Log {
        const log = new Log(attackRound, defenseRound);
        return log;
    }

    /**
     * Saves the log object to logs
     * @param {Log} log Log object to save
     */
    save(log: Log){
        this.logs.push(log);
    }
}

export class Log {
    attackRound: Round;
    defenseRound?: Round;

    constructor(attackRound: Round, defenseRound?: Round){
        this.attackRound = attackRound;
        this.defenseRound = defenseRound;
    }
}