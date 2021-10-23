export type { AnyObject, AnyFunction, ArrayOneMore } from '../typings/common'
// export type { CustomObject, CustomEvent } from "./addEvent";
export type { WindowSizeObj } from './getWindowSize'
export type { SearchkeySet } from './searchTreeObject'
export type { DirParamType } from './getDirParam'

// 全局参数
export * from './client' // client方法返回一个浏览器判断结果对象
export * from './pattern' // pattern返回一些常用的正则

// String扩展、数组方法
export * from './trim' // 根据传参来去除空格
export * from './clearAttr' // 去除HTML标签所有属性
export * from './clearBr' // 去除换行
export * from './clearHtml' // 去除HTML标签
export * from './clearHtmlExpSN' // 去除HTML标签保留空格、换行
export * from './clearHtmlN' // 去除HTML标签及换行
export * from './clearHtmlNS' // 去除HTML标签及空格、换行
export * from './clearHtmlTag' // 去除HTML标签及标签里面的文字
export * from './getNumber' // 获取字符串中的数字
export * from './imgAdapt' // 扩展图片自动适应多种分辨率small original
export * from './imgChoose' // 扩展图片自动适应多种分辨率@2x @3x
export * from './camel2Dash' // 将驼峰字符串转成-间隔且全小写的Dash模式
export * from './dash2Camel' // 将-间隔且全小写的Dash模式转成驼峰字符串
export * from './upperFirst' // 首字母大写
export * from './getRandomNum' // 获取随机整数
export * from './getRandomStr' // 获取随机字符串
export * from './getRandomStrWidthSpecialChar' // 获取随机字符串带特殊符号
export * from './getCHSLength' // 获取字符串长度，中文算2个字符
export * from './cutCHSString' // 截取字符串，中文算2个字节
export * from './textareaInsertText' // textarea或input对象在指定的光标位置插入文字
export * from './textareaMoveToEnd' // textarea或input对象将光标定位到文字尾部

// 获取一下状态
export * from './isDigitals' // 是否为由数字组成的字符串
export * from './isExitsFunction' // 是否存在指定函数
export * from './isExitsVariable' // 是否存在指定变量
export * from './getWindowSize' // getWindowSize获取窗口大小
export * from './getAppVersion' // 获取APP版本号
export * from './getOsVersion' // 获取手机系统版本
export * from './getIsAppVersionLastest' // 版本号大小对比
export * from './getDirParam' // 获取目录形式URL参数
export * from './getParameter' // 获取单个URL参数
export * from './getFileType' // 文件后缀名
export * from './getUrlParam' // 获取URL参数

// 日期格式化
export * from './formatTime' // 日期格式化插件
export * from './formatTimeStr' // 格式化时间成：刚刚、几分钟前

// 缓存、cookie、session
export * from './setCookie' // setCookie写入cookie的方法
export * from './setCache' // 写localStorage
export * from './setSession' // 写sessionStorage
export * from './getCookie' // 读取cookies
export * from './getCache' // 读取localStorage
export * from './getSession' // 读取sessionStorage
export * from './delCookie' // 删除cookie
export * from './delCache' // 删除localStorage
export * from './delSession' // 删除sessionStorage

// 编码与解码
export * from './encodeBase64' // 字符串、数字转base64
export * from './encodeUtf8' // 编码Utf8
export * from './decodeBase64' // base64解码
export * from './decodeUtf8' // 解码Utf8
export * from './enWxJumpLink' // 用*替换= 用!替换& 转码成微信跳转链接
export * from './enWxJumpLinkOld' // 用~替换= 用^替换& 转码成微信跳转链接
export * from './deWxJumpLink' // 用=替换* 用&替换! 解码成微信跳转链接
export * from './deWxJumpLinkOld' // 用=替换~ 用&替换^ 解码成微信跳转链接

// 防抖与限流
export * from './debounce' // 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，fn 才会执行
export * from './throttle' // 频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次

// 事件委托、其他事件方法
export * from './stopBubble' // 阻止冒泡
export * from './stopDefault' // 阻止默认事件
export * from './addEvent' // 事件委托，支持多次委托
export * from './removeEvent' // removeEvent移除由addEvent创建的事件委托
export * from './getScrollPosition' // 获取滑动到顶部和底部 返回'top' 'bottom'，建议使用限流

// 工具类
export * from './nextIndex' // 返回下一个zIndex值
export * from './fixNumber' // 截取小数点后几位，不足的不补0
export * from './extend' // 深拷贝
export * from './delay' // 防抖节流
export * from './getType' // 获取目标类型
export * from './isArray' // 判断是否数组
export * from './cleanData' // 清洗数据
export * from './download' // 文件下载
export * from './searchTreeObject' // 对象查找
export * from './openUrl' // 新标签页打开链接（浏览器不能解析的文件跳转下载）
export * from './splitThousand' // 千分位分割方法
export * from './all' // 如果所提供的谓词函数对一个集合中的所有元素都返回true，则返回true，否则返回false。
export * from './any' // 如果所提供的谓词函数对一个集合中的至少一个元素返回true，则返回true，否则返回false。
export * from './uuid' // 浏览器端生成uuid，采用v4方法
export * from './arrayToCSV' // 将一个二维数组转换为一个逗号分隔的值（CSV）字符串。
export * from './CSVToArray' // 将一个逗号分隔的值（CSV）字符串转换为一个2D数组。
export * from './CSVToJSON' // 将一个逗号分隔的值(CSV)字符串转换为一个2D对象数组。字符串的第一行作为标题行。
export * from './JSONToCSV' // 将一个对象数组转换为只包含指定列的逗号分隔值（CSV）字符串。
export * from './RGBToHex' // 将RGB组件的值转换为颜色代码。
export * from './intersect' // 多个数组求交集
export * from './union' // 多个数组求交集
export * from './minus' // 多个数组求差集
export * from './complement' // 多个数组求补集
export * from './contains' // 数组是否包含指定元素
export * from './unique' // 数组去重
export * from './fillIPv6' // ipv6地址补全
export * from './getProperty' // 根据路径字符串获取数组、对象属性值
