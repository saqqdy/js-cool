/**
 * Get a random string
 *
 * @param len - the length of the random string that needs to be obtained
 * @param widthSpecialChar - optional, if you need to generate a string with special characters
 * @returns random string
 */
function randomString(len = 32, widthSpecialChar = false): string {
	const chars = !widthSpecialChar
		? 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
		: 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678~!@#$^&*_+=-.' // Confusing characters are removed by default: oOLl,9gq,Vv,Uu,I1
	// var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
	const maxPos = chars.length
	let str = ''
	for (let i = 0; i < len; i++) {
		str += chars.charAt(Math.floor(Math.random() * maxPos))
	}
	return str
}

export default randomString
