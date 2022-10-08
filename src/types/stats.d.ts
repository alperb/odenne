export interface PlayerStatistics {
    snowflake: string;
    characterId: string;
    skillUseCounts: UsedSkillCount[];
    totalDamageDone: {
        skill: number;
        effect: number;
    }
}

export interface UsedSkillCount {
    skillId: number;
    count: number;
}