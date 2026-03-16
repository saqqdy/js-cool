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

| 浏览器   | 支持情况 |
| -------- | -------- |
| Chrome   | ✅       |
| Firefox  | ✅       |
| Safari   | ✅       |
| Edge     | ✅       |
| Node.js  | ✅ >= 18 |

## 开源协议

[MIT License](https://github.com/saqqdy/js-cool/blob/master/LICENSE)
