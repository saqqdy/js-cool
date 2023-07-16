// import { osLangSync } from 'os-lang'
import inBrowser from './inBrowser'

export const INFO_MAP = {
	engine: ['WebKit', 'Trident', 'Gecko', 'Presto'],
	browser: [
		'Safari',
		'Chrome',
		'Edge',
		'IE',
		'Firefox',
		'Firefox Focus',
		'Chromium',
		'Opera',
		'Vivaldi',
		'Yandex',
		'Arora',
		'Lunascape',
		'QupZilla',
		'Coc Coc',
		'Kindle',
		'Iceweasel',
		'Konqueror',
		'Iceape',
		'SeaMonkey',
		'Epiphany',
		'360',
		'360SE',
		'360EE',
		'UC',
		'QQBrowser',
		'QQ',
		'Baidu',
		'Maxthon',
		'Sogou',
		'LBBROWSER',
		'2345Explorer',
		'TheWorld',
		'XiaoMi',
		'Quark',
		'Qiyu',
		'Wechat',
		'WechatWork',
		'Taobao',
		'Alipay',
		'Weibo',
		'Douban',
		'Suning',
		'iQiYi',
		'DingTalk',
		'Vivo',
		'Huawei'
	],
	os: [
		'Windows',
		'Linux',
		'Mac OS',
		'Android',
		'Ubuntu',
		'FreeBSD',
		'Debian',
		'iOS',
		'Windows Phone',
		'BlackBerry',
		'MeeGo',
		'Symbian',
		'Chrome OS',
		'WebOS'
	],
	device: ['Mobile', 'Tablet', 'iPad', 'PC']
} as const

const INFO_TYPES: InfoTypes[] = [
	'engine',
	'browser',
	'os',
	'device',
	'language',
	'network',
	'orientation'
]

export interface ClientOptions {
	userAgent: string
	root: Window & typeof globalThis
	navigator: Navigator
}

export type InfoKey = keyof typeof INFO_MAP
export type InfoTypes = InfoKey | 'language' | 'network' | 'orientation'
// export type InfoTypes = Partial<(typeof INFO_TYPES)[number]>
export type InfoEngineKeys = (typeof INFO_MAP)['engine'][number]
export type InfoBrowserKeys = (typeof INFO_MAP)['browser'][number]
export type InfoOsKeys = (typeof INFO_MAP)['os'][number]
export type InfoDeviceKeys = (typeof INFO_MAP)['device'][number]
export type InfoKeys = InfoEngineKeys | InfoBrowserKeys | InfoOsKeys | InfoDeviceKeys

export class Client {
	matchMap: Record<InfoKeys, boolean>
	root
	navigator
	constructor(options: ClientOptions) {
		const { userAgent: ua, root, navigator } = Object.assign({ userAgent: '' }, options || {})
		this.root = root
		this.navigator = navigator

		const Opera = ua.includes('Opera') || ua.includes('OPR')
		const iPad = ua.includes('iPad')
		const Mobile = !iPad && (ua.includes('Mobi') || ua.includes('iPh') || ua.includes('480'))
		const Tablet = ua.includes('Tablet') || ua.includes('Nexus 7')

		this.matchMap = {
			// kernel
			Trident: ua.includes('Trident') || ua.includes('NET CLR'),
			Presto: ua.includes('Presto'),
			WebKit: ua.includes('AppleWebKit'),
			Gecko: ua.includes('Gecko/'),
			// browser
			Safari: ua.includes('Safari'),
			Chrome: ua.includes('Chrome') || ua.includes('CriOS'),
			IE: ua.includes('MSIE') || ua.includes('Trident'),
			Edge: ua.includes('Edge'),
			Firefox: ua.includes('Firefox') || ua.includes('FxiOS'),
			'Firefox Focus': ua.includes('Focus'),
			Chromium: ua.includes('Chromium'),
			Opera,
			Vivaldi: ua.includes('Vivaldi'),
			Yandex: ua.includes('YaBrowser'),
			Arora: ua.includes('Arora'),
			Lunascape: ua.includes('Lunascape'),
			QupZilla: ua.includes('QupZilla'),
			'Coc Coc': ua.includes('coc_coc_browser'),
			Kindle: ua.includes('Kindle') || ua.includes('Silk/'),
			Iceweasel: ua.includes('Iceweasel'),
			Konqueror: ua.includes('Konqueror'),
			Iceape: ua.includes('Iceape'),
			SeaMonkey: ua.includes('SeaMonkey'),
			Epiphany: ua.includes('Epiphany'),
			'360': ua.includes('QihooBrowser') || ua.includes('QHBrowser'),
			'360EE': ua.includes('360EE'),
			'360SE': ua.includes('360SE'),
			UC: ua.includes('UC') || ua.includes(' UBrowser'),
			QQBrowser: ua.includes('QQBrowser'),
			QQ: ua.includes('QQ/'),
			Baidu: !Opera && (ua.includes('Baidu') || ua.includes('BIDUBrowser')),
			Maxthon: ua.includes('Maxthon'),
			Sogou: ua.includes('MetaSr') || ua.includes('Sogou'),
			LBBROWSER: ua.includes('LBBROWSER') || ua.includes('LieBaoFast'),
			'2345Explorer': ua.includes('2345Explorer'),
			TheWorld: ua.includes('TheWorld'),
			XiaoMi: ua.includes('MiuiBrowser'),
			Quark: ua.includes('Quark'),
			Qiyu: ua.includes('Qiyu'),
			Wechat: ua.includes('MicroMessenger'),
			WechatWork: ua.includes('wxwork/'),
			Taobao: ua.includes('AliApp(TB'),
			Alipay: ua.includes('AliApp(AP'),
			Weibo: ua.includes('Weibo'),
			Douban: ua.includes('com.douban.frodo'),
			Suning: ua.includes('SNEBUY-APP'),
			iQiYi: ua.includes('IqiyiApp'),
			DingTalk: ua.includes('DingTalk'),
			Vivo: ua.includes('VivoBrowser'),
			Huawei:
				ua.includes('HuaweiBrowser') ||
				ua.includes('HUAWEI/') ||
				ua.includes('HONOR') ||
				ua.includes('HBPC/'),
			// System or platform
			Windows: ua.includes('Windows'),
			Linux: ua.includes('Linux') || ua.includes('X11'),
			'Mac OS': ua.includes('Macintosh'),
			Android: ua.includes('Android') || ua.includes('Adr'),
			Ubuntu: ua.includes('Ubuntu'),
			FreeBSD: ua.includes('FreeBSD'),
			Debian: ua.includes('Debian'),
			'Windows Phone': ua.includes('IEMobile') || ua.includes('Windows Phone'),
			BlackBerry: ua.includes('BlackBerry') || ua.includes('RIM'),
			MeeGo: ua.includes('MeeGo'),
			Symbian: ua.includes('Symbian'),
			iOS: ua.includes('like Mac OS X'),
			'Chrome OS': ua.includes('CrOS'),
			WebOS: ua.includes('hpwOS'),
			// device
			Mobile,
			Tablet,
			iPad,
			PC: !!ua && !Mobile && !Tablet && !iPad
		}

		const mimeMatch = function (option: string, value: string) {
			const mimeTypes = navigator.mimeTypes || {}
			for (const key in mimeTypes) {
				if (mimeTypes[key][option] === value) return true
			}
			return false
		}

		let IS_360 = false
		if (root.chrome) {
			const ver = +ua.replace(/^.*Chrome\/([\d]+).*$/, '$1')
			if (ver > 36 && root.showModalDialog) {
				IS_360 = true
			} else if (ver > 45) {
				IS_360 = mimeMatch('type', 'application/vnd.chromium.remoting-viewer')
			}
		}

		if (IS_360) {
			if (
				mimeMatch('type', 'application/gameplugin') ||
				(navigator && typeof navigator.connection.saveData === 'undefined')
			) {
				this.matchMap['360SE'] = true
			} else {
				this.matchMap['360EE'] = true
			}
		}

		if (this.matchMap.IE || this.matchMap.Edge) {
			const _top = window.screenTop - window.screenY
			if (_top === 102) this.matchMap['360EE'] = true
			else if (_top === 104) this.matchMap['360SE'] = true
		}
	}

	public get(names?: InfoTypes | InfoTypes[]) {
		if (!names) names = INFO_TYPES
		if (typeof names === 'string') names = ([] as InfoTypes[]).concat(names)

		const info = {
			device: this.getInfoByType('device'),
			os: this.getInfoByType('os'),
			browser: this.getInfoByType('browser'),
			engine: this.getInfoByType('engine' as InfoKey),
			//
			language: this.getLanguage(),
			network: this.getNetwork(),
			orientation: this.getOrientationStatus()
		}
		const result = {} as Partial<typeof info>

		let key: keyof typeof info
		for (key in info) {
			if (names.includes(key)) result[key] = info[key]
		}

		return result
	}

	public getInfoByType(infoKey: InfoKey) {
		let key: InfoKeys
		for (key of INFO_MAP[infoKey]) {
			if (this.matchMap[key]) return key
		}
	}

	public getOrientationStatus() {
		if (!inBrowser) return
		const orientation = window.matchMedia('(orientation: portrait)')
		return orientation.matches ? 'vertical' : 'horizontal'
	}

	public getNetwork() {
		// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return this.navigator?.connection?.effectiveType
	}

	public getLanguage() {
		if (!inBrowser) return // osLangSync()
		// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const language = this.navigator.browserLanguage || this.navigator.language || ''
		const arr = language.split('-')
		if (arr[1]) {
			arr[1] = arr[1].toUpperCase()
		}
		return arr.join('_')
	}
}

export default (function () {
	// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const root = ((typeof self !== 'undefined' ? self : this) || {}) as Window & typeof globalThis
	const navigator: Navigator =
		typeof root.navigator !== 'undefined' ? root.navigator : ({} as Navigator)
	const userAgent = navigator.userAgent || ''
	// 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
	// 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'

	return new Client({ userAgent, root, navigator })
})()
