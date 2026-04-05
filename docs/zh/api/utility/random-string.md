# randomString <Badge type="info" text="v5.0.0" />

生成随机字符串，支持自定义字符类型和安全选项。

## 用法

```js
import { randomString } from 'js-cool'
```

## 签名

```typescript
function randomString(length?: number): string
function randomString(length: number, includeSpecial: boolean): string
function randomString(options: RandomStringOptions): string

type RandomStringCharType = 'uppercase' | 'lowercase' | 'number' | 'special'

interface RandomStringOptions {
  length?: number
  charTypes?: RandomStringCharType | RandomStringCharType[]
  noConfuse?: boolean
  strict?: boolean
  secure?: boolean
}
```

## 参数

### 选项对象

| 属性       | 类型                  | 描述                                          |
| ---------- | --------------------- | --------------------------------------------- |
| `length`   | `number`              | 字符串长度（默认：32）                        |
| `charTypes`| `string \| string[]`  | 包含的字符类型（默认：大写、小写、数字）       |
| `noConfuse`| `boolean`             | 移除易混淆字符：I,L,O,U,V,i,l,o,u,v,0,1,9     |
| `strict`   | `boolean`             | 确保每种字符类型至少包含 1 个字符             |
| `secure`   | `boolean`             | 使用加密安全的随机生成器                      |

### 字符类型

- `'uppercase'` - 大写字母 A-Z
- `'lowercase'` - 小写字母 a-z
- `'number'` - 数字 0-9
- `'special'` - 特殊字符 ~!@#$%^&*_+|:-=[];,.

## 返回值

`string` - 随机字符串。

## 示例

```js
// 默认：32 位字符串，包含大写、小写、数字
randomString() // 'PVSjz902EqYbmxaLtvDnggtnlvt5uFTZ'

// 指定长度
randomString(16) // 'coTgZy0mqqMJ1sMM'

// 使用选项对象
randomString({ length: 16 }) // 'ngCI5aPqJm84t90d'

// 包含特殊字符（旧式布尔语法）
randomString(true) // '0Uby@op3B-sK5]dHl4S|15As.OlHiNXd'

// 包含特殊字符（推荐）
randomString({ charTypes: ['uppercase', 'lowercase', 'number', 'special'] })

// 纯数字字符串
randomString({ length: 16, charTypes: 'number' }) // '7450026301030286'

// 移除易混淆字符
randomString({ length: 16, noConfuse: true }) // '8DEGna8ppC4mqyew'

// 严格模式：必须包含每种字符类型
randomString({ length: 16, strict: true }) // 'PFYAPD5KFqOHIADL'

// 加密安全（用于密码、令牌）
randomString({ length: 32, secure: true }) // 'xK9mP2vN8qR4wT7y...'

// 安全密码（所有选项）
randomString({
  length: 20,
  charTypes: ['uppercase', 'lowercase', 'number', 'special'],
  noConfuse: true,
  strict: true,
  secure: true
})
```

## 安全说明

生成安全敏感用途的字符串（密码、令牌、API 密钥）时，请使用 `secure: true` 以确保加密安全的随机性。底层使用：

- 浏览器环境：`crypto.getRandomValues()`
- Node.js 环境：`crypto.randomBytes()`
