/**
 * Validation regex patterns for common formats
 *
 * @module patterns/validation
 * @since 6.0.0
 */

/**
 * Validation patterns for common string formats
 */
export const validation = {
	/**
	 * Matches any non-empty string
	 * @example
	 * validation.any.test('hello') // true
	 * validation.any.test('') // false
	 */
	any: /[\w\W]+/,

	/**
	 * Matches JSON array string format
	 * @example
	 * validation.array.test('[1, 2, 3]') // true
	 * validation.array.test('\{\}') // false
	 */
	array: /^\[[\s\S]*\]$/,

	/**
	 * Matches JSON array containing objects
	 * @example
	 * validation.arrjson.test('[\{"key":"value"\}]') // true
	 * validation.arrjson.test('\{\}') // false
	 */
	arrjson: /^\[\{[\s\S]*\}\]$/,

	/**
	 * Matches a single Chinese character
	 * @example
	 * validation.chinese.test('中') // true
	 * validation.chinese.test('a') // false
	 */
	chinese: /^[\u4E00-\u9FA5\uF900-\uFA2D]$/,

	/**
	 * Matches email addresses
	 * @example
	 * validation.email.test('user\@example.com') // true
	 * validation.email.test('invalid') // false
	 */
	email: /^([a-zA-Z0-9]+[_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/,

	/**
	 * Matches decimal numbers with up to 2 decimal places
	 * @example
	 * validation.float.test('123.45') // true
	 * validation.float.test('123.456') // false
	 */
	float: /^\d+\.?\d{0,2}$/,

	/**
	 * Matches hexadecimal color codes
	 * @example
	 * validation.hexColor.test('#fff') // true
	 * validation.hexColor.test('#ffffff') // true
	 * validation.hexColor.test('red') // false
	 */
	hexColor: /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,

	/**
	 * Matches IPv4 addresses
	 * @example
	 * validation.ipv4.test('192.168.1.1') // true
	 * validation.ipv4.test('256.1.1.1') // false
	 */
	ipv4: /^(([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])$/,

	/**
	 * Matches private IPv4 addresses (10.x.x.x, 172.16-31.x.x, 192.168.x.x)
	 * @example
	 * validation.ipv4Private.test('192.168.1.1') // true
	 * validation.ipv4Private.test('10.0.0.1') // true
	 * validation.ipv4Private.test('8.8.8.8') // false
	 */
	ipv4Private:
		/^1(((0|27)(.(([1-9]?|1\d)\d|2([0-4]\d|5[0-5])))|(72.(1[6-9]|2\d|3[01])|92.168))(.(([1-9]?|1\d)\d|2([0-4]\d|5[0-5]))){2})$/,

	/**
	 * Matches JSON-like string (contains JSON object)
	 * @example
	 * validation.jsonLike.test('text \{"key":"value"\} text') // true
	 */
	jsonLike: /[\s\S]*(\{[\s\S]*\})[\s\S]*/,

	/**
	 * Matches JSON object string
	 * @example
	 * validation.json.test('\{"key":"value"\}') // true
	 * validation.json.test('not json') // false
	 */
	json: /^\{[\s\S]*\}$/,

	/**
	 * Matches MAC addresses (colon or hyphen separated)
	 * @example
	 * validation.mac.test('00:1A:2B:3C:4D:5E') // true
	 * validation.mac.test('00-1A-2B-3C-4D-5E') // true
	 * validation.mac.test('invalid') // false
	 */
	mac: /^((([a-f0-9]{2}:){5})|(([a-f0-9]{2}-){5}))[a-f0-9]{2}$/i,

	/**
	 * Matches Chinese mobile phone numbers (starts with 1, second digit 3-9)
	 * @example
	 * validation.mobile.test('13812345678') // true
	 * validation.mobile.test('12812345678') // false (second digit must be 3-9)
	 */
	mobile: /^1[3-9]\d{9}$/,

	/**
	 * Matches numbers (integers, decimals, with optional sign)
	 * @example
	 * validation.number.test('123') // true
	 * validation.number.test('-123.45') // true
	 * validation.number.test('abc') // false
	 */
	number: /^(-|\+)?(0|[1-9]\d*)(\.\d+)?$/,

	/**
	 * Matches password (6-16 chars, must contain letter and number)
	 * @example
	 * validation.password.test('abc123') // true
	 * validation.password.test('abcdef') // false (no number)
	 */
	password: /^(?![0-9\W_]+$)(?!\D+$)[\w\W]{6,16}$/,

	/**
	 * Matches Chinese postal codes (6 digits)
	 * @example
	 * validation.postcode.test('100000') // true
	 * validation.postcode.test('12345') // false
	 */
	postcode: /^\d{6}$/,

	/**
	 * Matches QQ numbers (5-14 digits, cannot start with 0)
	 * @example
	 * validation.qq.test('12345678') // true
	 * validation.qq.test('1234') // false (too short)
	 */
	qq: /^[1-9]\d{4,13}$/,

	/**
	 * Matches string with Chinese, letters, numbers, and basic punctuation
	 * @example
	 * validation.string.test('hello 世界') // true
	 */
	string: /^[\u4E00-\u9FA5\uF900-\uFA2D\w.\s]+$/,

	/**
	 * Matches Chinese telephone numbers (with optional area code)
	 * @example
	 * validation.tel.test('010-12345678') // true
	 * validation.tel.test('12345678') // true
	 */
	tel: /^(([0+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/,

	/**
	 * Matches textarea content (Chinese, letters, numbers, common punctuation)
	 */
	textarea: /[\u4E00-\u9FA5\w,./?;:'"[\]\-*()（）%$@\\!，《》。、？；：‘…￥！]/,

	/**
	 * Matches URLs
	 * @example
	 * validation.url.test('https://example.com') // true
	 * validation.url.test('example.com') // true
	 */
	url: /^(\w+:\/\/)?\w+(\.\w+)+.*$/,

	/**
	 * Matches username (3-15 chars, alphanumeric, underscore, hyphen, dot)
	 * @example
	 * validation.username.test('user_name') // true
	 * validation.username.test('ab') // false (too short)
	 */
	username: /^[\w\-.]{3,15}$/,

	/**
	 * Matches Chinese ID card numbers (15 or 18 digits)
	 * @example
	 * validation.idCard.test('11010519491231002X') // true
	 * validation.idCard.test('123456789012345') // true
	 */
	idCard: /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$|^[1-9]\d{5}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}$/,
} as const

export type ValidationPatternName = keyof typeof validation
