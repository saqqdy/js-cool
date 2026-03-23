# String Utilities

js-cool provides a comprehensive set of string manipulation utilities.

## Case Conversion

### camel2Dash

Convert camelCase to dash-case (kebab-case).

```js
import { camel2Dash } from 'js-cool'

camel2Dash('fontSize') // 'font-size'
camel2Dash('backgroundColor') // 'background-color'
```

### dash2Camel

Convert dash-case to camelCase.

```js
import { dash2Camel } from 'js-cool'

dash2Camel('font-size') // 'fontSize'
dash2Camel('background-color') // 'backgroundColor'
```

### upperFirst

Capitalize the first letter of a string.

```js
import { upperFirst } from 'js-cool'

upperFirst('hello') // 'Hello'
upperFirst('hello world') // 'Hello world'
```

## Encoding

### Base64

```js
import { encodeBase64, decodeBase64 } from 'js-cool'

// Encode
encodeBase64('Hello World') // 'SGVsbG8gV29ybGQ='

// Decode
decodeBase64('SGVsbG8gV29ybGQ=') // 'Hello World'
```

### UTF-8

```js
import { encodeUtf8, decodeUtf8 } from 'js-cool'

// Encode
encodeUtf8('你好')

// Decode
decodeUtf8(encodedString)
```

## Chinese String

### cutCHSString

Cut Chinese string, counting Chinese characters as 2 bytes.

```js
import { cutCHSString } from 'js-cool'

cutCHSString('Hello世界', 7) // 'Hello世'
cutCHSString('Hello世界你好', 8, true) // 'Hello世...'
```

### getCHSLength

Get Chinese string length (Chinese characters count as 2).

```js
import { getCHSLength } from 'js-cool'

getCHSLength('Hello世界') // 9
```

## Escape

### escape / unescape

Escape and unescape HTML entities.

```js
import { escape, unescape } from 'js-cool'

escape('<div>Hello</div>') // '&lt;div&gt;Hello&lt;/div&gt;'
unescape('&lt;div&gt;Hello&lt;/div&gt;') // '<div>Hello</div>'
```

## Template

### mapTemplate

Simple template string replacement.

```js
import { mapTemplate } from 'js-cool'

const template = 'My name is ${name}, I am ${age} years old'
mapTemplate(template, { name: 'John', age: 25 })
// 'My name is John, I am 25 years old'
```

## Other

### clearHtml

Remove HTML tags from string.

```js
import { clearHtml } from 'js-cool'

clearHtml('<p>Hello <b>World</b></p>') // 'Hello World'
```

## See Also

- [String API Reference](/api/string/camel2-dash)
