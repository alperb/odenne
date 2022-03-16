import Odenne from "../odenne";
import { DAMAGETYPES, OriginalSkill, SkillPipe } from "../types/player";
import { DamageDone, EffectConfig } from "../types/types";
import { Effect } from "./effects";
import { CriticModifier, Modifier, RangeModifier } from "./modifiers";
import { Round } from "./rounds";
import { Player } from "./teams";


export default class Skills {
    Odenne: Odenne;

    constructor(Odenne: Odenne){
        this.Odenne = Odenne;
    }
    /**
     * 0 - 1000: Archer
     * 1000 - 2000: Assassin
     * 2000 - 3000: Mage
     * 3000 - 4000: Warrior
     */
    create(Player: Player, skill: OriginalSkill){
        switch(skill.id){
            case 0:
                Player.player.skills.push(new ArcherBasicAttackI(Player, skill));
                return;
            case 10:
                Player.player.skills.push(new DodgeI(Player, skill));
                return;
            case 20:
                Player.player.skills.push(new ArrowRainI(Player, skill));
                return;
            case 30:
                Player.player.skills.push(new ArcaneShotI(Player, skill));
                return;


            case 1000:
                Player.player.skills.push(new AssassinBasicAttackI(Player, skill));
                return;
            case 1010:
                Player.player.skills.push(new BetrayalI(Player, skill));
                return;
            case 1020:
                Player.player.skills.push(new BladeRainI(Player, skill));
                return;


            case 2000:
                Player.player.skills.push(new MageBasicAttackI(Player, skill));
                return;
            case 2010:
                Player.player.skills.push(new FireballI(Player, skill));
                return;


            case 3000:
                Player.player.skills.push(new WarriorBasicAttackI(Player, skill));
                return;
            case 3010:
                Player.player.skills.push(new BashI(Player, skill));
                return;
            
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
    maxUseCount: number = -1;
    usedRounds: number[] = [];

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

    saveUse(){
        this.usedRounds.push(this.player.team.Odenne.Referee.roundCount);
    }

    isAvailable(): boolean {
        if(this.maxUseCount === -1 || this.usedRounds.length === 0) return true;
        if(this.player.team.Odenne.Referee.roundCount - this.usedRounds[this.usedRounds.length - 1] > 1) return true;

        let usedCount = 1;
        for(let i = this.usedRounds.length - 2; i >= 0; i--){
            if(this.usedRounds[i] === this.usedRounds[i+1] - 1) usedCount++;
            else break;
        }

        return this.maxUseCount > usedCount;
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
export abstract class DefenseSkill extends ActiveSkill {

}

//#region Basic Attacks

export class ArcherBasicAttackI extends AttackSkill {
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
        const criticmodifier = this.player.team.Odenne.Modifiers.create('CriticModifier', this.player, this) as CriticModifier;
        this.registerModifier(criticmodifier);
    }

    

    do(): SkillResult {
        this.saveUse();

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

export class AssassinBasicAttackI extends AttackSkill {
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
        const criticmodifier = this.player.team.Odenne.Modifiers.create('CriticModifier', this.player, this) as CriticModifier;
        this.registerModifier(criticmodifier);
    }

    

    do(): SkillResult {
        this.saveUse();

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

export class MageBasicAttackI extends AttackSkill {
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
        const criticmodifier = this.player.team.Odenne.Modifiers.create('CriticModifier', this.player, this) as CriticModifier;
        this.registerModifier(criticmodifier);
    }

    

    do(): SkillResult {
        this.saveUse();

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

export class WarriorBasicAttackI extends AttackSkill {
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
        const criticmodifier = this.player.team.Odenne.Modifiers.create('CriticModifier', this.player, this) as CriticModifier;
        this.registerModifier(criticmodifier);
    }

    

    do(): SkillResult {
        this.saveUse();

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

// #endregion


//#region Archer Skills

export class ArcaneShotI extends AttackSkill {
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
        const criticmodifier = this.player.team.Odenne.Modifiers.create('CriticModifier', this.player, this) as CriticModifier;
        this.registerModifier(criticmodifier);
    }

    

    do(): SkillResult {
        this.saveUse();

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
        this.maxUseCount = 3;
        this.prepare();
        

        this.effects = ["EdipinYarragi"];
    }

    prepare(){
        const rangemodifier = this.player.team.Odenne.Modifiers.create("RangeModifier", this.player, this) as RangeModifier;
        this.registerModifier(rangemodifier);
        const criticmodifier = this.player.team.Odenne.Modifiers.create('CriticModifier', this.player, this) as CriticModifier;
        this.registerModifier(criticmodifier);
    }

    

    do(): SkillResult {
        this.saveUse();

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
        this.maxUseCount = 1;
        
        this.effects = ["Dodge"];
    }

    private removeDamagesFromPlayer(){
        for(let i = 0; i < this.player.Decider.Current.damageTaken.length; i++){
            this.player.Decider.Current.damageTaken[i].cancel = {isCancelled: true, source: this, sourceMember: this.player};
        }
    }

    do(): SkillResult {
        this.saveUse();

        const result = new SkillResult(this.player);
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player};
        const dodgeEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;
        this.applyEffects([dodgeEffect]);
        this.removeDamagesFromPlayer();

        return result;
    }
}

//#endregion


//#region Assassin Skills

export class BetrayalI extends AttackSkill {
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
        const criticmodifier = this.player.team.Odenne.Modifiers.create('CriticModifier', this.player, this) as CriticModifier;
        this.registerModifier(criticmodifier);
    }

    

    do(): SkillResult {
        this.saveUse();

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

export class BladeRainI extends AttackSkill {
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
        this.maxUseCount = 3;
        this.prepare();
        

        this.effects = ["WaffleinHukmu"];
    }

    prepare(){
        const rangemodifier = this.player.team.Odenne.Modifiers.create("RangeModifier", this.player, this) as RangeModifier;
        this.registerModifier(rangemodifier);
        const criticmodifier = this.player.team.Odenne.Modifiers.create('CriticModifier', this.player, this) as CriticModifier;
        this.registerModifier(criticmodifier);
    }

    

    do(): SkillResult {
        this.saveUse();

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

//#endregion


//#region Mage Skills

export class FireballI extends AttackSkill {
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
        const criticmodifier = this.player.team.Odenne.Modifiers.create('CriticModifier', this.player, this) as CriticModifier;
        this.registerModifier(criticmodifier);
    }

    

    do(): SkillResult {
        this.saveUse();

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

//#endregion


//#region Warrior Skills

export class BashI extends AttackSkill {
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
        const criticmodifier = this.player.team.Odenne.Modifiers.create('CriticModifier', this.player, this) as CriticModifier;
        this.registerModifier(criticmodifier);
    }

    

    do(): SkillResult {
        this.saveUse();

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

//#endregion





