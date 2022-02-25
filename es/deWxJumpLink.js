/*!
 * js-cool v2.3.1
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
/**
 * 用=替换* 用&替换! 解码成微信跳转链接
 * name*exMall-detail-goodsInfoId!params(goodsInfoId)*8866 转成 name=exMall-detail-goodsInfoId&params[goodsInfoId]=8866
 *
 * @param string - 传入字符串
 * @returns 返回解码结果
 */
function deWxJumpLink(string) {
    return (string
        // .replace(/[~]{1}/g, '=')
        .replace(/[*]{1}/g, '=')
        // .replace(/[\^]{1}/g, '&')
        .replace(/[!]{1}/g, '&')
        .replace(/[\(]{1}/g, '[')
        .replace(/[\)]{1}/g, ']'));
}

export { deWxJumpLink as default };
