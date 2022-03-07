import Odenne from "../odenne";
import { STATUSCODES, TurnTypes } from "../types/types";

export default class Rounds {
    Odenne: Odenne;


    constructor(Odenne: Odenne){
        this.Odenne = Odenne;
    }

    create(type: TurnTypes): Round{
        if(type === TurnTypes.ATTACK){
            return new AttackRound(this.Odenne);
        }
        else return new DefenseRound(this.Odenne);;
    }
}

export class RoundResult {

}

export abstract class Round {
    Odenne: Odenne;
    constructor(Odenne: Odenne){
        this.Odenne = Odenne;
    }

    simulate(){
        this.beforeRun();
        this.run();
        this.afterRun();
    }

    beforeRun(){}
    
    run(){}

    afterRun(){}
}

export class AttackRound extends Round {
    constructor(Odenne: Odenne){
        super(Odenne);
    }

    run() {
        try{
            const usedSkill = this.Odenne.Referee.turn.player.player?.getRandomSkill();
            if(usedSkill){
                const result = usedSkill.run();
                console.log({r: result.damaged});
            }
            else{
                // its nearly impossible to be here but safety first...
                throw this.Odenne.exceptions.UNDEFINED_SKILL;
            }
        }
        catch(e){
            console.log(e);
        }
        
    }
}

export class DefenseRound extends Round {
    constructor(Odenne: Odenne){
        super(Odenne);
    }
}