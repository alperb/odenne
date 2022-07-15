import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { OdenneServerClient as _odenneServerPackage_OdenneServerClient, OdenneServerDefinition as _odenneServerPackage_OdenneServerDefinition } from './odenneServerPackage/OdenneServer';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  odenneServerPackage: {
    CreateSessionRequest: MessageTypeDefinition
    CreateSessionResponse: MessageTypeDefinition
    OdenneServer: SubtypeConstructor<typeof grpc.Client, _odenneServerPackage_OdenneServerClient> & { service: _odenneServerPackage_OdenneServerDefinition }
  }
}

