/**
 * The client method returns a browser judgment result: `{ ANDROID: true, GECKO: true, GLSH_APP: false, IE: false, IOS: false, IPAD: false, IPHONE: false, MOBILE: true, MOBILEDEVICE. true, OPERA: false, QQ: false, QQBROWSER: false, TRIDENT: false, WEBKIT: true, WEIXIN: false }`
 *
 * @deprecated Will be refactored for the next major release
 * @param name - optional, e.g. pass in MicroMessenger to return whether it is the built-in browser of Weixin
 * @param userAgent - optional, pass in a custom ua, default takes the browser's navigator.userAgent
 * @returns - the common ua match table, if name is passed, then returns whether the terminal matches true/false
 */
const client = (name = '', userAgent = navigator.userAgent) => {
	const userAgentL = userAgent.toLowerCase()
	if (name) {
		return userAgent.includes(name)
	} else {
		return {
			IE: userAgentL.includes('msie') && !userAgentL.includes('opera'),
			GECKO: userAgentL.includes('gecko') && !userAgentL.includes('khtml'), // firefox
			WEBKIT: userAgentL.includes('applewebkit'), // safari/chrome
			OPERA: userAgentL.includes('opera') && userAgentL.includes('presto'), // opera
			TRIDENT: userAgentL.includes('trident'), // IE
			MOBILE: !!userAgent.match(/AppleWebKit.*Mobile.*/),
			// MOBILEDEVICE: !!userAgentL.match(/iphone|android|phone|mobile|wap|netfront|x11|java|opera mobi|opera mini|ucweb|windows ce|symbian|symbianos|series|webos|sony|blackberry|dopod|nokia|samsung|palmsource|xda|pieplus|meizu|midp|cldc|motorola|foma|docomo|up.browser|up.link|blazer|helio|hosin|huawei|novarra|coolpad|webos|techfaith|palmsource|alcatel|amoi|ktouch|nexian|ericsson|philips|sagem|wellcom|bunjalloo|maui|smartphone|iemobile|spice|bird|zte-|longcos|pantech|gionee|portalmmm|jig browser|hiptop|benq|haier|^lct|320x320|240x320|176x220/i),
			IOS: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios
			ANDROID: userAgent.includes('Android') || userAgent.includes('Adr'), // android or uc browser
			IPHONE: userAgent.includes('iPhone'), // iPhone or QQ HD browser
			IPAD: userAgent.includes('iPad'), // iPad
			// WEBAPP: !userAgent.indexOf('Safari') > -1, // webapp
			QQBROWSER: userAgent.includes('QQBrowser'), // QQ browser
			WEIXIN: userAgent.includes('MicroMessenger'), // weixin
			QQ: userAgent.match(/\sQQ/i) // QQ
		}
	}
}

export default client
