import shallowEqualArrays from "./arrays";
import shallowEqualObjects from "./objects";
declare type Comparable = Record<string, any> | any[] | null | undefined;
declare function shallowEqual<T extends Comparable>(a: T, b: T): boolean;
export { shallowEqual, shallowEqualObjects, shallowEqualArrays };
