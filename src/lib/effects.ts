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

    abstract do(): void;
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

    do(): void {
        this.config.targetMember.Decider.takeDamage({
            source: {player: this.config.sourceMember, source: this},
            target: this.config.targetMember,
            cancel: {isCancelled: false},
            damage: 5
        })
    }
}