/**
 * Storage module types
 * @module storage/types
 */

/** 存储数据结构（内部使用） */
export interface StorageData<T = unknown> {
	expires?: number
	value: T
}

/** 存储选项（localStorage / sessionStorage） */
export interface StorageOptions {
	/** 过期时间（秒） */
	expires?: number
}

/** Cookie 选项 */
export interface CookieOptions {
	/** 过期时间（秒），默认 86400（1天） */
	expires?: number
	/** 路径，默认 '/' */
	path?: string
	/** 域名 */
	domain?: string
	/** 是否仅 HTTPS 传输 */
	secure?: boolean
	/** SameSite 策略 */
	sameSite?: 'Strict' | 'Lax' | 'None'
}

/** Cookie 删除选项 */
export interface CookieDeleteOptions {
	path?: string
	domain?: string
}

/** 通用存储 API */
export interface StorageAPI {
	/**
	 * 设置存储值
	 * @param name - 键名
	 * @param value - 值（任意类型，自动 JSON 序列化）
	 * @param options - 选项（expires: 过期秒数）
	 */
	set: <T = unknown>(name: string, value: T, options?: StorageOptions) => void

	/**
	 * 获取存储值
	 * @param name - 键名
	 * @returns 值或 null（不存在/已过期/存储不可用）
	 */
	get: <T = unknown>(name: string) => T | null

	/**
	 * 删除存储值
	 * @param name - 键名
	 */
	delete: (name: string) => void

	/**
	 * 检查键是否存在
	 * @param name - 键名
	 */
	has: (name: string) => boolean

	/**
	 * 获取所有键名
	 */
	keys: () => string[]

	/**
	 * 清空所有存储
	 */
	clear: () => void

	/**
	 * 获取存储项数量
	 */
	readonly length: number
}

/** Cookie 存储 API */
export interface CookieAPI {
	/**
	 * 设置 Cookie
	 * @param name - 键名
	 * @param value - 值（string | number | boolean）
	 * @param options - 选项
	 */
	set: (name: string, value: string | number | boolean, options?: CookieOptions) => void

	/**
	 * 获取单个 Cookie
	 * @param name - 键名
	 * @returns 值或 null
	 */
	get: (name: string) => string | null

	/**
	 * 获取所有 Cookie
	 * @returns 键值对对象
	 */
	getAll: () => Record<string, string>

	/**
	 * 删除 Cookie
	 * @param name - 键名
	 * @param options - 选项（path/domain 需与设置时一致）
	 */
	delete: (name: string, options?: CookieDeleteOptions) => void

	/**
	 * 检查 Cookie 是否存在
	 * @param name - 键名
	 */
	has: (name: string) => boolean

	/**
	 * 清空所有 Cookie
	 */
	clear: () => void
}

/** 存储命名空间 */
export interface StorageNamespace {
	/** localStorage 存储 */
	readonly local: StorageAPI
	/** sessionStorage 存储 */
	readonly session: StorageAPI
	/** Cookie 存储 */
	readonly cookie: CookieAPI
}
