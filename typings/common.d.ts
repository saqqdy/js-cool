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
