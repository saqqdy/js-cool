import loadSource from 'load-source' // 动态加载资源，支持js、图片、css链接、css样式字符串
import mountCss from 'mount-css' // 动态加载css链接资源
import mountImg from 'mount-image' // 动态加载图片资源
import mountJs from 'mount-script' // 动态加载js链接资源
import mountStyle from 'mount-style' // 动态加载css样式
import { download } from 'use-downloads' // 文件下载

// 全局参数
import client from './client' // client方法返回一个浏览器判断结果对象
import pattern from './pattern' // pattern返回一些常用的正则

// String扩展、数组方法
import trim from './trim' // 根据传参来去除空格
import clearAttr from './clearAttr' // 去除HTML标签所有属性
import clearHtml from './clearHtml' // 去除HTML标签
import getNumber from './getNumber' // 获取字符串中的数字
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
import windowSize from './windowSize' // windowSize获取窗口大小
import getAppVersion from './getAppVersion' // 获取APP版本号
import getOsVersion from './getOsVersion' // 获取手机系统版本
import getIsAppVersionLastest from './getIsAppVersionLastest' // 版本号大小对比
import getDirParam from './getDirParam' // 获取目录形式URL参数
import getParameter from './getParameter' // 获取单个URL参数
import getUrlParam from './getUrlParam' // 获取URL参数

// 缓存、cookie、session
import getCache from './getCache' // 读取localStorage
import setCache from './setCache' // 写入localStorage
import delCache from './delCache' // 删除localStorage
import getSession from './getSession' // 读取sessionStorage
import setSession from './setSession' // 写入sessionStorage
import delSession from './delSession' // 删除sessionStorage
import getCookie from './getCookie' // 读取cookie
import setCookie from './setCookie' // 写入cookie
import delCookie from './delCookie' // 删除cookie

// 编码与解码
import encodeBase64 from './encodeBase64' // 字符串、数字转base64
import encodeUtf8 from './encodeUtf8' // 编码Utf8
import decodeBase64 from './decodeBase64' // base64解码
import decodeUtf8 from './decodeUtf8' // 解码Utf8

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
import isPlainObject from './isPlainObject' // 判断是否PlainObject
import cleanData from './cleanData' // 清洗数据
import searchTreeObject from './searchTreeObject' // 对象查找
import openUrl from './openUrl' // 新标签页打开链接（浏览器不能解析的文件跳转下载）
import toThousands from './toThousands' // 千分位分割方法
import all from './all' // 如果所提供的谓词函数对一个集合中的所有元素都返回true，则返回true，否则返回false。
import any from './any' // 如果所提供的谓词函数对一个集合中的至少一个元素返回true，则返回true，否则返回false。
import uuid from './uuid' // 浏览器端生成uuid，采用v4方法
import CSVToArray from './CSVToArray' // csv与json、array相互转换
import arrayToCSV from './arrayToCSV' // csv与json、array相互转换
import CSVToJSON from './CSVToJSON' // csv与json、array相互转换
import JSONToCSV from './JSONToCSV' // csv与json、array相互转换
import RGBToHex from './RGBToHex' // 将RGB组件的值转换为颜色代码。
import intersect from './intersect' // 多个数组求交集
import union from './union' // 多个数组求交集
import minus from './minus' // 多个数组求差集
import complement from './complement' // 多个数组求补集
import contains from './contains' // 数组是否包含指定元素
import unique from './unique' // 数组去重
import fillIPv6 from './fillIPv6' // ipv6地址补全
import getProperty from './getProperty' // 根据路径字符串获取数组、对象属性值
import setProperty from './setProperty' // 根据路径字符串设置数组、对象属性值

export default {
	version: '__VERSION__',
	loadSource,
	mountCss,
	mountImg,
	mountJs,
	mountStyle,
	download,
	RGBToHex,
	addEvent,
	all,
	any,
	getCache,
	setCache,
	delCache,
	getSession,
	setSession,
	delSession,
	getCookie, // 读取cookie
	setCookie, // 写入cookie
	delCookie, // 删除cookie
	camel2Dash,
	cleanData,
	clearAttr,
	clearHtml,
	client,
	complement,
	contains,
	CSVToArray,
	arrayToCSV,
	CSVToJSON,
	JSONToCSV,
	cutCHSString,
	dash2Camel,
	decodeBase64,
	decodeUtf8,
	delay,
	encodeBase64,
	encodeUtf8,
	extend,
	fillIPv6,
	fixNumber,
	getAppVersion,
	getCHSLength,
	getDirParam,
	getIsAppVersionLastest,
	getNumber,
	getOsVersion,
	getParameter,
	getProperty,
	getRandomNum,
	getRandomStr,
	getRandomStrWidthSpecialChar,
	getScrollPosition,
	getType,
	getUrlParam,
	intersect,
	isArray,
	isDigitals,
	isExitsFunction,
	isExitsVariable,
	isPlainObject,
	minus,
	nextIndex,
	openUrl,
	pattern,
	removeEvent,
	searchTreeObject,
	setProperty,
	stopBubble,
	stopDefault,
	textareaInsertText,
	textareaMoveToEnd,
	toThousands,
	trim,
	union,
	unique,
	upperFirst,
	uuid,
	windowSize
}
