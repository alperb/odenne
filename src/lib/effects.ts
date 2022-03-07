import Odenne from "../odenne";
import { Environment } from "./environments";
import { Skill } from "./skills";
import { Member, Player } from "./teams";

export default class Effects {
    Odenne: Odenne;
    Request: EffectRequest | undefined;

    constructor(Odenne: Odenne){
        this.Odenne = Odenne;
    }

    new(request: EffectRequest) : Effect | undefined{
        switch(request.name){
            case 'AttackBonus':
                return new AttackBonus(request);
            default:
                return undefined;
        }
    }

}

export class EffectRequest {
    targetMember!: Member;
    sourceMember: Member | undefined;
    source: Skill | Effect | undefined;
    expiration: number | undefined;
    name!: string;

    constructor(){}

    setEffect(effectname: string){
        this.name = effectname;
    }

    addTargetMember(Member: Member){
        this.targetMember = Member;
    }

    addSourceMember(Member: Member){
        this.sourceMember = Member;
    }

    /**
     * Adds effect source
     * @param {Skill | Effect} source Source of the effect
     */
    addSource(source: Skill | Effect){
        this.source = source;
    }

    /**
     * Sets expiration round count
     * @param {number} count expiration round count
     */
    setExpiration(count: number){
        this.expiration = count;
    }
}


export class Effect {
    request: EffectRequest;
    count!: number;
    target!: Member;
    sourceMember: Member | undefined;
    source: Skill | Effect | undefined;

    /**
     * Constructs a new effect
     * @param {EffectRequest} request effect request
     */
    constructor(request: EffectRequest){
        this.request = request;
    }

    reduce(){
        if(this.count > 0){
            this.count -= 1;
        }
    }

    hasExpired(){
        return this.count == 0;
    }

    processRequest(){
        if(this.request.targetMember) this.target = this.request.targetMember;
        if(this.request.sourceMember) this.sourceMember = this.request.sourceMember;
        if(this.request.source) this.source = this.request.source;
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

export class AttackBonus extends Effect {
    request!: EffectRequest;
    target!: Member;
    sourceMember: Member | undefined;
    source: Skill | Effect | undefined;
    
    constructor(request: EffectRequest){
        super(request);
    }
}