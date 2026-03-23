# getGlobal <Badge type="tip" text="v6.0.0" />

安全地通过路径获取全局变量。是动态代码执行的安全、CSP 兼容替代方案。

## 安装

```bash
pnpm add js-cool
```

## 用法

```js
import { getGlobal } from 'js-cool'

// 获取全局函数
getGlobal('JSON.parse')  // ƒ parse()
getGlobal('Number')      // ƒ Number()
getGlobal('console.log') // ƒ log()

// 获取嵌套属性
getGlobal('document.body') // <body> 元素（浏览器环境）

// 不存在的路径
getGlobal('nonExistent')   // undefined
getGlobal('a.b.c')         // undefined

// 带类型参数（TypeScript）
const parse = getGlobal<(str: string) => unknown>('JSON.parse')
```

## API

```typescript
function getGlobal<T = unknown>(path: string): T | undefined
```

### 参数

| 参数   | 类型     | 描述                 |
| ------ | -------- | -------------------- |
| `path` | `string` | 点分隔的全局变量路径 |

### 返回值

- 路径对应的值，如果不存在则返回 `undefined`

## 安全优势

此函数比 `new Function('return ' + path)()` 等替代方案更安全：

| 特性     | `getGlobal` | `new Function()` |
| -------- | ----------- | ---------------- |
| 代码执行 | ❌ 否       | ⚠️ 是            |
| CSP 兼容 | ✅ 是       | ❌ 否            |
| 注入安全 | ✅ 是       | ❌ 否            |
| 性能     | ✅ 快       | ⚠️ 较慢          |

## 示例

### 检查函数是否存在

```js
import { getGlobal } from 'js-cool'

// 调用前检查
const axios = getGlobal('axios')
if (axios) {
  axios.get('/api/data')
}
```

### 获取内置构造函数

```js
import { getGlobal } from 'js-cool'

const NumberConstructor = getGlobal('Number')
const ArrayConstructor = getGlobal('Array')
const ObjectConstructor = getGlobal('Object')

// 使用它们
const num = NumberConstructor('123') // 123
const arr = ArrayConstructor(3) // [empty × 3]
```

### 获取嵌套属性

```js
import { getGlobal } from 'js-cool'

// 浏览器环境
const querySelector = getGlobal('document.querySelector')
const localStorage = getGlobal('window.localStorage')

// Node.js 环境
const env = getGlobal('process.env')
```

## 从 `_eval` 迁移

`_eval` 是一个使用动态代码执行的内部函数。`getGlobal` 是更安全的替代方案：

```js
// 之前（不安全）
import _eval from 'js-cool/_eval'
const fn = _eval('JSON.parse')

// 之后（安全）
import { getGlobal } from 'js-cool'
const fn = getGlobal('JSON.parse')
```
