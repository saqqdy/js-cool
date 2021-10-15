/**
 * 去除换行
 *
 * @param string - 带html标签的字符串
 * @returns newString
 */
export function clearBr(string: string) {
    return string
        .replace(/<\/br>/g, '')
        .replace(/<br>/g, '')
        .replace(/[\r\n]/g, '')
}

export default clearBr
