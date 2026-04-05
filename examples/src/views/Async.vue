<script setup lang="ts">
import { ref } from 'vue'
import { NH1, NInput, NTag, NButton, NSpace, NInputNumber } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import { debounce, throttle, retry, awaitTo, waiting, promiseFactory, punctualTimer } from 'js-cool'
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

// delay demo - delay() is a factory for debouncing/throttling
const delayMs = ref(1000)
const delayResult = ref('')
const delayRunning = ref(false)

const runDelay = async () => {
	delayRunning.value = true
	delayResult.value = 'Waiting...'
	const start = Date.now()

	// Use waiting() for simple sleep
	await waiting(delayMs.value)
	delayResult.value = `Waited ${Date.now() - start}ms`
	delayRunning.value = false
}

// waiting demo - simple sleep function
const waitingResult = ref('')
const waitingRunning = ref(false)

const runWaiting = async () => {
	waitingRunning.value = true
	waitingResult.value = 'Waiting 2 seconds...'
	await waiting(2000)
	waitingResult.value = 'Done!'
	waitingRunning.value = false
}

// promiseFactory demo
const factoryResult = ref('')
const factoryRunning = ref(false)

const runPromiseFactory = async () => {
	factoryRunning.value = true
	factoryResult.value = ''

	const stats = { value: 'initial' }
	const factory = promiseFactory(stats, () =>
		new Promise<typeof stats>(resolve => {
			setTimeout(() => {
				stats.value = 'Promise factory result!'
				resolve(stats)
			}, 1000)
		})
	)

	await factory
	factoryResult.value = factory.value
	factoryRunning.value = false
}

// punctualTimer demo
const timerResult = ref<string[]>([])
const timerRunning = ref(false)
let timer: ReturnType<typeof punctualTimer> | null = null

const startTimer = () => {
	timerRunning.value = true
	timerResult.value = []

	timer = punctualTimer(() => {
		timerResult.value.push(new Date().toLocaleTimeString())
		if (timerResult.value.length >= 5) {
			timer?.clear()
			timerRunning.value = false
		}
	}, 1000)
}

const stopTimer = () => {
	timer?.clear()
	timerRunning.value = false
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
			since="6.0.0"
			:code="`const handler = debounce(fn, 300)
const handler = debounce(fn, 300, { leading: true, maxWait: 1000 })
handler.cancel() // cancel pending
handler.flush() // execute immediately
handler.pending() // check if pending`"
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
			description="Execute at most once per interval (1000ms). Supports: leading, trailing, cancel(), flush(), pending()"
			since="6.0.0"
			:code="`const handler = throttle(fn, 300)
const handler = throttle(fn, 300, { leading: true, trailing: true })
handler.cancel() // cancel pending
handler.flush() // execute immediately
handler.pending() // check if pending`"
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

		<!-- waiting -->
		<FunctionCard
			title="waiting"
			description="Sleep for specified milliseconds (Promise-based setTimeout)"
			since="1.0.0"
			:code="`await waiting(1000) // Wait 1 second
await waiting(500) // Wait 500ms
await waiting(5000, true) // Throw on timeout`"
		>
			<template #input>
				<n-space align="center">
					<n-input-number v-model:value="delayMs" :min="100" :max="5000" :step="100" style="width: 100px" />
					<span style="font-size: 12px; color: #666">ms</span>
					<n-button size="small" :disabled="delayRunning" @click="runDelay">Wait</n-button>
				</n-space>
			</template>
			<template #result>
				<n-tag type="info" size="small" :bordered="false">{{ delayResult || '-' }}</n-tag>
			</template>
		</FunctionCard>

		<!-- waiting simple -->
		<FunctionCard
			title="waiting (simple delay)"
			description="Simple delay function for waiting"
			since="5.5.0"
			:code="`await waiting(2000) // Wait 2 seconds`"
		>
			<template #input>
				<n-space align="center">
					<n-button size="small" :disabled="waitingRunning" @click="runWaiting">Wait 2 seconds</n-button>
				</n-space>
			</template>
			<template #result>
				<n-tag type="info" size="small" :bordered="false">{{ waitingResult || '-' }}</n-tag>
			</template>
		</FunctionCard>

		<!-- promiseFactory -->
		<FunctionCard
			title="promiseFactory"
			description="Create a promise with external resolve/reject control"
			since="1.0.0"
			:code="`const promise = promiseFactory((resolve, reject) => {
  // Do something async
  setTimeout(() => resolve('done'), 1000)
})
await promise // 'done'`"
		>
			<template #input>
				<n-space align="center">
					<n-button size="small" :disabled="factoryRunning" @click="runPromiseFactory">Run Factory</n-button>
				</n-space>
			</template>
			<template #result>
				<n-tag type="info" size="small" :bordered="false">{{ factoryResult || '-' }}</n-tag>
			</template>
		</FunctionCard>

		<!-- punctualTimer -->
		<FunctionCard
			title="punctualTimer"
			description="Execute callback at precise intervals (second, minute, hour)"
			since="2.0.0"
			:code="`const timer = punctualTimer('second', callback)
const timer = punctualTimer('minute', callback)
const timer = punctualTimer('hour', callback)
timer.stop() // Stop the timer`"
		>
			<template #input>
				<n-space align="center">
					<n-button size="small" type="primary" :disabled="timerRunning" @click="startTimer">Start Timer</n-button>
					<n-button size="small" :disabled="!timerRunning" @click="stopTimer">Stop Timer</n-button>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<span style="font-size: 12px; color: #666">Triggers (max 5):</span>
					<n-space wrap>
						<n-tag v-for="(time, i) in timerResult" :key="i" size="small" :bordered="false">{{ time }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>
	</div>
</template>
