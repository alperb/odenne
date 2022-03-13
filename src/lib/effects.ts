import Odenne from "../odenne";
import { CancelInfo, EffectConfig } from "../types/types";
import { Environment } from "./environments";
import { Skill } from "./skills";
import { Member, Player } from "./teams";

export default class Effects {
    Odenne: Odenne;

    constructor(Odenne: Odenne){
        this.Odenne = Odenne;
    }

    new(name: string, config: EffectConfig) : Effect | undefined{
        switch(name){
            case 'Ignite':
                return new Ignite(config);
            case 'Dodge':
                return new Dodge(config);
            case 'EdipinYarragi':
                return new EdipinYarragi(config);
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

export class EffectResult {
    source: Player | Environment |  undefined;

    constructor(){
    }

    setSource(player: Player){
        this.source = player;
    }
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
            damage: 5
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
            damage: dmg
        })
    }

    afterDo(): void {}
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