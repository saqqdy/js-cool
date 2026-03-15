/**
 * Collection of common regular expressions
 *
 * @example
 * ```js
 * // Test email
 * pattern.email.test('test@example.com') // true
 *
 * // Test mobile (Chinese)
 * pattern.mobile.test('13800138000') // true
 *
 * // Test URL
 * pattern.url.test('https://example.com') // true
 *
 * // Test number
 * pattern.number.test('123.45') // true
 *
 * // Test Chinese characters
 * pattern.chinese.test('中') // true
 *
 * // Available patterns:
 * // pattern.any - matches any character
 * // pattern.number - matches numbers (including decimals and negatives)
 * // pattern.email - matches email addresses
 * // pattern.mobile - matches Chinese mobile numbers
 * // pattern.url - matches URLs
 * // pattern.chinese - matches Chinese characters
 * // pattern.idCard - matches Chinese ID cards
 * // pattern.qq - matches QQ numbers
 * // pattern.ip4 - matches IPv4 addresses
 * // pattern.mac - matches MAC addresses
 * ```
 * @deprecated It will be refactored and renamed patterns in the next major release.
 * @since 1.0.1
 * @returns - object containing regex patterns
 */
const pattern = {
	any: /[\w\W]+/,
	array: /^\[[\s\S]*\]$/,
	arrjson: /^\[\{[\s\S]*\}\]$/,
	chinese: /^[\u4E00-\u9FA5\uF900-\uFA2D]$/,
	email: /^([a-zA-Z0-9]+[_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
	float: /^\d+\.?\d{0,2}$/,
	ip4: /^(([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5]).){3}([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])$/,
	ip4_pri:
		/^1(((0|27)(.(([1-9]?|1\d)\d|2([0-4]\d|5[0-5])))|(72.(1[6-9]|2\d|3[01])|92.168))(.(([1-9]?|1\d)\d|2([0-4]\d|5[0-5]))){2})$/,
	isjson: /[\s\S]*(\{[\s\S]*\})[\s\S]*/,
	json: /^\{[\s\S]*\}$/,
	mac: /^((([a-f0-9]{2}:){5})|(([a-f0-9]{2}-){5}))[a-f0-9]{2}$/i,
	// mobile:/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[6|7|8]|18[0-9])\d{8}$/,
	// mobile:/^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/,
	mobile: /^1[3|4578]\d\d{8,8}$/,
	number: /^(-|\+)?(0|[1-9]\d*)(\.\d+)?$/,
	pass: /^(?![0-9\W_]+$)(?!\D+$)[\w\W]{6,16}$/,
	postcode: /^\d{6}$/,
	qq: /^[1-9]\d{5,13}$/,
	string: /^[\u4E00-\u9FA5\uF900-\uFA2D\w.\s]+$/,
	tel: /^(([0+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/,
	textarea: /[\u4E00-\u9FA5\w,./?;:'"[\]\-*()（）%$@\\!，《》。、？；：‘’“”…￥！]/,
	url: /^(\w+:\/\/)?\w+(\.\w+)+.*$/,
	username: /^[\w\-.]{3,15}$/,
}

export default pattern
