/**
 * js-cool - Collection of common JavaScript / TypeScript utilities
 *
 * @module js-cool
 */

// 从虚拟模块导入版本号（构建时注入）
import { VERSION } from 'virtual:version'

// ==================== Array 数组处理 ====================
export { default as all } from './all'
export { default as any } from './any'
export { default as chunk } from './chunk'
export { default as complement } from './complement'
export { default as contains } from './contains'
export { flatten, flattenDeep } from './flatten'
export { default as groupBy } from './groupBy'
export { default as intersect } from './intersect'
export { default as keyBy } from './keyBy'
export { default as minus } from './minus'
export { default as sample } from './sample'
export { default as sampleSize } from './sampleSize'
export { default as shuffle } from './shuffle'
export { default as sorter } from './sorter'
export { default as sortPinyin } from './sortPinyin'
export { default as union } from './union'
export { default as unique } from './unique'

// ==================== Async Flow 异步流程 ====================
export { default as awaitTo } from 'await-to-done'
export { default as debounce, type DebounceOptions } from './debounce'
export { default as delay } from './delay'
export { default as promiseFactory } from './promiseFactory'
export { default as punctualTimer, type PunctualTimerReturns } from './punctualTimer'
export { default as retry, type RetryOptions, RetryTimeoutError, RetryAbortError } from './retry'
export { default as throttle, type ThrottleOptions } from './throttle'
export { default as waiting } from './waiting'

// ==================== Color 颜色处理 ====================
export { default as darken } from './darken'
export { default as hexToRGB, type RGBColor } from './hexToRGB'
export { default as isLightColor } from './isLightColor'
export { default as lighten } from './lighten'
export { default as randomColor } from './randomColor'
export { default as RGBToHex } from './RGBToHex'
export { type HSLColor, default as rgbToHSL } from './rgbToHSL'

// ==================== Convert 格式转换 ====================
export { default as arrayBufferToBase64 } from './arrayBufferToBase64'
export { default as arrayBufferToBlob } from './arrayBufferToBlob'
export { default as arrayToCSV } from './arrayToCSV'
export { default as base64ToArrayBuffer } from './base64ToArrayBuffer'
export { default as base64ToBlob } from './base64ToBlob'
export { default as base64ToFile } from './base64ToFile'
export { default as blobToArrayBuffer } from './blobToArrayBuffer'
export { default as blobToBase64 } from './blobToBase64'
export { default as blobToUrl } from './blobToUrl'
export { default as CSVToArray } from './CSVToArray'
export { default as CSVToJSON } from './CSVToJSON'
export { default as fileToBase64 } from './fileToBase64'
export { default as JSONToCSV } from './JSONToCSV'
export { default as svgToBlob } from './svgToBlob'
export { default as urlToBlob } from './urlToBlob'

// ==================== Date 日期处理 ====================
// New date module with namespace API
export {
	default as date,
	DateParser,
	// Types
	type DateAPI,
	type IDateParser,
	type DateInput,
	type DateUnit,
	type DateComparisonUnit,
	type RelativeTimeLocale,
	// Functions
	formatDate,
	relativeTime,
	dateDiff,
	type DateDiffResult,
	isToday,
	isYesterday,
	isTomorrow,
	isWeekend,
	isLeapYear,
	isBefore,
	isAfter,
	isSame,
	isBetween,
	compare as compareDate,
	min as minDate,
	max as maxDate,
	getDaysInMonth,
	getQuarter,
	getDayOfYear,
	getWeekOfYear,
	add as addDate,
	subtract as subtractDate,
	startOf,
	endOf,
} from './date/index'

// ==================== DOM DOM操作 ====================
export { default as addEvent } from './addEvent'
export { default as copy } from './copy'
export { default as removeEvent } from './removeEvent'
export { default as stopBubble } from './stopBubble'
export { default as stopDefault } from './stopDefault'
export { default as windowSize, type WindowSizeObj } from './windowSize'
export {
	default as download,
	downloadImpl,
	saveFile,
	downloadFile,
	downloadUrlFile,
	type DownloadType,
	type DownloadOptions,
	type DownloadUrlOptions,
	type DownloadErrorCallback,
	type DownloadSuccessCallback,
} from './download'

// ==================== Encode 编码解码 ====================
export { default as decodeBase64 } from './decodeBase64'
export { default as decodeUtf8 } from './decodeUtf8'
export { default as encodeBase64 } from './encodeBase64'
export { default as encodeUtf8 } from './encodeUtf8'
export { default as escape } from './escape'
export { default as safeParse } from './safeParse'
export { default as safeStringify } from './safeStringify'
export { default as unescape } from './unescape'

// ==================== Environment 环境判断 ====================
export { default as inBrowser } from './inBrowser'
export { default as inNodeJs } from './inNodeJs'
export { default as isDarkMode } from './isDarkMode'

// ==================== External 外部依赖 ====================
export { default as loadSource } from 'load-source'
export { default as mountCss } from 'mount-css'
export { default as mountImg } from 'mount-image'
export { default as mountJs } from 'mount-script'
export { default as mountStyle } from 'mount-style'
export { default as preloader } from './preloader'

// ==================== Network 网络 ====================
export { default as fillIPv6 } from './fillIPv6'

// ==================== Number 数字处理 ====================
export { default as average } from './average'
export { default as clamp } from './clamp'
export { default as fixNumber } from './fixNumber'
export { default as getNumber } from './getNumber'
export { default as inRange } from './inRange'
export { default as randomNumber } from './randomNumber'
export { default as randomNumbers } from './randomNumbers'
export { default as round } from './round'
export { default as sum } from './sum'
export { default as toThousands } from './toThousands'

// ==================== Object 对象处理 ====================
export { default as cleanData } from './cleanData'
export { default as clone } from './clone'
export {
	default as extend,
	type ExtendArrayData,
	type ExtendData,
	type ExtendObjectData,
} from './extend'
export { default as getProperty } from './getProperty'
export { default as isEqual } from './isEqual'
export { default as omit } from './omit'
export { default as pick } from './pick'
export { default as searchObject, type SearchKeySet } from './searchObject'
export { default as setProperty } from './setProperty'

// ==================== Patterns 正则模式 ====================
export {
	patterns,
	validation,
	DEVICE_PATTERNS,
	OS_PATTERNS,
	BROWSER_PATTERNS,
	ENGINE_PATTERNS,
	ENV_PATTERNS,
	getUserAgent as getUA,
	matchPattern,
	extractVersion,
	type ValidationPatternName,
	type DevicePatternName,
	type OSPatternName,
	type BrowserPatternName,
	type EnginePatternName,
	type EnvPatternName,
} from './patterns'

// ==================== Scroll 滚动工具 ====================
export { default as scroll } from './scroll'
export {
	getPosition,
	getProgress,
	getDirection,
	createDirectionTracker,
	isInViewport,
	scrollTo,
	scrollToTop,
	scrollToBottom,
	scrollBy,
	lockScroll,
	unlockScroll,
	toggleScroll,
	isScrollLocked,
	getScrollbarWidth,
} from './scroll'
export type { ScrollToOptions, ScrollBehavior } from './scroll'

// ==================== Storage 存储操作 ====================
export { default as delCache } from './delCache'
export { default as delCookie } from './delCookie'
export { default as delSession } from './delSession'
export { default as getCache, type CacheData } from './getCache'
export { default as getCookie } from './getCookie'
export { default as getCookies } from './getCookies'
export { default as getSession } from './getSession'
export { default as setCache, StorageQuotaError, StorageUnavailableError } from './setCache'
export { default as setCookie } from './setCookie'
export { default as setSession } from './setSession'

// ==================== String 字符串处理 ====================
export { default as camel2Dash } from './camel2Dash'
export { default as clearAttr } from './clearAttr'
export { default as clearHtml } from './clearHtml'
export { default as cutCHSString } from './cutCHSString'
export { default as dash2Camel } from './dash2Camel'
export { default as getCHSLength } from './getCHSLength'
export { default as kebabCase } from './kebabCase'
export { default as mapTemplate } from './mapTemplate'
export { default as snakeCase } from './snakeCase'
export { default as truncate, type TruncateOptions } from './truncate'
export { default as upperFirst } from './upperFirst'

// ==================== Type Check 类型判断 ====================
export { default as isArray } from './isArray'
export { default as isDate } from './isDate'
export { default as isEmpty } from './isEmpty'
export { default as isExitsFunction } from './isExitsFunction'
export { default as isIterable } from './isIterable'
export { default as isNil } from './isNil'
export { default as isObject } from './isObject'
export {
	default as isPlainObject,
	type JSONArray,
	type JSONValue,
	type PlainObject,
	type Primitive,
} from './isPlainObject'
export { default as isRegExp } from './isRegExp'
export { default as isWindow } from './isWindow'
export { default as getType } from './getType'

// ==================== URL & Browser URL与浏览器 ====================
export { default as appVersion } from './appVersion'
export { default as browserVersion, type BrowserVersion } from './browserVersion'
export { default as compareVersion } from './compareVersion'
export { type DirParamsResult, default as getDirParams } from './getDirParams'
export { default as getQueryParam } from './getQueryParam'
export { default as getQueryParams } from './getQueryParams'
export { default as getUrlParam } from './getUrlParam'
export { default as getUrlParams } from './getUrlParams'
export { default as isNumberBrowser } from './isNumberBrowser'
export { default as nextVersion, type Version } from './nextVersion'
export { default as openUrl } from './openUrl'
export { default as osVersion, type OsVersion } from './osVersion'
export { default as parseUrlParam } from './parseUrlParam'
export { default as spliceUrlParam, type SpliceUrlParamOptions } from './spliceUrlParam'
export {
	default as ua,
	UAParser,
	type UA,
	type UAInfo,
	type DeviceInfo,
	type OSInfo,
	type BrowserInfo,
	type EnvironmentInfo,
	type NetworkInfo,
	type ScreenInfo,
	type UAGetType,
	type IUAParser,
	type OSName,
	type BrowserName,
	type EngineName,
	type DeviceType,
} from './ua/index'

// ==================== URL Utilities ====================
export {
	url,
	Url,
	URL_PATTERNS,
	VALUE_MAP,
	// Query string parsing & building
	parse as parseQueryString,
	stringify as stringifyQueryString,
	// URLSearchParams-like methods
	get as getQueryParamValue,
	getAll as getAllQueryParamValues,
	has as hasQueryParam,
	set as setQueryParam,
	append as appendQueryParam,
	deleteParam,
	keys as getQueryParamKeys,
	values as getQueryParamValues,
	entries as getQueryParamEntries,
	// URL property extraction
	getOrigin,
	getHost,
	getHostname,
	getPathname,
	getSearch,
	getHash,
	// Types
	type URLPatternName,
	type URLInput,
	type ParseOptions,
	type StringifyOptions,
} from './url/index'

// ==================== Utility 工具函数 ====================
export { default as fingerprint } from './fingerprint'
export { default as getFileType } from './getFileType'
export { default as getGlobal } from './getGlobal'
export { default as nextIndex } from './nextIndex'
export {
	default as randomString,
	type RandomStringCharType,
	type RandomStringOptions,
} from './randomString'
export { default as uuid } from './uuid'

// ==================== Validate 验证函数 ====================
export { default as isCreditCard } from './isCreditCard'
export { default as isEmail } from './isEmail'
export { default as isIDCard } from './isIDCard'
export { default as isPhone } from './isPhone'
export { default as isURL } from './isURL'

// ==================== Version ====================
export const version = VERSION

// ==================== Types ====================
export type {
	AnyObject,
	AnyFunction,
	ArrayOne,
	ArrayOneMore,
	ArrayTwoMore,
	PickRequired,
	OmitRequired,
	PickPartial,
	OmitPartial,
	MaybePromiseOrGetter,
} from './types'
