# sortPinyin <Badge type="info" text="v5.14.0" />

按照中文拼音对中文进行排序。

## 用法

```js
import { sortPinyin } from 'js-cool'
```

## 签名

```typescript
function sortPinyin<T = string, P = string>(a: T, b: P, options?: Intl.CollatorOptions): number

function sortPinyin.sort<T>(array: T[], options?: Intl.CollatorOptions): T[]
```

## 参数

| 参数      | 类型                   | 描述                           |
| --------- | ---------------------- | ------------------------------ |
| `a`       | `T`                    | 第一个比较元素                 |
| `b`       | `P`                    | 第二个比较元素                 |
| `options` | `Intl.CollatorOptions` | 调整输出格式的选项对象（可选） |

## 返回值

`number` - 如果 `a` 应该在 `b` 前面，返回负数；如果 `a` 应该在 `b` 后面，返回正数；如果相等，返回 `0`。

## 特性

- **精确中文检测** - 使用 Unicode 范围精确检测中文汉字（CJK 统一汉字）
- **空值处理** - `null` 和 `undefined` 会被排在数组末尾
- **性能优化** - 缓存 `Intl.Collator` 实例，避免重复创建
- **便捷方法** - 提供 `sortPinyin.sort()` 方法直接返回排序后的新数组

## 示例

```js
// 基本用法
const items = ['啊我', '波拉', 'abc', 0, 3, '10', ',11', 13, null, '阿吧', 'ABB', 'BDD', 'ACD', 'ä']
items.sort(sortPinyin)
// [ ",11", 0, "10", 13, 3, "ä", "ABB", "abc", "ACD", "BDD", null, "阿吧", "啊我", "波拉" ]

// 使用选项
items.sort((a, b) => sortPinyin(a, b, { ignorePunctuation: true, numeric: true }))
// [ 0, 3, "10", ",11", 13, "ä", "ABB", "abc", "ACD", "BDD", null, "阿吧", "啊我", "波拉" ]

// 使用 sort 方法（返回新数组，不修改原数组）
const sorted = sortPinyin.sort(['张三', '李四', '王五'])
// ['李四', '王五', '张三']

// 混合内容（含 null/undefined）
const mixed = ['中文', null, 'English', undefined, '123']
mixed.sort(sortPinyin)
// ['123', 'English', '中文', null, undefined] - null/undefined 排在末尾

// 带选项的 sort 方法
const sortedWithOptions = sortPinyin.sort(['张三', '李四'], { numeric: true })
```

## 注意

- 非中文内容排在中文内容之前
- `null` 和 `undefined` 排在数组末尾
- 使用 `Intl.Collator` 并设置 `zh-Hans-CN` 区域进行中文排序
- 默认选项包括 `ignorePunctuation: true` 和 `numeric: true`
- 可以通过 `Intl.CollatorOptions` 自定义

## 相关

- [sorter](./sorter.md)
