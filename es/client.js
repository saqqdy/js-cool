'use strict';

/**
 * client方法返回一个浏览器判断结果：`{ ANDROID: true, GECKO: true, GLSH_APP: false, IE: false, IOS: false, IPAD: false, IPHONE: false, MOBILE: true, MOBILEDEVICE: true, OPERA: false, QQ: false, QQBROWSER: false, TRIDENT: false, WEBKIT: true, WEIXIN: false }`
 *
 * @param name - 可选，比如传入MicroMessenger，返回是否为微信内置浏览器
 * @param userAgent - 可选，传入自定义的ua，默认取浏览器的navigator.appVersion
 * @returns 返回常用ua匹配表，如果传了name，那么返回是否匹配该终端true/false
 */
const client = (name = '', userAgent = navigator.appVersion) => {
    const userAgentL = userAgent.toLowerCase();
    if (name) {
        return userAgent.indexOf(name) > -1;
    }
    else {
        return {
            // @ts-ignore
            IE: userAgentL.indexOf('msie') > -1 && !userAgentL.indexOf('opera') > -1,
            // @ts-ignore
            GECKO: userAgentL.indexOf('gecko') > -1 && !userAgentL.indexOf('khtml') > -1,
            WEBKIT: userAgentL.indexOf('applewebkit') > -1,
            OPERA: userAgentL.indexOf('opera') > -1 && userAgentL.indexOf('presto') > -1,
            TRIDENT: userAgentL.indexOf('trident') > -1,
            MOBILE: !!userAgent.match(/AppleWebKit.*Mobile.*/),
            // MOBILEDEVICE: !!userAgentL.match(/iphone|android|phone|mobile|wap|netfront|x11|java|opera mobi|opera mini|ucweb|windows ce|symbian|symbianos|series|webos|sony|blackberry|dopod|nokia|samsung|palmsource|xda|pieplus|meizu|midp|cldc|motorola|foma|docomo|up.browser|up.link|blazer|helio|hosin|huawei|novarra|coolpad|webos|techfaith|palmsource|alcatel|amoi|ktouch|nexian|ericsson|philips|sagem|wellcom|bunjalloo|maui|smartphone|iemobile|spice|bird|zte-|longcos|pantech|gionee|portalmmm|jig browser|hiptop|benq|haier|^lct|320x320|240x320|176x220/i), // 是否为移动终端
            IOS: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            ANDROID: userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1,
            IPHONE: userAgent.indexOf('iPhone') > -1,
            IPAD: userAgent.indexOf('iPad') > -1,
            // WEBAPP: !userAgent.indexOf('Safari') > -1, //是否web应该程序，没有头部与底部
            QQBROWSER: userAgent.indexOf('QQBrowser') > -1,
            WEIXIN: userAgent.indexOf('MicroMessenger') > -1,
            // @ts-ignore
            QQ: userAgent.match(/\sQQ/i) === ' qq' // 是否QQ
        };
    }
};

module.exports = client;
