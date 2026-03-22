<script setup lang="ts">
import { version } from 'js-cool'
import { ref, computed } from 'vue'
import { NCard, NH1, NH2, NTag, NButton, NIcon, NGrid, NGi, NSpace, NDivider } from 'naive-ui'
import {
	LogoGithub,
	CubeOutline,
	SparklesOutline,
	LeafOutline,
	ShieldCheckmarkOutline,
	FlashOutline,
	ArrowForwardOutline,
	CopyOutline,
	LinkOutline,
	RocketOutline,
} from '@vicons/ionicons5'
import FunctionCard from '@/components/FunctionCard.vue'
import CodePreview from '@/components/CodePreview.vue'
import { randomString, copy as copyText, uuid } from 'js-cool'
import { useI18n } from '@/locales'
import { changelog } from '@/data/changelog'

const { t, locale } = useI18n()

const categories = [
	{
		name: 'String',
		path: 'string',
		count: 15,
		descriptionEn: 'camel2Dash, dash2Camel, upperFirst...',
		descriptionZh: '驼峰转短横线、短横线转驼峰、首字母大写...',
	},
	{
		name: 'Array',
		path: 'array',
		count: 19,
		descriptionEn: 'unique, shuffle, chunk, groupBy...',
		descriptionZh: '数组去重、随机排序、分块、分组...',
	},
	{
		name: 'Object',
		path: 'object',
		count: 12,
		descriptionEn: 'clone, extend, getProperty...',
		descriptionZh: '对象克隆、扩展、获取属性...',
	},
	{
		name: 'Typecheck',
		path: 'typecheck',
		count: 13,
		descriptionEn: 'isArray, isObject, isDate...',
		descriptionZh: '数组判断、对象判断、日期判断...',
	},
	{
		name: 'Validate',
		path: 'validate',
		count: 5,
		descriptionEn: 'isEmail, isPhone, isURL...',
		descriptionZh: '邮箱验证、手机验证、URL验证...',
	},
	{
		name: 'Url',
		path: 'url',
		count: 13,
		descriptionEn: 'getUrlParams, client, osVersion...',
		descriptionZh: '获取URL参数、客户端信息、系统版本...',
	},
	{
		name: 'Dom',
		path: 'dom',
		count: 14,
		descriptionEn: 'copy, addEvent, windowSize...',
		descriptionZh: '复制、事件绑定、窗口尺寸...',
	},
	{
		name: 'Storage',
		path: 'storage',
		count: 10,
		descriptionEn: 'setCache, getCache, setCookie...',
		descriptionZh: '设置缓存、获取缓存、设置Cookie...',
	},
	{
		name: 'Convert',
		path: 'convert',
		count: 12,
		descriptionEn: 'base64ToBlob, fileToBase64...',
		descriptionZh: 'Base64转Blob、文件转Base64...',
	},
	{
		name: 'Number',
		path: 'number',
		count: 7,
		descriptionEn: 'clamp, round, sum, average...',
		descriptionZh: '数值范围、四舍五入、求和、平均值...',
	},
	{
		name: 'Date',
		path: 'date',
		count: 5,
		descriptionEn: 'formatDate, dateDiff, isToday...',
		descriptionZh: '格式化日期、日期差、判断今天...',
	},
	{
		name: 'Color',
		path: 'color',
		count: 6,
		descriptionEn: 'hexToRGB, RGBToHex, randomColor...',
		descriptionZh: '十六进制转RGB、RGB转十六进制、随机颜色...',
	},
	{
		name: 'Utility',
		path: 'utility',
		count: 15,
		descriptionEn: 'uuid, randomString, delay...',
		descriptionZh: 'UUID生成、随机字符串、延迟...',
	},
	{
		name: 'Async',
		path: 'async',
		count: 4,
		descriptionEn: 'debounce, throttle, retry...',
		descriptionZh: '防抖、节流、重试...',
	},
	{
		name: 'Encode',
		path: 'encode',
		count: 4,
		descriptionEn: 'encodeBase64, decodeBase64...',
		descriptionZh: 'Base64编码、Base64解码...',
	},
	{
		name: 'Network',
		path: 'network',
		count: 1,
		descriptionEn: 'fillIPv6...',
		descriptionZh: 'IPv6补全...',
	},
]

const totalFunctions = categories.reduce((sum, c) => sum + c.count, 0)

const randomLen = ref(16)
const randomResult = ref(randomString(16))
const uuidResult = ref(uuid())

const generateRandom = () => {
	randomResult.value = randomString(randomLen.value)
}

const generateUuid = () => {
	uuidResult.value = uuid()
}

const copyResult = async () => {
	await copyText(randomResult.value)
}

const copyUuid = async () => {
	await copyText(uuidResult.value)
}

const installCode = 'pnpm add js-cool'
const importCode = `import { randomString, copy, formatDate } from 'js-cool'

randomString(16)          // 'aB3dE7fG9hJ2kL5m'
await copy('Hello World') // Copy to clipboard
formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')`

const cdnCode = `<script src="https://unpkg.com/js-cool/dist/index.iife.min.js"><\/script>
<script>
  const { randomString, copy } = window.jsCool
<\/script>`

const features = computed(() => [
	{
		icon: CubeOutline,
		title: t.value.features.utilities.title,
		description: t.value.features.utilities.description,
	},
	{
		icon: SparklesOutline,
		title: t.value.features.typescript.title,
		description: t.value.features.typescript.description,
	},
	{
		icon: LeafOutline,
		title: t.value.features.treeShaking.title,
		description: t.value.features.treeShaking.description,
	},
	{
		icon: FlashOutline,
		title: t.value.features.zeroDeps.title,
		description: t.value.features.zeroDeps.description,
	},
	{
		icon: ShieldCheckmarkOutline,
		title: t.value.features.tested.title,
		description: t.value.features.tested.description,
	},
])

const getCategoryDescription = (cat: (typeof categories)[0]) => {
	return locale.value === 'zh' ? cat.descriptionZh : cat.descriptionEn
}
</script>

<template>
	<div>
		<!-- Hero -->
		<div style="text-align: center; padding: 32px 0">
			<n-tag type="primary" round style="margin-bottom: 16px">v{{ version }}</n-tag>
			<n-h1 style="margin: 0">js-cool</n-h1>
			<p style="font-size: 18px; color: #666; max-width: 600px; margin: 16px auto">
				{{ t.heroDescription }}
			</p>
			<n-space justify="center" style="margin-top: 24px">
				<n-button
					tag="a"
					href="https://github.com/saqqdy/js-cool"
					target="_blank"
					secondary
				>
					<template #icon
						><n-icon><LogoGithub /></n-icon
					></template>
					{{ t.github }}
				</n-button>
				<n-button
					tag="a"
					href="https://stackblitz.com/github/saqqdy/js-cool/tree/master/examples?terminal=dev"
					target="_blank"
					type="primary"
				>
					<template #icon
						><n-icon><FlashOutline /></n-icon
					></template>
					{{ t.tryInStackblitz }}
				</n-button>
			</n-space>
		</div>

		<!-- Features -->
		<n-grid
			:cols="5"
			:x-gap="16"
			:y-gap="16"
			responsive="screen"
			item-responsive
			style="margin-bottom: 32px"
		>
			<n-gi v-for="feature in features" :key="feature.title" span="5 m:1">
				<n-card size="small" style="text-align: center">
					<n-icon
						:component="feature.icon"
						size="32"
						color="#18a058"
						style="margin-bottom: 8px"
					/>
					<div style="font-weight: 600">{{ feature.title }}</div>
					<p style="font-size: 12px; color: #999; margin: 4px 0 0">
						{{ feature.description }}
					</p>
				</n-card>
			</n-gi>
		</n-grid>

		<!-- What's New -->
		<router-link to="/changelog" style="text-decoration: none; color: inherit">
			<n-card
				size="small"
				hoverable
				style="
					margin-bottom: 32px;
					background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
					border: 1px solid #667eea30;
					cursor: pointer;
				"
			>
				<div style="display: flex; justify-content: space-between; align-items: center">
					<div style="display: flex; align-items: center; gap: 12px">
						<n-icon size="24" color="#667eea"><RocketOutline /></n-icon>
						<div>
							<div style="font-weight: 600; font-size: 15px">
								{{ t.whatsNew }}
								<n-tag size="small" type="primary" round
									>v{{ changelog.version }}</n-tag
								>
							</div>
							<p style="font-size: 12px; color: #666; margin: 4px 0 0">
								{{ locale === 'zh' ? changelog.summaryZh : changelog.summary }}
							</p>
						</div>
					</div>
					<n-icon style="color: #667eea"><ArrowForwardOutline /></n-icon>
				</div>
			</n-card>
		</router-link>

		<!-- Quick Start -->
		<n-h2>{{ t.quickStart }}</n-h2>
		<n-grid :cols="2" :x-gap="16" responsive="screen" item-responsive>
			<n-gi span="2 m:1">
				<n-card :title="t.packageManager" size="small">
					<code-preview :code="installCode" />
					<code-preview :code="importCode" style="margin-top: 12px" />
				</n-card>
			</n-gi>
			<n-gi span="2 m:1">
				<n-card :title="t.cdn" size="small">
					<code-preview :code="cdnCode" />
				</n-card>
			</n-gi>
		</n-grid>

		<!-- Interactive Demos -->
		<n-h2>{{ t.tryItOut }}</n-h2>
		<n-grid :cols="2" :x-gap="16" responsive="screen" item-responsive>
			<n-gi span="2 m:1">
				<FunctionCard
					title="randomString"
					:description="
						locale === 'zh'
							? '生成指定长度的随机字符串'
							: 'Generate a random string with specified length'
					"
					:result="randomResult"
					:code="`randomString(${randomLen}) // '${randomResult}'`"
				>
					<template #input>
						<n-space>
							<n-input-number
								v-model:value="randomLen"
								:min="1"
								:max="64"
								style="width: 100px"
							/>
							<span style="color: #999">{{ t.characters }}</span>
							<n-button size="small" @click="generateRandom">{{
								t.generate
							}}</n-button>
							<n-button size="small" secondary @click="copyResult">
								<template #icon
									><n-icon><CopyOutline /></n-icon
								></template>
								{{ t.copy }}
							</n-button>
						</n-space>
					</template>
				</FunctionCard>
			</n-gi>
			<n-gi span="2 m:1">
				<FunctionCard
					title="uuid"
					:description="locale === 'zh' ? '生成 UUID v4' : 'Generate a UUID v4'"
					:result="uuidResult"
					:code="`uuid() // '${uuidResult}'`"
				>
					<template #input>
						<n-space>
							<n-button size="small" @click="generateUuid">{{ t.generate }}</n-button>
							<n-button size="small" secondary @click="copyUuid">
								<template #icon
									><n-icon><CopyOutline /></n-icon
								></template>
								{{ t.copy }}
							</n-button>
						</n-space>
					</template>
				</FunctionCard>
			</n-gi>
		</n-grid>

		<!-- Categories -->
		<n-h2>{{ t.allCategories }}</n-h2>
		<p style="color: #666; margin-bottom: 16px">
			<strong>{{ totalFunctions }}+</strong> {{ t.functionsIn }}
			<strong>{{ categories.length }}</strong> {{ t.categoriesWord }}
		</p>
		<n-grid :cols="4" :x-gap="12" :y-gap="12" responsive="screen" item-responsive>
			<n-gi v-for="cat in categories" :key="cat.path" span="4 s:2 m:1">
				<router-link :to="`/${cat.path}`" style="text-decoration: none; color: inherit">
					<n-card size="small" hoverable style="cursor: pointer">
						<div
							style="
								display: flex;
								justify-content: space-between;
								align-items: center;
							"
						>
							<div>
								<span style="font-weight: 500">{{ cat.name }}</span>
								<n-tag size="small" type="info" style="margin-left: 8px">{{
									cat.count
								}}</n-tag>
							</div>
							<n-icon><ArrowForwardOutline /></n-icon>
						</div>
						<p style="font-size: 12px; color: #999; margin: 4px 0 0">
							{{ getCategoryDescription(cat) }}
						</p>
					</n-card>
				</router-link>
			</n-gi>
		</n-grid>

		<!-- Links -->
		<n-divider />
		<n-space justify="center">
			<n-button tag="a" href="https://github.com/saqqdy/js-cool" target="_blank" secondary>
				<template #icon
					><n-icon><LogoGithub /></n-icon
				></template>
				{{ t.viewOnGithub }}
			</n-button>
			<n-button
				tag="a"
				href="https://www.npmjs.com/package/js-cool"
				target="_blank"
				secondary
			>
				<template #icon
					><n-icon><LinkOutline /></n-icon
				></template>
				{{ t.viewOnNpm }}
			</n-button>
		</n-space>
	</div>
</template>
