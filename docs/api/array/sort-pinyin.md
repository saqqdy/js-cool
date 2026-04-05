# sortPinyin <Badge type="info" text="since v5.14.0" />

Sort Chinese by Chinese phonetic alphabet (pinyin).

## Usage

```js
import { sortPinyin } from 'js-cool'
```

## Signature

```typescript
function sortPinyin<T = string, P = string>(a: T, b: P, options?: Intl.CollatorOptions): number

function sortPinyin.sort<T>(array: T[], options?: Intl.CollatorOptions): T[]
```

## Parameters

| Parameter | Type                   | Description                                      |
| --------- | ---------------------- | ------------------------------------------------ |
| `a`       | `T`                    | The first element for comparison                 |
| `b`       | `P`                    | The second element for comparison                |
| `options` | `Intl.CollatorOptions` | An object adjusting the output format (optional) |

## Returns

`number` - A negative number if `a` should come before `b`, a positive number if `a` should come after `b`, or `0` if they are equal.

## Features

- **Accurate Chinese Detection** - Uses Unicode ranges to precisely detect Chinese characters (CJK Unified Ideographs)
- **Null Handling** - `null` and `undefined` values are sorted to the end of the array
- **Performance Optimized** - Caches `Intl.Collator` instance to avoid repeated creation
- **Convenient Method** - Provides `sortPinyin.sort()` method to return a new sorted array

## Examples

```js
// Basic usage
const items = ['啊我', '波拉', 'abc', 0, 3, '10', ',11', 13, null, '阿吧', 'ABB', 'BDD', 'ACD', 'ä']
items.sort(sortPinyin)
// [ ",11", 0, "10", 13, 3, "ä", "ABB", "abc", "ACD", "BDD", null, "阿吧", "啊我", "波拉" ]

// With options
items.sort((a, b) => sortPinyin(a, b, { ignorePunctuation: true, numeric: true }))
// [ 0, 3, "10", ",11", 13, "ä", "ABB", "abc", "ACD", "BDD", null, "阿吧", "啊我", "波拉" ]

// Using sort method (returns new array, doesn't modify original)
const sorted = sortPinyin.sort(['张三', '李四', '王五'])
// ['李四', '王五', '张三']

// Mixed content with null/undefined
const mixed = ['中文', null, 'English', undefined, '123']
mixed.sort(sortPinyin)
// ['123', 'English', '中文', null, undefined] - null/undefined at the end

// sort method with options
const sortedWithOptions = sortPinyin.sort(['张三', '李四'], { numeric: true })
```

## Notes

- Non-Chinese content is sorted before Chinese content
- `null` and `undefined` are sorted to the end of the array
- Uses `Intl.Collator` with locale `zh-Hans-CN` for Chinese sorting
- Default options include `ignorePunctuation: true` and `numeric: true`
- Can be customized with `Intl.CollatorOptions`

## Related

- [sorter](./sorter.md)
