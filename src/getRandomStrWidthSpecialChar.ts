/**
 * Get random string with special symbols
 *
 * @param len - the length of the random string to get
 * @returns random string
 */
function getRandomStrWidthSpecialChar(len = 32): string {
	const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678~!@#$^&*_+=-.' // Confusing characters are removed by default: oOLl,9gq,Vv,Uu,I1
	const maxPos = chars.length
	let str = ''
	for (let i = 0; i < len; i++) {
		str += chars.charAt(Math.floor(Math.random() * maxPos))
	}
	return str
}

export default getRandomStrWidthSpecialChar
