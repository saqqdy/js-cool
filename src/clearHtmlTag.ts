/**
 * 去除HTML标签及标签里面的文字
 * 
 * @param string - 带html标签的字符串
 * @returns newString
 */
function clearHtmlTag(string: string) {
    return string.replace(/<[^>]+>/g, '')
}

export default clearHtmlTag
