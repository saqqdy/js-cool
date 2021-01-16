/**
 * 用=替换~ 用&替换^ 解码成微信跳转链接
 * @param {String} string 传入字符串
 * @returns {String} 返回解码结果
 */
const deWxJumpLinkOld = string => {
  return string.replace(/[~]/gi, '=').replace(/[\^]/gi, '&')
}

export default deWxJumpLinkOld
