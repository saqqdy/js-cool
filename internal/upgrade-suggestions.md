# js-cool 升级优化建议

> **当前版本**: v6.0.0 (2026-04-05 发布)
>
> **v6.1.0 状态**: 📋 计划中，待开发
>
> 本文档梳理了 js-cool 的升级优化建议及实施状态。

---

## 已完成功能汇总（v6.0.0）

### 字符串方法

| 方法       | 描述         | Lodash 对应  | 状态        |
| ---------- | ------------ | ------------ | ----------- |
| `words`    | 分词         | `_.words`    | ✅ v6.0.0   |
| `template` | 模板引擎     | `_.template` | ✅ v6.0.0   |

### 对象方法

| 方法        | 描述         | Lodash 对应    | 状态        |
| ----------- | ------------ | -------------- | ----------- |
| `transform` | 对象转换     | `_.transform`  | ✅ v6.0.0   |
| `mergeWith` | 自定义合并   | `_.mergeWith`  | ✅ v6.0.0   |

---

## v6.1.0 待开发功能

| 功能 | 描述 | 优先级 | 状态 |
|------|------|--------|------|
| `truncate` 多字节支持 | byWidth、breakEmoji 选项 | 高 | 📋 计划中 |
| `randomString` 预设 | hex、alphanum、alpha 预设 | 中 | 📋 计划中 |
| `clone` 增强 | 支持 Set/Map/TypedArray | 中 | 📋 计划中 |
| `groupBy` 增强 | 多层级分组 | 中 | 📋 计划中 |
| `chain` 链式调用 | 流式 API 支持 | 低 | 📋 计划中 |

### 1. `truncate` 多字节字符支持

**现状**：当前只支持字符长度，中文字符和 emoji 计数不准确。

**计划新增选项**：

```ts
interface TruncateOptions {
  length?: number
  omission?: string
  separator?: string | RegExp
  /** 按视觉宽度计算（中文=2，emoji=2） */
  byWidth?: boolean
  /** 保持 emoji 完整不被截断 */
  breakEmoji?: boolean
}
```

**使用示例**：

```ts
// 按视觉宽度截断
truncate('中文截断测试', { length: 6, byWidth: true })
// '中文截' (中文占2宽度，总宽度=6)

// 保持 emoji 完整
truncate('Hello 🌍 World', { length: 10, breakEmoji: false })
// 'Hello 🌍...'
```

### 2. `randomString` 预设字符集

**现状**：特殊字符集固定，无法快速使用常用字符集。

**计划新增选项**：

```ts
interface RandomStringOptions {
  charTypes?: RandomStringCharType | RandomStringCharType[]
  length?: number
  noConfuse?: boolean
  strict?: boolean
  secure?: boolean
  /** 预设字符集: 'hex' | 'alphanum' | 'alpha' | 'numeric' */
  preset?: string
  /** 自定义字符集 */
  chars?: string
}
```

**使用示例**：

```ts
// 预设字符集
randomString({ length: 8, preset: 'hex' })      // 'a3f2b8c1'
randomString({ length: 8, preset: 'alphanum' }) // 'x7Yz2aB9'
randomString({ length: 8, preset: 'alpha' })    // 'aBcDeFgH'
randomString({ length: 8, preset: 'numeric' })  // '84729136'

// 自定义字符集
randomString({ length: 16, chars: 'abcdef0123456789' })
// 'a3f2b8c1d4e5f6a7'
```

### 3. `clone` 增强

**现状**：当前代码注释明确写了 "Buffer, Promise, Set, Map are not supported"。

**计划新增支持**：

```ts
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

**使用示例**：

```ts
// Set 克隆
const set = new Set([1, 2, 3])
const clonedSet = clone(set) // Set {1, 2, 3}

// Map 克隆
const map = new Map([['a', 1], ['b', 2]])
const clonedMap = clone(map) // Map {'a' => 1, 'b' => 2}

// TypedArray 克隆
const arr = new Uint8Array([1, 2, 3])
const clonedArr = clone(arr) // Uint8Array [1, 2, 3]
```

### 4. `groupBy` 多层级分组

**现状**：当前只支持单字段分组。

**计划增强**：

```ts
// 支持数组形式的多字段分组
function groupBy<T>(
  array: T[],
  iteratee: keyof T | ((value: T) => string) | (keyof T)[]
): Record<string, T[]>
```

**使用示例**：

```ts
const users = [
  { department: 'tech', team: 'frontend', name: 'Alice' },
  { department: 'tech', team: 'backend', name: 'Bob' },
  { department: 'tech', team: 'frontend', name: 'Charlie' },
  { department: 'hr', team: 'recruit', name: 'David' },
]

// 单字段分组（当前支持）
groupBy(users, 'department')
// { tech: [...], hr: [...] }

// 多字段分组（计划支持）
groupBy(users, ['department', 'team'])
// {
//   'tech.frontend': [...],
//   'tech.backend': [...],
//   'hr.recruit': [...]
// }
```

### 5. `chain` 链式调用支持

**现状**：无链式调用支持，需要嵌套函数调用。

**计划新增**：

```ts
class Chain<T> {
  private value: T

  constructor(value: T) {
    this.value = value
  }

  // 字符串方法
  trim(): Chain<string>
  lowerCase(): Chain<string>
  upperCase(): Chain<string>
  kebabCase(): Chain<string>
  snakeCase(): Chain<string>
  capitalize(): Chain<string>
  truncate(options: TruncateOptions): Chain<string>

  // 数组方法
  map<U>(fn: (value: T) => U): Chain<U[]>
  filter(predicate: (value: T) => boolean): Chain<T[]>
  take(n: number): Chain<T[]>
  drop(n: number): Chain<T[]>
  unique(): Chain<T[]>
  sortBy(key: keyof T): Chain<T[]>

  // 输出
  value(): T
}

function chain<T>(value: T): Chain<T>
```

**使用示例**：

```ts
// 字符串处理链
chain('  Hello World  ')
  .trim()
  .lowerCase()
  .kebabCase()
  .truncate(10)
  .value()
// 'hello-worl...'

// 数组处理链
chain([3, 1, 4, 1, 5, 9, 2, 6])
  .unique()
  .sortBy()
  .take(5)
  .value()
// [1, 2, 3, 4, 5]
```

---

## 一、功能增强建议

### 1.1 高优先级 - 补充高频使用方法

根据对比分析，建议补充以下 Lodash 高频使用但 js-cool 缺失的方法：

#### 数组方法

| 建议新增方法     | 描述          | Lodash 对应        | 优先级   | 状态   |
| ---------------- | ------------- | ------------------ | -------- | ------ |
| `differenceBy`   | 按条件求差集  | `_.differenceBy`   | ⭐⭐⭐   | ✅ 已实现 |
| `intersectionBy` | 按条件求交集  | `_.intersectionBy` | ⭐⭐⭐   | ✅ 已实现 |
| `unionBy`        | 按条件求并集  | `_.unionBy`        | ⭐⭐⭐   | ✅ 已实现 |
| `findIndex`      | 查找索引      | `_.findIndex`      | ⭐⭐⭐⭐ | ✅ 已实现 |
| `findLastIndex`  | 反向查找索引  | `_.findLastIndex`  | ⭐⭐⭐   | ✅ 已实现 |
| `take`           | 取前 N 个元素 | `_.take`           | ⭐⭐⭐⭐ | ✅ 已实现 |
| `takeRight`      | 取后 N 个元素 | `_.takeRight`      | ⭐⭐⭐⭐ | ✅ 已实现 |
| `drop`           | 丢弃前 N 个   | `_.drop`           | ⭐⭐⭐   | ✅ 已实现 |
| `dropRight`      | 丢弃后 N 个   | `_.dropRight`      | ⭐⭐⭐   | ✅ 已实现 |
| `zip`            | 数组压缩      | `_.zip`            | ⭐⭐⭐   | ✅ 已实现 |
| `unzip`          | 数组解压      | `_.unzip`          | ⭐⭐⭐   | ✅ 已实现 |
| `partition`      | 分区          | `_.partition`      | ⭐⭐⭐⭐ | ✅ 已实现 |
| `countBy`        | 计数分组      | `_.countBy`        | ⭐⭐⭐   | ✅ 已实现 |
| `unique`         | 数组去重      | `_.uniq`           | ⭐⭐⭐⭐ | ✅ 已实现 |
| `shuffle`        | 随机打乱      | `_.shuffle`        | ⭐⭐⭐   | ✅ 已实现 |
| `sorter`         | 按键排序      | `_.sortBy`         | ⭐⭐⭐   | ✅ 已实现 |
| `chunk`          | 分块          | `_.chunk`          | ⭐⭐⭐   | ✅ 已实现 |
| `flatten`        | 扁平化        | `_.flatten`        | ⭐⭐⭐   | ✅ 已实现 |
| `groupBy`        | 分组          | `_.groupBy`        | ⭐⭐⭐   | ✅ 已实现 |
| `keyBy`          | 键值映射      | `_.keyBy`          | ⭐⭐⭐   | ✅ 已实现 |
| `sample`         | 随机取一个    | `_.sample`         | ⭐⭐⭐   | ✅ 已实现 |
| `sampleSize`     | 随机取N个     | `_.sampleSize`     | ⭐⭐⭐   | ✅ 已实现 |
| `intersect`      | 交集          | `_.intersection`   | ⭐⭐⭐   | ✅ 已实现 |
| `union`          | 并集          | `_.union`          | ⭐⭐⭐   | ✅ 已实现 |
| `minus`          | 差集          | `_.difference`     | ⭐⭐⭐   | ✅ 已实现 |
| `complement`     | 补集          | `_.xor`            | ⭐⭐⭐   | ✅ 已实现 |
| `contains`       | 包含检测      | `_.includes`       | ⭐⭐⭐   | ✅ 已实现 |
| `all`            | 全部满足      | `_.every`          | ⭐⭐⭐   | ✅ 已实现 |
| `any`            | 任意满足      | `_.some`           | ⭐⭐⭐   | ✅ 已实现 |
| `searchObject`   | 树形查找      | -                  | ⭐⭐⭐   | ✅ 已实现 |

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

| 建议新增方法  | 描述         | Lodash 对应     | 优先级   | 状态   |
| ------------- | ------------ | --------------- | -------- | ------ |
| `mapKeys`     | 映射键名     | `_.mapKeys`     | ⭐⭐⭐   | ✅ 已实现 |
| `mapValues`   | 映射值       | `_.mapValues`   | ⭐⭐⭐⭐ | ✅ 已实现 |
| `invert`      | 键值反转     | `_.invert`      | ⭐⭐⭐   | ✅ 已实现 |
| `keys`        | 获取键数组   | `_.keys`        | ⭐⭐     | ⚠️ 原生支持（Object.keys） |
| `values`      | 获取值数组   | `_.values`      | ⭐⭐     | ⚠️ 原生支持（Object.values） |
| `entries`     | 获取键值对   | `_.entries`     | ⭐⭐     | ⚠️ 原生支持（Object.entries） |
| `fromEntries` | 键值对转对象 | `_.fromEntries` | ⭐⭐     | ⚠️ 原生支持（Object.fromEntries） |
| `has`         | 检查属性存在 | `_.has`         | ⭐⭐⭐   | ⚠️ 原生支持（Object.hasOwn） |
| `mergeWith`   | 自定义合并   | `_.mergeWith`   | ⭐⭐     | ⚠️ 部分实现（extend 支持深度合并） |
| `transform`   | 对象转换     | `_.transform`   | ⭐⭐     | ❌ 待开发 |
| `clone`       | 深拷贝       | `_.cloneDeep`   | ⭐⭐⭐⭐ | ✅ 已实现 |
| `extend`      | 合并对象     | `_.merge`       | ⭐⭐⭐   | ✅ 已实现（支持深度合并） |
| `getProperty` | 获取属性     | `_.get`         | ⭐⭐⭐   | ✅ 已实现 |
| `setProperty` | 设置属性     | `_.set`         | ⭐⭐⭐   | ✅ 已实现 |
| `omit`        | 排除属性     | `_.omit`        | ⭐⭐⭐   | ✅ 已实现 |
| `pick`        | 选取属性     | `_.pick`        | ⭐⭐⭐   | ✅ 已实现 |
| `cleanData`   | 数据清洗     | -               | ⭐⭐⭐   | ✅ 已实现 |
| `isEqual`     | 深度比较     | `_.isEqual`     | ⭐⭐⭐   | ✅ 已实现 |
| `isEmpty`     | 空值检测     | `_.isEmpty`     | ⭐⭐⭐   | ✅ 已实现 |

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

| 建议新增方法 | 描述               | Lodash 对应                 | 优先级 | 状态   |
| ------------ | ------------------ | --------------------------- | ------ | ------ |
| `words`      | 分词               | `_.words`                   | ⭐⭐   | ❌ 待开发 |
| `capitalize` | 首字母大写其余小写 | `_.capitalize`              | ⭐⭐⭐ | ✅ 已实现 |
| `lowerFirst` | 首字母小写         | `_.lowerFirst`              | ⭐⭐⭐ | ✅ 已实现 |
| `padStart`   | 前填充             | `String.prototype.padStart` | ⭐⭐   | ⚠️ 原生支持 |
| `padEnd`     | 后填充             | `String.prototype.padEnd`   | ⭐⭐   | ⚠️ 原生支持 |
| `repeat`     | 重复字符串         | `String.prototype.repeat`   | ⭐⭐   | ⚠️ 原生支持 |
| `template`   | 模板引擎           | `_.template`                | ⭐⭐⭐ | ❌ 待开发 |
| `camel2Dash` | 驼峰转短横线       | `_.kebabCase`               | ⭐⭐⭐ | ✅ 已实现 |
| `dash2Camel` | 短横线转驼峰       | `_.camelCase`               | ⭐⭐⭐ | ✅ 已实现 |
| `upperFirst` | 首字母大写         | `_.upperFirst`              | ⭐⭐⭐ | ✅ 已实现 |
| `kebabCase`  | 转短横线命名       | `_.kebabCase`               | ⭐⭐⭐ | ✅ 已实现 |
| `snakeCase`  | 转下划线命名       | `_.snakeCase`               | ⭐⭐⭐ | ✅ 已实现 |
| `truncate`   | 截断字符串         | `_.truncate`                | ⭐⭐⭐ | ✅ 已实现 |
| `clearHtml`  | 清除HTML标签       | -                           | ⭐⭐⭐ | ✅ 已实现 |
| `clearAttr`  | 清除HTML属性       | -                           | ⭐⭐⭐ | ✅ 已实现 |
| `mapTemplate`| 模板字符串替换     | -                           | ⭐⭐⭐ | ✅ 已实现 |
| `escape`     | HTML转义           | `_.escape`                  | ⭐⭐⭐ | ✅ 已实现 |
| `unescape`   | HTML反转义         | `_.unescape`                | ⭐⭐⭐ | ✅ 已实现 |

### 1.2 中优先级 - 增强现有方法

> 注：以下为可选增强项，当前实现已满足大部分使用场景。

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

### 1.3 低优先级 - 新增特色功能（暂无计划）

> 以下功能为扩展性功能，暂无开发计划。

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
// types.ts - 新增工具类型（已有部分实现）
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

**现状**：已支持子路径导入

```json
{
  "exports": {
    ".": { "import": "./dist/index.mjs", "require": "./dist/index.js" },
    "./ua": { "import": "./dist/ua/index.mjs", "require": "./dist/ua/index.js" },
    "./date": { "import": "./dist/date/index.mjs", "require": "./dist/date/index.js" },
    "./url": { "import": "./dist/url/index.mjs", "require": "./dist/url/index.js" },
    "./scroll": { "import": "./dist/scroll/index.mjs", "require": "./dist/scroll/index.js" },
    "./storage": { "import": "./dist/storage/index.mjs", "require": "./dist/storage/index.js" },
    "./binary": { "import": "./dist/binary/index.mjs", "require": "./dist/binary/index.js" },
    "./patterns": { "import": "./dist/patterns/index.mjs", "require": "./dist/patterns/index.js" }
  }
}
```

**建议**：增加更多子路径导出

```json
{
  "exports": {
    "./string": { "import": "./dist/string/index.mjs", "require": "./dist/string/index.js" },
    "./array": { "import": "./dist/array/index.mjs", "require": "./dist/array/index.js" },
    "./object": { "import": "./dist/object/index.mjs", "require": "./dist/object/index.js" },
    "./number": { "import": "./dist/number/index.mjs", "require": "./dist/number/index.js" },
    "./color": { "import": "./dist/color/index.mjs", "require": "./dist/color/index.js" }
  }
}
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

**现状**：128 个测试文件（覆盖大部分函数）

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

> 以下功能均已完成实现并测试。

### ✅ Binary 模块（新增）

全新的二进制数据处理模块，提供统一的转换 API：

- **链式转换**：`binary.from(blob).toBase64()`
- **类型检测**：`binary.isBlob()`, `binary.isFile()`, `binary.isArrayBuffer()`
- **子模块**：
  - `binary.base64` - Base64 编解码
  - `binary.blob` - Blob 转换
  - `binary.arrayBuffer` - ArrayBuffer 转换
  - `binary.file` - File 转换
  - `binary.url` - URL 获取二进制数据
  - `binary.svg` - SVG 转换
  - `binary.text` - 文本编解码
  - `binary.dataURL` - Data URL 处理
  - `binary.hex` - 十六进制编解码
  - `binary.hash` - 哈希计算（MD5, SHA-1, SHA-256, CRC32）
  - `binary.meta` - 元数据提取
- **工具方法**：`binary.compare()`, `binary.clone()`, `binary.download()`

### ✅ URL 模块重构

- `Url` 类支持 search 和 hash 双参数系统
- 链式 URL 构建
- URLSearchParams-like 方法
- URL 属性提取静态方法（`getOrigin`, `getHost`, `getPathname` 等）
- Hash 路径操作

### ✅ UA 模块重构

- 支持 HarmonyOS、iPadOS 检测
- 支持钉钉、抖音、快手、小红书等国产应用检测
- 支持微信、企业微信、微博、支付宝、淘宝等检测
- 新增 `patterns` 模块统一管理正则

### ✅ Date 模块增强

- 新增 `DateParser` 类（链式日期操作）
- 新增比较方法：`isBefore`、`isAfter`、`isSame`、`isBetween`
- 新增操作方法：`addDate`、`subtractDate`、`startOf`、`endOf`
- 新增聚合方法：`minDate`、`maxDate`、`compareDate`
- 新增获取方法：`getQuarter`、`getWeekOfYear`、`getDayOfYear`

### ✅ Scroll 模块新增

完整的滚动工具集合：

- `scrollTo`、`scrollToTop`、`scrollToBottom`、`scrollBy`
- `lockScroll`、`unlockScroll`、`toggleScroll`、`isScrollLocked`
- `isInViewport`、`getScrollbarWidth`
- `getProgress`、`getDirection`、`createDirectionTracker`

### ✅ Storage 模块重构

统一存储 API：

- `storage.local` - localStorage 封装（支持过期时间）
- `storage.session` - sessionStorage 封装（支持过期时间）
- `storage.cookie` - Cookie 封装（完整选项支持）
- 错误类型：`StorageQuotaError`、`StorageUnavailableError`

### ✅ 其他增强

- 新增 `safeParse`、`safeStringify` 安全 JSON 处理
- 新增 `promiseFactory` Promise 工厂
- 新增 `punctualTimer` 精确定时器
- 新增 `download` 文件下载工具
- 新增 `fingerprint` 浏览器指纹
- 新增类型工具：`PickRequired`、`OmitRequired`、`PickPartial`、`OmitPartial`、`MaybePromiseOrGetter`
- Retry 错误类型：`RetryTimeoutError`、`RetryAbortError`

### ✅ 构建与导出优化

- 使用 Rolldown 构建（更快）
- 支持子路径导入（tree-shaking 友好）
- 类型定义自动生成

---

## 六、实施路线图

### Phase 1: 核心功能增强 ✅ v6.0.0 已发布

| 任务                             | 优先级 | 状态      |
| -------------------------------- | ------ | --------- |
| 新增 `take`、`drop`、`findIndex` | 高     | ✅ 已完成 |
| 新增 `partition`、`countBy`      | 高     | ✅ 已完成 |
| 新增 `mapValues`、`mapKeys`      | 高     | ✅ 已完成 |
| 完善 TypeScript 类型定义         | 中     | ✅ 已完成 |
| 增加边界测试                     | 中     | ✅ 已完成 |

### Phase 2: 功能增强与优化（v6.1.0）📋 计划中

| 任务                        | 优先级 | 状态      |
| --------------------------- | ------ | --------- |
| `truncate` 多字节字符支持   | 高     | 📋 计划中 |
| `randomString` 预设字符集   | 中     | 📋 计划中 |
| 增强 `clone` 支持 Set/Map   | 中     | 📋 计划中 |
| 增强 `groupBy` 多层级分组   | 中     | 📋 计划中 |
| 链式调用支持 `chain`        | 低     | 📋 计划中 |

### Phase 3: 性能与生态（v6.2.0）📋 计划中

| 任务                | 优先级 | 状态      |
| ------------------- | ------ | --------- |
| 深拷贝性能优化      | 高     | 📋 计划中 |
| 日期解析增强        | 中     | 📋 计划中 |
| 插件机制            | 低     | 📋 计划中 |
| VS Code 扩展        | 低     | 📋 计划中 |
| Lodash 迁移指南     | 中     | 📋 计划中 |

---

## 七、优先级总结

### v6.0.0 已发布 ✅

1. ✅ 新增高频数组方法：`take`、`findIndex`、`partition`、`countBy`、`zip`、`unzip`
2. ✅ 新增对象方法：`mapValues`、`mapKeys`、`invert`
3. ✅ 完善 TypeScript 类型定义
4. ✅ 提升测试覆盖率（140+ 测试文件）
5. ✅ `binary` 模块、`Url` 类、`DateParser` 类、`scroll` 模块等

### v6.1.0 计划中 📋

1. `truncate` 多字节字符支持（byWidth、breakEmoji）
2. `randomString` 预设字符集（hex、alphanum、alpha）
3. 增强 `clone` 支持 Set/Map/TypedArray
4. 增强 `groupBy` 多层级分组
5. 链式调用支持 `chain`

### v6.2.0 计划中 📋

1. 深拷贝性能优化（使用 `structuredClone`）
2. 日期解析增强
3. 插件机制
4. VS Code 扩展
5. Lodash 迁移指南

### 暂无计划

1. Schema 验证功能
2. 惰性求值
3. Deno/Bun 兼容测试
4. WebAssembly 加速

---

## 八、当前模块概览

| 模块     | 文件数 | 主要功能                               | 状态 |
| -------- | ------ | -------------------------------------- | ---- |
| string   | 15     | 字符串处理（驼峰转换、截断、模板等）   | ✅   |
| array    | 22     | 数组处理（去重、排序、分组、采样等）   | ✅   |
| object   | 21     | 对象处理（克隆、合并、属性操作等）     | ✅   |
| date     | 8      | 日期处理（格式化、比较、操作等）       | ✅   |
| url      | 2      | URL 解析和构建                         | ✅   |
| ua       | 10     | User-Agent 检测                        | ✅   |
| storage  | 7      | 存储操作（localStorage/session/cookie）| ✅   |
| scroll   | 8      | 滚动工具                               | ✅   |
| binary   | 8      | 二进制数据转换                         | ✅   |
| patterns | 5      | 正则模式管理                           | ✅   |
| color    | 6      | 颜色处理（RGB/HSL转换、亮度调整等）    | ✅   |
| number   | 8      | 数字处理（范围、取整、求和等）         | ✅   |
| validate | 5      | 验证函数（邮箱、手机、URL等）          | ✅   |
| dom      | 13     | DOM 操作（事件、复制、下载等）         | ✅   |
| utility  | 16     | 工具函数（UUID、延迟、指纹等）         | ✅   |
| async    | 3      | 异步流程（防抖、节流、重试）           | ✅   |

---

> 文档更新时间：2026-04-10
>
> **当前版本**: v6.0.0
>
> **v6.0.0 已发布功能**:
> - ✅ `binary` 模块 - 统一二进制转换 API，支持链式调用、哈希计算、元数据提取
> - ✅ `ua` 模块重构 - 支持 HarmonyOS、iPadOS、钉钉、抖音等检测
> - ✅ `Url` 类 - 支持 search/hash 双参数系统，链式构建
> - ✅ `DateParser` 类 - 链式日期操作，完整的比较和操作方法
> - ✅ `scroll` 模块 - 完整滚动工具集
> - ✅ `storage` 模块 - 统一存储 API，支持过期时间
> - ✅ `patterns` 模块 - 统一正则模式管理
> - ✅ 子路径导入 - 支持 tree-shaking
> - ✅ `words` - 分词（支持 camelCase、PascalCase、snake_case、kebab-case）
> - ✅ `template` - 模板引擎（支持自定义分隔符、HTML 转义、嵌套属性）
> - ✅ `transform` - 对象转换（支持数组/对象转换、提前退出）
> - ✅ `mergeWith` - 自定义合并（支持自定义合并策略）
> - ✅ 数组方法增强 - 新增 `take`、`takeRight`、`drop`、`dropRight`、`findIndex`、`findLastIndex`、`partition`、`countBy`、`zip`、`unzip`、`differenceBy`、`intersectionBy`、`unionBy`
> - ✅ 对象方法增强 - 新增 `mapKeys`、`mapValues`、`invert`
> - ✅ 字符串方法增强 - 新增 `capitalize`、`lowerFirst`
> - ✅ 140+ 个测试文件
>
> **v6.1.0 计划功能（待开发）**:
> - 📋 `truncate` 多字节字符支持
> - 📋 `randomString` 预设字符集
> - 📋 增强 `clone` 支持 Set/Map/TypedArray
> - 📋 增强 `groupBy` 多层级分组
> - 📋 链式调用支持 `chain`
