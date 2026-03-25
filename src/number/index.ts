/**
 * Number utilities collection
 *
 * @example
 * ```ts
 * import { clamp, round, random, sum, average } from 'js-cool/number'
 *
 * // Clamp value to range
 * clamp(150, 0, 100) // 100
 *
 * // Round to decimal places
 * round(3.14159, 2) // 3.14
 *
 * // Random number in range
 * randomNumber(1, 100) // 42
 *
 * // Sum array
 * sum([1, 2, 3, 4, 5]) // 15
 *
 * // Average array
 * average([1, 2, 3, 4, 5]) // 3
 * ```
 *
 * @module number
 * @since 6.0.0
 */

export { default as average } from '../average'
export { default as clamp } from '../clamp'
export { default as fixNumber } from '../fixNumber'
export { default as getNumber } from '../getNumber'
export { default as inRange } from '../inRange'
export { default as randomNumber } from '../randomNumber'
export { default as randomNumbers } from '../randomNumbers'
export { default as round } from '../round'
export { default as sum } from '../sum'
export { default as toThousands } from '../toThousands'
