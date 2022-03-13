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
    Player: Player;
    Skill: Skill;

    constructor(Player: Player, Skill: Skill){
        this.Player = Player;
        this.Skill = Skill;
    }

    apply(result: SkillResult): any {}
}

export class RangeModifier extends Modifier {
    constructor(Player: Player, Skill: Skill){
        super(Player, Skill);
    }

    apply(result: SkillResult): SkillResult {
        for(let i = 0; i < result.damaged.length; i++){

            if(this.Skill.damageType == DAMAGETYPES.RANGED){
                const randomized = this.calculateDamage();
                result.damaged[i].damage = randomized;
            }

        }

        return result;
    }

    private calculateDamage(){
        const attackBonus = this.Player.player.stats.attack;
        const accuracy = this.Player.player.stats.accuracy >= 100 ? 100 : this.Player.player.stats.accuracy;

        const min = (this.Skill.skill.min as number) + (attackBonus / 2);
        const max = ((this.Skill.skill.max as number) + (attackBonus * accuracy / 100));
        const randomized = this.Player.team.Odenne.Rarity.rand(min, max, -2);

        if(!randomized) return min;
        return randomized;
    }
}