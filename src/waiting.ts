/**
 * waiting for a while
 *
 * @param milliseconds - waiting time (milliseconds)
 */
export function waiting(milliseconds: number) {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default waiting
