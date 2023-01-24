import Odenne from "../odenne";
import { PlayerStatistics, UsedSkillCount } from "../types/stats";
import { DeciderSummary } from "../types/types";
import { Effect } from "./effects";
import { Skill } from "./skills";

export default class Statistics {
    Odenne: Odenne;
    teams: PlayerStatistics[][];

    constructor(Odenne: Odenne){
        this.Odenne = Odenne;
        this.teams = [[], []];
    }

    prepareTeams(){
        for(let i = 0; i < this.teams.length; i++){
            for(let j = 0; j < this.Odenne.teams[i].players.length; j++){
                const player: PlayerStatistics = {
                    snowflake: this.Odenne.teams[i].players[j].original.snowflake,
                    characterId: this.Odenne.teams[i].players[j].original.characterId,
                    skillUseCounts: [],
                    totalDamageDone: {
                        skill: 0,
                        effect: 0
                    }
                }

                this.teams[i].push(player);
            }
        }
    }

    processEndGame(){
        this.saveSkillCounts();
        this.saveArtifacts();
    }

    private saveArtifacts(){
        for(const log of this.Odenne.Keeper.logs){
            
            for(const teamIndex in log.summaries){
                this.saveDamages(parseInt(teamIndex), log.summaries[teamIndex]);
            }
        }
    }

    private saveDamages(teamIndex:number, summary: DeciderSummary){
        for(const damageDone of summary.damageDone){
            const statPlayer = this.teams[teamIndex].filter(p => p.snowflake === damageDone.source.player.original.snowflake)[0]; // BISI OLURSA SUCLUSU BILGAN
            if(damageDone.source.source instanceof Skill){
                statPlayer.totalDamageDone.skill += damageDone.damage;
            }
            else if(damageDone.source.source instanceof Effect){
                statPlayer.totalDamageDone.effect += damageDone.damage;
            }
        }
    }

    private saveSkillCounts(){
        for(const teamIndex in this.Odenne.teams){
            for(const playerIndex in this.Odenne.teams[teamIndex].players){
                const statPlayer = this.teams[teamIndex][playerIndex];
                this.Odenne.teams[teamIndex].players[playerIndex].player.skills.forEach(skill => {
                    const skillCount: UsedSkillCount = {
                        skillId: skill.skill.id,
                        count: skill.usedRounds.length
                    } 
                    statPlayer.skillUseCounts.push(skillCount);
                })
            }
        }
    }
}