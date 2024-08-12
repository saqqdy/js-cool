import inBrowser from './inBrowser'

export interface OsVersion {
	name: 'Windows' | 'MacOS' | 'Android' | 'iOS' | 'WindowsPhone' | 'Debian' | 'WebOS' | 'Harmony'
	version: string
}

/**
 * Get the system name and version
 *
 * @example
 * ```
 * // ipad => 'Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1'
 * osVersion() // \{ name: 'iOS', version: '13.3' \}
 *
 * // iphone => 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
 * osVersion() // \{ name: 'iOS', version: '13.2.3' \}
 *
 * //  mac os => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
 * osVersion() // \{ name: 'MacOS', version: '10.15.7' \}
 *
 * // windows => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
 * osVersion() // \{ name: 'Windows', version: '10.0' \}
 *
 * // windows xp => 'Mozilla/5.0 (Windows NT 5.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
 * osVersion() // \{ name: 'Windows', version: 'XP' \}
 *
 * // windows phone => 'Mozilla/5.0 (Windows Phone OS 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36'
 * osVersion() // \{ name: 'WindowsPhone', version: '10.0' \}
 *
 * ```
 * @since 5.1.0
 * @param ua - ua or any ua like string, may not be passed, default is navigator.userAgent
 * @return OsVersion|null
 */
function osVersion(ua?: string): OsVersion | null {
	if (!ua) {
		if (!inBrowser) {
			console.info('url is required')
			return null
		}
		ua = navigator.userAgent
	}
	ua = ua.toLowerCase()

	const OS_REG_MAP = {
		Windows: /windows nt\s+([\w.]+)/,
		MacOS: /mac os x\s+([\w_]+)/,
		Android: /android\s+([\d.]+)/,
		iOS: /i(?:pad|phone|pod)(?:.*)cpu(?: i(?:pad|phone|pod))? os (\d+(?:[\.|_]\d+)+) like/,
		WindowsPhone: /Windows Phone(?: OS)? ([\d.]+);/,
		Debian: /Debian\/([\d.]+)/,
		WebOS: /hpwOS\/([\d.]+);/,
		Harmony: /openharmony\s+([\d.]+)/
	} as const

	let key: keyof typeof OS_REG_MAP

	for (key in OS_REG_MAP) {
		const match = ua.match(OS_REG_MAP[key])
		if (!match) continue
		else {
			let version = (match[1] || '').replace(/_/g, '.')
			if (key === 'Windows') {
				const VERSION_MAP = {
					'10': '10 || 11',
					'6.3': '8.1',
					'6.2': '8',
					'6.1': '7',
					'6.0': 'Vista',
					'5.2': 'XP 64-Bit',
					'5.1': 'XP',
					'5.0': '2000',
					'4.0': 'NT 4.0',
					'3.5.1': 'NT 3.5.1',
					'3.5': 'NT 3.5',
					'3.1': 'NT 3.1'
				}
				version = VERSION_MAP[version as keyof typeof VERSION_MAP] || version
			}
			return {
				name: key,
				version
			}
		}
	}

	return null
}

export default osVersion
