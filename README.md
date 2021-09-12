[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]
[![gzip][gzip-image]][gzip-url]
[![License][license-image]][license-url]

[npm-image]: https://img.shields.io/npm/v/js-cool.svg?style=flat-square
[npm-url]: https://npmjs.org/package/js-cool
[travis-image]: https://travis-ci.com/saqqdy/js-cool.svg?branch=master
[travis-url]: https://travis-ci.com/saqqdy/js-cool
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/js-cool.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/js-cool?branch=master
[david-image]: https://img.shields.io/david/saqqdy/js-cool.svg?style=flat-square
[david-url]: https://david-dm.org/saqqdy/js-cool
[snyk-image]: https://snyk.io/test/npm/js-cool/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/js-cool
[download-image]: https://img.shields.io/npm/dm/js-cool.svg?style=flat-square
[download-url]: https://npmjs.org/package/js-cool
[gzip-image]: http://img.badgesize.io/https://unpkg.com/js-cool/lib/index.js?compression=gzip&label=gzip%20size:%20JS
[gzip-url]: http://img.badgesize.io/https://unpkg.com/js-cool/lib/index.js?compression=gzip&label=gzip%20size:%20JS
[license-image]: https://img.shields.io/badge/License-MIT-yellow.svg
[license-url]: LICENSE

# **完整文档请查阅： [API 完整文档](./docs/modules.md)**

# 介绍

JS 常用方法，支持按需打包

# 软件架构

集成了大量常用方法，采用了纯原生 ES6+babel+webpack 的开发方式

# 安装教程

```shell
# 通过npm安装
npm install --save js-cool
# 或者通过yarn安装
yarn add js-cool
```

## 通过 import 引入模块的方式

```js
// 在你的.vue或者main.js里面写上import
import { trim, getOsVersion, ... } from 'js-cool'
// 使用
trim(somestring, type) // 返回清理空格后的字符串
getOsVersion()  // 返回系统版本
// ...
```

## 按需引入

```js
// 在你的.vue或者main.js里面写上import
import download from 'js-cool/lib/download'
// 使用
download(url, filename) // 下载文件
// ...
```

## 使用文件引入的方式

1. 通过 require 引入

```js
// 在你的main.js文件里面加上下面这一行
require('js-cool')
```

2. html 静态页直接使用

```html
<!-- 在你的html代码上加上script标签，使用CDN链接引入 -->
<script src="https://unpkg.com/js-cool@1.0.9/lib/index.umd.js"></script>
```

## 使用按需打包

1. 安装依赖

```shell
# 使用npm
npm install -D babel-plugin-import
# 使用yarn
yarn add -D babel-plugin-import
```

2. babel 设置

```js
// babel.config.js
module.exports = {
    plugins: [
        [
            'import',
            {
                libraryName: 'js-cool',
                style: false,
                libraryDirectory: 'lib',
                camel2DashComponentName: false
            },
            'js-cool'
        ]
    ]
}
```

# 所有方法汇总

```js
{
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
    setCache, // 写localStorage
    setSession, // 写sessionStorage
    getCookie, // 读取cookies
    getCache, // 读取localStorage
    getSession, // 读取sessionStorage
    delCookie, // 删除cookie
    delCache, // 删除localStorage
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
    // 工具类
    nextIndex, // 返回下一个zIndex值
    fixNumber, // 截取小数点后几位，不足的不补0
    extend, // 深拷贝
    delay, // 防抖节流
    getType, // 获取目标类型
    isArray, // 判断是否数组
    cleanData, // 清洗数据
    download, // 文件下载
    searchTreeObject, // 对象查找
    openUrl, // 新标签页打开链接（浏览器不能解析的文件跳转下载）
    splitThousand, // 千分位分割方法
    all, // 如果所提供的谓词函数对一个集合中的所有元素都返回true，则返回true，否则返回false。
    any, // 如果所提供的谓词函数对一个集合中的至少一个元素返回true，则返回true，否则返回false。
    uuid, // 浏览器端生成uuid，采用v4方法
    arrayToCSV, // 将一个二维数组转换为一个逗号分隔的值（CSV）字符串。
    CSVToArray, // 将一个逗号分隔的值（CSV）字符串转换为一个2D数组。
    CSVToJSON, // 将一个逗号分隔的值(CSV)字符串转换为一个2D对象数组。字符串的第一行作为标题行。
    JSONtoCSV, // 将一个对象数组转换为只包含指定列的逗号分隔值（CSV）字符串。
    RGBToHex, // 将RGB组件的值转换为颜色代码。
}
```

# 参与贡献

1. Fork 本仓库
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request

# 我的相关

-   **_使用_** _Readme_XXX.md_ 来支持不同的语言，`例如` _Readme_en.md, Readme_zh.md_
-   我的 Github：[https://github.com/saqqdy](https://github.com/saqqdy)
-   我的 npm：[https://npmjs.com/~saqqdy](https://npmjs.com/~saqqdy)
-   我的个人网站 [http://www.saqqdy.com](http://www.saqqdy.com)
