import { OriginalPlayer } from "../types/player";

class OdenneOptions {
    teams: Array<Array<OriginalPlayer>>;
    isPVE: boolean;
    PVETeamIndex: number | undefined;
    shouldCalculateItems: Array<boolean>;
    roundLimit: number;
    shouldOverwriteHealth: boolean;
    healthOverwrite: number[];

    constructor(){
        this.teams = [[], []];
        this.isPVE = false;
        this.PVETeamIndex = undefined;
        this.shouldCalculateItems = [true, true];
        this.roundLimit = 11;
        this.shouldOverwriteHealth = false;
        this.healthOverwrite = [];
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
        return this;
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
        return this;
    }

    shouldCalculateItemStats(index: number){
        return this.shouldCalculateItems[index];
    }

    overwriteHealth(teamIndex: number, playerIndex: number, health: number){
        this.shouldOverwriteHealth = true;
        this.healthOverwrite = [teamIndex, playerIndex, health];
    }
}
export default OdenneOptions;