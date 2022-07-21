// Original file: src/grpc/proto/odenne.proto


export interface CreateSessionResponse {
  'status'?: (number);
  'session'?: (string);
  'error'?: (string);
  '_session'?: "session";
  '_error'?: "error";
}

export interface CreateSessionResponse__Output {
  'status'?: (number);
  'session'?: (string);
  'error'?: (string);
}
