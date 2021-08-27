/**
 * 获取字符串中的数字
 * @param string - 传入带数字的字符串
 * @returns 返回纯数字字符串
 */
const getNumber = (string: string) => {
    return string.replace(/[^0-9.]/gi, '')
}

export default getNumber
