<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { NH1, NInput, NButton, NSpace, NCode, NTag, NSelect } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import { stopBubble, stopDefault, copy, windowSize, addEvent, removeEvent, download } from 'js-cool'
import { useI18n } from '@/locales'

const { t } = useI18n()

const copied = ref(false)
const size = ref({ width: 0, height: 0 })
const copyText = ref('Hello from js-cool!')

const handleCopy = async () => {
	const success = await copy(copyText.value)
	if (success) {
		copied.value = true
		setTimeout(() => {
			copied.value = false
		}, 2000)
	}
}

const updateSize = () => {
	size.value = windowSize()
}

onMounted(() => {
	updateSize()
	window.addEventListener('resize', updateSize)
})

onUnmounted(() => {
	window.removeEventListener('resize', updateSize)
})

const bubbleCount = ref(0)
const defaultCount = ref(0)

const handleBubble = (e: MouseEvent) => {
	stopBubble(e)
	bubbleCount.value++
}

const handleDefault = (e: Event) => {
	stopDefault(e)
	defaultCount.value++
}

const incrementBubble = () => {
	bubbleCount.value++
}

// addEvent / removeEvent demo
const eventCount = ref(0)
const eventType = ref('click')
let eventHandler: ((e: Event) => void) | null = null

const attachEvent = () => {
	if (eventHandler) return
	eventHandler = (e: Event) => {
		eventCount.value++
		console.log('Event triggered:', e.type)
	}
	addEvent(document, eventType.value, eventHandler)
}

const detachEvent = () => {
	if (eventHandler) {
		removeEvent(document, eventType.value, eventHandler)
		eventHandler = null
	}
}

// download demo
const downloadContent = ref('Hello, this is a test file!')
const downloadFilename = ref('test.txt')
const downloadType = ref<'download' | 'open' | 'href' | 'request'>('download')

const downloadTypeOptions = [
	{ label: 'download (anchor)', value: 'download' },
	{ label: 'open (new tab)', value: 'open' },
	{ label: 'href (navigate)', value: 'href' },
	{ label: 'request (XHR)', value: 'request' },
]

const handleDownload = () => {
	// Save text content as file
	download.saveFile(downloadContent.value, downloadFilename.value)
}

const handleDownloadBlob = () => {
	const blob = new Blob([downloadContent.value], { type: 'text/plain' })
	download.saveFile(blob, downloadFilename.value)
}
</script>

<template>
	<div>
		<n-h1>Dom</n-h1>
		<p style="color: #666; margin-bottom: 24px">{{ t.categoriesDesc.Dom }}</p>

		<!-- copy -->
		<FunctionCard
			title="copy"
			description="Copy text to clipboard"
			since="1.0.0"
			:code="`await copy('Hello World') // true`"
		>
			<template #input>
				<n-space align="center">
					<n-input v-model:value="copyText" style="width: 280px" />
					<n-button @click="handleCopy">{{ copied ? 'Copied!' : 'Copy' }}</n-button>
				</n-space>
			</template>
		</FunctionCard>

		<!-- windowSize -->
		<FunctionCard
			title="windowSize"
			description="Get window dimensions"
			since="1.0.0"
			:code="`windowSize() // { width: 1920, height: 1080 }`"
		>
			<template #result>
				<n-code :code="JSON.stringify(size, null, 2)" language="json" />
			</template>
		</FunctionCard>

		<!-- stopBubble -->
		<FunctionCard
			title="stopBubble"
			description="Stop event bubbling"
			since="1.0.0"
			:code="`stopBubble(e) // e.stopPropagation()`"
		>
			<template #result>
				<div class="demo-box" style="cursor: pointer" @click="incrementBubble">
					<p style="margin-bottom: 8px; font-size: 14px">
						Outer div (clicks: {{ bubbleCount }})
					</p>
					<div class="demo-box-inner" @click="handleBubble">
						Inner div (stopBubble) - clicks won't bubble
					</div>
				</div>
			</template>
		</FunctionCard>

		<!-- stopDefault -->
		<FunctionCard
			title="stopDefault"
			description="Prevent default action"
			since="1.0.0"
			:code="`stopDefault(e) // e.preventDefault()`"
		>
			<template #result>
				<a href="https://example.com" @click="handleDefault" style="color: #18a058">
					Click this link (preventDefault called {{ defaultCount }} times)
				</a>
			</template>
		</FunctionCard>

		<!-- addEvent / removeEvent -->
		<FunctionCard
			title="addEvent / removeEvent"
			description="Add and remove event listeners (cross-browser)"
			since="1.0.0"
			:code="`// Add event listener
addEvent(element, 'click', handler)

// Remove event listener
removeEvent(element, 'click', handler)`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center">
						<span style="font-size: 12px; color: #666">Event type:</span>
						<n-tag size="small" :bordered="false">{{ eventType }}</n-tag>
					</n-space>
					<n-space>
						<n-button size="small" type="primary" @click="attachEvent" :disabled="eventHandler !== null">
							addEvent
						</n-button>
						<n-button size="small" @click="detachEvent" :disabled="eventHandler === null">
							removeEvent
						</n-button>
					</n-space>
					<span style="font-size: 12px; color: #666">
						Click anywhere on the page to trigger event
					</span>
				</n-space>
			</template>
			<template #result>
				<n-space align="center">
					<code class="code-inline">Event count:</code>
					<n-tag type="info" size="small" :bordered="false">{{ eventCount }}</n-tag>
				</n-space>
			</template>
		</FunctionCard>

		<!-- download -->
		<FunctionCard
			title="download"
			description="Download content as file (supports string, Blob, ArrayBuffer, URL)"
			since="1.1.0"
			:code="`// Save data as file
download.saveFile('Hello World', 'hello.txt')

// Download Blob
const blob = new Blob(['content'], { type: 'text/plain' })
download.saveFile(blob, 'file.txt')

// Download from URL with different types
download('https://example.com/file.pdf', 'document.pdf')
download('https://example.com/file.pdf', 'document.pdf', 'open')
download('https://example.com/file.pdf', 'document.pdf', 'request')`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center">
						<n-input v-model:value="downloadContent" style="width: 200px" placeholder="Content" />
						<n-input v-model:value="downloadFilename" style="width: 120px" placeholder="Filename" />
					</n-space>
					<n-space>
						<n-button size="small" type="primary" @click="handleDownload">
							Save String
						</n-button>
						<n-button size="small" @click="handleDownloadBlob">
							Save Blob
						</n-button>
					</n-space>
				</n-space>
			</template>
			<template #result>
				<span style="font-size: 12px; color: #666">
					Click button to download file
				</span>
			</template>
		</FunctionCard>
	</div>
</template>

<style scoped>
.demo-box {
	padding: 16px;
	border: 2px dashed #ddd;
	border-radius: 8px;
	background: #fafafa;
}

.demo-box-inner {
	padding: 12px;
	border: 2px solid #18a058;
	border-radius: 4px;
	background: #e8f5e9;
	color: #2e7d32;
}
</style>
