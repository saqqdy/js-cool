import type { AnyFunction } from './types'

/**
 * debounce & throttle
 *
 * @example
 * ```js
 * const d = delay()
 *
 * // Debounce mode (first trigger only)
 * // Execute immediately on first call, ignore subsequent calls within 500ms
 * d.register('search', () => console.log('searching...'), 500, true)
 *
 * // Throttle mode (last trigger)
 * // Delay execution, only the last call within 500ms will be executed
 * d.register('save', () => console.log('saving...'), 500, false)
 *
 * // Cancel pending execution
 * d.destroy('search')
 *
 * // Use in event handler
 * input.addEventListener('input', () => {
 *   d.register('input', handleInput, 300, false)
 * })
 *
 * // Use for resize
 * window.addEventListener('resize', () => {
 *   d.register('resize', handleResize, 200, false)
 * })
 * ```
 * @since 1.0.2
 * @returns object with register and destroy methods
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
