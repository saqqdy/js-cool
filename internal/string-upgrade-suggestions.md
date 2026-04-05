# 字符串处理方法升级建议

## 现有方法分析

### 大小写转换
| 方法 | 描述 | 版本 |
|------|------|------|
| `camel2Dash` | 驼峰转短横线 | 1.0.1 |
| `dash2Camel` | 短横线转驼峰 | 1.0.1 |
| `kebabCase` | 转换为短横线格式 | 6.0.0 |
| `snakeCase` | 转换为下划线格式 | 6.0.0 |
| `upperFirst` | 首字母大写 | 1.0.0 |
| `lowerFirst` | 首字母小写 | 6.0.0 |
| `capitalize` | 首字母大写（其余小写） | 6.0.0 |

### 分词与模板
| 方法 | 描述 | 版本 |
|------|------|------|
| `words` | 将字符串拆分为单词数组 | 6.0.0 |
| `template` | 模板引擎，支持变量插值和 HTML 转义 | 6.0.0 |

### 截断与清理
| 方法 | 描述 | 版本 |
|------|------|------|
| `truncate` | 截断字符串（支持多种选项） | 6.0.0 |
| `clearHtml` | 移除 HTML 标签 | 1.0.0 |
| `clearAttr` | 移除 HTML 属性 | 1.0.0 |

### HTML 转义
| 方法 | 描述 | 版本 |
|------|------|------|
| `escape` | 转义 HTML 特殊字符 | 5.5.0 |
| `unescape` | 反转义 HTML 特殊字符 | 5.5.0 |

### 中文字符处理
| 方法 | 描述 | 版本 |
|------|------|------|
| `getCHSLength` | 获取字符串长度（中文=2字节） | 1.0.0 |
| `cutCHSString` | 按字节截断中文字符串 | 1.0.0 |

### 其他
| 方法 | 描述 | 版本 |
|------|------|------|
| `randomString` | 生成指定长度的随机字符串 | 5.0.0 |
| `encodeUtf8` | UTF-8 编码 | 5.0.0 |
| `decodeUtf8` | UTF-8 解码 | 5.0.0 |
| `getNumber` | 从字符串中提取数字 | 1.0.1 |
| `toThousands` | 数字千分位格式化 | 3.0.0 |

---

## 升级建议详情

### 1. `camel2Dash` / `dash2Camel` - 支持更多命名格式

**现有问题**：
- `camel2Dash` 不支持连续大写字母（如 `XMLParser` → `-x-m-l-parser`，期望 `xml-parser`）
- 不支持 PascalCase 转 kebab-case

**现有实现**：
```js
// camel2Dash
function camel2Dash(string: string): string {
	return string
		.replace(/([A-Z])/g, '-$1')
		.replace(/^-/, '')
		.toLocaleLowerCase()
}
```

**问题演示**：
```js
camel2Dash('XMLParser')     // '-x-m-l-parser' ❌ 期望: 'xml-parser'
camel2Dash('HTMLElement')   // '-h-t-m-l-element' ❌ 期望: 'html-element'
camel2Dash('HTTPSConnection') // '-h-t-t-p-s-connection' ❌ 期望: 'https-connection'
```

**建议修复** (v6.0.0)：
```js
function camel2Dash(string: string): string {
	return string
		.replace(/([a-z])([A-Z])/g, '$1-$2')      // camelCase 分割
		.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2') // XMLParser → XML-Parser
		.replace(/^-/, '')
		.toLocaleLowerCase()
}
```

---

### 2. `mapTemplate` 与 `template` 合并方案

**现有问题**：
- `mapTemplate` 和 `template` 功能重叠
- `mapTemplate` 不支持嵌套属性（如 `user.name`）
- `mapTemplate` 不支持 HTML 转义
- 维护两套相似代码增加成本

**功能对比**：

| 功能 | `mapTemplate` | `template` |
|------|---------------|------------|
| 基本插值 `${name}` | ✅ | ✅ (需配置) |
| 基本插值 `{{name}}` | ✅ | ✅ |
| 基本插值 `{name}` | ✅ | ❌ |
| 嵌套属性 `user.name` | ❌ | ✅ |
| HTML 转义 | ❌ | ✅ |
| 原始输出 `{{{html}}}` | ❌ | ✅ |
| 自定义分隔符 | ❌ | ✅ |
| 函数作为数据源 | ✅ | ❌ |

**合并执行计划** (v6.0.0)：

#### 步骤一：增强 `template`

1. 添加函数作为数据源支持：
```ts
// 新增支持
template('Hello, {{ name }}!', { data: (key) => ({ name: 'World' }[key]) })
// 'Hello, World!'
```

2. 添加 `{name}` 单大括号语法支持：
```ts
// 新增支持
template('Hello, {name}!', { open: '{', close: '}' })
// 'Hello, World!'
```

#### 步骤二：删除 `mapTemplate`

直接从代码库中移除 `mapTemplate` 方法及其相关导出。

#### 步骤三：迁移指南

```js
// 迁移对照表

// 1. ${name} 语法
// Before
mapTemplate('Hello, ${name}!', { name: 'World' })
// After
template('Hello, ${ name }!', { open: '${', close: '}', data: { name: 'World' } })

// 2. {{name}} 语法
// Before
mapTemplate('Hello, {{name}}!', { name: 'World' })
// After
template('Hello, {{ name }}!', { data: { name: 'World' } })

// 3. 函数作为数据
// Before
mapTemplate(tmp, key => data[key])
// After
template(tmp, { data: (_, path) => data[path] })

// 4. {name} 语法（需要配置）
// Before
mapTemplate('Hello, {name}!', { name: 'World' })
// After
template('Hello, { name }!', { open: '{', close: '}', data: { name: 'World' } })
```

---

### 3. `getNumber` - 返回数字类型或支持多数字提取

**现有问题**：
- 返回字符串，用户往往需要数字
- 多个数字被连接成一个（如 `a1b2` → `'12'`）

**建议增强** (v6.0.0)：
```ts
interface GetNumberOptions {
	/** 返回数字类型 */
	type?: 'string' | 'number'
	/** 提取所有数字 */
	multiple?: boolean
	/** 小数位数 */
	decimals?: number
}

function getNumber(string: string, options?: GetNumberOptions): string | number | number[]
```

**使用示例**：
```js
// 多数字提取
getNumber('a1b2c3', { multiple: true })  // [1, 2, 3]
getNumber('Range: 10-20', { multiple: true })  // [10, 20]

// 返回数字类型
getNumber('Price: $99.99', { type: 'number' })  // 99.99

// 控制小数位
getNumber('Temperature: 36.567°', { decimals: 1 })  // '36.5'
```

---

### 4. `toThousands` - 支持更多格式化选项

**现有问题**：
- 只支持逗号分隔
- 不支持小数位数控制

**建议增强** (v6.0.0)：
```ts
interface ToThousandsOptions {
	/** 分隔符，默认 ',' */
	separator?: string
	/** 小数位数 */
	decimals?: number
	/** 前缀符号 */
	prefix?: string
	/** 后缀符号 */
	suffix?: string
}

function toThousands(num: string | number, options?: ToThousandsOptions): string
```

**使用示例**：
```js
// 自定义分隔符
toThousands(1234567.89, { separator: ' ' })  // '1 234 567.89'
toThousands(1234567.89, { separator: "'" })  // "1'234'567.89"

// 小数位数
toThousands(1234.5678, { decimals: 2 })  // '1,234.57'

// 货币格式
toThousands(1234.56, { prefix: '$' })  // '$1,234.56'
toThousands(1234.56, { prefix: '¥', decimals: 2 })  // '¥1,234.56'
```

---

### 5. `truncate` - 支持多字节字符

**现有问题**：
- 按 `length` 截断，中文字符计数不准确
- 没有考虑 emoji 等宽字符

**建议增强** (v6.0.0)：
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
```js
// 按视觉宽度截断
truncate('中文截断测试', { length: 6, byWidth: true })
// '中文截' (中文占2宽度，总宽度=6)

// 保持 emoji 完整
truncate('Hello 🌍 World', { length: 10, breakEmoji: false })
// 'Hello 🌍...'
```

---

### 6. `randomString` - 支持自定义字符集

**现有问题**：
- 特殊字符集固定，无法自定义

**建议增强** (v6.0.0)：
```ts
interface RandomStringOptions {
	charTypes?: RandomStringCharType | RandomStringCharType[]
	length?: number
	noConfuse?: boolean
	strict?: boolean
	/** 自定义字符集 */
	chars?: string
	/** 预设字符集: 'hex' | 'alphanum' | 'alpha' | 'numeric' */
	preset?: string
}
```

**使用示例**：
```js
// 自定义字符集
randomString({ length: 16, chars: 'abcdef0123456789' })
// 'a3f2b8c1d4e5f6a7'

// 预设字符集
randomString({ length: 8, preset: 'hex' })      // 'a3f2b8c1'
randomString({ length: 8, preset: 'alphanum' }) // 'x7Yz2aB9'
randomString({ length: 8, preset: 'alpha' })    // 'aBcDeFgH'
```

---

## 新增方法建议 (v6.0.0)

### 1. `pascalCase` - PascalCase 格式

```ts
/**
 * Converts string to PascalCase.
 */
function pascalCase(str: string): string

// Examples
pascalCase('foo-bar')     // 'FooBar'
pascalCase('foo_bar')     // 'FooBar'
pascalCase('foo bar')     // 'FooBar'
pascalCase('fooBar')      // 'FooBar'
```

### 2. `constantCase` - 常量格式

```ts
/**
 * Converts string to CONSTANT_CASE.
 */
function constantCase(str: string): string

// Examples
constantCase('foo-bar')   // 'FOO_BAR'
constantCase('fooBar')    // 'FOO_BAR'
constantCase('foo bar')   // 'FOO_BAR'
```

### 3. `titleCase` - 标题格式

```ts
/**
 * Converts string to Title Case.
 */
function titleCase(str: string): string

// Examples
titleCase('hello world')  // 'Hello World'
titleCase('foo-bar-baz')  // 'Foo Bar Baz'
```

### 4. `dotCase` - 点分隔格式

```ts
/**
 * Converts string to dot.case.
 */
function dotCase(str: string): string

// Examples
dotCase('fooBar')         // 'foo.bar'
dotCase('foo-bar')        // 'foo.bar'
```

### 5. `swapCase` - 大小写互换

```ts
/**
 * Swaps the case of each character.
 */
function swapCase(str: string): string

// Examples
swapCase('Hello World')   // 'hELLO wORLD'
swapCase('JavaScript')    // 'jAVAsCRIPT'
```

### 6. `reverse` - 反转字符串

```ts
/**
 * Reverses a string (Unicode aware).
 */
function reverse(str: string): string

// Examples
reverse('hello')          // 'olleh'
reverse('你好世界')        // '界世好你'
reverse('👋🏻')             // '👋🏻' (emoji with skin tone preserved)
```

### 7. `count` - 统计子字符串出现次数

```ts
/**
 * Counts the occurrences of a substring.
 */
function count(str: string, substring: string): number

// Examples
count('hello hello hello', 'hello')  // 3
count('aaa', 'aa')                   // 1 (non-overlapping) or 2 (overlapping)
```

---

## 整体架构建议 (v6.0.0)

### 1. 统一 case 转换 API

```ts
import { changeCase } from 'js-cool'

changeCase('fooBar', 'kebab')      // 'foo-bar'
changeCase('foo-bar', 'camel')     // 'fooBar'
changeCase('foo_bar', 'pascal')    // 'FooBar'
changeCase('fooBar', 'snake')      // 'foo_bar'
changeCase('fooBar', 'constant')   // 'FOO_BAR'
changeCase('fooBar', 'dot')        // 'foo.bar'
```

### 2. 链式调用支持

```ts
import { chain } from 'js-cool'

chain('  Hello World  ')
	.trim()
	.lowerCase()
	.kebabCase()
	.truncate(10)
	.value()
// 'hello-worl...'
```

### 3. TypeScript 类型增强

```ts
// 模板字符串类型提示
template<'Hello, {{ name }}!', { name: string }>()
// 类型推断返回值和参数类型
```

---

## 实施优先级 (v6.0.0)

| 优先级 | 任务 | 状态 |
|--------|------|------|
| P0 | `mapTemplate` 与 `template` 合并 | ✅ 已完成 |
| P0 | `camel2Dash` 修复连续大写问题 | ✅ 已完成 |
| P1 | `toThousands` 增强选项 | ✅ 已完成 |
| P1 | 新增 `pascalCase`, `constantCase`, `titleCase`, `dotCase`, `swapCase` | ✅ 已完成 |
| P2 | `getNumber` 增强选项 | ✅ 已完成 |
| P2 | `truncate` 支持多字节字符 | 待实施 |
| P2 | `randomString` 预设字符集 | 待实施 |
| P3 | 新增 `reverse`, `count` | ✅ 已完成 |
| P3 | 统一 case 转换 API `changeCase` | ✅ 已完成 |
| P3 | 链式调用支持 `chain` | 待实施 |
