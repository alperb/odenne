import Odenne from "../odenne";
import { Item, OdennePlayer, OriginalPlayer, OriginalSkill } from "../types/player";
import { TurnTypes } from "../types/types";
import Decider from "./decider";
import { AttackSkill, DefenseSkill, Skill } from "./skills";

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
        const player = new Player(this,originalPlayer);
        this.players.push(player);
    }

    isAllPlayersDead(): boolean {
        for(const player of this.players){
            if(player.player.stats.health > 0) return false;
        }
        return true;
    }
}

export class Member {
    team: Team;
    original: OriginalPlayer;
    player: OdennePlayer;
    Decider!: Decider;

    constructor(Team: Team, original: OriginalPlayer){
        this.team = Team;
        this.original = original;
        this.player = {
            stats: {

            },
            skills: []
        };
    }

    getRandomSkill(): Skill{
        const maxAttackTryCount = 2;
        const maxDefenseTryCount = 1;
        let count = 0;
        const usingCount = this.team.Odenne.Referee.turn.type == TurnTypes.ATTACK ? maxAttackTryCount : maxDefenseTryCount;

        while(count < usingCount){
            const randomized = Math.floor(Math.random() * this.player.skills.length);
            let randomSkill = this.player.skills[ randomized ];
            if(this.isSkillValid(randomSkill)){
                return randomSkill;
            }
            count++;
        }

        if(this.team.Odenne.Referee.turn.type !== TurnTypes.ATTACK){
            return this.player.skills[0];
        }
        else throw this.team.Odenne.exceptions.COULDNT_RANDOMIZE_SKILL;
    }

    private isSkillValid(skill: Skill): boolean {
        if(this.team.Odenne.Referee.turn.type === TurnTypes.ATTACK){
            return skill instanceof AttackSkill;
        }
        else {
            return skill instanceof DefenseSkill
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

}

export default Teams;