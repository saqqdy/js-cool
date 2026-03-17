# sortPinyin

按照中文拼音对中文进行排序。

## 用法

```js
import { sortPinyin } from 'js-cool'
```

## 签名

```typescript
function sortPinyin<T = string, P = string>(
  a: T,
  b: P,
  options?: Intl.CollatorOptions
): number
```

## 参数

| 参数      | 类型                   | 描述                             |
| --------- | ---------------------- | -------------------------------- |
| `a`       | `T`                    | 第一个比较元素                   |
| `b`       | `P`                    | 第二个比较元素                   |
| `options` | `Intl.CollatorOptions` | 调整输出格式的选项对象（可选）   |

## 返回值

`number` - 如果 `a` 应该在 `b` 前面，返回负数；如果 `a` 应该在 `b` 后面，返回正数；如果相等，返回 `0`。

## 示例

```js
// 基本用法
const items = ['啊我', '波拉', 'abc', 0, 3, '10', ',11', 13, null, '阿吧', 'ABB', 'BDD', 'ACD', 'ä']
items.sort(sortPinyin)
// [ ",11", 0, "10", 13, 3, "ä", "ABB", "abc", "ACD", "BDD", null, "阿吧", "啊我", "波拉" ]

// 使用选项
items.sort((a, b) => sortPinyin(a, b, { ignorePunctuation: true, numeric: true }))
// [ 0, 3, "10", ",11", 13, "ä", "ABB", "abc", "ACD", "BDD", null, "阿吧", "啊我", "波拉" ]

// 纯中文排序
const chinese = ['张三', '李四', '王五']
chinese.sort(sortPinyin)
// 按拼音排序

// 混合内容
const mixed = ['中文', 'English', '123']
mixed.sort(sortPinyin)
```

## 注意

- 非中文内容排在中文内容之前
- 使用 `Intl.Collator` 并设置 `zh-Hans-CN` 区域进行中文排序
- 默认选项包括 `ignorePunctuation: true` 和 `numeric: true`
- 可以通过 `Intl.CollatorOptions` 自定义

## 相关

- [sorter](./sorter.md)
