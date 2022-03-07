import Odenne from "../odenne";
import { DAMAGETYPES, OriginalSkill, SkillPipe } from "../types/player";
import { DamageDone } from "../types/types";
import { Modifier, RangeModifier } from "./modifiers";
import { Round } from "./rounds";
import { Player } from "./teams";

export default class Skills {
    Odenne: Odenne;

    constructor(Odenne: Odenne){
        this.Odenne = Odenne;
    }

    create(Player: Player, skill: OriginalSkill){
        switch(skill.id){
            case 0:
                Player.player.skills.push(new BasicAttack(Player, skill));
        }
    }
}

export abstract class Skill {
    skill!: OriginalSkill;
    damageType!: DAMAGETYPES;
    modifiers!: Modifier[];
    player!: Player;

    registerModifier(modifier: Modifier){
        this.modifiers.push(modifier);
    }

    run(){
        return this.do();
    }

    abstract do(): SkillResult;

    findTarget(): {id: number, player: Player} {
        const opponentIndex = (this.player.team.index + 1) % 2;
        const p = this.player.team.Odenne.Referee.getRandomPlayer(opponentIndex);
        return p;
    }

    applyDamage(damages: DamageDone[]){
        for(const damage of damages){
            const isDamageTaken = damage.target.Decider.takeDamage(damage);
            if(!isDamageTaken) damage.cancelled = true;
        }
    }
}

export class SkillResult {
    Player: Player;
    damaged: DamageDone[];

    constructor(Player: Player){
        this.Player = Player;
        this.damaged = [];
    }

    addDamage(damage: DamageDone){
        this.damaged.push(damage);
    }
}

export abstract class ActiveSkill extends Skill {
    skill!: OriginalSkill;
    roundType: string = 'attack';
    player!: Player;
    damageType!: DAMAGETYPES;
}

export abstract class AttackSkill extends ActiveSkill {
    modifiers: Modifier[];
    constructor(){
        super();
        this.modifiers = [];
    }
}
export abstract class DefenseSkill extends ActiveSkill {}

export class BasicAttack extends AttackSkill {
    skill!: OriginalSkill;
    roundType: string = 'attack';
    player: Player;

    constructor(Player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = Player;
        this.damageType = DAMAGETYPES.RANGED;
        this.prepare();
    }

    prepare(){
        const rangemodifier = this.player.team.Odenne.Modifiers.create("RangeModifier", this.player, this) as RangeModifier;
        this.registerModifier(rangemodifier);
    }

    

    do(): SkillResult {
        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: this.player, target: target.player, cancelled: false});
        for(const modifier of this.modifiers){
            result = modifier.apply(result) as SkillResult;
        }

        

        this.applyDamage(result.damaged);

        return result;
    }
    
}

