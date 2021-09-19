'use strict';

/**
 * 用*替换= 用!替换& 转码成微信跳转链接
 * name=exMall-detail-goodsInfoId&params[goodsInfoId]=8866 转成 name*exMall-detail-goodsInfoId!params(goodsInfoId)*8866
 *
 * @param string - 传入字符串
 * @returns 返回转码结果
 */
function enWxJumpLink(string) {
    return (string
        // .replace(/[=]{1}/g, '~')
        .replace(/[=]{1}/g, '*')
        // .replace(/[&]{1}/g, '^')
        .replace(/[&]{1}/g, '!')
        .replace(/[\[]{1}/g, '(')
        .replace(/[\]]{1}/g, ')'));
}

module.exports = enWxJumpLink;
