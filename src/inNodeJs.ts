/**
 * Determine if it is running on node.js
 *
 * @returns boolean
 */
const inNodeJs = typeof global !== 'undefined'

export default inNodeJs
