import { Player } from "../lib/teams";
import { OriginalPlayer } from "../types/player";

class OdenneOptions {
    teams: Array<Array<OriginalPlayer>>;
    isPVE: boolean;
    PVETeamIndex: number | undefined;
    shouldCalculateItems: Array<boolean>;
    roundLimit: number;

    constructor(){
        this.teams = [[], []];
        this.isPVE = false;
        this.PVETeamIndex = undefined;
        this.shouldCalculateItems = [true, true];
        this.roundLimit = 11;
    }

    /**
     * Adds player to the team
     * @param {0 | 1} index Team index
     * @param {Object} players Player object without any modification
     */
    addToTeam(index: number, player: OriginalPlayer){
        this.teams[index].push(player);
        return this;
    }

    /**
     * Sets the round limit
     * @param {number} val Round limit
     */
    setRoundLimit(val: number){
        this.roundLimit = val;
    }

    /**
     * Sets the given team is mob
     * @param {0 | 1} index Team index
     */
    setPVE(index: number){
        this.isPVE = true;
        this.PVETeamIndex = index;
        return this;
    }

    /**
     * Decide whether item stats should be calculated while preparing
     * @param {0 | 1} index Team index
     * @param {Boolean} value Whether items should be calculated
     */
    calculateItemStats(index: number, value: boolean){
        this.shouldCalculateItems[index] = value;
    }

    shouldCalculateItemStats(index: number){
        return this.shouldCalculateItems[index];
    }
}
export default OdenneOptions;