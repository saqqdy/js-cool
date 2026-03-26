# validation <Badge type="info" text="since v6.0.0" />

用于常见字符串格式验证的正则模式。

## 用法

```js
import { validation } from 'js-cool'
```

## 可用模式

### 联系方式与身份

| 模式 | 描述 | 示例 |
|------|------|------|
| `email` | 电子邮箱 | `user@example.com` |
| `mobile` | 中国大陆手机号（1 + 3-9 + 8位数字） | `13800138000` |
| `tel` | 中国电话号码（可带区号） | `010-12345678` |
| `idCard` | 中国身份证号（15或18位） | `11010519491231002X` |
| `qq` | QQ号（5-14位数字） | `12345678` |

### 网络

| 模式 | 描述 | 示例 |
|------|------|------|
| `url` | URL（可带或不带协议） | `https://example.com` |
| `ipv4` | IPv4 地址 | `192.168.1.1` |
| `ipv6` | IPv6 地址 | `2001:db8::1` |
| `ipv4Private` | 私有 IPv4（10.x, 172.16-31.x, 192.168.x） | `192.168.1.1` |
| `mac` | MAC 地址（冒号或连字符） | `00:1A:2B:3C:4D:5E` |

### 金融

| 模式 | 描述 | 示例 |
|------|------|------|
| `bankCard` | 银行卡号（16-19位数字） | `6222021234567890123` |
| `creditCard` | 信用卡（Visa、MasterCard、Amex、Discover） | `4111111111111111` |

### 标识符

| 模式 | 描述 | 示例 |
|------|------|------|
| `uuid` | UUID v1-v5 | `550e8400-e29b-41d4-a716-446655440000` |
| `semver` | 语义化版本号 | `1.2.3-beta.1` |
| `base64` | Base64 编码字符串 | `SGVsbG8gV29ybGQ=` |

### 颜色

| 模式 | 描述 | 示例 |
|------|------|------|
| `hexColor` | 十六进制颜色（3位或6位） | `#fff`, `#ffffff` |

### 日期与时间

| 模式 | 描述 | 示例 |
|------|------|------|
| `date` | 日期格式 YYYY-MM-DD | `2024-01-15` |
| `time` | 时间格式 HH:mm:ss | `23:59:59` |
| `datetime` | 日期时间 YYYY-MM-DD HH:mm:ss | `2024-01-15 12:30:00` |

### 数字

| 模式 | 描述 | 示例 |
|------|------|------|
| `number` | 数字（整数、小数、可带符号） | `-123.45` |
| `float` | 小数（最多2位小数） | `123.45` |

### 文本

| 模式 | 描述 | 示例 |
|------|------|------|
| `any` | 任意非空字符串 | `hello` |
| `string` | 中文、字母、数字、基本标点 | `hello 世界` |
| `chinese` | 单个中文字符 | `中` |
| `textarea` | 文本域内容 | `Hello, world!` |

### 用户输入

| 模式 | 描述 | 示例 |
|------|------|------|
| `username` | 用户名（3-15字符，字母数字下划线连字符点） | `user_name` |
| `password` | 密码（6-16字符，必须包含字母和数字） | `abc123` |
| `slug` | URL别名（小写字母、数字、连字符） | `hello-world-123` |

### 地理

| 模式 | 描述 | 示例 |
|------|------|------|
| `postcode` | 中国邮政编码（6位数字） | `100000` |

### JSON

| 模式 | 描述 | 示例 |
|------|------|------|
| `json` | JSON对象字符串 | `{"key":"value"}` |
| `jsonLike` | 包含JSON对象的字符串 | `text {"key":"value"} text` |
| `array` | JSON数组字符串 | `[1, 2, 3]` |
| `arrjson` | JSON对象数组 | `[{"key":"value"}]` |

## 示例

### 表单验证

```js
import { validation } from 'js-cool'

const form = {
  email: 'user@example.com',
  phone: '13800138000',
  idCard: '11010519491231002X'
}

// 验证邮箱
if (!validation.email.test(form.email)) {
  throw new Error('邮箱格式不正确')
}

// 验证手机号
if (!validation.mobile.test(form.phone)) {
  throw new Error('手机号格式不正确')
}

// 验证身份证号
if (!validation.idCard.test(form.idCard)) {
  throw new Error('身份证号格式不正确')
}
```

### 实时输入验证

```js
import { validation } from 'js-cool'

const validators = {
  email: validation.email,
  phone: validation.mobile,
  url: validation.url,
}

function validateInput(name, value) {
  const pattern = validators[name]
  if (pattern) {
    return pattern.test(value)
  }
  return true
}
```

## 相关

- [patterns](./index.md) - 统一模式模块
- [ua](./ua.md) - User Agent 模式
