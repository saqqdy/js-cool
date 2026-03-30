// Changelog for current version
import { version } from 'js-cool'

export interface ChangeItem {
	type: 'new' | 'update' | 'fix' | 'breaking'
	name: string
	category: string
	description: string
	descriptionZh: string
	anchor?: string // CSS ID anchor for navigation
}

export interface ChangelogData {
	version: string
	date: string
	summary: string
	summaryZh: string
	migrationGuide?: string
	changes: ChangeItem[]
}

export const changelog: ChangelogData = {
	version: version || '6.0.0',
	date: '2025-03-29',
	summary:
		'Major update: New binary module, IE11 built-in support, new UA detector module, 50+ new utilities',
	summaryZh: '重大更新：新增 binary 模块、内置 IE11 支持、新增 UA 检测模块、50+ 新工具函数',
	migrationGuide: 'https://github.com/saqqdy/js-cool/blob/master/MIGRATION-v5-to-v6.md',
	changes: [
		// New Features - Binary Module (Featured)
		{
			type: 'new',
			name: 'binary module',
			category: 'Binary',
			description:
				'Unified binary data conversion API with chainable syntax, supporting Blob, File, ArrayBuffer, Base64, DataURL, URL, SVG formats',
			descriptionZh:
				'统一的二进制数据转换 API，支持链式调用，支持 Blob、File、ArrayBuffer、Base64、DataURL、URL、SVG 格式互转',
			anchor: 'binary',
		},
		{
			type: 'new',
			name: 'binary.from() - Chainable',
			category: 'Binary',
			description:
				'Chainable binary converter: binary.from(blob).toBase64(), binary.from(file).toArrayBuffer(), etc.',
			descriptionZh:
				'链式二进制转换器：binary.from(blob).toBase64()、binary.from(file).toArrayBuffer() 等',
			anchor: 'binary',
		},
		{
			type: 'new',
			name: 'binary.base64 / text / hex',
			category: 'Binary',
			description:
				'Base64, text encoding, and hex encoding modules with encode/decode and conversion functions',
			descriptionZh: 'Base64、文本编码和十六进制编码模块，支持编码解码和转换函数',
			anchor: 'binary',
		},
		{
			type: 'new',
			name: 'binary.hash',
			category: 'Binary',
			description: 'Hash functions: MD5, SHA-1, SHA-256, CRC32 for binary data',
			descriptionZh: '哈希函数：MD5、SHA-1、SHA-256、CRC32，支持二进制数据',
			anchor: 'binary',
		},
		{
			type: 'new',
			name: 'binary.meta / compare / clone',
			category: 'Binary',
			description:
				'File metadata extraction, binary comparison, cloning, and download utilities',
			descriptionZh: '文件元数据提取、二进制比较、克隆和下载工具',
			anchor: 'binary',
		},
		{
			type: 'new',
			name: 'Type detection',
			category: 'Binary',
			description: 'isBlob, isFile, isArrayBuffer, isDataURL, isBase64 type guards',
			descriptionZh: 'isBlob、isFile、isArrayBuffer、isDataURL、isBase64 类型守卫',
			anchor: 'binary',
		},

		// Breaking Changes
		{
			type: 'breaking',
			name: 'client → ua',
			category: 'Url',
			description:
				'Renamed client to ua. client is now deprecated and will be removed in v7.0.0',
			descriptionZh: 'client 重命名为 ua。client 已废弃，将在 v7.0.0 中移除',
			anchor: 'ua',
		},
		{
			type: 'breaking',
			name: 'Module system',
			category: 'Core',
			description: 'Switched to ESM-first with CJS compatibility',
			descriptionZh: '切换到 ESM 优先，保持 CJS 兼容',
		},
		{
			type: 'breaking',
			name: 'getAppVersion / getOsVersion',
			category: 'Url',
			description: 'Removed deprecated functions. Use appVersion and osVersion instead',
			descriptionZh: '移除废弃函数。请使用 appVersion 和 osVersion',
		},

		// IE11 Compatibility
		{
			type: 'new',
			name: 'IE11 Compatibility',
			category: 'Core',
			description:
				'Built-in IE11 support without external polyfills. All methods work in IE11 through internal compatibility layer',
			descriptionZh:
				'内置 IE11 支持，无需外部 polyfill。所有方法通过内部兼容层在 IE11 中运行',
		},
		{
			type: 'update',
			name: 'base64ToFile',
			category: 'Convert',
			description:
				'Return type changed from File to File | Blob (IE11 returns Blob with name property)',
			descriptionZh: '返回类型从 File 改为 File | Blob（IE11 返回带 name 属性的 Blob）',
			anchor: 'base64tofile',
		},

		// New Features - UA Detector
		{
			type: 'new',
			name: 'ua',
			category: 'Url',
			description:
				'New comprehensive User-Agent detector with browser, OS, device, network, screen detection',
			descriptionZh: '全新的 User-Agent 检测器，支持浏览器、操作系统、设备、网络、屏幕检测',
			anchor: 'ua',
		},
		{
			type: 'new',
			name: 'Url class & url namespace',
			category: 'Url',
			description:
				'Chainable URL builder and URLSearchParams-like API for URL parsing and manipulation',
			descriptionZh: '链式 URL 构建器和类 URLSearchParams API，用于 URL 解析和操作',
			anchor: 'url',
		},
		{
			type: 'new',
			name: 'Chinese app detection',
			category: 'Url',
			description:
				'Detect WeChat, QQ, Weibo, Alipay, DingTalk, Douyin, Kuaishou, Baidu, Xiaomi, Huawei, Vivo, Oppo, UC, Quark',
			descriptionZh:
				'检测微信、QQ、微博、支付宝、钉钉、抖音、快手、百度、小米、华为、Vivo、Oppo、UC、夸克',
		},
		{
			type: 'new',
			name: 'OS detection',
			category: 'Url',
			description: 'HarmonyOS, iPadOS detection, improved iOS/Android detection',
			descriptionZh: '鸿蒙、iPadOS 检测，改进的 iOS/Android 检测',
		},

		// New Features - String
		{
			type: 'new',
			name: 'truncate',
			category: 'String',
			description: 'Truncate string with multiple options (length, separator, omission)',
			descriptionZh: '截断字符串，支持多种选项（长度、分隔符、省略号）',
			anchor: 'truncate',
		},
		{
			type: 'new',
			name: 'kebabCase / snakeCase',
			category: 'String',
			description: 'Convert string to kebab-case or snake_case',
			descriptionZh: '将字符串转换为短横线或下划线格式',
			anchor: 'kebabcase',
		},
		{
			type: 'new',
			name: 'capitalize / lowerFirst',
			category: 'String',
			description: 'Capitalize first letter (rest lowercase) or convert first letter to lowercase',
			descriptionZh: '首字母大写（其余小写）或首字母小写',
			anchor: 'capitalize',
		},

		// New Features - Array
		{
			type: 'new',
			name: 'chunk',
			category: 'Array',
			description: 'Split array into chunks of specified size',
			descriptionZh: '将数组分割成指定大小的块',
			anchor: 'chunk',
		},
		{
			type: 'new',
			name: 'flatten / flattenDeep',
			category: 'Array',
			description: 'Flatten array one level or recursively to any depth',
			descriptionZh: '扁平化数组（单层或递归到任意深度）',
			anchor: 'flatten',
		},
		{
			type: 'new',
			name: 'groupBy / keyBy',
			category: 'Array',
			description: 'Group array items by key or transform to object by key',
			descriptionZh: '按键分组数组元素或将数组转换为对象',
			anchor: 'groupby',
		},
		{
			type: 'new',
			name: 'sample / sampleSize',
			category: 'Array',
			description: 'Get random element(s) from array',
			descriptionZh: '从数组中获取随机元素',
			anchor: 'sample',
		},
		{
			type: 'new',
			name: 'countBy / partition',
			category: 'Array',
			description: 'Count items by key or split array into two groups by predicate',
			descriptionZh: '按键计数或根据条件将数组分成两组',
			anchor: 'countby',
		},
		{
			type: 'new',
			name: 'findIndex / findLastIndex',
			category: 'Array',
			description: 'Find first or last index matching predicate (supports object, array, string predicates)',
			descriptionZh: '查找第一个或最后一个匹配的索引（支持对象、数组、字符串谓词）',
			anchor: 'findindex',
		},
		{
			type: 'new',
			name: 'drop / dropRight / take / takeRight',
			category: 'Array',
			description: 'Drop or take elements from start or end of array',
			descriptionZh: '从数组开头或末尾删除或提取元素',
			anchor: 'drop',
		},
		{
			type: 'new',
			name: 'differenceBy / intersectionBy / unionBy',
			category: 'Array',
			description: 'Set operations with iteratee function',
			descriptionZh: '带迭代函数的集合操作',
			anchor: 'differenceby',
		},
		{
			type: 'new',
			name: 'zip / unzip',
			category: 'Array',
			description: 'Combine arrays element-wise or separate combined arrays',
			descriptionZh: '按元素组合数组或分离组合的数组',
			anchor: 'zip',
		},

		// New Features - Object
		{
			type: 'new',
			name: 'omit / pick',
			category: 'Object',
			description: 'Create object with omitted or picked keys',
			descriptionZh: '创建省略或选取指定键的对象',
			anchor: 'omit',
		},
		{
			type: 'new',
			name: 'invert / mapKeys / mapValues',
			category: 'Object',
			description: 'Invert object keys/values, transform keys or values',
			descriptionZh: '反转对象键值、转换键或值',
			anchor: 'invert',
		},
		{
			type: 'new',
			name: 'cleanData',
			category: 'Object',
			description: 'Remove undefined, null, empty strings and specified keys from object',
			descriptionZh: '移除对象中的 undefined、null、空字符串和指定键',
			anchor: 'cleandata',
		},
		{
			type: 'new',
			name: 'searchObject',
			category: 'Object',
			description: 'Deep search object for matching keys or values',
			descriptionZh: '深度搜索对象中匹配的键或值',
			anchor: 'searchobject',
		},

		// New Features - Typecheck
		{
			type: 'new',
			name: 'isEmpty',
			category: 'Typecheck',
			description: 'Check if value is empty (null, undefined, empty string/array/object)',
			descriptionZh: '检查值是否为空（null、undefined、空字符串/数组/对象）',
			anchor: 'isempty',
		},
		{
			type: 'new',
			name: 'isNil',
			category: 'Typecheck',
			description: 'Check if value is null or undefined',
			descriptionZh: '检查值是否为 null 或 undefined',
			anchor: 'isnil',
		},
		{
			type: 'new',
			name: 'isWindow',
			category: 'Typecheck',
			description: 'Check if value is a Window object',
			descriptionZh: '检查值是否为 Window 对象',
			anchor: 'iswindow',
		},
		{
			type: 'new',
			name: 'isExitsFunction',
			category: 'Typecheck',
			description: 'Check if a function exists in global scope by path',
			descriptionZh: '检查全局作用域中是否存在指定路径的函数',
			anchor: 'isexitsfunction',
		},

		// New Features - Validate
		{
			type: 'new',
			name: 'isURL / isEmail',
			category: 'Validate',
			description: 'Validate URL and email format',
			descriptionZh: '验证 URL 和邮箱格式',
			anchor: 'isurl',
		},
		{
			type: 'new',
			name: 'isPhone / isIDCard',
			category: 'Validate',
			description: 'Validate Chinese phone number and ID card',
			descriptionZh: '验证中国手机号和身份证号',
			anchor: 'isphone',
		},
		{
			type: 'new',
			name: 'isCreditCard',
			category: 'Validate',
			description: 'Validate credit card number format',
			descriptionZh: '验证信用卡号格式',
			anchor: 'iscreditcard',
		},

		// New Features - Number
		{
			type: 'new',
			name: 'sum / average',
			category: 'Number',
			description: 'Calculate sum and average of array',
			descriptionZh: '计算数组的和与平均值',
			anchor: 'sum',
		},
		{
			type: 'new',
			name: 'round / clamp / inRange',
			category: 'Number',
			description: 'Round number, clamp to range, check if in range',
			descriptionZh: '四舍五入、限制范围、检查是否在范围内',
			anchor: 'round',
		},

		// New Features - Date
		{
			type: 'new',
			name: 'formatDate / relativeTime',
			category: 'Date',
			description: 'Format date with pattern, get relative time string',
			descriptionZh: '格式化日期，获取相对时间字符串',
			anchor: 'formatdate',
		},
		{
			type: 'new',
			name: 'dateDiff / getDaysInMonth / isToday',
			category: 'Date',
			description: 'Calculate date difference, get days in month, check if today',
			descriptionZh: '计算日期差值、获取月份天数、检查是否为今天',
			anchor: 'datediff',
		},
		{
			type: 'new',
			name: 'isYesterday / isTomorrow / isWeekend',
			category: 'Date',
			description: 'Check if date is yesterday, tomorrow, or weekend',
			descriptionZh: '检查日期是否为昨天、明天或周末',
			anchor: 'isyesterday',
		},
		{
			type: 'new',
			name: 'isLeapYear / isBefore / isAfter / isSame / isBetween',
			category: 'Date',
			description: 'Leap year check, date comparison, and range check',
			descriptionZh: '闰年检查、日期比较和范围检查',
			anchor: 'isleapyear',
		},
		{
			type: 'new',
			name: 'getQuarter / getDayOfYear / getWeekOfYear',
			category: 'Date',
			description: 'Get quarter, day of year, week of year',
			descriptionZh: '获取季度、年度第几天、年度第几周',
			anchor: 'getquarter',
		},

		// New Features - Color
		{
			type: 'new',
			name: 'rgbToHSL / hexToRGB',
			category: 'Color',
			description: 'Convert between RGB, HSL and hex color formats',
			descriptionZh: 'RGB、HSL 和十六进制颜色格式转换',
			anchor: 'rgbtohsl',
		},
		{
			type: 'new',
			name: 'lighten / darken / isLightColor',
			category: 'Color',
			description: 'Lighten or darken color, check if color is light',
			descriptionZh: '变亮或变暗颜色，检查颜色是否为浅色',
			anchor: 'lighten',
		},

		// New Features - Scroll
		{
			type: 'new',
			name: 'scroll module',
			category: 'Scroll',
			description:
				'Comprehensive scroll utilities: getPosition, getProgress, createDirectionTracker, isInViewport',
			descriptionZh: '全面滚动工具：获取位置、进度、方向追踪、视口检测',
			anchor: 'scroll',
		},
		{
			type: 'new',
			name: 'scrollTo / scrollToTop / scrollToBottom / scrollBy',
			category: 'Scroll',
			description: 'Scroll navigation functions with smooth behavior support',
			descriptionZh: '滚动导航函数，支持平滑滚动',
			anchor: 'scrollto',
		},
		{
			type: 'new',
			name: 'lockScroll / unlockScroll / toggleScroll',
			category: 'Scroll',
			description: 'Lock scroll for modals and overlays',
			descriptionZh: '锁定滚动，适用于模态框和覆盖层',
			anchor: 'lockscroll',
		},

		// New Features - Utility
		{
			type: 'new',
			name: 'debounce / throttle',
			category: 'Utility',
			description: 'Debounce and throttle functions with flush support',
			descriptionZh: '防抖和节流函数，支持立即执行',
			anchor: 'debounce',
		},
		{
			type: 'new',
			name: 'getGlobal',
			category: 'Utility',
			description: 'Safely get global values by path (CSP-compliant)',
			descriptionZh: '安全地通过路径获取全局变量（CSP 兼容）',
			anchor: 'getglobal',
		},
		{
			type: 'new',
			name: 'retry',
			category: 'Utility',
			description: 'Retry async function with configurable attempts',
			descriptionZh: '可配置重试次数的异步函数重试',
			anchor: 'retry',
		},
		{
			type: 'new',
			name: 'delay',
			category: 'Async',
			description: 'Promise-based setTimeout for async/await',
			descriptionZh: '基于 Promise 的 setTimeout，支持 async/await',
			anchor: 'delay',
		},
		{
			type: 'new',
			name: 'waiting',
			category: 'Async',
			description: 'Wait until a condition is true (polling-based)',
			descriptionZh: '等待条件成立（基于轮询）',
			anchor: 'waiting',
		},
		{
			type: 'new',
			name: 'promiseFactory',
			category: 'Async',
			description: 'Create a promise with external resolve/reject control',
			descriptionZh: '创建可外部控制 resolve/reject 的 Promise',
			anchor: 'promisefactory',
		},
		{
			type: 'new',
			name: 'punctualTimer',
			category: 'Async',
			description: 'Execute callback at precise intervals (second, minute, hour)',
			descriptionZh: '在精确的时间间隔执行回调（秒、分、时）',
			anchor: 'punctualtimer',
		},

		// Breaking Changes - Storage
		{
			type: 'breaking',
			name: 'Storage API redesign',
			category: 'Storage',
			description:
				'Individual storage functions replaced by unified `storage` namespace with local, session, cookie',
			descriptionZh:
				'独立的存储函数被统一的 `storage` 命名空间替代，包含 local、session、cookie',
			anchor: 'storage',
		},
		{
			type: 'new',
			name: 'storage namespace',
			category: 'Storage',
			description:
				'Unified storage API with expiration support, generic types, and error handling',
			descriptionZh: '统一的存储 API，支持过期时间、泛型类型和错误处理',
			anchor: 'storage',
		},
		{
			type: 'new',
			name: 'StorageQuotaError / StorageUnavailableError',
			category: 'Storage',
			description:
				'Proper error classes for storage quota exceeded and unavailable scenarios',
			descriptionZh: '存储空间已满和不可用场景的错误类',
			anchor: 'storage',
		},
	],
}

export function getChangesByType(type: ChangeItem['type']): ChangeItem[] {
	return changelog.changes.filter(item => item.type === type)
}

export function getChangesByCategory(category: string): ChangeItem[] {
	return changelog.changes.filter(item => item.category === category)
}
