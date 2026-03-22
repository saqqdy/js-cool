# sortPinyin

Sort Chinese by Chinese phonetic alphabet (pinyin).

## Usage

```js
import { sortPinyin } from 'js-cool'
```

## Signature

```typescript
function sortPinyin<T = string, P = string>(a: T, b: P, options?: Intl.CollatorOptions): number
```

## Parameters

| Parameter | Type                   | Description                                      |
| --------- | ---------------------- | ------------------------------------------------ |
| `a`       | `T`                    | The first element for comparison                 |
| `b`       | `P`                    | The second element for comparison                |
| `options` | `Intl.CollatorOptions` | An object adjusting the output format (optional) |

## Returns

`number` - A negative number if `a` should come before `b`, a positive number if `a` should come after `b`, or `0` if they are equal.

## Examples

```js
// Basic usage
const items = ['啊我', '波拉', 'abc', 0, 3, '10', ',11', 13, null, '阿吧', 'ABB', 'BDD', 'ACD', 'ä']
items.sort(sortPinyin)
// [ ",11", 0, "10", 13, 3, "ä", "ABB", "abc", "ACD", "BDD", null, "阿吧", "啊我", "波拉" ]

// With options
items.sort((a, b) => sortPinyin(a, b, { ignorePunctuation: true, numeric: true }))
// [ 0, 3, "10", ",11", 13, "ä", "ABB", "abc", "ACD", "BDD", null, "阿吧", "啊我", "波拉" ]

// Pure Chinese sorting
const chinese = ['张三', '李四', '王五']
chinese.sort(sortPinyin)
// Sorted by pinyin

// Mixed content
const mixed = ['中文', 'English', '123']
mixed.sort(sortPinyin)
```

## Notes

- Non-Chinese content is sorted before Chinese content
- Uses `Intl.Collator` with locale `zh-Hans-CN` for Chinese sorting
- Default options include `ignorePunctuation: true` and `numeric: true`
- Can be customized with `Intl.CollatorOptions`

## Related

- [sorter](./sorter.md)
