/**
 * client方法返回一个浏览器判断结果：`{ ANDROID: true, GECKO: true, GLSH_APP: false, IE: false, IOS: false, IPAD: false, IPHONE: false, MOBILE: true, MOBILEDEVICE: true, OPERA: false, QQ: false, QQBROWSER: false, TRIDENT: false, WEBKIT: true, WEIXIN: false }`
 *
 * @param name - 可选，比如传入MicroMessenger，返回是否为微信内置浏览器
 * @param userAgent - 可选，传入自定义的ua，默认取浏览器的navigator.appVersion
 * @returns 返回常用ua匹配表，如果传了name，那么返回是否匹配该终端true/false
 */
const client = (name = '', userAgent = navigator.appVersion) => {
    const userAgentL = userAgent.toLowerCase();
    if (name) {
        return userAgent.indexOf(name) > -1;
    }
    else {
        return {
            // @ts-ignore
            IE: userAgentL.indexOf('msie') > -1 && !userAgentL.indexOf('opera') > -1,
            // @ts-ignore
            GECKO: userAgentL.indexOf('gecko') > -1 && !userAgentL.indexOf('khtml') > -1,
            WEBKIT: userAgentL.indexOf('applewebkit') > -1,
            OPERA: userAgentL.indexOf('opera') > -1 && userAgentL.indexOf('presto') > -1,
            TRIDENT: userAgentL.indexOf('trident') > -1,
            MOBILE: !!userAgent.match(/AppleWebKit.*Mobile.*/),
            // MOBILEDEVICE: !!userAgentL.match(/iphone|android|phone|mobile|wap|netfront|x11|java|opera mobi|opera mini|ucweb|windows ce|symbian|symbianos|series|webos|sony|blackberry|dopod|nokia|samsung|palmsource|xda|pieplus|meizu|midp|cldc|motorola|foma|docomo|up.browser|up.link|blazer|helio|hosin|huawei|novarra|coolpad|webos|techfaith|palmsource|alcatel|amoi|ktouch|nexian|ericsson|philips|sagem|wellcom|bunjalloo|maui|smartphone|iemobile|spice|bird|zte-|longcos|pantech|gionee|portalmmm|jig browser|hiptop|benq|haier|^lct|320x320|240x320|176x220/i), // 是否为移动终端
            IOS: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            ANDROID: userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1,
            IPHONE: userAgent.indexOf('iPhone') > -1,
            IPAD: userAgent.indexOf('iPad') > -1,
            // WEBAPP: !userAgent.indexOf('Safari') > -1, //是否web应该程序，没有头部与底部
            QQBROWSER: userAgent.indexOf('QQBrowser') > -1,
            WEIXIN: userAgent.indexOf('MicroMessenger') > -1,
            // @ts-ignore
            QQ: userAgent.match(/\sQQ/i) === ' qq' // 是否QQ
        };
    }
};

/**
 * pattern返回一些常用的正则：any, arrjson, chinese, email, float, isjson, json, mobile, number, pass, postcode, qq, string, tel, textarea, url, username
 *
 * @returns 返回对象
 */
var pattern = {
    any: /[\w\W]+/,
    number: /^\d+$/,
    string: /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/,
    postcode: /^[0-9]{6}$/,
    url: /^(\w+:\/\/)?\w+(\.\w+)+.*$/,
    username: /^[a-zA-Z0-9\_\-\.]{3,15}$/,
    float: /^[0-9]+\.{0,1}[0-9]{0,2}$/,
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

/**
 * trim()根据传参来去除空格
 *
 * @param string - 传入字符串
 * @param type - 可选，去除空格的类型l:去除开头空格 r:去除尾部空格 lr:去除两端空格，为空的话去除所有空格
 * @returns 返回新字符串
 */
function trim(string, type = '') {
    if (!type) {
        return string.replace(/\s/g, '');
    }
    else if (type === 'l' || type === 'left') {
        return string.replace(/^\s*/, '');
    }
    else if (type === 'r' || type === 'right') {
        return string.replace(/\s*$/, '');
    }
    else if (type === 'lr' || type === 'around') {
        return string.replace(/(^\s*)|(\s*$)/g, '');
    }
}

/**
 * 去除HTML标签所有属性
 *
 * @param string - 传入字符串
 * @returns newString
 */
function clearAttr(string) {
    return string.replace(/<([a-zA-Z1-7]+)\s*[^><]*>/g, '<$1>');
}

/**
 * 去除换行
 *
 * @param string - 带html标签的字符串
 * @returns newString
 */
function clearBr(string) {
    return string
        .replace(/<\/br>/g, '')
        .replace(/<br>/g, '')
        .replace(/[\r\n]/g, '');
}

/**
 * 去除HTML标签
 *
 * @param string - 带html标签的字符串
 * @returns newString
 */
function clearHtml(string) {
    return string.replace(/<\/?.+?>/g, '').replace(/[\r\n]/g, '');
}

/**
 * 去除HTML标签保留空格、换行
 *
 * @param string - 带html标签的字符串
 * @returns newString
 */
function clearHtmlExpSN(string) {
    return string.replace(/<\/?[^\/?(br)][^><]*>/gi, '');
}

/**
 * 去除HTML标签及换行
 *
 * @param string - 带html标签的字符串
 * @returns newString
 */
function clearHtmlN(string) {
    return string.replace(/<\/?.+?>|[\r\n]/g, '');
}

/**
 * 去除HTML标签及空格、换行
 *
 * @param string - 带html标签的字符串
 * @returns newString
 */
function clearHtmlNS(string) {
    return string.replace(/<\/?.+?>|[\r\n\s]|(\ )/g, '');
}

/**
 * 去除HTML标签及标签里面的文字
 *
 * @param string - 带html标签的字符串
 * @returns newString
 */
function clearHtmlTag(string) {
    return string.replace(/<[^>]+>/g, '');
}

/**
 * 获取字符串中的数字
 *
 * @param string - 传入带数字的字符串
 * @returns 返回纯数字字符串
 */
function getNumber(string) {
    return string.replace(/[^0-9.]/gi, '');
}

/**
 * 扩展图片自动适应多种分辨率small original
 *
 * @param imgurl - 图片url
 * @param size - 图片规格
 * @returns 返回新地址
 */
function imgAdapt(imgurl, size) {
    if (!imgurl) {
        return false;
    }
    var imgPre = '';
    var urlReg = new RegExp('(.jpg|.png|.gif|.jpeg|.bmp|.webx)$', 'i');
    // var preReg = new RegExp('([.small|.original].jpg|.png|.gif|.jpeg|.bmp|.webx)$', 'i') // 匹配.small.jpg .original.jpg
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
    }
    //	return this.replace(preReg,"").replace(urlReg,"$1" + imgPre + "$1");
    //return this.replace(urlReg,"$1" + imgPre + "$1");
}

/**
 * 扩展图片自动适应多种分辨率`@2x @3x`
 *
 * @param imgurl - 图片地址
 * @returns 返回新地址
 */
function imgChoose(imgurl) {
    var width = window.innerWidth;
    var imgPre = '';
    var urlReg = new RegExp('(.jpg|.png|.gif|.jpeg|.bmp)', 'i');
    var preReg = new RegExp('(@[2|3]x)', 'i'); //匹配@2x @3x
    if (width >= 480) {
        imgPre = '@3x';
    }
    else if (width >= 320) {
        imgPre = '@2x';
    }
    else if (width >= 240) {
        imgPre = '';
    }
    return imgurl.replace(preReg, '').replace(urlReg, imgPre + '$1');
}

/**
 * 将驼峰字符串转成-间隔且全小写的Dash模式
 *
 * @param string - 需要转换的字符串
 * @returns 返回转换后的字符串
 */
function camel2Dash(string) {
    return string
        .replace(/([A-Z]{1,1})/g, '-$1')
        .replace(/^-/, '')
        .toLocaleLowerCase();
}

/**
 * 将-间隔且全小写的Dash模式转成驼峰字符串
 *
 * @param string - 需要转换的字符串
 * @returns 返回转换后的字符串
 */
function dash2Camel(string) {
    return string.replace(/[\-]{1,1}([a-z]{1,1})/g, function () {
        return arguments[1].toLocaleUpperCase();
    });
}

/**
 * 首字母大写
 *
 * @param string - 需要转换的字符串
 * @returns 返回转换后的字符串
 */
function upperFirst(string) {
    return string.slice(0, 1).toLocaleUpperCase() + string.slice(1);
}

/**
 * 获取随机整数
 *
 * @param min - 随机数的最小值
 * @param max - 随机数的最大值
 * @returns 返回数字
 */
function getRandomNum(min = 1, max = 10) {
    var Range = max - min;
    var Rand = Math.random();
    return min + Math.round(Rand * Range);
}

/**
 * 获取随机字符串
 *
 * @param len - 需要获取随机字符串的长度
 * @param widthSpecialChar - 可选，是否需要生成带特殊字符的串
 * @returns 随机串
 */
function getRandomStr(len = 32, widthSpecialChar = false) {
    var chars = !widthSpecialChar ? 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' : 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678~!@#$^&*_+=-.'; //默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    //var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    var maxPos = chars.length;
    var str = '';
    for (var i = 0; i < len; i++) {
        str += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
}

/**
 * 获取随机字符串带特殊符号
 *
 * @param len - 需要获取随机字符串的长度
 * @returns 随机串
 */
function getRandomStrWidthSpecialChar(len = 32) {
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678~!@#$^&*_+=-.'; //默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    var maxPos = chars.length;
    var str = '';
    for (var i = 0; i < len; i++) {
        str += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
}

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
 *
 * @param str - 字符串
 * @returns 返回长度
 */
function getCHSLength(str) {
    return str.replace(/[^\x00-\xff]/g, '**').length;
}

/**
 * js截取字符串，中英文都能用
 * @private
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
 *
 * @param str - 要截取的字符串
 * @param len -
 * @param hasDot -
 * @returns 返回截取后的字符串
 */
function cutCHSString(str, len = str.length, hasDot = false) {
    if (str == '' || !str) {
        return '';
    }
    else {
        var newLength = 0;
        var newStr = '';
        var chineseRegex = /[^\x00-\xff]/g;
        var singleChar = '';
        var strLength = str.replace(chineseRegex, '**').length;
        for (var i = 0; i < strLength; i++) {
            singleChar = str.charAt(i).toString();
            if (singleChar.match(chineseRegex) != null) {
                newLength += 2;
            }
            else {
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
 *
 * @param obj-  dom对象
 * @param str - 要插入的文字
 */
function textareaInsertText(obj, str) {
    if (document.selection) {
        // IE
        var sel = document.selection.createRange();
        sel.text = str;
    }
    else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart, endPos = obj.selectionEnd, curPos = startPos, tmpStr = obj.value;
        obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
        curPos += str.length;
        setTimeout(function () {
            obj.selectionStart = obj.selectionEnd = curPos;
        }, 0);
    }
    else {
        obj.value += str;
    }
}

/**
 * textarea或input对象将光标定位到文字尾部
 *
 * @param obj - dom对象
 */
function textareaMoveToEnd(obj) {
    obj.focus();
    var len = obj.value.length;
    if (document.selection) {
        var sel = obj.createTextRange();
        sel.moveStart('character', len);
        sel.collapse();
        sel.select();
    }
    else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
        obj.selectionStart = obj.selectionEnd = len;
    }
}

/**
 * 是否为由数字组成的字符串
 *
 * @param str - 待检测的字符串
 * @returns 返回true/false
 */
function isDigitals(str) {
    return /^[0-9]*$/.test(str);
}

/**
 * 是否存在指定函数
 *
 * @param funcName - 传入函数名
 * @returns 返回true/false
 */
function isExitsFunction(funcName) {
    try {
        if (typeof eval(funcName) === 'function') {
            return true;
        }
    }
    catch (_a) { }
    return false;
}

/**
 * 是否存在指定变量
 *
 * @param variableName - 传入变量名称
 * @returns 返回true/false
 */
function isExitsVariable(variableName) {
    try {
        if (typeof variableName === 'undefined') {
            return false;
        }
        else {
            return true;
        }
    }
    catch (_a) { }
    return false;
}

/**
 * getWindowSize获取窗口大小
 *
 * @returns 返回宽高
 */
function getWindowSize() {
    var s = { width: 0, height: 0 };
    if (window.innerWidth) {
        s.width = window.innerWidth;
        s.height = window.innerHeight;
    }
    else if (document.body && document.body.clientWidth) {
        s.width = document.body.clientWidth;
        s.height = document.body.clientHeight;
    }
    // 通过深入Document内部对body进行检测，获取窗口大小
    if (document.documentElement && document.documentElement.clientWidth) {
        s.width = document.documentElement.clientWidth;
        s.height = document.documentElement.clientHeight;
    }
    return s;
}

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
    var ver = userAgent.match(reg);
    // console.log(userAgent)
    // console.log(ver)
    // withappstr = typeof(withappstr) != "undefined" ? withappstr : false;
    if (ver) {
        if (withappstr) {
            //需要带上app名称，完整输出
            return ver ? ver[0] : '';
        }
        else {
            return ver ? ver[1] : '';
        }
    }
    else {
        if (isApp) {
            //是指定客户端但是版本号未知
            console.log(appName + '\u672A\u77E5\u7248\u672C\u53F7');
            return false;
        }
        else {
            //不是指定客户端
            console.log(appName + '\u4E0D\u5B58\u5728');
            return null;
        }
    }
}

/**
 * 获取手机系统版本
 *
 * @param osName - 系统类型字符串Android、iPod、iWatch或iPhone
 * @param withosstr - 是否需要带上名称
 * @param userAgent - ua，可不传，默认取navigator.appVersion
 * @return null/true/false
 */
function getOsVersion(osName, withosstr, userAgent) {
    userAgent = userAgent || navigator.appVersion;
    var d = ['iPhone', 'iPad', 'iPod', 'iWatch', 'Mac', 'iMac', 'iOS'], name = osName, index = d.indexOf(osName);
    if (index > -1 && userAgent.indexOf('like Mac OS X') > -1) {
        name = 'OS';
    }
    var reg = eval('/' + name + '\\s[\\d\\_]+/ig');
    // var isApp = userAgent.includes(name)
    var ver = (userAgent.match(reg) + '').replace(/\s/gi, '/').replace(/_/gi, '.');
    if (index > -1) {
        ver = ver.replace(/OS\//gi, osName + '/');
    }
    return getAppVersion(osName, withosstr, ver);
}

/**
 * 版本号大小对比
 *
 * @param appName - app名称
 * @param compareVer - 必传 需要对比的版本号
 * @param userAgent - ua，可不传，默认取navigator.appVersion
 * @return null/true/false
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
    var cStrNext = parseFloat(compareVer.replace(cStr + '.', '')) || 0;
    // console.log(bStr + "-" + cStr)
    // console.log(basicVer.replace(bStr + ".","") + "-" + compareVer.replace(cStr + ".",""))
    // console.log(bStrNext + "-" + cStrNext)
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

/**
 * 获取目录形式URL参数
 *
 * @param url - 传入url地址
 * @returns 返回参数对象
 */
function getDirParam(url) {
    var urlStr = url !== '' && typeof url !== 'undefined' ? url.replace(/^http[s]?:\/\/[^\/]+([\s\S]*)/, '$1') : location.pathname; // 获取url中域名后的字串:/post/0703/a1.html
    urlStr = urlStr.replace(/^\//, '');
    var dirParam = {};
    // 获取域名，包含http://
    if (url !== '' && typeof url !== 'undefined') {
        var match = url.match(/^http[s]?:\/\/[^\/]+/);
        if (match)
            dirParam.host = match[0];
    }
    else
        dirParam.host = location.host;
    if (urlStr.includes('/')) {
        //dirParam = unescape(urlStr).split("/");
        dirParam.path = decodeURI(urlStr).split('/');
    }
    return dirParam; //{"host":"http://192.168.2.243:7004","path":["media","video","chidaoyan.mp4"]}
}

/**
 * 获取单个URL参数
 *
 * @param name - 参数名称
 * @returns 返回参数值
 */
function getParameter(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}

/**
 * 文件后缀名
 *
 * @param url - 文件名
 * @returns 返回文件后缀
 */
function getFileType(url) {
    if (typeof url != 'string' || url == '') {
        return null;
    }
    var type = /\.[^\.]+$/.exec(url); //[".docx", index: 31, input: "http://192.168.2.243:7005/doc/2.docx"]
    return type ? type[0].toLowerCase() : null;
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
 *
 * @param url - 传入url参数
 * @returns 返回参数列表
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
 *
 * @example 使用方式
 * ```js
 * formatTime(new Date(), "yyyy-MM-dd")
 * ```
 * @param time - 时间对象或者字符串
 * @param fmt - 格式化风格
 * @returns 返回字符串
 */
function formatTime(time, fmt = 'yyyy-MM-dd') {
    if (typeof time === 'string') {
        time = new Date(time);
    }
    var o = {
        'M+': time.getMonth() + 1,
        'd+': time.getDate(),
        'h+': time.getHours(),
        'm+': time.getMinutes(),
        's+': time.getSeconds(),
        'q+': Math.floor((time.getMonth() + 3) / 3),
        S: time.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, ('' + time.getFullYear()).substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
    return fmt;
}

/**
 * 格式化时间成：刚刚、几分钟前
 *
 * @param time - 时间对象或者字符串
 * @param fmt - 格式化风格
 * @returns 返回字符串
 */
function formatTimeStr(time, fmt) {
    var now = new Date().getTime();
    var format = fmt != '' && fmt != null ? fmt : 'MM-dd';
    if (typeof time === 'string')
        time = parseInt(time, 10);
    if (!time || time < 1)
        return '';
    var t = now - time;
    var newTimeStr = '';
    if (t < 60 * 2) {
        newTimeStr = '刚刚';
    }
    else if (t < 60 * 60) {
        newTimeStr = parseInt('' + t / 60) + '\u5206\u949F\u524D';
    }
    else if (t < 60 * 60 * 24) {
        newTimeStr = parseInt('' + t / (60 * 60)) + '\u5C0F\u65F6\u524D';
    }
    else if (t < 60 * 60 * 24 * 30) {
        newTimeStr = parseInt('' + t / (60 * 60 * 24)) + '\u5929\u524D';
    }
    else {
        newTimeStr = formatTime(new Date(time), format);
    }
    return newTimeStr;
}

/**
 * setCookie写入cookie的方法
 *
 * @param name - cookie名称
 * @param value - 设置要存储的值，可以是对象或字符串
 * @param seconds - cookie有效时间默认1天
 * @param path - 路径，默认'/'
 * @param samesite - SameSite，默认true
 */
function setCookie(name, value, seconds = 86400, path = '/', samesite = true) {
    var exp = new Date();
    exp.setTime(exp.getTime() + seconds * 1000);
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + exp.toUTCString() + ';path=' + path + (samesite && location.protocol === 'https:' ? ';SameSite=None;Secure' : '');
}

/**
 * 获取缓存，存入的如果是Object，取出的也是Object，不需要再转换
 *
 * @param name - 缓存名称
 * @param value - 缓存数据，可以直接传入Object
 * @param seconds -缓存时间（秒）
 * @returns 返回数据，存的如果是对象，取出的也是对象
 */
function setCache(name, value, seconds) {
    let e = new Date(), expires = seconds ? e.getTime() + seconds * 1000 : '', o = {};
    o.value = value;
    o.expires = expires;
    localStorage.setItem(name, JSON.stringify(o));
}

/**
 * 写sessionStorage
 *
 * @param name - 名称
 * @param value - 设置要存储的值，可以是对象或字符串
 * @param seconds - 有效时间
 */
function setSession(name, value, seconds) {
    var e = new Date();
    var expires = seconds ? e.getTime() + seconds * 1000 : '';
    var obj = {};
    obj.value = value;
    obj.expires = expires;
    sessionStorage.setItem(name, JSON.stringify(obj));
}

/**
 * 读取cookies
 *
 * @param name - cookie名称
 * @returns 返回cookie字符串
 */
function getCookie(name) {
    var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    arr = document.cookie.match(reg);
    if (arr) {
        return decodeURIComponent(arr[2]);
    }
    else {
        return null;
    }
}

/**
 * 获取缓存，存入的如果是Object，取出的也是Object，不需要再转换
 *
 * @param name - 缓存名称
 * @returns 返回数据，存的如果是对象，取出的也是对象
 */
function getCache(name) {
    let str = localStorage.getItem(name), exp = new Date(), o;
    if (str) {
        try {
            o = JSON.parse(str);
        }
        catch (err) {
            o = str;
        }
        if (typeof o !== 'object')
            return o;
        if (!o.value)
            return null;
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
 *
 * @param name - 名称
 * @returns 返回sessionStorage
 */
function getSession(name) {
    var str = sessionStorage.getItem(name);
    var exp = new Date();
    if (str) {
        var obj = JSON.parse(str);
        if (!obj.hasOwnProperty('value') || !obj.hasOwnProperty('expires')) {
            return null;
        }
        else {
            if (!obj.expires || obj.expires > exp.getTime()) {
                return obj.value;
            }
            else {
                sessionStorage.removeItem(name);
                return null;
            }
        }
    }
    else {
        return null;
    }
}

/**
 * 删除cookie
 *
 * @param name - cookie名称
 */
function delCookie(name) {
    var e = new Date();
    e.setTime(e.getTime() - 1);
    var cval = getCookie(name);
    if (cval !== null) {
        document.cookie = name + '=' + cval + ';expires=' + e.toUTCString() + ';path=/';
    }
}

/**
 * 删除localStorage
 *
 * @param name - 名称
 */
function delCache(name) {
    localStorage.removeItem(name);
}

/**
 * 删除sessionStorage
 *
 * @param name - 名称
 */
function delSession(name) {
    sessionStorage.removeItem(name);
}

/**
 * 编码Utf8
 *
 * @param input - 需要编码的字符串
 * @returns 返回UTF-8编码
 */
function encodeUtf8(string) {
    string = string.replace(/\r\n/g, '\n');
    var utftext = '';
    for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        }
        else if (c > 127 && c < 2048) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }
    }
    return utftext;
}

const _keyStr$1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
/**
 * 字符串、数字转base64
 *
 * @param input - 需要编码的字符串
 * @returns 返回BASE64编码
 */
function encodeBase64(input) {
    var output = '';
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = encodeUtf8(input);
    while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        }
        else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output + _keyStr$1.charAt(enc1) + _keyStr$1.charAt(enc2) + _keyStr$1.charAt(enc3) + _keyStr$1.charAt(enc4);
    }
    return output;
}

/**
 * 解码Utf8
 *
 * @param input - 需要解码的字符串
 * @returns 解码后的字符串
 */
function decodeUtf8(utftext) {
    var string = '';
    var i = 0;
    var c = 0, 
    // c1 = 0,
    c2 = 0, c3 = 0;
    while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        }
        else if (c > 191 && c < 224) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        }
        else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    return string;
}

const _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
/**
 * base64解码
 *
 * @param input - 需要解码的字符串
 * @returns 解码后的字符串
 */
function decodeBase64(input) {
    var output = '';
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    while (i < input.length) {
        enc1 = _keyStr.indexOf(input.charAt(i++));
        enc2 = _keyStr.indexOf(input.charAt(i++));
        enc3 = _keyStr.indexOf(input.charAt(i++));
        enc4 = _keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
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
}

/**
 * 用*替换= 用!替换& 转码成微信跳转链接
 * name=exMall-detail-goodsInfoId&params[goodsInfoId]=8866 转成 name*exMall-detail-goodsInfoId!params(goodsInfoId)*8866
 *
 * @param string - 传入字符串
 * @returns 返回转码结果
 */
function enWxJumpLink(string) {
    return (string
        // .replace(/[=]{1}/g, '~')
        .replace(/[=]{1}/g, '*')
        // .replace(/[&]{1}/g, '^')
        .replace(/[&]{1}/g, '!')
        .replace(/[\[]{1}/g, '(')
        .replace(/[\]]{1}/g, ')'));
}

/**
 * 用~替换= 用^替换& 转码成微信跳转链接
 *
 * @param string - 传入字符串
 * @returns 返回转码结果
 */
function enWxJumpLinkOld(string) {
    return string.replace(/[=]/gi, '~').replace(/[&]/gi, '^');
}

/**
 * 用=替换* 用&替换! 解码成微信跳转链接
 * name*exMall-detail-goodsInfoId!params(goodsInfoId)*8866 转成 name=exMall-detail-goodsInfoId&params[goodsInfoId]=8866
 *
 * @param string - 传入字符串
 * @returns 返回解码结果
 */
function deWxJumpLink(string) {
    return (string
        // .replace(/[~]{1}/g, '=')
        .replace(/[*]{1}/g, '=')
        // .replace(/[\^]{1}/g, '&')
        .replace(/[!]{1}/g, '&')
        .replace(/[\(]{1}/g, '[')
        .replace(/[\)]{1}/g, ']'));
}

/**
 * 用=替换~ 用&替换^ 解码成微信跳转链接
 *
 * @param string - 传入字符串
 * @returns 返回解码结果
 */
function deWxJumpLinkOld(string) {
    return string.replace(/[~]/gi, '=').replace(/[\^]/gi, '&');
}

/**
 * 频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次
 *
 * @param fn - 需要调用的函数
 * @param delay - 延迟时间，单位毫秒
 * @param immediate - 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。
 * @return 实际调用函数
 */
function throttle(fn, delay, immediate, debounce) {
    var curr = +new Date(), //当前事件
    last_call = 0, last_exec = 0, timer, diff, // 时间差
    context, //上下文
    args, exec = function () {
        last_exec = curr;
        fn.apply(context, args);
    };
    return function () {
        curr = +new Date();
        (context = this), (args = arguments), (diff = curr - (debounce ? last_call : last_exec) - delay);
        clearTimeout(timer);
        if (debounce) {
            if (immediate) {
                timer = setTimeout(exec, delay);
            }
            else if (diff >= 0) {
                exec();
            }
        }
        else {
            if (diff >= 0) {
                exec();
            }
            else if (immediate) {
                timer = setTimeout(exec, -diff);
            }
        }
        last_call = curr;
    };
}

/**
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，fn 才会执行
 *
 * @param fn - 要调用的函数
 * @param delay - 空闲时间
 * @param immediate - 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。
 * @return 实际调用函数
 */
function debounce(fn, delay, immediate) {
    return throttle(fn, delay, immediate, true);
}

/**
 * 阻止冒泡
 *
 * @param e - dom的event对象
 * @returns bool false
 */
function stopBubble(e) {
    if (e && e.stopPropagation) {
        // Firefox
        e.stopPropagation(); // e.preventDefault();
    }
    else {
        // IE
        e.cancelBubble = true; // e.returnValue = false;
    }
    return false;
}

/**
 * 阻止默认事件
 *
 * @param e - dom的event对象
 * @returns bool false
 */
function stopDefault(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    }
    else {
        window.event.returnValue = false;
    }
    return false;
}

// export interface CustomEvent extends Event {
//     returnValue: boolean
//     cancelBubble: boolean
// }
/**
 * addEvent()事件委托，支持多次委托
 *
 * @param element - js dom对象
 * @param type - 事件类型。不需要加on
 * @param handler - 回调方法
 */
function addEvent(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    }
    else {
        //为每一个事件处理函数分派一个唯一的ID
        if (!handler.$$guid)
            handler.$$guid = addEvent.guid++;
        //为元素的事件类型创建一个哈希表
        if (!element.events)
            element.events = {};
        //为每一个"元素/事件"对创建一个事件处理程序的哈希表
        var handlers = element.events[type];
        if (!handlers) {
            handlers = element.events[type] = {};
            //存储存在的事件处理函数(如果有)
            if (element['on' + type]) {
                handlers[0] = element['on' + type];
            }
        }
        //将事件处理函数存入哈希表
        handlers[handler.$$guid] = handler;
        //指派一个全局的事件处理函数来做所有的工作
        element['on' + type] = handleEvent;
    }
}
// a counter used to create unique IDs
addEvent.guid = 1;
/**
 * handleEvent()执行事件
 *
 * @private
 * @param event - 事件类型
 * @returns returnValue
 */
function handleEvent(event) {
    var returnValue = true;
    //抓获事件对象(IE使用全局事件对象)
    // @ts-ignore
    event = event || fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event);
    // 取得事件处理函数的哈希表的引用
    // @ts-ignore
    var handlers = this.events[event.type];
    //执行每一个处理函数
    for (var i in handlers) {
        this.$$handleEvent = handlers[i];
        // @ts-ignore
        if (this.$$handleEvent(event) === false) {
            returnValue = false;
        }
    }
    return returnValue;
}
/**
 * 为IE的事件对象添加一些“缺失的”函数
 *
 * @private
 * @param event - 事件类型
 * @returns event 返回补齐了缺失方法的的event
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
 *
 * @param element - js dom对象
 * @param type - 事件类型。不需要加on
 * @param handler - 回调方法
 */
function removeEvent(element, type, handler) {
    if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
    }
    else {
        //从哈希表中删除事件处理函数
        if (element.events && element.events[type]) {
            delete element.events[type][handler.$$guid];
        }
    }
}

/**
 * 获取滑动到顶部和底部 返回'top' 'bottom'，建议使用限流
 *
 * @returns 返回位置
 */
const getScrollPosition = () => {
    var innerH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var docScrollTop = document.documentElement.scrollTop;
    var bodyScrollTop = document.body.scrollTop;
    var docScrollHeight = document.documentElement.scrollHeight;
    var bodyScrollHeight = document.body.scrollHeight;
    var scrollT = 0, scrollH = 0;
    if (docScrollTop === 0) {
        scrollT = bodyScrollTop;
        scrollH = bodyScrollHeight;
        if (bodyScrollTop === 0) {
            return 'top';
        }
    }
    else {
        scrollT = docScrollTop;
        scrollH = docScrollHeight;
    }
    // if(bodyScrollTop === 0 && docScrollTop === 0){
    //   return 'top';
    // }
    if (innerH + Math.floor(scrollT) === scrollH || innerH + Math.ceil(scrollT) === scrollH) {
        return 'bottom';
    }
};

/**
 * 返回下一个zIndex值
 *
 * @param min - 可选，最小值
 * @param max - 可选，最大值
 * @returns 数字
 */
function nextIndex(min = 5000, max = 10000) {
    let doms = [min];
    Array.prototype.forEach.call(document.querySelectorAll('body > *'), e => {
        let n = +window.getComputedStyle(e).zIndex || 0;
        n > min && n < max && doms.push(n);
    });
    doms.sort((a, b) => b - a);
    return doms[0] + 1;
}

/**
 * 截取小数点后几位，不足的不补0
 *
 * @param number - 要处理的数字，必填
 * @param n - 要保留的小数点位数，默认保留2位
 * @returns 返回新数字
 */
function fixNumber(number, n = 2) {
    let reg = new RegExp('^(.*\\..{' + n + '}).*$');
    number = '' + number;
    if (!/^(\-|\+)?\d+(\.\d+)?$/.test(number)) {
        console.warn('请传入数字');
        return number;
    }
    return parseFloat(number.replace(reg, '$1'));
}

/**
 * 判断是否数组
 *
 * @param arr -
 */
function isArray(arr) {
    return Object.prototype.toString.call(arr).indexOf('Array') !== -1;
}

/**
 * 获取目标类型
 *
 * @param target - 目标
 * @returns 类型
 */
function getType(target) {
    let type = {
        '[object Array]': 'array',
        '[object Boolean]': 'boolean',
        '[object Date]': 'date',
        '[object Function]': 'function',
        '[object Number]': 'number',
        '[object Object]': 'object',
        '[object RegExp]': 'regexp',
        '[object String]': 'string'
    };
    if (target === null)
        return target + '';
    return typeof target === 'object' || typeof target === 'function' ? type[Object.prototype.toString.call(target)] || 'object' : typeof target;
}

function isWindow(obj) {
    return obj !== null && obj === obj.window;
}
function isPlainObject(obj) {
    return getType(obj) === 'object' && !isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype;
}
//对象扩展
let extend = (function () {
    /**
     * @param target - 目标
     * @param source - 源
     * @param deep - 是否深拷贝
     */
    function extend(target, source, deep) {
        for (let key in source)
            if (source.hasOwnProperty(key)) {
                if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
                    if (isPlainObject(source[key]) && !isPlainObject(target[key]))
                        target[key] = {};
                    if (isArray(source[key]) && !isArray(target[key]))
                        target[key] = [];
                    extend(target[key], source[key], deep);
                }
                else if (source[key] !== undefined)
                    target[key] = source[key];
            }
    }
    return function (target, ...args) {
        let deep = false;
        if (typeof target === 'boolean') {
            deep = target;
            target = args.shift();
        }
        args.forEach(function (arg) {
            extend(target, arg, deep);
        });
        return target;
    };
})();

/**
 * 防抖节流
 *
 * @returns class
 */
function delay() {
    return {
        map: {},
        register(id, fn, time, boo) {
            // 注册
            if (boo) {
                // 防抖，一定时间内只触发第一次
                if (!this.map[id]) {
                    // 不存在的先执行fn
                    fn();
                }
                this.map[id] = {
                    id,
                    fn,
                    time,
                    boo,
                    timeout: setTimeout(() => {
                        this.destroy(id);
                    }, time)
                };
            }
            else {
                // 节流，一定时间内延迟执行
                if (this.map[id]) {
                    // 已存在的先销毁
                    this.destroy(id);
                }
                this.map[id] = {
                    id,
                    fn,
                    time,
                    boo,
                    timeout: setTimeout(fn, time)
                };
            }
        },
        destroy(id) {
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
 * 数据清洗方法
 *
 * @param data - 要清洗的对象，必传
 * @param  map - 需要的数据队列，可传数组或者对象
 * @param map -
 * @param nullFix -
 * @param map -
 * @param nullFix -
 * @param nullFix - 选填，没有对应属性时返回的值，默认不返回该属性
 * @returns 返回清洗后的对象
 */
function cleanData(data, map, nullFix) {
    let result = {};
    if (!data)
        return;
    if (!map)
        return data;
    if (isArray(map)) {
        map.forEach(key => {
            if (data.hasOwnProperty(key)) {
                result[key] = data[key];
            }
            else if (typeof nullFix !== 'undefined') {
                result[key] = nullFix;
            }
        });
    }
    else if (typeof map === 'object') {
        for (let key in map) {
            if (typeof map[key] === 'function') {
                result[key] = map[key](data);
            }
            else {
                if (!map[key])
                    map[key] = key;
                if (data.hasOwnProperty(map[key])) {
                    result[key] = data[map[key]];
                }
                else if (typeof nullFix !== 'undefined') {
                    result[key] = nullFix;
                }
            }
        }
    }
    return result;
}

/**
 * 文件下载的几种方式：
 * 1. 针对一些浏览器无法识别的文件格式。地址栏输入文件URL、window.location.href = URL、window.open(URL)；
 * 2. 使用a标签download属性（或者js创建a标签）；
 * 3. 浏览器可识别的pdf、txt文件，后端兼容处理attachment；
 * 4. 在header增加token用于鉴权下载，使用XmlHttpRequest来想后台发起请求
 *
 * @param url - 链接
 * @param filename - 文件名
 * @param type - 下载类型 'href','open','download','request'
 */
function download(url, filename, type = 'download') {
    // @ts-ignore
    let name = /[^\/]+$/.exec(url)[0]; 
    // @ts-ignore
    /[^\.]+$/.exec(name)[0].toLowerCase();
    if (type === 'open') {
        window.open(url);
    }
    else if (type === 'href') {
        window.location.href = url;
    }
    else if (type === 'request') {
        downloadUrlFile(url, filename || name);
    }
    else {
        openFile(url, filename || name);
    }
}
/**
 * 新标签页下载文件
 *
 * @private
 * @param url - 链接
 * @param filename - 文件名
 */
function openFile(url, filename, fileType) {
    let dom = document.createElement('a');
    // if (['pdf', 'txt'].includes(fileType)) console.log('is pdf')
    dom.style.display = 'none';
    dom.download = filename;
    dom.href = url;
    document.body.appendChild(dom);
    dom.click();
    document.body.removeChild(dom);
}
/**
 * 下载二级制文件
 *
 * @private
 * @param url - 链接
 * @param filename - 文件名
 */
function downloadUrlFile(url, filename) {
    // @ts-ignore
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onload = () => {
        if (xhr.status === 200) {
            saveFile(xhr.response, filename);
        }
    };
    xhr.send();
}
/**
 * 保存文件
 *
 * @private
 * @param data - 文件数据
 * @param filename - 文件名
 */
function saveFile(data, filename) {
    const urlObject = window.URL || window.webkitURL || window;
    const blob = new Blob([data]);
    let link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    link.href = urlObject.createObjectURL(blob);
    link.download = filename;
    link.click();
}

/**
 * tree对象深度查找
 *
 * @param tree - 树形对象
 * @param expression - 必填 查询方式
 * @param keySet - 选填 默认的子类名称、查询name
 * @param number - 选填 查找个数，不传则查询全部
 * @returns 返回查询到的数组
 */
function searchTreeObject(tree, expression, keySet, number = 0) {
    let retNode = [], isLimit = number > 0;
    if (!keySet || typeof keySet !== 'object') {
        keySet = { childName: 'child', keyName: 'name' };
    }
    if (Object.prototype.toString.call(tree) === '[object Object]')
        tree = [tree];
    /**
     * 递归查找
     *
     * @private
     * @param tree - 对象
     * @param expression - 表达式
     * @returns Nodes
     */
    function deepSearch(tree, expression) {
        for (let i = 0; i < tree.length; i++) {
            if (tree[i][keySet.childName] && tree[i][keySet.childName].length > 0) {
                deepSearch(tree[i][keySet.childName], expression);
            }
            let result = true;
            if (typeof expression === 'object') {
                let keys = Object.keys(expression);
                for (let key of keys) {
                    if (expression[key] !== tree[i][key]) {
                        result = false;
                        break;
                    }
                }
            }
            else if (typeof expression === 'function') {
                result = expression.call(tree[i], tree[i]);
            }
            else {
                result = tree[i][keySet.keyName] === expression;
            }
            if (isLimit) {
                // 限制查询个数
                if (number > 0) {
                    if (result) {
                        let treeNode = Object.assign({}, tree[i]);
                        delete treeNode[keySet.childName];
                        retNode.push(treeNode);
                        number--;
                    }
                }
                else {
                    break;
                }
            }
            else {
                if (result) {
                    let treeNode = Object.assign({}, tree[i]);
                    delete treeNode[keySet.childName];
                    retNode.push(treeNode);
                }
            }
        }
    }
    deepSearch(tree, expression);
    return retNode;
}

/**
 * 新标签页打开链接（浏览器不能解析的文件跳转下载）
 *
 * @param url - 链接
 */
function openUrl(url) {
    let dom = document.createElement('a');
    dom.style.display = 'none';
    dom.href = url;
    dom.setAttribute('target', '_blank');
    document.body.appendChild(dom);
    dom.click();
    document.body.removeChild(dom);
}

/**
 * 数字千分位分割
 *
 * @param value - 数字
 * @returns 分割后的字符串
 */
function splitThousand(val) {
    if (!val)
        return val === 0 || val === '0' ? 0 : '';
    val = val.toString();
    if (val.split('.').length == 1)
        return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    return val.split('.')[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$&,') + '.' + val.split('.')[1];
}

/**
 * 如果所提供的谓词函数对一个集合中的所有元素都返回true，则返回true，否则返回false。
 *
 * @example
 * ```js
 * all([4, 2, 3], x => x > 1); // true
 * ```
 * @example
 * ```js
 * all([1, 2, 3]); // true
 * ```
 * @param arr - 目标数组
 * @param fn - 判断方法
 * @returns 返回判断结果
 */
const all = (arr, fn) => arr.every(fn);

/**
 * 如果所提供的谓词函数对一个集合中的至少一个元素返回true，则返回true，否则返回false。
 *
 * @example
 * ```js
 * any([0, 1, 2, 0], x => x >= 2); // true
 * ```
 * @example
 * ```js
 * any([0, 0, 1, 0]); // true
 * ```
 * @param arr - 目标数组
 * @param fn - 判断方法
 * @returns 返回判断结果
 */
const any = (arr, fn) => arr.some(fn);

/**
 * 浏览器端生成uuid，采用v4方法
 *
 * @example
 * ```js
 * uuid(); // '4222fcfe-5721-4632-bede-6043885be57d'
 * ```
 * @returns uuid
 */
// @ts-ignore
const uuid = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));

/**
 * 将一个二维数组转换为一个逗号分隔的值（CSV）字符串。
 *
 * @example
 * ```js
 * arrayToCSV([['a', 'b'], ['c', 'd']]); // '"a","b"\n"c","d"'
 * ```
 * @example
 * ```js
 * arrayToCSV([['a', 'b'], ['c', 'd']], ';'); // '"a";"b"\n"c";"d"'
 * ```
 * @example
 * ```js
 * arrayToCSV([['a', '"b" great'], ['c', 3.1415]]); // '"a","""b"" great"\n"c",3.1415'
 * ```
 * @param data - json数据
 * @param delimiter - 分隔符，默认','
 * @returns CSV数据
 */
const arrayToCSV = (arr, delimiter = ',') => arr.map(v => v.map((x) => (isNaN(x) ? `"${x.replace(/"/g, '""')}"` : x)).join(delimiter)).join('\n');

/**
 * 将一个逗号分隔的值（CSV）字符串转换为一个2D数组。
 *
 * @example
 * ```js
 * CSVToArray('a,b\\nc,d'); // `[['a','b'],['c','d']]`;
 * ```
 * @example
 * ```js
 * CSVToArray('a;b\\nc;d', ';'); // `[['a','b'],['c','d']]`;
 * ```
 * @example
 * ```js
 * CSVToArray('col1,col2\\na,b\\nc,d', ',', true); // `[['a','b'],['c','d']]`;
 * ```
 * @param data - csv数据
 * @param delimiter - 分隔符，默认','
 * @param omitFirstRow - 第一行是表头数据，默认false
 * @returns array
 */
const CSVToArray = (data, delimiter = ',', omitFirstRow = false) => data
    .slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
    .split('\n')
    .map(v => v.split(delimiter));

/**
 * 将一个逗号分隔的值(CSV)字符串转换为一个2D对象数组。字符串的第一行作为标题行。
 *
 * @example
 * ```js
 * CSVToJSON('col1,col2\\na,b\\nc,d'); // `[{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}]`;
 * ```
 * @example
 * ```js
 * CSVToJSON('col1;col2\\na;b\\nc;d', ';'); // `[{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}]`;
 * ```
 * @param data - csv数据
 * @param delimiter - 分隔符，默认','
 * @returns json
 */
function CSVToJSON(data, delimiter = ',') {
    const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
    return data
        .slice(data.indexOf('\n') + 1)
        .split('\n')
        .map((v) => {
        const values = v.split(delimiter);
        return titles.reduce((obj, title, index) => ((obj[title] = values[index]), obj), {});
    });
}

/**
 * 将一个对象数组转换为只包含指定列的逗号分隔值（CSV）字符串。
 *
 * @example
 * ```js
 * JSONToCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b']); // 'a,b\n"1","2"\n"3","4"\n"6",""\n"","7"'
 * ```
 * @example
 * ```js
 * JSONToCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b'], ';'); // 'a;b\n"1";"2"\n"3";"4"\n"6";""\n"";"7"'
 * ```
 * @param data - json数据
 * @param columns - 指定列
 * @param delimiter - 分隔符，默认','
 * @returns CSV数据
 */
const JSONToCSV = (arr, columns, delimiter = ',') => [columns.join(delimiter), ...arr.map(obj => columns.reduce((acc, key) => `${acc}${!acc.length ? '' : delimiter}"${!obj[key] ? '' : obj[key]}"`, ''))].join('\n');

/**
 * 将RGB组件的值转换为颜色代码。
 *
 * @example RGBToHex(255, 165, 1); // 'ffa501'
 * @param r - RGB第1个值
 * @param g - RGB第2个值
 * @param b - RGB第3个值
 * @returns hex值
 */
const RGBToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

// 全局参数
var index = {
    //
    client,
    pattern,
    trim,
    clearAttr,
    clearBr,
    clearHtml,
    clearHtmlExpSN,
    clearHtmlN,
    clearHtmlNS,
    clearHtmlTag,
    getNumber,
    imgAdapt,
    imgChoose,
    camel2Dash,
    dash2Camel,
    upperFirst,
    getRandomNum,
    getRandomStr,
    getRandomStrWidthSpecialChar,
    getCHSLength,
    cutCHSString,
    textareaInsertText,
    textareaMoveToEnd,
    isDigitals,
    isExitsFunction,
    isExitsVariable,
    getWindowSize,
    getAppVersion,
    getOsVersion,
    getIsAppVersionLastest,
    getDirParam,
    getParameter,
    getFileType,
    getUrlParam,
    formatTime,
    formatTimeStr,
    setCookie,
    setCache,
    setSession,
    getCookie,
    getCache,
    getSession,
    delCookie,
    delCache,
    delSession,
    encodeBase64,
    encodeUtf8,
    decodeBase64,
    decodeUtf8,
    enWxJumpLink,
    enWxJumpLinkOld,
    deWxJumpLink,
    deWxJumpLinkOld,
    debounce,
    throttle,
    stopBubble,
    stopDefault,
    addEvent,
    removeEvent,
    getScrollPosition,
    nextIndex,
    fixNumber,
    delay,
    extend,
    getType,
    isArray,
    cleanData,
    download,
    searchTreeObject,
    openUrl,
    splitThousand,
    all,
    any,
    uuid,
    arrayToCSV,
    CSVToArray,
    CSVToJSON,
    JSONToCSV,
    RGBToHex
};

export { CSVToArray, CSVToJSON, JSONToCSV, RGBToHex, addEvent, all, any, arrayToCSV, camel2Dash, cleanData, clearAttr, clearBr, clearHtml, clearHtmlExpSN, clearHtmlN, clearHtmlNS, clearHtmlTag, client, cutCHSString, dash2Camel, deWxJumpLink, deWxJumpLinkOld, debounce, decodeBase64, decodeUtf8, index as default, delCache, delCookie, delSession, delay, download, enWxJumpLink, enWxJumpLinkOld, encodeBase64, encodeUtf8, extend, fixNumber, formatTime, formatTimeStr, getAppVersion, getCHSLength, getCache, getCookie, getDirParam, getFileType, getIsAppVersionLastest, getNumber, getOsVersion, getParameter, getRandomNum, getRandomStr, getRandomStrWidthSpecialChar, getScrollPosition, getSession, getType, getUrlParam, getWindowSize, imgAdapt, imgChoose, isArray, isDigitals, isExitsFunction, isExitsVariable, nextIndex, openUrl, pattern, removeEvent, searchTreeObject, setCache, setCookie, setSession, splitThousand, stopBubble, stopDefault, textareaInsertText, textareaMoveToEnd, throttle, trim, upperFirst, uuid };
