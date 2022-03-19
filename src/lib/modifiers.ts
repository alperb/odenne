import _ from "lodash";
import Odenne from "../odenne";
import { DAMAGETYPES, OriginalSkill } from "../types/player";
import { CriticResult, DamageDone } from "../types/types";
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
            case 'CriticModifier':
                return new CriticModifier(Player, Skill);
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

    abstract apply(result: SkillResult): SkillResult;
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

        for(let i = 0; i < result.shields.length; i++){
            const randomized = this.calculateShield();
            result.shields[i].value = randomized;
        }

        return result;
    }
    
    private calculateDamage(){
        const attackBonus = this.Player.getStat("attack");
        const accuracy = this.Player.getStat("accuracy") >= 100 ? 100 : this.Player.getStat("accuracy");

        const min = (this.Skill.skill.min as number) + (attackBonus / 2);
        const max = ((this.Skill.skill.max as number) + (attackBonus * accuracy / 100));
        const randomized = this.Player.team.Odenne.Rarity.rand(min, max, -2);

        if(!randomized) return min;
        return randomized;
    }

    private calculateShield(){
        const defenseBonus = this.Player.getStat("defense");
        const accuracy = this.Player.getStat("accuracy") >= 100 ? 100 : this.Player.getStat("accuracy");

        const min = (this.Skill.skill.shieldMin as number) + (defenseBonus / 2);
        const max = ((this.Skill.skill.shieldMax as number) + (defenseBonus * accuracy / 100));
        const randomized = this.Player.team.Odenne.Rarity.rand(min, max, -2);

        if(!randomized) return min;
        return randomized;
    }
}

export class CriticModifier extends Modifier {
    constructor(Player: Player, Skill: Skill){
        super(Player, Skill);
    }

    apply(result: SkillResult): SkillResult {
        for(let i = 0; i < result.damaged.length; i++){

            if(this.Skill.damageType == DAMAGETYPES.RANGED){
                result.damaged[i].critic = this.calculateDamage(result.damaged[i]);
                result.damaged[i].damage += result.damaged[i].critic?.damage ?? 0;
            }

        }

        return result;
    }

    private calculateDamage(damage: DamageDone): CriticResult {
        return {isCritic: true, percentage: 100, damage: damage.damage}
    }
}