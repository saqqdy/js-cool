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
 * @since 5.24.0
 * @param date - The date to format
 * @param format - The format string (default: 'YYYY-MM-DD HH:mm:ss')
 * @returns - Returns the formatted date string
 */
function formatDate(date: Date | string | number, format = 'YYYY-MM-DD HH:mm:ss'): string {
	const d = new Date(date)

	if (Number.isNaN(d.getTime())) {
		return ''
	}

	const tokens: Record<string, () => string> = {
		A: () => (d.getHours() >= 12 ? 'PM' : 'AM'),
		a: () => (d.getHours() >= 12 ? 'pm' : 'am'),
		D: () => String(d.getDate()),
		DD: () => String(d.getDate()).padStart(2, '0'),
		H: () => String(d.getHours()),
		h: () => String(d.getHours() % 12 || 12),
		HH: () => String(d.getHours()).padStart(2, '0'),
		hh: () => String(d.getHours() % 12 || 12).padStart(2, '0'),
		M: () => String(d.getMonth() + 1),
		m: () => String(d.getMinutes()),
		MM: () => String(d.getMonth() + 1).padStart(2, '0'),
		mm: () => String(d.getMinutes()).padStart(2, '0'),
		s: () => String(d.getSeconds()),
		ss: () => String(d.getSeconds()).padStart(2, '0'),
		SSS: () => String(d.getMilliseconds()).padStart(3, '0'),
		YY: () => String(d.getFullYear()).slice(-2),
		YYYY: () => String(d.getFullYear())
	}

	// Process format string - match all tokens at once to avoid partial replacements
	// Sort tokens by length descending to match longer tokens first
	const sortedTokens = Object.keys(tokens).sort((a, b) => b.length - a.length)
	const tokenRegex = new RegExp(sortedTokens.join('|'), 'g')

	return format.replace(tokenRegex, match => tokens[match]?.() ?? match)
}

export default formatDate
