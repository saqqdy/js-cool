# nextVersion

获取下一个版本号。

## 用法

```js
import { nextVersion } from 'js-cool'
```

## 签名

```typescript
function nextVersion(
  version: string,
  type?: 'major' | 'minor' | 'patch'
): string
```

## 参数

| 参数      | 类型                           | 描述                       |
| --------- | ------------------------------ | -------------------------- |
| `version` | `string`                       | 当前版本                   |
| `type`    | `'major' \| 'minor' \| 'patch'` | 递增类型（默认：'patch'）  |

## 返回值

`string` - 下一个版本字符串。

## 示例

```js
nextVersion('1.2.3') // '1.2.4' (patch)
nextVersion('1.2.9', 'patch') // '1.2.10'
nextVersion('1.2.9', 'minor') // '1.3.0'
nextVersion('1.2.9', 'major') // '2.0.0'
```

## 相关

- [compareVersion](/zh/api/url/compare-version) - 比较版本
