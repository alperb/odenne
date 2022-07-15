// Original file: src/grpc/proto/odenne.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { BattleRequest as _odenneServerPackage_BattleRequest, BattleRequest__Output as _odenneServerPackage_BattleRequest__Output } from '../odenneServerPackage/BattleRequest';
import type { BattleResponse as _odenneServerPackage_BattleResponse, BattleResponse__Output as _odenneServerPackage_BattleResponse__Output } from '../odenneServerPackage/BattleResponse';
import type { CreateSessionRequest as _odenneServerPackage_CreateSessionRequest, CreateSessionRequest__Output as _odenneServerPackage_CreateSessionRequest__Output } from '../odenneServerPackage/CreateSessionRequest';
import type { CreateSessionResponse as _odenneServerPackage_CreateSessionResponse, CreateSessionResponse__Output as _odenneServerPackage_CreateSessionResponse__Output } from '../odenneServerPackage/CreateSessionResponse';

export interface OdenneServerClient extends grpc.Client {
  battle(argument: _odenneServerPackage_BattleRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_odenneServerPackage_BattleResponse__Output>): grpc.ClientUnaryCall;
  battle(argument: _odenneServerPackage_BattleRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_odenneServerPackage_BattleResponse__Output>): grpc.ClientUnaryCall;
  battle(argument: _odenneServerPackage_BattleRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_odenneServerPackage_BattleResponse__Output>): grpc.ClientUnaryCall;
  battle(argument: _odenneServerPackage_BattleRequest, callback: grpc.requestCallback<_odenneServerPackage_BattleResponse__Output>): grpc.ClientUnaryCall;
  battle(argument: _odenneServerPackage_BattleRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_odenneServerPackage_BattleResponse__Output>): grpc.ClientUnaryCall;
  battle(argument: _odenneServerPackage_BattleRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_odenneServerPackage_BattleResponse__Output>): grpc.ClientUnaryCall;
  battle(argument: _odenneServerPackage_BattleRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_odenneServerPackage_BattleResponse__Output>): grpc.ClientUnaryCall;
  battle(argument: _odenneServerPackage_BattleRequest, callback: grpc.requestCallback<_odenneServerPackage_BattleResponse__Output>): grpc.ClientUnaryCall;
  
  createSession(argument: _odenneServerPackage_CreateSessionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_odenneServerPackage_CreateSessionResponse__Output>): grpc.ClientUnaryCall;
  createSession(argument: _odenneServerPackage_CreateSessionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_odenneServerPackage_CreateSessionResponse__Output>): grpc.ClientUnaryCall;
  createSession(argument: _odenneServerPackage_CreateSessionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_odenneServerPackage_CreateSessionResponse__Output>): grpc.ClientUnaryCall;
  createSession(argument: _odenneServerPackage_CreateSessionRequest, callback: grpc.requestCallback<_odenneServerPackage_CreateSessionResponse__Output>): grpc.ClientUnaryCall;
  createSession(argument: _odenneServerPackage_CreateSessionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_odenneServerPackage_CreateSessionResponse__Output>): grpc.ClientUnaryCall;
  createSession(argument: _odenneServerPackage_CreateSessionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_odenneServerPackage_CreateSessionResponse__Output>): grpc.ClientUnaryCall;
  createSession(argument: _odenneServerPackage_CreateSessionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_odenneServerPackage_CreateSessionResponse__Output>): grpc.ClientUnaryCall;
  createSession(argument: _odenneServerPackage_CreateSessionRequest, callback: grpc.requestCallback<_odenneServerPackage_CreateSessionResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface OdenneServerHandlers extends grpc.UntypedServiceImplementation {
  battle: grpc.handleUnaryCall<_odenneServerPackage_BattleRequest__Output, _odenneServerPackage_BattleResponse>;
  
  createSession: grpc.handleUnaryCall<_odenneServerPackage_CreateSessionRequest__Output, _odenneServerPackage_CreateSessionResponse>;
  
}

export interface OdenneServerDefinition extends grpc.ServiceDefinition {
  battle: MethodDefinition<_odenneServerPackage_BattleRequest, _odenneServerPackage_BattleResponse, _odenneServerPackage_BattleRequest__Output, _odenneServerPackage_BattleResponse__Output>
  createSession: MethodDefinition<_odenneServerPackage_CreateSessionRequest, _odenneServerPackage_CreateSessionResponse, _odenneServerPackage_CreateSessionRequest__Output, _odenneServerPackage_CreateSessionResponse__Output>
}
