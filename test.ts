import fs from 'fs'
import { promisify as es6promisify } from 'es6-promisify'
import { ref } from 'vue'
import promisify from './src/promisify'
import waiting from './src/waiting'
import nextVersion from './src/nextVersion'

// export function promisify<T>(original: (cb: Callback<T>) => any): () => Promise<T>
// export function promisify<T, U>(
// 	original: (param1: U, cb: Callback<T>) => any
// ): (param1: U) => Promise<T>
// export function promisify<T, U, V>(
// 	original: (param1: U, param2: V, cb: Callback<T>) => any
// ): (param1: U, param2: V) => Promise<T>
// export function promisify<T, U, V, W>(
// 	original: (param1: U, param2: V, param3: W, cb: Callback<T>) => any
// ): (param1: U, param2: V, param3: W) => Promise<T>
// export function promisify(original: CallbackFunction): PromiseFunction

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

function test(name: number, callback?: Function) {
	console.log(400, arguments)
	if (name === 1) callback && callback(true)
}
const stat = promisify(fs.stat)
const testPromise = promisify(test)

function test1(options?: number) {
	// const stats = await stat('example.txt', { bigint: true }, function () {})
	const stats = ref(1)

	const shell = {
		stats
	}

	const www = () =>
		new Promise((resolve, reject) => {
			waiting(2000)
				.then(() => {
					stats.value = 2
					resolve(shell)
				})
				.catch(() => reject(new Error('false')))
		})
	// const www1 = () =>
	// 	waiting(2000).then(() => {
	// 		stats = 2
	// 	})

	return promisify(shell, www)
	return {
		stats,
		then(onFulfilled: any, onRejected: any) {
			// if (!resolver) return new PromiseFunc(() => onFulfilled).then(onFulfilled, onRejected)
			return www().then(onFulfilled, onRejected)
		}
	}
}

;(async () => {
	try {
		// const res = await testPromise(1, () => {})
		// console.log(100, res)
		const res1 = test1(1)
		console.log(101, res1.stats.value)
		const stats = await stat('example.txt', { bigint: true }, function () {})
		console.log('Got stats', stats)
	} catch (err) {
		console.error('Yikes!', err)
	}
})()

// const aaa: { ccc: number; then: any } = { ccc: 111, then: 11 }
// const bbb = (): PromiseLike<typeof aaa> => {
// 	aaa.then = (onFulfilled: any, onRejected: any) => {
// 		// if (!resolver) return new PromiseFunc(() => onFulfilled).then(onFulfilled, onRejected)
// 		return Promise.resolve()
// 	}
// 	return aaa
// }

// console.log(bbb().then)
// ;(async () => {
// 	const ddd = await bbb()
// 	console.log(ddd)
// })()

// export function stat(path: PathLike, callback: (err: NodeJS.ErrnoException | null, stats: Stats) => void): void
// export function stat(
// 	path: PathLike,
// 	options:
// 		| (StatOptions & {
// 			  bigint?: false | undefined
// 		  })
// 		| undefined,
// 	callback: (err: NodeJS.ErrnoException | null, stats: Stats) => void
// ): void
// export function stat(
// 	path: PathLike,
// 	options: StatOptions & {
// 		bigint: true
// 	},
// 	callback: (err: NodeJS.ErrnoException | null, stats: BigIntStats) => void
// ): void
// export function stat(path: PathLike, options: StatOptions | undefined, callback: (err: NodeJS.ErrnoException | null, stats: Stats | BigIntStats) => void): void
