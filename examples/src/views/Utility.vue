<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { NH1, NInput, NTag, NButton, NSpace, NInputNumber, NSelect, NSwitch, NCode } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import {
	uuid,
	randomString,
	nextIndex,
	getFileType,
	getGlobal,
	fingerprint,
	inBrowser,
	inNodeJs,
	isDarkMode,
	patterns,
	validation,
} from 'js-cool'
import type { RandomStringCharType } from 'js-cool'
import { useI18n } from '@/locales'

const { t } = useI18n()

const uuidResult = ref('')
const generateUuid = () => {
	uuidResult.value = uuid()
}

// randomString options
const rsLength = ref(16)
const rsCharTypes = ref<RandomStringCharType[]>(['uppercase', 'lowercase', 'number'])
const rsNoConfuse = ref(false)
const rsStrict = ref(false)
const rsSecure = ref(false)
const rsResult = ref('')

const charTypeOptions = [
	{ label: 'Uppercase (A-Z)', value: 'uppercase' },
	{ label: 'Lowercase (a-z)', value: 'lowercase' },
	{ label: 'Number (0-9)', value: 'number' },
	{ label: 'Special (!@#$...)', value: 'special' },
]

const rsCode = computed(() => {
	const options: string[] = []
	options.push(`length: ${rsLength.value}`)
	if (rsCharTypes.value.length === 1) {
		options.push(`charTypes: '${rsCharTypes.value[0]}'`)
	} else if (rsCharTypes.value.length < 3 || rsCharTypes.value.includes('special')) {
		options.push(`charTypes: ['${rsCharTypes.value.join("', '")}']`)
	}
	if (rsNoConfuse.value) options.push('noConfuse: true')
	if (rsStrict.value) options.push('strict: true')
	if (rsSecure.value) options.push('secure: true')

	if (
		options.length === 1 &&
		!rsNoConfuse.value &&
		!rsStrict.value &&
		!rsSecure.value &&
		rsCharTypes.value.length === 3
	) {
		return `randomString(${rsLength.value})`
	}
	return `randomString({\n  ${options.join(',\n  ')}\n})`
})

const generateRs = () => {
	rsResult.value = randomString({
		length: rsLength.value,
		charTypes:
			rsCharTypes.value.length > 0
				? (rsCharTypes.value as [RandomStringCharType, ...RandomStringCharType[]])
				: undefined,
		noConfuse: rsNoConfuse.value,
		strict: rsStrict.value,
		secure: rsSecure.value,
	})
}

const zIndex = ref(nextIndex() - 1)
const getNextIndex = () => {
	zIndex.value = nextIndex()
}

const fileTypeInput = ref('document.pdf')

// getGlobal
const globalPath = ref('JSON.parse')
const globalResult = computed(() => {
	const result = getGlobal(globalPath.value)
	if (result === undefined) return 'undefined'
	if (typeof result === 'function') return `ƒ ${result.name || 'anonymous'}()`
	return JSON.stringify(result)
})

const darkMode = ref(false)
const envInfo = ref({
	inBrowser: false,
	inNodeJs: false,
})

onMounted(() => {
	envInfo.value = {
		inBrowser: inBrowser,
		inNodeJs: inNodeJs,
	}
	darkMode.value = isDarkMode()
})
</script>

<template>
	<div>
		<n-h1>Utility</n-h1>
		<p style="color: #666; margin-bottom: 24px">{{ t.categoriesDesc.Utility }}</p>

		<!-- uuid -->
		<FunctionCard
			title="uuid"
			description="Generate UUID"
			since="1.0.9"
			:result="uuidResult || 'Click to generate'"
			:code="`uuid() // '550e8400-e29b-41d4-a716-446655440000'`"
		>
			<template #input>
				<n-button size="small" @click="generateUuid">Generate UUID</n-button>
			</template>
		</FunctionCard>

		<!-- randomString -->
		<FunctionCard
			title="randomString"
			description="Generate random string with various options, including secure mode for crypto-safe randomness"
			since="1.0.0"
			:code="`randomString() // default 32 chars
randomString(16) // 16 chars
randomString({ length: 6, charTypes: 'number' }) // '847291'
randomString({ length: 16, noConfuse: true }) // exclude confusing chars
randomString({ length: 16, strict: true }) // must include all char types
randomString({ length: 32, secure: true }) // crypto-safe (for tokens, passwords)`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center" :wrap="true">
						<span style="color: #999; font-size: 12px">length:</span>
						<n-input-number
							v-model:value="rsLength"
							style="width: 80px"
							:min="1"
							:max="128"
						/>
					</n-space>
					<n-space align="center" :wrap="true">
						<span style="color: #999; font-size: 12px">charTypes:</span>
						<n-select
							v-model:value="rsCharTypes"
							:options="charTypeOptions"
							multiple
							style="width: 280px"
							:max-tag-count="2"
						/>
					</n-space>
					<n-space align="center" :wrap="true">
						<span style="color: #999; font-size: 12px">noConfuse:</span>
						<n-switch v-model:value="rsNoConfuse" size="small" />
						<span style="color: #999; font-size: 12px; margin-left: 12px">strict:</span>
						<n-switch v-model:value="rsStrict" size="small" />
						<span style="color: #999; font-size: 12px; margin-left: 12px">secure:</span>
						<n-switch v-model:value="rsSecure" size="small" />
					</n-space>
					<n-space align="center">
						<n-button size="small" type="primary" @click="generateRs"
							>Generate</n-button
						>
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space vertical v-if="rsResult">
					<n-code :code="rsCode" language="javascript" />
					<n-tag type="info" style="font-family: monospace; font-size: 13px">{{
						rsResult
					}}</n-tag>
				</n-space>
				<n-tag v-else type="default">Click Generate to see result</n-tag>
			</template>
		</FunctionCard>

		<!-- nextIndex -->
		<FunctionCard
			title="nextIndex"
			description="Get next z-index (starting from 1000)"
			since="1.0.0"
			:result="zIndex"
			:code="`nextIndex() // 1001
nextIndex() // 1002`"
		>
			<template #input>
				<n-button size="small" @click="getNextIndex">Get Next Index</n-button>
			</template>
		</FunctionCard>

		<!-- getFileType -->
		<FunctionCard
			title="getFileType"
			description="Detect file type from extension"
			since="2.0.0"
			:result="getFileType(fileTypeInput)"
			:code="`getFileType('document.pdf') // 'pdf'
getFileType('image.png') // 'image'`"
		>
			<template #input>
				<n-input v-model:value="fileTypeInput" style="width: 200px" />
			</template>
		</FunctionCard>

		<!-- getGlobal -->
		<FunctionCard
			title="getGlobal"
			description="Safely get a global value by path (CSP-compliant)"
			since="6.0.0"
			:code="`getGlobal('JSON.parse')  // ƒ parse()
getGlobal('Number')      // ƒ Number()
getGlobal('console.log') // ƒ log()
getGlobal('nonExistent') // undefined`"
		>
			<template #input>
				<n-input
					v-model:value="globalPath"
					style="width: 200px"
					placeholder="Enter path..."
				/>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">getGlobal('{{ globalPath }}')</code>
						<n-tag type="info" size="small" :bordered="false">{{ globalResult }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- fingerprint -->
		<FunctionCard
			title="fingerprint"
			description="Generate browser fingerprint"
			since="2.0.0"
			:result="fingerprint()"
			:code="`fingerprint() // 'wc7sWJJA8'`"
		/>

		<!-- patterns - validation -->
		<FunctionCard
			title="patterns.validation"
			description="Validation regex patterns (NEW in v6.0.0)"
			since="6.0.0"
			:code="`import { validation } from 'js-cool'

validation.email.test('user@example.com') // true
validation.mobile.test('13800138000') // true
validation.url.test('https://example.com') // true
validation.ipv4.test('192.168.1.1') // true
validation.idCard.test('11010519491231002X') // true`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">validation.email.test('user@example.com')</code>
						<n-tag size="small" :bordered="false">{{
							validation.email.test('user@example.com')
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">validation.mobile.test('13800138000')</code>
						<n-tag size="small" :bordered="false">{{
							validation.mobile.test('13800138000')
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">validation.ipv4.test('192.168.1.1')</code>
						<n-tag size="small" :bordered="false">{{
							validation.ipv4.test('192.168.1.1')
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline"
							>validation.idCard.test('11010519491231002X')</code
						>
						<n-tag size="small" :bordered="false">{{
							validation.idCard.test('11010519491231002X')
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- patterns - UA detection -->
		<FunctionCard
			title="patterns.ua"
			description="UA detection patterns (NEW in v6.0.0)"
			since="6.0.0"
			:code="`import { DEVICE_PATTERNS, BROWSER_PATTERNS } from 'js-cool'

DEVICE_PATTERNS.mobile.test(navigator.userAgent)
BROWSER_PATTERNS.chrome.test(navigator.userAgent)
patterns.ua.getUserAgent()`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">patterns.ua.device.mobile.test(ua)</code>
						<n-tag size="small" :bordered="false">{{
							patterns.ua.device.mobile.test(patterns.ua.getUserAgent())
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">patterns.ua.browser.chrome.test(ua)</code>
						<n-tag size="small" :bordered="false">{{
							patterns.ua.browser.chrome.test(patterns.ua.getUserAgent())
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">patterns.ua.getUserAgent()</code>
						<n-tag
							size="small"
							:bordered="false"
							style="max-width: 300px; overflow: hidden; text-overflow: ellipsis"
						>
							{{ patterns.ua.getUserAgent().substring(0, 50) }}...
						</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- Environment -->
		<FunctionCard
			title="Environment Detection"
			description="Check runtime environment"
			since="1.0.0"
			:code="`inBrowser // true in browser
inNodeJs // true in Node.js
isDarkMode() // true if dark mode`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">inBrowser</code>
						<n-tag size="small" :bordered="false">{{ envInfo.inBrowser }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">inNodeJs</code>
						<n-tag size="small" :bordered="false">{{ envInfo.inNodeJs }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">isDarkMode()</code>
						<n-tag size="small" :bordered="false">{{ darkMode }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>
	</div>
</template>
