/**
 * 读取完整IPv6
 *
 * @example
 * ```js
 * fillIPv6('2409:8005:800::2'); // '2409:8005:0800:0000:0000:0000:0000:0002'
 * fillIPv6('2409:8005:800::1c'); // '2409:8005:0800:0000:0000:0000:0000:001c'
 * ```
 * @returns string
 */
export function fillIPv6(ip: string): string {
    return ip
        .replace(/\w+/g, a => ('000' + a).substr(-4))
        .replace(/::/, () => {
            let dotLen = 8 - ip.match(/:/g)!.length,
                str = ':'
            while (dotLen--) {
                str += '0000:'
            }
            return str
        })
}

export default fillIPv6
