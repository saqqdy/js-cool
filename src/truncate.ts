/**
 * Truncates string if it's longer than the given maximum string length.
 * The last characters of the truncated string are replaced with the omission string.
 *
 * @example
 * ```ts
 * truncate('hi-diddly-ho there, neighborino')
 * // => 'hi-diddly-ho there, neighbo...'
 *
 * truncate('hi-diddly-ho there, neighborino', { length: 24, separator: ' ' })
 * // => 'hi-diddly-ho there,...'
 *
 * truncate('hi-diddly-ho there, neighborino', { omission: ' [...]' })
 * // => 'hi-diddly-ho there, neig [...]'
 *
 * truncate('hi-diddly-ho there, neighborino', { length: 24, separator: /,? +/ })
 * // => 'hi-diddly-ho there...'
 * ```
 *
 * @since 5.24.0
 * @param str - The string to truncate
 * @param options - The options object
 * @returns - Returns the truncated string
 */
export interface TruncateOptions {
	/**
	 * The maximum string length (default: 30)
	 */
	length?: number
	/**
	 * The string to indicate text is omitted (default: '...')
	 */
	omission?: string
	/**
	 * The separator pattern to truncate to
	 */
	separator?: string | RegExp
}

function truncate(str: string, options: TruncateOptions = {}): string {
	if (typeof str !== 'string') {
		return ''
	}

	const { length = 30, omission = '...', separator } = options

	if (str.length <= length) {
		return str
	}

	let result = str.slice(0, length - omission.length)

	if (separator) {
		if (typeof separator === 'string') {
			const index = result.lastIndexOf(separator)
			if (index > 0) {
				result = result.slice(0, index)
			}
		} else {
			const match = result.match(separator)
			if (match && match.index !== undefined && match.index > 0) {
				result = result.slice(0, match.index)
			}
		}
	}

	return result + omission
}

export default truncate
