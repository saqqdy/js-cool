[index.md - v2.1.3](README.md) / Exports

# index.md - v2.1.3

## Table of contents

### Namespaces

-   [addEvent](modules/addEvent.md)

### Interfaces

-   [AnyFunction](interfaces/AnyFunction.md)
-   [AnyObject](interfaces/AnyObject.md)
-   [DirParamType](interfaces/DirParamType.md)
-   [SearchkeySet](interfaces/SearchkeySet.md)
-   [WindowSizeObj](interfaces/WindowSizeObj.md)

### Type aliases

-   [ArrayOneMore](modules.md#arrayonemore)

### Variables

-   [pattern](modules.md#pattern)

### Functions

-   [CSVToArray](modules.md#csvtoarray)
-   [CSVToJSON](modules.md#csvtojson)
-   [JSONToCSV](modules.md#jsontocsv)
-   [RGBToHex](modules.md#rgbtohex)
-   [addEvent](modules.md#addevent)
-   [all](modules.md#all)
-   [any](modules.md#any)
-   [arrayToCSV](modules.md#arraytocsv)
-   [camel2Dash](modules.md#camel2dash)
-   [cleanData](modules.md#cleandata)
-   [clearAttr](modules.md#clearattr)
-   [clearBr](modules.md#clearbr)
-   [clearHtml](modules.md#clearhtml)
-   [clearHtmlExpSN](modules.md#clearhtmlexpsn)
-   [clearHtmlN](modules.md#clearhtmln)
-   [clearHtmlNS](modules.md#clearhtmlns)
-   [clearHtmlTag](modules.md#clearhtmltag)
-   [client](modules.md#client)
-   [complement](modules.md#complement)
-   [contains](modules.md#contains)
-   [cutCHSString](modules.md#cutchsstring)
-   [dash2Camel](modules.md#dash2camel)
-   [deWxJumpLink](modules.md#dewxjumplink)
-   [deWxJumpLinkOld](modules.md#dewxjumplinkold)
-   [debounce](modules.md#debounce)
-   [decodeBase64](modules.md#decodebase64)
-   [decodeUtf8](modules.md#decodeutf8)
-   [delCache](modules.md#delcache)
-   [delCookie](modules.md#delcookie)
-   [delSession](modules.md#delsession)
-   [delay](modules.md#delay)
-   [download](modules.md#download)
-   [enWxJumpLink](modules.md#enwxjumplink)
-   [enWxJumpLinkOld](modules.md#enwxjumplinkold)
-   [encodeBase64](modules.md#encodebase64)
-   [encodeUtf8](modules.md#encodeutf8)
-   [extend](modules.md#extend)
-   [fixNumber](modules.md#fixnumber)
-   [formatTime](modules.md#formattime)
-   [formatTimeStr](modules.md#formattimestr)
-   [getAppVersion](modules.md#getappversion)
-   [getCHSLength](modules.md#getchslength)
-   [getCache](modules.md#getcache)
-   [getCookie](modules.md#getcookie)
-   [getDirParam](modules.md#getdirparam)
-   [getFileType](modules.md#getfiletype)
-   [getIsAppVersionLastest](modules.md#getisappversionlastest)
-   [getNumber](modules.md#getnumber)
-   [getOsVersion](modules.md#getosversion)
-   [getParameter](modules.md#getparameter)
-   [getRandomNum](modules.md#getrandomnum)
-   [getRandomStr](modules.md#getrandomstr)
-   [getRandomStrWidthSpecialChar](modules.md#getrandomstrwidthspecialchar)
-   [getScrollPosition](modules.md#getscrollposition)
-   [getSession](modules.md#getsession)
-   [getType](modules.md#gettype)
-   [getUrlParam](modules.md#geturlparam)
-   [getWindowSize](modules.md#getwindowsize)
-   [imgAdapt](modules.md#imgadapt)
-   [imgChoose](modules.md#imgchoose)
-   [intersect](modules.md#intersect)
-   [isArray](modules.md#isarray)
-   [isDigitals](modules.md#isdigitals)
-   [isExitsFunction](modules.md#isexitsfunction)
-   [isExitsVariable](modules.md#isexitsvariable)
-   [minus](modules.md#minus)
-   [nextIndex](modules.md#nextindex)
-   [openUrl](modules.md#openurl)
-   [removeEvent](modules.md#removeevent)
-   [searchTreeObject](modules.md#searchtreeobject)
-   [setCache](modules.md#setcache)
-   [setCookie](modules.md#setcookie)
-   [setSession](modules.md#setsession)
-   [splitThousand](modules.md#splitthousand)
-   [stopBubble](modules.md#stopbubble)
-   [stopDefault](modules.md#stopdefault)
-   [textareaInsertText](modules.md#textareainserttext)
-   [textareaMoveToEnd](modules.md#textareamovetoend)
-   [throttle](modules.md#throttle)
-   [trim](modules.md#trim)
-   [union](modules.md#union)
-   [unique](modules.md#unique)
-   [upperFirst](modules.md#upperfirst)
-   [uuid](modules.md#uuid)

## Type aliases

### ArrayOneMore

Ƭ **ArrayOneMore**<`T`\>: { `0`: `T` } & `T`[]

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

[typings/common.d.ts:9](https://github.com/saqqdy/js-cool/blob/d76432c/typings/common.d.ts#L9)

## Variables

### pattern

• **pattern**: `Object`

pattern 返回一些常用的正则：any, arrjson, chinese, email, float, isjson, json, mobile, number, pass, postcode, qq, string, tel, textarea, url, username

**`returns`** 返回对象

#### Type declaration

| Name       | Type     |
| :--------- | :------- |
| `any`      | `RegExp` |
| `array`    | `RegExp` |
| `arrjson`  | `RegExp` |
| `chinese`  | `RegExp` |
| `email`    | `RegExp` |
| `float`    | `RegExp` |
| `isjson`   | `RegExp` |
| `json`     | `RegExp` |
| `mobile`   | `RegExp` |
| `number`   | `RegExp` |
| `pass`     | `RegExp` |
| `postcode` | `RegExp` |
| `qq`       | `RegExp` |
| `string`   | `RegExp` |
| `tel`      | `RegExp` |
| `textarea` | `RegExp` |
| `url`      | `RegExp` |
| `username` | `RegExp` |

#### Defined in

[src/pattern.ts:6](https://github.com/saqqdy/js-cool/blob/d76432c/src/pattern.ts#L6)

## Functions

### CSVToArray

▸ `Const` **CSVToArray**(`data`, `delimiter?`, `omitFirstRow?`): `string`[][]

将一个逗号分隔的值（CSV）字符串转换为一个 2D 数组。

**`example`**

```js
CSVToArray('a,b\\nc,d') // `[['a','b'],['c','d']]`;
```

**`example`**

```js
CSVToArray('a;b\\nc;d', ';') // `[['a','b'],['c','d']]`;
```

**`example`**

```js
CSVToArray('col1,col2\\na,b\\nc,d', ',', true) // `[['a','b'],['c','d']]`;
```

#### Parameters

| Name           | Type      | Default value | Description                  |
| :------------- | :-------- | :------------ | :--------------------------- |
| `data`         | `string`  | `undefined`   | csv 数据                     |
| `delimiter`    | `string`  | `','`         | 分隔符，默认','              |
| `omitFirstRow` | `boolean` | `false`       | 第一行是表头数据，默认 false |

#### Returns

`string`[][]

array

#### Defined in

[src/CSVToArray.ts:21](https://github.com/saqqdy/js-cool/blob/d76432c/src/CSVToArray.ts#L21)

---

### CSVToJSON

▸ **CSVToJSON**(`data`, `delimiter?`): `any`[]

将一个逗号分隔的值(CSV)字符串转换为一个 2D 对象数组。字符串的第一行作为标题行。

**`example`**

```js
CSVToJSON('col1,col2\\na,b\\nc,d') // `[{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}]`;
```

**`example`**

```js
CSVToJSON('col1;col2\\na;b\\nc;d', ';') // `[{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}]`;
```

#### Parameters

| Name        | Type     | Default value | Description     |
| :---------- | :------- | :------------ | :-------------- |
| `data`      | `string` | `undefined`   | csv 数据        |
| `delimiter` | `string` | `','`         | 分隔符，默认',' |

#### Returns

`any`[]

json

#### Defined in

[src/CSVToJSON.ts:16](https://github.com/saqqdy/js-cool/blob/d76432c/src/CSVToJSON.ts#L16)

---

### JSONToCSV

▸ `Const` **JSONToCSV**(`arr`, `columns`, `delimiter?`): `string`

将一个对象数组转换为只包含指定列的逗号分隔值（CSV）字符串。

**`example`**

```js
JSONToCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b']) // 'a,b\n"1","2"\n"3","4"\n"6",""\n"","7"'
```

**`example`**

```js
JSONToCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b'], ';') // 'a;b\n"1";"2"\n"3";"4"\n"6";""\n"";"7"'
```

#### Parameters

| Name        | Type     | Default value | Description     |
| :---------- | :------- | :------------ | :-------------- |
| `arr`       | `any`[]  | `undefined`   | -               |
| `columns`   | `any`[]  | `undefined`   | 指定列          |
| `delimiter` | `string` | `','`         | 分隔符，默认',' |

#### Returns

`string`

CSV 数据

#### Defined in

[src/JSONToCSV.ts:17](https://github.com/saqqdy/js-cool/blob/d76432c/src/JSONToCSV.ts#L17)

---

### RGBToHex

▸ `Const` **RGBToHex**(`r`, `g`, `b`): `string`

将 RGB 组件的值转换为颜色代码。

**`example`** RGBToHex(255, 165, 1); // 'ffa501'

#### Parameters

| Name | Type     | Description   |
| :--- | :------- | :------------ |
| `r`  | `number` | RGB 第 1 个值 |
| `g`  | `number` | RGB 第 2 个值 |
| `b`  | `number` | RGB 第 3 个值 |

#### Returns

`string`

hex 值

#### Defined in

[src/RGBToHex.ts:10](https://github.com/saqqdy/js-cool/blob/d76432c/src/RGBToHex.ts#L10)

---

### addEvent

▸ **addEvent**(`element`, `type`, `handler`): `void`

addEvent()事件委托，支持多次委托

#### Parameters

| Name      | Type                                       | Description           |
| :-------- | :----------------------------------------- | :-------------------- |
| `element` | [`AnyObject`](interfaces/AnyObject.md)     | js dom 对象           |
| `type`    | `string`                                   | 事件类型。不需要加 on |
| `handler` | [`AnyFunction`](interfaces/AnyFunction.md) | 回调方法              |

#### Returns

`void`

#### Defined in

[src/addEvent.ts:15](https://github.com/saqqdy/js-cool/blob/d76432c/src/addEvent.ts#L15)

---

### all

▸ `Const` **all**(`arr`, `fn`): `boolean`

如果所提供的谓词函数对一个集合中的所有元素都返回 true，则返回 true，否则返回 false。

**`example`**

```js
all([4, 2, 3], x => x > 1) // true
```

**`example`**

```js
all([1, 2, 3]) // true
```

#### Parameters

| Name  | Type                                       | Description |
| :---- | :----------------------------------------- | :---------- |
| `arr` | `any`[]                                    | 目标数组    |
| `fn`  | [`AnyFunction`](interfaces/AnyFunction.md) | 判断方法    |

#### Returns

`boolean`

返回判断结果

#### Defined in

[src/all.ts:17](https://github.com/saqqdy/js-cool/blob/d76432c/src/all.ts#L17)

---

### any

▸ `Const` **any**(`arr`, `fn`): `boolean`

如果所提供的谓词函数对一个集合中的至少一个元素返回 true，则返回 true，否则返回 false。

**`example`**

```js
any([0, 1, 2, 0], x => x >= 2) // true
```

**`example`**

```js
any([0, 0, 1, 0]) // true
```

#### Parameters

| Name  | Type                                       | Description |
| :---- | :----------------------------------------- | :---------- |
| `arr` | `any`[]                                    | 目标数组    |
| `fn`  | [`AnyFunction`](interfaces/AnyFunction.md) | 判断方法    |

#### Returns

`boolean`

返回判断结果

#### Defined in

[src/any.ts:17](https://github.com/saqqdy/js-cool/blob/d76432c/src/any.ts#L17)

---

### arrayToCSV

▸ `Const` **arrayToCSV**(`arr`, `delimiter?`): `string`

将一个二维数组转换为一个逗号分隔的值（CSV）字符串。

**`example`**

```js
arrayToCSV([
    ['a', 'b'],
    ['c', 'd']
]) // '"a","b"\n"c","d"'
```

**`example`**

```js
arrayToCSV(
    [
        ['a', 'b'],
        ['c', 'd']
    ],
    ';'
) // '"a";"b"\n"c";"d"'
```

**`example`**

```js
arrayToCSV([
    ['a', '"b" great'],
    ['c', 3.1415]
]) // '"a","""b"" great"\n"c",3.1415'
```

#### Parameters

| Name        | Type     | Default value | Description     |
| :---------- | :------- | :------------ | :-------------- |
| `arr`       | `any`[]  | `undefined`   | -               |
| `delimiter` | `string` | `','`         | 分隔符，默认',' |

#### Returns

`string`

CSV 数据

#### Defined in

[src/arrayToCSV.ts:20](https://github.com/saqqdy/js-cool/blob/d76432c/src/arrayToCSV.ts#L20)

---

### camel2Dash

▸ **camel2Dash**(`string`): `string`

将驼峰字符串转成-间隔且全小写的 Dash 模式

#### Parameters

| Name     | Type     | Description      |
| :------- | :------- | :--------------- |
| `string` | `string` | 需要转换的字符串 |

#### Returns

`string`

返回转换后的字符串

#### Defined in

[src/camel2Dash.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/camel2Dash.ts#L7)

---

### cleanData

▸ **cleanData**(`data`, `map`, `nullFix?`): `any`

数据清洗方法

#### Parameters

| Name       | Type                                              | Description                      |
| :--------- | :------------------------------------------------ | :------------------------------- |
| `data`     | `any`                                             | 要清洗的对象，必传               |
| `map`      | `any`[] \| [`AnyObject`](interfaces/AnyObject.md) | 需要的数据队列，可传数组或者对象 |
| `nullFix?` | `any`                                             | -                                |

#### Returns

`any`

返回清洗后的对象

#### Defined in

[src/cleanData.ts:16](https://github.com/saqqdy/js-cool/blob/d76432c/src/cleanData.ts#L16)

---

### clearAttr

▸ **clearAttr**(`string`): `string`

去除 HTML 标签所有属性

#### Parameters

| Name     | Type     | Description |
| :------- | :------- | :---------- |
| `string` | `string` | 传入字符串  |

#### Returns

`string`

newString

#### Defined in

[src/clearAttr.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/clearAttr.ts#L7)

---

### clearBr

▸ **clearBr**(`string`): `string`

去除换行

#### Parameters

| Name     | Type     | Description          |
| :------- | :------- | :------------------- |
| `string` | `string` | 带 html 标签的字符串 |

#### Returns

`string`

newString

#### Defined in

[src/clearBr.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/clearBr.ts#L7)

---

### clearHtml

▸ **clearHtml**(`string`): `string`

去除 HTML 标签

#### Parameters

| Name     | Type     | Description          |
| :------- | :------- | :------------------- |
| `string` | `string` | 带 html 标签的字符串 |

#### Returns

`string`

newString

#### Defined in

[src/clearHtml.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/clearHtml.ts#L7)

---

### clearHtmlExpSN

▸ **clearHtmlExpSN**(`string`): `string`

去除 HTML 标签保留空格、换行

#### Parameters

| Name     | Type     | Description          |
| :------- | :------- | :------------------- |
| `string` | `string` | 带 html 标签的字符串 |

#### Returns

`string`

newString

#### Defined in

[src/clearHtmlExpSN.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/clearHtmlExpSN.ts#L7)

---

### clearHtmlN

▸ **clearHtmlN**(`string`): `string`

去除 HTML 标签及换行

#### Parameters

| Name     | Type     | Description          |
| :------- | :------- | :------------------- |
| `string` | `string` | 带 html 标签的字符串 |

#### Returns

`string`

newString

#### Defined in

[src/clearHtmlN.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/clearHtmlN.ts#L7)

---

### clearHtmlNS

▸ **clearHtmlNS**(`string`): `string`

去除 HTML 标签及空格、换行

#### Parameters

| Name     | Type     | Description          |
| :------- | :------- | :------------------- |
| `string` | `string` | 带 html 标签的字符串 |

#### Returns

`string`

newString

#### Defined in

[src/clearHtmlNS.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/clearHtmlNS.ts#L7)

---

### clearHtmlTag

▸ **clearHtmlTag**(`string`): `string`

去除 HTML 标签及标签里面的文字

#### Parameters

| Name     | Type     | Description          |
| :------- | :------- | :------------------- |
| `string` | `string` | 带 html 标签的字符串 |

#### Returns

`string`

newString

#### Defined in

[src/clearHtmlTag.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/clearHtmlTag.ts#L7)

---

### client

▸ `Const` **client**(`name?`, `userAgent?`): `boolean` \| { `ANDROID`: `boolean` ; `GECKO`: `boolean` ; `IE`: `boolean` ; `IOS`: `boolean` = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); `IPAD`: `boolean` ; `IPHONE`: `boolean` ; `MOBILE`: `boolean` = !!userAgent.match(/AppleWebKit._Mobile._/); `OPERA`: `boolean` ; `QQ`: `null` \| `RegExpMatchArray` ; `QQBROWSER`: `boolean` ; `TRIDENT`: `boolean` ; `WEBKIT`: `boolean` ; `WEIXIN`: `boolean` }

client 方法返回一个浏览器判断结果：`{ ANDROID: true, GECKO: true, GLSH_APP: false, IE: false, IOS: false, IPAD: false, IPHONE: false, MOBILE: true, MOBILEDEVICE: true, OPERA: false, QQ: false, QQBROWSER: false, TRIDENT: false, WEBKIT: true, WEIXIN: false }`

#### Parameters

| Name        | Type     | Default value | Description                                                |
| :---------- | :------- | :------------ | :--------------------------------------------------------- |
| `name`      | `string` | `''`          | 可选，比如传入 MicroMessenger，返回是否为微信内置浏览器    |
| `userAgent` | `string` | `undefined`   | 可选，传入自定义的 ua，默认取浏览器的 navigator.appVersion |

#### Returns

`boolean` \| { `ANDROID`: `boolean` ; `GECKO`: `boolean` ; `IE`: `boolean` ; `IOS`: `boolean` = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); `IPAD`: `boolean` ; `IPHONE`: `boolean` ; `MOBILE`: `boolean` = !!userAgent.match(/AppleWebKit._Mobile._/); `OPERA`: `boolean` ; `QQ`: `null` \| `RegExpMatchArray` ; `QQBROWSER`: `boolean` ; `TRIDENT`: `boolean` ; `WEBKIT`: `boolean` ; `WEIXIN`: `boolean` }

返回常用 ua 匹配表，如果传了 name，那么返回是否匹配该终端 true/false

#### Defined in

[src/client.ts:8](https://github.com/saqqdy/js-cool/blob/d76432c/src/client.ts#L8)

---

### complement

▸ **complement**<`T`\>(...`args`): `T`[]

求多个数组的补集

**`example`**

```js
complement([1, 2], [2, '33'], [2]) // [1, '33']
```

#### Type parameters

| Name | Type      |
| :--- | :-------- |
| `T`  | `unknown` |

#### Parameters

| Name      | Type    | Description |
| :-------- | :------ | :---------- |
| `...args` | `T`[][] | 参数        |

#### Returns

`T`[]

array

#### Defined in

[src/complement.ts:15](https://github.com/saqqdy/js-cool/blob/d76432c/src/complement.ts#L15)

---

### contains

▸ **contains**(`arr`, `item`): `boolean`

数组是否包含指定元素

**`example`**

```js
contains([1, 2], 2) // true
contains([1, 2], 3) // false
```

#### Parameters

| Name   | Type    | Description  |
| :----- | :------ | :----------- |
| `arr`  | `any`[] | 目标数组     |
| `item` | `any`   | 要查找的目标 |

#### Returns

`boolean`

boolean

#### Defined in

[src/contains.ts:13](https://github.com/saqqdy/js-cool/blob/d76432c/src/contains.ts#L13)

---

### cutCHSString

▸ **cutCHSString**(`str`, `len?`, `hasDot?`): `string`

截取字符串，中文算 2 个字节

#### Parameters

| Name     | Type      | Default value | Description    |
| :------- | :-------- | :------------ | :------------- |
| `str`    | `string`  | `undefined`   | 要截取的字符串 |
| `len`    | `number`  | `undefined`   | -              |
| `hasDot` | `boolean` | `false`       | -              |

#### Returns

`string`

返回截取后的字符串

#### Defined in

[src/cutCHSString.ts:39](https://github.com/saqqdy/js-cool/blob/d76432c/src/cutCHSString.ts#L39)

---

### dash2Camel

▸ **dash2Camel**(`string`): `string`

将-间隔且全小写的 Dash 模式转成驼峰字符串

#### Parameters

| Name     | Type     | Description      |
| :------- | :------- | :--------------- |
| `string` | `string` | 需要转换的字符串 |

#### Returns

`string`

返回转换后的字符串

#### Defined in

[src/dash2Camel.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/dash2Camel.ts#L7)

---

### deWxJumpLink

▸ **deWxJumpLink**(`string`): `string`

用=替换* 用&替换! 解码成微信跳转链接
name*exMall-detail-goodsInfoId!params(goodsInfoId)\*8866 转成 name=exMall-detail-goodsInfoId&params[goodsInfoId]=8866

#### Parameters

| Name     | Type     | Description |
| :------- | :------- | :---------- |
| `string` | `string` | 传入字符串  |

#### Returns

`string`

返回解码结果

#### Defined in

[src/deWxJumpLink.ts:8](https://github.com/saqqdy/js-cool/blob/d76432c/src/deWxJumpLink.ts#L8)

---

### deWxJumpLinkOld

▸ **deWxJumpLinkOld**(`string`): `string`

用=替换~ 用&替换^ 解码成微信跳转链接

#### Parameters

| Name     | Type     | Description |
| :------- | :------- | :---------- |
| `string` | `string` | 传入字符串  |

#### Returns

`string`

返回解码结果

#### Defined in

[src/deWxJumpLinkOld.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/deWxJumpLinkOld.ts#L7)

---

### debounce

▸ **debounce**(`fn`, `delay`, `immediate`): () => `void`

空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，fn 才会执行

#### Parameters

| Name        | Type                                       | Description                                                           |
| :---------- | :----------------------------------------- | :-------------------------------------------------------------------- |
| `fn`        | [`AnyFunction`](interfaces/AnyFunction.md) | 要调用的函数                                                          |
| `delay`     | `number`                                   | 空闲时间                                                              |
| `immediate` | `boolean`                                  | 给 immediate 参数传递 false 绑定的函数先执行，而不是 delay 后后执行。 |

#### Returns

`fn`

实际调用函数

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/debounce.ts:12](https://github.com/saqqdy/js-cool/blob/d76432c/src/debounce.ts#L12)

---

### decodeBase64

▸ **decodeBase64**(`input`): `string`

base64 解码

#### Parameters

| Name    | Type     | Description      |
| :------ | :------- | :--------------- |
| `input` | `string` | 需要解码的字符串 |

#### Returns

`string`

解码后的字符串

#### Defined in

[src/decodeBase64.ts:10](https://github.com/saqqdy/js-cool/blob/d76432c/src/decodeBase64.ts#L10)

---

### decodeUtf8

▸ **decodeUtf8**(`utftext`): `string`

解码 Utf8

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `utftext` | `string` |

#### Returns

`string`

解码后的字符串

#### Defined in

[src/decodeUtf8.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/decodeUtf8.ts#L7)

---

### delCache

▸ **delCache**(`name`): `void`

删除 localStorage

#### Parameters

| Name   | Type     | Description |
| :----- | :------- | :---------- |
| `name` | `string` | 名称        |

#### Returns

`void`

#### Defined in

[src/delCache.ts:6](https://github.com/saqqdy/js-cool/blob/d76432c/src/delCache.ts#L6)

---

### delCookie

▸ **delCookie**(`name`): `void`

删除 cookie

#### Parameters

| Name   | Type     | Description |
| :----- | :------- | :---------- |
| `name` | `string` | cookie 名称 |

#### Returns

`void`

#### Defined in

[src/delCookie.ts:8](https://github.com/saqqdy/js-cool/blob/d76432c/src/delCookie.ts#L8)

---

### delSession

▸ **delSession**(`name`): `void`

删除 sessionStorage

#### Parameters

| Name   | Type     | Description |
| :----- | :------- | :---------- |
| `name` | `string` | 名称        |

#### Returns

`void`

#### Defined in

[src/delSession.ts:6](https://github.com/saqqdy/js-cool/blob/d76432c/src/delSession.ts#L6)

---

### delay

▸ **delay**(): `Object`

防抖节流

#### Returns

`Object`

class

| Name       | Type                                                                                                             |
| :--------- | :--------------------------------------------------------------------------------------------------------------- |
| `map`      | `any`                                                                                                            |
| `destroy`  | (`id`: `string`) => `void`                                                                                       |
| `register` | (`id`: `string`, `fn`: [`AnyFunction`](interfaces/AnyFunction.md), `time`: `number`, `boo`: `boolean`) => `void` |

#### Defined in

[src/delay.ts:8](https://github.com/saqqdy/js-cool/blob/d76432c/src/delay.ts#L8)

---

### download

▸ **download**(`url`, `filename`, `type?`): `void`

文件下载的几种方式：

1. 针对一些浏览器无法识别的文件格式。地址栏输入文件 URL、window.location.href = URL、window.open(URL)；
2. 使用 a 标签 download 属性（或者 js 创建 a 标签）；
3. 浏览器可识别的 pdf、txt 文件，后端兼容处理 attachment；
4. 在 header 增加 token 用于鉴权下载，使用 XmlHttpRequest 来想后台发起请求

#### Parameters

| Name       | Type     | Default value | Description                                 |
| :--------- | :------- | :------------ | :------------------------------------------ |
| `url`      | `string` | `undefined`   | 链接                                        |
| `filename` | `string` | `undefined`   | 文件名                                      |
| `type`     | `string` | `'download'`  | 下载类型 'href','open','download','request' |

#### Returns

`void`

#### Defined in

[src/download.ts:12](https://github.com/saqqdy/js-cool/blob/d76432c/src/download.ts#L12)

---

### enWxJumpLink

▸ **enWxJumpLink**(`string`): `string`

用*替换= 用!替换& 转码成微信跳转链接
name=exMall-detail-goodsInfoId&params[goodsInfoId]=8866 转成 name*exMall-detail-goodsInfoId!params(goodsInfoId)\*8866

#### Parameters

| Name     | Type     | Description |
| :------- | :------- | :---------- |
| `string` | `string` | 传入字符串  |

#### Returns

`string`

返回转码结果

#### Defined in

[src/enWxJumpLink.ts:8](https://github.com/saqqdy/js-cool/blob/d76432c/src/enWxJumpLink.ts#L8)

---

### enWxJumpLinkOld

▸ **enWxJumpLinkOld**(`string`): `string`

用~替换= 用^替换& 转码成微信跳转链接

#### Parameters

| Name     | Type     | Description |
| :------- | :------- | :---------- |
| `string` | `string` | 传入字符串  |

#### Returns

`string`

返回转码结果

#### Defined in

[src/enWxJumpLinkOld.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/enWxJumpLinkOld.ts#L7)

---

### encodeBase64

▸ **encodeBase64**(`input`): `string`

字符串、数字转 base64

#### Parameters

| Name    | Type     | Description      |
| :------ | :------- | :--------------- |
| `input` | `string` | 需要编码的字符串 |

#### Returns

`string`

返回 BASE64 编码

#### Defined in

[src/encodeBase64.ts:10](https://github.com/saqqdy/js-cool/blob/d76432c/src/encodeBase64.ts#L10)

---

### encodeUtf8

▸ **encodeUtf8**(`string`): `string`

编码 Utf8

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `string` | `string` |

#### Returns

`string`

返回 UTF-8 编码

#### Defined in

[src/encodeUtf8.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/encodeUtf8.ts#L7)

---

### extend

▸ **extend**<`T`\>(`target`, ...`args`): `T`

#### Type parameters

| Name | Type                |
| :--- | :------------------ |
| `T`  | `object` \| `any`[] |

#### Parameters

| Name      | Type                                              |
| :-------- | :------------------------------------------------ |
| `target`  | `boolean` \| `T`                                  |
| `...args` | [`ArrayOneMore`](modules.md#arrayonemore)<`any`\> |

#### Returns

`T`

#### Defined in

[src/extend.ts:14](https://github.com/saqqdy/js-cool/blob/d76432c/src/extend.ts#L14)

---

### fixNumber

▸ **fixNumber**(`number`, `n?`): `string` \| `number`

截取小数点后几位，不足的不补 0

#### Parameters

| Name     | Type                 | Default value | Description                       |
| :------- | :------------------- | :------------ | :-------------------------------- |
| `number` | `string` \| `number` | `undefined`   | 要处理的数字，必填                |
| `n`      | `number`             | `2`           | 要保留的小数点位数，默认保留 2 位 |

#### Returns

`string` \| `number`

返回新数字

#### Defined in

[src/fixNumber.ts:8](https://github.com/saqqdy/js-cool/blob/d76432c/src/fixNumber.ts#L8)

---

### formatTime

▸ **formatTime**(`time`, `fmt?`): `string`

日期格式化插件

**`example`** 使用方式

```js
formatTime(new Date(), 'yyyy-MM-dd')
```

#### Parameters

| Name   | Type               | Default value  | Description        |
| :----- | :----------------- | :------------- | :----------------- |
| `time` | `string` \| `Date` | `undefined`    | 时间对象或者字符串 |
| `fmt`  | `string`           | `'yyyy-MM-dd'` | 格式化风格         |

#### Returns

`string`

返回字符串

#### Defined in

[src/formatTime.ts:12](https://github.com/saqqdy/js-cool/blob/d76432c/src/formatTime.ts#L12)

---

### formatTimeStr

▸ **formatTimeStr**(`time`, `fmt`): `string`

格式化时间成：刚刚、几分钟前

#### Parameters

| Name   | Type                 | Description        |
| :----- | :------------------- | :----------------- |
| `time` | `string` \| `number` | 时间对象或者字符串 |
| `fmt`  | `string`             | 格式化风格         |

#### Returns

`string`

返回字符串

#### Defined in

[src/formatTimeStr.ts:10](https://github.com/saqqdy/js-cool/blob/d76432c/src/formatTimeStr.ts#L10)

---

### getAppVersion

▸ **getAppVersion**(`appName`, `withappstr?`, `userAgent?`): `string` \| `boolean` \| `null`

获取 APP 版本号

#### Parameters

| Name          | Type      | Description                             |
| :------------ | :-------- | :-------------------------------------- |
| `appName`     | `string`  | app 名称                                |
| `withappstr?` | `boolean` | -                                       |
| `userAgent?`  | `string`  | ua，可不传，默认取 navigator.appVersion |

#### Returns

`string` \| `boolean` \| `null`

null/true/false

#### Defined in

[src/getAppVersion.ts:9](https://github.com/saqqdy/js-cool/blob/d76432c/src/getAppVersion.ts#L9)

---

### getCHSLength

▸ **getCHSLength**(`str`): `number`

获取文本长度，中文算 2 个字节

#### Parameters

| Name  | Type     | Description |
| :---- | :------- | :---------- |
| `str` | `string` | 字符串      |

#### Returns

`number`

返回长度

#### Defined in

[src/getCHSLength.ts:23](https://github.com/saqqdy/js-cool/blob/d76432c/src/getCHSLength.ts#L23)

---

### getCache

▸ **getCache**(`name`): `any`

获取缓存，存入的如果是 Object，取出的也是 Object，不需要再转换

#### Parameters

| Name   | Type     | Description |
| :----- | :------- | :---------- |
| `name` | `string` | 缓存名称    |

#### Returns

`any`

返回数据，存的如果是对象，取出的也是对象

#### Defined in

[src/getCache.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/getCache.ts#L7)

---

### getCookie

▸ **getCookie**(`name`): `any`

读取 cookies

#### Parameters

| Name   | Type     | Description |
| :----- | :------- | :---------- |
| `name` | `string` | cookie 名称 |

#### Returns

`any`

返回 cookie 字符串

#### Defined in

[src/getCookie.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/getCookie.ts#L7)

---

### getDirParam

▸ **getDirParam**(`url`): [`DirParamType`](interfaces/DirParamType.md)

获取目录形式 URL 参数

#### Parameters

| Name  | Type     | Description   |
| :---- | :------- | :------------ |
| `url` | `string` | 传入 url 地址 |

#### Returns

[`DirParamType`](interfaces/DirParamType.md)

返回参数对象

#### Defined in

[src/getDirParam.ts:12](https://github.com/saqqdy/js-cool/blob/d76432c/src/getDirParam.ts#L12)

---

### getFileType

▸ **getFileType**(`url`): `string`

文件后缀名

**`example`**

```js
getFileType('http://www.saqqdy.com/test.jpg') // .jpg;
```

**`example`**

```js
getFileType('http://www.saqqdy.com/test.JPEG') // .jpeg;
```

#### Parameters

| Name  | Type     | Description |
| :---- | :------- | :---------- |
| `url` | `string` | 文件名      |

#### Returns

`string`

返回文件后缀

#### Defined in

[src/getFileType.ts:15](https://github.com/saqqdy/js-cool/blob/d76432c/src/getFileType.ts#L15)

---

### getIsAppVersionLastest

▸ **getIsAppVersionLastest**(`appName`, `compareVer`, `userAgent?`): `boolean` \| `null`

版本号大小对比

**`example`**

```js
// navigator.appVersion = "5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36"
getIsAppVersionLastest('Chrome', '90.0.4515.159') // true;
getIsAppVersionLastest('Chrome', '94.10.4515.159', navigator.appVersion) // false;
```

#### Parameters

| Name         | Type     | Description                             |
| :----------- | :------- | :-------------------------------------- |
| `appName`    | `string` | app 名称                                |
| `compareVer` | `string` | 必传 需要对比的版本号                   |
| `userAgent?` | `string` | ua，可不传，默认取 navigator.appVersion |

#### Returns

`boolean` \| `null`

null/true/false

#### Defined in

[src/getIsAppVersionLastest.ts:17](https://github.com/saqqdy/js-cool/blob/d76432c/src/getIsAppVersionLastest.ts#L17)

---

### getNumber

▸ **getNumber**(`string`): `string`

获取字符串中的数字

**`example`**

```js
getNumber('Chrome123.33') // '123.33';
getNumber('234test.88') // '234.88';
```

#### Parameters

| Name     | Type     | Description        |
| :------- | :------- | :----------------- |
| `string` | `string` | 传入带数字的字符串 |

#### Returns

`string`

返回纯数字字符串

#### Defined in

[src/getNumber.ts:12](https://github.com/saqqdy/js-cool/blob/d76432c/src/getNumber.ts#L12)

---

### getOsVersion

▸ **getOsVersion**(`osName`, `withosstr?`, `userAgent?`): `string` \| `boolean` \| `null`

获取手机系统版本

**`example`**

```
getAppVersion('iPhone') // '13.2.3'
getAppVersion('iPhone', true) // 'iPhone/13.2.3'
```

#### Parameters

| Name         | Type      | Description                                    |
| :----------- | :-------- | :--------------------------------------------- |
| `osName`     | `string`  | 系统类型字符串 Android、iPod、iWatch 或 iPhone |
| `withosstr?` | `boolean` | 是否需要带上名称                               |
| `userAgent?` | `string`  | ua，可不传，默认取 navigator.appVersion        |

#### Returns

`string` \| `boolean` \| `null`

null/true/false

#### Defined in

[src/getOsVersion.ts:16](https://github.com/saqqdy/js-cool/blob/d76432c/src/getOsVersion.ts#L16)

---

### getParameter

▸ **getParameter**(`name`): `string` \| `null`

获取单个 URL 参数

#### Parameters

| Name   | Type     | Description |
| :----- | :------- | :---------- |
| `name` | `string` | 参数名称    |

#### Returns

`string` \| `null`

返回参数值

#### Defined in

[src/getParameter.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/getParameter.ts#L7)

---

### getRandomNum

▸ **getRandomNum**(`min?`, `max?`): `number`

获取随机整数

#### Parameters

| Name  | Type     | Default value | Description    |
| :---- | :------- | :------------ | :------------- |
| `min` | `number` | `1`           | 随机数的最小值 |
| `max` | `number` | `10`          | 随机数的最大值 |

#### Returns

`number`

返回数字

#### Defined in

[src/getRandomNum.ts:8](https://github.com/saqqdy/js-cool/blob/d76432c/src/getRandomNum.ts#L8)

---

### getRandomStr

▸ **getRandomStr**(`len?`, `widthSpecialChar?`): `string`

获取随机字符串

#### Parameters

| Name               | Type      | Default value | Description                      |
| :----------------- | :-------- | :------------ | :------------------------------- |
| `len`              | `number`  | `32`          | 需要获取随机字符串的长度         |
| `widthSpecialChar` | `boolean` | `false`       | 可选，是否需要生成带特殊字符的串 |

#### Returns

`string`

随机串

#### Defined in

[src/getRandomStr.ts:8](https://github.com/saqqdy/js-cool/blob/d76432c/src/getRandomStr.ts#L8)

---

### getRandomStrWidthSpecialChar

▸ **getRandomStrWidthSpecialChar**(`len?`): `string`

获取随机字符串带特殊符号

#### Parameters

| Name  | Type     | Default value | Description              |
| :---- | :------- | :------------ | :----------------------- |
| `len` | `number` | `32`          | 需要获取随机字符串的长度 |

#### Returns

`string`

随机串

#### Defined in

[src/getRandomStrWidthSpecialChar.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/getRandomStrWidthSpecialChar.ts#L7)

---

### getScrollPosition

▸ `Const` **getScrollPosition**(): `string` \| `void`

获取滑动到顶部和底部 返回'top' 'bottom'，建议使用限流

#### Returns

`string` \| `void`

返回位置

#### Defined in

[src/getScrollPosition.ts:6](https://github.com/saqqdy/js-cool/blob/d76432c/src/getScrollPosition.ts#L6)

---

### getSession

▸ **getSession**(`name`): `any`

读取 sessionStorage

#### Parameters

| Name   | Type     | Description |
| :----- | :------- | :---------- |
| `name` | `string` | 名称        |

#### Returns

`any`

返回 sessionStorage

#### Defined in

[src/getSession.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/getSession.ts#L7)

---

### getType

▸ **getType**(`target`): `string`

获取目标类型

#### Parameters

| Name     | Type  | Description |
| :------- | :---- | :---------- |
| `target` | `any` | 目标        |

#### Returns

`string`

类型

#### Defined in

[src/getType.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/getType.ts#L7)

---

### getUrlParam

▸ **getUrlParam**(`url`): `object`

获取 URL 参数

#### Parameters

| Name  | Type     | Description   |
| :---- | :------- | :------------ |
| `url` | `string` | 传入 url 参数 |

#### Returns

`object`

返回参数列表

#### Defined in

[src/getUrlParam.ts:51](https://github.com/saqqdy/js-cool/blob/d76432c/src/getUrlParam.ts#L51)

---

### getWindowSize

▸ **getWindowSize**(): [`WindowSizeObj`](interfaces/WindowSizeObj.md)

getWindowSize 获取窗口大小

#### Returns

[`WindowSizeObj`](interfaces/WindowSizeObj.md)

返回宽高

#### Defined in

[src/getWindowSize.ts:11](https://github.com/saqqdy/js-cool/blob/d76432c/src/getWindowSize.ts#L11)

---

### imgAdapt

▸ **imgAdapt**(`imgurl`, `size`): `string` \| `false`

扩展图片自动适应多种分辨率 small original

#### Parameters

| Name     | Type     | Description |
| :------- | :------- | :---------- |
| `imgurl` | `string` | 图片 url    |
| `size`   | `string` | 图片规格    |

#### Returns

`string` \| `false`

返回新地址

#### Defined in

[src/imgAdapt.ts:8](https://github.com/saqqdy/js-cool/blob/d76432c/src/imgAdapt.ts#L8)

---

### imgChoose

▸ **imgChoose**(`imgurl`): `string`

扩展图片自动适应多种分辨率`@2x @3x`

#### Parameters

| Name     | Type     | Description |
| :------- | :------- | :---------- |
| `imgurl` | `string` | 图片地址    |

#### Returns

`string`

返回新地址

#### Defined in

[src/imgChoose.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/imgChoose.ts#L7)

---

### intersect

▸ **intersect**<`T`\>(...`args`): `T`[]

求多个数组的交集

**`example`**

```js
intersect([1, 2], [2, 3, 4], [2, 8], [2, '33']) // [2]
```

#### Type parameters

| Name | Type      |
| :--- | :-------- |
| `T`  | `unknown` |

#### Parameters

| Name      | Type    | Description |
| :-------- | :------ | :---------- |
| `...args` | `T`[][] | 参数        |

#### Returns

`T`[]

array

#### Defined in

[src/intersect.ts:13](https://github.com/saqqdy/js-cool/blob/d76432c/src/intersect.ts#L13)

---

### isArray

▸ **isArray**(`arr`): arr is any[]

判断是否数组

#### Parameters

| Name  | Type  | Description |
| :---- | :---- | :---------- |
| `arr` | `any` | -           |

#### Returns

arr is any[]

#### Defined in

[src/isArray.ts:6](https://github.com/saqqdy/js-cool/blob/d76432c/src/isArray.ts#L6)

---

### isDigitals

▸ **isDigitals**(`str`): `boolean`

是否为由数字组成的字符串

#### Parameters

| Name  | Type  | Description    |
| :---- | :---- | :------------- |
| `str` | `any` | 待检测的字符串 |

#### Returns

`boolean`

返回 true/false

#### Defined in

[src/isDigitals.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/isDigitals.ts#L7)

---

### isExitsFunction

▸ **isExitsFunction**(`funcName`): `boolean`

是否存在指定函数

#### Parameters

| Name       | Type     | Description |
| :--------- | :------- | :---------- |
| `funcName` | `string` | 传入函数名  |

#### Returns

`boolean`

返回 true/false

#### Defined in

[src/isExitsFunction.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/isExitsFunction.ts#L7)

---

### isExitsVariable

▸ **isExitsVariable**(`variableName`): `boolean`

是否存在指定变量

#### Parameters

| Name           | Type     | Description  |
| :------------- | :------- | :----------- |
| `variableName` | `string` | 传入变量名称 |

#### Returns

`boolean`

返回 true/false

#### Defined in

[src/isExitsVariable.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/isExitsVariable.ts#L7)

---

### minus

▸ **minus**<`T`\>(...`args`): `T`[]

求多个数组的差集，属于 A 但不属于 B/C/D...的元素

**`example`**

```js
minus([1, 2], [2, '33'], [2, 4]) // [1]
```

#### Type parameters

| Name | Type      |
| :--- | :-------- |
| `T`  | `unknown` |

#### Parameters

| Name      | Type    | Description |
| :-------- | :------ | :---------- |
| `...args` | `T`[][] | 参数        |

#### Returns

`T`[]

array

#### Defined in

[src/minus.ts:14](https://github.com/saqqdy/js-cool/blob/d76432c/src/minus.ts#L14)

---

### nextIndex

▸ **nextIndex**(`min?`, `max?`): `number`

返回下一个 zIndex 值

#### Parameters

| Name  | Type     | Default value | Description  |
| :---- | :------- | :------------ | :----------- |
| `min` | `number` | `5000`        | 可选，最小值 |
| `max` | `number` | `10000`       | 可选，最大值 |

#### Returns

`number`

数字

#### Defined in

[src/nextIndex.ts:8](https://github.com/saqqdy/js-cool/blob/d76432c/src/nextIndex.ts#L8)

---

### openUrl

▸ **openUrl**(`url`): `void`

新标签页打开链接（浏览器不能解析的文件跳转下载）

#### Parameters

| Name  | Type     | Description |
| :---- | :------- | :---------- |
| `url` | `string` | 链接        |

#### Returns

`void`

#### Defined in

[src/openUrl.ts:6](https://github.com/saqqdy/js-cool/blob/d76432c/src/openUrl.ts#L6)

---

### removeEvent

▸ **removeEvent**(`element`, `type`, `handler`): `void`

removeEvent 移除由 addEvent 创建的事件委托

#### Parameters

| Name      | Type                                       | Description           |
| :-------- | :----------------------------------------- | :-------------------- |
| `element` | [`AnyObject`](interfaces/AnyObject.md)     | js dom 对象           |
| `type`    | `string`                                   | 事件类型。不需要加 on |
| `handler` | [`AnyFunction`](interfaces/AnyFunction.md) | 回调方法              |

#### Returns

`void`

#### Defined in

[src/removeEvent.ts:10](https://github.com/saqqdy/js-cool/blob/d76432c/src/removeEvent.ts#L10)

---

### searchTreeObject

▸ **searchTreeObject**(`tree`, `expression`, `keySet`, `number?`): `any`[]

tree 对象深度查找

#### Parameters

| Name         | Type                                         | Default value | Description                    |
| :----------- | :------------------------------------------- | :------------ | :----------------------------- |
| `tree`       | `object` \| `any`[]                          | `undefined`   | 树形对象                       |
| `expression` | `any`                                        | `undefined`   | 必填 查询方式                  |
| `keySet`     | [`SearchkeySet`](interfaces/SearchkeySet.md) | `undefined`   | 选填 默认的子类名称、查询 name |
| `number`     | `number`                                     | `0`           | 选填 查找个数，不传则查询全部  |

#### Returns

`any`[]

返回查询到的数组

#### Defined in

[src/searchTreeObject.ts:16](https://github.com/saqqdy/js-cool/blob/d76432c/src/searchTreeObject.ts#L16)

---

### setCache

▸ **setCache**(`name`, `value`, `seconds`): `void`

获取缓存，存入的如果是 Object，取出的也是 Object，不需要再转换

#### Parameters

| Name      | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `name`    | `string` | 缓存名称                      |
| `value`   | `any`    | 缓存数据，可以直接传入 Object |
| `seconds` | `number` | -缓存时间（秒）               |

#### Returns

`void`

返回数据，存的如果是对象，取出的也是对象

#### Defined in

[src/setCache.ts:14](https://github.com/saqqdy/js-cool/blob/d76432c/src/setCache.ts#L14)

---

### setCookie

▸ **setCookie**(`name`, `value`, `seconds?`, `path?`, `samesite?`): `void`

setCookie 写入 cookie 的方法

#### Parameters

| Name       | Type      | Default value | Description                        |
| :--------- | :-------- | :------------ | :--------------------------------- |
| `name`     | `string`  | `undefined`   | cookie 名称                        |
| `value`    | `any`     | `undefined`   | 设置要存储的值，可以是对象或字符串 |
| `seconds`  | `number`  | `86400`       | cookie 有效时间默认 1 天           |
| `path`     | `string`  | `'/'`         | 路径，默认'/'                      |
| `samesite` | `boolean` | `true`        | SameSite，默认 true                |

#### Returns

`void`

#### Defined in

[src/setCookie.ts:10](https://github.com/saqqdy/js-cool/blob/d76432c/src/setCookie.ts#L10)

---

### setSession

▸ **setSession**(`name`, `value`, `seconds`): `void`

写 sessionStorage

#### Parameters

| Name      | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `name`    | `string` | 名称                               |
| `value`   | `any`    | 设置要存储的值，可以是对象或字符串 |
| `seconds` | `number` | 有效时间                           |

#### Returns

`void`

#### Defined in

[src/setSession.ts:13](https://github.com/saqqdy/js-cool/blob/d76432c/src/setSession.ts#L13)

---

### splitThousand

▸ **splitThousand**(`val`): `string` \| `0`

数字千分位分割

#### Parameters

| Name  | Type                 |
| :---- | :------------------- |
| `val` | `string` \| `number` |

#### Returns

`string` \| `0`

分割后的字符串

#### Defined in

[src/splitThousand.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/splitThousand.ts#L7)

---

### stopBubble

▸ **stopBubble**(`e`): `boolean`

阻止冒泡

#### Parameters

| Name | Type    | Description       |
| :--- | :------ | :---------------- |
| `e`  | `Event` | dom 的 event 对象 |

#### Returns

`boolean`

bool false

#### Defined in

[src/stopBubble.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/stopBubble.ts#L7)

---

### stopDefault

▸ **stopDefault**(`e`): `boolean`

阻止默认事件

#### Parameters

| Name | Type    | Description       |
| :--- | :------ | :---------------- |
| `e`  | `Event` | dom 的 event 对象 |

#### Returns

`boolean`

bool false

#### Defined in

[src/stopDefault.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/stopDefault.ts#L7)

---

### textareaInsertText

▸ **textareaInsertText**(`obj`, `str`): `void`

textarea 或 input 对象在指定的光标位置插入文字

#### Parameters

| Name  | Type                  | Description  |
| :---- | :-------------------- | :----------- |
| `obj` | `HTMLTextAreaElement` | -            |
| `str` | `string`              | 要插入的文字 |

#### Returns

`void`

#### Defined in

[src/textareaInsertText.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/textareaInsertText.ts#L7)

---

### textareaMoveToEnd

▸ **textareaMoveToEnd**(`obj`): `void`

textarea 或 input 对象将光标定位到文字尾部

#### Parameters

| Name  | Type                  | Description |
| :---- | :-------------------- | :---------- |
| `obj` | `HTMLTextAreaElement` | dom 对象    |

#### Returns

`void`

#### Defined in

[src/textareaMoveToEnd.ts:6](https://github.com/saqqdy/js-cool/blob/d76432c/src/textareaMoveToEnd.ts#L6)

---

### throttle

▸ **throttle**(`fn`, `delay`, `immediate`, `debounce`): () => `void`

频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次

#### Parameters

| Name        | Type                                       | Description                                                           |
| :---------- | :----------------------------------------- | :-------------------------------------------------------------------- |
| `fn`        | [`AnyFunction`](interfaces/AnyFunction.md) | 需要调用的函数                                                        |
| `delay`     | `number`                                   | 延迟时间，单位毫秒                                                    |
| `immediate` | `boolean`                                  | 给 immediate 参数传递 false 绑定的函数先执行，而不是 delay 后后执行。 |
| `debounce`  | `boolean`                                  | -                                                                     |

#### Returns

`fn`

实际调用函数

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/throttle.ts:11](https://github.com/saqqdy/js-cool/blob/d76432c/src/throttle.ts#L11)

---

### trim

▸ **trim**(`string`, `type?`): `string` \| `void`

trim()根据传参来去除空格

#### Parameters

| Name     | Type     | Default value | Description                                                                              |
| :------- | :------- | :------------ | :--------------------------------------------------------------------------------------- |
| `string` | `string` | `undefined`   | 传入字符串                                                                               |
| `type`   | `string` | `''`          | 可选，去除空格的类型 l:去除开头空格 r:去除尾部空格 lr:去除两端空格，为空的话去除所有空格 |

#### Returns

`string` \| `void`

返回新字符串

#### Defined in

[src/trim.ts:8](https://github.com/saqqdy/js-cool/blob/d76432c/src/trim.ts#L8)

---

### union

▸ **union**<`T`\>(...`args`): `T`[]

求多个数组的并集

**`example`**

```js
union([1, 2], [2, '33']) // [1, 2, '33']
```

#### Type parameters

| Name | Type      |
| :--- | :-------- |
| `T`  | `unknown` |

#### Parameters

| Name      | Type    | Description |
| :-------- | :------ | :---------- |
| `...args` | `T`[][] | 参数        |

#### Returns

`T`[]

array

#### Defined in

[src/union.ts:14](https://github.com/saqqdy/js-cool/blob/d76432c/src/union.ts#L14)

---

### unique

▸ **unique**<`T`\>(`arr`): `T`[]

数组去重

**`example`**

```js
unique([1, 2, 2, '33']) // [1, 2, '33']
```

#### Type parameters

| Name | Type      |
| :--- | :-------- |
| `T`  | `unknown` |

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `arr` | `T`[] |

#### Returns

`T`[]

array

#### Defined in

[src/unique.ts:11](https://github.com/saqqdy/js-cool/blob/d76432c/src/unique.ts#L11)

---

### upperFirst

▸ **upperFirst**(`string`): `string`

首字母大写

#### Parameters

| Name     | Type     | Description      |
| :------- | :------- | :--------------- |
| `string` | `string` | 需要转换的字符串 |

#### Returns

`string`

返回转换后的字符串

#### Defined in

[src/upperFirst.ts:7](https://github.com/saqqdy/js-cool/blob/d76432c/src/upperFirst.ts#L7)

---

### uuid

▸ `Const` **uuid**(): `string`

浏览器端生成 uuid，采用 v4 方法

**`example`**

```js
uuid() // '4222fcfe-5721-4632-bede-6043885be57d'
```

#### Returns

`string`

uuid

#### Defined in

[src/uuid.ts:11](https://github.com/saqqdy/js-cool/blob/d76432c/src/uuid.ts#L11)
