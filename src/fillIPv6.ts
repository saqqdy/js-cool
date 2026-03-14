/**
 * Read full IPv6 - expand compressed IPv6 notation to full form
 *
 * @example
 * ```js
 * // Basic usage
 * fillIPv6('2409:8005:800::2')
 * // '2409:8005:0800:0000:0000:0000:0000:0002'
 *
 * // With hex digits
 * fillIPv6('2409:8005:800::1c')
 * // '2409:8005:0800:0000:0000:0000:0000:001c'
 *
 * // Loopback address
 * fillIPv6('::1')
 * // '0000:0000:0000:0000:0000:0000:0000:0001'
 *
 * // All zeros
 * fillIPv6('::')
 * // '0000:0000:0000:0000:0000:0000:0000:0000'
 * ```
 * @since 2.2.2
 * @param ip - IPv6 address string
 * @returns - full IPv6 string with all groups expanded
 */
function fillIPv6(ip: string): string {
	return ip
		.replace(/\w+/g, a => ('000' + a).substr(-4))
		.replace(/(\w*)::(\w*)/, (a, b, c) => {
			let dotLen = 8 - ip.match(/:/g)!.length,
				str = ':'
			while (dotLen--) {
				str += '0000:'
			}
			return (b || '0000') + str + (c || '0000')
		})
}

export default fillIPv6
