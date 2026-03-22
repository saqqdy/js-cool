# cleanData

从对象中提取指定的键。

## 用法

```js
import { cleanData } from 'js-cool'
```

## 签名

```typescript
function cleanData(data: any, map: string[] | Record<string, string>, nullFix?: any): any
```

## 参数

| 参数      | 类型                                 | 描述                   |
| --------- | ------------------------------------ | ---------------------- |
| `data`    | `any`                                | 源对象                 |
| `map`     | `string[] \| Record<string, string>` | 要提取的键或重命名映射 |
| `nullFix` | `any`                                | 缺失键的默认值         |

## 返回值

`any` - 包含提取键的对象。

## 示例

```js
// 提取指定的键
cleanData({ name: 'John', password: '123' }, ['name'])
// { name: 'John' }

// 重命名键
cleanData({ name: 'John' }, { userName: 'name' })
// { userName: 'John' }

// 带默认值
cleanData({ name: 'John' }, ['name', 'phone'], 'N/A')
// { name: 'John', phone: 'N/A' }
```
