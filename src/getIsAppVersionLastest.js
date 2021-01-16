import getAppVersion from './getAppVersion'

/**
 * 版本号大小对比
 * @param appName {String} app名称
 * @param compareVer {String} 必传 需要对比的版本号
 * @param userAgent {String} ua，可不传，默认取navigator.appVersion
 * @return {Boolean|null} null/true/false
 */
function getIsAppVersionLastest(appName, compareVer, userAgent) {
  //console.log(getIsAppVersionLastest("Chrome","5.1"));
  userAgent = userAgent || navigator.appVersion
  var basicVer = appName.indexOf('.') > 0 ? appName : getAppVersion(appName, false, userAgent) //兼容getIsAppVersionLastest("1.2.2","1.2.3")直接传入版本号的对比
  // var basicVer = "5.1.";
  if (basicVer === null) {
    return null
  } //不是指定客户端
  if (basicVer === false) {
    return false
  } //是指定客户端但是版本号未知
  basicVer = basicVer + '.'
  compareVer = compareVer + '.'
  var bStr = parseFloat(basicVer)
  var cStr = parseFloat(compareVer)
  var bStrNext = parseFloat(basicVer.replace(bStr + '.', '')) || 0
  var cStrNext = parseFloat(compareVer.replace(cStr + '.', '')) || 0
  // console.log(bStr + "-" + cStr)
  // console.log(basicVer.replace(bStr + ".","") + "-" + compareVer.replace(cStr + ".",""))
  // console.log(bStrNext + "-" + cStrNext)
  if (cStr > bStr) {
    return false
  } else if (cStr < bStr) {
    return true
  } else {
    if (bStrNext >= cStrNext) {
      return true
    } else {
      return false
    }
  }
}

export default getIsAppVersionLastest
