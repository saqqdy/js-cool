import { download } from 'use-downloads'

// Global Parameters
import client from './client'
import pattern from './pattern'

// String extensions, array methods
import trim from './trim'
import clearAttr from './clearAttr'
import clearHtml from './clearHtml'
import escape from './escape'
import unescape from './unescape'
import getNumber from './getNumber'
import camel2Dash from './camel2Dash'
import dash2Camel from './dash2Camel'
import upperFirst from './upperFirst'
import randomColor from './randomColor'
import randomNumber from './randomNumber'
import randomNumbers from './randomNumbers'
import randomString from './randomString'
import shuffle from './shuffle'
import fingerprint from './fingerprint'
import getCHSLength from './getCHSLength'
import cutCHSString from './cutCHSString'

// Get the status of
import isDigitals from './isDigitals'
import isExitsFunction from './isExitsFunction'
import isExitsVariable from './isExitsVariable'
import isEqual from './isEqual'
import isWindow from './isWindow'
import isObject from './isObject'
import isArray from './isArray'
import isIterable from './isIterable'
import inBrowser from './inBrowser'
import inNodeJs from './inNodeJs'
import windowSize from './windowSize'
import getAppVersion from './getAppVersion'
import appVersion from './appVersion'
import getOsVersion from './getOsVersion'
import osVersion from './osVersion'
import browserVersion from './browserVersion'
import compareVersion from './compareVersion'
import parseUrlParam from './parseUrlParam'
import spliceUrlParam from './spliceUrlParam'
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
import getCookies from './getCookies'
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
import nextVersion from './nextVersion'
import promiseFactory from './promiseFactory'
import fixNumber from './fixNumber'
import mapTemplate from './mapTemplate'
import extend from './extend'
import delay from './delay'
import getType from './getType'
import getFileType from './getFileType'
import sorter from './sorter'
import sortPinyin from './sortPinyin'
import isPlainObject from './isPlainObject'
import isDarkMode from './isDarkMode'
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
import preloader from './preloader'
import waiting from './waiting'
import awaitTo from './awaitTo'

// Blob arrayBuffer base64 file blobUrl
import arrayBufferToBase64 from './arrayBufferToBase64'
import arrayBufferToBlob from './arrayBufferToBlob'
import base64ToArrayBuffer from './base64ToArrayBuffer'
import base64ToBlob from './base64ToBlob'
import base64ToFile from './base64ToFile'
import blobToArrayBuffer from './blobToArrayBuffer'
import blobToBase64 from './blobToBase64'
import blobToUrl from './blobToUrl'
import fileToBase64 from './fileToBase64'
import svgToBlob from './svgToBlob'
import urlToBlob from './urlToBlob'

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
	getCookies,
	setCookie,
	delCookie,
	camel2Dash,
	cleanData,
	clearAttr,
	clearHtml,
	escape,
	unescape,
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
	mapTemplate,
	getAppVersion,
	appVersion,
	getCHSLength,
	getDirParam,
	compareVersion,
	getNumber,
	getOsVersion,
	osVersion,
	browserVersion,
	getQueryParam,
	getQueryParams,
	getProperty,
	randomColor,
	randomNumber,
	randomNumbers,
	randomString,
	shuffle,
	fingerprint,
	getScrollPosition,
	getType,
	getFileType,
	sorter,
	sortPinyin,
	parseUrlParam,
	spliceUrlParam,
	getUrlParam,
	getUrlParams,
	intersect,
	isDigitals,
	isExitsFunction,
	isExitsVariable,
	isEqual,
	isWindow,
	isObject,
	isArray,
	isIterable,
	isPlainObject,
	isDarkMode,
	inBrowser,
	inNodeJs,
	minus,
	nextIndex,
	nextVersion,
	promiseFactory,
	waiting,
	awaitTo,
	arrayBufferToBase64,
	arrayBufferToBlob,
	base64ToArrayBuffer,
	base64ToBlob,
	base64ToFile,
	blobToArrayBuffer,
	blobToBase64,
	blobToUrl,
	fileToBase64,
	svgToBlob,
	urlToBlob,
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
	mountStyle,
	preloader
}
