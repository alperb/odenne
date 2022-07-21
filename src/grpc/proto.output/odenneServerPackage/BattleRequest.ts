// Original file: src/grpc/proto/odenne.proto


export interface BattleRequest {
  'session'?: (string);
  'enemy'?: (Buffer | Uint8Array | string);
  'options'?: (Buffer | Uint8Array | string);
}

export interface BattleRequest__Output {
  'session'?: (string);
  'enemy'?: (Buffer);
  'options'?: (Buffer);
}
