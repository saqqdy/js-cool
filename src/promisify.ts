// export namespace promisify {
// 	/**
// 	 * This symbol can be placed on the function to be promisified to
// 	 * provide names as an array of strings for the values in a success
// 	 * callback.
// 	 */
// 	const argumentNames: symbol

// 	/**
// 	 * The user can supply their own Promise implementation by setting it
// 	 * here. Otherwise, the global Promise object will be used.
// 	 */
// 	let Promise: PromiseConstructor
// }

import type { MaybePromiseOrGetter } from './types'

export interface PromisifyFunction extends Function {
	__PROMISIFY_CUSTOM_ARGUMENTS__?: string
}

// export interface PromisifyObject<T> extends Object {
// 	then: <TResult1 = T, TResult2 = never>(
// 		onFulfilled?: (value: T) => TResult1 | PromiseLike<TResult1>,
// 		onRejected?: (reason: any) => TResult2 | PromiseLike<TResult2>
// 	) => PromiseLike<TResult1 | TResult2>
// }

// Symbols is a better way to do this, but not all browsers have good support,
// so instead we'll just make do with a very unlikely string.
const customArgumentsToken = '__PROMISIFY_CUSTOM_ARGUMENTS__'

/**
 * return the next version, Only version types with no more than 3 digits are supported
 *
 * @example
 * ```js
 * promisify('1.0.0') // 1.0.1
 * ```
 * @param original - original object
 * @param type - optional, version type
 * @returns - new version
 */
// function promisify<T extends PromisifyFunction>(original: T): () => Promise<T>
// function promisify<T extends object>(original: T, resolver: () => Promise<any>): T & PromiseLike<T>
function promisify<T extends object | PromisifyFunction>(
	original: Function,
	resolver?: () => Promise<any>
) {
	console.log(1001, typeof original)
	// If the user has asked us to decode argument names for them, honour that
	const argumentNames = (original as PromisifyFunction)[customArgumentsToken]

	// If the user has supplied a custom Promise implementation, use it.
	// Otherwise fall back to whatever we can find on the global object.
	const PromiseFunc = promisify.Promise || Promise

	// If we can find no Promise implemention, then fail now.
	if (typeof PromiseFunc !== 'function') {
		throw new TypeError('No Promise implementation found; do you need a polyfill?')
	}

	if (typeof original === 'function') {
		return function (...args: Parameters<typeof original>) {
			return new PromiseFunc((resolve, reject) => {
				// Append the callback bound to the context
				args.push(function callback(err: unknown, ...values: unknown[]) {
					if (err) {
						return reject(err)
					}

					if (values.length === 1 || !argumentNames) {
						return resolve(values[0])
					}

					const o: Record<string, unknown> = {}
					values.forEach((value, index) => {
						const name = argumentNames[index]
						if (name) {
							o[name] = value
						}
					})

					resolve(o)
				})

				// Call the function.
				console.log(1000, this)
				// @ts-expect-error: ignore this type
				original.apply(this, args)
			})
		}
	} else if (!resolver) {
		throw new TypeError('When original is an object, the resolver must be passed in.')
	}

	// Object.defineProperty(original, 'then', {
	// 	value: <TResult1 = T, TResult2 = never>(
	// 		onFulfilled?: (value: T) => TResult1 | PromiseLike<TResult1>,
	// 		onRejected?: (reason: any) => TResult2 | PromiseLike<TResult2>
	// 	): PromiseLike<TResult1 | TResult2> => {
	// 		// if (!resolver) return Promise.resolve().then(onFulfilled, onRejected)
	// 		return resolver().then(onFulfilled, onRejected)
	// 	},
	// 	writable: false
	// })

	// original.then = function <TResult1 = T, TResult2 = never>(
	// 	onFulfilled?: (value: T) => TResult1 | PromiseLike<TResult1>,
	// 	onRejected?: (reason: any) => TResult2 | PromiseLike<TResult2>
	// ): PromiseLike<TResult1 | TResult2> {
	// 	// if (!resolver) return Promise.resolve().then(onFulfilled, onRejected)
	// 	return resolver().then(onFulfilled, onRejected)
	// }

	// console.log(102, original.then)
	// return original

	// return function (...args: unknown[]) {
	// 	return {
	// 		...original,
	// 		then(onFulfilled, onRejected) {
	// 			// if (!resolver) return new PromiseFunc(() => onFulfilled).then(onFulfilled, onRejected)
	// 			return resolver().then(onFulfilled, onRejected)
	// 		}
	// 	} as PromiseLike<T>
	// }

	return {
		...original,
		then<TResult1 = T, TResult2 = never>(
			onFulfilled?: (value: T) => TResult1 | PromiseLike<TResult1>,
			onRejected?: (reason: any) => TResult2 | PromiseLike<TResult2>
		): PromiseLike<TResult1 | TResult2> {
			// if (!resolver) return new PromiseFunc(() => onFulfilled).then(onFulfilled, onRejected)
			return resolver().then(onFulfilled, onRejected)
		}
	} as T & PromiseLike<T>
}

// Attach this symbol to the exported function, so users can use it
promisify.argumentNames = customArgumentsToken
promisify.Promise = undefined

export default promisify
