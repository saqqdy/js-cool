/*!
 * js-cool v2.3.2
 * 这是一个纯原生ES6开发的Javascript常用方法库
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
/**
 * 用~替换= 用^替换& 转码成微信跳转链接
 *
 * @param string - 传入字符串
 * @returns 返回转码结果
 */
function enWxJumpLinkOld(string) {
    return string.replace(/[=]/gi, '~').replace(/[&]/gi, '^');
}

export { enWxJumpLinkOld as default };
