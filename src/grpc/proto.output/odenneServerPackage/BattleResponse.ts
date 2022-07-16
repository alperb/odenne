// Original file: src/grpc/proto/odenne.proto

import type { MatchResult as _odenneServerPackage_MatchResult, MatchResult__Output as _odenneServerPackage_MatchResult__Output } from '../odenneServerPackage/MatchResult';

export interface BattleResponse {
  'result'?: (number);
  'logs'?: (Buffer | Uint8Array | string);
  'end'?: (_odenneServerPackage_MatchResult | null);
  'stats'?: (Buffer | Uint8Array | string);
  'error'?: (string);
  '_logs'?: "logs";
  '_end'?: "end";
  '_stats'?: "stats";
  '_error'?: "error";
}

export interface BattleResponse__Output {
  'result'?: (number);
  'logs'?: (Buffer);
  'end'?: (_odenneServerPackage_MatchResult__Output);
  'stats'?: (Buffer);
  'error'?: (string);
}
