// Original file: src/grpc/proto/odenne.proto

import type { UsedSkillCount as _odenneServerPackage_UsedSkillCount, UsedSkillCount__Output as _odenneServerPackage_UsedSkillCount__Output } from '../odenneServerPackage/UsedSkillCount';
import type { TotalDamageDone as _odenneServerPackage_TotalDamageDone, TotalDamageDone__Output as _odenneServerPackage_TotalDamageDone__Output } from '../odenneServerPackage/TotalDamageDone';

export interface PlayerStatistics {
  'snowflake'?: (string);
  'characterId'?: (string);
  'skillUseCounts'?: (_odenneServerPackage_UsedSkillCount)[];
  'totalDamageDone'?: (_odenneServerPackage_TotalDamageDone | null);
}

export interface PlayerStatistics__Output {
  'snowflake'?: (string);
  'characterId'?: (string);
  'skillUseCounts'?: (_odenneServerPackage_UsedSkillCount__Output)[];
  'totalDamageDone'?: (_odenneServerPackage_TotalDamageDone__Output);
}
