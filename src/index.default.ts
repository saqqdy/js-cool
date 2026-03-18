import { download } from 'use-downloads'

import { awaitTo, loadSource, mountCss, mountImg, mountJs, mountStyle } from './'
import addEvent from './addEvent'

import all from './all'
import any from './any'
import appVersion from './appVersion'
// Blob arrayBuffer base64 file blobUrl
import arrayBufferToBase64 from './arrayBufferToBase64'
import arrayBufferToBlob from './arrayBufferToBlob'
import arrayToCSV from './arrayToCSV'
import base64ToArrayBuffer from './base64ToArrayBuffer'
import base64ToBlob from './base64ToBlob'
import base64ToFile from './base64ToFile'
import blobToArrayBuffer from './blobToArrayBuffer'
import blobToBase64 from './blobToBase64'
import blobToUrl from './blobToUrl'
import browserVersion from './browserVersion'
import camel2Dash from './camel2Dash'
import cleanData from './cleanData'
import clearAttr from './clearAttr'
import clearHtml from './clearHtml'

// Global Parameters
import client from './client'
import clone from './clone'
import compareVersion from './compareVersion'
import complement from './complement'
import contains from './contains'
import copy from './copy'
import CSVToArray from './CSVToArray'
import CSVToJSON from './CSVToJSON'
import cutCHSString from './cutCHSString'
import dash2Camel from './dash2Camel'
import decodeBase64 from './decodeBase64'
import decodeUtf8 from './decodeUtf8'
import delay from './delay'
import delCache from './delCache'
import delCookie from './delCookie'
import delSession from './delSession'
// Encoding and decoding
import encodeBase64 from './encodeBase64'
import encodeUtf8 from './encodeUtf8'
import escape from './escape'
import extend from './extend'
import fileToBase64 from './fileToBase64'
import fillIPv6 from './fillIPv6'
import fingerprint from './fingerprint'
import fixNumber from './fixNumber'
// Cache, cookie, session
import getCache from './getCache'
import getCHSLength from './getCHSLength'
import getCookie from './getCookie'
import getCookies from './getCookies'

import getDirParam from './getDirParam'
import getFileType from './getFileType'
import getNumber from './getNumber'
import getProperty from './getProperty'
import getQueryParam from './getQueryParam'
import getQueryParams from './getQueryParams'
import getScrollPosition from './getScrollPosition'
import getSession from './getSession'
import getType from './getType'

import getUrlParam from './getUrlParam'
import getUrlParams from './getUrlParams'
import inBrowser from './inBrowser'
import inNodeJs from './inNodeJs'

import intersect from './intersect'
import isArray from './isArray'
import isDarkMode from './isDarkMode'
import isDate from './isDate'
// Get the status of
import isDigitals from './isDigitals'

import isEqual from './isEqual'
import isExitsFunction from './isExitsFunction'
import isExitsVariable from './isExitsVariable'
import isIterable from './isIterable'
import isNumberBrowser from './isNumberBrowser'
import isObject from './isObject'
import isPlainObject from './isPlainObject'
import isRegExp from './isRegExp'
import isWindow from './isWindow'
import JSONToCSV from './JSONToCSV'
import mapTemplate from './mapTemplate'
import minus from './minus'
// tools
import nextIndex from './nextIndex'
import nextVersion from './nextVersion'
import openUrl from './openUrl'
import osVersion from './osVersion'
import parseUrlParam from './parseUrlParam'
import pattern from './pattern'
import preloader from './preloader'
import promiseFactory from './promiseFactory'
import punctualTimer from './punctualTimer'
import randomColor from './randomColor'
import randomNumber from './randomNumber'
import randomNumbers from './randomNumbers'
import randomString from './randomString'
import removeEvent from './removeEvent'
import RGBToHex from './RGBToHex'
import safeParse from './safeParse'
import safeStringify from './safeStringify'
import searchObject from './searchObject'
import setCache from './setCache'
import setCookie from './setCookie'
import setProperty from './setProperty'
import setSession from './setSession'
import shuffle from './shuffle'
import sorter from './sorter'
import sortPinyin from './sortPinyin'
import spliceUrlParam from './spliceUrlParam'
// Event delegates, other event methods
import stopBubble from './stopBubble'

import stopDefault from './stopDefault'
import svgToBlob from './svgToBlob'
import toThousands from './toThousands'
// String extensions, array methods
import trim from './trim'
import unescape from './unescape'
import union from './union'
import unique from './unique'
import upperFirst from './upperFirst'
import urlToBlob from './urlToBlob'
import uuid from './uuid'
import waiting from './waiting'

import windowSize from './windowSize'

export type * from './types'

export default {
	addEvent,
	all,
	any,
	appVersion,
	arrayBufferToBase64,
	arrayBufferToBlob,
	arrayToCSV,
	awaitTo,
	base64ToArrayBuffer,
	base64ToBlob,
	base64ToFile,
	blobToArrayBuffer,
	blobToBase64,
	blobToUrl,
	browserVersion,
	camel2Dash,
	cleanData,
	clearAttr,
	clearHtml,
	client,
	clone,
	compareVersion,
	complement,
	contains,
	copy,
	CSVToArray,
	CSVToJSON,
	cutCHSString,
	dash2Camel,
	decodeBase64,
	decodeUtf8,
	delay,
	delCache,
	delCookie,
	delSession,
	download,
	encodeBase64,
	encodeUtf8,
	escape,
	extend,
	fileToBase64,
	fillIPv6,
	fingerprint,
	fixNumber,
	getCache,
	getCHSLength,
	getCookie,
	getCookies,
	getDirParam,
	getFileType,
	getNumber,
	getProperty,
	getQueryParam,
	getQueryParams,
	getScrollPosition,
	getSession,
	getType,
	getUrlParam,
	getUrlParams,
	inBrowser,
	inNodeJs,
	intersect,
	isArray,
	isDarkMode,
	isDate,
	isDigitals,
	isEqual,
	isExitsFunction,
	isExitsVariable,
	isIterable,
	isNumberBrowser,
	isObject,
	isPlainObject,
	isRegExp,
	isWindow,
	JSONToCSV,
	loadSource,
	mapTemplate,
	minus,
	mountCss,
	mountImg,
	mountJs,
	mountStyle,
	nextIndex,
	nextVersion,
	openUrl,
	osVersion,
	parseUrlParam,
	pattern,
	preloader,
	promiseFactory,
	punctualTimer,
	randomColor,
	randomNumber,
	randomNumbers,
	randomString,
	removeEvent,
	RGBToHex,
	safeParse,
	safeStringify,
	searchObject,
	setCache,
	setCookie,
	setProperty,
	setSession,
	shuffle,
	sorter,
	sortPinyin,
	spliceUrlParam,
	stopBubble,
	stopDefault,
	svgToBlob,
	toThousands,
	trim,
	unescape,
	union,
	unique,
	upperFirst,
	urlToBlob,
	uuid,
	version: '__VERSION__',
	waiting,
	windowSize,
}
