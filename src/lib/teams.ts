import _ from "lodash";
import Odenne from "../odenne";
import { Item, OdennePlayer, OriginalPlayer, OriginalSkill } from "../types/player";
import { DamageDone, DeciderSummary, TurnTypes } from "../types/types";
import Decider from "./decider";
import { AttackBonus, Blind, Effect, StatBonus } from "./effects";
import { AttackSkill, DefenseSkill, PassiveSkill, Skill } from "./skills";

export class Teams {
    Odenne: Odenne;
    teamCount: number;

    constructor(Odenne: Odenne){
        this.Odenne = Odenne;

        this.teamCount = 0;
    }

    createTeam(){
        const team = new Team(this.Odenne);
        team.index = this.teamCount;
        this.teamCount++;
        return team;
    }
}

export class Team {
    Odenne: Odenne;
    players: Array<Player>;
    index: number;

    constructor(Odenne: Odenne){
        this.Odenne = Odenne;
        this.players = [];
        this.index = 0;
    }

    addPlayer(originalPlayer: OriginalPlayer){
        const player = new Player(this, originalPlayer);
        this.players.push(player);
    }

    isAllPlayersDead(): boolean {
        for(const player of this.players){
            if(player.player.stats.health > 0) return false;
        }
        return true;
    }

    getSummaries(): DeciderSummary{
        let summaries: DeciderSummary[] = []
        for(const player of this.players){
            summaries.push(player.Decider.getSummary())
        }
        if(summaries.length === 1) return summaries[0];
        else{
            let summary: DeciderSummary = {damageDone: [], damageTaken: [], effects: []};
            for(const sum of summaries){
                for(const key in sum){
                    for(const elem of sum[key as keyof DeciderSummary]){
                        summary[key as keyof DeciderSummary].push(elem as DamageDone & Effect)
                    }
                }
            }
            return summary;
        }
    }

    applyRound(){
        for(const player of this.players){
            player.Decider.apply();
        }
    }

    clear(){
        for(const player of this.players){
            player.Decider.clear();
        }
    }

    applyDamage(){
        for(const player of this.players){
            player.Decider.applyTakenDamages();
        }
    }

    runPassiveSkills(){
        for(const player of this.players){
            player.preparePassiveSkills();
        }
    }
}

export class Member {
    team: Team;
    original: OriginalPlayer;
    player: OdennePlayer;
    Decider!: Decider;
    effects: Effect[];

    constructor(Team: Team, original: OriginalPlayer){
        this.team = Team;
        this.original = original;
        this.player = {
            stats: {

            },
            baseStats: {

            },
            skills: []
        };

        this.effects = [];
    }

    hasEffect(effectType: string){
        return this.effects.some(e => e.constructor.name === effectType);
    }

    hasCC(){
        const CCs = ["Blind"];

        return CCs.some(c => this.hasEffect(c));
    }

    getRandomSkill(): Skill | undefined {
        const maxAttackTryCount = 2;
        const maxDefenseTryCount = 1;
        let count = 0;
        const usingCount = this.team.Odenne.Referee.turn.player.player as Member === this ? maxAttackTryCount : maxDefenseTryCount;
        const totalChance = this.player.skills.reduce((prev, curr) => prev += curr.chance, 0);

        while(count < usingCount){
            const randomized = this.team.Odenne.Rarity.rand(0, totalChance, -2) as number;

            let randomSkill = this.findSkillByRandom(randomized);
            if(this.isSkillValid(randomSkill) && randomSkill.isAvailable()){
                return randomSkill;
            }
            count++;
        }

        if(this.team.Odenne.Referee.turn.player.player as Member === this){
            return this.player.skills[0];
        }
    }

    // for temporary effects
    getStat(type: string): number{
        let sum = this.player.stats[type];

        for(const effect of this.effects){
            if(effect instanceof StatBonus){
                sum += effect.get(type);
            }
        }
        return sum;
    }

    private findSkillByRandom(random: number): Skill{
        let sum = 0;

        for(const skill of this.player.skills){
            if(random >= sum && random < (sum + skill.chance)){
                return skill;
            }
            else sum += skill.chance;
        }

        return this.player.skills[0];
    }

    private isSkillValid(skill: Skill): boolean {
        if(this.team.Odenne.Referee.turn.player.player as Member === this){
            return skill instanceof AttackSkill;
        }
        else {
            return skill instanceof DefenseSkill;
        }
    }
}

export class Player extends Member {
    DIVIDERS: {[key: string]: number};


    constructor(Team: Team, original: OriginalPlayer){
        super(Team, original);
        this.Decider = new Decider(this);
        this.DIVIDERS = {
            attack: 5,
            defense: 10,
            health: 1,
            accuracy: 1,
            critic: 5,
            penetration: 5
        }


        this.prepare();
    }

    prepare(){
        this.createStats();
        this.calculateItemStats();
        this.divideStats();

        this.prepareSetBonuses();

        this.prepareSkills();
    }

    createStats(){
        this.player.stats = this.original.stats;
    }

    divideStats(){
        for(const key of Object.keys(this.player.stats)){
            this.player.stats[key] = Math.floor(this.player.stats[key] / this.DIVIDERS[key]);
        }

        this.player.baseStats = _.cloneDeep(this.player.stats);
    }

    calculateItemStats(){
        if(this.team.Odenne.options.shouldCalculateItemStats(this.team.index)){
            for(const clothKey of Object.keys(this.original.wearings)){
                if(clothKey == 'skills') continue;

                const item: Item = this.original.wearings[clothKey] as Item;
                for(const stat of Object.keys(item.stats)){
                    this.player.stats[stat] += item.stats[stat];
                }
            }
        }
    }

    prepareSetBonuses(){
        let sets: {[key: string]: number} = {};

        for(const cloth of Object.keys(this.original.wearings)){
            if(cloth === 'skills') continue;

            const item = this.original.wearings[cloth] as Item;
            if(sets[item.set]) sets[item.set] += 1;
            else sets[item.set] = 1;
        }

        // calculated set counts do necessary set bonuses
        // TBI
    }

    findSkillFromConfig(id: number): OriginalSkill | undefined{
        for(const skill of this.team.Odenne.SkillConfig as Array<OriginalSkill>){
            if(skill.id == id) return skill;
        }
    }



    prepareSkills(){
        for(const skillId of (this.original.wearings.skills as Array<number>)){
            const skill: OriginalSkill = this.findSkillFromConfig(skillId) as OriginalSkill;
            this.team.Odenne.Skills.create(this, skill);
        }
    }

    preparePassiveSkills(){
        for(const skill of this.player.skills){
            if(skill instanceof PassiveSkill) skill.applyEffect();
        }
    }

}

export class Mob extends Member{
    
}

export default Teams;