/**
 * client方法返回一个浏览器判断结果：{ ANDROID: true, GECKO: true, GLSH_APP: false, IE: false, IOS: false, IPAD: false, IPHONE: false, MOBILE: true, MOBILEDEVICE: true, OPERA: false, QQ: false, QQBROWSER: false, TRIDENT: false, WEBKIT: true, WEIXIN: false }
 * @param {String} name 可选，比如传入MicroMessenger，返回是否为微信内置浏览器
 * @param {String} userAgent 可选，传入自定义的ua，默认取浏览器的navigator.appVersion
 * @returns {Object|Boolean} 返回常用ua匹配表，如果传了name，那么返回是否匹配该终端true/false
 */

const client = (name = '', userAgent = navigator.appVersion) => {
  const userAgentL = userAgent.toLowerCase()
  if (name) {
    return userAgent.indexOf(name) > -1
  } else {
    return {
      IE: userAgentL.indexOf('msie') > -1 && !userAgentL.indexOf('opera') > -1,
      GECKO: userAgentL.indexOf('gecko') > -1 && !userAgentL.indexOf('khtml') > -1, // 火狐内核
      WEBKIT: userAgentL.indexOf('applewebkit') > -1, // 苹果、谷歌内核
      OPERA: userAgentL.indexOf('opera') > -1 && userAgentL.indexOf('presto') > -1, // opera内核
      TRIDENT: userAgentL.indexOf('trident') > -1, // IE内核
      MOBILE: !!userAgent.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      // MOBILEDEVICE: !!userAgentL.match(/iphone|android|phone|mobile|wap|netfront|x11|java|opera mobi|opera mini|ucweb|windows ce|symbian|symbianos|series|webos|sony|blackberry|dopod|nokia|samsung|palmsource|xda|pieplus|meizu|midp|cldc|motorola|foma|docomo|up.browser|up.link|blazer|helio|hosin|huawei|novarra|coolpad|webos|techfaith|palmsource|alcatel|amoi|ktouch|nexian|ericsson|philips|sagem|wellcom|bunjalloo|maui|smartphone|iemobile|spice|bird|zte-|longcos|pantech|gionee|portalmmm|jig browser|hiptop|benq|haier|^lct|320x320|240x320|176x220/i), // 是否为移动终端
      IOS: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      ANDROID: userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1, // android终端或者uc浏览器
      IPHONE: userAgent.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
      IPAD: userAgent.indexOf('iPad') > -1, // 是否iPad
      // WEBAPP: !userAgent.indexOf('Safari') > -1, //是否web应该程序，没有头部与底部
      QQBROWSER: userAgent.indexOf('QQBrowser') > -1, // 是否QQ浏览器
      WEIXIN: userAgent.indexOf('MicroMessenger') > -1, // 是否微信
      QQ: userAgent.match(/\sQQ/i) === ' qq' // 是否QQ
    }
  }
}

export default client
