import 'core-js/modules/es.array.index-of.js';
import 'core-js/modules/es.regexp.exec.js';
import 'core-js/modules/es.string.match.js';
import 'core-js/modules/es.string.replace.js';
import 'core-js/modules/es.regexp.constructor.js';
import 'core-js/modules/es.regexp.to-string.js';
import 'core-js/modules/es.array.slice.js';
import 'core-js/modules/es.date.to-string.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/web.timers.js';
import 'core-js/modules/es.array.includes.js';
import 'core-js/modules/es.string.includes.js';
import 'core-js/modules/es.parse-float.js';
import 'core-js/modules/es.string.split.js';
import 'core-js/modules/es.string.search.js';
import 'core-js/modules/es.array.last-index-of.js';
import 'core-js/modules/es.parse-int.js';
import 'core-js/modules/es.array.concat.js';
import 'core-js/modules/es.array.for-each.js';
import 'core-js/modules/es.array.sort.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import 'core-js/modules/es.object.get-prototype-of.js';
import 'core-js/modules/es.array.map.js';

/**
 * client方法返回一个浏览器判断结果：{ ANDROID: true, GECKO: true, GLSH_APP: false, IE: false, IOS: false, IPAD: false, IPHONE: false, MOBILE: true, MOBILEDEVICE: true, OPERA: false, QQ: false, QQBROWSER: false, TRIDENT: false, WEBKIT: true, WEIXIN: false }
 * @param {String} name 可选，比如传入MicroMessenger，返回是否为微信内置浏览器
 * @param {String} userAgent 可选，传入自定义的ua，默认取浏览器的navigator.appVersion
 * @returns {Object|Boolean} 返回常用ua匹配表，如果传了name，那么返回是否匹配该终端true/false
 */
var client = function client(name, userAgent) {
  if (name === void 0) {
    name = '';
  }

  if (userAgent === void 0) {
    userAgent = navigator.appVersion;
  }

  var userAgentL = userAgent.toLowerCase();

  if (name) {
    return userAgent.indexOf(name) > -1;
  } else {
    return {
      IE: userAgentL.indexOf('msie') > -1 && !userAgentL.indexOf('opera') > -1,
      GECKO: userAgentL.indexOf('gecko') > -1 && !userAgentL.indexOf('khtml') > -1,
      // 火狐内核
      WEBKIT: userAgentL.indexOf('applewebkit') > -1,
      // 苹果、谷歌内核
      OPERA: userAgentL.indexOf('opera') > -1 && userAgentL.indexOf('presto') > -1,
      // opera内核
      TRIDENT: userAgentL.indexOf('trident') > -1,
      // IE内核
      MOBILE: !!userAgent.match(/AppleWebKit.*Mobile.*/),
      // 是否为移动终端
      // MOBILEDEVICE: !!userAgentL.match(/iphone|android|phone|mobile|wap|netfront|x11|java|opera mobi|opera mini|ucweb|windows ce|symbian|symbianos|series|webos|sony|blackberry|dopod|nokia|samsung|palmsource|xda|pieplus|meizu|midp|cldc|motorola|foma|docomo|up.browser|up.link|blazer|helio|hosin|huawei|novarra|coolpad|webos|techfaith|palmsource|alcatel|amoi|ktouch|nexian|ericsson|philips|sagem|wellcom|bunjalloo|maui|smartphone|iemobile|spice|bird|zte-|longcos|pantech|gionee|portalmmm|jig browser|hiptop|benq|haier|^lct|320x320|240x320|176x220/i), // 是否为移动终端
      IOS: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      // ios终端
      ANDROID: userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1,
      // android终端或者uc浏览器
      IPHONE: userAgent.indexOf('iPhone') > -1,
      // 是否为iPhone或者QQHD浏览器
      IPAD: userAgent.indexOf('iPad') > -1,
      // 是否iPad
      // WEBAPP: !userAgent.indexOf('Safari') > -1, //是否web应该程序，没有头部与底部
      QQBROWSER: userAgent.indexOf('QQBrowser') > -1,
      // 是否QQ浏览器
      WEIXIN: userAgent.indexOf('MicroMessenger') > -1,
      // 是否微信
      QQ: userAgent.match(/\sQQ/i) === ' qq' // 是否QQ

    };
  }
};

/**
 * pattern返回一些常用的正则：any, arrjson, chinese, email, float, isjson, json, mobile, number, pass, postcode, qq, string, tel, textarea, url, username
 * @returns {Object} 返回对象
 */
function pattern() {
  return {
    any: /[\w\W]+/,
    number: /^\d+$/,
    string: /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/,
    postcode: /^[0-9]{6}$/,
    url: /^(\w+:\/\/)?\w+(\.\w+)+.*$/,
    username: /^[a-zA-Z0-9\_\-\.]{3,15}$/,
    "float": /^[0-9]+\.{0,1}[0-9]{0,2}$/,
    email: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
    //mobile:/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[6|7|8]|18[0-9])\d{8}$/,
    //mobile:/^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/,
    mobile: /^1[3|4|5|7|8][0-9]\d{8,8}$/,
    chinese: /^[\u4E00-\u9FA5\uf900-\ufa2d]$/,
    tel: /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/,
    qq: /^[1-9][0-9]{5,13}$/,
    pass: /^(?![0-9\W\_]+$)(?![a-zA-Z\W\_]+$)[0-9a-zA-Z\W\_]{6,16}$/,
    json: /^\{[\s\S]*\}$/,
    arrjson: /^\[\{[\s\S]*\}\]$/,
    array: /^\[[\s\S]*\]$/,
    isjson: /[\s\S]*(\{[\s\S]*\})[\s\S]*/,
    textarea: /[\u4e00-\u9fa5_a-zA-Z0-9\,\.\/\?\;\:\'\"\[\]\-\*\(\)\（\）\%\$\@\\\!\，\《\》\。\、\？\；\：\‘\’\“\”\…\￥\！]/
  };
}

var pattern$1 = pattern();

/**
 * trim()根据传参来去除空格
 * @param {String} string 传入字符串
 * @param {string} type 可选，去除空格的类型l:去除开头空格 r:去除尾部空格 lr:去除两端空格，为空的话去除所有空格
 * @returns {String} 返回新字符串
 */
var trim = function trim(string, type) {
  if (type === void 0) {
    type = '';
  }

  if (!type) {
    return string.replace(/\s/g, '');
  } else if (type === 'l' || type === 'left') {
    return string.replace(/^\s*/, '');
  } else if (type === 'r' || type === 'right') {
    return string.replace(/\s*$/, '');
  } else if (type === 'lr' || type === 'around') {
    return string.replace(/(^\s*)|(\s*$)/g, '');
  }
};

/**
 * 去除HTML标签所有属性
 * @param {String} string 传入字符串
 * @returns {String}
 */
var clearAttr = function clearAttr(string) {
  return string.replace(/<([a-zA-Z1-7]+)\s*[^><]*>/g, '<$1>');
};

/**
 * 去除换行
 * @param {String} string 带html标签的字符串
 * @returns {String}
 */
var clearBr = function clearBr(string) {
  return string.replace(/<\/br>/g, '').replace(/<br>/g, '').replace(/[\r\n]/g, '');
};

/**
 * 去除HTML标签
 * @param {String} string 带html标签的字符串
 * @returns {String}
 */
var clearHtml = function clearHtml(string) {
  return string.replace(/<\/?.+?>/g, '').replace(/[\r\n]/g, '');
};

/**
 * 去除HTML标签保留空格、换行
 * @param {String} string 带html标签的字符串
 * @returns {String}
 */
var clearHtmlExpSN = function clearHtmlExpSN(string) {
  return string.replace(/<\/?[^\/?(br)][^><]*>/gi, '');
};

/**
 * 去除HTML标签及换行
 * @param {String} string 带html标签的字符串
 * @returns {String}
 */
var clearHtmlN = function clearHtmlN(string) {
  return string.replace(/<\/?.+?>|[\r\n]/g, '');
};

/**
 * 去除HTML标签及空格、换行
 * @param {String} string 带html标签的字符串
 * @returns {String}
 */
var clearHtmlNS = function clearHtmlNS(string) {
  return string.replace(/<\/?.+?>|[\r\n\s]|(\ )/g, '');
};

/**
 * 去除HTML标签及标签里面的文字
 * @param {String} string 带html标签的字符串
 * @returns {String}
 */
var clearHtmlTag = function clearHtmlTag(string) {
  return string.replace(/<[^>]+>/g, '');
};

/**
 * 获取字符串中的数字
 * @param {String} string 传入带数字的字符串
 * @returns {String} 返回纯数字字符串
 */
var getNumber = function getNumber(string) {
  return string.replace(/[^0-9.]/gi, '');
};

/**
 * 扩展图片自动适应多种分辨率small original
 * @param {String} imgurl 图片url
 * @param {String} size 图片规格
 * @returns {String} 返回新地址
 */
var imgAdapt = function imgAdapt(imgurl, size) {
  if (!imgurl) {
    return false;
  }

  var imgPre = '';
  var urlReg = new RegExp('(.jpg|.png|.gif|.jpeg|.bmp|.webx)$', 'i');

  switch (size) {
    case 's':
      imgPre = '.small';
      return imgurl.replace(urlReg, '$1' + imgPre + '$1');

    case 'm':
      imgPre = '';
      return imgurl.replace(urlReg, '$1' + imgPre);

    case 'l':
      imgPre = '.original';
      return imgurl.replace(urlReg, '$1' + imgPre + '$1');

    default:
      return imgurl;
  } //	return this.replace(preReg,"").replace(urlReg,"$1" + imgPre + "$1");
  //return this.replace(urlReg,"$1" + imgPre + "$1");

};

/**
 * 扩展图片自动适应多种分辨率@2x @3x
 * @param {String} imgurl 图片地址
 * @returns {String} 返回新地址
 */
var imgChoose = function imgChoose(imgurl) {
  var width = window.innerWidth;
  var imgPre = '';
  var urlReg = new RegExp('(.jpg|.png|.gif|.jpeg|.bmp)', 'i');
  var preReg = new RegExp('(@[2|3]x)', 'i'); //匹配@2x @3x

  if (width >= 480) {
    imgPre = '@3x';
  } else if (width >= 320) {
    imgPre = '@2x';
  } else if (width >= 240) {
    imgPre = '';
  }

  return imgurl.replace(preReg, '').replace(urlReg, imgPre + '$1');
};

/**
 * camel2Dash
 * 将驼峰字符串转成-间隔且全小写的Dash模式
 * @param {String} string 需要转换的字符串
 * @returns {String} 返回转换后的字符串
 */
var camel2Dash = function camel2Dash(string) {
  return string.replace(/([A-Z]{1,1})/g, '-$1').replace(/^-/, '').toLocaleLowerCase();
};

/**
 * dash2Camel
 * 将-间隔且全小写的Dash模式转成驼峰字符串
 * @param {String} string 需要转换的字符串
 * @returns {String} 返回转换后的字符串
 */
var dash2Camel = function dash2Camel(string) {
  return string.replace(/[\-]{1,1}([a-z]{1,1})/g, function () {
    return arguments[1].toLocaleUpperCase();
  });
};

/**
 * upperFirst
 * 首字母大写
 * @param {String} string 需要转换的字符串
 * @returns {String} 返回转换后的字符串
 */
var upperFirst = function upperFirst(string) {
  return string.slice(0, 1).toLocaleUpperCase() + string.slice(1);
};

/**
 * 获取随机整数
 * @param {Number} min 随机数的最小值
 * @param {Number} max 随机数的最大值
 * @returns {Number} 返回数字
 */
var getRandomNum = function getRandomNum(min, max) {
  if (min === void 0) {
    min = 1;
  }

  if (max === void 0) {
    max = 10;
  }

  var Range = max - min;
  var Rand = Math.random();
  return min + Math.round(Rand * Range);
};

/**
 * 获取随机字符串
 * @param {Number} len 需要获取随机字符串的长度
 * @param {Boolean} widthSpecialChar 可选，是否需要生成带特殊字符的串
 * @returns {String} 随机串
 */
var getRandomStr = function getRandomStr(len, widthSpecialChar) {
  if (len === void 0) {
    len = 32;
  }

  if (widthSpecialChar === void 0) {
    widthSpecialChar = false;
  }

  var chars = !widthSpecialChar ? 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' : 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678~!@#$^&*_+=-.'; //默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
  //var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';

  var maxPos = chars.length;
  var str = '';

  for (var i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * maxPos));
  }

  return str;
};

/**
 * 获取随机字符串带特殊符号
 * @param {Number} len 需要获取随机字符串的长度
 * @returns {String} 随机串
 */
var getRandomStrWidthSpecialChar = function getRandomStrWidthSpecialChar(len) {
  if (len === void 0) {
    len = 32;
  }

  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678~!@#$^&*_+=-.'; //默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1

  var maxPos = chars.length;
  var str = '';

  for (var i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * maxPos));
  }

  return str;
};

//获取字符串长度，中文算2个字符
// var getStrLen = function getStrLen(str) {
//   var realLength = 0
//   var len = str.length
//   var charCode = -1
//   for (var i = 0; i < len; i++) {
//     charCode = str.charCodeAt(i)
//     if (charCode >= 0 && charCode <= 128) {
//       realLength += 1
//     } else {
//       realLength += 2
//     }
//   }
//   return realLength
// }

/**
 * 获取文本长度，中文算2个字节
 * @param {String} str 字符串
 * @returns {Number} 返回长度
 */
function getCHSLength(str) {
  return str.replace(/[^\x00-\xff]/g, '**').length;
}

/**
 * js截取字符串，中英文都能用
 * @param str：需要截取的字符串
 * @param len: 需要截取的长度
 */
// function cutStrLen(str, len) {
//   var str_length = 0
//   //var a = 0;
//   var str_len = str.length
//   var str_cut = new String()
//   for (var i = 0; i < str_len; i++) {
//     a = str.charAt(i)
//     str_length++
//     if (escape(a).length > 4) {
//       //中文字符的长度经编码之后大于4
//       str_length++
//     }
//     str_cut = str_cut.concat(a)
//     if (str_length >= len) {
//       str_cut = str_cut.concat('...')
//       return str_cut
//     }
//   }
//   //如果给定字符串小于指定长度，则返回源字符串；
//   if (str_length < len) {
//     return str
//   }
// }

/**
 * 截取字符串，中文算2个字节
 * @param {String} str 要截取的字符串
 * @param {Number} len
 * @param {Boolean} hasDot
 * @returns {String} 返回截取后的字符串
 */
function cutCHSString(str, len, hasDot) {
  if (len === void 0) {
    len = str.length;
  }

  if (hasDot === void 0) {
    hasDot = false;
  }

  if (str == '' || !str) {
    return '';
  } else {
    var newLength = 0;
    var newStr = '';
    var chineseRegex = /[^\x00-\xff]/g;
    var singleChar = '';
    var strLength = str.replace(chineseRegex, '**').length;

    for (var i = 0; i < strLength; i++) {
      singleChar = str.charAt(i).toString();

      if (singleChar.match(chineseRegex) != null) {
        newLength += 2;
      } else {
        newLength++;
      }

      if (newLength > len) {
        break;
      }

      newStr += singleChar;
    }

    if (hasDot && strLength > len) {
      newStr += '...';
    }

    return newStr;
  }
}

/**
 * textarea或input对象在指定的光标位置插入文字
 * @param  {Object} obj dom对象
 * @param  {String} str 要插入的文字
 */
var textareaInsertText = function textareaInsertText(obj, str) {
  if (document.selection) {
    var sel = document.selection.createRange();
    sel.text = str;
  } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
    var startPos = obj.selectionStart,
        endPos = obj.selectionEnd,
        curPos = startPos,
        tmpStr = obj.value;
    obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
    curPos += str.length;
    setTimeout(function () {
      obj.selectionStart = obj.selectionEnd = curPos;
    }, 0);
  } else {
    obj.value += str;
  }
};

/**
 * textarea或input对象将光标定位到文字尾部
 * @param  {Object} obj dom对象
 */
function textareaMoveToEnd(obj) {
  obj.focus();
  var len = obj.value.length;

  if (document.selection) {
    var sel = obj.createTextRange();
    sel.moveStart('character', len);
    sel.collapse();
    sel.select();
  } else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
    obj.selectionStart = obj.selectionEnd = len;
  }
}

/**
 * 是否为由数字组成的字符串
 * @param {String} str 待检测的字符串
 * @returns {Boolean} 返回true/false
 */
var isDigitals = function isDigitals(str) {
  return /^[0-9]*$/.test(str);
};

/**
 * 是否存在指定函数
 * @param {String} funcName 传入函数名
 * @returns {Boolean} 返回true/false
 */
function isExitsFunction(funcName) {
  try {
    if (typeof eval(funcName) === 'function') {
      return true;
    }
  } catch (e) {}

  return false;
}

/**
 * 是否存在指定变量
 * @param {String} variableName 传入变量名称
 * @returns {Boolean} 返回true/false
 */
function isExitsVariable(variableName) {
  try {
    if (typeof variableName === 'undefined') {
      return false;
    } else {
      return true;
    }
  } catch (e) {}

  return false;
}

/**
 * getWindowSize获取窗口大小
 * @returns {Object} 返回宽高
 */
function getWindowSize() {
  var s = {
    width: 0,
    height: 0
  };

  if (window.innerWidth) {
    s.width = window.innerWidth;
    s.height = window.innerHeight;
  } else if (document.body && document.body.clientWidth) {
    s.width = document.body.clientWidth;
    s.height = document.body.clientHeight;
  } // 通过深入Document内部对body进行检测，获取窗口大小


  if (document.documentElement && document.documentElement.clientWidth) {
    s.width = document.documentElement.clientWidth;
    s.height = document.documentElement.clientHeight;
  }

  return s;
}

/**
 * 获取APP版本号
 * @param appName {String} app名称
 * @param withosstr {Boolean} 是否需要带上名称
 * @param userAgent {String} ua，可不传，默认取navigator.appVersion
 * @return {Boolean|null} null/true/false
 */
function getAppVersion(appName, withappstr, userAgent) {
  // console.log(getAppVersion("Chrome"));
  // const userAgent = navigator.userAgent;
  userAgent = userAgent || navigator.appVersion;
  var reg = eval('/' + appName + '\\/([\\d\\.]+)/');
  var isApp = userAgent.includes(appName);
  var ver = userAgent.match(reg, 'i'); // console.log(userAgent)
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

/**
 * 获取手机系统版本
 * @param osName {String} 系统类型字符串Android、iPod、iWatch或iPhone
 * @param withosstr {Boolean} 是否需要带上名称
 * @param userAgent {String} ua，可不传，默认取navigator.appVersion
 * @return {Boolean|null} null/true/false
 */

function getOsVersion(osName, withosstr, userAgent) {
  userAgent = userAgent || navigator.appVersion;
  var d = ['iPhone', 'iPad', 'iPod', 'iWatch', 'Mac', 'iMac', 'iOS'],
      name = osName,
      index = d.indexOf(osName);

  if (index > -1 && userAgent.indexOf('like Mac OS X') > -1) {
    name = 'OS';
  }

  var reg = eval('/' + name + '\\s[\\d\\_]+/');
  userAgent.includes(name);
  var ver = (userAgent.match(reg, 'ig') + '').replace(/\s/gi, '/').replace(/_/gi, '.');

  if (index > -1) {
    ver = ver.replace(/OS\//gi, osName + '/');
  } // console.log(userAgent, reg)
  // console.log(ver)


  return getAppVersion(osName, withosstr, ver);
}

/**
 * 版本号大小对比
 * @param appName {String} app名称
 * @param compareVer {String} 必传 需要对比的版本号
 * @param userAgent {String} ua，可不传，默认取navigator.appVersion
 * @return {Boolean|null} null/true/false
 */

function getIsAppVersionLastest(appName, compareVer, userAgent) {
  //console.log(getIsAppVersionLastest("Chrome","5.1"));
  userAgent = userAgent || navigator.appVersion;
  var basicVer = appName.indexOf('.') > 0 ? appName : getAppVersion(appName, false, userAgent); //兼容getIsAppVersionLastest("1.2.2","1.2.3")直接传入版本号的对比
  // var basicVer = "5.1.";

  if (basicVer === null) {
    return null;
  } //不是指定客户端


  if (basicVer === false) {
    return false;
  } //是指定客户端但是版本号未知


  basicVer = basicVer + '.';
  compareVer = compareVer + '.';
  var bStr = parseFloat(basicVer);
  var cStr = parseFloat(compareVer);
  var bStrNext = parseFloat(basicVer.replace(bStr + '.', '')) || 0;
  var cStrNext = parseFloat(compareVer.replace(cStr + '.', '')) || 0; // console.log(bStr + "-" + cStr)
  // console.log(basicVer.replace(bStr + ".","") + "-" + compareVer.replace(cStr + ".",""))
  // console.log(bStrNext + "-" + cStrNext)

  if (cStr > bStr) {
    return false;
  } else if (cStr < bStr) {
    return true;
  } else {
    if (bStrNext >= cStrNext) {
      return true;
    } else {
      return false;
    }
  }
}

/**
 * 获取目录形式URL参数
 * @param {String} url 传入url地址
 * @returns {Object} 返回参数对象
 */
function getDirParam(url) {
  var patt = new RegExp(/^http[s]?:\/\/[^\/]+([\s\S]*)/);
  var urlStr = url != '' && typeof url != 'undefined' ? url.replace(patt, '$1') : location.pathname; //获取url中域名后的字串:/post/0703/a1.html

  urlStr = urlStr.replace(/^\//, '');
  var dirParam = {};
  dirParam.host = url != '' && typeof url != 'undefined' ? url.match(/^http[s]?:\/\/[^\/]+/)[0] : location.host; //获取域名，包含http://

  if (urlStr.includes('/')) {
    //dirParam = unescape(urlStr).split("/");
    dirParam.path = decodeURI(urlStr).split('/');
  }

  return dirParam; //{"host":"http://192.168.2.243:7004","path":["media","video","chidaoyan.mp4"]}
}

/**
 * 获取单个URL参数
 * @param {String} name 参数名称
 * @returns 返回参数值
 */
function getParameter(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

/**
 * 文件后缀名
 * @param {String} url 文件名
 * @returns {String} 返回文件后缀
 */
function getFileType(url) {
  if (typeof url != 'string' || url == '') {
    return false;
  }

  var type = /\.[^\.]+$/.exec(url); //[".docx", index: 31, input: "http://192.168.2.243:7005/doc/2.docx"]

  return type[0].toLowerCase();
}

/* 获取URL参数 */

/*function getUrlParam(url){
	var urlStr = url != "" && url != null ? url.substr(url.indexOf("?")) : location.search;//获取url中"?"符后的字串
	var urlParam = [];
	if(urlStr.indexOf("?") != -1){
		var str = urlStr.substr(1);
		var strs = str.split("&");
		for(var i = 0;i < strs.length;i++){
			//urlParam[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			urlParam[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
		};
	};
	return urlParam;
}*/

/* 获取URL参数 */
// function getUrlParam(url) {
//   var urlStr = url != "" && typeof url != "undefined" ? url.substr(url.indexOf("?")) : location.search; //获取url中"?"符后的字串
//   var urlParam = [];
//   if (urlStr.includes("?")) {
//     var str = urlStr.substr(1);
//     var strs = str.split("&");
//     for (var i = 0; i < strs.length; i++) {
//       //urlParam[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
//       urlParam[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
//     };
//   };
//   return urlParam;
// }
// function getUrlParam(url) {
//   // url = (url != "" && typeof url != "undefined") ? url.substr(url.indexOf("?")) : location.search; //获取url中"?"符后的字串
//   var reg_url = /^[^\?]+\?([\w\W]+)$/,
//     reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
//     arr_url = reg_url.exec(url),
//     ret = {};
//   if (arr_url && arr_url[1]) {
//     var str_para = arr_url[1], result;
//     while ((result = reg_para.exec(str_para)) != null) {
//       ret[result[1]] = result[2];
//     }
//   }
//   return ret;
// }

/**
 * 获取URL参数
 * @param {String} url 传入url参数
 * @returns {Object} 返回参数列表
 */
function getUrlParam(url) {
  url = url !== '' && typeof url !== 'undefined' ? url.substr(url.indexOf('?')).split('#')[0] : location.search; //获取url中"?"符后的字串

  var search = url.substring(url.lastIndexOf('?') + 1);
  var obj = {};
  var reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, function (rs, $1, $2) {
    var name = decodeURIComponent($1);
    var val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

/**
 * 日期格式化插件
 * 使用方式：formatTime(new Date(), "yyyy-MM-dd")
 * @param {Date/String} time 时间对象或者字符串
 * @param {String} fmt 格式化风格
 * @returns {String} 返回字符串
 */
var formatTime = function formatTime(time, fmt) {
  if (fmt === void 0) {
    fmt = 'yyyy-MM-dd';
  }

  if (typeof time === 'string') {
    time = new Date(time);
  }

  var o = {
    'M+': time.getMonth() + 1,
    //月份
    'd+': time.getDate(),
    //日
    'h+': time.getHours(),
    //小时
    'm+': time.getMinutes(),
    //分
    's+': time.getSeconds(),
    //秒
    'q+': Math.floor((time.getMonth() + 3) / 3),
    //季度
    S: time.getMilliseconds() //毫秒

  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, ('' + time.getFullYear()).substr(4 - RegExp.$1.length));

  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
  }

  return fmt;
};

/**
 * 格式化时间成：刚刚、几分钟前
 * @param {Date/String} time 时间对象或者字符串
 * @param {String} fmt 格式化风格
 * @returns {String} 返回字符串
 */

function formatTimeStr(time, fmt) {
  if (time === void 0) {
    time = parseInt(time, 10);
  }

  var now = new Date().getTime();
  var format = fmt != '' && fmt != null ? fmt : 'MM-dd';
  var old = time;

  if (!old || old < 1) {
    return;
  }

  var t = now - old;
  var newTimeStr = '';

  if (t < 60 * 2) {
    newTimeStr = '刚刚';
  } else if (t < 60 * 60) {
    newTimeStr = parseInt(t / 60) + "\u5206\u949F\u524D";
  } else if (t < 60 * 60 * 24) {
    newTimeStr = parseInt(t / (60 * 60)) + "\u5C0F\u65F6\u524D";
  } else if (t < 60 * 60 * 24 * 30) {
    newTimeStr = parseInt(t / (60 * 60 * 24)) + "\u5929\u524D";
  } else {
    newTimeStr = formatTime(new Date(old), format);
  }

  return newTimeStr;
}

/**
 * setCookie写入cookie的方法
 * @param {String} name cookie名称
 * @param {String} value 设置要存储的值，可以是对象或字符串
 * @param {Number} seconds cookie有效时间默认1天
 * @param {String} path 路径，默认'/'
 * @param {Boolean} samesite SameSite，默认true
 */
function setCookie(name, value, seconds, path, samesite) {
  if (seconds === void 0) {
    seconds = 86400;
  }

  if (path === void 0) {
    path = '/';
  }

  if (samesite === void 0) {
    samesite = true;
  }

  var exp = new Date();
  exp.setTime(exp.getTime() + seconds * 1000);
  document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + exp.toGMTString() + ';path=' + path + (samesite && location.protocol === 'https:' ? ';SameSite=None;Secure' : '');
}

/**
 * setCache
 * @description 获取缓存，存入的如果是Object，取出的也是Object，不需要再转换
 * @param name {String} 缓存名称
 * @param value [String, Boolean, Number, Object] 缓存数据，可以直接传入Object
 * @param seconds {Number} 缓存时间（秒）
 * @returns value 返回数据，存的如果是对象，取出的也是对象
 */
function setCache(name, value, seconds) {
  var e = new Date(),
      expires = seconds ? e.getTime() + seconds * 1000 : '',
      o = {};
  o.value = value;
  o.expires = expires;
  o = JSON.stringify(o);
  localStorage.setItem(name, o);
}

/**
 * 写sessionStorage
 * @param {String} name 名称
 * @param {*} value 设置要存储的值，可以是对象或字符串
 * @param {Number} seconds 有效时间
 */
function setSession(name, value, seconds) {
  var e = new Date();
  var expires = seconds ? e.getTime() + seconds * 1000 : '';
  var obj = {};
  obj.value = value;
  obj.expires = expires;
  obj = JSON.stringify(obj);
  sessionStorage.setItem(name, obj);
}

/**
 * 读取cookies
 * @param {String} name cookie名称
 * @returns {String} 返回cookie字符串
 */
function getCookie(name) {
  var arr,
      reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  arr = document.cookie.match(reg);

  if (arr) {
    return decodeURIComponent(arr[2]);
  } else {
    return null;
  }
}

/**
 * getCache
 * @description 获取缓存，存入的如果是Object，取出的也是Object，不需要再转换
 * @param name {String} 缓存名称
 * @returns value 返回数据，存的如果是对象，取出的也是对象
 */
function getCache(name) {
  var str = localStorage.getItem(name),
      exp = new Date(),
      o;

  if (str) {
    try {
      o = JSON.parse(str);
    } catch (err) {
      o = str;
    }

    if (typeof o !== 'object') return o;
    if (!o.value) return null;

    if (!o.expires || o.expires > exp.getTime()) {
      return o.value;
    }

    localStorage.removeItem(name);
    return null;
  }

  return null;
}

/**
 * 读取sessionStorage
 * @param {String} name 名称
 * @returns {String} 返回sessionStorage
 */
function getSession(name) {
  var str = sessionStorage.getItem(name);
  var exp = new Date();

  if (str) {
    var obj = JSON.parse(str);

    if (!obj.hasOwnProperty('value') || !obj.hasOwnProperty('expires')) {
      return null;
    } else {
      if (!obj.expires || obj.expires > exp.getTime()) {
        return obj.value;
      } else {
        sessionStorage.removeItem(name);
        return null;
      }
    }
  } else {
    return null;
  }
}

/**
 * 删除cookie
 * @param {String} name cookie名称
 */

function delCookie(name) {
  var e = new Date();
  e.setTime(e.getTime() - 1);
  var cval = getCookie(name);

  if (cval !== null) {
    document.cookie = name + '=' + cval + ';expires=' + e.toGMTString() + ';path=/';
  }
}

/**
 * 删除localStorage
 * @param {String} name 名称
 */
function delCache(name) {
  localStorage.removeItem(name);
}

/**
 * 删除sessionStorage
 * @param {String} name 名称
 */
function delSession(name) {
  sessionStorage.removeItem(name);
}

/**
 * 编码Utf8
 * @param {String} input 需要编码的字符串
 * @returns {String} 返回UTF-8编码
 */
var encodeUtf8 = function encodeUtf8(string) {
  string = string.replace(/\r\n/g, '\n');
  var utftext = '';

  for (var n = 0; n < string.length; n++) {
    var c = string.charCodeAt(n);

    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if (c > 127 && c < 2048) {
      utftext += String.fromCharCode(c >> 6 | 192);
      utftext += String.fromCharCode(c & 63 | 128);
    } else {
      utftext += String.fromCharCode(c >> 12 | 224);
      utftext += String.fromCharCode(c >> 6 & 63 | 128);
      utftext += String.fromCharCode(c & 63 | 128);
    }
  }

  return utftext;
};

var _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
/**
 * 字符串、数字转base64
 * @param {String} input 需要编码的字符串
 * @returns {String} 返回BASE64编码
 */

var encodeBase64 = function encodeBase64(input) {
  var output = '';
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;
  input = encodeUtf8(input);

  while (i < input.length) {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = (chr1 & 3) << 4 | chr2 >> 4;
    enc3 = (chr2 & 15) << 2 | chr3 >> 6;
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }

    output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
  }

  return output;
};

/**
 * 解码Utf8
 * @param {String} input 需要解码的字符串
 * @returns {String} 解码后的字符串
 */
var decodeUtf8 = function decodeUtf8(utftext) {
  var string = '';
  var i = 0;
  var c = 0,
      c2 = 0,
      c3 = 0;

  while (i < utftext.length) {
    c = utftext.charCodeAt(i);

    if (c < 128) {
      string += String.fromCharCode(c);
      i++;
    } else if (c > 191 && c < 224) {
      c2 = utftext.charCodeAt(i + 1);
      string += String.fromCharCode((c & 31) << 6 | c2 & 63);
      i += 2;
    } else {
      c2 = utftext.charCodeAt(i + 1);
      c3 = utftext.charCodeAt(i + 2);
      string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
      i += 3;
    }
  }

  return string;
};

var _keyStr$1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
/**
 * base64解码
 * @param {String} input 需要解码的字符串
 * @returns {String} 解码后的字符串
 */

var decodeBase64 = function decodeBase64(input) {
  var output = '';
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

  while (i < input.length) {
    enc1 = _keyStr$1.indexOf(input.charAt(i++));
    enc2 = _keyStr$1.indexOf(input.charAt(i++));
    enc3 = _keyStr$1.indexOf(input.charAt(i++));
    enc4 = _keyStr$1.indexOf(input.charAt(i++));
    chr1 = enc1 << 2 | enc2 >> 4;
    chr2 = (enc2 & 15) << 4 | enc3 >> 2;
    chr3 = (enc3 & 3) << 6 | enc4;
    output = output + String.fromCharCode(chr1);

    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2);
    }

    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3);
    }
  }

  output = decodeUtf8(output);
  return output;
};

/**
 * 用*替换= 用!替换& 转码成微信跳转链接
 * name=exMall-detail-goodsInfoId&params[goodsInfoId]=8866 转成 name*exMall-detail-goodsInfoId!params(goodsInfoId)*8866
 * @param {String} string 传入字符串
 * @returns {String} 返回转码结果
 */
var enWxJumpLink = function enWxJumpLink(string) {
  return string // .replace(/[=]{1}/g, '~')
  .replace(/[=]{1}/g, '*') // .replace(/[&]{1}/g, '^')
  .replace(/[&]{1}/g, '!').replace(/[\[]{1}/g, '(').replace(/[\]]{1}/g, ')');
};

/**
 * 用~替换= 用^替换& 转码成微信跳转链接
 * @param {String} string 传入字符串
 * @returns {String} 返回转码结果
 */
var enWxJumpLinkOld = function enWxJumpLinkOld(string) {
  return string.replace(/[=]/gi, '~').replace(/[&]/gi, '^');
};

/**
 * 用=替换* 用&替换! 解码成微信跳转链接
 * name*exMall-detail-goodsInfoId!params(goodsInfoId)*8866 转成 name=exMall-detail-goodsInfoId&params[goodsInfoId]=8866
 * @param {String} string 传入字符串
 * @returns {String} 返回解码结果
 */
var deWxJumpLink = function deWxJumpLink(string) {
  return string // .replace(/[~]{1}/g, '=')
  .replace(/[*]{1}/g, '=') // .replace(/[\^]{1}/g, '&')
  .replace(/[!]{1}/g, '&').replace(/[\(]{1}/g, '[').replace(/[\)]{1}/g, ']');
};

/**
 * 用=替换~ 用&替换^ 解码成微信跳转链接
 * @param {String} string 传入字符串
 * @returns {String} 返回解码结果
 */
var deWxJumpLinkOld = function deWxJumpLinkOld(string) {
  return string.replace(/[~]/gi, '=').replace(/[\^]/gi, '&');
};

/**
 * 频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次
 * @param fn {function}  需要调用的函数
 * @param delay  {number}    延迟时间，单位毫秒
 * @param immediate  {bool} 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。
 * @return {function}实际调用函数
 */
var throttle = function throttle(fn, delay, immediate, debounce) {
  var curr = +new Date(),
      //当前事件
  last_call = 0,
      last_exec = 0,
      timer = null,
      diff,
      //时间差
  context,
      //上下文
  args,
      exec = function exec() {
    last_exec = curr;
    fn.apply(context, args);
  };

  return function () {
    curr = +new Date();
    context = this, args = arguments, diff = curr - (debounce ? last_call : last_exec) - delay;
    clearTimeout(timer);

    if (debounce) {
      if (immediate) {
        timer = setTimeout(exec, delay);
      } else if (diff >= 0) {
        exec();
      }
    } else {
      if (diff >= 0) {
        exec();
      } else if (immediate) {
        timer = setTimeout(exec, -diff);
      }
    }

    last_call = curr;
  };
};

/**
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，fn 才会执行
 * @param fn {function}  要调用的函数
 * @param delay   {number}    空闲时间
 * @param immediate  {bool} 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。
 * @return {function}实际调用函数
 */

var debounce = function debounce(fn, delay, immediate) {
  return throttle(fn, delay, immediate, true);
};

/**
 * 阻止冒泡
 * @param {Object} e dom的event对象
 * @returns {Boolean}
 */
function stopBubble(e) {
  if (e && e.preventDefault) {
    // Firefox
    e.stopPropagation(); //e.preventDefault();
  } else {
    // IE
    e.cancelBubble = true; //e.returnValue = false;
  }

  return false;
}

/**
 * 阻止默认事件
 * @param {Object} e dom的event对象
 * @returns {Boolean}
 */
function stopDefault(e) {
  if (e && e.preventDefault) {
    e.preventDefault();
  } else {
    window.event.returnValue = false;
  }

  return false;
}

/**
 * addEvent()事件委托，支持多次委托
 * @param {Object} element js dom对象
 * @param {String} type 事件类型。不需要加on
 * @param {Function} handler 回调方法
 */
var addEvent = function addEvent(element, type, handler) {
  if (element.addEventListener) {
    element.addEventListener(type, handler, false);
  } else {
    //为每一个事件处理函数分派一个唯一的ID
    if (!handler.$$guid) handler.$$guid = addEvent.guid++; //为元素的事件类型创建一个哈希表

    if (!element.events) element.events = {}; //为每一个"元素/事件"对创建一个事件处理程序的哈希表

    var handlers = element.events[type];

    if (!handlers) {
      handlers = element.events[type] = {}; //存储存在的事件处理函数(如果有)

      if (element['on' + type]) {
        handlers[0] = element['on' + type];
      }
    } //将事件处理函数存入哈希表


    handlers[handler.$$guid] = handler; //指派一个全局的事件处理函数来做所有的工作

    element['on' + type] = handleEvent;
  }
}; // a counter used to create unique IDs


addEvent.guid = 1;
/**
 * handleEvent()执行事件
 *
 * @param {String} event 事件类型
 * @returns {Boolean}
 */

function handleEvent(event) {
  var returnValue = true; //抓获事件对象(IE使用全局事件对象)

  event = event || fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event); //取得事件处理函数的哈希表的引用

  var handlers = this.events[event.type]; //执行每一个处理函数

  for (var i in handlers) {
    this.$$handleEvent = handlers[i];

    if (this.$$handleEvent(event) === false) {
      returnValue = false;
    }
  }

  return returnValue;
}
/**
 * 为IE的事件对象添加一些“缺失的”函数
 * @param {String} event 事件类型
 * @returns {Object} 返回补齐了缺失方法的的event
 */


function fixEvent(event) {
  //添加标准的W3C方法
  event.preventDefault = fixEvent.preventDefault;
  event.stopPropagation = fixEvent.stopPropagation;
  return event;
}

fixEvent.preventDefault = function () {
  this.returnValue = false;
};

fixEvent.stopPropagation = function () {
  this.cancelBubble = true;
};

/**
 * removeEvent移除由addEvent创建的事件委托
 * @param {Object} element js dom对象
 * @param {String} type 事件类型。不需要加on
 * @param {Function} handler 回调方法
 */
var removeEvent = function removeEvent(element, type, handler) {
  if (element.removeEventListener) {
    element.removeEventListener(type, handler, false);
  } else {
    //从哈希表中删除事件处理函数
    if (element.events && element.events[type]) {
      delete element.events[type][handler.$$guid];
    }
  }
};

/**
 * 获取滑动到顶部和底部 返回'top' 'bottom'，建议使用限流
 * @returns {String} 返回位置
 */
var getScrollPosition = function getScrollPosition() {
  var innerH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  var docScrollTop = document.documentElement.scrollTop;
  var bodyScrollTop = document.body.scrollTop;
  var docScrollHeight = document.documentElement.scrollHeight;
  var bodyScrollHeight = document.body.scrollHeight;
  var scrollT = 0,
      scrollH = 0;

  if (docScrollTop === 0) {
    scrollT = bodyScrollTop;
    scrollH = bodyScrollHeight;

    if (bodyScrollTop === 0) {
      return 'top';
    }
  } else {
    scrollT = docScrollTop;
    scrollH = docScrollHeight;
  } // if(bodyScrollTop === 0 && docScrollTop === 0){
  //   return 'top';
  // }


  if (innerH + Math.floor(scrollT) === scrollH || innerH + Math.ceil(scrollT) === scrollH) {
    return 'bottom';
  }
};

/**
 * @description 返回下一个zIndex值
 * @param {number} min 可选，最小值
 * @param {number} max 可选，最大值
 * @returns {Number} 数字
 */
function nextIndex(min, max) {
  if (min === void 0) {
    min = 5000;
  }

  if (max === void 0) {
    max = 10000;
  }

  var doms = [min];
  [].concat(document.querySelectorAll('body > *')).forEach(function (e) {
    var n = +window.getComputedStyle(e).zIndex || 0;
    n > min && n < max && doms.push(n);
  });
  doms.sort(function (a, b) {
    return b - a;
  });
  return doms[0] + 1;
}

/**
 * 截取小数点后几位，不足的不补0
 * @param [Number, String] number 要处理的数字，必填
 * @param number
 * @param {number} n 要保留的小数点位数，默认保留2位
 * @returns {number} 返回新数字
 */
function fixNumber(number, n) {
  if (n === void 0) {
    n = 2;
  }

  var reg = new RegExp('^(.*\\..{' + n + '}).*$');
  number += '';

  if (!/^(\-|\+)?\d+(\.\d+)?$/.test(number)) {
    console.warn('请传入数字');
    return number;
  }

  return parseFloat(number.replace(reg, '$1'), 10);
}

/**
 * @description 判断是否数组
 * @param {Array} arr
 */
function isArray(arr) {
  return Object.prototype.toString.call(arr).indexOf('Array') !== -1;
}

/**
 * getType
 * @description 获取目标类型
 * @param {any} target 目标
 * @returns {String} 类型
 */
function getType(target) {
  var type = {
    '[object Array]': 'array',
    '[object Boolean]': 'boolean',
    '[object Date]': 'date',
    '[object Function]': 'function',
    '[object Number]': 'number',
    '[object Object]': 'object',
    '[object RegExp]': 'regexp',
    '[object String]': 'string'
  };
  if (target === null) return target + '';
  return typeof target === 'object' || typeof target === 'function' ? type[Object.prototype.toString.call(target)] || 'object' : typeof target;
}

function isWindow(obj) {
  return obj !== null && obj === obj.window;
}

function isPlainObject(obj) {
  return getType(obj) === 'object' && !isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype;
} //对象扩展


var extend = function () {
  /**
   * @param target
   * @param source
   * @param deep
   */
  function extend(target, source, deep) {
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
          if (isPlainObject(source[key]) && !isPlainObject(target[key])) target[key] = {};
          if (isArray(source[key]) && !isArray(target[key])) target[key] = [];
          extend(target[key], source[key], deep);
        } else if (source[key] !== undefined) target[key] = source[key];
      }
    }
  }

  return function (target) {
    var deep,
        args = Array.prototype.slice.call(arguments, 1);

    if (typeof target === 'boolean') {
      deep = target;
      target = args.shift();
    }

    args.forEach(function (arg) {
      extend(target, arg, deep);
    });
    return target;
  };
}();

/**
 * @description 防抖节流
 * return {Object} class
 */
function delay() {
  return {
    map: {},
    register: function register(id, fn, time, boo) {
      var _this = this;

      // 注册
      if (boo) {
        // 防抖，一定时间内只触发第一次
        if (!this.map[id]) {
          // 不存在的先执行fn
          fn();
        }

        this.map[id] = {
          id: id,
          fn: fn,
          time: time,
          boo: boo,
          timeout: setTimeout(function () {
            _this.destroy(id);
          }, time)
        };
      } else {
        // 节流，一定时间内延迟执行
        if (this.map[id]) {
          // 已存在的先销毁
          this.destroy(id);
        }

        this.map[id] = {
          id: id,
          fn: fn,
          time: time,
          boo: boo,
          timeout: setTimeout(fn, time)
        };
      }
    },
    destroy: function destroy(id) {
      // 销毁
      if (!this.map[id]) {
        return;
      }

      clearTimeout(this.map[id].timeout);
      delete this.map[id];
    }
  };
}

/**
 * @description: 数据清洗方法
 * @param {object} data 要清洗的对象，必传
 * @param [Object, Array] map 需要的数据队列，可传数组或者对象
 * @param map
 * @param nullFix
 * @param map
 * @param nullFix
 * @param [Object, Array, String, Number, Boolean] nullFix 选填，没有对应属性时返回的值，默认不返回该属性
 * @returns {object} 返回清洗后的对象
 */

function cleanData(data, map, nullFix) {
  var result = {};
  if (!data) return;
  if (!map) return data;

  if (isArray(map)) {
    map.forEach(function (key) {
      if (data.hasOwnProperty(key)) {
        result[key] = data[key];
      } else if (typeof nullFix !== 'undefined') {
        result[key] = nullFix;
      }
    });
  } else if (typeof map === 'object') {
    for (var key in map) {
      if (typeof map[key] === 'function') {
        result[key] = map[key](data);
      } else {
        if (!map[key]) map[key] = key;

        if (data.hasOwnProperty(map[key])) {
          result[key] = data[map[key]];
        } else if (typeof nullFix !== 'undefined') {
          result[key] = nullFix;
        }
      }
    }
  }

  return result;
}

export { addEvent, camel2Dash, cleanData, clearAttr, clearBr, clearHtml, clearHtmlExpSN, clearHtmlN, clearHtmlNS, clearHtmlTag, client, cutCHSString, dash2Camel, deWxJumpLink, deWxJumpLinkOld, debounce, decodeBase64, decodeUtf8, delCache, delCookie, delSession, delay, enWxJumpLink, enWxJumpLinkOld, encodeBase64, encodeUtf8, extend, fixNumber, formatTime, formatTimeStr, getAppVersion, getCHSLength, getCache, getCookie, getDirParam, getFileType, getIsAppVersionLastest, getNumber, getOsVersion, getParameter, getRandomNum, getRandomStr, getRandomStrWidthSpecialChar, getScrollPosition, getSession, getType, getUrlParam, getWindowSize, imgAdapt, imgChoose, isArray, isDigitals, isExitsFunction, isExitsVariable, nextIndex, pattern$1 as pattern, removeEvent, setCache, setCookie, setSession, stopBubble, stopDefault, textareaInsertText, textareaMoveToEnd, throttle, trim, upperFirst };
