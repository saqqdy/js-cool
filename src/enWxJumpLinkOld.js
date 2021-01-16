/**
 * 用~替换= 用^替换& 转码成微信跳转链接
 * @param {String} string 传入字符串
 * @returns {String} 返回转码结果
 */
const enWxJumpLinkOld = string => {
  return string.replace(/[=]/gi, '~').replace(/[&]/gi, '^')
}

export default enWxJumpLinkOld
