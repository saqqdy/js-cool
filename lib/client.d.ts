/**
 * client方法返回一个浏览器判断结果：`{ ANDROID: true, GECKO: true, GLSH_APP: false, IE: false, IOS: false, IPAD: false, IPHONE: false, MOBILE: true, MOBILEDEVICE: true, OPERA: false, QQ: false, QQBROWSER: false, TRIDENT: false, WEBKIT: true, WEIXIN: false }`
 *
 * @param name - 可选，比如传入MicroMessenger，返回是否为微信内置浏览器
 * @param userAgent - 可选，传入自定义的ua，默认取浏览器的navigator.appVersion
 * @returns 返回常用ua匹配表，如果传了name，那么返回是否匹配该终端true/false
 */
declare const client: (name?: string, userAgent?: string) => boolean | {
    IE: boolean;
    GECKO: boolean;
    WEBKIT: boolean;
    OPERA: boolean;
    TRIDENT: boolean;
    MOBILE: boolean;
    IOS: boolean;
    ANDROID: boolean;
    IPHONE: boolean;
    IPAD: boolean;
    QQBROWSER: boolean;
    WEIXIN: boolean;
    QQ: boolean;
};
export default client;
