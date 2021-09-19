'use strict';

require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.string.replace.js');

/**
 * 用=替换~ 用&替换^ 解码成微信跳转链接
 *
 * @param string - 传入字符串
 * @returns 返回解码结果
 */
function deWxJumpLinkOld(string) {
  return string.replace(/[~]/gi, '=').replace(/[\^]/gi, '&');
}

module.exports = deWxJumpLinkOld;
