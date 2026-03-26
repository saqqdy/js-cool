export default {
	// App
	search: '搜索...',
	home: '首页',
	categories: '分类',
	github: 'GitHub',

	// Home
	heroDescription: '常用 JavaScript / TypeScript 工具函数集合',
	tryInStackblitz: '在 StackBlitz 中尝试',
	features: {
		utilities: { title: '140+ 工具函数', description: '字符串、数组、对象、日期等' },
		typescript: { title: 'TypeScript 原生', description: '完整的类型定义' },
		treeShaking: { title: 'Tree Shaking', description: '按需引入' },
		zeroDeps: { title: '零依赖', description: '轻量级体积' },
		tested: { title: '完善测试', description: '全面覆盖测试' },
	},
	quickStart: '快速开始',
	packageManager: '包管理器',
	cdn: 'CDN',
	tryItOut: '试试看',
	characters: '字符',
	generate: '生成',
	copy: '复制',
	allCategories: '所有分类',
	functionsIn: '个函数，分布在',
	categoriesWord: '个分类',
	viewOnGithub: '在 GitHub 上查看',
	viewOnNpm: '在 npm 上查看',
	whatsNew: '最新更新',

	// FunctionCard
	result: '结果',
	example: '示例',

	// Category descriptions
	categoriesDesc: {
		Changelog: '最新版本更新和变更',
		String: '字符串处理工具',
		Array: '数组处理工具',
		Object: '对象处理工具',
		Typecheck: '类型检查工具',
		Validate: '验证工具',
		Url: 'URL 和浏览器工具',
		Dom: 'DOM 操作工具',
		Scroll: '滚动工具，处理滚动相关操作',
		Storage: '存储工具',
		Convert: '转换工具',
		Number: '数字工具',
		Date: '日期工具',
		Color: '颜色工具',
		Utility: '通用工具函数',
		Async: '异步工具',
		Encode: '编码工具',
		Network: '网络工具',
	},

	// String functions
	string: {
		camel2DashDesc: '驼峰与短横线格式互转',
		upperFirstDesc: '首字母大写',
		kebabSnakeDesc: '转换为短横线或下划线格式',
		truncateDesc: '截断字符串（支持多种选项）',
		clearHtmlDesc: '移除 HTML 标签或属性',
		escapeDesc: '转义/反转义 HTML 特殊字符',
		chsDesc: '处理中文字符（中文=2字节）',
		mapTemplateDesc: '模板字符串插值',
		bytes: '字节',
	},

	// Array functions
	array: {
		uniqueDesc: '数组去重',
		shuffleDesc: '随机打乱数组或字符串，可限制长度',
		chunkDesc: '将数组分割成块',
		flattenDesc: '扁平化嵌套数组',
		sampleDesc: '从数组中获取随机元素',
		setOpsDesc: '交集、并集、差集、补集',
		checkDesc: '检查数组元素',
		groupByDesc: '按键分组数组元素',
		sortPinyinDesc: '按拼音排序中文',
		sorterDesc: '创建按属性排序的函数（支持升序/降序）',
		keyByDesc: '将数组转换为以属性为键的对象',
		sampleOne: '随机取一个',
		sampleSize: '随机取多个',
	},

	// Number functions
	number: {
		clampDesc: '将数值限制在范围内',
		roundDesc: '四舍五入到指定小数位',
		sumAvgDesc: '计算数组的和与平均值',
		inRangeDesc: '检查数值是否在范围内',
		toThousandsDesc: '数字千分位格式化',
		fixNumberDesc: '固定小数位，去除末尾零',
		getNumberDesc: '从字符串中提取数字',
		randomNumberDesc: '生成指定范围内的随机数',
		randomNumbersDesc: '生成总和固定的随机数数组',
		sum: '和',
		days: '天',
		leapYear: '闰年',
	},

	// Date functions
	date: {
		formatDesc:
			'格式化日期（支持: YYYY, YY, MM, M, DD, D, HH, H, hh, h, mm, m, ss, s, SSS, A/a）',
		diffDesc: '计算日期之间的差值',
		relativeDesc: '获取相对时间字符串（支持: en, zh 语言）',
		isTodayDesc: '检查日期是否为今天',
		daysInMonthDesc: '获取月份的天数',
		yesterdayTomorrowDesc: '检查日期是否为昨天或明天',
		weekendDesc: '检查日期是否为周末（周六或周日）',
		leapYearDesc: '检查年份是否为闰年',
		compareDesc: '比较两个日期的先后关系',
		betweenDesc: '检查日期是否在指定范围内',
		dateInfoDesc: '获取日期的季度、年度第几天、年度第几周',
		addSubtractDesc: '对日期进行加减操作',
		startEndDesc: '获取时间段的开始或结束',
		chainDesc: '链式日期操作 API',
		minMaxDesc: '比较日期并找出最小/最大值',
		to: '至',
	},

	// Scroll functions
	scroll: {
		getPositionDesc: '获取滚动位置状态（顶部、底部或中间）',
		getProgressDesc: '获取滚动进度百分比（0-100）',
		directionDesc: '追踪滚动方向（向上、向下或无变化）',
		viewportDesc: '检测元素是否在视口内（支持偏移量设置）',
		scrollToDesc: '滚动到指定元素或位置（支持偏移量和滚动行为）',
		topBottomDesc: '滚动到页面顶部或底部',
		scrollByDesc: '按指定量滚动（正数向下，负数向上）',
		lockDesc: '锁定/解锁/切换滚动状态（适用于弹窗场景）',
		scrollbarWidthDesc: '获取滚动条宽度（像素）',
	},

	// Common
	convert: '转换',
	html: 'html',
	chinese: '中文',
	set: '集合',
	predicate: '判断',

	// Url functions
	url: {
		classChainBuildTitle: 'Url 类 - 链式构建',
		classChainBuildDesc: '使用 Url 类链式构建 URL，支持参数操作、路径设置、hash 操作',
		classPropertiesTitle: 'Url 类 - URL 属性访问',
		classPropertiesDesc:
			'获取 URL 的各个组成部分（origin, host, hostname, pathname, search, hash）',
		classParamsTitle: 'Url 类 - search/hash 参数操作',
		classParamsDesc: '同时操作 search（#前）和 hash（#后）参数，支持 scope 控制',
		toDetailObjectDesc: '获取详细的参数信息，区分参数来源（search/hash/both）',
		chainModifyTitle: 'Url 链式修改',
		chainModifyDesc: '链式修改 URL 参数、路径、hash',
		hashParamsTitle: 'Hash 参数处理',
		hashParamsDesc: '专门处理 hash（#后）参数的场景',
		parseStringifyTitle: 'Url.parse() / Url.stringify()',
		parseStringifyDesc: '解析和构建查询字符串（静态方法或独立函数）',
		extractTitle: 'URL 属性提取函数',
		extractDesc: '从 URL 字符串中提取各个组成部分',
		getDirParamsDesc: '解析 URL 路径信息，返回结构化的组成部分',
		staticFactoryTitle: 'Url 静态工厂方法',
		staticFactoryDesc: '从当前页面 URL 或查询字符串创建 Url 实例',
		uaTitle: 'ua (User Agent 检测)',
		uaDesc: '全面的 User Agent 检测 - 设备、系统、浏览器、环境',
		browserOsVersionDesc: '获取浏览器和系统信息',
		compareVersionDesc: '比较版本号',
		nextVersionDesc: '获取下一个版本号',
		notBrowserEnv: 'null (非浏览器环境)',
	},

	// Date functions additional
	dateMore: {
		year: '年',
		month: '月',
		selectDate: '选择日期',
		dateLabel: '日期',
		rangeLabel: '范围',
	},

	// Changelog
	changelog: {
		title: '更新日志',
		migrationGuide: '迁移指南 v5 → v6',
		clickHint: '提示：点击条目可跳转到对应方法的详细用法',
		added: '新增',
		changed: '更新',
		fixed: '修复',
		breaking: '破坏性变更',
	},

	// Home
	homeMore: {
		generateRandomString: '生成指定长度的随机字符串',
		generateUUID: '生成 UUID v4',
	},

	// Validate
	validate: {
		chineseTest: '中文测试',
	},
}
