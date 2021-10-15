/**
 * 去除HTML标签所有属性
 *
 * @param string - 传入字符串
 * @returns newString
 */
export function clearAttr(string: string) {
    return string.replace(/<([a-zA-Z1-7]+)\s*[^><]*>/g, '<$1>')
}

export default clearAttr
