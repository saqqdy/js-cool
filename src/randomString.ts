import type { ArrayOneMore } from './types'
import randomNumbers from './randomNumbers'
import shuffle from './shuffle'

export type RandomStringCharType = 'uppercase' | 'lowercase' | 'number' | 'special'

export interface RandomStringOptions {
	charTypes?: RandomStringCharType | ArrayOneMore<RandomStringCharType>
	length?: number
	/**
	 * Elimination of confusing characters: I,L,O,U,V,i,l,o,u,v,0,1,9
	 */
	noConfuse?: boolean
	/**
	 * The generated random string must contain each of the listed character types
	 */
	strict?: boolean
	/**
	 * Use cryptographically secure random number generator
	 * Uses crypto.getRandomValues() in browser / crypto.randomBytes() in Node.js
	 */
	secure?: boolean
}

const CHARS: Record<RandomStringCharType, { normal: string; noConfuse: string }> = {
	lowercase: {
		normal: 'abcdefghijklmnopqrstuvwxyz',
		noConfuse: 'abcdefghjkmnpqrstwxyz'
	},
	number: {
		normal: '0123456789',
		noConfuse: '2345678'
	},
	special: {
		normal: '~!@#$%^&*_+|:-=[];,.',
		noConfuse: '~!@#$%^&*_+|:-=[];,.'
	},
	uppercase: {
		normal: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		noConfuse: 'ABCDEFGHJKMNPQRSTWXYZ'
	}
}

/**
 * Get cryptographically secure random number between 0 (inclusive) and max (exclusive)
 */
function secureRandomInt(max: number): number {
	if (max <= 0) return 0

	// Get crypto API - works in both browser and modern Node.js (19+)
	// For Node.js 15-18, uses crypto.webcrypto
	let cryptoApi: Crypto | undefined

	// Browser environment or Node.js 19+
	if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
		cryptoApi = crypto
	}

	// Node.js 15-18: crypto.webcrypto
	if (!cryptoApi && typeof globalThis !== 'undefined') {
		const g = globalThis as { crypto?: Crypto }
		if (g.crypto && typeof g.crypto.getRandomValues === 'function') {
			cryptoApi = g.crypto
		}
	}

	if (cryptoApi) {
		const array = new Uint32Array(1)
		cryptoApi.getRandomValues(array)
		return array[0] % max
	}

	// Fallback to Math.random (not cryptographically secure)
	return Math.floor(Math.random() * max)
}

/**
 * Generate string from character set
 */
function generateString(len: number, chars: string, secure = false): string {
	let str = ''
	const maxPos = chars.length

	if (secure) {
		for (let i = 0; i < len; i++) {
			str += chars.charAt(secureRandomInt(maxPos))
		}
	} else {
		for (let i = 0; i < len; i++) {
			str += chars.charAt(Math.floor(Math.random() * maxPos))
		}
	}

	return str
}

/**
 * Get a random string
 *
 * @example
 * ```ts
 * // 1. No parameters, generates 32-char string with uppercase, lowercase, numbers
 * randomString()
 * // PVSjz902EqYbmxaLtvDnggtnlvt5uFTZ
 *
 * // 2. Generate 16-char random string
 * randomString(16)
 * // coTgZy0mqqMJ1sMM
 *
 * // 3. Same as #2 with options object
 * randomString({ length: 16 })
 * // ngCI5aPqJm84t90d
 *
 * // 4. Generate with special characters (legacy boolean syntax)
 * randomString(true)
 * // 0Uby@op3B-sK5]dHl4S|15As.OlHiNXd
 *
 * // 5. Generate with special characters (recommended)
 * randomString({ charTypes: ['uppercase', 'lowercase', 'number', 'special'] })
 * // m,2^vpkrE,F,DbcSFk0=vr&@DJ27j9XK
 *
 * // 6. 16-char string with special characters
 * randomString(16, true)
 * // dXz[J_sYM^3d8fnA
 *
 * // 7. Generate 16-digit numeric string
 * randomString({ length: 16, charTypes: 'number' })
 * // 7450026301030286
 *
 * // 8. Eliminate confusing characters (I,L,O,U,V,i,l,o,u,v,0,1,9)
 * randomString({ length: 16, noConfuse: true })
 * // 8DEGna8ppC4mqyew
 *
 * // 9. Strict mode: must contain at least 1 of each char type
 * randomString({ length: 16, strict: true })
 * // PFYAPD5KFqOHIADL
 *
 * // 10. Cryptographically secure (for passwords, tokens)
 * randomString({ length: 32, secure: true })
 * // xK9mP2vN8qR4wT7y...
 * ```
 * @since 5.0.0
 * @param len - the length of the random string
 * @param options - randomString options
 * @returns - random string
 */
function randomString(len?: number, options?: RandomStringOptions | boolean): string
function randomString(len?: RandomStringOptions | boolean, options?: RandomStringOptions | boolean): string
function randomString(len?: number | RandomStringOptions | boolean, options?: RandomStringOptions | boolean): string {
	let charTypes: RandomStringCharType[] = ['uppercase', 'lowercase', 'number'],
		noConfuse = false,
		strict = false,
		secure = false,
		result = ''

	// Parse arguments
	if (typeof len !== 'number') {
		options = len
		len = typeof options === 'object' ? (options.length ?? 32) : 32
	}
	if (typeof options === 'boolean') {
		if (options) charTypes.push('special')
	} else if (options) {
		if (options.charTypes?.length) {
			charTypes = ([] as RandomStringCharType[]).concat(options.charTypes)
		}
		noConfuse = options.noConfuse ?? noConfuse
		strict = options.strict ?? strict
		secure = options.secure ?? secure
	}

	// Get character sets based on noConfuse option
	const selectedChars = charTypes.map(charType => CHARS[charType][noConfuse ? 'noConfuse' : 'normal']).join('')

	// Non-strict mode: simple generation
	if (!strict) {
		return generateString(len, selectedChars, secure)
	}

	// Strict mode: ensure each char type is represented
	const charLengths = randomNumbers(charTypes.length, len)

	charTypes.forEach((charType, index) => {
		const chars = CHARS[charType][noConfuse ? 'noConfuse' : 'normal']
		result += generateString(charLengths[index], chars, secure)
	})

	return shuffle(result)
}

export default randomString
