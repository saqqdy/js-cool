## Functions

<dl>
<dt><a href="#addEvent">addEvent(element, type, handler)</a></dt>
<dd><p>addEvent()事件委托，支持多次委托</p>
</dd>
<dt><a href="#camel2Dash">camel2Dash(string)</a> ⇒ <code>String</code></dt>
<dd><p>camel2Dash
将驼峰字符串转成-间隔且全小写的Dash模式</p>
</dd>
<dt><a href="#cleanData">cleanData(data, [Object, Array], map, nullFix, map, nullFix, [Object, Array, String, Number, Boolean])</a> ⇒ <code>object</code></dt>
<dd></dd>
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
<dt><a href="#delay">delay()</a></dt>
<dd><p>防抖节流
return {Object} class</p>
</dd>
<dt><a href="#delCache">delCache(name)</a></dt>
<dd><p>删除localStorage</p>
</dd>
<dt><a href="#delCookie">delCookie(name)</a></dt>
<dd><p>删除cookie</p>
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
<dt><a href="#download">download(url, filename, type)</a></dt>
<dd><p>文件下载的几种方式：1. 针对一些浏览器无法识别的文件格式。地址栏输入文件URL、window.location.href = URL、window.open(URL)；2. 使用a标签download属性（或者js创建a标签）；3. 浏览器可识别的pdf、txt文件，后端兼容处理attachment；4. 在header增加token用于鉴权下载，使用XmlHttpRequest来想后台发起请求</p>
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
<dt><a href="#fixNumber">fixNumber([Number, String], number, n)</a> ⇒ <code>number</code></dt>
<dd><p>截取小数点后几位，不足的不补0</p>
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
<dt><a href="#getCache">getCache(name)</a> ⇒</dt>
<dd><p>获取缓存，存入的如果是Object，取出的也是Object，不需要再转换</p>
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
<dt><a href="#getType">getType(target)</a> ⇒ <code>String</code></dt>
<dd><p>获取目标类型</p>
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
<dt><a href="#isArray">isArray(arr)</a></dt>
<dd><p>判断是否数组</p>
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
<dt><a href="#nextIndex">nextIndex(min, max)</a> ⇒ <code>Number</code></dt>
<dd><p>返回下一个zIndex值</p>
</dd>
<dt><a href="#openUrl">openUrl(url)</a></dt>
<dd><p>新标签页打开链接（浏览器不能解析的文件跳转下载）</p>
</dd>
<dt><a href="#pattern">pattern()</a> ⇒ <code>Object</code></dt>
<dd><p>pattern返回一些常用的正则：any, arrjson, chinese, email, float, isjson, json, mobile, number, pass, postcode, qq, string, tel, textarea, url, username</p>
</dd>
<dt><a href="#removeEvent">removeEvent(element, type, handler)</a></dt>
<dd><p>removeEvent移除由addEvent创建的事件委托</p>
</dd>
<dt><a href="#searchTreeObject">searchTreeObject(tree, [String, Object, Function], expression, keySet, number)</a> ⇒ <code>Array</code></dt>
<dd><p>tree对象深度查找</p>
</dd>
<dt><a href="#setCache">setCache(name, value, seconds)</a> ⇒</dt>
<dd><p>获取缓存，存入的如果是Object，取出的也是Object，不需要再转换</p>
</dd>
<dt><a href="#setCookie">setCookie(name, value, seconds, path, samesite)</a></dt>
<dd><p>setCookie写入cookie的方法</p>
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

| Param   | Type                  | Description           |
| ------- | --------------------- | --------------------- |
| element | <code>Object</code>   | js dom 对象           |
| type    | <code>String</code>   | 事件类型。不需要加 on |
| handler | <code>function</code> | 回调方法              |

<a name="camel2Dash"></a>

## camel2Dash(string) ⇒ <code>String</code>

camel2Dash
将驼峰字符串转成-间隔且全小写的 Dash 模式

**Kind**: global function  
**Returns**: <code>String</code> - 返回转换后的字符串

| Param  | Type                | Description      |
| ------ | ------------------- | ---------------- |
| string | <code>String</code> | 需要转换的字符串 |

<a name="cleanData"></a>

## cleanData(data, [Object, Array], map, nullFix, map, nullFix, [Object, Array, String, Number, Boolean]) ⇒ <code>object</code>

**Kind**: global function  
**Returns**: <code>object</code> - 返回清洗后的对象  
**Description:**: 数据清洗方法

| Param                                    | Type                | Description                                            |
| ---------------------------------------- | ------------------- | ------------------------------------------------------ |
| data                                     | <code>object</code> | 要清洗的对象，必传                                     |
| [Object, Array]                          |                     | map 需要的数据队列，可传数组或者对象                   |
| map                                      |                     |                                                        |
| nullFix                                  |                     |                                                        |
| map                                      |                     |                                                        |
| nullFix                                  |                     |                                                        |
| [Object, Array, String, Number, Boolean] |                     | nullFix 选填，没有对应属性时返回的值，默认不返回该属性 |

<a name="clearAttr"></a>

## clearAttr(string) ⇒ <code>String</code>

去除 HTML 标签所有属性

**Kind**: global function

| Param  | Type                | Description |
| ------ | ------------------- | ----------- |
| string | <code>String</code> | 传入字符串  |

<a name="clearBr"></a>

## clearBr(string) ⇒ <code>String</code>

去除换行

**Kind**: global function

| Param  | Type                | Description          |
| ------ | ------------------- | -------------------- |
| string | <code>String</code> | 带 html 标签的字符串 |

<a name="clearHtml"></a>

## clearHtml(string) ⇒ <code>String</code>

去除 HTML 标签

**Kind**: global function

| Param  | Type                | Description          |
| ------ | ------------------- | -------------------- |
| string | <code>String</code> | 带 html 标签的字符串 |

<a name="clearHtmlExpSN"></a>

## clearHtmlExpSN(string) ⇒ <code>String</code>

去除 HTML 标签保留空格、换行

**Kind**: global function

| Param  | Type                | Description          |
| ------ | ------------------- | -------------------- |
| string | <code>String</code> | 带 html 标签的字符串 |

<a name="clearHtmlN"></a>

## clearHtmlN(string) ⇒ <code>String</code>

去除 HTML 标签及换行

**Kind**: global function

| Param  | Type                | Description          |
| ------ | ------------------- | -------------------- |
| string | <code>String</code> | 带 html 标签的字符串 |

<a name="clearHtmlNS"></a>

## clearHtmlNS(string) ⇒ <code>String</code>

去除 HTML 标签及空格、换行

**Kind**: global function

| Param  | Type                | Description          |
| ------ | ------------------- | -------------------- |
| string | <code>String</code> | 带 html 标签的字符串 |

<a name="clearHtmlTag"></a>

## clearHtmlTag(string) ⇒ <code>String</code>

去除 HTML 标签及标签里面的文字

**Kind**: global function

| Param  | Type                | Description          |
| ------ | ------------------- | -------------------- |
| string | <code>String</code> | 带 html 标签的字符串 |

<a name="client"></a>

## client(name, userAgent) ⇒ <code>Object</code> \| <code>Boolean</code>

client 方法返回一个浏览器判断结果：{ ANDROID: true, GECKO: true, GLSH_APP: false, IE: false, IOS: false, IPAD: false, IPHONE: false, MOBILE: true, MOBILEDEVICE: true, OPERA: false, QQ: false, QQBROWSER: false, TRIDENT: false, WEBKIT: true, WEIXIN: false }

**Kind**: global function  
**Returns**: <code>Object</code> \| <code>Boolean</code> - 返回常用 ua 匹配表，如果传了 name，那么返回是否匹配该终端 true/false

| Param     | Type                | Description                                                |
| --------- | ------------------- | ---------------------------------------------------------- |
| name      | <code>String</code> | 可选，比如传入 MicroMessenger，返回是否为微信内置浏览器    |
| userAgent | <code>String</code> | 可选，传入自定义的 ua，默认取浏览器的 navigator.appVersion |

<a name="cutCHSString"></a>

## cutCHSString(str, len, hasDot) ⇒ <code>String</code>

截取字符串，中文算 2 个字节

**Kind**: global function  
**Returns**: <code>String</code> - 返回截取后的字符串

| Param  | Type                 | Default            | Description    |
| ------ | -------------------- | ------------------ | -------------- |
| str    | <code>String</code>  |                    | 要截取的字符串 |
| len    | <code>Number</code>  |                    |                |
| hasDot | <code>Boolean</code> | <code>false</code> |                |

<a name="dash2Camel"></a>

## dash2Camel(string) ⇒ <code>String</code>

dash2Camel
将-间隔且全小写的 Dash 模式转成驼峰字符串

**Kind**: global function  
**Returns**: <code>String</code> - 返回转换后的字符串

| Param  | Type                | Description      |
| ------ | ------------------- | ---------------- |
| string | <code>String</code> | 需要转换的字符串 |

<a name="debounce"></a>

## debounce(fn, delay, immediate) ⇒ <code>function</code>

空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，fn 才会执行

**Kind**: global function  
**Returns**: <code>function</code> - 实际调用函数

| Param     | Type                  | Description                                                           |
| --------- | --------------------- | --------------------------------------------------------------------- |
| fn        | <code>function</code> | 要调用的函数                                                          |
| delay     | <code>number</code>   | 空闲时间                                                              |
| immediate | <code>bool</code>     | 给 immediate 参数传递 false 绑定的函数先执行，而不是 delay 后后执行。 |

<a name="decodeBase64"></a>

## decodeBase64(input) ⇒ <code>String</code>

base64 解码

**Kind**: global function  
**Returns**: <code>String</code> - 解码后的字符串

| Param | Type                | Description      |
| ----- | ------------------- | ---------------- |
| input | <code>String</code> | 需要解码的字符串 |

<a name="decodeUtf8"></a>

## decodeUtf8(input) ⇒ <code>String</code>

解码 Utf8

**Kind**: global function  
**Returns**: <code>String</code> - 解码后的字符串

| Param | Type                | Description      |
| ----- | ------------------- | ---------------- |
| input | <code>String</code> | 需要解码的字符串 |

<a name="delay"></a>

## delay()

防抖节流
return {Object} class

**Kind**: global function  
<a name="delCache"></a>

## delCache(name)

删除 localStorage

**Kind**: global function

| Param | Type                | Description |
| ----- | ------------------- | ----------- |
| name  | <code>String</code> | 名称        |

<a name="delCookie"></a>

## delCookie(name)

删除 cookie

**Kind**: global function

| Param | Type                | Description |
| ----- | ------------------- | ----------- |
| name  | <code>String</code> | cookie 名称 |

<a name="delSession"></a>

## delSession(name)

删除 sessionStorage

**Kind**: global function

| Param | Type                | Description |
| ----- | ------------------- | ----------- |
| name  | <code>String</code> | 名称        |

<a name="deWxJumpLink"></a>

## deWxJumpLink(string) ⇒ <code>String</code>

用=替换* 用&替换! 解码成微信跳转链接
name*exMall-detail-goodsInfoId!params(goodsInfoId)\*8866 转成 name=exMall-detail-goodsInfoId&params[goodsInfoId]=8866

**Kind**: global function  
**Returns**: <code>String</code> - 返回解码结果

| Param  | Type                | Description |
| ------ | ------------------- | ----------- |
| string | <code>String</code> | 传入字符串  |

<a name="deWxJumpLinkOld"></a>

## deWxJumpLinkOld(string) ⇒ <code>String</code>

用=替换~ 用&替换^ 解码成微信跳转链接

**Kind**: global function  
**Returns**: <code>String</code> - 返回解码结果

| Param  | Type                | Description |
| ------ | ------------------- | ----------- |
| string | <code>String</code> | 传入字符串  |

<a name="download"></a>

## download(url, filename, type)

文件下载的几种方式：1. 针对一些浏览器无法识别的文件格式。地址栏输入文件 URL、window.location.href = URL、window.open(URL)；2. 使用 a 标签 download 属性（或者 js 创建 a 标签）；3. 浏览器可识别的 pdf、txt 文件，后端兼容处理 attachment；4. 在 header 增加 token 用于鉴权下载，使用 XmlHttpRequest 来想后台发起请求

**Kind**: global function

| Param    | Type                | Default               | Description                                 |
| -------- | ------------------- | --------------------- | ------------------------------------------- |
| url      | <code>String</code> |                       | 链接                                        |
| filename | <code>String</code> |                       | 文件名                                      |
| type     | <code>String</code> | <code>download</code> | 下载类型 'href','open','download','request' |

<a name="encodeBase64"></a>

## encodeBase64(input) ⇒ <code>String</code>

字符串、数字转 base64

**Kind**: global function  
**Returns**: <code>String</code> - 返回 BASE64 编码

| Param | Type                | Description      |
| ----- | ------------------- | ---------------- |
| input | <code>String</code> | 需要编码的字符串 |

<a name="encodeUtf8"></a>

## encodeUtf8(input) ⇒ <code>String</code>

编码 Utf8

**Kind**: global function  
**Returns**: <code>String</code> - 返回 UTF-8 编码

| Param | Type                | Description      |
| ----- | ------------------- | ---------------- |
| input | <code>String</code> | 需要编码的字符串 |

<a name="enWxJumpLink"></a>

## enWxJumpLink(string) ⇒ <code>String</code>

用*替换= 用!替换& 转码成微信跳转链接
name=exMall-detail-goodsInfoId&params[goodsInfoId]=8866 转成 name*exMall-detail-goodsInfoId!params(goodsInfoId)\*8866

**Kind**: global function  
**Returns**: <code>String</code> - 返回转码结果

| Param  | Type                | Description |
| ------ | ------------------- | ----------- |
| string | <code>String</code> | 传入字符串  |

<a name="enWxJumpLinkOld"></a>

## enWxJumpLinkOld(string) ⇒ <code>String</code>

用~替换= 用^替换& 转码成微信跳转链接

**Kind**: global function  
**Returns**: <code>String</code> - 返回转码结果

| Param  | Type                | Description |
| ------ | ------------------- | ----------- |
| string | <code>String</code> | 传入字符串  |

<a name="fixNumber"></a>

## fixNumber([Number, String], number, n) ⇒ <code>number</code>

截取小数点后几位，不足的不补 0

**Kind**: global function  
**Returns**: <code>number</code> - 返回新数字

| Param            | Type                | Description                       |
| ---------------- | ------------------- | --------------------------------- |
| [Number, String] |                     | number 要处理的数字，必填         |
| number           |                     |                                   |
| n                | <code>number</code> | 要保留的小数点位数，默认保留 2 位 |

<a name="formatTime"></a>

## formatTime(time, fmt) ⇒ <code>String</code>

日期格式化插件
使用方式：formatTime(new Date(), "yyyy-MM-dd")

**Kind**: global function  
**Returns**: <code>String</code> - 返回字符串

| Param | Type                     | Default                 | Description        |
| ----- | ------------------------ | ----------------------- | ------------------ |
| time  | <code>Date/String</code> |                         | 时间对象或者字符串 |
| fmt   | <code>String</code>      | <code>yyyy-MM-dd</code> | 格式化风格         |

<a name="formatTimeStr"></a>

## formatTimeStr(time, fmt) ⇒ <code>String</code>

格式化时间成：刚刚、几分钟前

**Kind**: global function  
**Returns**: <code>String</code> - 返回字符串

| Param | Type                     | Description        |
| ----- | ------------------------ | ------------------ |
| time  | <code>Date/String</code> | 时间对象或者字符串 |
| fmt   | <code>String</code>      | 格式化风格         |

<a name="getAppVersion"></a>

## getAppVersion(appName, withosstr, userAgent) ⇒ <code>Boolean</code> \| <code>null</code>

获取 APP 版本号

**Kind**: global function  
**Returns**: <code>Boolean</code> \| <code>null</code> - null/true/false

| Param     | Type                 | Description                             |
| --------- | -------------------- | --------------------------------------- |
| appName   | <code>String</code>  | app 名称                                |
| withosstr | <code>Boolean</code> | 是否需要带上名称                        |
| userAgent | <code>String</code>  | ua，可不传，默认取 navigator.appVersion |

<a name="getCache"></a>

## getCache(name) ⇒

获取缓存，存入的如果是 Object，取出的也是 Object，不需要再转换

**Kind**: global function  
**Returns**: value 返回数据，存的如果是对象，取出的也是对象

| Param | Type                | Description |
| ----- | ------------------- | ----------- |
| name  | <code>String</code> | 缓存名称    |

<a name="getCHSLength"></a>

## getCHSLength(str) ⇒ <code>Number</code>

获取文本长度，中文算 2 个字节

**Kind**: global function  
**Returns**: <code>Number</code> - 返回长度

| Param | Type                | Description |
| ----- | ------------------- | ----------- |
| str   | <code>String</code> | 字符串      |

<a name="getCookie"></a>

## getCookie(name) ⇒ <code>String</code>

读取 cookies

**Kind**: global function  
**Returns**: <code>String</code> - 返回 cookie 字符串

| Param | Type                | Description |
| ----- | ------------------- | ----------- |
| name  | <code>String</code> | cookie 名称 |

<a name="getDirParam"></a>

## getDirParam(url) ⇒ <code>Object</code>

获取目录形式 URL 参数

**Kind**: global function  
**Returns**: <code>Object</code> - 返回参数对象

| Param | Type                | Description   |
| ----- | ------------------- | ------------- |
| url   | <code>String</code> | 传入 url 地址 |

<a name="getFileType"></a>

## getFileType(url) ⇒ <code>String</code>

文件后缀名

**Kind**: global function  
**Returns**: <code>String</code> - 返回文件后缀

| Param | Type                | Description |
| ----- | ------------------- | ----------- |
| url   | <code>String</code> | 文件名      |

<a name="getIsAppVersionLastest"></a>

## getIsAppVersionLastest(appName, compareVer, userAgent) ⇒ <code>Boolean</code> \| <code>null</code>

版本号大小对比

**Kind**: global function  
**Returns**: <code>Boolean</code> \| <code>null</code> - null/true/false

| Param      | Type                | Description                             |
| ---------- | ------------------- | --------------------------------------- |
| appName    | <code>String</code> | app 名称                                |
| compareVer | <code>String</code> | 必传 需要对比的版本号                   |
| userAgent  | <code>String</code> | ua，可不传，默认取 navigator.appVersion |

<a name="getNumber"></a>

## getNumber(string) ⇒ <code>String</code>

获取字符串中的数字

**Kind**: global function  
**Returns**: <code>String</code> - 返回纯数字字符串

| Param  | Type                | Description        |
| ------ | ------------------- | ------------------ |
| string | <code>String</code> | 传入带数字的字符串 |

<a name="getOsVersion"></a>

## getOsVersion(osName, withosstr, userAgent) ⇒ <code>Boolean</code> \| <code>null</code>

获取手机系统版本

**Kind**: global function  
**Returns**: <code>Boolean</code> \| <code>null</code> - null/true/false

| Param     | Type                 | Description                                    |
| --------- | -------------------- | ---------------------------------------------- |
| osName    | <code>String</code>  | 系统类型字符串 Android、iPod、iWatch 或 iPhone |
| withosstr | <code>Boolean</code> | 是否需要带上名称                               |
| userAgent | <code>String</code>  | ua，可不传，默认取 navigator.appVersion        |

<a name="getParameter"></a>

## getParameter(name) ⇒

获取单个 URL 参数

**Kind**: global function  
**Returns**: 返回参数值

| Param | Type                | Description |
| ----- | ------------------- | ----------- |
| name  | <code>String</code> | 参数名称    |

<a name="getRandomNum"></a>

## getRandomNum(min, max) ⇒ <code>Number</code>

获取随机整数

**Kind**: global function  
**Returns**: <code>Number</code> - 返回数字

| Param | Type                | Default         | Description    |
| ----- | ------------------- | --------------- | -------------- |
| min   | <code>Number</code> | <code>1</code>  | 随机数的最小值 |
| max   | <code>Number</code> | <code>10</code> | 随机数的最大值 |

<a name="getRandomStr"></a>

## getRandomStr(len, widthSpecialChar) ⇒ <code>String</code>

获取随机字符串

**Kind**: global function  
**Returns**: <code>String</code> - 随机串

| Param            | Type                 | Default            | Description                      |
| ---------------- | -------------------- | ------------------ | -------------------------------- |
| len              | <code>Number</code>  | <code>32</code>    | 需要获取随机字符串的长度         |
| widthSpecialChar | <code>Boolean</code> | <code>false</code> | 可选，是否需要生成带特殊字符的串 |

<a name="getRandomStrWidthSpecialChar"></a>

## getRandomStrWidthSpecialChar(len) ⇒ <code>String</code>

获取随机字符串带特殊符号

**Kind**: global function  
**Returns**: <code>String</code> - 随机串

| Param | Type                | Default         | Description              |
| ----- | ------------------- | --------------- | ------------------------ |
| len   | <code>Number</code> | <code>32</code> | 需要获取随机字符串的长度 |

<a name="getScrollPosition"></a>

## getScrollPosition() ⇒ <code>String</code>

获取滑动到顶部和底部 返回'top' 'bottom'，建议使用限流

**Kind**: global function  
**Returns**: <code>String</code> - 返回位置  
<a name="getSession"></a>

## getSession(name) ⇒ <code>String</code>

读取 sessionStorage

**Kind**: global function  
**Returns**: <code>String</code> - 返回 sessionStorage

| Param | Type                | Description |
| ----- | ------------------- | ----------- |
| name  | <code>String</code> | 名称        |

<a name="getType"></a>

## getType(target) ⇒ <code>String</code>

获取目标类型

**Kind**: global function  
**Returns**: <code>String</code> - 类型

| Param  | Type             | Description |
| ------ | ---------------- | ----------- |
| target | <code>any</code> | 目标        |

<a name="getUrlParam"></a>

## getUrlParam(url) ⇒ <code>Object</code>

获取 URL 参数

**Kind**: global function  
**Returns**: <code>Object</code> - 返回参数列表

| Param | Type                | Description   |
| ----- | ------------------- | ------------- |
| url   | <code>String</code> | 传入 url 参数 |

<a name="getWindowSize"></a>

## getWindowSize() ⇒ <code>Object</code>

getWindowSize 获取窗口大小

**Kind**: global function  
**Returns**: <code>Object</code> - 返回宽高  
<a name="imgAdapt"></a>

## imgAdapt(imgurl, size) ⇒ <code>String</code>

扩展图片自动适应多种分辨率 small original

**Kind**: global function  
**Returns**: <code>String</code> - 返回新地址

| Param  | Type                | Description |
| ------ | ------------------- | ----------- |
| imgurl | <code>String</code> | 图片 url    |
| size   | <code>String</code> | 图片规格    |

<a name="imgChoose"></a>

## imgChoose(imgurl) ⇒ <code>String</code>

扩展图片自动适应多种分辨率@2x @3x

**Kind**: global function  
**Returns**: <code>String</code> - 返回新地址

| Param  | Type                | Description |
| ------ | ------------------- | ----------- |
| imgurl | <code>String</code> | 图片地址    |

<a name="isArray"></a>

## isArray(arr)

判断是否数组

**Kind**: global function

| Param | Type               |
| ----- | ------------------ |
| arr   | <code>Array</code> |

<a name="isDigitals"></a>

## isDigitals(str) ⇒ <code>Boolean</code>

是否为由数字组成的字符串

**Kind**: global function  
**Returns**: <code>Boolean</code> - 返回 true/false

| Param | Type                | Description    |
| ----- | ------------------- | -------------- |
| str   | <code>String</code> | 待检测的字符串 |

<a name="isExitsFunction"></a>

## isExitsFunction(funcName) ⇒ <code>Boolean</code>

是否存在指定函数

**Kind**: global function  
**Returns**: <code>Boolean</code> - 返回 true/false

| Param    | Type                | Description |
| -------- | ------------------- | ----------- |
| funcName | <code>String</code> | 传入函数名  |

<a name="isExitsVariable"></a>

## isExitsVariable(variableName) ⇒ <code>Boolean</code>

是否存在指定变量

**Kind**: global function  
**Returns**: <code>Boolean</code> - 返回 true/false

| Param        | Type                | Description  |
| ------------ | ------------------- | ------------ |
| variableName | <code>String</code> | 传入变量名称 |

<a name="nextIndex"></a>

## nextIndex(min, max) ⇒ <code>Number</code>

返回下一个 zIndex 值

**Kind**: global function  
**Returns**: <code>Number</code> - 数字

| Param | Type                | Default            | Description  |
| ----- | ------------------- | ------------------ | ------------ |
| min   | <code>number</code> | <code>5000</code>  | 可选，最小值 |
| max   | <code>number</code> | <code>10000</code> | 可选，最大值 |

<a name="openUrl"></a>

## openUrl(url)

新标签页打开链接（浏览器不能解析的文件跳转下载）

**Kind**: global function

| Param | Type                | Description |
| ----- | ------------------- | ----------- |
| url   | <code>String</code> | 链接        |

<a name="pattern"></a>

## pattern() ⇒ <code>Object</code>

pattern 返回一些常用的正则：any, arrjson, chinese, email, float, isjson, json, mobile, number, pass, postcode, qq, string, tel, textarea, url, username

**Kind**: global function  
**Returns**: <code>Object</code> - 返回对象  
<a name="removeEvent"></a>

## removeEvent(element, type, handler)

removeEvent 移除由 addEvent 创建的事件委托

**Kind**: global function

| Param   | Type                  | Description           |
| ------- | --------------------- | --------------------- |
| element | <code>Object</code>   | js dom 对象           |
| type    | <code>String</code>   | 事件类型。不需要加 on |
| handler | <code>function</code> | 回调方法              |

<a name="searchTreeObject"></a>

## searchTreeObject(tree, [String, Object, Function], expression, keySet, number) ⇒ <code>Array</code>

tree 对象深度查找

**Kind**: global function  
**Returns**: <code>Array</code> - 返回查询到的数组

| Param                      | Type                | Description                    |
| -------------------------- | ------------------- | ------------------------------ |
| tree                       | <code>string</code> | 树形对象                       |
| [String, Object, Function] |                     | expression 必填 查询方式       |
| expression                 |                     |                                |
| keySet                     | <code>object</code> | 选填 默认的子类名称、查询 name |
| number                     | <code>number</code> | 选填 查找个数，不传则查询全部  |

<a name="setCache"></a>

## setCache(name, value, seconds) ⇒

获取缓存，存入的如果是 Object，取出的也是 Object，不需要再转换

**Kind**: global function  
**Returns**: value 返回数据，存的如果是对象，取出的也是对象

| Param   | Type                | Description                                                     |
| ------- | ------------------- | --------------------------------------------------------------- |
| name    | <code>String</code> | 缓存名称                                                        |
| value   |                     | [String, Boolean, Number, Object] 缓存数据，可以直接传入 Object |
| seconds | <code>Number</code> | 缓存时间（秒）                                                  |

<a name="setCookie"></a>

## setCookie(name, value, seconds, path, samesite)

setCookie 写入 cookie 的方法

**Kind**: global function

| Param    | Type                 | Default            | Description                        |
| -------- | -------------------- | ------------------ | ---------------------------------- |
| name     | <code>String</code>  |                    | cookie 名称                        |
| value    | <code>String</code>  |                    | 设置要存储的值，可以是对象或字符串 |
| seconds  | <code>Number</code>  | <code>86400</code> | cookie 有效时间默认 1 天           |
| path     | <code>String</code>  | <code>/</code>     | 路径，默认'/'                      |
| samesite | <code>Boolean</code> | <code>true</code>  | SameSite，默认 true                |

<a name="setSession"></a>

## setSession(name, value, seconds)

写 sessionStorage

**Kind**: global function

| Param   | Type                | Description                        |
| ------- | ------------------- | ---------------------------------- |
| name    | <code>String</code> | 名称                               |
| value   | <code>\*</code>     | 设置要存储的值，可以是对象或字符串 |
| seconds | <code>Number</code> | 有效时间                           |

<a name="stopBubble"></a>

## stopBubble(e) ⇒ <code>Boolean</code>

阻止冒泡

**Kind**: global function

| Param | Type                | Description       |
| ----- | ------------------- | ----------------- |
| e     | <code>Object</code> | dom 的 event 对象 |

<a name="stopDefault"></a>

## stopDefault(e) ⇒ <code>Boolean</code>

阻止默认事件

**Kind**: global function

| Param | Type                | Description       |
| ----- | ------------------- | ----------------- |
| e     | <code>Object</code> | dom 的 event 对象 |

<a name="textareaInsertText"></a>

## textareaInsertText(obj, str)

textarea 或 input 对象在指定的光标位置插入文字

**Kind**: global function

| Param | Type                | Description  |
| ----- | ------------------- | ------------ |
| obj   | <code>Object</code> | dom 对象     |
| str   | <code>String</code> | 要插入的文字 |

<a name="textareaMoveToEnd"></a>

## textareaMoveToEnd(obj)

textarea 或 input 对象将光标定位到文字尾部

**Kind**: global function

| Param | Type                | Description |
| ----- | ------------------- | ----------- |
| obj   | <code>Object</code> | dom 对象    |

<a name="throttle"></a>

## throttle(fn, delay, immediate) ⇒ <code>function</code>

频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次

**Kind**: global function  
**Returns**: <code>function</code> - 实际调用函数

| Param     | Type                  | Description                                                           |
| --------- | --------------------- | --------------------------------------------------------------------- |
| fn        | <code>function</code> | 需要调用的函数                                                        |
| delay     | <code>number</code>   | 延迟时间，单位毫秒                                                    |
| immediate | <code>bool</code>     | 给 immediate 参数传递 false 绑定的函数先执行，而不是 delay 后后执行。 |

<a name="trim"></a>

## trim(string, type) ⇒ <code>String</code>

trim()根据传参来去除空格

**Kind**: global function  
**Returns**: <code>String</code> - 返回新字符串

| Param  | Type                | Description                                                                              |
| ------ | ------------------- | ---------------------------------------------------------------------------------------- |
| string | <code>String</code> | 传入字符串                                                                               |
| type   | <code>string</code> | 可选，去除空格的类型 l:去除开头空格 r:去除尾部空格 lr:去除两端空格，为空的话去除所有空格 |

<a name="upperFirst"></a>

## upperFirst(string) ⇒ <code>String</code>

upperFirst
首字母大写

**Kind**: global function  
**Returns**: <code>String</code> - 返回转换后的字符串

| Param  | Type                | Description      |
| ------ | ------------------- | ---------------- |
| string | <code>String</code> | 需要转换的字符串 |
