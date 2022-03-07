import Odenne from "../odenne";

export default class OdenneUI {
    Odenne: Odenne;
    constructor(Odenne: Odenne){
        this.Odenne = Odenne;
    }

    getCurrentRoundLog(){
        return 'test';
    }

    getHealth(teamIndex: number){
        return this.Odenne.teams[teamIndex].players[0].player.stats.health;
    }
}