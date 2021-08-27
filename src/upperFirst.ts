/**
 * upperFirst
 * 首字母大写
 * @param string - 需要转换的字符串
 * @returns 返回转换后的字符串
 */
const upperFirst = (string: string): string => {
    return string.slice(0, 1).toLocaleUpperCase() + string.slice(1)
}

export default upperFirst
