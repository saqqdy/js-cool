/**
 * Check if date is today
 *
 * @example
 * ```ts
 * isToday(new Date())
 * // => true
 *
 * isToday(new Date('2020-01-01'))
 * // => false (if today is not 2020-01-01)
 * ```
 *
 * @since 5.24.0
 * @param date - The date to check
 * @returns - Returns true if date is today
 */
function isToday(date: Date | string | number): boolean {
	const d = new Date(date)
	const today = new Date()

	return (
		d.getFullYear() === today.getFullYear() &&
		d.getMonth() === today.getMonth() &&
		d.getDate() === today.getDate()
	)
}

export default isToday
