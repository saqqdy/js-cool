export type AnyObject = Record<string, any>

export interface AnyFunction extends AnyObject {
	(...args: any[]): any
}

export type ArrayOneMore<T> = {
	0: T
} & Array<T>
