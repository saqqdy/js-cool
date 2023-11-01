/**
 * Determine if it is running on node.js
 *
 * @since 5.13.0
 * @returns boolean
 */
const inNodeJs = typeof global !== 'undefined'

export default inNodeJs
