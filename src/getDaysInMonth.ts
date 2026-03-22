/**
 * Get the number of days in a month
 *
 * @example
 * ```ts
 * getDaysInMonth(2024, 0)  // January 2024
 * // => 31
 *
 * getDaysInMonth(2024, 1)  // February 2024 (leap year)
 * // => 29
 *
 * getDaysInMonth(2023, 1)  // February 2023
 * // => 28
 *
 * getDaysInMonth(2024, 3)  // April 2024
 * // => 30
 * ```
 *
 * @since 6.0.0
 * @param year - The year
 * @param month - The month (0-11, where 0 is January)
 * @returns - Returns the number of days in the month
 */
function getDaysInMonth(year: number, month: number): number {
	// Create a date for the first day of the next month, then subtract one day
	return new Date(year, month + 1, 0).getDate()
}

export default getDaysInMonth
