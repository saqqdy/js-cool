<script setup lang="ts">
import { ref } from 'vue'
import { NH1, NInput, NTag, NButton, NSpace } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import { blobToUrl, svgToBlob, encodeBase64, decodeBase64 } from 'js-cool'

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
</script>

<template>
  <div>
    <n-h1>Convert</n-h1>
    <p style="color: #666; margin-bottom: 24px;">Format conversion utilities</p>

    <!-- Base64 encoding -->
    <FunctionCard
      title="encodeBase64 / decodeBase64"
      description="Encode and decode Base64 strings (supports Unicode)"
      :code="`encodeBase64('Hello') // 'SGVsbG8='
encodeBase64('你好') // '5L2g5aW9'
decodeBase64('SGVsbG8=') // 'Hello'`"
    >
      <template #input>
        <n-space align="center">
          <n-input v-model:value="base64Input" style="width: 200px;" placeholder="Enter text" />
        </n-space>
      </template>
      <template #result>
        <n-space vertical>
          <n-space align="center">
            <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">encodeBase64</code>
            <n-tag type="info" size="small" :bordered="false">{{ encodeBase64(base64Input) }}</n-tag>
          </n-space>
          <n-space align="center">
            <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">decodeBase64</code>
            <n-tag type="info" size="small" :bordered="false">{{ decodeBase64(encodeBase64(base64Input)) }}</n-tag>
          </n-space>
        </n-space>
      </template>
    </FunctionCard>

    <!-- blobToUrl -->
    <FunctionCard
      title="blobToUrl"
      description="Create blob URL from data"
      :code="`const blob = new Blob(['Hello'], { type: 'text/plain' })
blobToUrl(blob) // 'blob:origin/uuid'`"
    >
      <template #input>
        <n-space align="center">
          <n-input v-model:value="textInput" style="width: 200px;" />
          <n-button size="small" @click="createBlobFromText">Create Blob URL</n-button>
        </n-space>
      </template>
      <template #result>
        <n-space v-if="blobUrl" vertical>
          <n-space align="center">
            <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">Blob URL:</code>
            <n-tag type="info" size="small" :bordered="false">{{ blobUrl }}</n-tag>
          </n-space>
          <a :href="blobUrl" target="_blank" style="color: #18a058; font-size: 14px;">Open in new tab</a>
        </n-space>
      </template>
    </FunctionCard>

    <!-- svgToBlob -->
    <FunctionCard
      title="svgToBlob"
      description="Convert SVG string to Blob"
      :code="`svgToBlob('<svg>...</svg>') // Blob (image/svg+xml)`"
    >
      <template #input>
        <n-space vertical>
          <n-input v-model:value="svgInput" style="width: 100%;" />
          <n-button size="small" @click="createSvgBlob">Create SVG Blob</n-button>
        </n-space>
      </template>
      <template #result>
        <n-space v-if="svgBlobUrl" vertical>
          <n-space align="center">
            <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">SVG Blob URL:</code>
            <n-tag type="info" size="small" :bordered="false">{{ svgBlobUrl }}</n-tag>
          </n-space>
          <img :src="svgBlobUrl" style="max-width: 96px; border: 1px solid #ddd; border-radius: 4px;" />
        </n-space>
      </template>
    </FunctionCard>

    <!-- Conversion matrix -->
    <FunctionCard
      title="Available Functions"
      description="All conversion utilities"
      :code="`// ArrayBuffer
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
urlToBlob(url)           // Promise`"
    >
      <template #result>
        <pre style="font-size: 12px; background: #f5f5f5; padding: 12px; border-radius: 8px; overflow-x: auto;">arrayBufferToBase64(buffer, mimeType?)
arrayBufferToBlob(buffer, mimeType)
base64ToArrayBuffer(base64)
base64ToBlob(base64)
base64ToFile(base64, filename, mime)
blobToArrayBuffer(blob)
blobToBase64(blob)
blobToUrl(blob)
fileToBase64(file)
svgToBlob(svgString)
urlToBlob(url)</pre>
      </template>
    </FunctionCard>
  </div>
</template>
