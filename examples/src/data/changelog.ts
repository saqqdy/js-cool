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
  changes: ChangeItem[]
}

export const changelog: ChangelogData = {
  version: version || '6.0.0-beta.1',
  date: '2025-03',
  summary: 'Major update: new UA detector module, 40+ new utilities, deprecated client module',
  summaryZh: '重大更新：新增 UA 检测模块，40+ 新工具函数，废弃 client 模块',
  changes: [
    // Breaking Changes
    {
      type: 'breaking',
      name: 'client → ua',
      category: 'Url',
      description: 'Renamed client to ua. client is now deprecated and will be removed in v7.0.0',
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

    // New Features - UA Detector
    {
      type: 'new',
      name: 'ua',
      category: 'Url',
      description: 'New comprehensive User-Agent detector with browser, OS, device, network detection',
      descriptionZh: '全新的 User-Agent 检测器，支持浏览器、操作系统、设备、网络检测',
      anchor: 'ua',
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

    // New Features - Object
    {
      type: 'new',
      name: 'omit / pick',
      category: 'Object',
      description: 'Create object with omitted or picked keys',
      descriptionZh: '创建省略或选取指定键的对象',
      anchor: 'omit',
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
      name: 'retry',
      category: 'Utility',
      description: 'Retry async function with configurable attempts',
      descriptionZh: '可配置重试次数的异步函数重试',
      anchor: 'retry',
    },

  ],
}

export function getChangesByType(type: ChangeItem['type']): ChangeItem[] {
  return changelog.changes.filter((item) => item.type === type)
}

export function getChangesByCategory(category: string): ChangeItem[] {
  return changelog.changes.filter((item) => item.category === category)
}
