export interface Version {
	major: number
	minor: number
	patch: number
	preid: string
	release?: number
}

/**
 * return the next version, Only version types with no more than 3 digits are supported. (Follow the npm version rules)
 *
 * @example
 * ```js
 * nextVersion('1.2.33') // 1.2.34
 *
 * nextVersion('1.2.33', 'major') // 2.0.0
 *
 * nextVersion('1.2.33', 'premajor', 'alpha') // 2.0.0-alpha.1
 * ```
 * @param version - version(like: 1.0.0)
 * @param type - optional, version type
 * @param preid - optional, prerelease id
 * @returns - new version
 */
function nextVersion(
	version: string,
	type?: 'major' | 'minor' | 'patch' | 'premajor' | 'preminor' | 'prepatch' | 'prerelease',
	preid: string = ''
): string {
	const ver = parseVersion(version)

	switch (type) {
		case 'major':
			if (ver.minor || ver.patch) {
				ver.major++
				ver.minor = 0
				ver.patch = 0
			}
			ver.preid = ''
			ver.release = undefined
			break
		case 'minor':
			if (ver.patch) {
				ver.minor++
				ver.patch = 0
			}
			ver.preid = ''
			ver.release = undefined
			break
		case 'premajor':
			ver.major++
			ver.minor = 0
			ver.patch = 0
			ver.preid = preid
			ver.release = 0
			break
		case 'preminor':
			ver.minor++
			ver.patch = 0
			ver.preid = preid
			ver.release = 0
			break
		case 'prepatch':
			ver.patch++
			ver.preid = preid
			ver.release = 0
			break
		case 'prerelease':
			if (preid && ver.preid !== preid) {
				if (ver.release === undefined) ver.patch++
				ver.preid = preid
				ver.release = 0
			} else if (ver.release === undefined) {
				ver.patch++
				ver.release = 0
			} else ver.release++
			break
		case 'patch':
		default:
			if (ver.release === undefined) ver.patch++
			ver.preid = ''
			ver.release = undefined
	}

	return stringifyVersion(ver)
}

function parseVersion(version: string): Version {
	const ver: Version = {
		major: 0,
		minor: 0,
		patch: 0,
		preid: '',
		release: undefined
	}
	const [mainVer, subVer = ''] = version.split('-')
	;[ver.major = 0, ver.minor = 0, ver.patch = 0] = mainVer.split('.').map(el => +el)
	if (subVer.includes('.'))
		[ver.preid, ver.release] = subVer.split('.').map((el, i) => (i > 0 ? +el : el)) as [
			string,
			number
		]
	else if (subVer) ver.release = +subVer

	return ver
}

function stringifyVersion(ver: Version): string {
	const mainVer = [ver.major, ver.minor, ver.patch].join('.')
	const subVer = `${ver.preid ? ver.preid + '.' : ''}${ver.release ?? ''}`
	return `${mainVer}${subVer ? '-' + subVer : ''}`
}

export default nextVersion
