import Odenne from "../odenne";
import { DeciderSummary, STATUSCODES, TurnTypes } from "../types/types";
import { DefenseSkill } from "./skills";
import { Member } from "./teams";

export default class Rounds {
    Odenne: Odenne;


    constructor(Odenne: Odenne){
        this.Odenne = Odenne;
    }

    create(type: TurnTypes): Round{
        if(type === TurnTypes.ATTACK){
            return new AttackRound(this.Odenne);
        }
        else return new DefenseRound(this.Odenne);
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
                //console.log({usedSkill});
                // TODO: shield strike log cikarmiyor

                for(const damage of result.damaged){
                    this.doDefense(damage.target);
                }
                
                //TODO DEFENSE icin kontroller burda yapilacak.

                this.Odenne.Referee.applyRound();
                this.Odenne.Referee.applyDamage();
                this.Odenne.Referee.applyShield();

                let summaries: DeciderSummary[] = [];
                for(const team of this.Odenne.teams){
                    summaries.push(team.getSummaries());
                }

                const log = this.Odenne.Keeper.log(summaries);
                this.Odenne.Keeper.save(log)
                this.Odenne.Narrator.generate();
                this.Odenne.Referee.clearRound();
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

    private doDefense(player: Member){
        const defSkill = player.getRandomSkill();
        if(defSkill instanceof DefenseSkill){
            defSkill.run();
        }
    }
}

export class DefenseRound extends Round {
    constructor(Odenne: Odenne){
        super(Odenne);
    }
}