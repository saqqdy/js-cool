# js-cool 升级优化建议

> 基于对比分析文档，提出 js-cool 的升级优化建议，分为功能增强、性能优化、开发体验、生态建设四个维度。

---

## 一、功能增强建议

### 1.1 高优先级 - 补充高频使用方法

根据对比分析，建议补充以下 Lodash 高频使用但 js-cool 缺失的方法：

#### 数组方法

| 建议新增方法     | 描述          | Lodash 对应        | 优先级   |
| ---------------- | ------------- | ------------------ | -------- |
| `differenceBy`   | 按条件求差集  | `_.differenceBy`   | ⭐⭐⭐   |
| `intersectionBy` | 按条件求交集  | `_.intersectionBy` | ⭐⭐⭐   |
| `unionBy`        | 按条件求并集  | `_.unionBy`        | ⭐⭐⭐   |
| `findIndex`      | 查找索引      | `_.findIndex`      | ⭐⭐⭐⭐ |
| `findLastIndex`  | 反向查找索引  | `_.findLastIndex`  | ⭐⭐⭐   |
| `take`           | 取前 N 个元素 | `_.take`           | ⭐⭐⭐⭐ |
| `takeRight`      | 取后 N 个元素 | `_.takeRight`      | ⭐⭐⭐⭐ |
| `drop`           | 丢弃前 N 个   | `_.drop`           | ⭐⭐⭐   |
| `dropRight`      | 丢弃后 N 个   | `_.dropRight`      | ⭐⭐⭐   |
| `zip`            | 数组压缩      | `_.zip`            | ⭐⭐⭐   |
| `unzip`          | 数组解压      | `_.unzip`          | ⭐⭐⭐   |
| `partition`      | 分区          | `_.partition`      | ⭐⭐⭐⭐ |
| `countBy`        | 计数分组      | `_.countBy`        | ⭐⭐⭐   |

**示例实现建议**：

```typescript
// take.ts
function take<T>(array: T[], n: number = 1): T[] {
  if (!Array.isArray(array)) return []
  return array.slice(0, n < 0 ? 0 : n)
}

// partition.ts
function partition<T>(array: T[], predicate: (value: T) => boolean): [T[], T[]] {
  const pass: T[] = []
  const fail: T[] = []
  for (const item of array) {
    ;(predicate(item) ? pass : fail).push(item)
  }
  return [pass, fail]
}

// countBy.ts
function countBy<T>(
  array: T[],
  iteratee: keyof T | ((value: T) => string)
): Record<string, number> {
  const result: Record<string, number> = {}
  const getKey = typeof iteratee === 'function' ? iteratee : (item: T) => String(item[iteratee])

  for (const item of array) {
    const key = getKey(item)
    result[key] = (result[key] || 0) + 1
  }
  return result
}
```

#### 对象方法

| 建议新增方法  | 描述         | Lodash 对应     | 优先级   |
| ------------- | ------------ | --------------- | -------- |
| `mapKeys`     | 映射键名     | `_.mapKeys`     | ⭐⭐⭐   |
| `mapValues`   | 映射值       | `_.mapValues`   | ⭐⭐⭐⭐ |
| `invert`      | 键值反转     | `_.invert`      | ⭐⭐⭐   |
| `keys`        | 获取键数组   | `_.keys`        | ⭐⭐     |
| `values`      | 获取值数组   | `_.values`      | ⭐⭐     |
| `entries`     | 获取键值对   | `_.entries`     | ⭐⭐     |
| `fromEntries` | 键值对转对象 | `_.fromEntries` | ⭐⭐     |
| `has`         | 检查属性存在 | `_.has`         | ⭐⭐⭐   |
| `mergeWith`   | 自定义合并   | `_.mergeWith`   | ⭐⭐     |
| `transform`   | 对象转换     | `_.transform`   | ⭐⭐     |

**示例实现建议**：

```typescript
// mapValues.ts
function mapValues<T, R>(
  obj: Record<string, T>,
  mapper: (value: T, key: string) => R
): Record<string, R> {
  const result: Record<string, R> = {}
  for (const [key, value] of Object.entries(obj)) {
    result[key] = mapper(value, key)
  }
  return result
}

// invert.ts
function invert<T extends string | number>(obj: Record<string, T>): Record<T, string> {
  const result = {} as Record<T, string>
  for (const [key, value] of Object.entries(obj)) {
    result[value] = key
  }
  return result
}
```

#### 字符串方法

| 建议新增方法 | 描述               | Lodash 对应                 | 优先级 |
| ------------ | ------------------ | --------------------------- | ------ |
| `words`      | 分词               | `_.words`                   | ⭐⭐   |
| `capitalize` | 首字母大写其余小写 | `_.capitalize`              | ⭐⭐⭐ |
| `lowerFirst` | 首字母小写         | `_.lowerFirst`              | ⭐⭐⭐ |
| `padStart`   | 前填充             | `String.prototype.padStart` | ⭐⭐   |
| `padEnd`     | 后填充             | `String.prototype.padEnd`   | ⭐⭐   |
| `repeat`     | 重复字符串         | `String.prototype.repeat`   | ⭐⭐   |
| `template`   | 模板引擎           | `_.template`                | ⭐⭐⭐ |

### 1.2 中优先级 - 增强现有方法

#### 1.2.1 `clone` 方法增强

**现状**：不支持 Buffer、Promise、Set、Map、TypedArray 等

**建议**：增加对更多类型的支持

```typescript
// 建议增加的 clone 支持
function clone<T>(parent: T): T {
  // ... 现有实现

  // 新增类型支持
  if (parent instanceof Set) {
    return new Set([...parent].map(_clone)) as T
  }
  if (parent instanceof Map) {
    return new Map([...parent].map(([k, v]) => [_clone(k), _clone(v)])) as T
  }
  if (ArrayBuffer.isView(parent)) {
    return new (parent.constructor as any)(parent) as T
  }
  if (parent instanceof Promise) {
    return parent.then(_clone) as T
  }
  // ...
}
```

#### 1.2.2 `formatDate` 方法增强

**现状**：缺少本地化、时区支持

**建议**：增加更多格式标记和选项

```typescript
interface FormatDateOptions {
  locale?: string
  timezone?: string
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

function formatDate(
  date: Date | string | number,
  format = 'YYYY-MM-DD HH:mm:ss',
  options?: FormatDateOptions
): string {
  // 新增格式标记
  // d - 星期几 (0-6)
  // dd - 星期几简写
  // ddd - 星期几全称
  // Q - 季度
  // w - 周数
  // ... 等
}
```

#### 1.2.3 `groupBy` 增强为支持多层级分组

```typescript
// 支持多字段分组
function groupBy<T>(
  array: T[],
  iteratee: keyof T | ((value: T) => string) | (keyof T)[]
): Record<string, T[]> {
  // 支持数组形式的多字段分组
}
```

### 1.3 低优先级 - 新增特色功能

#### 1.3.1 链式调用支持（可选）

```typescript
// chain.ts
class Chain<T> {
  private value: T

  constructor(value: T) {
    this.value = value
  }

  map<U>(fn: (value: T) => U): Chain<U> {
    return new Chain(fn(this.value))
  }

  filter(predicate: (value: T) => boolean): Chain<T> {
    if (Array.isArray(this.value)) {
      return new Chain(this.value.filter(predicate) as T)
    }
    return this
  }

  value(): T {
    return this.value
  }
}

function chain<T>(value: T): Chain<T> {
  return new Chain(value)
}
```

#### 1.3.2 惰性求值（高级功能）

```typescript
// lazy.ts
class Lazy<T> {
  private iterable: Iterable<T>
  private operations: Array<(iterable: Iterable<T>) => Iterable<any>> = []

  constructor(iterable: Iterable<T>) {
    this.iterable = iterable
  }

  map<U>(fn: (value: T) => U): Lazy<U> {
    this.operations.push(function* (iterable: Iterable<T>) {
      for (const item of iterable) yield fn(item)
    })
    return this as any
  }

  filter(predicate: (value: T) => boolean): Lazy<T> {
    this.operations.push(function* (iterable: Iterable<T>) {
      for (const item of iterable) {
        if (predicate(item)) yield item
      }
    })
    return this
  }

  take(n: number): T[] {
    // 执行惰性求值
    let iterable = this.iterable
    for (const op of this.operations) {
      iterable = op(iterable as any)
    }
    const result: T[] = []
    for (const item of iterable) {
      if (result.length >= n) break
      result.push(item)
    }
    return result
  }
}
```

#### 1.3.3 Schema 验证（轻量级）

```typescript
// schema.ts - 轻量级对象验证
interface SchemaRules {
  type?: 'string' | 'number' | 'boolean' | 'array' | 'object'
  required?: boolean
  min?: number
  max?: number
  pattern?: RegExp
  enum?: any[]
  validate?: (value: any) => boolean
}

function validate(
  data: Record<string, any>,
  schema: Record<string, SchemaRules>
): {
  valid: boolean
  errors: Record<string, string[]>
} {
  const errors: Record<string, string[]> = {}

  for (const [key, rules] of Object.entries(schema)) {
    const value = data[key]
    const fieldErrors: string[] = []

    if (rules.required && (value === undefined || value === null)) {
      fieldErrors.push(`${key} is required`)
    }

    if (rules.type && typeof value !== rules.type) {
      fieldErrors.push(`${key} must be ${rules.type}`)
    }

    // ... 更多规则

    if (fieldErrors.length > 0) {
      errors[key] = fieldErrors
    }
  }

  return { valid: Object.keys(errors).length === 0, errors }
}
```

---

## 二、性能优化建议

### 2.1 深拷贝优化

**问题**：当前 `clone` 使用递归，对深层嵌套对象可能栈溢出

**建议**：使用迭代方式实现，并考虑使用 `structuredClone` 作为优先方案

```typescript
function clone<T>(parent: T): T {
  // 优先使用原生 structuredClone（现代浏览器/Node.js 17+）
  if (typeof structuredClone === 'function') {
    try {
      return structuredClone(parent)
    } catch {
      // 降级到自定义实现
    }
  }

  // 迭代方式实现，避免栈溢出
  const parents: any[] = []
  const children: any[] = []
  const stack: Array<{ source: any; target: any }> = []

  // ... 迭代实现
}
```

### 2.2 类型判断优化

**问题**：每次调用 `isArray`、`isObject` 等都会重新执行类型检查

**建议**：缓存类型字符串判断结果（适用于单次运行）

```typescript
// 优化前
function isArray(value: unknown): value is any[] {
  return Array.isArray(value)
}

// 优化后 - 对于复杂类型判断可以缓存
const typeCache = new WeakMap<object, string>()

function getType(value: unknown): string {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'

  const type = typeof value
  if (type !== 'object') return type

  // 对于对象类型，使用缓存
  if (typeCache.has(value as object)) {
    return typeCache.get(value as object)!
  }

  // ... 复杂类型判断
  const result = /* ... */ typeCache.set(value as object, result)
  return result
}
```

### 2.3 数组方法优化

#### 去重优化

```typescript
// 优化前 - 使用 Set
function unique<T>(array: T[]): T[] {
  return [...new Set(array)]
}

// 优化后 - 对于基本类型使用 Set，对于对象类型支持自定义比较
function unique<T>(array: T[], by?: keyof T | ((item: T) => any)): T[] {
  if (!by) return [...new Set(array)]

  const seen = new Map<any, T>()
  const getKey = typeof by === 'function' ? by : (item: T) => item[by]

  for (const item of array) {
    const key = getKey(item)
    if (!seen.has(key)) {
      seen.set(key, item)
    }
  }
  return [...seen.values()]
}
```

#### 排序优化

```typescript
// sorter.ts - 增加多字段排序支持
function sorter<T>(
  ...fields: Array<keyof T | { field: keyof T; order: 'asc' | 'desc'; transform?: (v: any) => any }>
): (a: T, b: T) => number {
  return (a: T, b: T) => {
    for (const field of fields) {
      const f = typeof field === 'object' ? field.field : field
      const order = typeof field === 'object' ? field.order : 'asc'
      const transform = typeof field === 'object' ? field.transform : undefined

      let va = a[f]
      let vb = b[f]
      if (transform) {
        va = transform(va)
        vb = transform(vb)
      }

      if (va < vb) return order === 'asc' ? -1 : 1
      if (va > vb) return order === 'asc' ? 1 : -1
    }
    return 0
  }
}
```

### 2.4 日期解析优化

**问题**：`new Date(dateString)` 对于某些格式可能解析失败

**建议**：增加更健壮的日期解析

```typescript
function parseDate(date: Date | string | number): Date | null {
  if (date instanceof Date) return date
  if (typeof date === 'number') return new Date(date)

  // 尝试多种格式解析
  const patterns = [
    /^(\d{4})-(\d{2})-(\d{2})$/, // YYYY-MM-DD
    /^(\d{4})\/(\d{2})\/(\d{2})$/, // YYYY/MM/DD
    /^(\d{4})年(\d{2})月(\d{2})日$/, // 中文格式
    // ... 更多格式
  ]

  for (const pattern of patterns) {
    const match = date.match(pattern)
    if (match) {
      return new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]))
    }
  }

  const result = new Date(date)
  return Number.isNaN(result.getTime()) ? null : result
}
```

---

## 三、开发体验优化

### 3.1 TypeScript 类型增强

#### 3.1.1 完善泛型约束

```typescript
// getProperty.ts - 增强类型推导
type PathImpl<T, Key extends string> = T extends object
  ? Key extends `${infer K}.${infer Rest}`
    ? K extends keyof T
      ? `${K}.${PathImpl<T[K], Rest>}`
      : never
    : Key extends keyof T
      ? Key
      : never
  : never

function getProperty<T, P extends PathImpl<T, string>>(
  obj: T,
  path: P,
  defaultValue?: any
): P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? PathImpl<T[K], Rest> extends never
      ? typeof defaultValue
      : any
    : typeof defaultValue
  : P extends keyof T
    ? T[P]
    : typeof defaultValue {
  // 实现...
}
```

#### 3.1.2 增加类型工具

```typescript
// types.ts - 新增工具类型
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P]
}

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type Required<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>
```

### 3.2 错误处理增强

```typescript
// 增加自定义错误类型
class JsCoolError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message)
    this.name = 'JsCoolError'
  }
}

// 在关键方法中使用
function getProperty(obj: any, path: string, defaultValue?: any): any {
  if (obj === null || obj === undefined) {
    if (defaultValue !== undefined) return defaultValue
    throw new JsCoolError(`Cannot read property '${path}' of null or undefined`, 'INVALID_INPUT', {
      obj,
      path,
    })
  }
  // ...
}
```

### 3.3 Tree-shaking 优化

**建议**：确保每个函数都是独立的模块，避免循环依赖

```typescript
// 优化导出结构
// src/index.ts 保持当前的独立导出方式

// 同时提供分组导出（可选）
// src/string.ts
export { default as camel2Dash } from './camel2Dash'
export { default as dash2Camel } from './dash2Camel'
// ...

// 用户可以这样导入
import { camel2Dash, dash2Camel } from 'js-cool/string'
```

### 3.4 文档增强

#### 3.4.1 增加在线 Playground

```
建议集成 CodeSandbox 或 StackBlitz 到文档站点，让用户可以直接试用
```

#### 3.4.2 增加 VS Code 插件

```
开发 VS Code 扩展，提供：
- 自动导入建议
- 悬停显示文档
- 代码片段
```

#### 3.4.3 增加迁移指南

```
从 Lodash 迁移指南：
- 方法对照表
- 代码转换示例
- 常见迁移问题
```

---

## 四、生态建设建议

### 4.1 测试覆盖率提升

**现状**：150+ 个测试文件（覆盖大部分函数）

**目标**：达到 95%+ 代码覆盖率

**建议**：

1. 增加边界条件测试
2. 增加性能基准测试
3. 增加跨环境测试（浏览器、Node.js、Deno、Bun）

```typescript
// 增加基准测试示例
// test/bench/unique.bench.ts
import { bench, describe } from 'vitest'
import { unique } from '../../src/unique'

describe('unique benchmark', () => {
  bench('unique with primitives', () => {
    unique([1, 2, 2, 3, 3, 3, 4, 4, 4, 4])
  })

  bench('unique with objects (by key)', () => {
    const data = Array(1000)
      .fill(null)
      .map((_, i) => ({ id: i % 100, value: i }))
    unique(data, 'id')
  })
})
```

### 4.2 插件生态

**建议**：支持插件扩展机制

```typescript
// plugin.ts
interface JsCoolPlugin {
  name: string
  install: (api: JsCoolApi) => void
}

interface JsCoolApi {
  addFunction: (name: string, fn: Function) => void
  extendType: (name: string, check: (value: unknown) => boolean) => void
}

const plugins: Map<string, any> = new Map()

function use(plugin: JsCoolPlugin) {
  if (plugins.has(plugin.name)) return
  plugin.install({
    addFunction: (name, fn) => {
      // 动态添加方法
    },
    extendType: (name, check) => {
      // 扩展类型检查
    },
  })
  plugins.set(plugin.name, true)
}

// 示例：lodash-compat 插件
const lodashCompatPlugin: JsCoolPlugin = {
  name: 'lodash-compat',
  install(api) {
    // 添加 lodash 风格的别名
    api.addFunction('uniq', unique)
    api.addFunction('cloneDeep', clone)
  },
}
```

### 4.3 社区建设

#### 4.3.1 GitHub 优化

```
- 完善 ISSUE_TEMPLATE
- 增加 PULL_REQUEST_TEMPLATE
- 增加 CONTRIBUTING.md
- 增加 CODE_OF_CONDUCT.md
- 设置 GitHub Actions 自动化 CI/CD
```

#### 4.3.2 NPM 发布优化

```json
// package.json 增加
{
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org"
  },
  "funding": {
    "type": "github",
    "url": "https://github.com/sponsors/saqqdy"
  }
}
```

### 4.4 兼容性矩阵

**建议**：明确支持的运行环境

| 环境    | 最低版本 | 测试状态  |
| ------- | -------- | --------- |
| Chrome  | 60+      | ✅        |
| Firefox | 55+      | ✅        |
| Safari  | 12+      | ✅        |
| Edge    | 79+      | ✅        |
| Node.js | 14+      | ✅        |
| Deno    | 1.0+     | ⚠️ 待测试 |
| Bun     | 1.0+     | ⚠️ 待测试 |

---

## 五、已完成功能（v6.0.0）

### ✅ URL 模块重构

- `Url` 类支持 search 和 hash 双参数系统
- 链式 URL 构建
- URLSearchParams-like 方法
- URL 属性提取静态方法
- Hash 路径操作

### ✅ UA 模块重构

- 支持 HarmonyOS、iPadOS 检测
- 支持钉钉、抖音、快手、小红书等国产应用检测
- 支持微信、企业微信、微博、支付宝、淘宝等检测
- 新增 `patterns` 模块统一管理正则

### ✅ Date 模块增强

- 新增 `DateParser` 类
- 支持链式日期操作
- 新增 `isBefore`、`isAfter`、`isSame`、`isBetween`
- 新增 `addDate`、`subtractDate`、`startOf`、`endOf`
- 新增 `minDate`、`maxDate`、`compareDate`

### ✅ Scroll 模块新增

- `scrollTo`、`scrollToTop`、`scrollToBottom`
- `lockScroll`、`unlockScroll`
- `isInViewport`、`getScrollbarWidth`
- `getProgress`、`getDirection`

### ✅ 其他增强

- 新增 `safeParse`、`safeStringify` 安全 JSON 处理
- 新增 `promiseFactory` Promise 工厂
- 新增 Storage 错误类型：`StorageQuotaError`、`StorageUnavailableError`
- 新增 Retry 错误类型：`RetryTimeoutError`、`RetryAbortError`

---

## 六、实施路线图

### Phase 1: 核心功能增强（v6.1）

**时间**：2-3 周

| 任务                             | 优先级 | 预估工时 |
| -------------------------------- | ------ | -------- |
| 新增 `take`、`drop`、`findIndex` | 高     | 2天      |
| 新增 `partition`、`countBy`      | 高     | 1天      |
| 新增 `mapValues`、`mapKeys`      | 高     | 1天      |
| 增强 `clone` 方法                | 中     | 1天      |
| 增强 `groupBy` 方法              | 中     | 0.5天    |
| 完善类型定义                     | 中     | 1天      |
| 增加边界测试                     | 中     | 1天      |

### Phase 2: 性能与体验优化（v6.2）

**时间**：2 周

| 任务           | 优先级 | 预估工时 |
| -------------- | ------ | -------- |
| 深拷贝性能优化 | 高     | 1天      |
| 数组方法优化   | 中     | 1天      |
| 日期解析增强   | 中     | 1天      |
| 错误处理增强   | 低     | 0.5天    |
| 文档完善       | 中     | 1天      |
| 基准测试       | 低     | 1天      |

### Phase 3: 生态建设（v6.3）

**时间**：持续

| 任务            | 优先级 | 预估工时 |
| --------------- | ------ | -------- |
| 插件机制        | 低     | 2天      |
| VS Code 扩展    | 低     | 2天      |
| 迁移指南        | 中     | 1天      |
| Lodash 兼容插件 | 低     | 1天      |

---

## 七、优先级总结

### 立即实施（P0）

1. ✅ ~~新增高频数组方法：`take`、`findIndex`、`partition`~~
2. ✅ ~~新增对象方法：`mapValues`、`has`~~
3. ✅ 完善 TypeScript 类型定义
4. ✅ 提升测试覆盖率到 90%+

### 近期实施（P1）

1. 增强 `clone` 支持 Set/Map/TypedArray
2. 增强 `formatDate` 支持更多格式
3. 优化深拷贝性能
4. 完善 API 文档

### 中期实施（P2）

1. 链式调用支持
2. 插件机制
3. VS Code 扩展
4. Lodash 迁移指南

### 长期规划（P3）

1. Schema 验证功能
2. 惰性求值
3. Deno/Bun 兼容测试
4. WebAssembly 加速（可选）

---

> 文档更新时间：2026-03-27
>
> 基于 js-cool v6.0.0 版本分析
>
> **已完成功能**:
> - `ua` 模块重构，支持 HarmonyOS、iPadOS、钉钉、抖音等检测
> - `Url` 类支持 search/hash 双参数系统
> - `DateParser` 类支持链式日期操作
> - `scroll` 模块新增滚动工具
> - `patterns` 模块统一管理正则模式
