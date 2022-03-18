import Odenne from "../odenne";
import { BonusDetails, CancelInfo, EffectConfig } from "../types/types";
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
            case 'Invulnerable':
                return new Invulnerable(config);
            case 'SineminCizimTableti':
                return new SineminCizimTableti(config);
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

export class SineminCizimTableti extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private makeDamagesTrue(){
        for(let i = 0; i < this.config.sourceMember.Decider.Current.damageDone.length; i++){
            if(this.config.targetMember.player.stats.health < this.config.sourceMember.Decider.Current.damageDone[i].target.player.stats.health){
                this.config.sourceMember.Decider.Current.damageDone[i].isTrue = true;
               // TODO: Burasi calismiyor
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