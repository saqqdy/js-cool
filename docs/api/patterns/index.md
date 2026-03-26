# patterns <Badge type="tip" text="since v6.0.0" />

Unified regex patterns module for validation and User Agent detection.

## Installation

```bash
pnpm add js-cool
```

## Usage

```js
import { patterns, validation, DEVICE_PATTERNS } from 'js-cool'

// Using unified patterns object
patterns.validation.email.test('user@example.com') // true
patterns.ua.device.mobile.test(navigator.userAgent) // true/false

// Using individual exports
validation.email.test('user@example.com') // true
DEVICE_PATTERNS.mobile.test(navigator.userAgent) // true/false
```

## Structure

The `patterns` module contains two main parts:

### 1. Validation Patterns

Regex patterns for validating common string formats.

```js
import { validation } from 'js-cool'

validation.email.test('user@example.com') // true
validation.mobile.test('13800138000') // true
validation.url.test('https://example.com') // true
```

### 2. UA (User Agent) Patterns

Patterns and utilities for User Agent detection.

```js
import { patterns } from 'js-cool'

// Device detection
patterns.ua.device.mobile.test(ua) // true/false
patterns.ua.device.tablet.test(ua) // true/false

// Browser detection
patterns.ua.browser.chrome.test(ua) // true/false

// OS detection
patterns.ua.os.windows.test(ua) // true/false

// Utility functions
patterns.ua.getUserAgent() // get UA string
patterns.ua.extractVersion(ua, /Chrome\/(\d+)/i) // '120'
```

## Available Patterns

### Validation Patterns

| Pattern | Description | Example |
|---------|-------------|---------|
| `email` | Email address | `user@example.com` |
| `mobile` | Chinese mobile phone | `13800138000` |
| `url` | URL (with or without protocol) | `https://example.com` |
| `ipv4` | IPv4 address | `192.168.1.1` |
| `ipv6` | IPv6 address | `2001:db8::1` |
| `ipv4Private` | Private IPv4 | `192.168.1.1` |
| `mac` | MAC address | `00:1A:2B:3C:4D:5E` |
| `uuid` | UUID v1-v5 | `550e8400-e29b-...` |
| `semver` | Semantic version | `1.2.3-beta.1` |
| `base64` | Base64 encoded | `SGVsbG8=` |
| `hexColor` | Hex color code | `#fff` or `#ffffff` |
| `date` | Date YYYY-MM-DD | `2024-01-15` |
| `time` | Time HH:mm:ss | `23:59:59` |
| `datetime` | Datetime | `2024-01-15 12:30:00` |
| `idCard` | Chinese ID card | `11010519491231002X` |
| `bankCard` | Bank card number | `6222021234567890123` |
| `creditCard` | Credit card number | `4111111111111111` |
| `username` | Username (3-15 chars) | `user_name` |
| `password` | Password (6-16 chars) | `abc123` |
| `qq` | QQ number | `12345678` |
| `postcode` | Chinese postal code | `100000` |
| `tel` | Chinese telephone | `010-12345678` |
| `slug` | URL slug | `hello-world-123` |
| `json` | JSON object string | `{"key":"value"}` |
| `array` | JSON array string | `[1, 2, 3]` |

### Device Patterns

| Pattern | Description |
|---------|-------------|
| `mobile` | Any mobile device |
| `tablet` | Tablet devices |
| `phone` | Smartphones |
| `touch` | Touch devices |
| `iphone` | iPhone |
| `ipad` | iPad |
| `androidPhone` | Android phone |
| `androidTablet` | Android tablet |

### OS Patterns

| Pattern | Description |
|---------|-------------|
| `harmonyOS` | Huawei HarmonyOS |
| `windows` | Windows |
| `macOS` | macOS |
| `iOS` | iOS |
| `iPadOS` | iPadOS |
| `android` | Android |
| `linux` | Linux |
| `chromeOS` | Chrome OS |

### Browser Patterns

| Pattern | Description |
|---------|-------------|
| `chrome` | Google Chrome |
| `safari` | Apple Safari |
| `firefox` | Mozilla Firefox |
| `edge` | Microsoft Edge |
| `opera` | Opera |
| `ie` | Internet Explorer |
| `samsung` | Samsung Browser |
| `uc` | UC Browser |
| `quark` | Quark Browser |
| `arc` | Arc Browser |
| `brave` | Brave Browser |
| `yandex` | Yandex Browser |
| `vivaldi` | Vivaldi Browser |

### Environment Patterns

| Pattern | Description |
|---------|-------------|
| `wechat` | WeChat |
| `wxwork` | WeChat Work |
| `dingtalk` | DingTalk |
| `qq` | QQ App |
| `qqBrowser` | QQ Browser |
| `weibo` | Weibo |
| `alipay` | Alipay |
| `douyin` | Douyin/TikTok |
| `kuaishou` | Kuaishou |
| `baidu` | Baidu App |
| `xiaomi` | Xiaomi Browser |
| `huawei` | Huawei Browser |
| `vivo` | Vivo Browser |
| `oppo` | OPPO Browser |
| `xiaohongshu` | Xiaohongshu |
| `meituan` | Meituan |
| `dianping` | Dianping |
| `taobao` | Taobao App |
| `tmall` | Tmall App |
| `jd` | JD App |
| `pinduoduo` | Pinduoduo |
| `miniProgram` | Mini Program |
| `miniGame` | Mini Game |

## Utility Functions

### getUserAgent

Get user agent string safely.

```js
import { getUserAgent } from 'js-cool'

const ua = getUserAgent() // Returns UA string or empty string in SSR
```

### matchPattern

Check if a pattern exists in user agent.

```js
import { matchPattern } from 'js-cool'

const isMobile = matchPattern(navigator.userAgent, /Mobi/i)
```

### extractVersion

Extract version from user agent using pattern.

```js
import { extractVersion } from 'js-cool'

const chromeVersion = extractVersion(navigator.userAgent, /Chrome\/(\d+)/i)
// '120'
```

## Type Definitions

```ts
import type {
  ValidationPatternName,
  DevicePatternName,
  OSPatternName,
  BrowserPatternName,
  EnginePatternName,
  EnvPatternName,
} from 'js-cool'

// Validation pattern names
type ValidationPatternName =
  | 'email' | 'mobile' | 'url' | 'ipv4' | 'ipv6' | ...

// Device pattern names
type DevicePatternName =
  | 'mobile' | 'tablet' | 'phone' | 'touch' | 'iphone' | 'ipad' | ...

// OS pattern names
type OSPatternName =
  | 'harmonyOS' | 'windows' | 'macOS' | 'iOS' | 'android' | ...

// Browser pattern names
type BrowserPatternName =
  | 'chrome' | 'safari' | 'firefox' | 'edge' | 'opera' | ...

// Environment pattern names
type EnvPatternName =
  | 'wechat' | 'dingtalk' | 'qq' | 'weibo' | 'alipay' | ...
```

## Examples

### Form Validation

```js
import { validation } from 'js-cool'

function validateForm(data) {
  const errors = []

  if (!validation.email.test(data.email)) {
    errors.push('Invalid email')
  }

  if (!validation.mobile.test(data.phone)) {
    errors.push('Invalid phone number')
  }

  if (!validation.url.test(data.website)) {
    errors.push('Invalid URL')
  }

  return errors
}
```

### Browser Detection

```js
import { BROWSER_PATTERNS, OS_PATTERNS, getUserAgent } from 'js-cool'

const ua = getUserAgent()

function getBrowserInfo() {
  const browsers = [
    { name: 'Edge', pattern: BROWSER_PATTERNS.edge },
    { name: 'Chrome', pattern: BROWSER_PATTERNS.chrome },
    { name: 'Safari', pattern: BROWSER_PATTERNS.safari },
    { name: 'Firefox', pattern: BROWSER_PATTERNS.firefox },
  ]

  for (const { name, pattern } of browsers) {
    if (pattern.test(ua)) {
      return name
    }
  }

  return 'Unknown'
}
```

### Environment Detection

```js
import { ENV_PATTERNS, getUserAgent } from 'js-cool'

const ua = getUserAgent()

function getAppEnvironment() {
  if (ENV_PATTERNS.wechat.test(ua)) return 'wechat'
  if (ENV_PATTERNS.dingtalk.test(ua)) return 'dingtalk'
  if (ENV_PATTERNS.alipay.test(ua)) return 'alipay'
  if (ENV_PATTERNS.miniProgram.test(ua)) return 'miniprogram'
  return 'browser'
}
```

## Related

- [validation](./validation.md) - Validation patterns details
- [ua](./ua.md) - User Agent patterns details
