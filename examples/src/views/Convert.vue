<script setup lang="ts">
import { ref } from 'vue'
import { NH1, NInput, NTag, NButton, NSpace } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import {
	blobToUrl,
	svgToBlob,
	encodeBase64,
	decodeBase64,
	arrayToCSV,
	CSVToArray,
	CSVToJSON,
	JSONToCSV,
} from 'js-cool'
import { useI18n } from '@/locales'

const { t } = useI18n()

const textInput = ref('Hello World')
const svgInput = ref('<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="red"/></svg>')
const base64Input = ref('Hello, 世界!')

const blobUrl = ref('')
const createBlobFromText = () => {
	const blob = new Blob([textInput.value], { type: 'text/plain' })
	blobUrl.value = blobToUrl(blob)
}

const svgBlobUrl = ref('')
const createSvgBlob = () => {
	const blob = svgToBlob(svgInput.value)
	svgBlobUrl.value = blobToUrl(blob)
}

// CSV demos
const csvInput = ref('name,age,city\nJohn,25,New York\nAlice,30,Los Angeles\nBob,35,Chicago')
const jsonArrayInput = ref([
	{ name: 'John', age: 25, city: 'New York' },
	{ name: 'Alice', age: 30, city: 'Los Angeles' },
])
</script>

<template>
	<div>
		<n-h1>Convert</n-h1>
		<p style="color: #666; margin-bottom: 24px">{{ t.categoriesDesc.Convert }}</p>

		<!-- Base64 encoding -->
		<FunctionCard
			title="encodeBase64 / decodeBase64"
			description="Encode and decode Base64 strings (supports Unicode)"
			since="5.0.0"
			:code="`encodeBase64('Hello') // 'SGVsbG8='
encodeBase64('你好') // '5L2g5aW9'
decodeBase64('SGVsbG8=') // 'Hello'`"
		>
			<template #input>
				<n-space align="center">
					<n-input
						v-model:value="base64Input"
						style="width: 200px"
						placeholder="Enter text"
					/>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">encodeBase64</code>
						<n-tag type="info" size="small" :bordered="false">{{
							encodeBase64(base64Input)
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">decodeBase64</code>
						<n-tag type="info" size="small" :bordered="false">{{
							decodeBase64(encodeBase64(base64Input))
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- blobToUrl -->
		<FunctionCard
			title="blobToUrl"
			description="Create blob URL from data"
			since="5.0.0"
			:code="`const blob = new Blob(['Hello'], { type: 'text/plain' })
blobToUrl(blob) // 'blob:origin/uuid'`"
		>
			<template #input>
				<n-space align="center">
					<n-input v-model:value="textInput" style="width: 200px" />
					<n-button size="small" @click="createBlobFromText">Create Blob URL</n-button>
				</n-space>
			</template>
			<template #result>
				<n-space v-if="blobUrl" vertical>
					<n-space align="center">
						<code class="code-inline">Blob URL:</code>
						<n-tag type="info" size="small" :bordered="false">{{ blobUrl }}</n-tag>
					</n-space>
					<a :href="blobUrl" target="_blank" style="color: #18a058; font-size: 14px"
						>Open in new tab</a
					>
				</n-space>
			</template>
		</FunctionCard>

		<!-- svgToBlob -->
		<FunctionCard
			title="svgToBlob"
			description="Convert SVG string to Blob"
			since="5.0.0"
			:code="`svgToBlob('<svg>...</svg>') // Blob (image/svg+xml)`"
		>
			<template #input>
				<n-space vertical>
					<n-input v-model:value="svgInput" style="width: 100%" />
					<n-button size="small" @click="createSvgBlob">Create SVG Blob</n-button>
				</n-space>
			</template>
			<template #result>
				<n-space v-if="svgBlobUrl" vertical>
					<n-space align="center">
						<code class="code-inline">SVG Blob URL:</code>
						<n-tag type="info" size="small" :bordered="false">{{ svgBlobUrl }}</n-tag>
					</n-space>
					<img
						:src="svgBlobUrl"
						style="max-width: 96px; border: 1px solid #ddd; border-radius: 4px"
					/>
				</n-space>
			</template>
		</FunctionCard>

		<!-- ArrayBuffer conversions -->
		<FunctionCard
			title="arrayBufferToBase64 / base64ToArrayBuffer"
			description="Convert between ArrayBuffer and Base64"
			since="5.0.0"
			:code="`const buffer = new TextEncoder().encode('Hello')
arrayBufferToBase64(buffer.buffer) // 'SGVsbG8='
base64ToArrayBuffer('SGVsbG8=') // ArrayBuffer`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">arrayBufferToBase64(buffer)</code>
						<n-tag type="info" size="small" :bordered="false">SGVsbG8=</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">base64ToArrayBuffer('SGVsbG8=')</code>
						<n-tag type="info" size="small" :bordered="false">ArrayBuffer (decodes to 'Hello')</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- arrayBufferToBlob -->
		<FunctionCard
			title="arrayBufferToBlob"
			description="Convert ArrayBuffer to Blob"
			since="5.0.0"
			:code="`const buffer = new TextEncoder().encode('Hello')
arrayBufferToBlob(buffer, 'text/plain') // Blob`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">arrayBufferToBlob(buffer, 'text/plain')</code>
						<n-tag type="info" size="small" :bordered="false">Blob created</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- base64ToBlob / base64ToFile -->
		<FunctionCard
			title="base64ToBlob / base64ToFile"
			description="Convert Base64 to Blob or File"
			since="5.0.0"
			:code="`base64ToBlob('data:image/png;base64,...') // Blob
base64ToFile('data:image/png;base64,...', 'image.png') // File`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">base64ToBlob(base64String)</code>
						<n-tag type="info" size="small" :bordered="false">Blob</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">base64ToFile(base64String, 'file.png')</code>
						<n-tag type="info" size="small" :bordered="false">File</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- blobToArrayBuffer / blobToBase64 -->
		<FunctionCard
			title="blobToArrayBuffer / blobToBase64"
			description="Convert Blob to ArrayBuffer or Base64 (async)"
			since="5.0.0"
			:code="`const blob = new Blob(['Hello'])
await blobToArrayBuffer(blob) // ArrayBuffer
await blobToBase64(blob) // 'SGVsbG8='`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">await blobToArrayBuffer(blob)</code>
						<n-tag type="info" size="small" :bordered="false">Promise&lt;ArrayBuffer&gt;</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">await blobToBase64(blob)</code>
						<n-tag type="info" size="small" :bordered="false">Promise&lt;string&gt;</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- fileToBase64 -->
		<FunctionCard
			title="fileToBase64"
			description="Convert File to Base64 (async)"
			since="5.0.0"
			:code="`const file = document.querySelector('input[type=file]').files[0]
await fileToBase64(file) // 'data:image/png;base64,...'`"
		>
			<template #result>
				<n-space align="center">
					<code class="code-inline">await fileToBase64(file)</code>
					<n-tag type="info" size="small" :bordered="false">Promise&lt;string&gt;</n-tag>
				</n-space>
			</template>
		</FunctionCard>

		<!-- urlToBlob -->
		<FunctionCard
			title="urlToBlob"
			description="Fetch URL and convert to Blob (async)"
			since="5.0.0"
			:code="`await urlToBlob('https://example.com/image.png') // Blob`"
		>
			<template #result>
				<n-space align="center">
					<code class="code-inline">await urlToBlob(url)</code>
					<n-tag type="info" size="small" :bordered="false">Promise&lt;Blob&gt;</n-tag>
				</n-space>
			</template>
		</FunctionCard>

		<!-- CSVToArray / CSVToJSON -->
		<FunctionCard
			title="CSVToArray / CSVToJSON"
			description="Parse CSV to array or JSON"
			since="5.0.0"
			:code="`CSVToArray('a,b,c\\n1,2,3') // [['a','b','c'], ['1','2','3']]
CSVToJSON('name,age\\nJohn,25') // [{ name: 'John', age: '25' }]`"
		>
			<template #input>
				<n-space vertical>
					<n-input
						v-model:value="csvInput"
						type="textarea"
						style="width: 100%"
						:rows="4"
					/>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">CSVToArray</code>
					</n-space>
					<pre class="code-block" style="font-size: 11px">{{
						JSON.stringify(CSVToArray(csvInput), null, 2)
					}}</pre>
					<n-space align="center">
						<code class="code-inline">CSVToJSON</code>
					</n-space>
					<pre class="code-block" style="font-size: 11px">{{
						JSON.stringify(CSVToJSON(csvInput), null, 2)
					}}</pre>
				</n-space>
			</template>
		</FunctionCard>

		<!-- JSONToCSV / arrayToCSV -->
		<FunctionCard
			title="JSONToCSV / arrayToCSV"
			description="Convert JSON or array to CSV string"
			since="5.0.0"
			:code="'JSONToCSV([{ name: \'John\', age: 25 }], [\'name\', \'age\'])\\narrayToCSV([[\'a\',\'b\'], [\'1\',\'2\']])'"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">JSONToCSV(jsonArray, ['name', 'age', 'city'])</code>
					</n-space>
					<n-tag type="info" size="small" :bordered="false">{{
						JSONToCSV(jsonArrayInput, ['name', 'age', 'city'])
					}}</n-tag>
					<n-space align="center">
						<code class="code-inline">arrayToCSV([['a','b'], ['1','2']])</code>
					</n-space>
					<n-tag type="info" size="small" :bordered="false">{{
						arrayToCSV([['a', 'b'], ['1', '2']])
					}}</n-tag>
				</n-space>
			</template>
		</FunctionCard>

		<!-- Conversion matrix -->
		<FunctionCard
			title="Conversion Matrix"
			description="All conversion utilities"
			since="5.0.0"
		>
			<template #result>
				<pre class="code-block">
// ArrayBuffer
arrayBufferToBase64(buffer, mimeType?)
arrayBufferToBlob(buffer, mimeType)

// Base64
base64ToArrayBuffer(base64)
base64ToBlob(base64)
base64ToFile(base64, filename, mime)

// Blob
blobToArrayBuffer(blob)  // Promise
blobToBase64(blob)       // Promise
blobToUrl(blob)

// File
fileToBase64(file)       // Promise

// SVG
svgToBlob(svgString)

// URL
urlToBlob(url)           // Promise

// CSV
CSVToArray(csvString)
CSVToJSON(csvString)
arrayToCSV(array)
JSONToCSV(jsonArray)</pre
				>
			</template>
		</FunctionCard>
	</div>
</template>
