import { objectEntries, padStart } from './_compat'

/**
 * Format date to string
 *
 * @example
 * ```ts
 * formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
 * // => '2024-01-15 10:30:45'
 *
 * formatDate(new Date(), 'YYYY/MM/DD')
 * // => '2024/01/15'
 *
 * formatDate(new Date('2024-01-15'), 'YYYY年MM月DD日')
 * // => '2024年01月15日'
 * ```
 *
 * @since 6.0.0
 * @param date - The date to format
 * @param format - The format string (default: 'YYYY-MM-DD HH:mm:ss')
 * @returns - Returns the formatted date string
 */
function formatDate(date: Date | string | number, format = 'YYYY-MM-DD HH:mm:ss'): string {
	const d = new Date(date)

	// IE11-compatible NaN check
	if (d.getTime() !== d.getTime()) {
		return ''
	}

	const tokens: Record<string, () => string> = {
		A: () => (d.getHours() >= 12 ? 'PM' : 'AM'),
		a: () => (d.getHours() >= 12 ? 'pm' : 'am'),
		D: () => String(d.getDate()),
		DD: () => padStart(String(d.getDate()), 2, '0'),
		H: () => String(d.getHours()),
		h: () => String(d.getHours() % 12 || 12),
		HH: () => padStart(String(d.getHours()), 2, '0'),
		hh: () => padStart(String(d.getHours() % 12 || 12), 2, '0'),
		M: () => String(d.getMonth() + 1),
		m: () => String(d.getMinutes()),
		MM: () => padStart(String(d.getMonth() + 1), 2, '0'),
		mm: () => padStart(String(d.getMinutes()), 2, '0'),
		s: () => String(d.getSeconds()),
		ss: () => padStart(String(d.getSeconds()), 2, '0'),
		SSS: () => padStart(String(d.getMilliseconds()), 3, '0'),
		YY: () => String(d.getFullYear()).slice(-2),
		YYYY: () => String(d.getFullYear()),
	}

	// Process format string - match all tokens at once to avoid partial replacements
	// Sort tokens by length descending to match longer tokens first
	const sortedTokens = objectEntries(tokens)
		.sort((a, b) => b[0].length - a[0].length)
		.map(([key]) => key)
	const tokenRegex = new RegExp(sortedTokens.join('|'), 'g')

	return format.replace(tokenRegex, match => tokens[match]?.() ?? match)
}

export default formatDate
