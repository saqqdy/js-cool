export type AnyObject = Record<string, any>

export interface AnyFunction extends AnyObject {
	(...args: any[]): any
}

export interface ArrayOne<T> {
	0: T
}

export type ArrayOneMore<T> = ArrayOne<T> & Array<T>

export type ArrayTwoMore<T> = {
	0: T
	1: T
} & Array<T>

export type PickRequired<T, K extends keyof T> = {
	[P in K]-?: T[P]
} & Omit<T, K>

export type OmitRequired<T, K extends keyof T> = {
	[P in K]: T[P]
} & Omit<Required<T>, K>

export type PickPartial<T, K extends keyof T> = {
	[P in K]?: T[P]
} & Omit<T, K>

export type OmitPartial<T, K extends keyof T> = {
	[P in K]: T[P]
} & Omit<Partial<T>, K>

export type MaybePromiseOrGetter<T> = Promise<T> | (<T>() => Promise<T>)
