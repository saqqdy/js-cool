/**
 * 去除HTML标签
 *
 * @param string - 带html标签的字符串
 * @returns newString
 */
function clearHtml(string: string) {
    return string.replace(/<\/?.+?>/g, '').replace(/[\r\n]/g, '')
}

export default clearHtml
