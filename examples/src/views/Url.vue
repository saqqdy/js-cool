<script setup lang="ts">
import { ref, computed } from 'vue'
import { NH1, NInput, NTag, NSpace, NTabs, NTabPane } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import {
	getDirParams,
	appVersion,
	browserVersion,
	osVersion,
	compareVersion,
	nextVersion,
	// URL utilities - class and namespace
	url,
	Url,
	// URLParams class
	URLParams,
} from 'js-cool'
import { ua, type UAInfo } from 'js-cool'
import { useI18n } from '@/locales'

const { t } = useI18n()

const urlInput = ref('https://example.com?name=John&age=25&active=true')
const paramKey = ref('name')
const paramStr = ref('a=1&b=2&c=true&d=null')
const paramObj = ref({ name: 'John', age: 25, active: true })
const dirUrl = ref('https://example.com/user/123/profile')
const compareA = ref('1.2.3')
const compareB = ref('1.2.4')
const versionInput = ref('1.2.3')

// Url class examples
const urlBuilderInput = ref('https://api.example.com')
const urlBuilderOutput = computed(() => {
	return new Url(urlBuilderInput.value)
		.path('users', '123')
		.set('fields', 'name,email')
		.setHash('section')
		.toString()
})

// url namespace examples
const urlForPatterns = ref('https://example.com:8080/api/users?id=123&page=1#section')
const urlParamName = ref('id')
const urlParamValue = ref('2')

// URLParams examples
const urlParamsInput = ref('https://a.cn/?ss=1#/path?bb=343')
const urlParamsKey = ref('ss')
const urlParamsScope = ref<'search' | 'hash' | 'all'>('all')

const urlParamsResult = computed(() => {
	const params = new URLParams(urlParamsInput.value)
	return {
		get: params.get(urlParamsKey.value, urlParamsScope.value),
		has: params.has(urlParamsKey.value, urlParamsScope.value),
		keys: params.keys(urlParamsScope.value === 'all' ? undefined : urlParamsScope.value),
		toObject: params.toObject(urlParamsScope.value === 'all' ? undefined : urlParamsScope.value),
		toDetailObject: params.toDetailObject(),
	}
})

// URLParams builder
const urlParamsBuilderInput = ref('https://api.example.com')
const urlParamsBuilderOutput = computed(() => {
	return new URLParams(urlParamsBuilderInput.value)
		.set('token', 'abc123')
		.set('page', 1)
		.set('tab', 'profile', 'hash')
		.setHashPath('/user/settings')
		.toURL()
})

// getQueryParams / getQueryParam
const hashUrlInput = ref('https://example.com#/profile?tab=settings&mode=dark')

// UA detection
const uaInfo = computed(() => ua.info as UAInfo)
const uaQuickChecks = computed(() => ({
	isMobile: ua.isMobile(),
	isTablet: ua.isTablet(),
	isDesktop: ua.isDesktop(),
	isTouch: ua.isTouch(),
	isiOS: ua.isiOS(),
	isAndroid: ua.isAndroid(),
	isHarmonyOS: ua.isHarmonyOS(),
	isWeChat: ua.isWeChat(),
	isQQ: ua.isQQ(),
	isMiniProgram: ua.isMiniProgram(),
	isDarkMode: ua.isDarkMode(),
}))
const uaNetwork = computed(() => ua.getNetwork())
const uaScreen = computed(() => ua.getScreen())
</script>

<template>
	<div>
		<n-h1>Url</n-h1>
		<p style="color: #666; margin-bottom: 24px">{{ t.categoriesDesc.Url }}</p>

		<!-- url.get / url.parse -->
		<FunctionCard
			title="url.get / url.parse"
			description="Parse URL search parameters (before #) using url namespace"
			since="6.0.0"
			:code="`import { url } from 'js-cool'

url.get('name', '?name=John&age=25')
// 'John'

url.parse('?name=John&age=25')
// { name: 'John', age: '25' }

url.parse('?count=100&active=true', { covert: true })
// { count: 100, active: true }`"
		>
			<template #input>
				<n-space vertical>
					<n-input v-model:value="urlInput" style="width: 100%" />
					<n-space align="center">
						<n-input v-model:value="paramKey" style="width: 120px" />
						<span style="color: #666">→</span>
						<n-tag type="info" size="small" :bordered="false">{{
							url.get(paramKey, urlInput)
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">url.parse(url)</code>
						<n-tag type="info" size="small" :bordered="false">{{
							JSON.stringify(url.parse(urlInput))
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">url.parse(url, { covert: true })</code>
						<n-tag type="info" size="small" :bordered="false">{{
							JSON.stringify(url.parse(urlInput, { covert: true }))
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- URLParams hash params -->
		<FunctionCard
			title="URLParams (hash params)"
			description="Parse URL parameters from hash string (after #) using URLParams class"
			since="6.0.0"
			:code="`import { URLParams } from 'js-cool'

const params = new URLParams('https://example.com#/profile?tab=settings')
params.get('tab', 'hash')
// 'settings'

params.toObject('hash')
// { tab: 'settings' }`"
		>
			<template #input>
				<n-space vertical>
					<n-input v-model:value="hashUrlInput" style="width: 100%" />
					<n-space align="center">
						<n-input v-model:value="paramKey" style="width: 120px" />
						<span style="color: #666">→</span>
						<n-tag type="info" size="small" :bordered="false">{{
							new URLParams(hashUrlInput).get(paramKey, 'hash') ?? 'null'
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">params.toObject('hash')</code>
						<n-tag type="info" size="small" :bordered="false">{{
							JSON.stringify(new URLParams(hashUrlInput).toObject('hash'))
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- URLParams class -->
		<FunctionCard
			title="URLParams class"
			description="Enhanced URLSearchParams that handles both search (#前) and hash (#后) params"
			since="6.0.0"
			:code="`import { URLParams } from 'js-cool'

const params = new URLParams('https://a.cn/?ss=1#/path?bb=343')

// Auto find from search + hash (hash priority)
params.get('ss')     // '1' (from search)
params.get('bb')     // '343' (from hash)

// Specify scope
params.get('ss', 'search')  // '1'
params.get('ss', 'hash')    // null
params.get('ss', 'all')     // '1' (default)

// Get all params
params.toObject()           // { ss: '1', bb: '343' }
params.toDetailObject()     // { search, hash, all, source }`"
		>
			<template #input>
				<n-space vertical style="width: 100%">
					<n-input v-model:value="urlParamsInput" style="width: 100%" placeholder="URL with search and hash params" />
					<n-space align="center">
						<n-input v-model:value="urlParamsKey" style="width: 100px" placeholder="key" />
						<n-space>
							<n-tag
								v-for="scope in ['search', 'hash', 'all'] as const"
								:key="scope"
								:type="urlParamsScope === scope ? 'primary' : 'default'"
								style="cursor: pointer"
								@click="urlParamsScope = scope"
							>
								{{ scope }}
							</n-tag>
						</n-space>
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">params.get('{{ urlParamsKey }}', '{{ urlParamsScope }}')</code>
						<n-tag type="info" size="small" :bordered="false">{{
							urlParamsResult.get ?? 'null'
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">params.has('{{ urlParamsKey }}', '{{ urlParamsScope }}')</code>
						<n-tag :type="urlParamsResult.has ? 'success' : 'default'" size="small" :bordered="false">{{
							urlParamsResult.has
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">params.keys('{{ urlParamsScope }}')</code>
						<n-tag type="info" size="small" :bordered="false">{{
							JSON.stringify(urlParamsResult.keys)
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">params.toObject('{{ urlParamsScope }}')</code>
						<n-tag type="info" size="small" :bordered="false">{{
							JSON.stringify(urlParamsResult.toObject)
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- URLParams detail -->
		<FunctionCard
			title="URLParams.toDetailObject()"
			description="Get detailed params info with source tracking"
			since="6.0.0"
			:code="`params.toDetailObject()
// {
//   search: { ss: '1' },
//   hash: { bb: '343' },
//   all: { ss: '1', bb: '343' },
//   source: { ss: 'search', bb: 'hash' }
// }

// Duplicate key tracking
new URLParams('https://example.com?token=old#/path?token=new')
  .toDetailObject()
// { ..., source: { token: 'both' } }`"
		>
			<template #result>
				<pre class="code-block">{{ JSON.stringify(urlParamsResult.toDetailObject, null, 2) }}</pre>
			</template>
		</FunctionCard>

		<!-- URLParams builder -->
		<FunctionCard
			title="URLParams chaining"
			description="Build URLs with chainable methods"
			since="6.0.0"
			:code="`import { URLParams } from 'js-cool'

const params = new URLParams('https://api.example.com')
  .set('token', 'abc123')
  .set('page', 1)
  .set('tab', 'profile', 'hash')  // set hash param
  .setHashPath('/user/settings')   // set hash path
  .toURL()
// 'https://api.example.com/?token=abc123&page=1#/user/settings?tab=profile'`"
		>
			<template #input>
				<n-input v-model:value="urlParamsBuilderInput" style="width: 100%" placeholder="Base URL" />
			</template>
			<template #result>
				<n-space vertical>
					<code class="code-inline">.set('token', 'abc123').set('page', 1).set('tab', 'profile', 'hash').setHashPath('/user/settings')</code>
					<n-tag type="info" size="small" :bordered="false" style="max-width: 100%; overflow-wrap: break-word">{{
						urlParamsBuilderOutput
					}}</n-tag>
				</n-space>
			</template>
		</FunctionCard>

		<!-- url.parse / url.stringify -->
		<FunctionCard
			title="url.parse / url.stringify"
			description="Parse and build URL query strings using url namespace"
			since="6.0.0"
			:code="`import { url } from 'js-cool'

url.parse('a=1&b=2&c=true')
// { a: '1', b: '2', c: 'true' }

url.parse('a=1&b=2&c=true', { covert: true })
// { a: 1, b: 2, c: true }

url.stringify({ name: 'John', age: 25 })
// '?name=John&age=25'`"
		>
			<template #input>
				<n-input v-model:value="paramStr" style="width: 300px" />
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">url.parse(str)</code>
						<n-tag type="info" size="small" :bordered="false">{{
							JSON.stringify(url.parse(paramStr))
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">url.parse(str, { covert: true })</code>
						<n-tag type="info" size="small" :bordered="false">{{
							JSON.stringify(url.parse(paramStr, { covert: true }))
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">url.stringify(obj)</code>
						<n-tag type="info" size="small" :bordered="false">{{
							url.stringify(paramObj)
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- getDirParams -->
		<FunctionCard
			title="getDirParams"
			description="Parse URL path information into structured components"
			since="6.0.0"
			:code="`getDirParams('https://example.com/user/123/profile')
// {
//   origin: 'https://example.com',
//   host: 'example.com',
//   pathname: '/user/123/profile',
//   segments: ['user', '123', 'profile'],
//   query: '',
//   hash: ''
// }`"
		>
			<template #input>
				<n-input v-model:value="dirUrl" style="width: 100%" />
			</template>
			<template #result>
				<pre class="code-block">{{ JSON.stringify(getDirParams(dirUrl), null, 2) }}</pre>
			</template>
		</FunctionCard>

		<!-- URL Utilities -->
		<FunctionCard
			title="Url class & url namespace"
			description="Chainable URL builder and URLSearchParams-like API"
			since="6.0.0"
			:code="`import { url, Url } from 'js-cool'

// Url class - chainable builder
const u = new Url('https://example.com?id=123')
u.get('id') // '123'
u.set('page', 2).delete('id').toString()

// url namespace - factory + static
url.from('https://example.com?id=123').get('id')
url.parse('?a=1&b=true', { covert: true })
url.getOrigin('https://example.com:8080/path')`"
		>
			<template #input>
				<n-space vertical style="width: 100%">
					<n-input v-model:value="urlBuilderInput" style="width: 100%" placeholder="Enter base URL" />
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">new Url(url).path('users', '123').set('fields', 'name,email').setHash('section')</code>
					</n-space>
					<n-tag type="info" size="small" :bordered="false" style="max-width: 100%; overflow: hidden; text-overflow: ellipsis">{{
						urlBuilderOutput
					}}</n-tag>
				</n-space>
			</template>
		</FunctionCard>

		<!-- URL Static Methods -->
		<FunctionCard
			title="URL Static Methods"
			description="URLSearchParams-like methods and URL property extraction"
			since="6.0.0"
			:code="`import { url } from 'js-cool'

// URLSearchParams-like
url.get('id', 'https://example.com?id=123') // '123'
url.set('page', 2, 'https://example.com') // 'https://example.com/?page=2'

// URL property extraction
url.getOrigin('https://example.com:8080/path') // 'https://example.com:8080'
url.getPathname('https://example.com/api/users') // '/api/users'`"
		>
			<template #input>
				<n-space vertical style="width: 100%">
					<n-input v-model:value="urlForPatterns" style="width: 100%" />
					<n-space>
						<n-input v-model:value="urlParamName" style="width: 80px" placeholder="param" />
						<n-input v-model:value="urlParamValue" style="width: 80px" placeholder="value" />
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">url.get(name, url)</code>
						<n-tag type="info" size="small" :bordered="false">{{
							url.get(urlParamName, urlForPatterns)
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">url.has(name, url)</code>
						<n-tag :type="url.has(urlParamName, urlForPatterns) ? 'success' : 'default'" size="small" :bordered="false">{{
							url.has(urlParamName, urlForPatterns)
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">url.set(name, value, url)</code>
						<n-tag type="info" size="small" :bordered="false" style="max-width: 300px; overflow: hidden; text-overflow: ellipsis">{{
							url.set(urlParamName, urlParamValue, urlForPatterns)
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">url.getOrigin(url)</code>
						<n-tag type="info" size="small" :bordered="false">{{
							url.getOrigin(urlForPatterns)
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">url.getHost(url)</code>
						<n-tag type="info" size="small" :bordered="false">{{
							url.getHost(urlForPatterns)
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">url.getHostname(url)</code>
						<n-tag type="info" size="small" :bordered="false">{{
							url.getHostname(urlForPatterns)
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">url.getPathname(url)</code>
						<n-tag type="info" size="small" :bordered="false">{{
							url.getPathname(urlForPatterns)
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">url.keys(url)</code>
						<n-tag type="info" size="small" :bordered="false">{{
							JSON.stringify(url.keys(urlForPatterns))
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- UA Detection -->
		<FunctionCard
			title="ua (User Agent Detection)"
			description="Comprehensive user agent detection - device, OS, browser, environment"
			since="6.0.0"
			:code="`import { ua } from 'js-cool'

ua.info        // { device, os, browser, environment }
ua.isMobile()  // true/false
ua.isWeChat()  // true/false
ua.isiOS()     // true/false
ua.device      // DeviceInfo
ua.os          // OSInfo
ua.browser     // BrowserInfo`"
		>
			<template #default>
				<n-tabs type="line" size="small">
					<n-tab-pane name="quick" tab="Quick Checks">
						<div class="ua-checks">
							<n-tag
								v-for="(value, key) in uaQuickChecks"
								:key="key"
								:type="value ? 'success' : 'default'"
								size="small"
							>
								{{ key }}: {{ value }}
							</n-tag>
						</div>
					</n-tab-pane>
					<n-tab-pane name="device" tab="Device">
						<pre class="code-block">{{ JSON.stringify(uaInfo.device, null, 2) }}</pre>
					</n-tab-pane>
					<n-tab-pane name="os" tab="OS">
						<pre class="code-block">{{ JSON.stringify(uaInfo.os, null, 2) }}</pre>
					</n-tab-pane>
					<n-tab-pane name="browser" tab="Browser">
						<pre class="code-block">{{ JSON.stringify(uaInfo.browser, null, 2) }}</pre>
					</n-tab-pane>
					<n-tab-pane name="env" tab="Environment">
						<pre class="code-block">{{
							JSON.stringify(uaInfo.environment, null, 2)
						}}</pre>
					</n-tab-pane>
					<n-tab-pane name="network" tab="Network">
						<pre class="code-block">{{ JSON.stringify(uaNetwork, null, 2) }}</pre>
					</n-tab-pane>
					<n-tab-pane name="screen" tab="Screen">
						<pre class="code-block">{{ JSON.stringify(uaScreen, null, 2) }}</pre>
					</n-tab-pane>
				</n-tabs>
			</template>
		</FunctionCard>

		<!-- Tree-shaking example -->
		<FunctionCard
			title="ua properties"
			description="Access device, OS, browser, environment info directly"
			since="6.0.0"
			:code="`// Access info directly
ua.device      // { type, mobile, tablet, desktop, touch, ... }
ua.os          // { name: 'macOS', version: '14.0' }
ua.browser     // { name: 'Chrome', version: '123.0', engine: 'Blink' }
ua.environment // { wechat, qq, miniProgram, ... }
ua.userAgent   // Full UA string`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">ua.isMobile()</code>
						<n-tag type="info" size="small" :bordered="false">{{
							ua.isMobile()
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">ua.isWeChat()</code>
						<n-tag type="info" size="small" :bordered="false">{{
							ua.isWeChat()
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">ua.isiOS()</code>
						<n-tag type="info" size="small" :bordered="false">{{ ua.isiOS() }}</n-tag>
					</n-space>
					<div>
						<code class="code-inline">ua.device</code>
						<pre class="code-block">{{ JSON.stringify(ua.device, null, 2) }}</pre>
					</div>
				</n-space>
			</template>
		</FunctionCard>

		<!-- browserVersion / osVersion -->
		<FunctionCard
			title="browserVersion / osVersion / appVersion"
			description="Get browser and OS information"
			since="1.0.0"
			:code="`browserVersion() // { name: 'Chrome', version: '123.0.0.0' }
osVersion() // { name: 'Mac OS', version: '10.15.7' }
appVersion('Chrome') // '123.0.0.0'`"
		>
			<template #result>
				<n-space vertical>
					<div>
						<code class="code-inline">browserVersion()</code>
						<pre class="code-block">{{
							JSON.stringify(browserVersion(), null, 2)
						}}</pre>
					</div>
					<div>
						<code class="code-inline">osVersion()</code>
						<pre class="code-block">{{ JSON.stringify(osVersion(), null, 2) }}</pre>
					</div>
					<n-space align="center">
						<code class="code-inline">appVersion('Chrome')</code>
						<n-tag type="info" size="small" :bordered="false">{{
							appVersion('Chrome')
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- compareVersion -->
		<FunctionCard
			title="compareVersion"
			description="Compare version numbers"
			since="1.0.0"
			:code="`compareVersion('1.2.3', '1.2.4') // -1
compareVersion('2.0.0', '1.9.9') // 1
compareVersion('1.0.0', '1.0.0') // 0`"
		>
			<template #input>
				<n-space align="center">
					<n-input v-model:value="compareA" style="width: 100px" />
					<span style="color: #666">vs</span>
					<n-input v-model:value="compareB" style="width: 100px" />
					<n-tag type="info" size="small" :bordered="false">{{
						compareVersion(compareA, compareB)
					}}</n-tag>
					<span style="font-size: 12px; color: #666">
						{{
							compareVersion(compareA, compareB) > 0
								? 'A > B'
								: compareVersion(compareA, compareB) < 0
									? 'A < B'
									: 'A = B'
						}}
					</span>
				</n-space>
			</template>
		</FunctionCard>

		<!-- nextVersion -->
		<FunctionCard
			title="nextVersion"
			description="Get next version number"
			since="1.0.0"
			:code="`nextVersion('1.2.3', 'major') // '2.0.0'
nextVersion('1.2.3', 'minor') // '1.3.0'
nextVersion('1.2.3', 'patch') // '1.2.4'`"
		>
			<template #input>
				<n-input v-model:value="versionInput" style="width: 100px" />
			</template>
			<template #result>
				<n-space>
					<n-space align="center">
						<code class="code-inline">major</code>
						<n-tag type="info" size="small" :bordered="false">{{
							nextVersion(versionInput, 'major')
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">minor</code>
						<n-tag type="info" size="small" :bordered="false">{{
							nextVersion(versionInput, 'minor')
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">patch</code>
						<n-tag type="info" size="small" :bordered="false">{{
							nextVersion(versionInput, 'patch')
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>
	</div>
</template>

<style scoped>
.ua-checks {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	padding: 12px 0;
}
</style>
