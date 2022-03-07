import _ from "lodash";
import Odenne from "../odenne";
import { DAMAGETYPES, OriginalSkill } from "../types/player";
import { Skill, SkillResult } from "./skills";
import { Player } from "./teams";

export default class Modifiers {
    Odenne: Odenne;
    constructor(Odenne: Odenne){
        this.Odenne = Odenne;
    }

    create(name: string, Player: Player, Skill: Skill): Modifier | undefined{
        switch(name){
            case 'RangeModifier':
                return new RangeModifier(Player, Skill);
            default:
                return undefined;
        }
    }
}

export abstract class Modifier {
    apply(result: SkillResult): any {}
}

export class RangeModifier extends Modifier {
    Player: Player;
    Skill: Skill;

    constructor(Player: Player, Skill: Skill){
        super();
        this.Player = Player;
        this.Skill = Skill;
    }

    apply(result: SkillResult): SkillResult {
        for(let i = 0; i < result.damaged.length; i++){
            if(_.isEqual(result.damaged[i].source, this.Player)){
                if(this.Skill.damageType == DAMAGETYPES.RANGED){
                    const randomized = this.Player.team.Odenne.Rarity.rand(this.Skill.skill.min as number, this.Skill.skill.max as number);
                    result.damaged[i].damage = randomized as number;
                }
                
            }
        }

        return result;
    }
}