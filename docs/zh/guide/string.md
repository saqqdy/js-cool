# 字符串工具

js-cool 提供了完整的字符串处理工具集。

## 大小写转换

### camel2Dash

驼峰转短横线命名（kebab-case）。

```js
import { camel2Dash } from 'js-cool'

camel2Dash('fontSize') // 'font-size'
camel2Dash('backgroundColor') // 'background-color'
```

### dash2Camel

短横线转驼峰命名。

```js
import { dash2Camel } from 'js-cool'

dash2Camel('font-size') // 'fontSize'
dash2Camel('background-color') // 'backgroundColor'
```

### upperFirst

首字母大写。

```js
import { upperFirst } from 'js-cool'

upperFirst('hello') // 'Hello'
upperFirst('hello world') // 'Hello world'
```

## 编码转换

### Base64

```js
import { encodeBase64, decodeBase64 } from 'js-cool'

// 编码
encodeBase64('Hello World') // 'SGVsbG8gV29ybGQ='

// 解码
decodeBase64('SGVsbG8gV29ybGQ=') // 'Hello World'
```

### UTF-8

```js
import { encodeUtf8, decodeUtf8 } from 'js-cool'

// 编码
encodeUtf8('你好')

// 解码
decodeUtf8(encodedString)
```

## 中文字符串

### cutCHSString

截取中文字符串，中文算 2 个字节。

```js
import { cutCHSString } from 'js-cool'

cutCHSString('Hello世界', 7) // 'Hello世'
cutCHSString('Hello世界你好', 8, true) // 'Hello世...'
```

### getCHSLength

获取中文字符串长度（中文算 2 个字节）。

```js
import { getCHSLength } from 'js-cool'

getCHSLength('Hello世界') // 9
```

## 转义处理

### escape / unescape

HTML 实体转义与反转义。

```js
import { escape, unescape } from 'js-cool'

escape('<div>Hello</div>') // '&lt;div&gt;Hello&lt;/div&gt;'
unescape('&lt;div&gt;Hello&lt;/div&gt;') // '<div>Hello</div>'
```

## 模板

### mapTemplate

简单的模板字符串替换。

```js
import { mapTemplate } from 'js-cool'

const template = '我的名字是${name}，今年${age}岁'
mapTemplate(template, { name: '张三', age: 25 })
// '我的名字是张三，今年25岁'
```

## 其他

### clearHtml

移除 HTML 标签。

```js
import { clearHtml } from 'js-cool'

clearHtml('<p>Hello <b>World</b></p>') // 'Hello World'
```

## 相关

- [字符串 API 参考](/zh/api/string/camel2-dash)
