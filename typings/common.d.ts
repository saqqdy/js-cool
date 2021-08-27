export interface AnyObject {
    [prop: string]: any
}

export interface AnyFunction {
    (...args: any[]): any
}

export interface AnyElement extends Node {
    events?: any
    [prop: string]: any
}