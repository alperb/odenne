import Odenne from "..";
import { DeciderSummary } from "../types/types";

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
    log(summaries: DeciderSummary[]): Log {
        const log = new Log(summaries);
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
    summaries: DeciderSummary[];

    constructor(summaries: DeciderSummary[]){
        this.summaries = summaries;
    }
}