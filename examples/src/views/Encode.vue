<script setup lang="ts">
import { ref } from 'vue'
import { NH1, NInput, NTag, NButton, NSpace } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import { encodeBase64, decodeBase64, encodeUtf8, decodeUtf8 } from 'js-cool'
import { useI18n } from '@/locales'

const { t } = useI18n()

const base64Input = ref('Hello World')
const base64Encoded = ref('')
const base64Decoded = ref('')

const utf8Input = ref('你好世界')
const utf8Encoded = ref('')
const utf8Decoded = ref('')

const handleBase64Encode = () => {
  base64Encoded.value = encodeBase64(base64Input.value)
}

const handleBase64Decode = () => {
  try {
    base64Decoded.value = decodeBase64(base64Encoded.value)
  } catch {
    base64Decoded.value = 'Invalid base64'
  }
}

const handleUtf8Encode = () => {
  utf8Encoded.value = encodeUtf8(utf8Input.value)
}

const handleUtf8Decode = () => {
  try {
    utf8Decoded.value = decodeUtf8(utf8Encoded.value)
  } catch {
    utf8Decoded.value = 'Invalid encoded string'
  }
}
</script>

<template>
  <div>
    <n-h1>Encode</n-h1>
    <p style="color: #666; margin-bottom: 24px;">{{ t.categoriesDesc.Encode }}</p>

    <!-- Base64 -->
    <FunctionCard
      title="encodeBase64 / decodeBase64"
      description="Base64 encoding/decoding"
      :code="`encodeBase64('Hello World') // 'SGVsbG8gV29ybGQ='
decodeBase64('SGVsbG8gV29ybGQ=') // 'Hello World'

// Handle Unicode
encodeBase64('你好') // Works with Chinese characters`"
    >
      <template #input>
        <n-space align="center">
          <n-input v-model:value="base64Input" style="width: 280px;" placeholder="Text to encode" />
          <n-button size="small" @click="handleBase64Encode">Encode</n-button>
        </n-space>
      </template>
      <template #result>
        <n-space vertical>
          <n-space align="center">
            <code class="code-inline">Encoded:</code>
            <n-tag type="info" size="small" :bordered="false">{{ base64Encoded || '-' }}</n-tag>
          </n-space>
          <n-space align="center">
            <n-button size="small" @click="handleBase64Decode">Decode</n-button>
            <code class="code-inline">Decoded:</code>
            <n-tag size="small" :bordered="false">{{ base64Decoded || '-' }}</n-tag>
          </n-space>
        </n-space>
      </template>
    </FunctionCard>

    <!-- UTF-8 -->
    <FunctionCard
      title="encodeUtf8 / decodeUtf8"
      description="UTF-8 encoding/decoding"
      :code="`encodeUtf8('Hello 世界') // UTF-8 encoded
decodeUtf8(encoded) // 'Hello 世界'`"
    >
      <template #input>
        <n-space align="center">
          <n-input v-model:value="utf8Input" style="width: 280px;" placeholder="Text to encode" />
          <n-button size="small" @click="handleUtf8Encode">Encode</n-button>
        </n-space>
      </template>
      <template #result>
        <n-space vertical>
          <n-space align="center">
            <code class="code-inline">Encoded:</code>
            <n-tag type="info" size="small" :bordered="false">{{ utf8Encoded || '-' }}</n-tag>
          </n-space>
          <n-space align="center">
            <n-button size="small" @click="handleUtf8Decode">Decode</n-button>
            <code class="code-inline">Decoded:</code>
            <n-tag size="small" :bordered="false">{{ utf8Decoded || '-' }}</n-tag>
          </n-space>
        </n-space>
      </template>
    </FunctionCard>
  </div>
</template>
