/**
 * Determine if it is running on the browser side
 *
 * @example
 * ```js
 * // Basic usage
 * if (inBrowser) {
 *   console.log('Running in browser')
 *   document.getElementById('app')
 * }
 *
 * // Conditional import
 * if (inBrowser) {
 *   import('./browser-only-module')
 * }
 *
 * // Safe DOM access
 * const element = inBrowser ? document.querySelector('#app') : null
 * ```
 * @since 4.5.0
 * @returns boolean - true if running in browser
 */
const inBrowser = typeof window !== 'undefined'

export default inBrowser
