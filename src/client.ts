/**
 * The client method returns a browser judgment result: `{ ANDROID: true, GECKO: true, GLSH_APP: false, IE: false, IOS: false, IPAD: false, IPHONE: false, MOBILE: true, MOBILEDEVICE. true, OPERA: false, QQ: false, QQBROWSER: false, TRIDENT: false, WEBKIT: true, WEIXIN: false }`
 *
 * @param name - optional, e.g. pass in MicroMessenger to return whether it is the built-in browser of Weixin
 * @param userAgent - optional, pass in a custom ua, default takes the browser's navigator.appVersion
 * @returns returns the common ua match table, if name is passed, then returns whether the terminal matches true/false
 */
// const client = (name = '', userAgent = navigator.appVersion) => {
// 	const userAgentL = userAgent.toLowerCase()
// 	if (name) {
// 		return userAgent.includes(name)
// 	} else {
// 		return {
// 			IE: userAgentL.includes('msie') && !userAgentL.includes('opera'),
// 			GECKO: userAgentL.includes('gecko') && !userAgentL.includes('khtml'), // firefox
// 			WEBKIT: userAgentL.includes('applewebkit'), // safari/chrome
// 			OPERA: userAgentL.includes('opera') && userAgentL.includes('presto'), // opera
// 			TRIDENT: userAgentL.includes('trident'), // IE
// 			MOBILE: !!userAgent.match(/AppleWebKit.*Mobile.*/),
// 			// MOBILEDEVICE: !!userAgentL.match(/iphone|android|phone|mobile|wap|netfront|x11|java|opera mobi|opera mini|ucweb|windows ce|symbian|symbianos|series|webos|sony|blackberry|dopod|nokia|samsung|palmsource|xda|pieplus|meizu|midp|cldc|motorola|foma|docomo|up.browser|up.link|blazer|helio|hosin|huawei|novarra|coolpad|webos|techfaith|palmsource|alcatel|amoi|ktouch|nexian|ericsson|philips|sagem|wellcom|bunjalloo|maui|smartphone|iemobile|spice|bird|zte-|longcos|pantech|gionee|portalmmm|jig browser|hiptop|benq|haier|^lct|320x320|240x320|176x220/i),
// 			IOS: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios
// 			ANDROID: userAgent.includes('Android') || userAgent.includes('Adr'), // android or uc browser
// 			IPHONE: userAgent.includes('iPhone'), // iPhone or QQ HD browser
// 			IPAD: userAgent.includes('iPad'), // iPad
// 			// WEBAPP: !userAgent.indexOf('Safari') > -1, // webapp
// 			QQBROWSER: userAgent.includes('QQBrowser'), // QQ browser
// 			WEIXIN: userAgent.includes('MicroMessenger'), // weixin
// 			QQ: userAgent.match(/\sQQ/i) // QQ
// 		}
// 	}
// }

// interface ClientInfo1 {
// 	options: Record<string, unknown>
// }

// interface StringConstructable {
// 	new (options: Record<string, unknown>): ClientInfo1
// }

// class MadeFromString implements ClientInfo1 {
// 	constructor(public options: Record<string, unknown>) {
// 		console.log('ctor invoked')
// 	}
// }

// function makeObj(Naa: StringConstructable) {
// 	return new Naa({ name: 'hello!' })
// }

// console.log(makeObj(MadeFromString).options)

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
	device: ['Mobile', 'Tablet', 'iPad']
} as const

export type InfoType = keyof typeof INFO_MAP
export type InfoEngineKeys = (typeof INFO_MAP)['engine'][number]
export type InfoBrowserKeys = (typeof INFO_MAP)['browser'][number]
export type InfoOsKeys = (typeof INFO_MAP)['os'][number]
export type InfoDeviceKeys = (typeof INFO_MAP)['device'][number]
export type InfoKeys = InfoEngineKeys | InfoBrowserKeys | InfoOsKeys | InfoDeviceKeys

export interface Client {
	// options: Record<string, unknown>
	// info: (options: Record<string, unknown>) => Record<string, unknown>
	matchMap: Record<InfoKeys, boolean>
	// getDeviceType: () => (typeof INFO_MAP)['device'][number]
	// engine: Record<string, unknown>
	// browser: Record<string, unknown>
	// os: Record<string, unknown>
	// device: Record<string, unknown>
}

export interface ClientInfoConstructor {
	prototype: Client & {
		get: (name: string) => Record<string, unknown>
		getInfoByType: (type: InfoType) => (typeof INFO_MAP)['device'][number]
	}
	new (options?: Record<string, unknown>): Client
}

// class ClientInfoClass1 implements Client {
// 	constructor(public options: Record<string, unknown>) {
// 		console.log('ctor invoked')
// 	}
// }

// function makeObj(Naa: ClientInfoConstructor) {
// 	return new Naa({ name: 'hello!' })
// }

// console.log(makeObj(ClientInfoClass1).options)

const client = (function () {
	// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const root = typeof self !== 'undefined' ? self : this
	const win = root || {}
	const navigator: Navigator = typeof root?.navigator !== 'undefined' ? root.navigator : {}
	const ua = navigator.userAgent || ''

	// const matchMap =

	const ClientInfo = function (this: Client, options?: Record<string, unknown>) {
		console.log(options)
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
			Opera: ua.includes('Opera') || ua.includes('OPR'),
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
			Baidu: ua.includes('Baidu') || ua.includes('BIDUBrowser'),
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
			Mobile: ua.includes('Mobi') || ua.includes('iPh') || ua.includes('480'),
			Tablet: ua.includes('Tablet') || ua.includes('Nexus 7'),
			iPad: ua.includes('iPad')
		}
		// this.getDeviceType = () => {
		// 	return 'iPad'
		// }
	} as unknown as ClientInfoConstructor

	ClientInfo.prototype.get = function <T extends string = 'deviceType'>(names: T) {
		const info = {
			deviceType: this.getInfoByType('device') // 设备类型
			// OS: this.getOS(), // 操作系统
			// OSVersion: this.getOSVersion(), // 操作系统版本
			// screenHeight: _window.screen.height, // 屏幕高
			// screenWidth: _window.screen.width, // 屏幕宽
			// language: this.getLanguage(), // 当前使用的语言-国家
			// netWork: this.getNetwork(), // 联网类型
			// orientation: this.getOrientationStatu(), // 横竖屏
			// browserInfo: this.getBrowserInfo() // 浏览器信息
		}
		return {}
	}

	ClientInfo.prototype.getInfoByType = function (type: InfoType) {
		let key: InfoKeys
		for (key of INFO_MAP[type]) {
			if (this.matchMap[INFO_MAP[type][key]]) return key
		}
	}

	// const clientInfo = new ClientInfo({ test: true })

	// console.log(clientInfo)

	return new ClientInfo()
})()

export default client
