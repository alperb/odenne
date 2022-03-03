import Odenne from "../odenne";
import { STATUSCODES } from '../types/types';

class OdenneStatus {
    Odenne: Odenne;
    codes: {[key: string]: string};
    error: Error | undefined;
    status: string;

    /**
     * Constructs a StatusController
     * @param {Odenne} Odenne Instance of Odenne
     */
    constructor(Odenne: Odenne){
        this.Odenne = Odenne;

        this.codes = {
            INITIALIZED: STATUSCODES.INITIALIZED,
            PREPARING: STATUSCODES.PREPARING,
            STARTED: STATUSCODES.STARTED,
            FINISHED: STATUSCODES.FINISHED,
            ERRORED: STATUSCODES.ERRORED
        }

        this.error = undefined;

        this.status = this.codes.INITIALIZED;
    }

    /**
     * Gets the status
     * @returns {string} status
     */
    get(){
        return this.codes[this.status];
    }

    /**
     * Sets the status
     * @param {string} index Status Code
     */
    set(value: string){
        this.status = this.codes[value];
    }

    /**
     * Logs the error
     * @param {Error} err Error object
     */
    setError(err: Error | undefined){
        this.error = err;
    }
}
export default OdenneStatus;