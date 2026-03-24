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

### [URL与浏览器](/zh/api/url/get-url-params)

URL 解析和浏览器检测 - 15 个

### [DOM](/zh/api/dom/add-event)

DOM 操作工具函数 - 13 个

### [存储](/zh/api/storage/set-cache)

浏览器存储工具函数 - 10 个

### [转换](/zh/api/convert/array-buffer-to-base64)

格式转换工具函数 - 12 个

### [数字](/zh/api/number/clamp)

数字处理工具函数 - 7 个

### [日期](/zh/api/date/format-date)

日期处理工具函数 - 5 个

### [颜色](/zh/api/color/hex-to-rgb)

颜色处理工具函数 - 5 个

### [工具](/zh/api/utility/delay)

通用工具函数 - 14 个

### [滚动](/zh/api/scroll)

滚动工具函数 - 9 个

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

| 函数                                           | 描述            |
| ---------------------------------------------- | --------------- |
| [getUrlParams](/zh/api/url/get-url-params)     | 获取所有URL参数 |
| [getUrlParam](/zh/api/url/get-url-param)       | 获取单个URL参数 |
| [parseUrlParam](/zh/api/url/parse-url-param)   | 解析URL参数     |
| [spliceUrlParam](/zh/api/url/splice-url-param) | 拼接URL参数     |
| [getDirParams](/zh/api/url/get-dir-params)     | 获取目录参数    |
| [ua](/zh/api/url/ua)                           | User-Agent 检测 |
| [appVersion](/zh/api/url/app-version)          | APP版本         |
| [browserVersion](/zh/api/url/browser-version)  | 浏览器版本      |
| [compareVersion](/zh/api/url/compare-version)  | 版本比较        |
| [nextVersion](/zh/api/url/next-version)        | 下一版本号      |

### DOM

| 函数                                    | 描述         |
| --------------------------------------- | ------------ |
| [addEvent](/zh/api/dom/add-event)       | 添加事件     |
| [removeEvent](/zh/api/dom/remove-event) | 移除事件     |
| [stopBubble](/zh/api/dom/stop-bubble)   | 阻止冒泡     |
| [stopDefault](/zh/api/dom/stop-default) | 阻止默认行为 |
| [copy](/zh/api/dom/copy)                | 复制到剪贴板 |
| [windowSize](/zh/api/dom/window-size)   | 窗口尺寸     |

### 存储

| 函数                                      | 描述        |
| ----------------------------------------- | ----------- |
| [setCache](/zh/api/storage/set-cache)     | 设置缓存    |
| [getCache](/zh/api/storage/get-cache)     | 获取缓存    |
| [setSession](/zh/api/storage/set-session) | 设置Session |
| [getSession](/zh/api/storage/get-session) | 获取Session |
| [setCookie](/zh/api/storage/set-cookie)   | 设置Cookie  |
| [getCookie](/zh/api/storage/get-cookie)   | 获取Cookie  |

### 数字

| 函数                               | 描述     |
| ---------------------------------- | -------- |
| [clamp](/zh/api/number/clamp)      | 限制范围 |
| [round](/zh/api/number/round)      | 四舍五入 |
| [sum](/zh/api/number/sum)          | 求和     |
| [average](/zh/api/number/average)  | 平均值   |
| [inRange](/zh/api/number/in-range) | 范围判断 |

### 日期

| 函数                                       | 描述       |
| ------------------------------------------ | ---------- |
| [formatDate](/zh/api/date/format-date)     | 格式化日期 |
| [dateDiff](/zh/api/date/date-diff)         | 日期差值   |
| [relativeTime](/zh/api/date/relative-time) | 相对时间   |
| [isToday](/zh/api/date/is-today)           | 是否今天   |

### 颜色

| 函数                                 | 描述     |
| ------------------------------------ | -------- |
| [hexToRGB](/zh/api/color/hex-to-rgb) | Hex转RGB |
| [rgbToHSL](/zh/api/color/rgb-to-hsl) | RGB转HSL |
| [lighten](/zh/api/color/lighten)     | 颜色变亮 |
| [darken](/zh/api/color/darken)       | 颜色变暗 |

### 工具

| 函数                                          | 描述         |
| --------------------------------------------- | ------------ |
| [delay](/zh/api/utility/delay)                | 延迟执行     |
| [uuid](/zh/api/utility/uuid)                  | 生成UUID     |
| [randomString](/zh/api/utility/random-string) | 随机字符串   |
| [randomNumber](/zh/api/utility/random-number) | 随机数       |
| [getGlobal](/zh/api/utility/get-global)       | 获取全局变量 |

### 滚动

| 函数                                | 描述           |
| ----------------------------------- | -------------- |
| [scroll](/zh/api/scroll)            | 滚动工具集合   |
| [getPosition](/zh/api/scroll)       | 获取滚动位置   |
| [getProgress](/zh/api/scroll)       | 获取滚动进度   |
| [scrollTo](/zh/api/scroll)          | 滚动到元素     |
| [scrollToTop](/zh/api/scroll)       | 滚动到顶部     |
| [scrollToBottom](/zh/api/scroll)    | 滚动到底部     |
| [scrollBy](/zh/api/scroll)          | 按量滚动       |
| [lockScroll](/zh/api/scroll)        | 锁定滚动       |
| [unlockScroll](/zh/api/scroll)      | 解锁滚动       |
| [isInViewport](/zh/api/scroll)      | 检测是否在视口 |

### 异步流程

| 函数                               | 描述     |
| ---------------------------------- | -------- |
| [debounce](/zh/api/async/debounce) | 防抖函数 |
| [throttle](/zh/api/async/throttle) | 节流函数 |
| [retry](/zh/api/async/retry)       | 重试函数 |
