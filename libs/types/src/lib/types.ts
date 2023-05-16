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

/** @description Makes specific fields required */
export type RequireFields<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

/** @description Changes specific fields types*/
export type ReType<T, K extends keyof T, R> = Omit<T, K> & {
  [P in K]: R;
};

/** @description Creates a tuple out of a given union */
export type TupleUnion<U extends string, R extends string[] = []> = {
  [S in U]: Exclude<U, S> extends never
    ? [...R, S]
    : TupleUnion<Exclude<U, S>, [...R, S]>;
}[U] &
  string[];
