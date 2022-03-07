import { DamageDone } from "../types/types";
import { Effect } from "./effects";
import { Player } from "./teams";

export default class Decider {
    Player: Player;

    damageTaken: DamageDone[];
    damageDone: DamageDone[];
    effects: Effect[];

    constructor(Player: Player){
        this.Player = Player;

        this.damageTaken = [];
        this.damageDone = [];
        this.effects = [];
    }

    clear(){
        this.damageDone = [];
        this.damageDone = [];
        this.reduceEffects();
    }

    reduceEffects(){
        let effectsToRemove: Effect[] = [];
        for(const effect of this.effects){
            effect.reduce();
            if(effect.hasExpired()){
                effectsToRemove.push(effect);
            }
        }
        for(const effect of effectsToRemove){
            this.effects.splice(this.effects.indexOf(effect), 1);
        }
    }

    takeDamage(damage: DamageDone): boolean {
        if(this.shouldTakeDamage(damage)){
            this.damageTaken.push(damage);
            return true;
        }
        else return false;
    }

    shouldTakeDamage(damage: DamageDone): boolean {
        return true;
    }

    apply(){
        this.applyTakenDamages();
        // clear artifacts
        this.clear();
    }

    private applyTakenDamages(){
        for(const damage of this.damageTaken){
            this.Player.player.stats.health -= damage.damage;
        }
    }

    getSummary(){
        
    }
}