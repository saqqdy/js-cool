# API 参考

欢迎查阅 js-cool API 参考文档。

## 分类

### [字符串](/zh/api/string/camel2-dash)

字符串处理工具函数 - 14 个

### [数组](/zh/api/array/unique)

数组处理工具函数 - 18 个

### [对象](/zh/api/object/clone)

对象处理工具函数 - 13 个

### [类型判断](/zh/api/object/get-type)

类型判断工具函数 - 14 个

### [验证函数](/zh/api/validate/is-email)

验证工具函数 - 5 个

### [URL与浏览器](/zh/api/url/ua)

URL 解析和浏览器检测 - 10 个

### [DOM](/zh/api/dom/add-event)

DOM 操作工具函数 - 13 个

### [存储](/zh/api/storage/)

浏览器存储工具函数 - 使用对象 API

### [转换](/zh/api/convert/csv-to-json)

格式转换工具函数 - 3 个

### [数字](/zh/api/number/clamp)

数字处理工具函数 - 5 个

### [日期](/zh/api/date/format-date)

日期处理工具函数 - 20+ 个

### [颜色](/zh/api/color/hex-to-rgb)

颜色处理工具函数 - 5 个

### [工具](/zh/api/utility/delay)

通用工具函数 - 16 个

### [滚动](/zh/api/storage/)

滚动工具函数 - 使用对象 API

### [异步流程](/zh/api/async/debounce)

异步流程控制 - 3 个

### [编码解码](/zh/api/string/encode-utf8)

编码解码工具函数 - 4 个

### [网络](/zh/api/network/fill-ipv6)

网络工具函数 - 1 个

## 函数索引

### 字符串

| 函数                                          | 描述           |
| --------------------------------------------- | -------------- |
| [camel2Dash](/zh/api/string/camel2-dash)      | 驼峰转短横线   |
| [dash2Camel](/zh/api/string/dash2-camel)      | 短横线转驼峰   |
| [upperFirst](/zh/api/string/upper-first)      | 首字母大写     |
| [kebabCase](/zh/api/string/kebab-case)        | 转短横线命名   |
| [snakeCase](/zh/api/string/snake-case)        | 转下划线命名   |
| [truncate](/zh/api/string/truncate)           | 截断字符串     |
| [clearHtml](/zh/api/string/clear-html)        | 清除HTML标签   |
| [clearAttr](/zh/api/string/clear-attr)        | 清除HTML属性   |
| [cutCHSString](/zh/api/string/cut-chs-string) | 截取中文字符串 |
| [getCHSLength](/zh/api/string/get-chs-length) | 获取中文长度   |
| [mapTemplate](/zh/api/string/map-template)    | 模板字符串替换 |
| [escape](/zh/api/string/escape)               | HTML转义       |
| [unescape](/zh/api/string/unescape)           | HTML反转义     |

### 数组

| 函数                                        | 描述       |
| ------------------------------------------- | ---------- |
| [unique](/zh/api/array/unique)              | 数组去重   |
| [shuffle](/zh/api/array/shuffle)            | 随机打乱   |
| [sorter](/zh/api/array/sorter)              | 按键排序   |
| [sortPinyin](/zh/api/array/sort-pinyin)     | 拼音排序   |
| [chunk](/zh/api/array/chunk)                | 分块       |
| [flatten](/zh/api/array/flatten)            | 扁平化     |
| [groupBy](/zh/api/array/group-by)           | 分组       |
| [keyBy](/zh/api/array/key-by)               | 键值映射   |
| [sample](/zh/api/array/sample)              | 随机取一个 |
| [sampleSize](/zh/api/array/sample-size)     | 随机取N个  |
| [intersect](/zh/api/array/intersect)        | 交集       |
| [union](/zh/api/array/union)                | 并集       |
| [minus](/zh/api/array/minus)                | 差集       |
| [complement](/zh/api/array/complement)      | 补集       |
| [contains](/zh/api/array/contains)          | 包含检测   |
| [all](/zh/api/array/all)                    | 全部满足   |
| [any](/zh/api/array/any)                    | 任意满足   |
| [searchObject](/zh/api/array/search-object) | 树形查找   |

### 对象

| 函数                                           | 描述           |
| ---------------------------------------------- | -------------- |
| [clone](/zh/api/object/clone)                  | 深拷贝         |
| [extend](/zh/api/object/extend)                | 扩展合并       |
| [getProperty](/zh/api/object/get-property)     | 获取属性       |
| [setProperty](/zh/api/object/set-property)     | 设置属性       |
| [omit](/zh/api/object/omit)                    | 排除属性       |
| [pick](/zh/api/object/pick)                    | 选取属性       |
| [cleanData](/zh/api/object/clean-data)         | 数据清洗       |
| [safeParse](/zh/api/object/safe-parse)         | 安全JSON解析   |
| [safeStringify](/zh/api/object/safe-stringify) | 安全JSON序列化 |
| [arrayToCSV](/zh/api/array/array-to-csv)       | 数组转CSV      |
| [CSVToArray](/zh/api/array/csv-to-array)       | CSV转数组      |

### 类型判断

| 函数                                            | 描述               |
| ----------------------------------------------- | ------------------ |
| [getType](/zh/api/object/get-type)              | 获取类型           |
| [isArray](/zh/api/object/is-array)              | 是否数组           |
| [isObject](/zh/api/object/is-object)            | 是否对象           |
| [isPlainObject](/zh/api/object/is-plain-object) | 是否纯对象         |
| [isDate](/zh/api/object/is-date)                | 是否日期           |
| [isRegExp](/zh/api/object/is-reg-exp)           | 是否正则           |
| [isWindow](/zh/api/object/is-window)            | 是否window         |
| [isIterable](/zh/api/object/is-iterable)        | 是否可迭代         |
| [isEqual](/zh/api/object/is-equal)              | 是否相等           |
| [isEmpty](/zh/api/object/is-empty)              | 是否为空           |
| [isNil](/zh/api/object/is-nil)                  | 是否null/undefined |

### 验证函数

| 函数                                            | 描述       |
| ----------------------------------------------- | ---------- |
| [isEmail](/zh/api/validate/is-email)            | 邮箱验证   |
| [isPhone](/zh/api/validate/is-phone)            | 手机号验证 |
| [isURL](/zh/api/validate/is-url)                | URL验证    |
| [isIDCard](/zh/api/validate/is-id-card)         | 身份证验证 |
| [isCreditCard](/zh/api/validate/is-credit-card) | 信用卡验证 |

### URL与浏览器

| 函数                                          | 描述            |
| --------------------------------------------- | --------------- |
| [Url](/zh/api/url/Url-class)                  | URL解析类       |
| [url](/zh/api/url/url)                        | URL工具         |
| [getDirParams](/zh/api/url/get-dir-params)    | 获取目录参数    |
| [ua](/zh/api/url/ua)                          | User-Agent 检测 |
| [appVersion](/zh/api/url/app-version)         | APP版本         |
| [browserVersion](/zh/api/url/browser-version) | 浏览器版本      |
| [osVersion](/zh/api/url/os-version)           | 系统版本        |
| [compareVersion](/zh/api/url/compare-version) | 版本比较        |
| [nextVersion](/zh/api/url/next-version)       | 下一版本号      |

### DOM

| 函数                                    | 描述         |
| --------------------------------------- | ------------ |
| [addEvent](/zh/api/dom/add-event)       | 添加事件     |
| [removeEvent](/zh/api/dom/remove-event) | 移除事件     |
| [stopBubble](/zh/api/dom/stop-bubble)   | 阻止冒泡     |
| [stopDefault](/zh/api/dom/stop-default) | 阻止默认行为 |
| [copy](/zh/api/dom/copy)                | 复制到剪贴板 |
| [windowSize](/zh/api/dom/window-size)   | 窗口尺寸     |
| [download](/zh/api/dom/download)        | 下载文件     |
| [openUrl](/zh/api/dom/open-url)         | 打开URL      |
| [preloader](/zh/api/dom/preloader)      | 预加载器     |
| [inBrowser](/zh/api/dom/in-browser)     | 是否浏览器   |
| [inNodeJs](/zh/api/dom/in-node-js)      | 是否Node.js  |
| [isDarkMode](/zh/api/dom/is-dark-mode)  | 是否深色模式 |

### 存储

使用对象 API：`local`、`session`、`cookie`

```js
import { local, session, cookie } from 'js-cool'

local.set('key', 'value')
local.get('key')
session.set('key', 'value')
cookie.set('key', 'value')
```

### 转换

| 函数                                | 描述     |
| ----------------------------------- | -------- |
| [CSVToJSON](/zh/api/convert/csv-to-json) | CSV转JSON |
| [JSONToCSV](/zh/api/convert/json-to-csv) | JSON转CSV |
| [RGBToHex](/zh/api/convert/rgb-to-hex)   | RGB转Hex  |

### 数字

| 函数                               | 描述     |
| ---------------------------------- | -------- |
| [clamp](/zh/api/number/clamp)      | 限制范围 |
| [round](/zh/api/number/round)      | 四舍五入 |
| [sum](/zh/api/number/sum)          | 求和     |
| [average](/zh/api/number/average)  | 平均值   |
| [inRange](/zh/api/number/in-range) | 范围判断 |

### 日期

| 函数                                             | 描述           |
| ------------------------------------------------ | -------------- |
| [formatDate](/zh/api/date/format-date)           | 格式化日期     |
| [dateDiff](/zh/api/date/date-diff)               | 日期差值       |
| [relativeTime](/zh/api/date/relative-time)       | 相对时间       |
| [isToday](/zh/api/date/is-today)                 | 是否今天       |
| [isYesterday](/zh/api/date/is-yesterday)         | 是否昨天       |
| [isTomorrow](/zh/api/date/is-tomorrow)           | 是否明天       |
| [isWeekend](/zh/api/date/is-weekend)             | 是否周末       |
| [isLeapYear](/zh/api/date/is-leap-year)          | 是否闰年       |
| [isBefore](/zh/api/date/is-before)               | 是否在之前     |
| [isAfter](/zh/api/date/is-after)                 | 是否在之后     |
| [isSame](/zh/api/date/is-same)                   | 是否相同       |
| [isBetween](/zh/api/date/is-between)             | 是否在范围内   |
| [getDaysInMonth](/zh/api/date/get-days-in-month) | 获取月份天数   |
| [getQuarter](/zh/api/date/get-quarter)           | 获取季度       |
| [getWeekOfYear](/zh/api/date/get-week-of-year)   | 获取年中周数   |
| [getDayOfYear](/zh/api/date/get-day-of-year)     | 获取年中天数   |
| [addDate](/zh/api/date/add-date)                 | 添加时间       |
| [subtractDate](/zh/api/date/subtract-date)       | 减去时间       |
| [startOf](/zh/api/date/start-of)                 | 时间段开始     |
| [endOf](/zh/api/date/end-of)                     | 时间段结束     |
| [compareDate](/zh/api/date/compare-date)         | 比较日期       |
| [minDate](/zh/api/date/min-date)                 | 最小日期       |
| [maxDate](/zh/api/date/max-date)                 | 最大日期       |

### 颜色

| 函数                                     | 描述       |
| ---------------------------------------- | ---------- |
| [hexToRGB](/zh/api/color/hex-to-rgb)     | Hex转RGB   |
| [rgbToHSL](/zh/api/color/rgb-to-hsl)     | RGB转HSL   |
| [lighten](/zh/api/color/lighten)         | 颜色变亮   |
| [darken](/zh/api/color/darken)           | 颜色变暗   |
| [isLightColor](/zh/api/color/is-light-color) | 是否浅色 |

### 工具

| 函数                                              | 描述         |
| ------------------------------------------------- | ------------ |
| [delay](/zh/api/utility/delay)                    | 延迟执行     |
| [uuid](/zh/api/utility/uuid)                      | 生成UUID     |
| [randomString](/zh/api/utility/random-string)     | 随机字符串   |
| [randomNumber](/zh/api/utility/random-number)     | 随机数       |
| [getGlobal](/zh/api/utility/get-global)           | 获取全局变量 |
| [getNumber](/zh/api/utility/get-number)           | 获取数字     |
| [fixNumber](/zh/api/utility/fix-number)           | 修正数字     |
| [nextIndex](/zh/api/utility/next-index)           | 下一个索引   |
| [toThousands](/zh/api/utility/to-thousands)       | 千分位       |
| [fingerprint](/zh/api/utility/fingerprint)        | 浏览器指纹   |
| [getFileType](/zh/api/utility/get-file-type)      | 获取文件类型 |
| [randomColor](/zh/api/utility/random-color)       | 随机颜色     |
| [promiseFactory](/zh/api/utility/promise-factory) | Promise工厂  |
| [punctualTimer](/zh/api/utility/punctual-timer)   | 精确定时器   |
| [waiting](/zh/api/utility/waiting)                | 等待工具     |
| [patterns](/zh/api/utility/patterns)              | 正则模式     |

### 滚动

使用 scroll 对象 API：

```js
import { scroll, scrollTo, scrollToTop, scrollToBottom, lockScroll, unlockScroll } from 'js-cool'

scrollTo(element)
scrollToTop()
lockScroll()
```

### 异步流程

| 函数                               | 描述     |
| ---------------------------------- | -------- |
| [debounce](/zh/api/async/debounce) | 防抖函数 |
| [throttle](/zh/api/async/throttle) | 节流函数 |
| [retry](/zh/api/async/retry)       | 重试函数 |
