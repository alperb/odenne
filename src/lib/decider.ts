import { CancelInfo, DamageDone, DeciderSummary } from "../types/types";
import { Effect } from "./effects";
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
        this.applyEffects();
        this.runEffects();
        this.applyTakenDamages();
        
        // clear artifacts
        this.clear();
    }

    private runEffects(){
        // TODO: efektlerin do()'lari calistirilacak
    }

    private applyEffects(){
        for(const effect of this.Current.effects){
            this.Player.effects.push(effect);
        }
    }

    private applyTakenDamages(){
        for(const damage of this.Current.damageTaken){
            console.log(this.Player.player.stats.health)
            this.Player.player.stats.health -= damage.damage;
            console.log(this.Player.player.stats.health)
        }
    }

    getSummary(): DeciderSummary{
        return this.Current;
    }
}