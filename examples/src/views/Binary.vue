<script setup lang="ts">
import { ref } from 'vue'
import { NH1, NInput, NTag, NButton, NSpace, NUpload, NSelect, NInputNumber } from 'naive-ui'
import type { UploadFileInfo } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import { binary } from 'js-cool'
import { useI18n } from '@/locales'

const { t } = useI18n()

// ==================== Type Detection ====================
const typeInput = ref('Hello World')
const detectedType = ref<string>('')

const detectInputType = () => {
	const input = typeInput.value
	if (input.startsWith('data:')) {
		detectedType.value = `dataURL: ${binary.isDataURL(input)}`
	} else if (input.startsWith('<svg')) {
		detectedType.value = `svg string`
	} else if (input.startsWith('http://') || input.startsWith('https://')) {
		detectedType.value = `url string`
	} else {
		const isBase64 = binary.isBase64(input)
		detectedType.value = isBase64 ? 'base64 string' : 'plain text (treated as base64)'
	}
}

// ==================== Base64 Encoding ====================
const base64TextInput = ref('Hello 世界')
const base64Encoded = ref('')

const encodeBase64 = () => {
	base64Encoded.value = binary.base64.encode(base64TextInput.value)
}

const base64DecodeInput = ref('SGVsbG8g5LiW55WM')
const base64Decoded = ref('')

const decodeBase64 = () => {
	base64Decoded.value = binary.base64.decode(base64DecodeInput.value)
}

// ==================== Text Encoding ====================
const textEncodeInput = ref('Hello 世界 🌍')
const textEncodeResult = ref<{ hex: string; size: number } | null>(null)

const encodeText = () => {
	const buffer = binary.text.encode(textEncodeInput.value)
	textEncodeResult.value = {
		hex: binary.hex.encode(buffer),
		size: buffer.byteLength,
	}
}

const textDecodeHex = ref('48656c6c6f20e4b896e7958c20f09f8c8d')
const textDecodeResult = ref('')

const decodeText = () => {
	const buffer = binary.hex.decode(textDecodeHex.value)
	textDecodeResult.value = binary.text.decode(buffer)
}

// ==================== Chainable Conversion ====================
const chainInput = ref('Hello World')
const chainMimeType = ref('text/plain')
const chainResults = ref<{
	base64: string
	dataURL: string
	arrayBuffer: string
	blobSize: number
	url: string
} | null>(null)

const runChainConversion = async () => {
	const blob = new Blob([chainInput.value], { type: chainMimeType.value })
	const converter = binary.from(blob)

	const base64 = await converter.toBase64()
	const dataURL = await converter.toDataURL()
	const arrayBuffer = await converter.toArrayBuffer()
	const newBlob = await converter.toBlob()
	const { url } = await converter.toURL()

	chainResults.value = {
		base64: base64.slice(0, 50) + '...',
		dataURL: dataURL.slice(0, 60) + '...',
		arrayBuffer: `ArrayBuffer(${arrayBuffer.byteLength} bytes)`,
		blobSize: newBlob.size,
		url: url.slice(0, 50) + '...',
	}
}

// ==================== Blob Operations ====================
const blobConcatInput1 = ref('Hello ')
const blobConcatInput2 = ref('World')
const blobConcatResult = ref<string | null>(null)

const concatBlobs = async () => {
	const blob1 = new Blob([blobConcatInput1.value])
	const blob2 = new Blob([blobConcatInput2.value])
	const merged = binary.blob.concat([blob1, blob2], 'text/plain')
	const text = await merged.text()
	blobConcatResult.value = text
}

const blobSliceInput = ref('Hello World, this is a test')
const blobSliceStart = ref(0)
const blobSliceEnd = ref(5)
const blobSliceResult = ref<string | null>(null)

const sliceBlob = async () => {
	const blob = new Blob([blobSliceInput.value])
	const sliced = binary.blob.slice(blob, blobSliceStart.value, blobSliceEnd.value)
	const text = await sliced.text()
	blobSliceResult.value = text
}

// ==================== Hex Encoding ====================
const hexEncodeInput = ref('Hello')
const hexEncodeResult = ref('')

const encodeHex = () => {
	const buffer = binary.text.encode(hexEncodeInput.value)
	hexEncodeResult.value = binary.hex.encode(buffer)
}

const hexDecodeInput = ref('48656c6c6f')
const hexDecodeResult = ref('')

const decodeHex = () => {
	const buffer = binary.hex.decode(hexDecodeInput.value)
	hexDecodeResult.value = binary.text.decode(buffer)
}

// ==================== Hash Functions ====================
const hashInput = ref('Hello World')
const hashResults = ref<{
	md5: string
	sha1: string
	sha256: string
	crc32: number
} | null>(null)

const calculateHashes = async () => {
	hashResults.value = {
		md5: await binary.hash.md5(hashInput.value),
		sha1: await binary.hash.sha1(hashInput.value),
		sha256: await binary.hash.sha256(hashInput.value),
		crc32: binary.hash.crc32(hashInput.value),
	}
}

// ==================== SVG Operations ====================
const svgInput = ref('<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="red"/></svg>')
const svgResults = ref<{
	dataURL: string
	blobUrl: string
} | null>(null)

const processSvg = () => {
	const dataURL = binary.svg.toDataURL(svgInput.value)
	const { url } = binary.svg.toURL(svgInput.value)
	svgResults.value = {
		dataURL: dataURL.slice(0, 80) + '...',
		blobUrl: url,
	}
}

// ==================== DataURL Operations ====================
const dataURLInput = ref('data:text/plain;base64,SGVsbG8gV29ybGQ=')
const dataURLParsed = ref<{ mime: string; base64: string } | null>(null)

const parseDataURL = () => {
	if (binary.dataURL.isValid(dataURLInput.value)) {
		const parsed = binary.dataURL.parse(dataURLInput.value)
		dataURLParsed.value = {
			mime: parsed.mime,
			base64: parsed.base64,
		}
	}
}

const dataURLBuildBase64 = ref('SGVsbG8gV29ybGQ=')
const dataURLBuildMime = ref('text/plain')
const dataURLBuilt = ref('')

const buildDataURL = () => {
	dataURLBuilt.value = binary.dataURL.build(dataURLBuildBase64.value, dataURLBuildMime.value)
}

// ==================== File Upload ====================
const uploadedFile = ref<File | null>(null)
const fileMeta = ref<ReturnType<typeof binary.meta.get> | null>(null)
const fileBase64 = ref('')

const handleFileChange = async (options: { fileList: UploadFileInfo[] }) => {
	const file = options.fileList[0]?.file
	if (file) {
		uploadedFile.value = file
		fileMeta.value = binary.meta.get(file)
		const base64 = await binary.file.toBase64(file)
		fileBase64.value = base64.slice(0, 100) + '...'
	}
}

// ==================== Compare & Clone ====================
const compareInput1 = ref('Hello')
const compareInput2 = ref('Hello')
const compareResult = ref<boolean | null>(null)

const runCompare = async () => {
	const blob1 = new Blob([compareInput1.value])
	const blob2 = new Blob([compareInput2.value])
	compareResult.value = await binary.compare(blob1, blob2)
}

const cloneInput = ref('Test data for cloning')
const cloneResult = ref<{ originalSize: number; clonedSize: number; sameContent: boolean } | null>(null)

const runClone = async () => {
	const original = new Blob([cloneInput.value])
	const cloned = binary.clone(original) as Blob
	cloneResult.value = {
		originalSize: original.size,
		clonedSize: cloned.size,
		sameContent: await binary.compare(original, cloned),
	}
}

// ==================== URL Operations ====================
const urlFetchInput = ref('https://httpbin.org/json')
const urlFetchResult = ref<string | null>(null)
const urlFetchLoading = ref(false)

const fetchUrlToBlob = async () => {
	urlFetchLoading.value = true
	try {
		const blob = await binary.url.toBlob(urlFetchInput.value)
		urlFetchResult.value = `Blob fetched: ${blob.size} bytes, type: ${blob.type || 'unknown'}`
	} catch (error) {
		urlFetchResult.value = `Error: ${(error as Error).message}`
	} finally {
		urlFetchLoading.value = false
	}
}

// ==================== Download ====================
const downloadContent = ref('Hello, this is a test file content!')
const downloadFilename = ref('test.txt')

const triggerDownload = () => {
	const blob = new Blob([downloadContent.value], { type: 'text/plain' })
	binary.download(blob, downloadFilename.value)
}

// ==================== Parse Binary Input ====================
const parseInput = ref('Hello World')
const parseResult = ref<ReturnType<typeof binary.parse> | null>(null)

const runParse = () => {
	const blob = new Blob([parseInput.value], { type: 'text/plain' })
	parseResult.value = binary.parse(blob)
}

// Mime type options
const mimeTypeOptions = [
	{ label: 'text/plain', value: 'text/plain' },
	{ label: 'application/json', value: 'application/json' },
	{ label: 'image/png', value: 'image/png' },
	{ label: 'application/pdf', value: 'application/pdf' },
]
</script>

<template>
	<div>
		<n-h1>Binary</n-h1>
		<p style="color: #666; margin-bottom: 24px">{{ t.categoriesDesc.Binary }}</p>

		<!-- Type Detection -->
		<FunctionCard
			title="binary.isBlob / isFile / isArrayBuffer / isDataURL / isBase64"
			:description="t.binary.typeDetection"
			since="6.0.0"
			:code="`binary.isBlob(new Blob(['hello'])) // true
binary.isFile(new File(['hello'], 'test.txt')) // true
binary.isArrayBuffer(new ArrayBuffer(8)) // true
binary.isDataURL('data:text/plain;base64,SGVsbG8=') // true
binary.isBase64('SGVsbG8gV29ybGQ=') // true`"
		>
			<template #input>
				<n-space>
					<n-input v-model:value="typeInput" style="width: 300px" placeholder="Enter text, base64, or data URL" />
					<n-button size="small" @click="detectInputType">Detect Type</n-button>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">Detected:</code>
						<n-tag type="info" size="small" :bordered="false">{{ detectedType || '-' }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- Parse Binary Input -->
		<FunctionCard
			title="binary.parse"
			:description="t.binary.parseDesc"
			since="6.0.0"
			:code="`const parsed = binary.parse(new Blob(['hello'], { type: 'text/plain' }))
// { data: Blob, type: 'blob', mime: 'text/plain', size: 5 }`"
		>
			<template #input>
				<n-space>
					<n-input v-model:value="parseInput" style="width: 200px" />
					<n-button size="small" @click="runParse">Parse</n-button>
				</n-space>
			</template>
			<template #result>
				<pre v-if="parseResult" class="code-block" style="font-size: 12px">{{ JSON.stringify(parseResult, null, 2) }}</pre>
			</template>
		</FunctionCard>

		<!-- Chainable Conversion -->
		<FunctionCard
			title="binary.from() - Chainable Conversion"
			:description="t.binary.chainDesc"
			since="6.0.0"
			:code="`const converter = binary.from(blob)
const base64 = await converter.toBase64()
const dataURL = await converter.toDataURL()
const arrayBuffer = await converter.toArrayBuffer()
const newBlob = await converter.toBlob()
const file = await converter.toFile('filename.txt')
const { url, revoke } = await converter.toURL()`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center">
						<n-input v-model:value="chainInput" style="width: 200px" />
						<n-select v-model:value="chainMimeType" :options="mimeTypeOptions" style="width: 180px" />
						<n-button size="small" @click="runChainConversion">Convert</n-button>
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space v-if="chainResults" vertical>
					<n-space align="center">
						<code class="code-inline">toBase64()</code>
						<n-tag type="info" size="small" :bordered="false">{{ chainResults.base64 }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">toDataURL()</code>
						<n-tag type="info" size="small" :bordered="false">{{ chainResults.dataURL }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">toArrayBuffer()</code>
						<n-tag type="info" size="small" :bordered="false">{{ chainResults.arrayBuffer }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">toBlob()</code>
						<n-tag type="info" size="small" :bordered="false">{{ chainResults.blobSize }} bytes</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">toURL()</code>
						<n-tag type="info" size="small" :bordered="false">{{ chainResults.url }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- Base64 Module -->
		<FunctionCard
			title="binary.base64.encode / decode"
			:description="t.binary.base64Desc"
			since="6.0.0"
			:code="`binary.base64.encode('Hello 世界') // 'SGVsbG8g5LiW55WM'
binary.base64.decode('SGVsbG8g5LiW55WM') // 'Hello 世界'
binary.base64.toBlob('SGVsbG8=', 'text/plain') // Blob
binary.base64.toArrayBuffer('SGVsbG8=') // ArrayBuffer
binary.base64.toDataURL('SGVsbG8=', 'text/plain') // 'data:text/plain;base64,SGVsbG8='
binary.base64.toFile('SGVsbG8=', 'hello.txt', 'text/plain') // File`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center">
						<n-input v-model:value="base64TextInput" style="width: 200px" placeholder="Text to encode" />
						<n-button size="small" @click="encodeBase64">Encode</n-button>
					</n-space>
					<n-space align="center">
						<n-input v-model:value="base64DecodeInput" style="width: 200px" placeholder="Base64 to decode" />
						<n-button size="small" @click="decodeBase64">Decode</n-button>
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">encode:</code>
						<n-tag type="info" size="small" :bordered="false">{{ base64Encoded || '-' }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">decode:</code>
						<n-tag type="info" size="small" :bordered="false">{{ base64Decoded || '-' }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- Text Module -->
		<FunctionCard
			title="binary.text.encode / decode"
			:description="t.binary.textDesc"
			since="6.0.0"
			:code="`const buffer = binary.text.encode('Hello 世界') // ArrayBuffer
const str = binary.text.decode(buffer) // 'Hello 世界'
binary.text.toBase64('Hello') // 'SGVsbG8='
binary.text.fromBase64('SGVsbG8=') // 'Hello'`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center">
						<n-input v-model:value="textEncodeInput" style="width: 200px" placeholder="Text to encode" />
						<n-button size="small" @click="encodeText">Encode</n-button>
					</n-space>
					<n-space align="center">
						<n-input v-model:value="textDecodeHex" style="width: 200px" placeholder="Hex to decode" />
						<n-button size="small" @click="decodeText">Decode</n-button>
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">encode (hex):</code>
						<n-tag type="info" size="small" :bordered="false">{{ textEncodeResult?.hex || '-' }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">size:</code>
						<n-tag type="info" size="small" :bordered="false">{{ textEncodeResult?.size || 0 }} bytes</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">decode:</code>
						<n-tag type="info" size="small" :bordered="false">{{ textDecodeResult || '-' }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- Hex Module -->
		<FunctionCard
			title="binary.hex.encode / decode"
			:description="t.binary.hexDesc"
			since="6.0.0"
			:code="`const buffer = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]).buffer
binary.hex.encode(buffer) // '48656c6c6f'
binary.hex.decode('48656c6c6f') // ArrayBuffer`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center">
						<n-input v-model:value="hexEncodeInput" style="width: 200px" placeholder="Text to hex" />
						<n-button size="small" @click="encodeHex">Encode</n-button>
					</n-space>
					<n-space align="center">
						<n-input v-model:value="hexDecodeInput" style="width: 200px" placeholder="Hex to decode" />
						<n-button size="small" @click="decodeHex">Decode</n-button>
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">encode:</code>
						<n-tag type="info" size="small" :bordered="false">{{ hexEncodeResult || '-' }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">decode:</code>
						<n-tag type="info" size="small" :bordered="false">{{ hexDecodeResult || '-' }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- Blob Module -->
		<FunctionCard
			title="binary.blob - Blob Operations"
			:description="t.binary.blobDesc"
			since="6.0.0"
			:code="`await binary.blob.toBase64(blob) // Promise<string>
await binary.blob.toArrayBuffer(blob) // Promise<ArrayBuffer>
await binary.blob.toDataURL(blob) // Promise<string>
binary.blob.toFile(blob, 'filename.txt') // File
const { url, revoke } = binary.blob.toURL(blob) // { url: string, revoke: () => void }
binary.blob.concat([blob1, blob2], 'text/plain') // Blob
binary.blob.slice(blob, 0, 5) // Blob`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center">
						<n-input v-model:value="blobConcatInput1" style="width: 100px" />
						<span>+</span>
						<n-input v-model:value="blobConcatInput2" style="width: 100px" />
						<n-button size="small" @click="concatBlobs">Concat</n-button>
					</n-space>
					<n-space align="center">
						<span>Slice:</span>
						<n-input v-model:value="blobSliceInput" style="width: 200px" />
						<span>[</span>
						<n-input-number v-model:value="blobSliceStart" size="small" style="width: 60px" />
						<span>:</span>
						<n-input-number v-model:value="blobSliceEnd" size="small" style="width: 60px" />
						<span>]</span>
						<n-button size="small" @click="sliceBlob">Slice</n-button>
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">concat:</code>
						<n-tag type="info" size="small" :bordered="false">{{ blobConcatResult || '-' }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">slice:</code>
						<n-tag type="info" size="small" :bordered="false">{{ blobSliceResult || '-' }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- ArrayBuffer Module -->
		<FunctionCard
			title="binary.arrayBuffer - ArrayBuffer Operations"
			:description="t.binary.arrayBufferDesc"
			since="6.0.0"
			:code="`binary.arrayBuffer.toBase64(buffer) // string (or data URL if mime provided)
binary.arrayBuffer.toDataURL(buffer, 'text/plain') // 'data:text/plain;base64,...'
binary.arrayBuffer.toBlob(buffer, 'text/plain') // Blob
binary.arrayBuffer.toString(buffer) // 'decoded string'
binary.arrayBuffer.toHex(buffer) // '48656c6c6f'`"
		>
			<template #result>
				<n-space vertical>
					<pre class="code-block" style="font-size: 11px">const buffer = binary.text.encode('Hello')

binary.arrayBuffer.toBase64(buffer)      // 'SGVsbG8='
binary.arrayBuffer.toDataURL(buffer, 'text/plain')  // 'data:text/plain;base64,SGVsbG8='
binary.arrayBuffer.toBlob(buffer, 'text/plain')     // Blob { size: 5, type: 'text/plain' }
binary.arrayBuffer.toString(buffer)      // 'Hello'
binary.arrayBuffer.toHex(buffer)         // '48656c6c6f'</pre>
				</n-space>
			</template>
		</FunctionCard>

		<!-- File Module -->
		<FunctionCard
			title="binary.file / binary.meta - File Operations"
			:description="t.binary.fileDesc"
			since="6.0.0"
			:code="`await binary.file.toBase64(file) // Promise<string>
await binary.file.toArrayBuffer(file) // Promise<ArrayBuffer>
binary.file.toBlob(file) // Blob

const meta = binary.meta.get(file)
// { size, mime, name, lastModified, extension, isImage, isVideo, isAudio, isText }`"
		>
			<template #input>
				<n-space vertical>
					<n-upload :max="1" @change="handleFileChange" :show-file-list="false">
						<n-button size="small">Upload File</n-button>
					</n-upload>
				</n-space>
			</template>
			<template #result>
				<n-space v-if="fileMeta" vertical>
					<n-space align="center">
						<code class="code-inline">name:</code>
						<n-tag type="info" size="small" :bordered="false">{{ fileMeta.name || '-' }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">size:</code>
						<n-tag type="info" size="small" :bordered="false">{{ fileMeta.size }} bytes</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">mime:</code>
						<n-tag type="info" size="small" :bordered="false">{{ fileMeta.mime }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">extension:</code>
						<n-tag type="info" size="small" :bordered="false">{{ fileMeta.extension || '-' }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">isImage/isVideo/isAudio/isText:</code>
						<n-tag type="info" size="small" :bordered="false">{{ fileMeta.isImage }}/{{ fileMeta.isVideo }}/{{ fileMeta.isAudio }}/{{ fileMeta.isText }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">base64 (truncated):</code>
						<n-tag type="info" size="small" :bordered="false">{{ fileBase64 || '-' }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- Hash Module -->
		<FunctionCard
			title="binary.hash - Hash Functions"
			:description="t.binary.hashDesc"
			since="6.0.0"
			:code="`await binary.hash.md5('Hello World')     // 'b10a8db164e0754105b7a99be72e3fe5'
await binary.hash.sha1('Hello World')    // '0a4d55a8d778e5022fab701977c5d840bbc486d0'
await binary.hash.sha256('Hello World')  // 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e'
binary.hash.crc32('Hello World')         // 2346237359`"
		>
			<template #input>
				<n-space>
					<n-input v-model:value="hashInput" style="width: 200px" />
					<n-button size="small" @click="calculateHashes">Calculate Hashes</n-button>
				</n-space>
			</template>
			<template #result>
				<n-space v-if="hashResults" vertical>
					<n-space align="center">
						<code class="code-inline">MD5:</code>
						<n-tag type="info" size="small" :bordered="false" style="font-family: monospace">{{ hashResults.md5 }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">SHA-1:</code>
						<n-tag type="info" size="small" :bordered="false" style="font-family: monospace">{{ hashResults.sha1 }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">SHA-256:</code>
						<n-tag type="info" size="small" :bordered="false" style="font-family: monospace; font-size: 10px">{{ hashResults.sha256 }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">CRC32:</code>
						<n-tag type="info" size="small" :bordered="false">{{ hashResults.crc32 }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- SVG Module -->
		<FunctionCard
			title="binary.svg - SVG Conversion"
			:description="t.binary.svgDesc"
			since="6.0.0"
			code="const svg = '<svg>...</svg>'
binary.svg.toBlob(svg) // Blob (image/svg+xml)
binary.svg.toDataURL(svg) // 'data:image/svg+xml;base64,...'
const { url, revoke } = binary.svg.toURL(svg)"
		>
			<template #input>
				<n-space vertical>
					<n-input v-model:value="svgInput" type="textarea" style="width: 100%" :rows="2" />
					<n-button size="small" @click="processSvg">Process SVG</n-button>
				</n-space>
			</template>
			<template #result>
				<n-space v-if="svgResults" vertical>
					<n-space align="center">
						<code class="code-inline">toDataURL:</code>
						<n-tag type="info" size="small" :bordered="false">{{ svgResults.dataURL }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">toURL:</code>
						<n-tag type="info" size="small" :bordered="false">{{ svgResults.blobUrl }}</n-tag>
					</n-space>
					<img v-if="svgResults.blobUrl" :src="svgResults.blobUrl" style="max-width: 80px; border: 1px solid #ddd; border-radius: 4px; margin-top: 8px" />
				</n-space>
			</template>
		</FunctionCard>

		<!-- DataURL Module -->
		<FunctionCard
			title="binary.dataURL - Data URL Operations"
			:description="t.binary.dataURLDesc"
			since="6.0.0"
			:code="`binary.dataURL.isValid('data:text/plain;base64,SGVsbG8=') // true
const { mime, base64, data } = binary.dataURL.parse('data:image/png;base64,...')
binary.dataURL.build('SGVsbG8=', 'text/plain') // 'data:text/plain;base64,SGVsbG8='`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center">
						<n-input v-model:value="dataURLInput" style="width: 300px" placeholder="Data URL to parse" />
						<n-button size="small" @click="parseDataURL">Parse</n-button>
					</n-space>
					<n-space align="center">
						<n-input v-model:value="dataURLBuildBase64" style="width: 150px" placeholder="Base64" />
						<n-input v-model:value="dataURLBuildMime" style="width: 120px" placeholder="MIME type" />
						<n-button size="small" @click="buildDataURL">Build</n-button>
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space v-if="dataURLParsed" align="center">
						<code class="code-inline">parse:</code>
						<n-tag type="info" size="small" :bordered="false">mime: {{ dataURLParsed.mime }}, base64: {{ dataURLParsed.base64 }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">build:</code>
						<n-tag type="info" size="small" :bordered="false">{{ dataURLBuilt || '-' }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- URL Module -->
		<FunctionCard
			title="binary.url - URL Fetch"
			:description="t.binary.urlDesc"
			since="6.0.0"
			:code="`const blob = await binary.url.toBlob('https://example.com/image.png')
const dataURL = await binary.url.toDataURL('https://example.com/image.png')`"
		>
			<template #input>
				<n-space>
					<n-input v-model:value="urlFetchInput" style="width: 280px" placeholder="URL to fetch" />
					<n-button size="small" :loading="urlFetchLoading" @click="fetchUrlToBlob">Fetch</n-button>
				</n-space>
			</template>
			<template #result>
				<n-space v-if="urlFetchResult" align="center">
					<code class="code-inline">result:</code>
					<n-tag type="info" size="small" :bordered="false">{{ urlFetchResult }}</n-tag>
				</n-space>
			</template>
		</FunctionCard>

		<!-- Compare & Clone -->
		<FunctionCard
			title="binary.compare / binary.clone"
			:description="t.binary.compareCloneDesc"
			since="6.0.0"
			:code="`// Compare binary data for equality
const same = await binary.compare(blob1, blob2) // true/false

// Clone binary data
const cloned = binary.clone(blob) // new Blob with same content`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center">
						<span>Compare:</span>
						<n-input v-model:value="compareInput1" style="width: 100px" />
						<span>vs</span>
						<n-input v-model:value="compareInput2" style="width: 100px" />
						<n-button size="small" @click="runCompare">Compare</n-button>
					</n-space>
					<n-space align="center">
						<span>Clone:</span>
						<n-input v-model:value="cloneInput" style="width: 150px" />
						<n-button size="small" @click="runClone">Clone</n-button>
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">compare:</code>
						<n-tag :type="compareResult === true ? 'success' : compareResult === false ? 'error' : 'default'" size="small" :bordered="false">{{ compareResult }}</n-tag>
					</n-space>
					<n-space v-if="cloneResult" align="center">
						<code class="code-inline">clone:</code>
						<n-tag type="info" size="small" :bordered="false">original: {{ cloneResult.originalSize }}B, cloned: {{ cloneResult.clonedSize }}B, same: {{ cloneResult.sameContent }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- Download -->
		<FunctionCard
			title="binary.download"
			:description="t.binary.downloadDesc"
			since="6.0.0"
			:code="`const blob = new Blob(['Hello World'], { type: 'text/plain' })
binary.download(blob, 'hello.txt') // Triggers browser download`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center">
						<n-input v-model:value="downloadContent" style="width: 250px" placeholder="Content to download" />
						<n-input v-model:value="downloadFilename" style="width: 120px" placeholder="Filename" />
						<n-button size="small" type="primary" @click="triggerDownload">Download</n-button>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- Full API Reference -->
		<FunctionCard
			title="Full API Reference"
			:description="t.binary.fullApiDesc"
			since="6.0.0"
		>
			<template #result>
				<pre class="code-block" style="font-size: 11px">// Type Detection
binary.isBlob(value): boolean
binary.isFile(value): boolean
binary.isArrayBuffer(value): boolean
binary.isDataURL(value): boolean
binary.isBase64(value): boolean
binary.parse(input): BinaryData

// Chainable Conversion
binary.from(input, options?): BinaryConverter
  .toBase64(): Promise&lt;string&gt;
  .toDataURL(mime?): Promise&lt;string&gt;
  .toArrayBuffer(): Promise&lt;ArrayBuffer&gt;
  .toBlob(mime?): Promise&lt;Blob&gt;
  .toFile(filename, mime?): Promise&lt;File&gt;
  .toURL(): Promise&lt;{ url: string, revoke: () => void }&gt;
  .getMime(): string | undefined
  .getSize(): number

// Base64 Module
binary.base64.encode(str): string
binary.base64.decode(base64): string
binary.base64.toBlob(base64, mime?): Blob
binary.base64.toArrayBuffer(base64): ArrayBuffer
binary.base64.toDataURL(base64, mime): string
binary.base64.toFile(base64, filename, mime?): File

// Blob Module
binary.blob.toBase64(blob): Promise&lt;string&gt;
binary.blob.toArrayBuffer(blob): Promise&lt;ArrayBuffer&gt;
binary.blob.toDataURL(blob): Promise&lt;string&gt;
binary.blob.toFile(blob, filename): File
binary.blob.toURL(blob): { url: string, revoke: () => void }
binary.blob.concat(blobs, mime?): Blob
binary.blob.slice(blob, start, end, mime?): Blob

// ArrayBuffer Module
binary.arrayBuffer.toBase64(buffer, mime?): string
binary.arrayBuffer.toDataURL(buffer, mime): string
binary.arrayBuffer.toBlob(buffer, mime?): Blob
binary.arrayBuffer.toString(buffer, encoding?): string
binary.arrayBuffer.toHex(buffer): string

// File Module
binary.file.toBase64(file): Promise&lt;string&gt;
binary.file.toArrayBuffer(file): Promise&lt;ArrayBuffer&gt;
binary.file.toBlob(file): Blob

// Text Module
binary.text.encode(str, encoding?): ArrayBuffer
binary.text.decode(buffer, encoding?): string
binary.text.toBase64(str): string
binary.text.fromBase64(base64): string

// Hex Module
binary.hex.encode(buffer): string
binary.hex.decode(hex): ArrayBuffer

// DataURL Module
binary.dataURL.parse(dataURL): { mime, base64, data }
binary.dataURL.build(base64, mime): string
binary.dataURL.isValid(str): boolean

// SVG Module
binary.svg.toBlob(svg): Blob
binary.svg.toDataURL(svg): string
binary.svg.toURL(svg): { url: string, revoke: () => void }

// URL Module
binary.url.toBlob(url): Promise&lt;Blob&gt;
binary.url.toDataURL(url): Promise&lt;string&gt;

// Hash Module
binary.hash.md5(data): Promise&lt;string&gt;
binary.hash.sha1(data): Promise&lt;string&gt;
binary.hash.sha256(data): Promise&lt;string&gt;
binary.hash.crc32(data): number

// Meta Module
binary.meta.get(file): { size, mime, name, extension, isImage, isVideo, isAudio, isText }

// Utility Methods
binary.compare(a, b): Promise&lt;boolean&gt;
binary.clone(data): Blob | ArrayBuffer
binary.download(data, filename, mime?): void</pre>
			</template>
		</FunctionCard>
	</div>
</template>

<style scoped>
.code-inline {
	background: rgba(0, 0, 0, 0.05);
	padding: 2px 6px;
	border-radius: 4px;
	font-family: monospace;
	font-size: 12px;
}

:global(.dark) .code-inline {
	background: rgba(255, 255, 255, 0.1);
}

.code-block {
	background: rgba(0, 0, 0, 0.05);
	padding: 12px;
	border-radius: 8px;
	overflow-x: auto;
	font-family: monospace;
}

:global(.dark) .code-block {
	background: rgba(255, 255, 255, 0.05);
}
</style>
