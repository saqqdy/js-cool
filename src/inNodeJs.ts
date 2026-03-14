/**
 * Determine if it is running on node.js
 *
 * @example
 * ```js
 * // Basic usage
 * if (inNodeJs) {
 *   console.log('Running in Node.js')
 *   const fs = require('fs')
 * }
 *
 * // Conditional logic
 * const env = inNodeJs ? 'server' : 'browser'
 *
 * // Safe file system access
 * if (inNodeJs) {
 *   const path = require('path')
 *   const filePath = path.join(__dirname, 'config.json')
 * }
 * ```
 * @since 5.13.0
 * @returns boolean - true if running in Node.js
 */
const inNodeJs = typeof global !== 'undefined'

export default inNodeJs
