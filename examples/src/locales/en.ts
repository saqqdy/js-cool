export default {
	// App
	search: 'Search...',
	home: 'Home',
	categories: 'Categories',
	github: 'GitHub',

	// Home
	heroDescription: 'Collection of common JavaScript / TypeScript utilities',
	tryInStackblitz: 'Try in StackBlitz',
	features: {
		utilities: {
			title: '140+ Utilities',
			description: 'String, array, object, date, and more',
		},
		typescript: { title: 'TypeScript Native', description: 'Full type definitions' },
		treeShaking: { title: 'Tree Shaking', description: 'Import only what you need' },
		zeroDeps: { title: 'Zero Dependencies', description: 'Lightweight footprint' },
		tested: { title: 'Well Tested', description: 'Comprehensive coverage' },
	},
	quickStart: 'Quick Start',
	packageManager: 'Package Manager',
	cdn: 'CDN',
	tryItOut: 'Try it out',
	characters: 'characters',
	generate: 'Generate',
	copy: 'Copy',
	allCategories: 'All Categories',
	functionsIn: 'functions in',
	categoriesWord: 'categories',
	viewOnGithub: 'View on GitHub',
	viewOnNpm: 'View on npm',
	whatsNew: "What's New",

	// FunctionCard
	result: 'Result',
	example: 'Example',

	// Category descriptions
	categoriesDesc: {
		Changelog: 'Latest version updates and changes',
		String: 'String manipulation utilities',
		Array: 'Array manipulation utilities',
		Object: 'Object manipulation utilities',
		Typecheck: 'Type checking utilities',
		Validate: 'Validation utilities',
		Url: 'URL and browser utilities',
		Dom: 'DOM manipulation utilities',
		Scroll: 'Scroll utilities for handling scroll-related operations',
		Storage: 'Storage utilities',
		Binary: 'Binary conversion utilities - Unified binary data handling API',
		Convert: 'Conversion utilities',
		Number: 'Number utilities',
		Date: 'Date utilities',
		Color: 'Color utilities',
		Utility: 'General utility functions',
		Async: 'Async utilities',
		Encode: 'Encoding utilities',
		Network: 'Network utilities',
	},

	// String functions
	string: {
		camel2DashDesc: 'Convert between camelCase and kebab-case',
		upperFirstDesc: 'Capitalize first letter',
		kebabSnakeDesc: 'Convert strings to kebab-case or snake_case',
		truncateDesc: 'Truncate string with multiple options',
		clearHtmlDesc: 'Remove HTML tags or attributes',
		escapeDesc: 'Escape/unescape HTML special characters',
		chsDesc: 'Handle Chinese characters (Chinese = 2 bytes)',
		mapTemplateDesc: 'Template string interpolation',
		bytes: 'bytes',
	},

	// Array functions
	array: {
		uniqueDesc: 'Remove duplicates from array',
		shuffleDesc: 'Shuffle array or string with optional size limit',
		chunkDesc: 'Split array into chunks',
		flattenDesc: 'Flatten nested array',
		sampleDesc: 'Get random element(s) from array',
		setOpsDesc: 'intersect, union, minus, complement',
		checkDesc: 'Check array elements',
		groupByDesc: 'Group array items by key',
		sortPinyinDesc: 'Sort Chinese by pinyin',
		sorterDesc: 'Create sort function by key (asc/desc)',
		keyByDesc: 'Convert array to object keyed by property',
		sampleOne: 'Sample One',
		sampleSize: 'Sample Size',
	},

	// Number functions
	number: {
		clampDesc: 'Clamp a number within a range',
		roundDesc: 'Round number to specified decimals',
		sumAvgDesc: 'Calculate sum and average of array',
		inRangeDesc: 'Check if number is within range',
		toThousandsDesc: 'Format number with thousands separator',
		fixNumberDesc: 'Fix number to decimals without trailing zeros',
		getNumberDesc: 'Extract number from string',
		randomNumberDesc: 'Generate random number in range',
		randomNumbersDesc: 'Generate random numbers with fixed sum',
		sum: 'sum',
		days: 'days',
		leapYear: 'leap year',
	},

	// Date functions
	date: {
		formatDesc:
			'Format date with pattern (supports: YYYY, YY, MM, M, DD, D, HH, H, hh, h, mm, m, ss, s, SSS, A/a)',
		diffDesc: 'Calculate difference between dates',
		relativeDesc: 'Get relative time string (supports: en, zh locales)',
		isTodayDesc: 'Check if date is today',
		daysInMonthDesc: 'Get number of days in month',
		yesterdayTomorrowDesc: 'Check if date is yesterday or tomorrow',
		weekendDesc: 'Check if date is weekend (Saturday or Sunday)',
		leapYearDesc: 'Check if year is a leap year',
		compareDesc: 'Compare two dates (before, after, same)',
		betweenDesc: 'Check if date is between two dates',
		dateInfoDesc: 'Get quarter, day of year, week of year',
		addSubtractDesc: 'Add or subtract time from a date',
		startEndDesc: 'Get start or end of a time period',
		chainDesc: 'Chainable date manipulation with DateParser',
		minMaxDesc: 'Compare dates and find min/max',
		to: 'to',
	},

	// Scroll functions
	scroll: {
		getPositionDesc: 'Get scroll position state (top, bottom, or undefined)',
		getProgressDesc: 'Get scroll progress as percentage (0-100)',
		directionDesc: 'Track scroll direction (up, down, or null)',
		viewportDesc: 'Check if element is in viewport',
		scrollToDesc: 'Scroll to element or position with offset and behavior options',
		topBottomDesc: 'Scroll to top or bottom of page',
		scrollByDesc: 'Scroll by specified amount (positive = down, negative = up)',
		lockDesc: 'Lock/unlock/toggle scroll (useful for modals)',
		scrollbarWidthDesc: 'Get scrollbar width in pixels',
	},

	// Common
	convert: 'convert',
	html: 'html',
	chinese: 'chinese',
	set: 'set',
	predicate: 'predicate',

	// Url functions
	url: {
		classChainBuildTitle: 'Url class - Chainable builder',
		classChainBuildDesc:
			'Build URLs using chainable Url class with params, path, and hash operations',
		classPropertiesTitle: 'Url class - URL properties',
		classPropertiesDesc: 'Get URL components (origin, host, hostname, pathname, search, hash)',
		classParamsTitle: 'Url class - search/hash params',
		classParamsDesc:
			'Operate on both search (before #) and hash (after #) params with scope control',
		toDetailObjectDesc: 'Get detailed params info with source tracking (search/hash/both)',
		chainModifyTitle: 'Url chain modification',
		chainModifyDesc: 'Chain modify URL params, path, and hash',
		hashParamsTitle: 'Hash params handling',
		hashParamsDesc: 'Handle hash (after #) params specifically',
		parseStringifyTitle: 'Url.parse() / Url.stringify()',
		parseStringifyDesc:
			'Parse and build query strings (static methods or standalone functions)',
		extractTitle: 'URL property extraction',
		extractDesc: 'Extract URL components from URL string',
		getDirParamsDesc: 'Parse URL path info and return structured components',
		staticFactoryTitle: 'Url static factory methods',
		staticFactoryDesc: 'Create Url instance from current page URL or query string',
		uaTitle: 'ua (User Agent Detection)',
		uaDesc: 'Comprehensive User Agent detection - device, OS, browser, environment',
		browserOsVersionDesc: 'Get browser and system info',
		compareVersionDesc: 'Compare version numbers',
		nextVersionDesc: 'Get next version number',
		notBrowserEnv: 'null (non-browser environment)',
	},

	// Date functions additional
	dateMore: {
		year: 'Year',
		month: 'Month',
		selectDate: 'Select date',
		dateLabel: 'Date',
		rangeLabel: 'Range',
	},

	// Changelog
	changelog: {
		title: 'Changelog',
		migrationGuide: 'Migration Guide v5 → v6',
		clickHint: 'Tip: Click an item to jump to the method details',
		added: 'Added',
		changed: 'Changed',
		fixed: 'Fixed',
		breaking: 'Breaking',
	},

	// Home
	homeMore: {
		generateRandomString: 'Generate a random string of specified length',
		generateUUID: 'Generate a UUID v4',
	},

	// Validate
	validate: {
		chineseTest: 'Chinese test',
	},

	// Binary functions
	binary: {
		typeDetection: 'Check if value is Blob, File, ArrayBuffer, DataURL, or Base64',
		parseDesc: 'Parse binary input and return type, MIME, size and other info',
		chainDesc:
			'Chainable conversion API supporting Blob, File, ArrayBuffer, Base64, DataURL, URL, SVG formats',
		base64Desc: 'Base64 encode/decode with Unicode support',
		textDesc: 'Text encoding/decoding with UTF-8 support',
		hexDesc: 'Hexadecimal encoding/decoding',
		blobDesc: 'Blob operations: conversion, concat, slice',
		arrayBufferDesc: 'ArrayBuffer operations: convert to Base64, Blob, string, hex',
		fileDesc: 'File operations: read Base64, ArrayBuffer, get metadata',
		hashDesc: 'Calculate MD5, SHA-1, SHA-256, CRC32 hash values',
		svgDesc: 'SVG string conversion: Blob, DataURL, URL',
		dataURLDesc: 'Data URL parsing and building',
		urlDesc: 'Fetch URL and convert to Blob or DataURL',
		compareCloneDesc: 'Compare binary data for equality, clone binary data',
		downloadDesc: 'Trigger browser download for binary data',
		fullApiDesc: 'Full API reference documentation',
	},
}
