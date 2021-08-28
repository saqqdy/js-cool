export interface AnyObject {
    [prop: string]: any
}

export interface AnyFunction extends AnyObject {
    (...args: any[]): any
}
