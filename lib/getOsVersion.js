import getAppVersion from './getAppVersion'

/**
 * 获取手机系统版本
 * @param osName {String} 系统类型字符串Android、iPod、iWatch或iPhone
 * @param withosstr {Boolean} 是否需要带上名称
 * @param userAgent {String} ua，可不传，默认取navigator.appVersion
 * @return {Boolean|null} null/true/false
 */
function getOsVersion(osName, withosstr, userAgent) {
  userAgent = userAgent || navigator.appVersion
  var d = ['iPhone', 'iPad', 'iPod', 'iWatch', 'Mac', 'iMac', 'iOS'],
    name = osName,
    index = d.indexOf(osName)
  if (index > -1 && userAgent.indexOf('like Mac OS X') > -1) {
    name = 'OS'
  }
  var reg = eval('/' + name + '\\s[\\d\\_]+/')
  var isApp = userAgent.includes(name)
  var ver = (userAgent.match(reg, 'ig') + '').replace(/\s/gi, '/').replace(/_/gi, '.')
  if (index > -1) {
    ver = ver.replace(/OS\//gi, osName + '/')
  }
  // console.log(userAgent, reg)
  // console.log(ver)
  return getAppVersion(osName, withosstr, ver)
}

export default getOsVersion