/**
 * 去除HTML标签保留空格、换行
 * 
 * @param string - 带html标签的字符串
 * @returns newString
 */
function clearHtmlExpSN(string: string) {
    return string.replace(/<\/?[^\/?(br)][^><]*>/gi, '')
}

export default clearHtmlExpSN
