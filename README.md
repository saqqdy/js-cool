# js-cool

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/js-cool.svg?style=flat-square
[npm-url]: https://npmjs.org/package/js-cool
[travis-image]: https://travis-ci.org/saqqdy/js-cool.svg?branch=master
[travis-url]: https://travis-ci.org/saqqdy/js-cool
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/js-cool.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/js-cool?branch=master
[david-image]: https://img.shields.io/david/saqqdy/js-cool.svg?style=flat-square
[david-url]: https://david-dm.org/saqqdy/js-cool
[snyk-image]: https://snyk.io/test/npm/js-cool/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/js-cool
[download-image]: https://img.shields.io/npm/dm/js-cool.svg?style=flat-square
[download-url]: https://npmjs.org/package/js-cool

### 介绍
JS常用方法，来自于本人前端多年经验积累

### 软件架构
集成了大量常用方法，采用了纯原生ES6+babel+webpack的开发方式

### 安装教程

```
# 通过npm安装
npm install --save js-cool
# 或者通过yarn安装
yarn add js-cool
```

#### 通过import引入模块的方式

```
# 在你的.vue或者main.js里面写上import
import { trim, getOsVersion, ... } from 'js-cool'
# 使用
trim(somestring, type) // 返回清理空格后的字符串
getOsVersion()  // 返回系统版本
...
```

#### 使用文件引入的方式

1. 通过require引入
```
# 在你的main.js文件里面加上下面这一行
require('js-cool')
```

2. html静态页直接使用
```
# 在你的html代码上加上script标签，使用CDN链接引入
<script src="https://unpkg.com/js-cool@2.0.4/index.min.js"></script>
# 或者
<script src="http://cdn.saqqdy.com/js-cool.min.js"></script>
```

### 所有方法汇总
```
// 全局参数
client, // client方法返回一个浏览器判断结果对象
pattern, // pattern返回一些常用的正则

// String扩展、数组方法
trim, // 根据传参来去除空格
clearAttr, // 去除HTML标签所有属性
clearBr, // 去除换行
clearHtml, // 去除HTML标签
clearHtmlExpSN, // 去除HTML标签保留空格、换行
clearHtmlN, // 去除HTML标签及换行
clearHtmlNS, // 去除HTML标签及空格、换行
clearHtmlTag, // 去除HTML标签及标签里面的文字
getNumber, // 获取字符串中的数字
imgAdapt, // 扩展图片自动适应多种分辨率small original
imgChoose, // 扩展图片自动适应多种分辨率@2x @3x
camel2Dash, // 将驼峰字符串转成-间隔且全小写的Dash模式
dash2Camel, // 将-间隔且全小写的Dash模式转成驼峰字符串
getRandomNum, // 获取随机整数
getRandomStr, // 获取随机字符串
getRandomStrWidthSpecialChar, // 获取随机字符串带特殊符号
getCHSLength, // 获取字符串长度，中文算2个字符
cutCHSString, // 截取字符串，中文算2个字节
textareaInsertText, // textarea或input对象在指定的光标位置插入文字
textareaMoveToEnd, // textarea或input对象将光标定位到文字尾部

// 获取一下状态
isDigitals, // 是否为由数字组成的字符串
isExitsFunction, // 是否存在指定函数
isExitsVariable, // 是否存在指定变量
getWindowSize, // getWindowSize获取窗口大小
getAppVersion, // 获取APP版本号
getOsVersion, // 获取手机系统版本
getIsAppVersionLastest, // 版本号大小对比
getDirParam, // 获取目录形式URL参数
getParameter, // 获取单个URL参数
getFileType, // 文件后缀名
getUrlParam, // 获取URL参数

// 日期格式化
formatTime, // 日期格式化插件
formatTimeStr, // 格式化时间成：刚刚、几分钟前

// 缓存、cookie、session
setCookie, // setCookie写入cookie的方法
setLocal, // 写localStorage
setSession, // 写sessionStorage
getCookie, // 读取cookies
getLocal, // 读取localStorage
getSession, // 读取sessionStorage
delCookie, // 删除cookie
delLocal, // 删除localStorage
delSession, // 删除sessionStorage

// 编码与解码
encodeBase64, // 字符串、数字转base64
encodeUtf8, // 编码Utf8
decodeBase64, // base64解码
decodeUtf8, // 解码Utf8
enWxJumpLink, // 用*替换= 用!替换& 转码成微信跳转链接
enWxJumpLinkOld, // 用~替换= 用^替换& 转码成微信跳转链接
deWxJumpLink, // 用=替换* 用&替换! 解码成微信跳转链接
deWxJumpLinkOld, // 用=替换~ 用&替换^ 解码成微信跳转链接

// 防抖与限流
debounce, // 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，fn 才会执行
throttle, // 频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次

// 事件委托、其他事件方法
stopBubble, // 阻止冒泡
stopDefault, // 阻止默认事件
addEvent, // 事件委托，支持多次委托
removeEvent, // removeEvent移除由addEvent创建的事件委托
getScrollPosition, // 获取滑动到顶部和底部 返回'top' 'bottom'，建议使用限流
```

### API文档

## Functions

<dl>
<dt><a href="#addEvent">addEvent(element, type, handler)</a></dt>
<dd><p>addEvent()事件委托，支持多次委托</p>
</dd>
<dt><a href="#handleEvent">handleEvent(event)</a> ⇒ <code>Boolean</code></dt>
<dd><p>handleEvent()执行事件</p>
</dd>
<dt><a href="#fixEvent">fixEvent(event)</a> ⇒ <code>Object</code></dt>
<dd><p>为IE的事件对象添加一些“缺失的”函数</p>
</dd>
<dt><a href="#camel2Dash">camel2Dash(string)</a> ⇒ <code>String</code></dt>
<dd><p>camel2Dash
将驼峰字符串转成-间隔且全小写的Dash模式</p>
</dd>
<dt><a href="#clearAttr">clearAttr(string)</a> ⇒ <code>String</code></dt>
<dd><p>去除HTML标签所有属性</p>
</dd>
<dt><a href="#clearBr">clearBr(string)</a> ⇒ <code>String</code></dt>
<dd><p>去除换行</p>
</dd>
<dt><a href="#clearHtml">clearHtml(string)</a> ⇒ <code>String</code></dt>
<dd><p>去除HTML标签</p>
</dd>
<dt><a href="#clearHtmlExpSN">clearHtmlExpSN(string)</a> ⇒ <code>String</code></dt>
<dd><p>去除HTML标签保留空格、换行</p>
</dd>
<dt><a href="#clearHtmlN">clearHtmlN(string)</a> ⇒ <code>String</code></dt>
<dd><p>去除HTML标签及换行</p>
</dd>
<dt><a href="#clearHtmlNS">clearHtmlNS(string)</a> ⇒ <code>String</code></dt>
<dd><p>去除HTML标签及空格、换行</p>
</dd>
<dt><a href="#clearHtmlTag">clearHtmlTag(string)</a> ⇒ <code>String</code></dt>
<dd><p>去除HTML标签及标签里面的文字</p>
</dd>
<dt><a href="#client">client(name, userAgent)</a> ⇒ <code>Object</code> | <code>Boolean</code></dt>
<dd><p>client方法返回一个浏览器判断结果：{ ANDROID: true, GECKO: true, GLSH_APP: false, IE: false, IOS: false, IPAD: false, IPHONE: false, MOBILE: true, MOBILEDEVICE: true, OPERA: false, QQ: false, QQBROWSER: false, TRIDENT: false, WEBKIT: true, WEIXIN: false }</p>
</dd>
<dt><a href="#cutCHSString">cutCHSString(str, len, hasDot)</a> ⇒ <code>String</code></dt>
<dd><p>截取字符串，中文算2个字节</p>
</dd>
<dt><a href="#dash2Camel">dash2Camel(string)</a> ⇒ <code>String</code></dt>
<dd><p>dash2Camel
将-间隔且全小写的Dash模式转成驼峰字符串</p>
</dd>
<dt><a href="#debounce">debounce(fn, delay, immediate)</a> ⇒ <code>function</code></dt>
<dd><p>空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，fn 才会执行</p>
</dd>
<dt><a href="#decodeBase64">decodeBase64(input)</a> ⇒ <code>String</code></dt>
<dd><p>base64解码</p>
</dd>
<dt><a href="#decodeUtf8">decodeUtf8(input)</a> ⇒ <code>String</code></dt>
<dd><p>解码Utf8</p>
</dd>
<dt><a href="#delCookie">delCookie(name)</a></dt>
<dd><p>删除cookie</p>
</dd>
<dt><a href="#delLocal">delLocal(name)</a></dt>
<dd><p>删除localStorage</p>
</dd>
<dt><a href="#delSession">delSession(name)</a></dt>
<dd><p>删除sessionStorage</p>
</dd>
<dt><a href="#deWxJumpLink">deWxJumpLink(string)</a> ⇒ <code>String</code></dt>
<dd><p>用=替换* 用&amp;替换! 解码成微信跳转链接
name*exMall-detail-goodsInfoId!params(goodsInfoId)*8866 转成 name=exMall-detail-goodsInfoId&amp;params[goodsInfoId]=8866</p>
</dd>
<dt><a href="#deWxJumpLinkOld">deWxJumpLinkOld(string)</a> ⇒ <code>String</code></dt>
<dd><p>用=替换~ 用&amp;替换^ 解码成微信跳转链接</p>
</dd>
<dt><a href="#encodeBase64">encodeBase64(input)</a> ⇒ <code>String</code></dt>
<dd><p>字符串、数字转base64</p>
</dd>
<dt><a href="#encodeUtf8">encodeUtf8(input)</a> ⇒ <code>String</code></dt>
<dd><p>编码Utf8</p>
</dd>
<dt><a href="#enWxJumpLink">enWxJumpLink(string)</a> ⇒ <code>String</code></dt>
<dd><p>用<em>替换= 用!替换&amp; 转码成微信跳转链接
name=exMall-detail-goodsInfoId&amp;params[goodsInfoId]=8866 转成 name</em>exMall-detail-goodsInfoId!params(goodsInfoId)*8866</p>
</dd>
<dt><a href="#enWxJumpLinkOld">enWxJumpLinkOld(string)</a> ⇒ <code>String</code></dt>
<dd><p>用~替换= 用^替换&amp; 转码成微信跳转链接</p>
</dd>
<dt><a href="#formatTime">formatTime(time, fmt)</a> ⇒ <code>String</code></dt>
<dd><p>日期格式化插件
使用方式：formatTime(new Date(), &quot;yyyy-MM-dd&quot;)</p>
</dd>
<dt><a href="#formatTimeStr">formatTimeStr(time, fmt)</a> ⇒ <code>String</code></dt>
<dd><p>格式化时间成：刚刚、几分钟前</p>
</dd>
<dt><a href="#getAppVersion">getAppVersion(appName, withosstr, userAgent)</a> ⇒ <code>Boolean</code> | <code>null</code></dt>
<dd><p>获取APP版本号</p>
</dd>
<dt><a href="#getCHSLength">getCHSLength(str)</a> ⇒ <code>Number</code></dt>
<dd><p>获取文本长度，中文算2个字节</p>
</dd>
<dt><a href="#getCookie">getCookie(name)</a> ⇒ <code>String</code></dt>
<dd><p>读取cookies</p>
</dd>
<dt><a href="#getDirParam">getDirParam(url)</a> ⇒ <code>Object</code></dt>
<dd><p>获取目录形式URL参数</p>
</dd>
<dt><a href="#getFileType">getFileType(url)</a> ⇒ <code>String</code></dt>
<dd><p>文件后缀名</p>
</dd>
<dt><a href="#getIsAppVersionLastest">getIsAppVersionLastest(appName, compareVer, userAgent)</a> ⇒ <code>Boolean</code> | <code>null</code></dt>
<dd><p>版本号大小对比</p>
</dd>
<dt><a href="#getLocal">getLocal(name)</a> ⇒ <code>String</code></dt>
<dd><p>读取localStorage</p>
</dd>
<dt><a href="#getNumber">getNumber(string)</a> ⇒ <code>String</code></dt>
<dd><p>获取字符串中的数字</p>
</dd>
<dt><a href="#getOsVersion">getOsVersion(osName, withosstr, userAgent)</a> ⇒ <code>Boolean</code> | <code>null</code></dt>
<dd><p>获取手机系统版本</p>
</dd>
<dt><a href="#getParameter">getParameter(name)</a> ⇒</dt>
<dd><p>获取单个URL参数</p>
</dd>
<dt><a href="#getRandomNum">getRandomNum(min, max)</a> ⇒ <code>Number</code></dt>
<dd><p>获取随机整数</p>
</dd>
<dt><a href="#getRandomStr">getRandomStr(len, widthSpecialChar)</a> ⇒ <code>String</code></dt>
<dd><p>获取随机字符串</p>
</dd>
<dt><a href="#getRandomStrWidthSpecialChar">getRandomStrWidthSpecialChar(len)</a> ⇒ <code>String</code></dt>
<dd><p>获取随机字符串带特殊符号</p>
</dd>
<dt><a href="#getScrollPosition">getScrollPosition()</a> ⇒ <code>String</code></dt>
<dd><p>获取滑动到顶部和底部 返回&#39;top&#39; &#39;bottom&#39;，建议使用限流</p>
</dd>
<dt><a href="#getSession">getSession(name)</a> ⇒ <code>String</code></dt>
<dd><p>读取sessionStorage</p>
</dd>
<dt><a href="#getUrlParam">getUrlParam(url)</a> ⇒ <code>Object</code></dt>
<dd><p>获取URL参数</p>
</dd>
<dt><a href="#getWindowSize">getWindowSize()</a> ⇒ <code>Object</code></dt>
<dd><p>getWindowSize获取窗口大小</p>
</dd>
<dt><a href="#imgAdapt">imgAdapt(imgurl, size)</a> ⇒ <code>String</code></dt>
<dd><p>扩展图片自动适应多种分辨率small original</p>
</dd>
<dt><a href="#imgChoose">imgChoose(imgurl)</a> ⇒ <code>String</code></dt>
<dd><p>扩展图片自动适应多种分辨率@2x @3x</p>
</dd>
<dt><a href="#isDigitals">isDigitals(str)</a> ⇒ <code>Boolean</code></dt>
<dd><p>是否为由数字组成的字符串</p>
</dd>
<dt><a href="#isExitsFunction">isExitsFunction(funcName)</a> ⇒ <code>Boolean</code></dt>
<dd><p>是否存在指定函数</p>
</dd>
<dt><a href="#isExitsVariable">isExitsVariable(variableName)</a> ⇒ <code>Boolean</code></dt>
<dd><p>是否存在指定变量</p>
</dd>
<dt><a href="#pattern">pattern()</a> ⇒ <code>Object</code></dt>
<dd><p>pattern返回一些常用的正则：any, arrjson, chinese, email, float, isjson, json, mobile, number, pass, postcode, qq, string, tel, textarea, url, username</p>
</dd>
<dt><a href="#removeEvent">removeEvent(element, type, handler)</a></dt>
<dd><p>removeEvent移除由addEvent创建的事件委托</p>
</dd>
<dt><a href="#setCookie">setCookie(name, value, seconds)</a></dt>
<dd><p>setCookie写入cookie的方法</p>
</dd>
<dt><a href="#setLocal">setLocal(name, value, seconds)</a></dt>
<dd><p>写localStorage</p>
</dd>
<dt><a href="#setSession">setSession(name, value, seconds)</a></dt>
<dd><p>写sessionStorage</p>
</dd>
<dt><a href="#stopBubble">stopBubble(e)</a> ⇒ <code>Boolean</code></dt>
<dd><p>阻止冒泡</p>
</dd>
<dt><a href="#stopDefault">stopDefault(e)</a> ⇒ <code>Boolean</code></dt>
<dd><p>阻止默认事件</p>
</dd>
<dt><a href="#textareaInsertText">textareaInsertText(obj, str)</a></dt>
<dd><p>textarea或input对象在指定的光标位置插入文字</p>
</dd>
<dt><a href="#textareaMoveToEnd">textareaMoveToEnd(obj)</a></dt>
<dd><p>textarea或input对象将光标定位到文字尾部</p>
</dd>
<dt><a href="#throttle">throttle(fn, delay, immediate)</a> ⇒ <code>function</code></dt>
<dd><p>频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次</p>
</dd>
<dt><a href="#trim">trim(string, type)</a> ⇒ <code>String</code></dt>
<dd><p>trim()根据传参来去除空格</p>
</dd>
<dt><a href="#upperFirst">upperFirst(string)</a> ⇒ <code>String</code></dt>
<dd><p>upperFirst
首字母大写</p>
</dd>
</dl>

<a name="addEvent"></a>

## addEvent(element, type, handler)
addEvent()事件委托，支持多次委托

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Object</code> | js dom对象 |
| type | <code>String</code> | 事件类型。不需要加on |
| handler | <code>function</code> | 回调方法 |

<a name="handleEvent"></a>

## handleEvent(event) ⇒ <code>Boolean</code>
handleEvent()执行事件

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | 事件类型 |

<a name="fixEvent"></a>

## fixEvent(event) ⇒ <code>Object</code>
为IE的事件对象添加一些“缺失的”函数

**Kind**: global function  
**Returns**: <code>Object</code> - 返回补齐了缺失方法的的event  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | 事件类型 |

<a name="camel2Dash"></a>

## camel2Dash(string) ⇒ <code>String</code>
camel2Dash
将驼峰字符串转成-间隔且全小写的Dash模式

**Kind**: global function  
**Returns**: <code>String</code> - 返回转换后的字符串  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | 需要转换的字符串 |

<a name="clearAttr"></a>

## clearAttr(string) ⇒ <code>String</code>
去除HTML标签所有属性

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | 传入字符串 |

<a name="clearBr"></a>

## clearBr(string) ⇒ <code>String</code>
去除换行

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | 带html标签的字符串 |

<a name="clearHtml"></a>

## clearHtml(string) ⇒ <code>String</code>
去除HTML标签

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | 带html标签的字符串 |

<a name="clearHtmlExpSN"></a>

## clearHtmlExpSN(string) ⇒ <code>String</code>
去除HTML标签保留空格、换行

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | 带html标签的字符串 |

<a name="clearHtmlN"></a>

## clearHtmlN(string) ⇒ <code>String</code>
去除HTML标签及换行

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | 带html标签的字符串 |

<a name="clearHtmlNS"></a>

## clearHtmlNS(string) ⇒ <code>String</code>
去除HTML标签及空格、换行

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | 带html标签的字符串 |

<a name="clearHtmlTag"></a>

## clearHtmlTag(string) ⇒ <code>String</code>
去除HTML标签及标签里面的文字

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | 带html标签的字符串 |

<a name="client"></a>

## client(name, userAgent) ⇒ <code>Object</code> \| <code>Boolean</code>
client方法返回一个浏览器判断结果：{ ANDROID: true, GECKO: true, GLSH_APP: false, IE: false, IOS: false, IPAD: false, IPHONE: false, MOBILE: true, MOBILEDEVICE: true, OPERA: false, QQ: false, QQBROWSER: false, TRIDENT: false, WEBKIT: true, WEIXIN: false }

**Kind**: global function  
**Returns**: <code>Object</code> \| <code>Boolean</code> - 返回常用ua匹配表，如果传了name，那么返回是否匹配该终端true/false  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | 可选，比如传入MicroMessenger，返回是否为微信内置浏览器 |
| userAgent | <code>String</code> | 可选，传入自定义的ua，默认取浏览器的navigator.appVersion |

<a name="cutCHSString"></a>

## cutCHSString(str, len, hasDot) ⇒ <code>String</code>
截取字符串，中文算2个字节

**Kind**: global function  
**Returns**: <code>String</code> - 返回截取后的字符串  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| str | <code>String</code> |  | 要截取的字符串 |
| len | <code>Number</code> |  |  |
| hasDot | <code>Boolean</code> | <code>false</code> |  |

<a name="dash2Camel"></a>

## dash2Camel(string) ⇒ <code>String</code>
dash2Camel
将-间隔且全小写的Dash模式转成驼峰字符串

**Kind**: global function  
**Returns**: <code>String</code> - 返回转换后的字符串  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | 需要转换的字符串 |

<a name="debounce"></a>

## debounce(fn, delay, immediate) ⇒ <code>function</code>
空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，fn 才会执行

**Kind**: global function  
**Returns**: <code>function</code> - 实际调用函数  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | 要调用的函数 |
| delay | <code>number</code> | 空闲时间 |
| immediate | <code>bool</code> | 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。 |

<a name="decodeBase64"></a>

## decodeBase64(input) ⇒ <code>String</code>
base64解码

**Kind**: global function  
**Returns**: <code>String</code> - 解码后的字符串  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> | 需要解码的字符串 |

<a name="decodeUtf8"></a>

## decodeUtf8(input) ⇒ <code>String</code>
解码Utf8

**Kind**: global function  
**Returns**: <code>String</code> - 解码后的字符串  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> | 需要解码的字符串 |

<a name="delCookie"></a>

## delCookie(name)
删除cookie

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | cookie名称 |

<a name="delLocal"></a>

## delLocal(name)
删除localStorage

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | 名称 |

<a name="delSession"></a>

## delSession(name)
删除sessionStorage

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | 名称 |

<a name="deWxJumpLink"></a>

## deWxJumpLink(string) ⇒ <code>String</code>
用=替换* 用&替换! 解码成微信跳转链接
name*exMall-detail-goodsInfoId!params(goodsInfoId)*8866 转成 name=exMall-detail-goodsInfoId&params[goodsInfoId]=8866

**Kind**: global function  
**Returns**: <code>String</code> - 返回解码结果  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | 传入字符串 |

<a name="deWxJumpLinkOld"></a>

## deWxJumpLinkOld(string) ⇒ <code>String</code>
用=替换~ 用&替换^ 解码成微信跳转链接

**Kind**: global function  
**Returns**: <code>String</code> - 返回解码结果  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | 传入字符串 |

<a name="encodeBase64"></a>

## encodeBase64(input) ⇒ <code>String</code>
字符串、数字转base64

**Kind**: global function  
**Returns**: <code>String</code> - 返回BASE64编码  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> | 需要编码的字符串 |

<a name="encodeUtf8"></a>

## encodeUtf8(input) ⇒ <code>String</code>
编码Utf8

**Kind**: global function  
**Returns**: <code>String</code> - 返回UTF-8编码  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> | 需要编码的字符串 |

<a name="enWxJumpLink"></a>

## enWxJumpLink(string) ⇒ <code>String</code>
用*替换= 用!替换& 转码成微信跳转链接
name=exMall-detail-goodsInfoId&params[goodsInfoId]=8866 转成 name*exMall-detail-goodsInfoId!params(goodsInfoId)*8866

**Kind**: global function  
**Returns**: <code>String</code> - 返回转码结果  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | 传入字符串 |

<a name="enWxJumpLinkOld"></a>

## enWxJumpLinkOld(string) ⇒ <code>String</code>
用~替换= 用^替换& 转码成微信跳转链接

**Kind**: global function  
**Returns**: <code>String</code> - 返回转码结果  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | 传入字符串 |

<a name="formatTime"></a>

## formatTime(time, fmt) ⇒ <code>String</code>
日期格式化插件
使用方式：formatTime(new Date(), "yyyy-MM-dd")

**Kind**: global function  
**Returns**: <code>String</code> - 返回字符串  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| time | <code>Date/String</code> |  | 时间对象或者字符串 |
| fmt | <code>String</code> | <code>yyyy-MM-dd</code> | 格式化风格 |

<a name="formatTimeStr"></a>

## formatTimeStr(time, fmt) ⇒ <code>String</code>
格式化时间成：刚刚、几分钟前

**Kind**: global function  
**Returns**: <code>String</code> - 返回字符串  

| Param | Type | Description |
| --- | --- | --- |
| time | <code>Date/String</code> | 时间对象或者字符串 |
| fmt | <code>String</code> | 格式化风格 |

<a name="getAppVersion"></a>

## getAppVersion(appName, withosstr, userAgent) ⇒ <code>Boolean</code> \| <code>null</code>
获取APP版本号

**Kind**: global function  
**Returns**: <code>Boolean</code> \| <code>null</code> - null/true/false  

| Param | Type | Description |
| --- | --- | --- |
| appName | <code>String</code> | app名称 |
| withosstr | <code>Boolean</code> | 是否需要带上名称 |
| userAgent | <code>String</code> | ua，可不传，默认取navigator.appVersion |

<a name="getCHSLength"></a>

## getCHSLength(str) ⇒ <code>Number</code>
获取文本长度，中文算2个字节

**Kind**: global function  
**Returns**: <code>Number</code> - 返回长度  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | 字符串 |

<a name="getCookie"></a>

## getCookie(name) ⇒ <code>String</code>
读取cookies

**Kind**: global function  
**Returns**: <code>String</code> - 返回cookie字符串  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | cookie名称 |

<a name="getDirParam"></a>

## getDirParam(url) ⇒ <code>Object</code>
获取目录形式URL参数

**Kind**: global function  
**Returns**: <code>Object</code> - 返回参数对象  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | 传入url地址 |

<a name="getFileType"></a>

## getFileType(url) ⇒ <code>String</code>
文件后缀名

**Kind**: global function  
**Returns**: <code>String</code> - 返回文件后缀  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | 文件名 |

<a name="getIsAppVersionLastest"></a>

## getIsAppVersionLastest(appName, compareVer, userAgent) ⇒ <code>Boolean</code> \| <code>null</code>
版本号大小对比

**Kind**: global function  
**Returns**: <code>Boolean</code> \| <code>null</code> - null/true/false  

| Param | Type | Description |
| --- | --- | --- |
| appName | <code>String</code> | app名称 |
| compareVer | <code>String</code> | 必传 需要对比的版本号 |
| userAgent | <code>String</code> | ua，可不传，默认取navigator.appVersion |

<a name="getLocal"></a>

## getLocal(name) ⇒ <code>String</code>
读取localStorage

**Kind**: global function  
**Returns**: <code>String</code> - 返回localStorage  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | 名称 |

<a name="getNumber"></a>

## getNumber(string) ⇒ <code>String</code>
获取字符串中的数字

**Kind**: global function  
**Returns**: <code>String</code> - 返回纯数字字符串  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | 传入带数字的字符串 |

<a name="getOsVersion"></a>

## getOsVersion(osName, withosstr, userAgent) ⇒ <code>Boolean</code> \| <code>null</code>
获取手机系统版本

**Kind**: global function  
**Returns**: <code>Boolean</code> \| <code>null</code> - null/true/false  

| Param | Type | Description |
| --- | --- | --- |
| osName | <code>String</code> | 系统类型字符串Android、iPod、iWatch或iPhone |
| withosstr | <code>Boolean</code> | 是否需要带上名称 |
| userAgent | <code>String</code> | ua，可不传，默认取navigator.appVersion |

<a name="getParameter"></a>

## getParameter(name) ⇒
获取单个URL参数

**Kind**: global function  
**Returns**: 返回参数值  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | 参数名称 |

<a name="getRandomNum"></a>

## getRandomNum(min, max) ⇒ <code>Number</code>
获取随机整数

**Kind**: global function  
**Returns**: <code>Number</code> - 返回数字  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| min | <code>Number</code> | <code>1</code> | 随机数的最小值 |
| max | <code>Number</code> | <code>10</code> | 随机数的最大值 |

<a name="getRandomStr"></a>

## getRandomStr(len, widthSpecialChar) ⇒ <code>String</code>
获取随机字符串

**Kind**: global function  
**Returns**: <code>String</code> - 随机串  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| len | <code>Number</code> | <code>32</code> | 需要获取随机字符串的长度 |
| widthSpecialChar | <code>Boolean</code> | <code>false</code> | 可选，是否需要生成带特殊字符的串 |

<a name="getRandomStrWidthSpecialChar"></a>

## getRandomStrWidthSpecialChar(len) ⇒ <code>String</code>
获取随机字符串带特殊符号

**Kind**: global function  
**Returns**: <code>String</code> - 随机串  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| len | <code>Number</code> | <code>32</code> | 需要获取随机字符串的长度 |

<a name="getScrollPosition"></a>

## getScrollPosition() ⇒ <code>String</code>
获取滑动到顶部和底部 返回'top' 'bottom'，建议使用限流

**Kind**: global function  
**Returns**: <code>String</code> - 返回位置  
<a name="getSession"></a>

## getSession(name) ⇒ <code>String</code>
读取sessionStorage

**Kind**: global function  
**Returns**: <code>String</code> - 返回sessionStorage  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | 名称 |

<a name="getUrlParam"></a>

## getUrlParam(url) ⇒ <code>Object</code>
获取URL参数

**Kind**: global function  
**Returns**: <code>Object</code> - 返回参数列表  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | 传入url参数 |

<a name="getWindowSize"></a>

## getWindowSize() ⇒ <code>Object</code>
getWindowSize获取窗口大小

**Kind**: global function  
**Returns**: <code>Object</code> - 返回宽高  
<a name="imgAdapt"></a>

## imgAdapt(imgurl, size) ⇒ <code>String</code>
扩展图片自动适应多种分辨率small original

**Kind**: global function  
**Returns**: <code>String</code> - 返回新地址  

| Param | Type | Description |
| --- | --- | --- |
| imgurl | <code>String</code> | 图片url |
| size | <code>String</code> | 图片规格 |

<a name="imgChoose"></a>

## imgChoose(imgurl) ⇒ <code>String</code>
扩展图片自动适应多种分辨率@2x @3x

**Kind**: global function  
**Returns**: <code>String</code> - 返回新地址  

| Param | Type | Description |
| --- | --- | --- |
| imgurl | <code>String</code> | 图片地址 |

<a name="isDigitals"></a>

## isDigitals(str) ⇒ <code>Boolean</code>
是否为由数字组成的字符串

**Kind**: global function  
**Returns**: <code>Boolean</code> - 返回true/false  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | 待检测的字符串 |

<a name="isExitsFunction"></a>

## isExitsFunction(funcName) ⇒ <code>Boolean</code>
是否存在指定函数

**Kind**: global function  
**Returns**: <code>Boolean</code> - 返回true/false  

| Param | Type | Description |
| --- | --- | --- |
| funcName | <code>String</code> | 传入函数名 |

<a name="isExitsVariable"></a>

## isExitsVariable(variableName) ⇒ <code>Boolean</code>
是否存在指定变量

**Kind**: global function  
**Returns**: <code>Boolean</code> - 返回true/false  

| Param | Type | Description |
| --- | --- | --- |
| variableName | <code>String</code> | 传入变量名称 |

<a name="pattern"></a>

## pattern() ⇒ <code>Object</code>
pattern返回一些常用的正则：any, arrjson, chinese, email, float, isjson, json, mobile, number, pass, postcode, qq, string, tel, textarea, url, username

**Kind**: global function  
**Returns**: <code>Object</code> - 返回对象  
<a name="removeEvent"></a>

## removeEvent(element, type, handler)
removeEvent移除由addEvent创建的事件委托

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Object</code> | js dom对象 |
| type | <code>String</code> | 事件类型。不需要加on |
| handler | <code>function</code> | 回调方法 |

<a name="setCookie"></a>

## setCookie(name, value, seconds)
setCookie写入cookie的方法

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | cookie名称 |
| value | <code>\*</code> | 设置要存储的值，可以是对象或字符串 |
| seconds | <code>Number</code> | cookie有效时间 |

<a name="setLocal"></a>

## setLocal(name, value, seconds)
写localStorage

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | 名称 |
| value | <code>\*</code> | 设置要存储的值，可以是对象或字符串 |
| seconds | <code>Number</code> | 有效时间 |

<a name="setSession"></a>

## setSession(name, value, seconds)
写sessionStorage

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | 名称 |
| value | <code>\*</code> | 设置要存储的值，可以是对象或字符串 |
| seconds | <code>Number</code> | 有效时间 |

<a name="stopBubble"></a>

## stopBubble(e) ⇒ <code>Boolean</code>
阻止冒泡

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>Object</code> | dom的event对象 |

<a name="stopDefault"></a>

## stopDefault(e) ⇒ <code>Boolean</code>
阻止默认事件

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>Object</code> | dom的event对象 |

<a name="textareaInsertText"></a>

## textareaInsertText(obj, str)
textarea或input对象在指定的光标位置插入文字

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | dom对象 |
| str | <code>String</code> | 要插入的文字 |

<a name="textareaMoveToEnd"></a>

## textareaMoveToEnd(obj)
textarea或input对象将光标定位到文字尾部

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | dom对象 |

<a name="throttle"></a>

## throttle(fn, delay, immediate) ⇒ <code>function</code>
频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次

**Kind**: global function  
**Returns**: <code>function</code> - 实际调用函数  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | 需要调用的函数 |
| delay | <code>number</code> | 延迟时间，单位毫秒 |
| immediate | <code>bool</code> | 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。 |

<a name="trim"></a>

## trim(string, type) ⇒ <code>String</code>
trim()根据传参来去除空格

**Kind**: global function  
**Returns**: <code>String</code> - 返回新字符串  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | 传入字符串 |
| type | <code>string</code> | 可选，去除空格的类型l:去除开头空格 r:去除尾部空格 lr:去除两端空格，为空的话去除所有空格 |

<a name="upperFirst"></a>

## upperFirst(string) ⇒ <code>String</code>
upperFirst
首字母大写

**Kind**: global function  
**Returns**: <code>String</code> - 返回转换后的字符串  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | 需要转换的字符串 |


### 参与贡献

1. Fork 本仓库
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request


### 我的相关

- ***使用*** _Readme\_XXX.md_ 来支持不同的语言，`例如` _Readme\_en.md, Readme\_zh.md_
- 我的码云：[https://gitee.com/saqqdy](https://gitee.com/saqqdy)
- 我的Github：[https://github.com/saqqdy](https://github.com/saqqdy)
- 我的npm：[https://npmjs.com/~saqqdy](https://npmjs.com/~saqqdy)
- 我的个人网站 [http://www.saqqdy.com](http://www.saqqdy.com)

