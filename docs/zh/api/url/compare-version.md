# compareVersion

比较两个版本字符串。

## 用法

```js
import { compareVersion } from 'js-cool'
```

## 签名

```typescript
function compareVersion(v1: string, v2: string): -1 | 0 | 1
```

## 参数

| 参数 | 类型     | 描述       |
| ---- | -------- | ---------- |
| `v1` | `string` | 第一个版本 |
| `v2` | `string` | 第二个版本 |

## 返回值

`-1 | 0 | 1` - v1 < v2 返回 `-1`，相等返回 `0`，v1 > v2 返回 `1`。

## 示例

```js
compareVersion('1.2.3', '1.2.4') // -1
compareVersion('1.2.4', '1.2.3') // 1
compareVersion('1.2.3', '1.2.3') // 0
compareVersion('2.0.0', '1.9.9') // 1
```

## 相关

- [nextVersion](/zh/api/url/next-version) - 获取下一个版本
