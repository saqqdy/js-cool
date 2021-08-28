'use strict';

require('core-js/modules/es.array.includes.js');
require('core-js/modules/es.string.includes.js');
require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.string.match.js');

/**
 * 获取APP版本号
 *
 * @param appName - app名称
 * @param withosstr - 是否需要带上名称
 * @param userAgent - ua，可不传，默认取navigator.appVersion
 * @return null/true/false
 */
function getAppVersion(appName, withappstr, userAgent) {
  // console.log(getAppVersion("Chrome"));
  // const userAgent = navigator.userAgent;
  userAgent = userAgent || navigator.appVersion;
  var reg = eval('/' + appName + '\\/([\\d\\.]+)/i');
  var isApp = userAgent.includes(appName);
  var ver = userAgent.match(reg); // console.log(userAgent)
  // console.log(ver)
  // withappstr = typeof(withappstr) != "undefined" ? withappstr : false;

  if (ver) {
    if (withappstr) {
      //需要带上app名称，完整输出
      return ver ? ver[0] : '';
    } else {
      return ver ? ver[1] : '';
    }
  } else {
    if (isApp) {
      //是指定客户端但是版本号未知
      console.log(appName + "\u672A\u77E5\u7248\u672C\u53F7");
      return false;
    } else {
      //不是指定客户端
      console.log(appName + "\u4E0D\u5B58\u5728");
      return null;
    }
  }
}

module.exports = getAppVersion;
