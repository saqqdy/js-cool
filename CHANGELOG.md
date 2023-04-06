# 更新日志

## 2023.04.06 v3.0.0

1. 移除 `imgAdapt` `imgChoose` `throttle` `debounce` `enWxJumpLink` `enWxJumpLinkOld` `deWxJumpLink` `deWxJumpLinkOld` `clearHtmlExpSN` `clearHtmlN` `clearHtmlNS` `clearHtmlTag` `formatTime` `formatTimeStr` `getFileType` `clearBr`
2. move `arrayToCSV` `CSVToArray` `CSVToJSON` `JSONToCSV` to `csv`
3. move `setCache` `getCache` `delCache` to `cache`
4. move `setSession` `getSession` `delSession` to `session`
5. move `setCookie` `getCookie` `delCookie` to `cookie`
6. add `isPlainObject` function
7. 支持 `const addEvent = require('js-cool/addEvent')` 这种引入方式
8. 构建产物区分 esnext 和 es5，默认输出 esnext
9. `splitThousand` => `toThousands`
10. `getWindowSize` => `windowSize`
11. new `extend` & `extendObject` function

## 2022.12.13 v2.8.0

1. `loadSource` `mountCss` `mountImg` `mountJs` `mountStyle`新增支持传入自定义属性，调整入参形式，并完善 ts 类型，修复 IE 兼容问题
2. 依赖包升级

## 2022.12.07 v2.7.1

1. 扩展`getType`方法支持的类型

## 2022.12.04 v2.7.0

1. 新增`setProperty`方法
2. 修复 getProperty bug

## 2022.12.04 v2.6.0

1. 新增`loadSource` `mountCss` `mountImg` `mountJs` `mountStyle` 5 个方法
2. 升级依赖包

## 2022.09.10 v2.5.0

1. 调整 exports 导出方式，重点支持 node esm 模式
2. 优化构建脚本
3. 升级依赖包

## 2022.08.23 v2.4.0

1. 升级依赖包
2. 优化构建流程

## 2022.03.12 v2.3.2

1. 升级依赖包
2. 优化文档

## 2022.02.25 v2.3.1

1. 修复`tslib`包问题

## 2021.11.11 v2.3.0

1. 导出模块进保留 default
2. 依赖包升级

## 2021.10.23 v2.2.4

1. 新增 getProperty 方法

## 2021.10.19 v2.2.3

1. 完善 fillIPv6 方法

## 2021.10.18 v2.2.2

1. 新增 fillIPv6 方法

## 2021.10.15 v2.2.1

1. 新增多个数组求交集、并集、差集、补集的方法
2. 新增 contains 方法
3. 新增 unique 去重的方法

## 2021.09.21 v2.1.3

1. 构建输出 banner

## 2021.09.10 v2.1.2

1. 完善 typescript 类型
2. 依赖包升级

## 2021.09.02 v2.1.1

1. 完善 typescript 类型

## 2021.08.29 v2.1.0

1. 新增构建 es 模块

## 2021.08.28 v2.0.1

1. 修复几个问题
2. 优化代码，优化文档

## 2021.08.26 v2.0.0

1. 全部改用 typescript 重构
2. 方法注释按 tsdoc 规范重新写

## 2021.07.26 v1.1.0

1. 采用 webpack 打 umd 包

## 2021.03.03 v1.0.9

1. 新增 all/any/RGBToHex/uuid 等方法
2. 新增 CSV 与对象之间的互转方法：arrayToCSV/CSVToArray/CSVToJSON/JSONtoCSV

## 2021.03.02 v1.0.8

1. 新增 splitThousand 千分位分割方法

## 2021.03.01 v1.0.7

1. 修复 nextIndex 的 bug

## 2021.02.18 v1.0.6

1. 新增 openUrl 方法

## 2021.02.18 v1.0.5

1. 新增 download/searchTreeObject 方法

## 2021.02.08 v1.0.4

1. 更新 getCookie/setCookie 方法

## 2021.02.01 v1.0.3

1. 处理 BUG

## 2021.01.23 v1.0.2

1. 新增 nextIndex,fixNumber,delay,extend,getType,isArray,cleanData,getCache,setCache,delCache
2. 删除 getLocal,setLocal,delLocal

## 2020.12.14 v1.0.1

1. 创建项目
