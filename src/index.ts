/**
 * js-cool - Collection of common JavaScript / TypeScript utilities
 *
 * @module js-cool
 */

// Import version from virtual module (injected at build time)
import { VERSION } from 'virtual:version'

// ==================== Array ====================
export { default as all } from './all'
export { default as any } from './any'
export { default as chunk } from './chunk'
export { default as complement } from './complement'
export { default as contains } from './contains'
export { default as countBy } from './countBy'
export { default as differenceBy } from './differenceBy'
export { default as drop } from './drop'
export { default as dropRight } from './dropRight'
export { default as findIndex } from './findIndex'
export { default as findLastIndex } from './findLastIndex'
export { flatten, flattenDeep } from './flatten'
export { default as groupBy } from './groupBy'
export { default as intersect } from './intersect'
export { default as intersectionBy } from './intersectionBy'
export { default as keyBy } from './keyBy'
export { default as minus } from './minus'
export { default as partition } from './partition'
export { default as sample } from './sample'
export { default as sampleSize } from './sampleSize'
export { default as shuffle } from './shuffle'
export { default as sorter } from './sorter'
export { default as sortPinyin } from './sortPinyin'
export { default as take } from './take'
export { default as takeRight } from './takeRight'
export { default as union } from './union'
export { default as unionBy, type Iteratee } from './unionBy'
export { default as unique } from './unique'
export { default as unzip } from './unzip'
export { default as zip } from './zip'

// ==================== Async Flow ====================
export { default as awaitTo } from 'await-to-done'
export { default as debounce, type DebounceOptions } from './debounce'
export { default as delay } from './delay'
export { default as promiseFactory } from './promiseFactory'
export { default as punctualTimer, type PunctualTimerReturns } from './punctualTimer'
export { default as retry, RetryAbortError, RetryTimeoutError, type RetryOptions } from './retry'
export { default as throttle, type ThrottleOptions } from './throttle'
export { default as waiting } from './waiting'

// ==================== Color ====================
export { default as darken } from './darken'
export { default as hexToRGB, type RGBColor } from './hexToRGB'
export { default as isLightColor } from './isLightColor'
export { default as lighten } from './lighten'
export { default as randomColor } from './randomColor'
export { default as RGBToHex } from './RGBToHex'
export { default as rgbToHSL, type HSLColor } from './rgbToHSL'

// ==================== Binary ====================
export {
	binary,
	default as binaryDefault,
	type ArrayBufferAPI,
	type Base64API,
	type BinaryAPI,
	type BinaryConverter,
	type BinaryData,
	type BinaryFromOptions,
	type BinaryInput,
	type BinaryMeta,
	type BinaryType,
	type URLAPI as BinaryURLAPI,
	type BlobAPI,
	type DataURLAPI,
	type FileAPI,
	type HashAPI,
	type HexAPI,
	type MetaAPI,
	type SVGAPI,
	type TextAPI,
	type URLResult,
} from './binary/index'

// ==================== Convert ====================
export { default as arrayToCSV } from './arrayToCSV'
export { default as CSVToArray } from './CSVToArray'
export { default as CSVToJSON } from './CSVToJSON'
export { default as JSONToCSV } from './JSONToCSV'

// ==================== Date ====================
// New date module with namespace API
export {
	add as addDate,
	compare as compareDate,
	default as date,
	dateDiff,
	DateParser,
	endOf,
	// Functions
	formatDate,
	getDayOfYear,
	getDaysInMonth,
	getQuarter,
	getWeekOfYear,
	isAfter,
	isBefore,
	isBetween,
	isLeapYear,
	isSame,
	isToday,
	isTomorrow,
	isWeekend,
	isYesterday,
	max as maxDate,
	min as minDate,
	relativeTime,
	startOf,
	subtract as subtractDate,
	// Types
	type DateAPI,
	type DateComparisonUnit,
	type DateDiffResult,
	type DateInput,
	type DateUnit,
	type IDateParser,
	type RelativeTimeLocale,
} from './date/index'

// ==================== DOM ====================
export { default as addEvent } from './addEvent'
export { default as copy } from './copy'
export { default as removeEvent } from './removeEvent'
export { default as stopBubble } from './stopBubble'
export { default as stopDefault } from './stopDefault'
export { default as windowSize, type WindowSizeObj } from './windowSize'
export {
	default as download,
	downloadFile,
	downloadImpl,
	downloadUrlFile,
	saveFile,
	type DownloadErrorCallback,
	type DownloadOptions,
	type DownloadSuccessCallback,
	type DownloadType,
	type DownloadUrlOptions,
} from './download'

// ==================== Encode ====================
export { default as decodeUtf8 } from './decodeUtf8'
export { default as encodeUtf8 } from './encodeUtf8'
export { default as escape } from './escape'
export { default as safeParse } from './safeParse'
export { default as safeStringify } from './safeStringify'
export { default as unescape } from './unescape'

// ==================== Environment ====================
export { default as inBrowser } from './inBrowser'
export { default as inNodeJs } from './inNodeJs'
export { default as isDarkMode } from './isDarkMode'

// ==================== External ====================
export { default as loadSource } from 'load-source'
export { default as mountCss } from 'mount-css'
export { default as mountImg } from 'mount-image'
export { default as mountJs } from 'mount-script'
export { default as mountStyle } from 'mount-style'
export { default as preloader } from './preloader'

// ==================== Network ====================
export { default as fillIPv6 } from './fillIPv6'

// ==================== Number ====================
export { default as average } from './average'
export { default as clamp } from './clamp'
export { default as fixNumber } from './fixNumber'
export { default as getNumber, type GetNumberOptions } from './getNumber'
export { default as inRange } from './inRange'
export { default as randomNumber } from './randomNumber'
export { default as randomNumbers } from './randomNumbers'
export { default as round } from './round'
export { default as sum } from './sum'
export { default as toThousands, type ToThousandsOptions } from './toThousands'

// ==================== Object ====================
export { default as cleanData } from './cleanData'
export { default as clone } from './clone'
export {
	default as extend,
	type ExtendArrayData,
	type ExtendData,
	type ExtendObjectData,
} from './extend'
export { default as getProperty } from './getProperty'
export { default as invert } from './invert'
export { default as isEqual } from './isEqual'
export { default as mapKeys } from './mapKeys'
export { default as mapValues } from './mapValues'
export { default as mergeWith, type MergeStrategy } from './mergeWith'
export { default as omit } from './omit'
export { default as pick } from './pick'
export { default as searchObject, type SearchKeySet } from './searchObject'
export { default as setProperty } from './setProperty'
export { default as transform } from './transform'

// ==================== Patterns ====================
export {
	BROWSER_PATTERNS,
	DEVICE_PATTERNS,
	ENGINE_PATTERNS,
	ENV_PATTERNS,
	extract,
	extractVersion,
	getUserAgent as getUA,
	matchPattern,
	OS_PATTERNS,
	patterns,
	validation,
	type BrowserPatternName,
	type DevicePatternName,
	type EnginePatternName,
	type EnvPatternName,
	type ExtractPatternName,
	type OSPatternName,
	type ValidationPatternName,
} from './patterns'

// ==================== Scroll ====================
export { default as scroll } from './scroll'
export {
	createDirectionTracker,
	getDirection,
	getPosition,
	getProgress,
	getScrollbarWidth,
	isInViewport,
	isScrollLocked,
	lockScroll,
	scrollBy,
	scrollTo,
	scrollToBottom,
	scrollToTop,
	toggleScroll,
	unlockScroll,
} from './scroll'
export type { ScrollBehavior, ScrollToOptions } from './scroll'

// ==================== Storage ====================
export {
	cookie,
	local,
	session,
	storage,
	StorageQuotaError,
	StorageUnavailableError,
	type CookieAPI,
	type CookieDeleteOptions,
	type CookieOptions,
	type StorageAPI,
	type StorageNamespace,
	type StorageOptions,
} from './storage/index'

// ==================== String ====================
export { default as camel2Dash } from './camel2Dash'
export { default as capitalize } from './capitalize'
export { default as changeCase, type CaseType } from './changeCase'
export { default as clearAttr } from './clearAttr'
export { default as clearHtml } from './clearHtml'
export { default as constantCase } from './constantCase'
export { default as count, type CountOptions } from './count'
export { default as cutCHSString } from './cutCHSString'
export { default as dash2Camel } from './dash2Camel'
export { default as dotCase } from './dotCase'
export { default as getCHSLength } from './getCHSLength'
export { default as kebabCase } from './kebabCase'
export { default as lowerFirst } from './lowerFirst'
export { default as pascalCase } from './pascalCase'
export { default as reverse } from './reverse'
export { default as snakeCase } from './snakeCase'
export { default as swapCase } from './swapCase'
export { default as template, type DataResolver, type TemplateOptions, type TemplateSettings } from './template'
export { default as titleCase } from './titleCase'
export { default as truncate, type TruncateOptions } from './truncate'
export { default as upperFirst } from './upperFirst'
export { default as words } from './words'

// ==================== Type Check ====================
export { default as isArray } from './isArray'
export { default as isDate } from './isDate'
export { default as isEmpty } from './isEmpty'
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
export { default as isFunctionExists } from './isFunctionExists'
export { default as getType } from './getType'

// ==================== URL & Browser ====================
export { default as appVersion } from './appVersion'
export { default as browserVersion, type BrowserVersion } from './browserVersion'
export { default as compareVersion } from './compareVersion'
export { default as getDirParams, type DirParamsResult } from './getDirParams'
export { default as isNumberBrowser } from './isNumberBrowser'
export { default as nextVersion, type Version } from './nextVersion'
export { default as openUrl } from './openUrl'
export { default as osVersion, type OsVersion } from './osVersion'
export {
	default as ua,
	UAParser,
	type BrowserInfo,
	type BrowserName,
	type DeviceInfo,
	type DeviceType,
	type EngineName,
	type EnvironmentInfo,
	type IUAParser,
	type NetworkInfo,
	type OSInfo,
	type OSName,
	type ScreenInfo,
	type UA,
	type UAGetType,
	type UAInfo,
} from './ua/index'

// ==================== URL Utilities ====================
export {
	getHash,
	getHost,
	getHostname,
	// URL property extraction
	getOrigin,
	getPathname,
	getSearch,
	// Query string parsing & building
	parse,
	parse as parseQueryString,
	stringify,
	stringify as stringifyQueryString,
	Url,
	// Types
	type ParamScope,
	type ParseOptions,
	type StringifyOptions,
} from './url/index'

// ==================== Utility ====================
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

// ==================== Validate ====================
export { default as isCreditCard } from './isCreditCard'
export { default as isEmail } from './isEmail'
export { default as isIDCard } from './isIDCard'
export { default as isPhone } from './isPhone'
export { default as isURL } from './isURL'

// ==================== Version ====================
export const version = VERSION

// ==================== Types ====================
export type {
	AnyFunction,
	AnyObject,
	ArrayOne,
	ArrayOneMore,
	ArrayTwoMore,
	MaybePromiseOrGetter,
	OmitPartial,
	OmitRequired,
	PickPartial,
	PickRequired,
} from './types'
