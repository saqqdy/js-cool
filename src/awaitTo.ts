import isArray from './isArray'

/**
 * Async await wrapper for easy error handling
 *
 * @param promise - Promise
 * @param promises - Promise rest params
 * @return - [Error, undefined] | [null, data | data[]]
 */
function awaitTo<T, E = Error>(promise: Promise<T>): Promise<[E, undefined] | [null, T]>
function awaitTo<T, E = Error>(promise: Array<Promise<T>>): Promise<[E, undefined] | [null, T[]]>
function awaitTo<T, E = Error>(
	promise: Promise<T>,
	...promises: Array<Promise<T>>
): Promise<[E, undefined] | [null, T[]]>
function awaitTo<T, E = Error>(
	promise: Promise<T> | Array<Promise<T>>,
	...promises: Array<Promise<T>>
): Promise<[E, undefined] | [null, T | T[]]> {
	if (!isArray(promise) && promises.length === 0) {
		return promise
			.then<[null, T]>((data: T) => [null, data])
			.catch<[E, undefined]>((err: E) => [err, undefined])
	}
	return Promise.all(([] as Array<Promise<T>>).concat(promise).concat(promises))
		.then<[null, T[]]>((data: T[]) => [null, data])
		.catch<[E, undefined]>((err: E) => [err, undefined])
}

export default awaitTo
