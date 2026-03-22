<script setup lang="ts">
import { ref } from 'vue'
import { NH1, NInput, NTag, NButton, NSpace } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import { debounce, throttle, retry, awaitTo } from 'js-cool'
import { useI18n } from '@/locales'

const { t } = useI18n()

// Debounce demo
const debounceInput = ref('')
const debounceOutput = ref('')
const debounceCount = ref(0)

const debouncedHandler = debounce((val: string) => {
	debounceOutput.value = val
	debounceCount.value++
}, 500)

const handleDebounceInput = (val: string) => {
	debounceInput.value = val
	debouncedHandler(val)
}

// Throttle demo
const throttleOutput = ref('')
const throttleCount = ref(0)

const throttledHandler = throttle((val: string) => {
	throttleOutput.value = val
	throttleCount.value++
}, 1000)

const handleThrottleInput = (val: string) => {
	throttledHandler(val)
}

// awaitTo demo
const awaitToResult = ref<{ err: any; data: any } | null>(null)
const awaitToLoading = ref(false)

const fetchData = async (shouldFail: boolean) => {
	awaitToLoading.value = true
	const [err, data] = await awaitTo(
		new Promise((resolve, reject) => {
			setTimeout(() => {
				if (shouldFail) {
					reject(new Error('Failed to fetch data'))
				} else {
					resolve({ message: 'Success!', timestamp: Date.now() })
				}
			}, 1000)
		})
	)
	awaitToResult.value = { err, data }
	awaitToLoading.value = false
}

// retry demo
const retryResult = ref('')
const retryCount = ref(0)

const fetchWithRetry = async () => {
	retryCount.value = 0
	retryResult.value = ''

	const result = await retry(
		async () => {
			retryCount.value++
			if (retryCount.value < 3) {
				throw new Error(`Attempt ${retryCount.value} failed`)
			}
			return `Success on attempt ${retryCount.value}`
		},
		{ delay: 500 }
	)

	retryResult.value = result
}
</script>

<template>
	<div>
		<n-h1>Async</n-h1>
		<p style="color: #666; margin-bottom: 24px">{{ t.categoriesDesc.Async }}</p>

		<!-- debounce -->
		<FunctionCard
			title="debounce"
			description="Execute after delay, reset on each input. Supports: leading, trailing, maxWait, cancel(), flush(), pending()"
			since="1.0.0"
			:code="`const handler = debounce(fn, 300)
const handler = debounce(fn, 300, { leading: true })
handler.cancel() // cancel pending
handler.flush() // execute immediately`"
		>
			<template #input>
				<n-input
					v-model:value="debounceInput"
					@update:value="handleDebounceInput"
					placeholder="Type something..."
					style="max-width: 400px"
				/>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">Output:</code>
						<n-tag type="info" size="small" :bordered="false">{{
							debounceOutput || '(waiting...)'
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">Executions:</code>
						<n-tag size="small" :bordered="false">{{ debounceCount }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- throttle -->
		<FunctionCard
			title="throttle"
			description="Execute at most once per interval (1000ms)"
			since="1.0.0"
			:code="`const handler = throttle((val) => {
  console.log(val)
}, 1000)

handler('input') // executes at most once per second`"
		>
			<template #input>
				<n-input
					@update:value="handleThrottleInput"
					placeholder="Type rapidly..."
					style="max-width: 400px"
				/>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">Output:</code>
						<n-tag type="info" size="small" :bordered="false">{{
							throttleOutput || '(waiting...)'
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">Executions:</code>
						<n-tag size="small" :bordered="false">{{ throttleCount }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- awaitTo -->
		<FunctionCard
			title="awaitTo"
			description="Convert promise to [error, data] tuple"
			:code="`const [err, data] = await awaitTo(fetch('/api/data'))
if (err) {
  console.error('Error:', err)
  return
}
console.log('Data:', data)`"
		>
			<template #input>
				<n-space align="center">
					<n-button size="small" @click="fetchData(false)" :disabled="awaitToLoading"
						>Fetch Success</n-button
					>
					<n-button
						size="small"
						type="error"
						@click="fetchData(true)"
						:disabled="awaitToLoading"
						>Fetch Failure</n-button
					>
					<span v-if="awaitToLoading" style="font-size: 12px; color: #666"
						>Loading...</span
					>
				</n-space>
			</template>
			<template #result>
				<n-space v-if="awaitToResult" vertical>
					<n-space align="center">
						<code class="code-inline">error:</code>
						<n-tag type="info" size="small" :bordered="false">{{
							awaitToResult.err?.message || 'null'
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">data:</code>
						<n-tag type="info" size="small" :bordered="false">{{
							JSON.stringify(awaitToResult.data)
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- retry -->
		<FunctionCard
			title="retry"
			description="Retry async function with configurable options: times, delay, shouldRetry, onRetry"
			since="2.0.0"
			:code="`const result = await retry(fn, { times: 3, delay: 1000 })

// With shouldRetry
retry(fn, { shouldRetry: (err) => err.message.includes('network') })

// With onRetry callback
retry(fn, { onRetry: (err, attempt) => console.log(attempt) })`"
		>
			<template #input>
				<n-space align="center">
					<n-button size="small" @click="fetchWithRetry">Run Retry Demo</n-button>
					<n-tag size="small" :bordered="false">Attempts: {{ retryCount }}</n-tag>
				</n-space>
			</template>
			<template #result>
				<n-tag v-if="retryResult" type="info" size="small" :bordered="false">{{
					retryResult
				}}</n-tag>
			</template>
		</FunctionCard>
	</div>
</template>
