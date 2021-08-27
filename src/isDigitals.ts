/**
 * 是否为由数字组成的字符串
 * @param str - 待检测的字符串
 * @returns 返回true/false
 */
const isDigitals = (str: any): boolean => {
    return /^[0-9]*$/.test(str)
}

export default isDigitals
