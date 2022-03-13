import Odenne from "../odenne";
import { DAMAGETYPES, OriginalSkill, SkillPipe } from "../types/player";
import { DamageDone, EffectConfig } from "../types/types";
import { Effect } from "./effects";
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
            case 0: // TODO: divide basic attack to 4 different classes
                Player.player.skills.push(new BasicAttack(Player, skill));
                return;
            case 40:
                Player.player.skills.push(new DodgeI(Player, skill));
                return;
            case 50:
                Player.player.skills.push(new ArrowRainI(Player, skill));
            default:
                break;
        }
    }
}

export abstract class Skill {
    skill!: OriginalSkill;
    damageType!: DAMAGETYPES;
    modifiers!: Modifier[];
    player!: Player;
    chance!: number;

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
            damage.target.Decider.takeDamage(damage);
        }
    }

    applyEffects(effects: Effect[]){
        for(const eff of effects){
            eff.config.targetMember.Decider.takeEffect(eff);
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
    effects: string[];

    constructor(Player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = Player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 100;

        this.prepare();
        this.effects = [];
    }

    prepare(){
        const rangemodifier = this.player.team.Odenne.Modifiers.create("RangeModifier", this.player, this) as RangeModifier;
        this.registerModifier(rangemodifier);
    }

    

    do(): SkillResult {
        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}});
        for(const modifier of this.modifiers){
            result = modifier.apply(result) as SkillResult;
        }

        this.applyDamage(result.damaged);

        return result;
    }
    
}

export class ArrowRainI extends AttackSkill {
    skill!: OriginalSkill;
    roundType: string = 'attack';
    player: Player;
    effects: string[];

    constructor(Player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = Player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 500;

        this.prepare();
        

        this.effects = ["EdipinYarragi"];
    }

    prepare(){
        const rangemodifier = this.player.team.Odenne.Modifiers.create("RangeModifier", this.player, this) as RangeModifier;
        this.registerModifier(rangemodifier);
    }

    

    do(): SkillResult {
        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}});
        
        for(const modifier of this.modifiers){
            result = modifier.apply(result) as SkillResult;
        }

        
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: target.player};
        const yarrakEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyDamage(result.damaged);
        this.applyEffects([yarrakEffect]);

        return result;
    }
    
}

export class DodgeI extends DefenseSkill {
    skill!: OriginalSkill;
    roundType: string = 'attack';
    player: Player;
    effects: string[];

    constructor(Player: Player, skill: OriginalSkill){
        super();
        this.player = Player;
        this.skill = skill;
        this.chance = 60;
        
        this.effects = ["Dodge"];
    }

    private removeDamagesFromPlayer(){
        for(let i = 0; i < this.player.Decider.Current.damageTaken.length; i++){
            this.player.Decider.Current.damageTaken[i].cancel = {isCancelled: true, source: this, sourceMember: this.player};
        }
    }

    do(): SkillResult {
        const result = new SkillResult(this.player);
        console.log("DODGE GELDI")
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player};
        const dodgeEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;
        this.applyEffects([dodgeEffect]);
        this.removeDamagesFromPlayer();

        return result;
    }
}

