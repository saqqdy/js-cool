import type { AnyFunction } from './types'

/**
 * debounce & throttle
 *
 * @returns class
 */
function delay() {
	return {
		map: {} as any,
		register(id: string, fn: AnyFunction, time: number, boo: boolean) {
			if (boo) {
				// debounce, only the first trigger for a certain period of time
				if (!this.map[id]) {
					// Non-existent first execution fn
					fn()
				}
				this.map[id] = {
					id,
					fn,
					time,
					boo,
					timeout: setTimeout(() => {
						this.destroy(id)
					}, time)
				}
			} else {
				// Throttling, delayed execution for a certain period of time
				if (this.map[id]) {
					// Existing ones are destroyed first
					this.destroy(id)
				}
				this.map[id] = {
					id,
					fn,
					time,
					boo,
					timeout: setTimeout(fn, time)
				}
			}
		},
		destroy(id: string) {
			if (!this.map[id]) {
				return
			}
			clearTimeout(this.map[id].timeout)
			delete this.map[id]
		}
	}
}

export default delay
