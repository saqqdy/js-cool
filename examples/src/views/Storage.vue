<script setup lang="ts">
import { ref } from 'vue'
import { NH1, NInput, NTag, NButton, NSpace, NInputNumber } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import {
  setCache,
  getCache,
  delCache,
  setSession,
  getSession,
  delSession,
  setCookie,
  getCookie,
  getCookies,
  delCookie,
} from 'js-cool'
import { useI18n } from '@/locales'

const { t } = useI18n()

// localStorage
const lsKey = ref('myKey')
const lsValue = ref('myValue')
const lsExpire = ref(0)
const lsResult = ref<string | null>(null)

const handleSetCache = () => setCache(lsKey.value, lsValue.value, lsExpire.value || undefined)
const handleGetCache = () => { lsResult.value = getCache(lsKey.value) }
const handleDelCache = () => { delCache(lsKey.value); lsResult.value = null }

// sessionStorage
const ssKey = ref('sessionKey')
const ssValue = ref('sessionValue')
const ssResult = ref<string | null>(null)

const handleSetSession = () => setSession(ssKey.value, ssValue.value)
const handleGetSession = () => { ssResult.value = getSession(ssKey.value) }
const handleDelSession = () => { delSession(ssKey.value); ssResult.value = null }

// Cookie
const cookieKey = ref('myCookie')
const cookieValue = ref('cookieValue')
const cookieDays = ref(1)
const cookieResult = ref<string | null>(null)
const allCookies = ref<Record<string, string>>({})

const handleSetCookie = () => setCookie(cookieKey.value, cookieValue.value, cookieDays.value * 24 * 60 * 60)
const handleGetCookie = () => { cookieResult.value = getCookie(cookieKey.value) }
const handleGetAllCookies = () => { allCookies.value = getCookies() }
const handleDelCookie = () => { delCookie(cookieKey.value); cookieResult.value = null }
</script>

<template>
  <div>
    <n-h1>Storage</n-h1>
    <p style="color: #666; margin-bottom: 24px;">{{ t.categoriesDesc.Storage }}</p>

    <!-- localStorage -->
    <FunctionCard
      title="localStorage"
      description="setCache / getCache / delCache - With optional expiration time (seconds)"
      :tags="['local']"
      :code="`setCache('key', 'value', 3600) // expires in 1 hour
getCache('key') // 'value'
delCache('key')`"
    >
      <template #input>
        <n-space vertical>
          <n-space align="center">
            <n-input v-model:value="lsKey" placeholder="key" style="width: 120px;" />
            <n-input v-model:value="lsValue" placeholder="value" style="width: 120px;" />
            <n-input-number v-model:value="lsExpire" placeholder="expire (s)" style="width: 120px;" :min="0" />
          </n-space>
          <n-space>
            <n-button size="small" @click="handleSetCache">Set</n-button>
            <n-button size="small" @click="handleGetCache">Get</n-button>
            <n-button size="small" type="error" @click="handleDelCache">Delete</n-button>
          </n-space>
        </n-space>
      </template>
      <template #result>
        <n-space align="center">
          <code class="code-inline">Result:</code>
          <n-tag type="info" size="small" :bordered="false">{{ lsResult ?? 'null' }}</n-tag>
        </n-space>
      </template>
    </FunctionCard>

    <!-- sessionStorage -->
    <FunctionCard
      title="sessionStorage"
      description="setSession / getSession / delSession - Session storage with automatic JSON handling"
      :tags="['session']"
      :code="`setSession('key', 'value')
getSession('key') // 'value'
delSession('key')`"
    >
      <template #input>
        <n-space vertical>
          <n-space align="center">
            <n-input v-model:value="ssKey" placeholder="key" style="width: 120px;" />
            <n-input v-model:value="ssValue" placeholder="value" style="width: 120px;" />
          </n-space>
          <n-space>
            <n-button size="small" @click="handleSetSession">Set</n-button>
            <n-button size="small" @click="handleGetSession">Get</n-button>
            <n-button size="small" type="error" @click="handleDelSession">Delete</n-button>
          </n-space>
        </n-space>
      </template>
      <template #result>
        <n-space align="center">
          <code class="code-inline">Result:</code>
          <n-tag type="info" size="small" :bordered="false">{{ ssResult ?? 'null' }}</n-tag>
        </n-space>
      </template>
    </FunctionCard>

    <!-- Cookie -->
    <FunctionCard
      title="Cookie"
      description="setCookie / getCookie / delCookie - Cookie management with expiration"
      :tags="['cookie']"
      :code="`setCookie('key', 'value', 86400) // 1 day
getCookie('key') // 'value'
delCookie('key')`"
    >
      <template #input>
        <n-space vertical>
          <n-space align="center">
            <n-input v-model:value="cookieKey" placeholder="key" style="width: 120px;" />
            <n-input v-model:value="cookieValue" placeholder="value" style="width: 120px;" />
            <n-input-number v-model:value="cookieDays" placeholder="days" style="width: 100px;" :min="1" />
          </n-space>
          <n-space>
            <n-button size="small" @click="handleSetCookie">Set</n-button>
            <n-button size="small" @click="handleGetCookie">Get</n-button>
            <n-button size="small" type="error" @click="handleDelCookie">Delete</n-button>
            <n-button size="small" @click="handleGetAllCookies">Get All</n-button>
          </n-space>
        </n-space>
      </template>
      <template #result>
        <n-space vertical>
          <n-space align="center">
            <code class="code-inline">Result:</code>
            <n-tag type="info" size="small" :bordered="false">{{ cookieResult ?? 'null' }}</n-tag>
          </n-space>
          <pre v-if="Object.keys(allCookies).length" class="code-block">{{ JSON.stringify(allCookies, null, 2) }}</pre>
        </n-space>
      </template>
    </FunctionCard>
  </div>
</template>
