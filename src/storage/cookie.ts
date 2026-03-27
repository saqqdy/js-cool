/**
 * Cookie API
 * @module storage/cookie
 */

import type { CookieAPI, CookieDeleteOptions, CookieOptions } from './types'

/**
 * Cookie 存储 API
 */
export const cookie: CookieAPI = {
	set(name: string, value: string | number | boolean, options?: CookieOptions): void {
		const { expires = 86400, path = '/', domain, secure = false, sameSite } = options ?? {}

		const date = new Date(Date.now() + expires * 1000)
		let cookieStr = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=${path}`

		if (domain) {
			cookieStr += `;domain=${domain}`
		}

		// SameSite=None 必须配合 Secure
		if (secure || sameSite === 'None') {
			cookieStr += ';Secure'
		}

		if (sameSite) {
			cookieStr += `;SameSite=${sameSite}`
		}

		document.cookie = cookieStr
	},

	get(name: string): string | null {
		const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
		const arr = document.cookie.match(reg)
		return arr ? decodeURIComponent(arr[2]) : null
	},

	getAll(): Record<string, string> {
		const cookies: Record<string, string> = {}
		const cookieArr = decodeURIComponent(document.cookie).split('; ')
		const nullValues = ['null', 'undefined', 'NaN']

		for (let i = cookieArr.length - 1; i >= 0; i--) {
			const valPair = cookieArr[i].split('=')
			if (valPair.length >= 2) {
				const [key, value] = valPair
				cookies[key] = nullValues.includes(value) ? '' : value
			}
		}

		return cookies
	},

	delete(name: string, options?: CookieDeleteOptions): void {
		const { path = '/', domain } = options ?? {}
		const value = this.get(name)

		if (value !== null) {
			const date = new Date(Date.now() - 1000)
			let cookieStr = `${name}=${value};expires=${date.toUTCString()};path=${path}`

			if (domain) {
				cookieStr += `;domain=${domain}`
			}

			document.cookie = cookieStr
		}
	},

	has(name: string): boolean {
		return this.get(name) !== null
	},

	clear(): void {
		const cookies = this.getAll()
		for (const name of Object.keys(cookies)) {
			this.delete(name)
		}
	},
}
