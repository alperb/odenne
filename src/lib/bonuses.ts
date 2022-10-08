import Odenne from "..";
import { EffectConfig, SetBonus } from "../types/types";
import { Effect } from "./effects";

import SetBonusConfig from "../config/setbonuses.json";
import { Member, Player } from "./teams";
import { Item } from "../types/player";

export default class BonusFactory {
    Odenne: Odenne;
    constructor(odenne: Odenne){
        this.Odenne = odenne;
    }

    static getBonusesFromGivenCounts(setCounts: Record<string, number>): Record<string, SetBonus[]> {
        const allEffects: Record<string, SetBonus[]> = {};
        console.log({setCounts});
        for(const set of Object.keys(setCounts)){
            const level = setCounts[set];
            const setGroup = SetBonusConfig.sets[set as keyof typeof SetBonusConfig.sets];
            if(!setGroup) continue;
            
            const effects: SetBonus[] = [];
            for(const lvl of setGroup.levels){
                if(level >= lvl.partCount){
                    effects.push(lvl);
                }
            }
            allEffects[set] = effects;
        }

        return allEffects;
    }

    private getEffects(set: string, level: number, config: EffectConfig): Effect[] {
        const setGroup = SetBonusConfig.sets[set as keyof typeof SetBonusConfig.sets];
        if(!setGroup) return [];
        
        const effects: SetBonus[] = [];
        const createdEffects: Effect[] = [];
        for(const lvl of setGroup.levels){
            if(level >= lvl.partCount){
                effects.push(lvl);
            }
        }
        for(const effect of effects){
            const eff = this.Odenne.Effects.new(effect.effectName, config, effect.details);
            if(eff) createdEffects.push(eff);
        }
        return createdEffects;
    }

    private countSetCount(target: Member): Record<string, number> {
        const sets: Record<string, number> = {};
        for(const part of Object.keys(target.original.wearings)){
            try{
                if(part === 'skills') continue;
            
                const setName = (target.original.wearings[part] as Item).set;
                if(setName === 'rookie') continue;

                if(!sets[setName]) sets[setName] = 0;
                sets[setName]++;
            }
            catch(e){
                continue;
            }
        }
        return sets;
    }

    create(player: Player) {
        const effectConfig: EffectConfig = {
            targetMember: player,
            source: undefined,
            sourceMember: player,
            count: -1
        }
        const setCounts = this.countSetCount(player);
        for(const setName of Object.keys(setCounts)){
            const setLevel = setCounts[setName];
            const effects = this.getEffects(setName, setLevel, effectConfig);
            for(const effect of effects){
                player.addEffect(effect);
            }
        }
    }
}