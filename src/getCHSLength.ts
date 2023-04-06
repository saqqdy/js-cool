/**
 * 获取文本长度，中文算2个字节
 *
 * @param str - 字符串
 * @returns 返回长度
 */
function getCHSLength(str: string): number {
	// eslint-disable-next-line no-control-regex
	return str.replace(/[^\x00-\xFF]/g, '**').length
}

export default getCHSLength
