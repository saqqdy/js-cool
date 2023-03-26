/**
 * 移除字符串首尾空格
 *
 * @param string - 传入字符串
 * @returns 返回新字符串
 */
function trim(string: string): string {
	return string.replace(/(^\s+)|(\s+$)/g, '')
}

export default trim
