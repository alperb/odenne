import { DAMAGETYPES, SHIELDTYPES, TempShield } from "../types/player";
import { CancelInfo, DamageDone, DeciderSummary, EventParameters, EventTypes, ShieldDone } from "../types/types";
import { CrowdControlEffect, Effect, Stun } from "./effects";
import { ParalyzeI, Skill } from "./skills";
import { Player } from "./teams";
import _ from "lodash";


export default class Decider {
    Player: Player;

    Current: DeciderSummary;
    constructor(Player: Player){
        this.Player = Player;
        this.Current = {damageTaken: [], damageDone: [], effects: [], shieldTaken: []}
    }

    clear(){
        this.Current.damageDone = [];
        this.Current.damageTaken = [];
        this.Current.effects = [];
        this.Current.shieldTaken = [];
        this.reduceEffects();
        this.Player.reduceShields();
    }

    reduceEffects(){
        const effectsToRemove: Effect[] = [];
        for(const effect of this.Player.effects){
            effect.reduce();
            if(effect.hasExpired()){
                effectsToRemove.push(effect);
            }
        }
        for(const effect of effectsToRemove){
            this.Player.effects.splice(this.Player.effects.indexOf(effect), 1);
        }
    }

    takeDamage(damage: DamageDone): CancelInfo {
        const shouldTake = this.shouldTakeDamage(damage);
        if(shouldTake.isCancelled) damage.cancel = shouldTake;
        this.Current.damageTaken.push(damage);
        damage.source.player.Decider.Current.damageDone.push(damage);

        return shouldTake;
    }

    takeShield(shield: ShieldDone): CancelInfo {
        const shouldTake = this.shouldTakeShield(shield);
        if(shouldTake.isCancelled) shield.cancel = shouldTake;
        this.Current.shieldTaken.push(shield);
        
        return shouldTake;
    }

    takeEffect(effect: Effect){
        const shouldTake = this.shouldTakeEffect(effect);
        if(!shouldTake.isCancelled){
            this.Current.effects.push(effect);
        }
        else{
            effect.cancel = shouldTake;
        }

        return shouldTake;
    }

    shouldTakeDamage(damage: DamageDone): CancelInfo {
        const cc = damage.source.player.hasCC();
        if(cc && !damage.bypass && damage.source.player === this.Player.team.Odenne.Referee.turn.player.player){
            if(cc instanceof Stun){
                const newEvent: EventParameters = {
                    type: EventTypes.CC,
                    attacker: damage.source.player.original.name,
                    skill: "stunned"
                }

                damage.source.player.team.Odenne.Narrator.saveEvent(newEvent);
            }

            return {isCancelled: true, source: cc, sourceMember: cc.config.sourceMember};
        }


        return {isCancelled: false}
    }

    shouldTakeShield(shield: ShieldDone): CancelInfo {
        const cc = shield.source.player.hasCC();
        if(cc){
            return {isCancelled: true, source: cc, sourceMember: cc.config.sourceMember};
        }

        if(shield.source.source instanceof Skill) {
            const shieldType = shield.target.hasEffect('FastAndFurious') ? 'permanent' : (shield.type === SHIELDTYPES.TEMP ? 'temporary' : 'permanent');
            const event: EventParameters = {
                type: EventTypes.SHIELD_GAIN,
                attacker: shield.target.original.name,
                shieldType,
                shieldValue: shield.value
            }
            shield.source.source.saveEvent(event);
        }


        return {isCancelled: false}
    }

    shouldTakeEffect(effect: Effect): CancelInfo {
        const CCImmunity = effect.config.targetMember.hasEffect("CrowdControlImmunity");
        if(effect instanceof CrowdControlEffect && !!CCImmunity){
            return {isCancelled: true, source: CCImmunity, sourceMember: effect.config.targetMember};
        }


        return {isCancelled: false}
    }

    apply(){
        this.initEffects();
        this.runEffects(); 
        this.applyEffects();
        this.runAfterEffects();
    }

    private runAfterEffects() {
        this.Player.effects.forEach(eff => eff.afterDo());
    }

    private initEffects(){
        this.Current.effects.forEach(eff => eff.init());
    }

    private runEffects(){
        this.Player.effects.forEach(eff => eff.do());
    }

    private applyEffects(){
        for(const effect of this.Current.effects){
            // TODO: double effects should be removed first
            this.Player.effects.push(effect);
        }
    }

    private checkEvent(damage: DamageDone){
        if(damage.source.source instanceof ParalyzeI){
            const newEvent: EventParameters = {
                type: EventTypes.DAMAGE_AND, 
                damage: damage.damage, 
                attacker: damage.source.player.original.name,
                skill: damage.source.source.skill.name,
                reason: `disabled __${damage.source.source.disabledSkill.skill.name}__`
            }

            this.Player.team.Odenne.Narrator.saveEvent(newEvent);
        }else if(damage.source.source instanceof Skill){
            const newEvent: EventParameters = {
                type: EventTypes.DAMAGE, 
                damage: damage.damage, 
                attacker: damage.source.player.original.name,
                skill: damage.source.source.skill.name
            }

            this.Player.team.Odenne.Narrator.saveEvent(newEvent);
        }
    }

    applyTakenDamages(){
        for(const damage of this.Current.damageTaken){
            if(!damage.cancel.isCancelled){
                const {damageValue, damageWithoutShield} = this.calculateTakenDamage(damage);
                
                this.Player.player.stats.health -= damageValue;
                damage.damage = damageWithoutShield;

                this.checkEvent(damage)

            }
        }
    }

    applyTakenShields(){
        for(const shield of this.Current.shieldTaken){
            if(!shield.cancel.isCancelled){
                if(shield.type === SHIELDTYPES.PERM || shield.target.hasEffect("FastAndFurious")){
                    this.Player.player.shields.permanent += shield.value;
                }else if(shield.type === SHIELDTYPES.TEMP){
                    const tempShield: TempShield = {value: shield.value, count: 2, source: shield.source}
                    this.Player.player.shields.temporary.push(tempShield);
                }
            }
        }
    }

    private applyShield(damage: number): {damageApplied: number, shieldApplied: number} {
        let shieldApplied = 0;
        for(let i = 0; i < this.Player.player.shields.temporary.length; i++){
            if(this.Player.player.shields.temporary[i].value >= damage){
                this.Player.player.shields.temporary[i].value -= damage
                shieldApplied = damage;
                return {damageApplied: 0, shieldApplied};
            }
            else{
                damage -= this.Player.player.shields.temporary[i].value;
                shieldApplied = this.Player.player.shields.temporary[i].value;
                this.Player.player.shields.temporary[i].value = 0;
            }
        }

        if(this.Player.player.shields.permanent >= damage){
            this.Player.player.shields.permanent -= damage;
            return {damageApplied: 0, shieldApplied: damage};
        }else{
            damage -= this.Player.player.shields.permanent;
            shieldApplied = this.Player.player.shields.permanent;
            this.Player.player.shields.permanent = 0;
        }

        return {damageApplied: damage, shieldApplied};
    }

    private calculateTakenDamage(damage: DamageDone): {damageValue: number, damageWithoutShield: number} {
        let dmg = _.clone(damage.damage);
        let shield = 0;
        if(!damage.isTrue){
            let {damageApplied, shieldApplied} = this.applyShield(dmg);
            shield = shieldApplied;
            dmg = damageApplied;
            dmg -= this.Player.getStat("defense");
            
            if(damage.source.source instanceof Skill) {
                const minPossibleDamage = (damage.source.source.skill.min as number) + (damage.source.player.getStat("attack") * damage.source.player.getStat("accuracy") / 1000);
                if(dmg <= minPossibleDamage){
                    if(damage.source.source.damageType == DAMAGETYPES.RANGED){
                        dmg = damage.damage / 2;
                    }
                    else{
                        dmg = damage.source.source.skill.damage as number;
                    }
                } 
            }
            else if(damage.source.source instanceof Effect){
                dmg = 0; // TODO: calculate effect's damage
            }
        }
        return {damageValue: Math.floor(dmg), damageWithoutShield: Math.floor(dmg + shield)};
    }

    getSummary(): DeciderSummary{
        return this.Current;
    }
}