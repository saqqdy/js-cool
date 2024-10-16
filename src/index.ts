export { default as loadSource } from 'load-source'
export { default as mountCss } from 'mount-css'
export { default as mountImg } from 'mount-image'
export { default as mountJs } from 'mount-script'
export { default as mountStyle } from 'mount-style'
export { download } from 'use-downloads'
export { default as awaitTo } from 'await-to-done'

// Global Parameters
export { default as client } from './client'
// export type {
// 	InfoKey,
// 	InfoKeys,
// 	InfoTypes,
// 	InfoEngineKeys,
// 	InfoBrowserKeys,
// 	InfoOsKeys,
// 	InfoDeviceKeys,
// 	Client,
// 	INFO_MAP,
// 	ClientOptions
// } from './client'
export { default as pattern } from './pattern'

// String extensions, array methods
export { default as trim } from './trim'
export { default as clearAttr } from './clearAttr'
export { default as clearHtml } from './clearHtml'
export { default as escape } from './escape'
export { default as unescape } from './unescape'
export { default as getNumber } from './getNumber'
export { default as camel2Dash } from './camel2Dash'
export { default as dash2Camel } from './dash2Camel'
export { default as upperFirst } from './upperFirst'
export { default as randomColor } from './randomColor'
export { default as randomNumber } from './randomNumber'
export { default as randomNumbers } from './randomNumbers'
export {
	default as randomString,
	type RandomStringOptions,
	type RandomStringCharType
} from './randomString'
export { default as shuffle } from './shuffle'
export { default as fingerprint } from './fingerprint'
export { default as getCHSLength } from './getCHSLength'
export { default as cutCHSString } from './cutCHSString'

// Get the status of
export { default as isDigitals } from './isDigitals'
export { default as isExitsFunction } from './isExitsFunction'
export { default as isEqual } from './isEqual'
export { default as isExitsVariable } from './isExitsVariable'
export { default as isWindow } from './isWindow'
export {
	default as isPlainObject,
	Primitive,
	PlainObject,
	JSONValue,
	JSONArray
} from './isPlainObject'
export { default as isDarkMode } from './isDarkMode'
export { default as isObject } from './isObject'
export { default as isDate } from './isDate'
export { default as isRegExp } from './isRegExp'
export { default as isArray } from './isArray'
export { default as isIterable } from './isIterable'
export { default as inBrowser } from './inBrowser'
export { default as inNodeJs } from './inNodeJs'
export { default as isNumberBrowser } from './isNumberBrowser'
export { default as windowSize, type WindowSizeObj } from './windowSize'
export { default as getAppVersion } from './getAppVersion'
export { default as appVersion } from './appVersion'
export { default as getOsVersion } from './getOsVersion'
export { default as osVersion, type OsVersion } from './osVersion'
export { default as browserVersion, type BrowserVersion } from './browserVersion'
export { default as compareVersion } from './compareVersion'
export { default as parseUrlParam } from './parseUrlParam'
export { default as spliceUrlParam, type SpliceUrlParamOptions } from './spliceUrlParam'
export { default as safeParse } from './safeParse'
export { default as safeStringify } from './safeStringify'
export { default as getDirParam, type DirParamType } from './getDirParam'
export { default as getQueryParam } from './getQueryParam'
export { default as getQueryParams } from './getQueryParams'
export { default as getUrlParam } from './getUrlParam'
export { default as getUrlParams } from './getUrlParams'

// Cache, cookie, session
export { default as getCache } from './getCache'
export { default as setCache } from './setCache'
export { default as delCache } from './delCache'
export { default as getSession } from './getSession'
export { default as setSession } from './setSession'
export { default as delSession } from './delSession'
export { default as getCookie } from './getCookie'
export { default as getCookies } from './getCookies'
export { default as setCookie } from './setCookie'
export { default as delCookie } from './delCookie'

// Encoding and decoding
export { default as encodeBase64 } from './encodeBase64'
export { default as encodeUtf8 } from './encodeUtf8'
export { default as decodeBase64 } from './decodeBase64'
export { default as decodeUtf8 } from './decodeUtf8'

// Event delegates, other event methods
export { default as stopBubble } from './stopBubble'
export { default as stopDefault } from './stopDefault'
export { default as addEvent } from './addEvent'
export { default as removeEvent } from './removeEvent'
export { default as getScrollPosition } from './getScrollPosition'

// tools
export { default as nextIndex } from './nextIndex'
export { default as nextVersion, type Version } from './nextVersion'
export { default as punctualTimer } from './punctualTimer'
export { default as promiseFactory } from './promiseFactory'
export { default as fixNumber } from './fixNumber'
export { default as mapTemplate } from './mapTemplate'
export { default as extend, ExtendArrayData, ExtendObjectData, ExtendData } from './extend'
export { default as clone } from './clone'
export { default as delay } from './delay'
export { default as getType } from './getType'
export { default as getFileType } from './getFileType'
export { default as sorter } from './sorter'
export { default as sortPinyin } from './sortPinyin'
export { default as cleanData } from './cleanData'
export { default as searchObject, type SearchKeySet } from './searchObject'
export { default as openUrl } from './openUrl'
export { default as copy } from './copy'
export { default as toThousands } from './toThousands'
export { default as all } from './all'
export { default as any } from './any'
export { default as uuid } from './uuid'
export { default as CSVToArray } from './CSVToArray'
export { default as arrayToCSV } from './arrayToCSV'
export { default as CSVToJSON } from './CSVToJSON'
export { default as JSONToCSV } from './JSONToCSV'
export { default as RGBToHex } from './RGBToHex'
export { default as intersect } from './intersect'
export { default as union } from './union'
export { default as minus } from './minus'
export { default as complement } from './complement'
export { default as contains } from './contains'
export { default as unique } from './unique'
export { default as fillIPv6 } from './fillIPv6'
export { default as getProperty } from './getProperty'
export { default as setProperty } from './setProperty'
export { default as preloader } from './preloader'
export { default as waiting } from './waiting'

// Blob arrayBuffer base64 file blobUrl
export { default as arrayBufferToBase64 } from './arrayBufferToBase64'
export { default as arrayBufferToBlob } from './arrayBufferToBlob'
export { default as base64ToArrayBuffer } from './base64ToArrayBuffer'
export { default as base64ToBlob } from './base64ToBlob'
export { default as base64ToFile } from './base64ToFile'
export { default as blobToArrayBuffer } from './blobToArrayBuffer'
export { default as blobToBase64 } from './blobToBase64'
export { default as blobToUrl } from './blobToUrl'
export { default as fileToBase64 } from './fileToBase64'
export { default as svgToBlob } from './svgToBlob'
export { default as urlToBlob } from './urlToBlob'

export { default } from './index.default'
export type * from './index.default'
export const version = '__VERSION__' as string
