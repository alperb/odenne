// Original file: src/grpc/proto/odenne-server.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { BattleRequest as _odenneServerPackage_BattleRequest, BattleRequest__Output as _odenneServerPackage_BattleRequest__Output } from '../odenneServerPackage/BattleRequest';
import type { BattleResponse as _odenneServerPackage_BattleResponse, BattleResponse__Output as _odenneServerPackage_BattleResponse__Output } from '../odenneServerPackage/BattleResponse';

export interface OdenneServerClient extends grpc.Client {
  battle(argument: _odenneServerPackage_BattleRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_odenneServerPackage_BattleResponse__Output>): grpc.ClientUnaryCall;
  battle(argument: _odenneServerPackage_BattleRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_odenneServerPackage_BattleResponse__Output>): grpc.ClientUnaryCall;
  battle(argument: _odenneServerPackage_BattleRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_odenneServerPackage_BattleResponse__Output>): grpc.ClientUnaryCall;
  battle(argument: _odenneServerPackage_BattleRequest, callback: grpc.requestCallback<_odenneServerPackage_BattleResponse__Output>): grpc.ClientUnaryCall;
  battle(argument: _odenneServerPackage_BattleRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_odenneServerPackage_BattleResponse__Output>): grpc.ClientUnaryCall;
  battle(argument: _odenneServerPackage_BattleRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_odenneServerPackage_BattleResponse__Output>): grpc.ClientUnaryCall;
  battle(argument: _odenneServerPackage_BattleRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_odenneServerPackage_BattleResponse__Output>): grpc.ClientUnaryCall;
  battle(argument: _odenneServerPackage_BattleRequest, callback: grpc.requestCallback<_odenneServerPackage_BattleResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface OdenneServerHandlers extends grpc.UntypedServiceImplementation {
  battle: grpc.handleUnaryCall<_odenneServerPackage_BattleRequest__Output, _odenneServerPackage_BattleResponse>;
  
}

export interface OdenneServerDefinition extends grpc.ServiceDefinition {
  battle: MethodDefinition<_odenneServerPackage_BattleRequest, _odenneServerPackage_BattleResponse, _odenneServerPackage_BattleRequest__Output, _odenneServerPackage_BattleResponse__Output>
}
