/**
 * setCookie method for writing cookies
 *
 * @param name - cookie name
 * @param value - Set the value to be stored, either as an object or as a string
 * @param seconds - cookie validity default 1 day
 * @param path - path, default '/'
 * @param samesite - SameSite, default true
 */
function setCookie(name: string, value: any, seconds = 86400, path = '/', samesite = true) {
	const exp: Date = new Date()
	exp.setTime(exp.getTime() + seconds * 1000)
	document.cookie =
		name +
		'=' +
		encodeURIComponent(value) +
		';expires=' +
		exp.toUTCString() +
		';path=' +
		path +
		(samesite && location.protocol === 'https:' ? ';SameSite=None;Secure' : '')
}

export default setCookie
