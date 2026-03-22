<script setup lang="ts">
import { ref } from 'vue'
import { NH1, NInput, NTag, NButton, NSpace } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import {
  getUrlParams,
  getUrlParam,
  parseUrlParam,
  spliceUrlParam,
  getDirParam,
  client,
  appVersion,
  browserVersion,
  osVersion,
  compareVersion,
  nextVersion,
} from 'js-cool'

const urlInput = ref('https://example.com?name=John&age=25&active=true')
const paramKey = ref('name')
const paramStr = ref('a=1&b=2&c=true&d=null')
const paramObj = ref({ name: 'John', age: 25, active: true })
const dirUrl = ref('https://example.com/user/123/profile')
const compareA = ref('1.2.3')
const compareB = ref('1.2.4')
const versionInput = ref('1.2.3')
const clientInfo = ref<Record<string, unknown>>({})
const getClientInfo = () => {
  clientInfo.value = client() as Record<string, unknown>
}
</script>

<template>
  <div>
    <n-h1>URL & Browser</n-h1>
    <p style="color: #666; margin-bottom: 24px;">URL parsing and browser detection</p>

    <!-- getUrlParams / getUrlParam -->
    <FunctionCard
      title="getUrlParams / getUrlParam"
      description="Parse URL parameters from search string"
      :code="`getUrlParam('name', '?name=John&age=25')
// 'John'

getUrlParams('?name=John&age=25')
// { name: 'John', age: '25' }`"
    >
      <template #input>
        <n-space vertical>
          <n-input v-model:value="urlInput" style="width: 100%;" />
          <n-space align="center">
            <n-input v-model:value="paramKey" style="width: 120px;" />
            <span style="color: #666;">→</span>
            <n-tag type="info" size="small" :bordered="false">{{ getUrlParam(paramKey, urlInput) }}</n-tag>
          </n-space>
        </n-space>
      </template>
      <template #result>
        <n-space vertical>
          <n-space align="center">
            <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">getUrlParams(url)</code>
            <n-tag type="info" size="small" :bordered="false">{{ JSON.stringify(getUrlParams(urlInput)) }}</n-tag>
          </n-space>
          <n-space align="center">
            <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">getUrlParams(url, true)</code>
            <n-tag type="info" size="small" :bordered="false">{{ JSON.stringify(getUrlParams(urlInput, true)) }}</n-tag>
          </n-space>
        </n-space>
      </template>
    </FunctionCard>

    <!-- parseUrlParam / spliceUrlParam -->
    <FunctionCard
      title="parseUrlParam / spliceUrlParam"
      description="Parse and build URL parameters"
      :code="`parseUrlParam('a=1&b=2&c=true')
// { a: '1', b: '2', c: 'true' }

spliceUrlParam({ name: 'John', age: 25 })
// 'name=John&age=25'`"
    >
      <template #input>
        <n-input v-model:value="paramStr" style="width: 300px;" />
      </template>
      <template #result>
        <n-space vertical>
          <n-space align="center">
            <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">parseUrlParam(str)</code>
            <n-tag type="info" size="small" :bordered="false">{{ JSON.stringify(parseUrlParam(paramStr)) }}</n-tag>
          </n-space>
          <n-space align="center">
            <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">parseUrlParam(str, true)</code>
            <n-tag type="info" size="small" :bordered="false">{{ JSON.stringify(parseUrlParam(paramStr, true)) }}</n-tag>
          </n-space>
          <n-space align="center">
            <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">spliceUrlParam</code>
            <n-tag type="info" size="small" :bordered="false">{{ spliceUrlParam(paramObj) }}</n-tag>
          </n-space>
        </n-space>
      </template>
    </FunctionCard>

    <!-- getDirParam -->
    <FunctionCard
      title="getDirParam"
      description="Get directory-style URL params"
      :code="`getDirParam('https://example.com/user/123/profile')
// { 0: 'user', 1: '123', 2: 'profile' }`"
    >
      <template #input>
        <n-input v-model:value="dirUrl" style="width: 100%;" />
      </template>
      <template #result>
        <pre style="font-size: 12px; background: #f5f5f5; padding: 12px; border-radius: 8px; overflow-x: auto;">{{ JSON.stringify(getDirParam(dirUrl), null, 2) }}</pre>
      </template>
    </FunctionCard>

    <!-- client -->
    <FunctionCard
      title="client"
      description="Browser detection utility"
      :code="`client() // { ... }
client.getBrowser() // { browser: 'Chrome' }
client.getOS() // { os: 'Mac OS' }`"
    >
      <template #input>
        <n-button size="small" @click="getClientInfo">Get Client Info</n-button>
      </template>
      <template #result>
        <pre style="font-size: 12px; background: #f5f5f5; padding: 12px; border-radius: 8px; overflow-x: auto;">{{ JSON.stringify(clientInfo, null, 2) }}</pre>
      </template>
    </FunctionCard>

    <!-- browserVersion / osVersion -->
    <FunctionCard
      title="browserVersion / osVersion / appVersion"
      description="Get browser and OS information"
      :code="`browserVersion() // { name: 'Chrome', version: '123.0.0.0' }
osVersion() // { name: 'Mac OS', version: '10.15.7' }
appVersion('Chrome') // '123.0.0.0'`"
    >
      <template #result>
        <n-space vertical>
          <div>
            <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">browserVersion()</code>
            <pre style="font-size: 12px; background: #f5f5f5; padding: 8px; margin-top: 8px; border-radius: 4px; overflow-x: auto;">{{ JSON.stringify(browserVersion(), null, 2) }}</pre>
          </div>
          <div>
            <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">osVersion()</code>
            <pre style="font-size: 12px; background: #f5f5f5; padding: 8px; margin-top: 8px; border-radius: 4px; overflow-x: auto;">{{ JSON.stringify(osVersion(), null, 2) }}</pre>
          </div>
          <n-space align="center">
            <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">appVersion('Chrome')</code>
            <n-tag type="info" size="small" :bordered="false">{{ appVersion('Chrome') }}</n-tag>
          </n-space>
        </n-space>
      </template>
    </FunctionCard>

    <!-- compareVersion -->
    <FunctionCard
      title="compareVersion"
      description="Compare version numbers"
      :code="`compareVersion('1.2.3', '1.2.4') // -1
compareVersion('2.0.0', '1.9.9') // 1
compareVersion('1.0.0', '1.0.0') // 0`"
    >
      <template #input>
        <n-space align="center">
          <n-input v-model:value="compareA" style="width: 100px;" />
          <span style="color: #666;">vs</span>
          <n-input v-model:value="compareB" style="width: 100px;" />
          <n-tag type="info" size="small" :bordered="false">{{ compareVersion(compareA, compareB) }}</n-tag>
          <span style="font-size: 12px; color: #666;">
            {{ compareVersion(compareA, compareB) > 0 ? 'A > B' : compareVersion(compareA, compareB) < 0 ? 'A < B' : 'A = B' }}
          </span>
        </n-space>
      </template>
    </FunctionCard>

    <!-- nextVersion -->
    <FunctionCard
      title="nextVersion"
      description="Get next version number"
      :code="`nextVersion('1.2.3', 'major') // '2.0.0'
nextVersion('1.2.3', 'minor') // '1.3.0'
nextVersion('1.2.3', 'patch') // '1.2.4'`"
    >
      <template #input>
        <n-input v-model:value="versionInput" style="width: 100px;" />
      </template>
      <template #result>
        <n-space>
          <n-space align="center">
            <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">major</code>
            <n-tag type="info" size="small" :bordered="false">{{ nextVersion(versionInput, 'major') }}</n-tag>
          </n-space>
          <n-space align="center">
            <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">minor</code>
            <n-tag type="info" size="small" :bordered="false">{{ nextVersion(versionInput, 'minor') }}</n-tag>
          </n-space>
          <n-space align="center">
            <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">patch</code>
            <n-tag type="info" size="small" :bordered="false">{{ nextVersion(versionInput, 'patch') }}</n-tag>
          </n-space>
        </n-space>
      </template>
    </FunctionCard>
  </div>
</template>
