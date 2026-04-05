/**
 * Environment detection module (Chinese apps, etc.)
 *
 * @example
 * ```ts
 * import { isWeChat, isQQ, getEnvInfo } from 'js-cool/ua'
 *
 * isWeChat()           // true/false
 * isQQ()               // true/false
 * isMiniProgram()      // true/false
 * getEnvInfo()         // { wechat: true, qq: false, ... }
 * ```
 *
 * @module ua/env
 */

import type { EnvironmentInfo } from './types'
import { ENV_PATTERNS, getUserAgent } from '../patterns/ua'

/**
 * Parse environment information from user agent
 */
export function parseEnvironment(ua: string): EnvironmentInfo {
	return {
		wechat: ENV_PATTERNS.wechat.test(ua),
		wxwork: ENV_PATTERNS.wxwork.test(ua),
		dingtalk: ENV_PATTERNS.dingtalk.test(ua),
		qq: ENV_PATTERNS.qq.test(ua),
		qqBrowser: ENV_PATTERNS.qqBrowser.test(ua),
		weibo: ENV_PATTERNS.weibo.test(ua),
		alipay: ENV_PATTERNS.alipay.test(ua),
		douyin: ENV_PATTERNS.douyin.test(ua),
		kuaishou: ENV_PATTERNS.kuaishou.test(ua),
		baidu: ENV_PATTERNS.baidu.test(ua),
		xiaomi: ENV_PATTERNS.xiaomi.test(ua),
		huawei: ENV_PATTERNS.huawei.test(ua),
		vivo: ENV_PATTERNS.vivo.test(ua),
		oppo: ENV_PATTERNS.oppo.test(ua),
		uc: ENV_PATTERNS.uc.test(ua),
		quark: ENV_PATTERNS.quark.test(ua),
		miniProgram: ENV_PATTERNS.miniProgram.test(ua),
		miniGame: ENV_PATTERNS.miniGame.test(ua),
	}
}

// Cache for default detector
let cachedEnvInfo: EnvironmentInfo | null = null

/**
 * Get environment info (cached)
 */
export function getEnvInfo(): EnvironmentInfo {
	if (cachedEnvInfo) return cachedEnvInfo
	cachedEnvInfo = parseEnvironment(getUserAgent())
	return cachedEnvInfo
}

/**
 * Check if WeChat environment
 */
export function isWeChat(ua?: string): boolean {
	if (ua) return ENV_PATTERNS.wechat.test(ua)
	return getEnvInfo().wechat
}

/**
 * Check if WeChat Work environment
 */
export function isWxwork(ua?: string): boolean {
	if (ua) return ENV_PATTERNS.wxwork.test(ua)
	return getEnvInfo().wxwork
}

/**
 * Check if DingTalk environment
 */
export function isDingtalk(ua?: string): boolean {
	if (ua) return ENV_PATTERNS.dingtalk.test(ua)
	return getEnvInfo().dingtalk
}

/**
 * Check if QQ built-in browser
 */
export function isQQ(ua?: string): boolean {
	if (ua) return ENV_PATTERNS.qq.test(ua)
	return getEnvInfo().qq
}

/**
 * Check if QQ Browser
 */
export function isQQBrowser(ua?: string): boolean {
	if (ua) return ENV_PATTERNS.qqBrowser.test(ua)
	return getEnvInfo().qqBrowser
}

/**
 * Check if Weibo environment
 */
export function isWeibo(ua?: string): boolean {
	if (ua) return ENV_PATTERNS.weibo.test(ua)
	return getEnvInfo().weibo
}

/**
 * Check if Alipay environment
 */
export function isAlipay(ua?: string): boolean {
	if (ua) return ENV_PATTERNS.alipay.test(ua)
	return getEnvInfo().alipay
}

/**
 * Check if Douyin/TikTok environment
 */
export function isDouyin(ua?: string): boolean {
	if (ua) return ENV_PATTERNS.douyin.test(ua)
	return getEnvInfo().douyin
}

/**
 * Check if Kuaishou environment
 */
export function isKuaishou(ua?: string): boolean {
	if (ua) return ENV_PATTERNS.kuaishou.test(ua)
	return getEnvInfo().kuaishou
}

/**
 * Check if Baidu App environment
 */
export function isBaidu(ua?: string): boolean {
	if (ua) return ENV_PATTERNS.baidu.test(ua)
	return getEnvInfo().baidu
}

/**
 * Check if Xiaomi browser
 */
export function isXiaomi(ua?: string): boolean {
	if (ua) return ENV_PATTERNS.xiaomi.test(ua)
	return getEnvInfo().xiaomi
}

/**
 * Check if Huawei browser
 */
export function isHuawei(ua?: string): boolean {
	if (ua) return ENV_PATTERNS.huawei.test(ua)
	return getEnvInfo().huawei
}

/**
 * Check if Vivo browser
 */
export function isVivo(ua?: string): boolean {
	if (ua) return ENV_PATTERNS.vivo.test(ua)
	return getEnvInfo().vivo
}

/**
 * Check if Oppo browser
 */
export function isOppo(ua?: string): boolean {
	if (ua) return ENV_PATTERNS.oppo.test(ua)
	return getEnvInfo().oppo
}

/**
 * Check if UC browser environment
 * @note Alias for browser detection, use `isUCBrowser` for clarity
 */
export function isUCEnv(ua?: string): boolean {
	if (ua) return ENV_PATTERNS.uc.test(ua)
	return getEnvInfo().uc
}

/**
 * Check if Quark browser environment
 */
export function isQuarkEnv(ua?: string): boolean {
	if (ua) return ENV_PATTERNS.quark.test(ua)
	return getEnvInfo().quark
}

/**
 * Check if mini program environment
 */
export function isMiniProgram(ua?: string): boolean {
	if (ua) return ENV_PATTERNS.miniProgram.test(ua)
	return getEnvInfo().miniProgram
}

/**
 * Check if mini game environment
 */
export function isMiniGame(ua?: string): boolean {
	if (ua) return ENV_PATTERNS.miniGame.test(ua)
	return getEnvInfo().miniGame
}

// Reset cache (for testing)
export function _resetEnvCache(): void {
	cachedEnvInfo = null
}
