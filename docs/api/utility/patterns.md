# patterns <Badge type="info" text="since v6.0.0" />

Unified patterns module combining validation and UA detection patterns.

## Migration from v5.x `pattern`

::: warning Breaking Change
The `pattern` object from v5.x has been **removed** in v6.0.0. You must migrate to the new `patterns` module.
:::

See the [Migration Guide](../../guide/migration.md#pattern--patterns--validation) for complete migration details.

## Usage

```js
import { patterns, validation, DEVICE_PATTERNS, BROWSER_PATTERNS } from 'js-cool'
```

## Overview

The `patterns` module provides a unified API for all regex patterns in js-cool:

- **validation** - Validation patterns for common formats (email, phone, URL, etc.)
- **ua** - User Agent detection patterns and utilities

## Validation Patterns

### Basic Usage

```js
import { validation } from 'js-cool'

// Or via patterns object
import { patterns } from 'js-cool'
patterns.validation.email.test('user@example.com')
```

### Available Patterns

| Pattern       | Description                                 | Example                   |
| ------------- | ------------------------------------------- | ------------------------- |
| `any`         | Matches any non-empty string                | `'hello'` ✓               |
| `email`       | Email addresses                             | `'user@example.com'` ✓    |
| `mobile`      | Chinese mobile numbers (1[3-9]xxxxxxxxx)    | `'13800138000'` ✓         |
| `url`         | URLs                                        | `'https://example.com'` ✓ |
| `number`      | Numbers (int, float, with sign)             | `'-123.45'` ✓             |
| `chinese`     | Single Chinese character                    | `'中'` ✓                  |
| `idCard`      | Chinese ID card (15 or 18 digits)           | `'11010519491231002X'` ✓  |
| `qq`          | QQ numbers (5-14 digits)                    | `'12345678'` ✓            |
| `ipv4`        | IPv4 addresses                              | `'192.168.1.1'` ✓         |
| `ipv4Private` | Private IPv4 (10.x, 172.16-31.x, 192.168.x) | `'192.168.1.1'` ✓         |
| `mac`         | MAC addresses                               | `'00:1A:2B:3C:4D:5E'` ✓   |
| `hexColor`    | Hex color codes                             | `'#ffffff'` ✓             |
| `password`    | Password (6-16 chars, letter + number)      | `'abc123'` ✓              |
| `postcode`    | Chinese postal codes (6 digits)             | `'100000'` ✓              |
| `username`    | Username (3-15 chars, alphanumeric)         | `'user_name'` ✓           |
| `tel`         | Chinese telephone numbers                   | `'010-12345678'` ✓        |
| `json`        | JSON object string                          | `'{"key":"value"}'` ✓     |
| `array`       | JSON array string                           | `'[1, 2, 3]'` ✓           |
| `float`       | Decimal numbers (max 2 places)              | `'123.45'` ✓              |

## UA Patterns

### Device Detection

```js
import { DEVICE_PATTERNS } from 'js-cool'

const ua = navigator.userAgent

DEVICE_PATTERNS.mobile.test(ua) // Mobile devices
DEVICE_PATTERNS.tablet.test(ua) // Tablets
DEVICE_PATTERNS.phone.test(ua) // Phones (iPhone, Android phone)
DEVICE_PATTERNS.iphone.test(ua) // iPhone
DEVICE_PATTERNS.ipad.test(ua) // iPad
DEVICE_PATTERNS.androidPhone.test(ua) // Android phone
DEVICE_PATTERNS.androidTablet.test(ua) // Android tablet
```

### OS Detection

```js
import { OS_PATTERNS } from 'js-cool'

OS_PATTERNS.windows.test(ua) // Windows
OS_PATTERNS.macOS.test(ua) // macOS
OS_PATTERNS.iOS.test(ua) // iOS
OS_PATTERNS.iPadOS.test(ua) // iPadOS
OS_PATTERNS.android.test(ua) // Android
OS_PATTERNS.linux.test(ua) // Linux
OS_PATTERNS.chromeOS.test(ua) // Chrome OS
OS_PATTERNS.harmonyOS.test(ua) // HarmonyOS
```

### Browser Detection

```js
import { BROWSER_PATTERNS } from 'js-cool'

BROWSER_PATTERNS.chrome.test(ua) // Chrome
BROWSER_PATTERNS.firefox.test(ua) // Firefox
BROWSER_PATTERNS.safari.test(ua) // Safari
BROWSER_PATTERNS.edge.test(ua) // Edge
BROWSER_PATTERNS.opera.test(ua) // Opera
BROWSER_PATTERNS.ie.test(ua) // Internet Explorer
BROWSER_PATTERNS.samsung.test(ua) // Samsung Browser
BROWSER_PATTERNS.uc.test(ua) // UC Browser
BROWSER_PATTERNS.quark.test(ua) // Quark Browser
BROWSER_PATTERNS.vivaldi.test(ua) // Vivaldi
```

### Engine Detection

```js
import { ENGINE_PATTERNS } from 'js-cool'

ENGINE_PATTERNS.blink.test(ua) // Blink (Chrome, Edge, Opera)
ENGINE_PATTERNS.gecko.test(ua) // Gecko (Firefox)
ENGINE_PATTERNS.webkit.test(ua) // WebKit (Safari)
ENGINE_PATTERNS.trident.test(ua) // Trident (IE)
ENGINE_PATTERNS.edgeHTML.test(ua) // EdgeHTML (Legacy Edge)
```

### Environment Detection

```js
import { ENV_PATTERNS } from 'js-cool'

ENV_PATTERNS.wechat.test(ua) // WeChat
ENV_PATTERNS.wxwork.test(ua) // WeCom (Enterprise WeChat)
ENV_PATTERNS.dingtalk.test(ua) // DingTalk
ENV_PATTERNS.qq.test(ua) // QQ App
ENV_PATTERNS.qqBrowser.test(ua) // QQ Browser
ENV_PATTERNS.weibo.test(ua) // Weibo
ENV_PATTERNS.alipay.test(ua) // Alipay
ENV_PATTERNS.douyin.test(ua) // Douyin / TikTok
ENV_PATTERNS.kuaishou.test(ua) // Kuaishou
ENV_PATTERNS.baidu.test(ua) // Baidu App
ENV_PATTERNS.miniProgram.test(ua) // Mini Program
ENV_PATTERNS.miniGame.test(ua) // Mini Game
```

## Utility Functions

### getUserAgent

Safely get user agent string.

```js
import { getUA } from 'js-cool'

const ua = getUA() // Returns UA string or empty string
```

### matchPattern

Check if a pattern exists in user agent.

```js
import { matchPattern } from 'js-cool'

matchPattern(navigator.userAgent, /Chrome/i) // true/false
```

### extractVersion

Extract version from user agent using pattern.

```js
import { extractVersion } from 'js-cool'

extractVersion(navigator.userAgent, /Chrome\/(\d+\.?\d*)/i) // '91.0'
extractVersion('iPhone OS 14_0', /iPhone OS (\d+[._]\d+)/i) // '14.0'
```

## Type Exports

```typescript
import type {
  ValidationPatternName,
  DevicePatternName,
  OSPatternName,
  BrowserPatternName,
  EnginePatternName,
  EnvPatternName,
} from 'js-cool'
```
