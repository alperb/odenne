import Odenne from "../odenne";
import { DAMAGETYPES, OriginalSkill, SkillPipe } from "../types/player";
import { BonusDetails, DamageDone, EffectConfig } from "../types/types";
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
            //#region Archer Skills
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
            case 40:
                Player.player.skills.push(new OneTheHuntI(Player, skill));
                return;
            case 50:
                Player.player.skills.push(new FocusI(Player, skill));
                return;
            case 60:
                Player.player.skills.push(new ColdBloodI(Player, skill));
                return;
            case 70:
                Player.player.skills.push(new SnipeI(Player, skill));
                return;
            case 80:
                Player.player.skills.push(new HeadStartI(Player, skill));
                return;
            case 90:
                Player.player.skills.push(new RangerI(Player, skill));
                return;
            case 100:
                Player.player.skills.push(new TacticalI(Player, skill));
                return;
            case 110:
                Player.player.skills.push(new AccuracyI(Player, skill));
                return;
            case 120:
                Player.player.skills.push(new LongShotsI(Player, skill));
                return;
            case 130:
                Player.player.skills.push(new PoisonI(Player, skill));
                return;
            //#endregion

            //#region Assassin Skills
            case 1000:
                Player.player.skills.push(new AssassinBasicAttackI(Player, skill));
                return;
            case 1010:
                Player.player.skills.push(new BetrayalI(Player, skill));
                return;
            case 1020:
                Player.player.skills.push(new BladeRainI(Player, skill));
                return;
            case 1030:
                Player.player.skills.push(new ThinArmorI(Player, skill));
                return;
            case 1040:
                Player.player.skills.push(new StealthI(Player, skill));
                return;
            case 1050:
                Player.player.skills.push(new TheUntouchableI(Player, skill));
                return;
            case 1060:
                Player.player.skills.push(new BlindI(Player, skill));
                return;
            case 1070:
                Player.player.skills.push(new ExecutionerI(Player, skill));
                return;
            case 1080:
                Player.player.skills.push(new SlaughterI(Player, skill));
                return;
            case 1090:
                Player.player.skills.push(new CatalystI(Player, skill));
                return;
            case 1100:
                Player.player.skills.push(new MasterAssassinI(Player, skill));
                return;
            case 1110:
                Player.player.skills.push(new ParalyzeI(Player, skill));
                return;
            case 1120:
                Player.player.skills.push(new DeadlyMarkI(Player, skill));
                return;
            case 1130:
                Player.player.skills.push(new BackstabI(Player, skill));
                return;
            //#endregion

            //#region Mage Skills
            case 2000:
                Player.player.skills.push(new MageBasicAttackI(Player, skill));
                return;
            case 2010:
                Player.player.skills.push(new FireballI(Player, skill));
                return;
            //#endregion

            //#region Warrior Skills
            case 3000:
                Player.player.skills.push(new WarriorBasicAttackI(Player, skill));
                return;
            case 3010:
                Player.player.skills.push(new BashI(Player, skill));
                return;
            //#endregion
            
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
    effects: string[] = [];
    enabled: boolean = true;

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
        if(!this.enabled) return false;
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

export abstract class PassiveSkill extends Skill {
    skill!: OriginalSkill;
    player!: Player;
    damageType!: DAMAGETYPES;

    abstract applyEffect(): void;
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
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
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
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
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
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
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
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
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
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
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
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        
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

export class OneTheHuntI extends AttackSkill {
    effects: string[];

    constructor(Player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = Player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 100;

        this.prepare();
        this.effects = ['SamuraiinCuku'];
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
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        
        for(const modifier of this.modifiers){
            result = modifier.apply(result) as SkillResult;
        }

        
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player};
        const samuraiEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyDamage(result.damaged);
        this.applyEffects([samuraiEffect]);

        return result;
    }
}

export class FocusI extends PassiveSkill {
    effects: string[];

    constructor(Player: Player, skill: OriginalSkill){
        super();
        this.player = Player;
        this.skill = skill;
        this.chance = 100;

        this.effects = ['Focus'];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player}
        const focusEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([focusEffect]);
    }

    do(): SkillResult {
        return new SkillResult(this.player);
    }
}

export class ColdBloodI extends AttackSkill {
    constructor(Player: Player, skill: OriginalSkill){
        super();

        this.skill = skill;
        this.player = Player;
        this.damageType = DAMAGETYPES.NONE;

        this.chance = 100;

        this.effects = [];
    }

    do(): SkillResult {
        const missingHealth = this.player.player.baseStats.health - this.player.player.stats.health;
        const percentage = missingHealth / this.player.player.baseStats.health * 100;
        const gainIncrease = percentage / 100 * 40;

        this.player.player.stats.attack += this.player.player.stats.attack * gainIncrease / 100;

        return new SkillResult(this.player);
    }
    
}

export class SnipeI extends AttackSkill {
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
        this.maxUseCount = 2;

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
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: true});
        for(const modifier of this.modifiers){
            result = modifier.apply(result) as SkillResult;
        }

        this.applyDamage(result.damaged);

        return result;
    }
    
}

export class HeadStartI extends PassiveSkill {
    effects: string[];

    constructor(Player: Player, skill: OriginalSkill){
        super();
        this.player = Player;
        this.skill = skill;
        this.chance = 100;

        this.effects = ['SineminCizimTableti'];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player}
        const sctEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([sctEffect]);
    }

    do(): SkillResult {
        return new SkillResult(this.player);
    }
}

export class RangerI extends PassiveSkill {
    constructor(Player: Player, skill: OriginalSkill){
        super();

        this.player = Player;
        this.skill = skill;
        this.chance = 100;

        this.effects = ['Timo30Cm'];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player}
        const tmEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([tmEffect]);
    }
    do(): SkillResult {
        return new SkillResult(this.player);
    }
}

export class TacticalI extends PassiveSkill {
    constructor(Player: Player, skill: OriginalSkill){
        super();

        this.player = Player;
        this.skill = skill;
        this.chance = 100;

        this.effects = ['AnilinYemekSepeti'];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player}
        const aysEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([aysEffect]);
    }
    do(): SkillResult {
        return new SkillResult(this.player);
    }
}

export class AccuracyI extends AttackSkill {
    constructor(Player: Player, skill: OriginalSkill){
        super();

        this.skill = skill;
        this.player = Player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 100;
        this.maxUseCount = 2;

        this.effects = [];
        this.prepare();
    }

    prepare(){
        const rangemodifier = this.player.team.Odenne.Modifiers.create("RangeModifier", this.player, this) as RangeModifier;
        this.registerModifier(rangemodifier);
        const criticmodifier = this.player.team.Odenne.Modifiers.create('CriticModifier', this.player, this) as CriticModifier;
        this.registerModifier(criticmodifier);
    }

    do(): SkillResult {
        this.saveUse()
        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        for(const modifier of this.modifiers){
            result = modifier.apply(result) as SkillResult;
        }

        this.applyDamage(result.damaged);

        this.skill.min = this.skill.min as number * 2;
        this.skill.max = this.skill.max as number * 2;

        return result;
    }
}

export class LongShotsI extends PassiveSkill {
    constructor(Player: Player, skill: OriginalSkill){
        super();

        this.player = Player;
        this.skill = skill;
        this.chance = 100;

        this.effects = ['OmnininCocugu'];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player}
        const ocEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([ocEffect]);
    }
    do(): SkillResult {
        return new SkillResult(this.player);
    }
}

export class PoisonI extends PassiveSkill {
    constructor(Player: Player, skill: OriginalSkill){
        super();

        this.player = Player;
        this.skill = skill;
        this.chance = 100;

        this.effects = ['AlpinGriPolosu'];
    }

    applyEffect(): void {
        const target = this.findTarget();
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: target.player}
        const agpEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([agpEffect]);
    }
    do(): SkillResult {
        return new SkillResult(this.player);
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
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
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
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        
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

export class ThinArmorI extends AttackSkill {
    constructor(Player: Player, skill: OriginalSkill){
        super()

        this.player = Player;
        this.skill = skill;
        this.chance = 100;
        this.damageType = DAMAGETYPES.RANGED;

        this.maxUseCount = 3;

        this.effects = ["DefenseBonus"];
        this.prepare();
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
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        
        for(const modifier of this.modifiers){
            result = modifier.apply(result) as SkillResult;
        }

        
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: target.player};

        const details: BonusDetails = {value: -35, type: 1, count: 3}
        const breakEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig, details) as Effect;

        this.applyDamage(result.damaged);
        this.applyEffects([breakEffect]);

        return result;
    }
    
}

export class StealthI extends PassiveSkill {
    constructor(Player: Player, skill: OriginalSkill){
        super();

        this.player = Player;
        this.skill = skill;
        this.chance = 100;
        this.effects = ["Invulnerable"];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player, count: -31} // Kimse sorgulayamaz bizi pussy boylar.
        const invulEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([invulEffect]);
    }

    do(): SkillResult {
        return new SkillResult(this.player);
    }

    
}

export class TheUntouchableI extends AttackSkill {
    constructor(Player: Player, skill: OriginalSkill){
        super()

        this.player = Player;
        this.skill = skill;
        this.chance = 100;
        this.damageType = DAMAGETYPES.NONE;

        this.maxUseCount = 2;
        this.effects = ["CriticBonus", "Invulnerable"];
    }

    do(): SkillResult {
        this.saveUse();
        
        let result = new SkillResult(this.player);

        
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player};
        const details: BonusDetails = {value: 35, type: 1, count: 3}
        const critBonus = this.player.team.Odenne.Effects.new(this.effects[0], effconfig, details) as Effect;

        const invconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player, count: 2};
        const invulEffect = this.player.team.Odenne.Effects.new(this.effects[1], invconfig) as Effect;

        this.applyEffects([critBonus, invulEffect]);

        return result;
    }
    
}

export class BlindI extends AttackSkill {
    constructor(Player: Player, skill: OriginalSkill){
        super()

        this.player = Player;
        this.skill = skill;
        this.chance = 100;
        this.damageType = DAMAGETYPES.RANGED;

        this.maxUseCount = 2;
        this.effects = ["Blind"];
        this.prepare();
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
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        
        for(const modifier of this.modifiers){
            result = modifier.apply(result) as SkillResult;
        }

        const invconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: target.player, count: 2};
        const blindEffect = this.player.team.Odenne.Effects.new(this.effects[0], invconfig) as Effect;

        this.applyDamage(result.damaged);
        this.applyEffects([blindEffect]);

        return result;
    }
    
}

export class ExecutionerI extends PassiveSkill {
    constructor(Player: Player, skill: OriginalSkill){
        super();

        this.player = Player;
        this.skill = skill;
        this.chance = 100;
        this.effects = ["HasmetliHatirati"];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player} // Kimse sorgulayamaz bizi pussy boylar.
        const execEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([execEffect]);
    }

    do(): SkillResult {
        return new SkillResult(this.player);
    }

    
}

export class SlaughterI extends PassiveSkill {
    constructor(Player: Player, skill: OriginalSkill){
        super();

        this.player = Player;
        this.skill = skill;
        this.chance = 100;
        this.effects = ["MakarnaCanavari"];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player}
        const mcEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([mcEffect]);
    }

    do(): SkillResult {
        return new SkillResult(this.player);
    }
}

export class CatalystI extends PassiveSkill {
    constructor(Player: Player, skill: OriginalSkill){
        super();

        this.player = Player;
        this.skill = skill;
        this.chance = 100;
        this.effects = ["PestoSosluMakarna"];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player}
        const mcEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([mcEffect]);
    }

    do(): SkillResult {
        return new SkillResult(this.player);
    }
}

export class MasterAssassinI extends PassiveSkill {
    constructor(Player: Player, skill: OriginalSkill){
        super();

        this.player = Player;
        this.skill = skill;
        this.chance = 100;
        this.effects = ["SukruSaracoglu"];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player}
        const mcEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([mcEffect]);
    }

    do(): SkillResult {
        return new SkillResult(this.player);
    }
}

export class ParalyzeI extends AttackSkill {
    disabledSkill!: Skill;

    constructor(Player: Player, skill: OriginalSkill){
        super()

        this.player = Player;
        this.skill = skill;
        this.chance = 100;
        this.damageType = DAMAGETYPES.RANGED;

        this.maxUseCount = 2;
        this.prepare();
    }

    prepare(){
        const rangemodifier = this.player.team.Odenne.Modifiers.create("RangeModifier", this.player, this) as RangeModifier;
        this.registerModifier(rangemodifier);
        const criticmodifier = this.player.team.Odenne.Modifiers.create('CriticModifier', this.player, this) as CriticModifier;
        this.registerModifier(criticmodifier);
    }

    private disableTargetSkill(target: Player){
        let targetSkillset: ActiveSkill[] = [];
        for(let i = 1; i < target.player.skills.length; i++){
            if(target.player.skills[i] instanceof ActiveSkill){
                targetSkillset.push(target.player.skills[i] as ActiveSkill);
            }
        }
        if(targetSkillset.length > 0){
            for(const skill of targetSkillset){
                if(!skill.enabled) skill.enabled = true;
            }
            let random = Math.floor(Math.random() * targetSkillset.length);
            targetSkillset[random].enabled = false;
            this.disabledSkill = targetSkillset[random];
        }
    }

    do(): SkillResult {
        this.saveUse();
        
        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        
        for(const modifier of this.modifiers){
            result = modifier.apply(result) as SkillResult;
        }

        this.disableTargetSkill(target.player);
        this.applyDamage(result.damaged);

        return result;
    }
    
}

export class DeadlyMarkI extends PassiveSkill {
    constructor(Player: Player, skill: OriginalSkill){
        super();

        this.player = Player;
        this.skill = skill;
        this.chance = 100;
        this.effects = ["HakimBey"];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player}
        const mcEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([mcEffect]);
    }

    do(): SkillResult {
        return new SkillResult(this.player);
    }
}

export class BackstabI extends DefenseSkill {
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
        
        this.effects = ["RuhsarinIntikami"];
    }

    do(): SkillResult {
        this.saveUse();

        const result = new SkillResult(this.player);
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player};
        const dodgeEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;
        this.applyEffects([dodgeEffect]);

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
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
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
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        for(const modifier of this.modifiers){
            result = modifier.apply(result) as SkillResult;
        }

        this.applyDamage(result.damaged);

        return result;
    }
    
}

//#endregion





