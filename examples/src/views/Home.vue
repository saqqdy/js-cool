<script setup lang="ts">
import { version } from 'js-cool'
import { ref } from 'vue'
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
} from '@vicons/ionicons5'
import FunctionCard from '@/components/FunctionCard.vue'
import CodePreview from '@/components/CodePreview.vue'
import { randomString, copy as copyText, uuid } from 'js-cool'

const categories = [
  { name: 'String', path: 'string', count: 15, description: 'camel2Dash, dash2Camel, upperFirst...' },
  { name: 'Array', path: 'array', count: 19, description: 'unique, shuffle, chunk, groupBy...' },
  { name: 'Object', path: 'object', count: 12, description: 'clone, extend, getProperty...' },
  { name: 'Type Check', path: 'typecheck', count: 13, description: 'isArray, isObject, isDate...' },
  { name: 'Validate', path: 'validate', count: 5, description: 'isEmail, isPhone, isURL...' },
  { name: 'URL & Browser', path: 'url', count: 13, description: 'getUrlParams, client, osVersion...' },
  { name: 'DOM', path: 'dom', count: 14, description: 'copy, addEvent, windowSize...' },
  { name: 'Storage', path: 'storage', count: 10, description: 'setCache, getCache, setCookie...' },
  { name: 'Convert', path: 'convert', count: 12, description: 'base64ToBlob, fileToBase64...' },
  { name: 'Number', path: 'number', count: 7, description: 'clamp, round, sum, average...' },
  { name: 'Date', path: 'date', count: 5, description: 'formatDate, dateDiff, isToday...' },
  { name: 'Color', path: 'color', count: 6, description: 'hexToRGB, RGBToHex, randomColor...' },
  { name: 'Utility', path: 'utility', count: 15, description: 'uuid, randomString, delay...' },
  { name: 'Async', path: 'async', count: 4, description: 'debounce, throttle, retry...' },
  { name: 'Encode', path: 'encode', count: 4, description: 'encodeBase64, decodeBase64...' },
  { name: 'Network', path: 'network', count: 1, description: 'fillIPv6...' },
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

const features = [
  { icon: CubeOutline, title: '140+ Utilities', description: 'String, array, object, date, and more' },
  { icon: SparklesOutline, title: 'TypeScript Native', description: 'Full type definitions' },
  { icon: LeafOutline, title: 'Tree Shaking', description: 'Import only what you need' },
  { icon: FlashOutline, title: 'Zero Dependencies', description: 'Lightweight footprint' },
  { icon: ShieldCheckmarkOutline, title: 'Well Tested', description: 'Comprehensive coverage' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <div style="text-align: center; padding: 32px 0;">
      <n-tag type="primary" round style="margin-bottom: 16px;">v{{ version }}</n-tag>
      <n-h1 style="margin: 0;">js-cool</n-h1>
      <p style="font-size: 18px; color: #666; max-width: 600px; margin: 16px auto;">
        Collection of common JavaScript / TypeScript utilities
      </p>
      <n-space justify="center" style="margin-top: 24px;">
        <n-button tag="a" href="https://github.com/saqqdy/js-cool" target="_blank" secondary>
          <template #icon><n-icon><LogoGithub /></n-icon></template>
          GitHub
        </n-button>
        <n-button tag="a" href="https://stackblitz.com/github/saqqdy/js-cool/tree/master/examples?terminal=dev" target="_blank" type="primary">
          <template #icon><n-icon><FlashOutline /></n-icon></template>
          Try in StackBlitz
        </n-button>
      </n-space>
    </div>

    <!-- Features -->
    <n-grid :cols="5" :x-gap="16" :y-gap="16" responsive="screen" item-responsive style="margin-bottom: 32px;">
      <n-gi v-for="feature in features" :key="feature.title" span="5 m:1">
        <n-card size="small" style="text-align: center;">
          <n-icon :component="feature.icon" size="32" color="#18a058" style="margin-bottom: 8px;" />
          <div style="font-weight: 600;">{{ feature.title }}</div>
          <p style="font-size: 12px; color: #999; margin: 4px 0 0;">{{ feature.description }}</p>
        </n-card>
      </n-gi>
    </n-grid>

    <!-- Quick Start -->
    <n-h2>Quick Start</n-h2>
    <n-grid :cols="2" :x-gap="16" responsive="screen" item-responsive>
      <n-gi span="2 m:1">
        <n-card title="Package Manager" size="small">
          <code-preview :code="installCode" />
          <code-preview :code="importCode" style="margin-top: 12px;" />
        </n-card>
      </n-gi>
      <n-gi span="2 m:1">
        <n-card title="CDN" size="small">
          <code-preview :code="cdnCode" />
        </n-card>
      </n-gi>
    </n-grid>

    <!-- Interactive Demos -->
    <n-h2>Try it out</n-h2>
    <n-grid :cols="2" :x-gap="16" responsive="screen" item-responsive>
      <n-gi span="2 m:1">
        <FunctionCard
          title="randomString"
          description="Generate a random string with specified length"
          :result="randomResult"
          :code="`randomString(${randomLen}) // '${randomResult}'`"
        >
          <template #input>
            <n-space>
              <n-input-number v-model:value="randomLen" :min="1" :max="64" style="width: 100px;" />
              <span style="color: #999;">characters</span>
              <n-button size="small" @click="generateRandom">Generate</n-button>
              <n-button size="small" secondary @click="copyResult">
                <template #icon><n-icon><CopyOutline /></n-icon></template>
                Copy
              </n-button>
            </n-space>
          </template>
        </FunctionCard>
      </n-gi>
      <n-gi span="2 m:1">
        <FunctionCard
          title="uuid"
          description="Generate a UUID v4"
          :result="uuidResult"
          :code="`uuid() // '${uuidResult}'`"
        >
          <template #input>
            <n-space>
              <n-button size="small" @click="generateUuid">Generate</n-button>
              <n-button size="small" secondary @click="copyUuid">
                <template #icon><n-icon><CopyOutline /></n-icon></template>
                Copy
              </n-button>
            </n-space>
          </template>
        </FunctionCard>
      </n-gi>
    </n-grid>

    <!-- Categories -->
    <n-h2>All Categories</n-h2>
    <p style="color: #666; margin-bottom: 16px;">
      <strong>{{ totalFunctions }}+</strong> functions in <strong>{{ categories.length }}</strong> categories
    </p>
    <n-grid :cols="4" :x-gap="12" :y-gap="12" responsive="screen" item-responsive>
      <n-gi v-for="cat in categories" :key="cat.path" span="4 s:2 m:1">
        <router-link :to="`/${cat.path}`" style="text-decoration: none; color: inherit;">
          <n-card size="small" hoverable style="cursor: pointer;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <span style="font-weight: 500;">{{ cat.name }}</span>
                <n-tag size="small" type="info" style="margin-left: 8px;">{{ cat.count }}</n-tag>
              </div>
              <n-icon><ArrowForwardOutline /></n-icon>
            </div>
            <p style="font-size: 12px; color: #999; margin: 4px 0 0;">{{ cat.description }}</p>
          </n-card>
        </router-link>
      </n-gi>
    </n-grid>

    <!-- Links -->
    <n-divider />
    <n-space justify="center">
      <n-button tag="a" href="https://github.com/saqqdy/js-cool" target="_blank" secondary>
        <template #icon><n-icon><LogoGithub /></n-icon></template>
        View on GitHub
      </n-button>
      <n-button tag="a" href="https://www.npmjs.com/package/js-cool" target="_blank" secondary>
        <template #icon><n-icon><LinkOutline /></n-icon></template>
        View on npm
      </n-button>
    </n-space>
  </div>
</template>
