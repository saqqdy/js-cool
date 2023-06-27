<div style="text-align: center;" align="center">

# js-cool

这是一个 Javascript 常用方法库

[![NPM version][npm-image]][npm-url]
[![Codacy Badge][codacy-image]][codacy-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]
[![gzip][gzip-image]][gzip-url]
[![License][license-image]][license-url]

[![Sonar][sonar-image]][sonar-url]

</div>

<div style="text-align: center; margin-bottom: 20px;" align="center">

### **[Documentation](https://www.saqqdy.com/js-cool)** • **[Change Log](./CHANGELOG.md)**

**使用其他语言阅读：[English](./README.md) | 简体中文**

</div>

## 安装

```bash
# 通过npm安装
npm install --save js-cool

# 或者通过yarn安装
yarn add js-cool

# 或者通过pnpm安装
pnpm install js-cool
```

## 使用

### 通过 import 引入模块的方式

```js
// 在你的.vue或者main.js里面写上import
import { getOsVersion, trim } from 'js-cool'
// 使用
trim(somestring, type) // 返回清理空格后的字符串
getOsVersion() // 返回系统版本
// ...
```

### 使用文件引入的方式

1. 通过 require 引入

   ```js
   // 在你的main.js文件里面加上下面这一行
   const { getOsVersion } = require('js-cool')
   ```

2. html 静态页直接使用

   ```html
   <!-- 在你的html代码上加上script标签，使用CDN链接引入 -->
   <script src="https://unpkg.com/js-cool@4.4.0/dist/index.global.prod.js"></script>
   ```

## 所有方法汇总

```js
const functionList = {
  // 全局参数
  client, // client方法返回一个浏览器判断结果对象
  pattern, // pattern返回一些常用的正则
  // String扩展、数组方法
  trim, // 根据传参来去除空格
  clearAttr, // 去除HTML标签所有属性
  clearHtml, // 去除HTML标签
  getNumber, // 获取字符串中的数字
  camel2Dash, // 将驼峰字符串转成-间隔且全小写的Dash模式
  dash2Camel, // 将-间隔且全小写的Dash模式转成驼峰字符串
  randomNumber, // 获取随机整数
  randomString, // 获取随机字符串
  getCHSLength, // 获取字符串长度，中文算2个字符
  cutCHSString, // 截取字符串，中文算2个字节
  // 获取一下状态
  isDigitals, // 是否为由数字组成的字符串
  isExitsFunction, // 是否存在指定函数
  isExitsVariable, // 是否存在指定变量
  inBrowser, // 判断是否在浏览器端运行
  windowSize, // windowSize获取窗口大小
  getAppVersion, // 获取APP版本号
  getOsVersion, // 获取手机系统版本
  compareVersion, // 版本号大小对比
  getDirParam, // 获取目录形式URL参数
  getParameter, // 获取单个URL参数
  getUrlParam, // 获取URL参数
  // 缓存、cookie、session
  getCache, // 读取localStorage
  setCache, // 写入localStorage
  delCache, // 删除localStorage
  getSession, // 读取sessionStorage
  setSession, // 写入sessionStorage
  delSession, // 删除sessionStorage
  getCookie, // 读取cookie
  setCookie, // 写入cookie
  delCookie, // 删除cookie
  // 编码与解码
  encodeBase64, // 字符串、数字转base64
  encodeUtf8, // 编码Utf8
  decodeBase64, // base64解码
  decodeUtf8, // 解码Utf8
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
  searchObject, // 对象查找
  openUrl, // 新标签页打开链接（浏览器不能解析的文件跳转下载）
  toThousands, // 千分位分割方法
  all, // 如果所提供的谓词函数对一个集合中的所有元素都返回true，则返回true，否则返回false。
  any, // 如果所提供的谓词函数对一个集合中的至少一个元素返回true，则返回true，否则返回false。
  uuid, // 浏览器端生成uuid，采用v4方法
  CSVToArray, // csv与json、array相互转换
  arrayToCSV, // csv与json、array相互转换
  CSVToJSON, // csv与json、array相互转换
  JSONToCSV, // csv与json、array相互转换
  RGBToHex, // 将RGB组件的值转换为颜色代码。
  intersect, // 多个数组求交集
  union, // 求多个数组的并集
  minus, // 求多个数组的差集，属于A但不属于B/C/D...的元素
  complement, // 多个数组求补集
  contains, // 数组是否包含指定元素
  unique, // 数组去重
  fillIPv6, // ipv6地址补全
  getProperty, // 根据路径字符串获取数组、对象属性值
  setProperty, // 根据路径字符串设置数组、对象属性值
  loadSource, // 动态加载资源，支持js、图片、css链接、css样式字符串
  mountCss, // 动态加载css链接资源
  mountImg, // 动态加载图片资源
  mountJs, // 动态加载js链接资源
  mountStyle // 动态加载css样式
}
```

## 问题和支持

请提交一个 issue [here](https://github.com/saqqdy/js-cool/issues).

## License

[npm-image]: https://img.shields.io/npm/v/js-cool.svg?style=flat-square
[npm-url]: https://npmjs.org/package/js-cool
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/js-cool/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/js-cool&utm_campaign=Badge_Grade
[travis-image]: https://travis-ci.com/saqqdy/js-cool.svg?branch=master
[travis-url]: https://travis-ci.com/saqqdy/js-cool
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/js-cool.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/js-cool?branch=master
[download-image]: https://img.shields.io/npm/dm/js-cool.svg?style=flat-square
[download-url]: https://npmjs.org/package/js-cool
[gzip-image]: http://img.badgesize.io/https://unpkg.com/js-cool/dist/index.global.prod.js?compression=gzip&label=gzip%20size:%20JS
[gzip-url]: http://img.badgesize.io/https://unpkg.com/js-cool/dist/index.global.prod.js?compression=gzip&label=gzip%20size:%20JS
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_js-cool
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_js-cool
