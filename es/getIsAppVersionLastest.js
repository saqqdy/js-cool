/*!
 * js-cool v2.1.3
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

var getAppVersion = require('./getAppVersion.js');

/**
 * 版本号大小对比
 *
 * @example
 * ```js
 * // navigator.appVersion = "5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36"
 * getIsAppVersionLastest('Chrome', '90.0.4515.159'); // true;
 * getIsAppVersionLastest('Chrome', '94.10.4515.159', navigator.appVersion); // false;
 * ```
 * @param appName - app名称
 * @param compareVer - 必传 需要对比的版本号
 * @param userAgent - ua，可不传，默认取navigator.appVersion
 * @return null/true/false
 */
function getIsAppVersionLastest(appName, compareVer, userAgent) {
    userAgent = userAgent || navigator.appVersion;
    var basicVer = appName.indexOf('.') > 0 ? appName : getAppVersion(appName, false, userAgent); // 兼容getIsAppVersionLastest("1.2.2","1.2.3")直接传入版本号的对比
    if (basicVer === null) {
        return null;
    } // 不是指定客户端
    if (basicVer === false) {
        return false;
    } // 是指定客户端但是版本号未知
    basicVer = basicVer + '.';
    compareVer = compareVer + '.';
    var bStr = parseFloat(basicVer);
    var cStr = parseFloat(compareVer);
    var bStrNext = parseFloat(basicVer.replace(bStr + '.', '')) || 0;
    var cStrNext = parseFloat(compareVer.replace(cStr + '.', '')) || 0;
    if (cStr > bStr) {
        return false;
    }
    else if (cStr < bStr) {
        return true;
    }
    else {
        if (bStrNext >= cStrNext) {
            return true;
        }
        else {
            return false;
        }
    }
}

module.exports = getIsAppVersionLastest;
