<script setup lang="ts">
import { ref } from 'vue'
import { NH1, NInput, NTag, NButton, NSpace, NInputNumber, NSwitch, NSelect, NCode } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import { storage, local, session, cookie, StorageQuotaError } from 'js-cool'
import type { CookieOptions } from 'js-cool'
import { useI18n } from '@/locales'

const { t } = useI18n()

// ==================== localStorage ====================
const lsKey = ref('myKey')
const lsValue = ref('myValue')
const lsExpire = ref<number | null>(null)
const lsResult = ref<unknown>(null)
const lsKeys = ref<string[]>([])
const lsLength = ref(0)

// localStorage with generic type
interface User {
	id: number
	name: string
	email: string
}
const lsUserKey = ref('user')
const lsUserValue = ref<User>({ id: 1, name: 'John', email: 'john@example.com' })
const lsUserResult = ref<User | null>(null)

const handleLocalSet = () => {
	const options = lsExpire.value ? { expires: lsExpire.value } : undefined
	storage.local.set(lsKey.value, lsValue.value, options)
	updateLocalStats()
}

const handleLocalGet = () => {
	lsResult.value = storage.local.get(lsKey.value)
}

const handleLocalDelete = () => {
	storage.local.delete(lsKey.value)
	lsResult.value = null
	updateLocalStats()
}

const handleLocalHas = () => {
	lsResult.value = storage.local.has(lsKey.value)
}

const handleLocalClear = () => {
	storage.local.clear()
	lsResult.value = null
	updateLocalStats()
}

const handleLocalSetUser = () => {
	storage.local.set<User>(lsUserKey.value, lsUserValue.value, { expires: 3600 })
	updateLocalStats()
}

const handleLocalGetUser = () => {
	lsUserResult.value = storage.local.get<User>(lsUserKey.value)
}

// Direct import usage
const handleLocalDirect = () => {
	// Using directly imported `local`
	local.set('directKey', 'directValue')
	lsResult.value = local.get('directKey')
}

const updateLocalStats = () => {
	lsLength.value = storage.local.length
	lsKeys.value = storage.local.keys()
}

// ==================== sessionStorage ====================
const ssKey = ref('sessionKey')
const ssValue = ref('sessionValue')
const ssExpire = ref<number | null>(null)
const ssResult = ref<unknown>(null)

const handleSessionSet = () => {
	const options = ssExpire.value ? { expires: ssExpire.value } : undefined
	storage.session.set(ssKey.value, ssValue.value, options)
}

const handleSessionGet = () => {
	ssResult.value = storage.session.get(ssKey.value)
}

const handleSessionDelete = () => {
	storage.session.delete(ssKey.value)
	ssResult.value = null
}

const handleSessionClear = () => {
	storage.session.clear()
	ssResult.value = null
}

// Direct import usage
const handleSessionDirect = () => {
	// Using directly imported `session`
	session.set('directSessionKey', 'directSessionValue', { expires: 60 })
	ssResult.value = session.get('directSessionKey')
}

// ==================== Cookie ====================
const cookieKey = ref('myCookie')
const cookieValue = ref('cookieValue')
const cookieExpires = ref(86400) // 1 day in seconds
const cookiePath = ref('/')
const cookieDomain = ref('')
const cookieSecure = ref(false)
const cookieSameSite = ref<'Strict' | 'Lax' | 'None' | undefined>(undefined)
const cookieResult = ref<string | null>(null)
const allCookies = ref<Record<string, string>>({})

const sameSiteOptions = [
	{ label: 'None', value: 'None' },
	{ label: 'Lax', value: 'Lax' },
	{ label: 'Strict', value: 'Strict' },
]

const handleCookieSet = () => {
	const options: CookieOptions = {
		expires: cookieExpires.value,
		path: cookiePath.value || undefined,
		domain: cookieDomain.value || undefined,
		secure: cookieSecure.value,
		sameSite: cookieSameSite.value,
	}
	storage.cookie.set(cookieKey.value, cookieValue.value, options)
}

const handleCookieGet = () => {
	cookieResult.value = storage.cookie.get(cookieKey.value)
}

const handleCookieGetAll = () => {
	allCookies.value = storage.cookie.getAll()
}

const handleCookieDelete = () => {
	storage.cookie.delete(cookieKey.value)
	cookieResult.value = null
}

const handleCookieHas = () => {
	cookieResult.value = storage.cookie.has(cookieKey.value) ? 'exists' : 'not exists'
}

const handleCookieClear = () => {
	storage.cookie.clear()
	allCookies.value = {}
}

// Direct import usage
const handleCookieDirect = () => {
	// Using directly imported `cookie`
	cookie.set('directCookie', 'directValue', { expires: 3600 })
	cookieResult.value = cookie.get('directCookie')
}

// ==================== Error Handling ====================
const errorResult = ref<string>('')

const handleQuotaError = () => {
	try {
		// Try to exceed quota
		const largeData = 'x'.repeat(10 * 1024 * 1024) // 10MB
		storage.local.set('largeData', largeData)
	} catch (e) {
		if (e instanceof StorageQuotaError) {
			errorResult.value = `StorageQuotaError: ${e.message}`
		} else {
			errorResult.value = `Unknown error: ${e}`
		}
	}
}

// ==================== Subpath Import Demo ====================
const subpathResult = ref<string>('')

const handleSubpathImport = () => {
	// This demonstrates subpath import
	// import { storage } from 'js-cool/storage'
	subpathResult.value = `storage.local.length: ${storage.local.length}\nstorage.session.length: ${storage.session.length}\nstorage.cookie.has('test'): ${storage.cookie.has('test')}`
}
</script>

<template>
	<div>
		<n-h1>Storage</n-h1>
		<p style="color: #666; margin-bottom: 24px">{{ t.categoriesDesc.Storage }}</p>

		<!-- localStorage -->
		<FunctionCard
			title="storage.local - localStorage"
			description="Unified localStorage API with expiration, generic types, and error handling"
			since="6.0.0"
			:tags="['local', 'namespace']"
			:code="`import { storage } from 'js-cool'

// Basic usage
storage.local.set('key', 'value')
storage.local.set('key', 'value', { expires: 3600 }) // 1 hour
storage.local.get('key') // 'value'
storage.local.has('key') // true
storage.local.delete('key')
storage.local.keys() // string[]
storage.local.length // number
storage.local.clear()

// Generic type support
interface User { id: number; name: string }
storage.local.set<User>('user', { id: 1, name: 'John' })
const user = storage.local.get<User>('user')`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center">
						<n-input v-model:value="lsKey" placeholder="key" style="width: 120px" />
						<n-input v-model:value="lsValue" placeholder="value" style="width: 120px" />
						<n-input-number
							v-model:value="lsExpire"
							placeholder="expire (s)"
							style="width: 120px"
							:min="0"
							clearable
						/>
					</n-space>
					<n-space>
						<n-button size="small" @click="handleLocalSet">Set</n-button>
						<n-button size="small" @click="handleLocalGet">Get</n-button>
						<n-button size="small" @click="handleLocalHas">Has</n-button>
						<n-button size="small" type="warning" @click="handleLocalDelete">Delete</n-button>
						<n-button size="small" type="error" @click="handleLocalClear">Clear</n-button>
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">Result:</code>
						<n-tag type="info" size="small" :bordered="false">{{
							lsResult ?? 'null'
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">Length: {{ lsLength }}</code>
						<code class="code-inline">Keys: {{ lsKeys.slice(0, 5).join(', ') }}{{ lsKeys.length > 5 ? '...' : '' }}</code>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- localStorage with Generic Type -->
		<FunctionCard
			title="storage.local - Generic Type Support"
			description="Type-safe storage with TypeScript generics"
			since="6.0.0"
			:tags="['local', 'typescript', 'generic']"
			:code="`interface User { id: number; name: string; email: string }
storage.local.set<User>('user', { id: 1, name: 'John', email: 'john@example.com' })
const user = storage.local.get<User>('user')
// user: User | null, fully typed!`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center">
						<n-input v-model:value="lsUserKey" placeholder="key" style="width: 100px" />
						<n-tag size="small">id: {{ lsUserValue.id }}</n-tag>
						<n-tag size="small">name: {{ lsUserValue.name }}</n-tag>
					</n-space>
					<n-space>
						<n-button size="small" @click="handleLocalSetUser">Set User</n-button>
						<n-button size="small" @click="handleLocalGetUser">Get User</n-button>
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-code :code="JSON.stringify(lsUserResult, null, 2)" language="json" />
				</n-space>
			</template>
		</FunctionCard>

		<!-- sessionStorage -->
		<FunctionCard
			title="storage.session - sessionStorage"
			description="Unified sessionStorage API with expiration support"
			since="6.0.0"
			:tags="['session', 'namespace']"
			:code="`import { storage } from 'js-cool'

storage.session.set('key', 'value')
storage.session.set('key', 'value', { expires: 1800 }) // 30 minutes
storage.session.get('key')
storage.session.delete('key')
storage.session.clear()`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center">
						<n-input v-model:value="ssKey" placeholder="key" style="width: 120px" />
						<n-input v-model:value="ssValue" placeholder="value" style="width: 120px" />
						<n-input-number
							v-model:value="ssExpire"
							placeholder="expire (s)"
							style="width: 120px"
							:min="0"
							clearable
						/>
					</n-space>
					<n-space>
						<n-button size="small" @click="handleSessionSet">Set</n-button>
						<n-button size="small" @click="handleSessionGet">Get</n-button>
						<n-button size="small" type="warning" @click="handleSessionDelete">Delete</n-button>
						<n-button size="small" type="error" @click="handleSessionClear">Clear</n-button>
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space align="center">
					<code class="code-inline">Result:</code>
					<n-tag type="info" size="small" :bordered="false">{{
						ssResult ?? 'null'
					}}</n-tag>
				</n-space>
			</template>
		</FunctionCard>

		<!-- Cookie -->
		<FunctionCard
			title="storage.cookie - Cookie"
			description="Full-featured Cookie API with path, domain, secure, and sameSite options"
			since="6.0.0"
			:tags="['cookie', 'namespace']"
			:code="`import { storage } from 'js-cool'

// Basic usage (expires in 1 day by default)
storage.cookie.set('token', 'abc123')

// With options
storage.cookie.set('session', 'xyz', {
  expires: 86400,      // 1 day in seconds
  path: '/',
  domain: '.example.com',
  secure: true,
  sameSite: 'Strict'
})

storage.cookie.get('token')
storage.cookie.getAll()
storage.cookie.has('token')
storage.cookie.delete('session', { path: '/', domain: '.example.com' })
storage.cookie.clear()`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center">
						<n-input v-model:value="cookieKey" placeholder="key" style="width: 100px" />
						<n-input v-model:value="cookieValue" placeholder="value" style="width: 100px" />
						<n-input-number
							v-model:value="cookieExpires"
							placeholder="expires (s)"
							style="width: 120px"
							:min="1"
						/>
					</n-space>
					<n-space align="center">
						<n-input v-model:value="cookiePath" placeholder="path" style="width: 80px" />
						<n-input v-model:value="cookieDomain" placeholder="domain" style="width: 120px" />
						<n-switch v-model:value="cookieSecure" size="small">
							<template #checked>Secure</template>
							<template #unchecked>Secure</template>
						</n-switch>
						<n-select
							v-model:value="cookieSameSite"
							:options="sameSiteOptions"
							placeholder="SameSite"
							style="width: 100px"
							clearable
						/>
					</n-space>
					<n-space>
						<n-button size="small" @click="handleCookieSet">Set</n-button>
						<n-button size="small" @click="handleCookieGet">Get</n-button>
						<n-button size="small" @click="handleCookieHas">Has</n-button>
						<n-button size="small" type="warning" @click="handleCookieDelete">Delete</n-button>
						<n-button size="small" @click="handleCookieGetAll">Get All</n-button>
						<n-button size="small" type="error" @click="handleCookieClear">Clear</n-button>
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">Result:</code>
						<n-tag type="info" size="small" :bordered="false">{{
							cookieResult ?? 'null'
						}}</n-tag>
					</n-space>
					<pre v-if="Object.keys(allCookies).length" class="code-block">{{
						JSON.stringify(allCookies, null, 2)
					}}</pre>
				</n-space>
			</template>
		</FunctionCard>

		<!-- Direct Import -->
		<FunctionCard
			title="Direct Import (Tree-shaking)"
			description="Import storage modules directly for better tree-shaking"
			since="6.0.0"
			:tags="['tree-shaking', 'import']"
			:code="`// Import from main package
import { storage, local, session, cookie } from 'js-cool'

// Or import from subpath (recommended for tree-shaking)
import { storage, local, session, cookie } from 'js-cool/storage'

// Use directly
local.set('key', 'value')
session.set('key', 'value')
cookie.set('key', 'value')`"
		>
			<template #input>
				<n-space>
					<n-button size="small" @click="handleLocalDirect">Test local</n-button>
					<n-button size="small" @click="handleSessionDirect">Test session</n-button>
					<n-button size="small" @click="handleCookieDirect">Test cookie</n-button>
				</n-space>
			</template>
			<template #result>
				<n-space align="center">
					<code class="code-inline">Result:</code>
					<n-tag type="info" size="small" :bordered="false">{{
						lsResult ?? ssResult ?? cookieResult ?? 'click a button'
					}}</n-tag>
				</n-space>
			</template>
		</FunctionCard>

		<!-- Subpath Import -->
		<FunctionCard
			title="Subpath Import: js-cool/storage"
			description="Import storage module from subpath for optimal tree-shaking"
			since="6.0.0"
			:tags="['subpath', 'tree-shaking']"
			:code="`// Import from subpath
import { storage, local, session, cookie } from 'js-cool/storage'
import type { StorageOptions, CookieOptions } from 'js-cool/storage'

// All storage APIs available
storage.local.set('key', 'value')
local.get('key')
session.set('key', 'value')
cookie.set('key', 'value')`"
		>
			<template #input>
				<n-space>
					<n-button size="small" @click="handleSubpathImport">Test Subpath Import</n-button>
				</n-space>
			</template>
			<template #result>
				<pre class="code-block">{{ subpathResult }}</pre>
			</template>
		</FunctionCard>

		<!-- Error Handling -->
		<FunctionCard
			title="Error Handling"
			description="Handle storage quota and availability errors"
			since="6.0.0"
			:tags="['error', 'exception']"
			:code="`import { storage, StorageQuotaError, StorageUnavailableError } from 'js-cool'

try {
  storage.local.set('key', largeData)
} catch (e) {
  if (e instanceof StorageQuotaError) {
    console.error('Storage quota exceeded')
  } else if (e instanceof StorageUnavailableError) {
    console.error('Storage not available (SSR or private mode)')
  }
}`"
		>
			<template #input>
				<n-space>
					<n-button size="small" type="warning" @click="handleQuotaError">Trigger Quota Error</n-button>
				</n-space>
			</template>
			<template #result>
				<n-tag v-if="errorResult" type="error" size="small" :bordered="false">{{ errorResult }}</n-tag>
				<span v-else style="color: #999">Click to test error handling</span>
			</template>
		</FunctionCard>
	</div>
</template>
