import Odenne from "../odenne";
import { Item } from "../types/player";
import { BonusDetails, CancelInfo, DamageDone, EffectConfig } from "../types/types";
import { Environment } from "./environments";
import { Skill } from "./skills";
import { Member, Player } from "./teams";

export default class Effects {
    Odenne: Odenne;

    constructor(Odenne: Odenne){
        this.Odenne = Odenne;
    }

    new(name: string, config: EffectConfig, details: BonusDetails | undefined = undefined) : Effect | undefined{
        switch(name){
            case 'Ignite':
                return new Ignite(config);
            case 'Dodge':
                return new Dodge(config);
            case 'EdipinYarragi':
                return new EdipinYarragi(config);
            case 'WaffleinHukmu':
                return new WaffleinHukmu(config);
            case 'SamuraiinCuku':
                return new SamuraiinCuku(config);
            case 'Focus':
                return new Focus(config);
            case 'AttackBonus':
                return new AttackBonus(config, details as BonusDetails);
            case 'DefenseBonus':
                return new DefenseBonus(config, details as BonusDetails);
            case 'CriticBonus':
                return new CriticBonus(config, details as BonusDetails);
            case 'Invulnerable':
                return new Invulnerable(config);
            case 'SineminCizimTableti':
                return new SineminCizimTableti(config);
            case 'Timo30Cm':
                return new Timo30Cm(config);
            case 'AnilinYemekSepeti':
                return new AnilinYemekSepeti(config);
            case 'OmnininCocugu':
                return new OmnininCocugu(config);
            case 'AlpinGriPolosu':
                return new AlpinGriPolosu(config);
            case 'Blind':
                return new Blind(config);
            case 'HasmetliHatirati':
                return new HasmetliHatirati(config);
            case 'MakarnaCanavari':
                return new MakarnaCanavari(config);
            case 'PestoSosluMakarna':
                return new PestoSosluMakarna(config);
            case 'SukruSaracoglu':
                return new SukruSaracoglu(config);
            case 'HakimBey':
                return new HakimBey(config);
            case 'RuhsarinIntikami':
                return new RuhsarinIntikami(config);
            default:
                return undefined;
        }
    }

}


export abstract class Effect {
    config: EffectConfig;
    count!: number;
    cancel: CancelInfo;

    constructor(config: EffectConfig){
        this.config = config;
        this.cancel = {isCancelled: false}
    }

    reduce(){
        if(this.count > 0){
            this.count -= 1;
        }
        this.cancel = {isCancelled: false};
    }

    hasExpired(){
        return this.count == 0;
    }

    abstract init(): void;
    abstract do(): void;
    abstract afterDo(): void;
}

export abstract class ActiveEffect extends Effect{

    constructor(config: EffectConfig){
        super(config);
    }
}

export abstract class PassiveEffect extends Effect {

    constructor(config: EffectConfig){
        super(config);
        this.count = -1;
    }


}

export abstract class StatBonus extends ActiveEffect {
    details!: BonusDetails

    abstract get(type: string): number;
}

export class EffectResult {
    source: Player | Environment |  undefined;

    constructor(){
    }

    setSource(player: Player){
        this.source = player;
    }
}

//#region Stat Bonuses

export class AttackBonus extends StatBonus {
    constructor(config: EffectConfig, details:BonusDetails){
        super(config);

        this.details = details;
        this.count = this.details.count;
    }

    get(type: string): number {
        if(type !== "attack") return 0

        if(this.details.type === 0) return this.details.value;
        else if(this.details.type === 1) return this.details.value / 100 * this.config.targetMember.player.stats.attack;

        return 0;
    }

    init(): void {}

    do(): void {}

    afterDo(): void {}
}

export class DefenseBonus extends StatBonus {
    constructor(config: EffectConfig, details:BonusDetails){
        super(config);

        this.details = details;
        this.count = this.details.count;
    }

    get(type: string): number {
        if(type !== "defense") return 0

        if(this.details.type === 0) return this.details.value;
        else if(this.details.type === 1) return this.details.value / 100 * this.config.targetMember.player.stats.defense;

        return 0;
    }

    init(): void {}

    do(): void {}

    afterDo(): void {}
}

export class CriticBonus extends StatBonus {
    constructor(config: EffectConfig, details:BonusDetails){
        super(config);

        this.details = details;
        this.count = this.details.count;
    }

    get(type: string): number {
        if(type !== "critic") return 0

        if(this.details.type === 0) return this.details.value;
        else if(this.details.type === 1) return this.details.value / 100 * this.config.targetMember.player.stats.critic;

        return 0;
    }

    init(): void {}

    do(): void {}

    afterDo(): void {}
}

//#endregion

export class Ignite extends ActiveEffect {
    
    constructor(config: EffectConfig){
        super(config);
        this.count = 2;
    }

    init(): void {}

    do(): void {
        this.config.targetMember.Decider.takeDamage({
            source: {player: this.config.sourceMember, source: this},
            target: this.config.targetMember,
            cancel: {isCancelled: false},
            damage: 5,
            isTrue: false
        })
    }

    afterDo(): void {}
}

export class EdipinYarragi extends ActiveEffect {
    
    constructor(config: EffectConfig){
        super(config);
        this.count = 2;
    }

    init(): void {}

    do(): void {
        const min = 7;
        const max = 15;
        let dmg = this.config.sourceMember.team.Odenne.Rarity.rand(min, max, -2);
        if(!dmg) dmg = min;

        this.config.targetMember.Decider.takeDamage({
            source: {player: this.config.sourceMember, source: this},
            target: this.config.targetMember,
            cancel: {isCancelled: false},
            damage: dmg,
            isTrue: false
        })
    }

    afterDo(): void {}
}

export class WaffleinHukmu extends ActiveEffect {
    
    constructor(config: EffectConfig){
        super(config);
        this.count = 4;
    }

    init(): void {}

    do(): void {
        const min = 14;
        const max = 18;
        let dmg = this.config.sourceMember.team.Odenne.Rarity.rand(min, max, -2);
        if(!dmg) dmg = min;

        this.config.targetMember.Decider.takeDamage({
            source: {player: this.config.sourceMember, source: this},
            target: this.config.targetMember,
            cancel: {isCancelled: false},
            damage: dmg,
            isTrue: false
        })
    }

    afterDo(): void {}
}

export class SamuraiinCuku extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    do(): void {
        
    }

    afterDo(): void {
        
    }

    init(): void {
        this.config.targetMember.player.stats.attack += this.config.targetMember.player.stats.attack * 0.25;
    }
}

export class Focus extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    do(): void {
        this.config.targetMember.player.stats.attack += this.config.targetMember.player.stats.attack * 0.2;
    }

    afterDo(): void {
        
    }

    init(): void {
        this.config.targetMember.player.stats.attack += this.config.targetMember.player.stats.attack * 0.2;
    }
}

export class Dodge extends ActiveEffect {
    
    constructor(config: EffectConfig){
        super(config);
        this.count = 1;
    }

    init(): void {}

    do(): void {}

    afterDo(): void {
        this.removeDamages();
    }

    private removeDamages(){
        for(let i = 0; i < this.config.targetMember.Decider.Current.damageTaken.length; i++){
            this.config.targetMember.Decider.Current.damageTaken[i].cancel = {isCancelled: true, source: this.config.source, sourceMember: this.config.sourceMember}
        }
    }
}

export class Invulnerable extends ActiveEffect {
    constructor(config: EffectConfig){
        super(config);

        this.count = config.count ?? 2;
    }

    init(): void {}

    do(): void {

    }

    private removeDamages(){
        for(let i = 0; i < this.config.targetMember.Decider.Current.damageTaken.length; i++){
            this.config.targetMember.Decider.Current.damageTaken[i].cancel = {isCancelled: true, source: this.config.source, sourceMember: this.config.sourceMember}
        }
    }

    private checkIfDamageDealt(){
        for(const damage of this.config.targetMember.Decider.Current.damageDone){
            if(damage.cancel.isCancelled === false && damage.damage > 0) return true
        }

        return false;
    }

    afterDo(): void {
        this.removeDamages();

        if(this.count < 0 && this.checkIfDamageDealt()) this.count = 1;
    }

    
}

export class Blind extends ActiveEffect {
    constructor(config: EffectConfig){
        super(config);

        this.count = config.count ?? 2;
    }

    init(): void {}

    do(): void {

    }

    private removeDamages(){
        for(let i = 0; i < this.config.targetMember.Decider.Current.damageDone.length; i++){
            for(let j = 0; j < this.config.targetMember.Decider.Current.damageDone[i].target.Decider.Current.damageTaken.length; j++){
                if(this.config.targetMember === this.config.targetMember.Decider.Current.damageDone[i].target.Decider.Current.damageTaken[j].source.player){
                    this.config.targetMember.Decider.Current.damageDone[i].target.Decider.Current.damageTaken[j].cancel = {isCancelled: true, source: this, sourceMember: this.config.sourceMember};
                }
            }
        }
    }

    private checkIfDamageDealt(){
        for(const damage of this.config.targetMember.Decider.Current.damageDone){
            if(damage.cancel.isCancelled === false && damage.damage > 0) return true
        }

        return false;
    }

    afterDo(): void {
        if(this.checkIfDamageDealt()) this.removeDamages();
    }

    
}

export class SineminCizimTableti extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private makeDamagesTrue(){
        for(let i = 0; i < this.config.sourceMember.Decider.Current.damageDone.length; i++){
            for(let j = 0; j < this.config.sourceMember.Decider.Current.damageDone[i].target.Decider.Current.damageTaken.length; j++){
                if(this.config.targetMember.player.stats.health < this.config.sourceMember.Decider.Current.damageDone[i].target.player.stats.health){
                    this.config.sourceMember.Decider.Current.damageDone[i].target.Decider.Current.damageTaken[j].isTrue = true;
                }
            }
        }
    }

    do(): void {
    }

    afterDo(): void {
        this.makeDamagesTrue();
    }

    init(): void {
    }
}

export class Timo30Cm extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private calculateAttackBonus(): number{
        let sum = 0;
        for(const clothKey of Object.keys(this.config.targetMember.original.wearings)){
            if(clothKey == 'skills') continue;

            const item: Item = this.config.targetMember.original.wearings[clothKey] as Item;
            sum += item.stats.attack ?? 0;
        }

        return sum * 30 / 100 / (this.config.targetMember as Player).DIVIDERS.attack;
    }

    init(): void {
        this.config.targetMember.player.stats.attack += this.calculateAttackBonus();
    }

    do(): void {
        
    }

    afterDo(): void {
        
    }
}

export class AnilinYemekSepeti extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private calculateCritChance(): number{
        return this.config.targetMember.player.stats.critic * 0.25;
    }

    init(): void {
        this.config.targetMember.player.stats.critic += this.calculateCritChance();
    }

    do(): void {
        
    }

    afterDo(): void {
        
    }
}

export class OmnininCocugu extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private calculateDamageBonus(damage: DamageDone): number{
        const missingHealth = damage.target.player.baseStats.health - damage.target.player.stats.health;
        const percentage = missingHealth / damage.target.player.baseStats.health * 100;
        const gainIncrease = percentage / 100 * 30;

        return damage.damage * gainIncrease / 100;
    }

    private increaseDamage(){
        for(let i = 0; i < this.config.sourceMember.Decider.Current.damageDone.length; i++){
            for(let j = 0; j < this.config.sourceMember.Decider.Current.damageDone[i].target.Decider.Current.damageTaken.length; j++){
                if(this.config.targetMember.player.stats.health < this.config.sourceMember.Decider.Current.damageDone[i].target.player.stats.health){
                    const gain = this.calculateDamageBonus(this.config.sourceMember.Decider.Current.damageDone[i].target.Decider.Current.damageTaken[j]);
                    this.config.sourceMember.Decider.Current.damageDone[i].target.Decider.Current.damageTaken[j].damage += gain;
                }
            }
        }
    }

    init(): void {
        
    }

    do(): void {
        
    }

    afterDo(): void {
        this.increaseDamage();
    }
}

export class AlpinGriPolosu extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private reduceDefense(): void {
        this.config.targetMember.player.stats.defense -= this.config.targetMember.player.stats.defense * 0.25;
    }

    init(): void {}

    do(): void {}

    afterDo(): void {
        let shouldReduce = false;

        for(const dmg of this.config.targetMember.Decider.Current.damageTaken){
            if(!dmg.cancel.isCancelled && dmg.source.source instanceof Skill){
                shouldReduce = true;
            }
        }

        if(shouldReduce) this.reduceDefense();
    }
}

export class HasmetliHatirati extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private shouldDealBonus(damage: DamageDone): boolean {
        const missingHealth = damage.target.player.baseStats.health - damage.target.player.stats.health;
        const percentage = missingHealth / damage.target.player.baseStats.health * 100;
        return percentage > 75;
    }

    private increaseDamage(){
        for(let i = 0; i < this.config.sourceMember.Decider.Current.damageDone.length; i++){
            for(let j = 0; j < this.config.sourceMember.Decider.Current.damageDone[i].target.Decider.Current.damageTaken.length; j++){
                if(this.config.targetMember.player.stats.health < this.config.sourceMember.Decider.Current.damageDone[i].target.player.stats.health){
                    const gainMultiplier = this.shouldDealBonus(this.config.sourceMember.Decider.Current.damageDone[i].target.Decider.Current.damageTaken[j]) ? 2 : 1;
                    this.config.sourceMember.Decider.Current.damageDone[i].target.Decider.Current.damageTaken[j].damage *= gainMultiplier;
                }
            }
        }
    }

    init(): void {
        
    }

    do(): void {
        
    }

    afterDo(): void {
        this.increaseDamage();
    }
}

export class MakarnaCanavari extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private shouldDealBonus(damage: DamageDone): boolean {
        return damage.target.hasCC();
    }

    private increaseDamage(){
        for(let i = 0; i < this.config.sourceMember.Decider.Current.damageDone.length; i++){
            for(let j = 0; j < this.config.sourceMember.Decider.Current.damageDone[i].target.Decider.Current.damageTaken.length; j++){
                if(this.config.sourceMember === this.config.sourceMember.Decider.Current.damageDone[i].target.Decider.Current.damageTaken[j].source.player ){
                    const gainMultiplier = this.shouldDealBonus(this.config.sourceMember.Decider.Current.damageDone[i].target.Decider.Current.damageTaken[j]) ? 2.5 : 1;
                    this.config.sourceMember.Decider.Current.damageDone[i].target.Decider.Current.damageTaken[j].damage *= gainMultiplier;
                }   
            }
        }
    }

    init(): void {}

    do(): void {}

    afterDo(): void {
        this.increaseDamage();
    }
}

export class PestoSosluMakarna extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private increaseCritic(): void {
        this.config.targetMember.player.stats.critic += this.config.targetMember.player.stats.critic * 0.25;
    }

    init(): void {}

    do(): void {}

    afterDo(): void {
        let shouldReduce = false;

        for(const dmg of this.config.targetMember.Decider.Current.damageTaken){
            if(!dmg.cancel.isCancelled){
                shouldReduce = true;
                break;
            }
        }

        if(shouldReduce) this.increaseCritic();
    }
}

export class SukruSaracoglu extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private calculateCriticBonus(): number{
        let sum = 0;
        for(const clothKey of Object.keys(this.config.targetMember.original.wearings)){
            if(clothKey == 'skills') continue;

            const item: Item = this.config.targetMember.original.wearings[clothKey] as Item;
            sum += item.stats.critic ?? 0;
        }
        return sum * 30 / 100 / (this.config.targetMember as Player).DIVIDERS.critic;
    }

    init(): void {
        this.config.targetMember.player.stats.critic += this.calculateCriticBonus();
    }

    do(): void {
        
    }

    afterDo(): void {
        
    }
}

export class HakimBey extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private increaseCritic(): void {
        this.config.targetMember.player.stats.critic += this.config.targetMember.player.stats.critic * 0.5;
    }

    init(): void {}

    do(): void {}

    afterDo(): void {
        let shouldIncrease = false;

        for(const dmg of this.config.targetMember.Decider.Current.damageTaken){
            if(!dmg.cancel.isCancelled){
                shouldIncrease = true;
                break;
            }
        }

        if(shouldIncrease) this.increaseCritic();
    }
}

export class RuhsarinIntikami extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private placeDamage(damage: DamageDone){
        damage.target.Decider.takeDamage(damage);
    }

    private reflectDamages(){
        for(let i = 0; i < this.config.targetMember.Decider.Current.damageTaken.length; i++){
            console.log('A');
            let takenDamage = this.config.targetMember.Decider.Current.damageTaken[i].damage;
            
            let reflectedDamage = takenDamage * 0.4;
            this.config.targetMember.Decider.Current.damageTaken[i].damage *= 0.6;
            let reflected: DamageDone = {
                damage: reflectedDamage, 
                source: {player: this.config.targetMember, source: this}, 
                target: this.config.targetMember.Decider.Current.damageTaken[i].source.player, 
                cancel: {isCancelled: false}, 
                isTrue: false
            }
            this.placeDamage(reflected);
        }

    }

    init(): void {}

    do(): void {}

    afterDo(): void {
        this.reflectDamages();
    }
}