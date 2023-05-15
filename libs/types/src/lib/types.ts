/** @description Recursively makes all properties of an object optional */
export type DeepPartial<T> = T extends Array<infer ArrayType>
  ? Array<DeepPartial<ArrayType>>
  : T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

/** @description Recursively makes all properties of an object required */
export type DeepRequired<T> = T extends Array<infer ArrayType>
  ? Array<DeepRequired<ArrayType>>
  : T extends object
  ? { [P in keyof T]-?: DeepRequired<T[P]> }
  : T;

/** @description Recursively removes a property from an object */
export type DeepOmit<T, K extends PropertyKey> = T extends Array<
  infer ArrayType
>
  ? Array<DeepOmit<ArrayType, K>>
  : T extends object
  ? { [P in keyof Omit<T, K>]: DeepOmit<T[P], K> }
  : T;

/** @description Recursively makes all properties of an object readonly */
export type DeepReadonly<T> = T extends Array<infer ArrayType>
  ? Array<DeepReadonly<ArrayType>>
  : T extends object
  ? { [P in keyof T]: Readonly<T[P]> }
  : T;
