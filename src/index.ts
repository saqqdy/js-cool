export type { AnyObject, AnyFunction, ArrayOneMore } from '../typings/common'
// export type { CustomObject, CustomEvent } from "./addEvent";
export type { WindowSizeObj } from './getWindowSize'
export type { SearchkeySet } from './searchTreeObject'
export type { DirParamType } from './getDirParam'

// 全局参数
import client from './client' // client方法返回一个浏览器判断结果对象
import pattern from './pattern' // pattern返回一些常用的正则

// String扩展、数组方法
import trim from './trim' // 根据传参来去除空格
import clearAttr from './clearAttr' // 去除HTML标签所有属性
import clearBr from './clearBr' // 去除换行
import clearHtml from './clearHtml' // 去除HTML标签
import clearHtmlExpSN from './clearHtmlExpSN' // 去除HTML标签保留空格、换行
import clearHtmlN from './clearHtmlN' // 去除HTML标签及换行
import clearHtmlNS from './clearHtmlNS' // 去除HTML标签及空格、换行
import clearHtmlTag from './clearHtmlTag' // 去除HTML标签及标签里面的文字
import getNumber from './getNumber' // 获取字符串中的数字
import imgAdapt from './imgAdapt' // 扩展图片自动适应多种分辨率small original
import imgChoose from './imgChoose' // 扩展图片自动适应多种分辨率@2x @3x
import camel2Dash from './camel2Dash' // 将驼峰字符串转成-间隔且全小写的Dash模式
import dash2Camel from './dash2Camel' // 将-间隔且全小写的Dash模式转成驼峰字符串
import upperFirst from './upperFirst' // 首字母大写
import getRandomNum from './getRandomNum' // 获取随机整数
import getRandomStr from './getRandomStr' // 获取随机字符串
import getRandomStrWidthSpecialChar from './getRandomStrWidthSpecialChar' // 获取随机字符串带特殊符号
import getCHSLength from './getCHSLength' // 获取字符串长度，中文算2个字符
import cutCHSString from './cutCHSString' // 截取字符串，中文算2个字节
import textareaInsertText from './textareaInsertText' // textarea或input对象在指定的光标位置插入文字
import textareaMoveToEnd from './textareaMoveToEnd' // textarea或input对象将光标定位到文字尾部

// 获取一下状态
import isDigitals from './isDigitals' // 是否为由数字组成的字符串
import isExitsFunction from './isExitsFunction' // 是否存在指定函数
import isExitsVariable from './isExitsVariable' // 是否存在指定变量
import getWindowSize from './getWindowSize' // getWindowSize获取窗口大小
import getAppVersion from './getAppVersion' // 获取APP版本号
import getOsVersion from './getOsVersion' // 获取手机系统版本
import getIsAppVersionLastest from './getIsAppVersionLastest' // 版本号大小对比
import getDirParam from './getDirParam' // 获取目录形式URL参数
import getParameter from './getParameter' // 获取单个URL参数
import getFileType from './getFileType' // 文件后缀名
import getUrlParam from './getUrlParam' // 获取URL参数

// 日期格式化
import formatTime from './formatTime' // 日期格式化插件
import formatTimeStr from './formatTimeStr' // 格式化时间成：刚刚、几分钟前

// 缓存、cookie、session
import setCookie from './setCookie' // setCookie写入cookie的方法
import setCache from './setCache' // 写localStorage
import setSession from './setSession' // 写sessionStorage
import getCookie from './getCookie' // 读取cookies
import getCache from './getCache' // 读取localStorage
import getSession from './getSession' // 读取sessionStorage
import delCookie from './delCookie' // 删除cookie
import delCache from './delCache' // 删除localStorage
import delSession from './delSession' // 删除sessionStorage

// 编码与解码
import encodeBase64 from './encodeBase64' // 字符串、数字转base64
import encodeUtf8 from './encodeUtf8' // 编码Utf8
import decodeBase64 from './decodeBase64' // base64解码
import decodeUtf8 from './decodeUtf8' // 解码Utf8
import enWxJumpLink from './enWxJumpLink' // 用*替换= 用!替换& 转码成微信跳转链接
import enWxJumpLinkOld from './enWxJumpLinkOld' // 用~替换= 用^替换& 转码成微信跳转链接
import deWxJumpLink from './deWxJumpLink' // 用=替换* 用&替换! 解码成微信跳转链接
import deWxJumpLinkOld from './deWxJumpLinkOld' // 用=替换~ 用&替换^ 解码成微信跳转链接

// 防抖与限流
import debounce from './debounce' // 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，fn 才会执行
import throttle from './throttle' // 频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次

// 事件委托、其他事件方法
import stopBubble from './stopBubble' // 阻止冒泡
import stopDefault from './stopDefault' // 阻止默认事件
import addEvent from './addEvent' // 事件委托，支持多次委托
import removeEvent from './removeEvent' // removeEvent移除由addEvent创建的事件委托
import getScrollPosition from './getScrollPosition' // 获取滑动到顶部和底部 返回'top' 'bottom'，建议使用限流

// 工具类
import nextIndex from './nextIndex' // 返回下一个zIndex值
import fixNumber from './fixNumber' // 截取小数点后几位，不足的不补0
import extend from './extend' // 深拷贝
import delay from './delay' // 防抖节流
import getType from './getType' // 获取目标类型
import isArray from './isArray' // 判断是否数组
import cleanData from './cleanData' // 清洗数据
import download from './download' // 文件下载
import searchTreeObject from './searchTreeObject' // 对象查找
import openUrl from './openUrl' // 新标签页打开链接（浏览器不能解析的文件跳转下载）
import splitThousand from './splitThousand' // 千分位分割方法
import all from './all' // 如果所提供的谓词函数对一个集合中的所有元素都返回true，则返回true，否则返回false。
import any from './any' // 如果所提供的谓词函数对一个集合中的至少一个元素返回true，则返回true，否则返回false。
import uuid from './uuid' // 浏览器端生成uuid，采用v4方法
import arrayToCSV from './arrayToCSV' // 将一个二维数组转换为一个逗号分隔的值（CSV）字符串。
import CSVToArray from './CSVToArray' // 将一个逗号分隔的值（CSV）字符串转换为一个2D数组。
import CSVToJSON from './CSVToJSON' // 将一个逗号分隔的值(CSV)字符串转换为一个2D对象数组。字符串的第一行作为标题行。
import JSONToCSV from './JSONToCSV' // 将一个对象数组转换为只包含指定列的逗号分隔值（CSV）字符串。
import RGBToHex from './RGBToHex' // 将RGB组件的值转换为颜色代码。
import { intersect, union, minus, complement } from './array' // 多个数组求交集、并集、差集、补集
import contains from './contains' // 数组是否包含指定元素
import unique from './unique' // 数组去重

export {
    //
    client,
    pattern,
    trim,
    clearAttr,
    clearBr,
    clearHtml,
    clearHtmlExpSN,
    clearHtmlN,
    clearHtmlNS,
    clearHtmlTag,
    getNumber,
    imgAdapt,
    imgChoose,
    camel2Dash,
    dash2Camel,
    upperFirst,
    getRandomNum,
    getRandomStr,
    getRandomStrWidthSpecialChar,
    getCHSLength,
    cutCHSString,
    textareaInsertText,
    textareaMoveToEnd,
    isDigitals,
    isExitsFunction,
    isExitsVariable,
    getWindowSize,
    getAppVersion,
    getOsVersion,
    getIsAppVersionLastest,
    getDirParam,
    getParameter,
    getFileType,
    getUrlParam,
    formatTime,
    formatTimeStr,
    setCookie,
    setCache,
    setSession,
    getCookie,
    getCache,
    getSession,
    delCookie,
    delCache,
    delSession,
    encodeBase64,
    encodeUtf8,
    decodeBase64,
    decodeUtf8,
    enWxJumpLink,
    enWxJumpLinkOld,
    deWxJumpLink,
    deWxJumpLinkOld,
    debounce,
    throttle,
    stopBubble,
    stopDefault,
    addEvent,
    removeEvent,
    getScrollPosition,
    nextIndex,
    fixNumber,
    delay,
    extend,
    getType,
    isArray,
    cleanData,
    download,
    searchTreeObject,
    openUrl,
    splitThousand,
    all,
    any,
    uuid,
    arrayToCSV,
    CSVToArray,
    CSVToJSON,
    JSONToCSV,
    RGBToHex,
    intersect,
    union,
    minus,
    complement,
    contains,
    unique
}
export default {
    //
    client,
    pattern,
    trim,
    clearAttr,
    clearBr,
    clearHtml,
    clearHtmlExpSN,
    clearHtmlN,
    clearHtmlNS,
    clearHtmlTag,
    getNumber,
    imgAdapt,
    imgChoose,
    camel2Dash,
    dash2Camel,
    upperFirst,
    getRandomNum,
    getRandomStr,
    getRandomStrWidthSpecialChar,
    getCHSLength,
    cutCHSString,
    textareaInsertText,
    textareaMoveToEnd,
    isDigitals,
    isExitsFunction,
    isExitsVariable,
    getWindowSize,
    getAppVersion,
    getOsVersion,
    getIsAppVersionLastest,
    getDirParam,
    getParameter,
    getFileType,
    getUrlParam,
    formatTime,
    formatTimeStr,
    setCookie,
    setCache,
    setSession,
    getCookie,
    getCache,
    getSession,
    delCookie,
    delCache,
    delSession,
    encodeBase64,
    encodeUtf8,
    decodeBase64,
    decodeUtf8,
    enWxJumpLink,
    enWxJumpLinkOld,
    deWxJumpLink,
    deWxJumpLinkOld,
    debounce,
    throttle,
    stopBubble,
    stopDefault,
    addEvent,
    removeEvent,
    getScrollPosition,
    nextIndex,
    fixNumber,
    delay,
    extend,
    getType,
    isArray,
    cleanData,
    download,
    searchTreeObject,
    openUrl,
    splitThousand,
    all,
    any,
    uuid,
    arrayToCSV,
    CSVToArray,
    CSVToJSON,
    JSONToCSV,
    RGBToHex,
    intersect,
    union,
    minus,
    complement,
    contains,
    unique
}
