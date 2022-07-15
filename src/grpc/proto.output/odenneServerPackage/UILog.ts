// Original file: src/grpc/proto/odenne.proto

import type { StringArray as _odenneServerPackage_StringArray, StringArray__Output as _odenneServerPackage_StringArray__Output } from '../odenneServerPackage/StringArray';
import type { int32Array as _odenneServerPackage_int32Array, int32Array__Output as _odenneServerPackage_int32Array__Output } from '../odenneServerPackage/int32Array';

export interface UILog {
  'log'?: (string);
  'players'?: (_odenneServerPackage_StringArray)[];
  'healths'?: (_odenneServerPackage_int32Array)[];
  'turn'?: (number);
  'shields'?: (_odenneServerPackage_int32Array)[];
  'critics'?: (_odenneServerPackage_int32Array)[];
  'attacks'?: (_odenneServerPackage_int32Array)[];
  'penetrations'?: (_odenneServerPackage_int32Array)[];
  'accuracies'?: (_odenneServerPackage_int32Array)[];
}

export interface UILog__Output {
  'log'?: (string);
  'players'?: (_odenneServerPackage_StringArray__Output)[];
  'healths'?: (_odenneServerPackage_int32Array__Output)[];
  'turn'?: (number);
  'shields'?: (_odenneServerPackage_int32Array__Output)[];
  'critics'?: (_odenneServerPackage_int32Array__Output)[];
  'attacks'?: (_odenneServerPackage_int32Array__Output)[];
  'penetrations'?: (_odenneServerPackage_int32Array__Output)[];
  'accuracies'?: (_odenneServerPackage_int32Array__Output)[];
}
