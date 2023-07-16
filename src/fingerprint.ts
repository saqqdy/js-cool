import inBrowser from './inBrowser'

/**
 * Generating Browser Fingerprints
 *
 * @param domain - key string, default: location.host
 * @returns - fingerprint
 */
function fingerprint(domain?: string) {
	if (!inBrowser) return null
	if (!domain) domain = location.host

	function bin2hex(s: string) {
		let i,
			l,
			n,
			o = ''
		s += ''
		for (i = 0, l = s.length; i < l; i++) {
			n = s.charCodeAt(i).toString(16)
			o += n.length < 2 ? '0' + n : n
		}
		return o
	}

	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')!

	ctx.textBaseline = 'top'
	ctx.font = "14px 'Arial'"
	ctx.fillStyle = '#f60'
	ctx.fillRect(125, 1, 62, 20)
	ctx.fillStyle = '#069'
	ctx.fillText(domain, 2, 15)
	ctx.fillStyle = 'rgba(102, 204, 0, 0.7)'
	ctx.fillText(domain, 4, 17)
	const b64 = canvas.toDataURL().replace('data:image/png;base64,', '')
	const bin = atob(b64)
	const crc = bin2hex(bin.slice(-16, -12))

	return crc
}

export default fingerprint
