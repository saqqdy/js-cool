# 介绍

**js-cool** 是一个现代 JavaScript 工具库，提供了一套实用的函数集合，助力日常开发。

## 为什么选择 js-cool？

- **🌱 轻量级** - 零依赖，支持 Tree-shaking，体积小巧
- **💎 TypeScript** - 使用 TypeScript 编写，提供完整的类型定义
- **🌐 跨平台** - 支持浏览器、Node.js 及任何 JavaScript 环境
- **📦 功能丰富** - 提供 100+ 实用函数，覆盖各种场景
- **🧪 稳定可靠** - 完整的单元测试，高覆盖率

## 快速示例

```js
import { camel2Dash, unique, clone, getUrlParams } from 'js-cool'

// 驼峰转短横线
camel2Dash('fontSize') // 'font-size'

// 数组去重
unique([1, 2, 2, 3, 3, 4]) // [1, 2, 3, 4]

// 深拷贝对象
const obj = { a: { b: 1 } }
const cloned = clone(obj)

// 解析 URL 参数
getUrlParams('https://example.com?name=John&age=30')
// { name: 'John', age: '30' }
```

## 浏览器支持

js-cool 支持所有现代浏览器和 Node.js >= 18。

| 浏览器  | 支持情况 |
| ------- | -------- |
| Chrome  | ✅       |
| Firefox | ✅       |
| Safari  | ✅       |
| Edge    | ✅       |
| IE11    | ✅       |
| Node.js | ✅ >= 18 |

### IE11 兼容性

js-cool v6.x 内置 IE11 兼容性支持，无需引入外部 polyfill。所有方法通过内部兼容层在 IE11 中无缝运行。

库内置 `_compat.ts` 模块，提供 ES6+ 特性的 IE11 兼容替代方案：

| ES6+ 特性              | IE11 兼容替代                 |
| ---------------------- | ----------------------------- |
| `Array.includes()`     | `arrayIncludes()`             |
| `String.includes()`    | `strIncludes()`               |
| `String.startsWith()`  | `strStartsWith()`             |
| `String.endsWith()`    | `strEndsWith()`               |
| `String.padStart()`    | `padStart()`                  |
| `String.padEnd()`      | `padEnd()`                    |
| `Number.isNaN()`       | `isNumberNaN()`               |
| `Number.isFinite()`    | `isNumberFinite()`            |
| `Number.isInteger()`   | `isNumberInteger()`           |
| `Object.assign()`      | `objectAssign()`              |
| `Object.values()`      | `objectValues()`              |
| `Object.entries()`     | `objectEntries()`             |
| `Object.fromEntries()` | `objectFromEntries()`         |
| `globalThis`           | `getGlobalObject()`           |
| `new File()`           | `createFile()`（降级为 Blob） |
| `Symbol.iterator`      | `isIterableCompat()`          |

部分函数内置优雅降级机制：

| 函数             | IE11 行为                               |
| ---------------- | --------------------------------------- |
| `isURL()`        | `URL` API 不可用时降级为正则验证        |
| `getDirParams()` | `URL` API 不可用时使用正则解析          |
| `urlToBlob()`    | `fetch` 不可用时使用 XHR                |
| `isDarkMode()`   | 返回 `false`（媒体查询不支持）          |
| `base64ToFile()` | 返回带 `name` 属性的 `Blob` 而非 `File` |

## 开源协议

[MIT License](https://github.com/saqqdy/js-cool/blob/master/LICENSE)
