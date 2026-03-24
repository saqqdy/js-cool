<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NH1, NSpace, NInput, NTag, NCode } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import {
	getType,
	isArray,
	isObject,
	isPlainObject,
	isDate,
	isRegExp,
	isIterable,
	isEmpty,
	isNil,
	isWindow,
	isExitsFunction,
} from 'js-cool'
import { useI18n } from '@/locales'

const { t } = useI18n()

const testValue = ref('[1, 2, 3]')

const getTestValue = () => {
	try {
		return JSON.parse(testValue.value)
	} catch {
		return testValue.value
	}
}

const samples = [
	{ label: 'Array', value: [1, 2, 3] },
	{ label: 'Object', value: { a: 1 } },
	{ label: 'null', value: null },
	{ label: 'String', value: 'hello' },
	{ label: 'Number', value: 123 },
	{ label: 'Date', value: new Date() },
	{ label: 'RegExp', value: /test/g },
	{ label: 'Map', value: new Map() },
]

// isWindow demo
const windowCheckResult = ref(false)
const windowCheckInput = ref('window')

const checkWindow = () => {
	try {
		const obj = windowCheckInput.value === 'window' ? window : JSON.parse(windowCheckInput.value)
		windowCheckResult.value = isWindow(obj)
	} catch {
		windowCheckResult.value = false
	}
}

// isExitsFunction demo
const funcNameInput = ref('JSON.parse')
const funcExistsResult = ref(false)

const checkFunction = () => {
	funcExistsResult.value = isExitsFunction(funcNameInput.value)
}

onMounted(() => {
	checkWindow()
	checkFunction()
})
</script>

<template>
	<div>
		<n-h1>Typecheck</n-h1>
		<p style="color: #666; margin-bottom: 24px">{{ t.categoriesDesc.Typecheck }}</p>

		<FunctionCard
			title="getType"
			description="Get precise type of value"
			since="1.0.0"
			:code="`getType([1, 2, 3]) // 'array'\ngetType(null) // 'null'\ngetType(new Date()) // 'date'`"
		>
			<template #result>
				<n-space wrap>
					<n-space v-for="sample in samples" :key="sample.label" align="center">
						<n-tag size="small">{{ sample.label }}</n-tag>
						<n-tag type="info">{{ getType(sample.value) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="isArray / isObject / isPlainObject"
			description="Check if value is array, object, or plain object"
			since="1.0.0"
			:code="`isArray([1, 2, 3]) // true\nisObject({}) // true\nisPlainObject({}) // true`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<n-code code="isArray([1, 2, 3])" language="javascript" />
						<n-tag type="info">{{ isArray([1, 2, 3]) }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-code code="isObject({})" language="javascript" />
						<n-tag type="info">{{ isObject({}) }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-code code="isPlainObject({})" language="javascript" />
						<n-tag type="info">{{ isPlainObject({}) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="isDate / isRegExp"
			description="Check if value is Date or RegExp"
			since="1.0.0"
			:code="`isDate(new Date()) // true\nisRegExp(/test/) // true`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<n-code code="isDate(new Date())" language="javascript" />
						<n-tag type="info">{{ isDate(new Date()) }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-code code="isDate('2024-01-01')" language="javascript" />
						<n-tag type="info">{{ isDate('2024-01-01') }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-code code="isRegExp(/test/)" language="javascript" />
						<n-tag type="info">{{ isRegExp(/test/) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="isIterable"
			description="Check if value is iterable"
			since="3.0.0"
			:code="`isIterable([1, 2, 3]) // true\nisIterable('string') // true\nisIterable({}) // false`"
		>
			<template #result>
				<n-space wrap>
					<n-space align="center">
						<n-code code="[1,2,3]" language="javascript" />
						<n-tag type="info">{{ isIterable([1, 2, 3]) }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-code code="'string'" language="javascript" />
						<n-tag type="info">{{ isIterable('string') }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-code code="{}" language="javascript" />
						<n-tag type="info">{{ isIterable({}) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="isEmpty / isNil"
			description="Check if value is empty or nil"
			since="2.0.0"
			:code="`isEmpty([]) // true\nisEmpty({}) // true\nisNil(null) // true`"
		>
			<template #result>
				<n-space wrap>
					<n-space align="center">
						<n-code code="isEmpty([])" language="javascript" />
						<n-tag type="info">{{ isEmpty([]) }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-code code="isEmpty({})" language="javascript" />
						<n-tag type="info">{{ isEmpty({}) }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-code code="isNil(null)" language="javascript" />
						<n-tag type="info">{{ isNil(null) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="Interactive Test"
			description="Enter a JSON value to check its type"
			code='// Try: [1, 2, 3], { "a": 1 }, "hello", 123'
		>
			<template #input>
				<n-input
					v-model:value="testValue"
					placeholder="Enter a JSON value"
					style="max-width: 300px"
				/>
			</template>
			<template #result>
				<n-space wrap>
					<n-space align="center">
						<n-code code="getType" language="javascript" />
						<n-tag type="info">{{ getType(getTestValue()) }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-code code="isArray" language="javascript" />
						<n-tag type="info">{{ isArray(getTestValue()) }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-code code="isObject" language="javascript" />
						<n-tag type="info">{{ isObject(getTestValue()) }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-code code="isEmpty" language="javascript" />
						<n-tag type="info">{{ isEmpty(getTestValue()) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="isWindow"
			description="Check if value is a Window object"
			since="1.0.0"
			:code="`isWindow(window) // true in browser\nisWindow({}) // false`"
		>
			<template #input>
				<n-space align="center">
					<n-input v-model:value="windowCheckInput" style="width: 200px" @update:value="checkWindow" />
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<n-code :code="`isWindow(${windowCheckInput})`" language="javascript" />
						<n-tag type="info">{{ windowCheckResult }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="isExitsFunction"
			description="Check if a function exists in global scope by path"
			since="1.0.0"
			:code="`isExitsFunction('JSON.parse') // true\nisExitsFunction('nonExistent') // false`"
		>
			<template #input>
				<n-space align="center">
					<n-input v-model:value="funcNameInput" style="width: 200px" @update:value="checkFunction" placeholder="Function path" />
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<n-code :code="`isExitsFunction('${funcNameInput}')`" language="javascript" />
						<n-tag :type="funcExistsResult ? 'success' : 'default'">{{ funcExistsResult }}</n-tag>
					</n-space>
					<n-space wrap>
						<n-space align="center">
							<code class="code-inline">JSON.parse</code>
							<n-tag size="small" :bordered="false">{{ isExitsFunction('JSON.parse') }}</n-tag>
						</n-space>
						<n-space align="center">
							<code class="code-inline">console.log</code>
							<n-tag size="small" :bordered="false">{{ isExitsFunction('console.log') }}</n-tag>
						</n-space>
						<n-space align="center">
							<code class="code-inline">nonExistent</code>
							<n-tag size="small" :bordered="false">{{ isExitsFunction('nonExistent') }}</n-tag>
						</n-space>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>
	</div>
</template>
