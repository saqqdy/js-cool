/**
 * Date module type definitions
 *
 * @module date
 * @since 6.0.0
 */

/**
 * Date input type - accepts Date, string, or number (timestamp)
 */
export type DateInput = Date | string | number

/**
 * Date unit for operations
 */
export type DateUnit =
	| 'year'
	| 'month'
	| 'week'
	| 'day'
	| 'hour'
	| 'minute'
	| 'second'
	| 'millisecond'

/**
 * Format token type
 */
export type FormatToken =
	| 'YYYY'
	| 'YY'
	| 'MM'
	| 'M'
	| 'DD'
	| 'D'
	| 'HH'
	| 'H'
	| 'hh'
	| 'h'
	| 'mm'
	| 'm'
	| 'ss'
	| 's'
	| 'SSS'
	| 'A'
	| 'a'

/**
 * Supported locales for relative time
 */
export type RelativeTimeLocale = 'en' | 'zh' | 'ja' | 'ko' | 'de' | 'fr' | 'es'

/**
 * Date difference result
 */
export interface DateDiffResult {
	/** Whole days in the difference */
	days: number
	/** Remaining hours (0-23) */
	hours: number
	/** Remaining minutes (0-59) */
	minutes: number
	/** Remaining seconds (0-59) */
	seconds: number
	/** Remaining milliseconds (0-999) */
	milliseconds: number
	/** Total difference values */
	total: {
		/** Total difference in days */
		days: number
		/** Total difference in hours */
		hours: number
		/** Total difference in minutes */
		minutes: number
		/** Total difference in seconds */
		seconds: number
		/** Total difference in milliseconds */
		milliseconds: number
	}
}

/**
 * Date parser interface
 */
export interface IDateParser {
	/** Get the underlying Date object */
	readonly date: Date
	/** Check if the date is valid */
	readonly isValid: boolean
	/** Get the timestamp in milliseconds */
	readonly timestamp: number
	/** Get year */
	readonly year: number
	/** Get month (1-12) */
	readonly month: number
	/** Get day of month (1-31) */
	readonly day: number
	/** Get day of week (0-6, 0 is Sunday) */
	readonly dayOfWeek: number
	/** Get hours (0-23) */
	readonly hours: number
	/** Get minutes (0-59) */
	readonly minutes: number
	/** Get seconds (0-59) */
	readonly seconds: number
	/** Get milliseconds (0-999) */
	readonly milliseconds: number

	// Formatting
	/** Format date to string with pattern */
	format: (pattern?: string) => string
	/** Convert to ISO string */
	toISOString: () => string
	/** Convert to date string (YYYY-MM-DD) */
	toDateString: () => string
	/** Convert to time string (HH:mm:ss) */
	toTimeString: () => string

	// Comparison
	/** Check if before another date */
	isBefore: (date: DateInput) => boolean
	/** Check if after another date */
	isAfter: (date: DateInput) => boolean
	/** Check if same as another date (optionally by unit) */
	isSame: (date: DateInput, unit?: DateUnit) => boolean
	/** Check if today */
	isToday: () => boolean
	/** Check if yesterday */
	isYesterday: () => boolean
	/** Check if tomorrow */
	isTomorrow: () => boolean
	/** Check if weekend */
	isWeekend: () => boolean
	/** Check if weekday */
	isWeekday: () => boolean
	/** Check if leap year */
	isLeapYear: () => boolean

	// Manipulation (returns new instance)
	/** Add time value */
	add: (value: number, unit: DateUnit) => IDateParser
	/** Subtract time value */
	subtract: (value: number, unit: DateUnit) => IDateParser
	/** Get start of time period */
	startOf: (unit: DateUnit) => IDateParser
	/** Get end of time period */
	endOf: (unit: DateUnit) => IDateParser

	// Difference
	/** Calculate difference from another date */
	diff: (date: DateInput) => DateDiffResult

	// Relative time
	/** Get relative time string */
	relativeTime: (now?: DateInput, locale?: RelativeTimeLocale) => string

	// Getters
	/** Get value by unit */
	get: (unit: DateUnit) => number
	/** Get days in current month */
	getDaysInMonth: () => number
	/** Get quarter (1-4) */
	getQuarter: () => number
	/** Get week of year */
	getWeekOfYear: () => number
	/** Get day of year */
	getDayOfYear: () => number
}

/**
 * Date API interface for namespace-style usage
 */
export interface DateAPI {
	/** Create a new DateParser instance */
	(): IDateParser
	/** Create DateParser for now */
	now: () => IDateParser
	/** Parse date input */
	parse: (input?: DateInput) => IDateParser
	/** Format date to string */
	format: (date: DateInput, pattern?: string) => string
	/** Calculate difference between two dates */
	diff: (date1: DateInput, date2: DateInput) => DateDiffResult
	/** Get relative time string */
	relativeTime: (date: DateInput, now?: DateInput, locale?: RelativeTimeLocale) => string
	/** Check if date is today */
	isToday: (date: DateInput) => boolean
	/** Check if date is yesterday */
	isYesterday: (date: DateInput) => boolean
	/** Check if date is tomorrow */
	isTomorrow: (date: DateInput) => boolean
	/** Check if date is weekend */
	isWeekend: (date: DateInput) => boolean
	/** Check if year is leap year */
	isLeapYear: (year: number) => boolean
	/** Get days in month */
	getDaysInMonth: (year: number, month: number) => number
	/** Get quarter of date */
	getQuarter: (date: DateInput) => number
	/** Get week of year */
	getWeekOfYear: (date: DateInput) => number
	/** Get day of year */
	getDayOfYear: (date: DateInput) => number
	/** Compare two dates */
	compare: (date1: DateInput, date2: DateInput) => -1 | 0 | 1
	/** Get minimum date */
	min: (...dates: DateInput[]) => IDateParser
	/** Get maximum date */
	max: (...dates: DateInput[]) => IDateParser
}
