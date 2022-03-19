import { DAMAGETYPES } from "../types/player";
import { CancelInfo, DamageDone, DeciderSummary } from "../types/types";
import { Effect } from "./effects";
import { Skill } from "./skills";
import { Player } from "./teams";


export default class Decider {
    Player: Player;

    Current: DeciderSummary;
    constructor(Player: Player){
        this.Player = Player;
        this.Current = {damageTaken: [], damageDone: [], effects: []}
    }

    clear(){
        this.Current.damageDone = [];
        this.Current.damageTaken = [];
        this.Current.effects = [];
        this.reduceEffects();
    }

    reduceEffects(){
        let effectsToRemove: Effect[] = [];
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
        if(!shouldTake.isCancelled){
            this.Current.damageTaken.push(damage);
            damage.source.player.Decider.Current.damageDone.push(damage);
        }
        else{
            damage.cancel = shouldTake;
        }

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
        return {isCancelled: false}
    }

    shouldTakeEffect(effect: Effect): CancelInfo {
        return {isCancelled: false}
    }

    apply(){
        this.initEffects();
        this.runEffects(); 
        this.applyEffects();
        this.runAfterEffects();
        // this.applyTakenDamages();
        // clear artifacts
        // this.clear();
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

    applyTakenDamages(){
        for(const damage of this.Current.damageTaken){
            if(!damage.cancel.isCancelled){
                const damageValue = this.calculateTakenDamage(damage);
                this.Player.player.stats.health -= damageValue;
                damage.damage = damageValue;

            }
        }
    }

    private calculateTakenDamage(damage: DamageDone): number {
        let dmg = damage.damage;
        if(!damage.isTrue){
            dmg -= this.Player.getStat("defense");
            if(dmg <= 0) {
                if(damage.source.source instanceof Skill){
                    if(damage.source.source.damageType == DAMAGETYPES.RANGED){
                        dmg = damage.source.source.skill.min as number;
                    }
                    else{
                        dmg = damage.source.source.skill.damage as number;
                    }
                } 
                else if(damage.source.source instanceof Effect){
                    dmg = 0; // TODO: calculate effect's damage
                }
            }
        }
        return dmg;
    }

    getSummary(): DeciderSummary{
        return this.Current;
    }
}