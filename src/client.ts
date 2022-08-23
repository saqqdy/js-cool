/**
 * client方法返回一个浏览器判断结果：`{ ANDROID: true, GECKO: true, GLSH_APP: false, IE: false, IOS: false, IPAD: false, IPHONE: false, MOBILE: true, MOBILEDEVICE: true, OPERA: false, QQ: false, QQBROWSER: false, TRIDENT: false, WEBKIT: true, WEIXIN: false }`
 *
 * @param name - 可选，比如传入MicroMessenger，返回是否为微信内置浏览器
 * @param userAgent - 可选，传入自定义的ua，默认取浏览器的navigator.appVersion
 * @returns 返回常用ua匹配表，如果传了name，那么返回是否匹配该终端true/false
 */
const client = (name = '', userAgent = navigator.appVersion) => {
	const userAgentL = userAgent.toLowerCase()
	if (name) {
		return userAgent.includes(name)
	} else {
		return {
			IE: userAgentL.includes('msie') && !userAgentL.includes('opera'),
			GECKO:
				userAgentL.includes('gecko') && !userAgentL.includes('khtml'), // 火狐内核
			WEBKIT: userAgentL.includes('applewebkit'), // 苹果、谷歌内核
			OPERA:
				userAgentL.includes('opera') && userAgentL.includes('presto'), // opera内核
			TRIDENT: userAgentL.includes('trident'), // IE内核
			MOBILE: !!userAgent.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
			// MOBILEDEVICE: !!userAgentL.match(/iphone|android|phone|mobile|wap|netfront|x11|java|opera mobi|opera mini|ucweb|windows ce|symbian|symbianos|series|webos|sony|blackberry|dopod|nokia|samsung|palmsource|xda|pieplus|meizu|midp|cldc|motorola|foma|docomo|up.browser|up.link|blazer|helio|hosin|huawei|novarra|coolpad|webos|techfaith|palmsource|alcatel|amoi|ktouch|nexian|ericsson|philips|sagem|wellcom|bunjalloo|maui|smartphone|iemobile|spice|bird|zte-|longcos|pantech|gionee|portalmmm|jig browser|hiptop|benq|haier|^lct|320x320|240x320|176x220/i), // 是否为移动终端
			IOS: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
			ANDROID: userAgent.includes('Android') || userAgent.includes('Adr'), // android终端或者uc浏览器
			IPHONE: userAgent.includes('iPhone'), // 是否为iPhone或者QQHD浏览器
			IPAD: userAgent.includes('iPad'), // 是否iPad
			// WEBAPP: !userAgent.indexOf('Safari') > -1, //是否web应该程序，没有头部与底部
			QQBROWSER: userAgent.includes('QQBrowser'), // 是否QQ浏览器
			WEIXIN: userAgent.includes('MicroMessenger'), // 是否微信
			QQ: userAgent.match(/\sQQ/i) // 是否QQ
		}
	}
}

export default client
