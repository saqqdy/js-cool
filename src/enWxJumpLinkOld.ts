/**
 * 用~替换= 用^替换& 转码成微信跳转链接
 * 
 * @param string - 传入字符串
 * @returns 返回转码结果
 */
function enWxJumpLinkOld(string: string) {
    return string.replace(/[=]/gi, '~').replace(/[&]/gi, '^')
}

export default enWxJumpLinkOld
