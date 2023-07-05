import { download } from 'use-downloads'

// Global Parameters
import client from './client'
import pattern from './pattern'

// String extensions, array methods
import trim from './trim'
import clearAttr from './clearAttr'
import clearHtml from './clearHtml'
import getNumber from './getNumber'
import camel2Dash from './camel2Dash'
import dash2Camel from './dash2Camel'
import upperFirst from './upperFirst'
import randomNumber from './randomNumber'
import randomString from './randomString'
import getCHSLength from './getCHSLength'
import cutCHSString from './cutCHSString'

// Get the status of
import isDigitals from './isDigitals'
import isExitsFunction from './isExitsFunction'
import isExitsVariable from './isExitsVariable'
import isWindow from './isWindow'
import isObject from './isObject'
import inBrowser from './inBrowser'
import windowSize from './windowSize'
import getAppVersion from './getAppVersion'
import getOsVersion from './getOsVersion'
import compareVersion from './compareVersion'
import parseUrlParam from './parseUrlParam'
import getDirParam from './getDirParam'
import getQueryParam from './getQueryParam'
import getQueryParams from './getQueryParams'
import getUrlParam from './getUrlParam'
import getUrlParams from './getUrlParams'

// Cache, cookie, session
import getCache from './getCache'
import setCache from './setCache'
import delCache from './delCache'
import getSession from './getSession'
import setSession from './setSession'
import delSession from './delSession'
import getCookie from './getCookie'
import setCookie from './setCookie'
import delCookie from './delCookie'

// Encoding and decoding
import encodeBase64 from './encodeBase64'
import encodeUtf8 from './encodeUtf8'
import decodeBase64 from './decodeBase64'
import decodeUtf8 from './decodeUtf8'

// Event delegates, other event methods
import stopBubble from './stopBubble'
import stopDefault from './stopDefault'
import addEvent from './addEvent'
import removeEvent from './removeEvent'
import getScrollPosition from './getScrollPosition'

// tools
import nextIndex from './nextIndex'
import fixNumber from './fixNumber'
import extend from './extend'
import delay from './delay'
import getType from './getType'
import isArray from './isArray'
import isPlainObject from './isPlainObject'
import cleanData from './cleanData'
import searchObject from './searchObject'
import openUrl from './openUrl'
import copy from './copy'
import toThousands from './toThousands'
import all from './all'
import any from './any'
import uuid from './uuid'
import CSVToArray from './CSVToArray'
import arrayToCSV from './arrayToCSV'
import CSVToJSON from './CSVToJSON'
import JSONToCSV from './JSONToCSV'
import RGBToHex from './RGBToHex'
import intersect from './intersect'
import union from './union'
import minus from './minus'
import complement from './complement'
import contains from './contains'
import unique from './unique'
import fillIPv6 from './fillIPv6'
import getProperty from './getProperty'
import setProperty from './setProperty'

import { loadSource, mountCss, mountImg, mountJs, mountStyle } from './'

export default {
	version: '__VERSION__',
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
	getCookie,
	setCookie,
	delCookie,
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
	compareVersion,
	getNumber,
	getOsVersion,
	getQueryParam,
	getQueryParams,
	getProperty,
	randomNumber,
	randomString,
	getScrollPosition,
	getType,
	parseUrlParam,
	getUrlParam,
	getUrlParams,
	intersect,
	isArray,
	isDigitals,
	isExitsFunction,
	isExitsVariable,
	isWindow,
	isObject,
	isPlainObject,
	inBrowser,
	minus,
	nextIndex,
	openUrl,
	copy,
	pattern,
	removeEvent,
	searchObject,
	setProperty,
	stopBubble,
	stopDefault,
	toThousands,
	trim,
	union,
	unique,
	upperFirst,
	uuid,
	windowSize,
	loadSource,
	mountCss,
	mountImg,
	mountJs,
	mountStyle
}
