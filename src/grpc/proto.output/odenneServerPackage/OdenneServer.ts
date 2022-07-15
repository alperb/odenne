// Original file: src/grpc/proto/odenne-server.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateSessionRequest as _odenneServerPackage_CreateSessionRequest, CreateSessionRequest__Output as _odenneServerPackage_CreateSessionRequest__Output } from '../odenneServerPackage/CreateSessionRequest';
import type { CreateSessionResponse as _odenneServerPackage_CreateSessionResponse, CreateSessionResponse__Output as _odenneServerPackage_CreateSessionResponse__Output } from '../odenneServerPackage/CreateSessionResponse';

export interface OdenneServerClient extends grpc.Client {
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
  createSession: grpc.handleUnaryCall<_odenneServerPackage_CreateSessionRequest__Output, _odenneServerPackage_CreateSessionResponse>;
  
}

export interface OdenneServerDefinition extends grpc.ServiceDefinition {
  createSession: MethodDefinition<_odenneServerPackage_CreateSessionRequest, _odenneServerPackage_CreateSessionResponse, _odenneServerPackage_CreateSessionRequest__Output, _odenneServerPackage_CreateSessionResponse__Output>
}
