/**
 * Async await wrapper for easy error handling
 *
 * @param promise - Promise
 * @return - [Error, undefined] | [null, data]
 */
export function awaitTo<T, E = Error>(promise: Promise<T>): Promise<[E, undefined] | [null, T]> {
	return promise
		.then<[null, T]>((data: T) => [null, data])
		.catch<[E, undefined]>((err: E) => [err, undefined])
}

export default awaitTo