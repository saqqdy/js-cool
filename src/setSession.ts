interface Data {
    value: any
    expires: number | string
}

/**
 * 写sessionStorage
 *
 * @param name - 名称
 * @param value - 设置要存储的值，可以是对象或字符串
 * @param seconds - 有效时间
 */
export function setSession(name: string, value: any, seconds: number): void {
    var e = new Date()
    var expires = seconds ? e.getTime() + seconds * 1000 : ''
    var obj = {} as Data
    obj.value = value
    obj.expires = expires
    sessionStorage.setItem(name, JSON.stringify(obj))
}

export default setSession
