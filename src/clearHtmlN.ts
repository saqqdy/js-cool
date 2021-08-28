/**
 * 去除HTML标签及换行
 *
 * @param string - 带html标签的字符串
 * @returns newString
 */
function clearHtmlN(string: string) {
    return string.replace(/<\/?.+?>|[\r\n]/g, '')
}

export default clearHtmlN
