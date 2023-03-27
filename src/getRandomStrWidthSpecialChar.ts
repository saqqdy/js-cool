/**
 * 获取随机字符串带特殊符号
 *
 * @param len - 需要获取随机字符串的长度
 * @returns 随机串
 */
function getRandomStrWidthSpecialChar(len = 32): string {
	const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678~!@#$^&*_+=-.' // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
	const maxPos = chars.length
	let str = ''
	for (let i = 0; i < len; i++) {
		str += chars.charAt(Math.floor(Math.random() * maxPos))
	}
	return str
}

export default getRandomStrWidthSpecialChar
