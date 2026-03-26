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
	// URL utilities - class and functions
	Url,
	parse,
	stringify,
	getOrigin,
	getHost,
	getHostname,
	getPathname,
	getSearch,
	getHash,
} from 'js-cool'
import { ua, type UAInfo } from 'js-cool'
import { useI18n } from '@/locales'

const { t } = useI18n()

const paramStr = ref('a=1&b=2&c=true&d=null')
const paramObj = ref({ name: 'John', age: 25, active: true })
const dirUrl = ref('https://example.com/user/123/profile')
const compareA = ref('1.2.3')
const compareB = ref('1.2.4')
const versionInput = ref('1.2.3')

// Url class examples - chainable builder
const urlBuilderInput = ref('https://api.example.com')
const urlBuilderOutput = computed(() => {
	return new Url(urlBuilderInput.value)
		.path('users', '123')
		.set('fields', 'name,email')
		.setHashPath('section')
		.toString()
})

// Url instance example
const urlInstanceInput = ref('https://example.com:8080/api/users?id=123&page=1#section')
const urlInstance = computed(() => new Url(urlInstanceInput.value))

// Url params operation example
const urlParamsInput = ref('https://a.cn/?ss=1#/path?bb=343')
const urlParamsKey = ref('ss')
const urlParamsScope = ref<'search' | 'hash' | 'all'>('all')

const urlParamsResult = computed(() => {
	const u = new Url(urlParamsInput.value)
	return {
		get: u.get(urlParamsKey.value, urlParamsScope.value),
		has: u.has(urlParamsKey.value, urlParamsScope.value),
		keys: u.keys(urlParamsScope.value === 'all' ? undefined : urlParamsScope.value),
		toObject: u.toObject(urlParamsScope.value === 'all' ? undefined : urlParamsScope.value),
		toDetailObject: u.toDetailObject(),
	}
})

// Url builder example
const urlBuilderInput2 = ref('https://api.example.com')
const urlBuilderOutput2 = computed(() => {
	return new Url(urlBuilderInput2.value)
		.set('token', 'abc123')
		.set('page', 1)
		.set('tab', 'profile', 'hash')
		.setHashPath('/user/settings')
		.toURL()
})

// Hash params example
const hashUrlInput = ref('https://example.com#/profile?tab=settings&mode=dark')
const hashUrlInstance = computed(() => new Url(hashUrlInput.value))

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

		<!-- Url class - chainable builder -->
		<FunctionCard
			:title="t.url.classChainBuildTitle"
			:description="t.url.classChainBuildDesc"
			since="6.0.0"
			:code="`import { Url } from 'js-cool'

// Chainable URL builder
const url = new Url('https://api.example.com')
  .path('users', '123')
  .set('fields', 'name,email')
  .setHashPath('section')
  .toString()
// 'https://api.example.com/users/123?fields=name,email#section'

// Params operations
const u = new Url('https://example.com?id=123&token=abc')
u.get('id')           // '123'
u.set('page', 2)      // chainable
u.delete('token')     // chainable
u.toString()          // 'https://example.com/?id=123&page=2'`"
		>
			<template #input>
				<n-space vertical style="width: 100%">
					<n-input v-model:value="urlBuilderInput" style="width: 100%" placeholder="Enter base URL" />
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<code class="code-inline">.path('users', '123').set('fields', 'name,email').setHashPath('section')</code>
					<n-tag type="info" size="small" :bordered="false" style="max-width: 100%; overflow-wrap: break-word">{{
						urlBuilderOutput
					}}</n-tag>
				</n-space>
			</template>
		</FunctionCard>

		<!-- Url class - URL properties -->
		<FunctionCard
			:title="t.url.classPropertiesTitle"
			:description="t.url.classPropertiesDesc"
			since="6.0.0"
			:code="`import { Url } from 'js-cool'

const u = new Url('https://example.com:8080/api/users?id=123#section')

u.origin    // 'https://example.com:8080'
u.host      // 'example.com:8080'
u.hostname  // 'example.com'
u.pathname  // '/api/users'
u.search    // '?id=123'
u.hash      // '#section'`"
		>
			<template #input>
				<n-input v-model:value="urlInstanceInput" style="width: 100%" />
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">.origin</code>
						<n-tag type="info" size="small" :bordered="false">{{ urlInstance.origin }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">.host</code>
						<n-tag type="info" size="small" :bordered="false">{{ urlInstance.host }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">.hostname</code>
						<n-tag type="info" size="small" :bordered="false">{{ urlInstance.hostname }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">.pathname</code>
						<n-tag type="info" size="small" :bordered="false">{{ urlInstance.pathname }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">.search</code>
						<n-tag type="info" size="small" :bordered="false">{{ urlInstance.search }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">.hash</code>
						<n-tag type="info" size="small" :bordered="false">{{ urlInstance.hash }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- Url class - search/hash params -->
		<FunctionCard
			:title="t.url.classParamsTitle"
			:description="t.url.classParamsDesc"
			since="6.0.0"
			:code="`import { Url } from 'js-cool'

const u = new Url('https://a.cn/?ss=1#/path?bb=343')

// Auto search from search + hash (hash priority)
u.get('ss')              // '1' (from search)
u.get('bb')              // '343' (from hash)

// Specify scope
u.get('ss', 'search')    // '1'
u.get('ss', 'hash')      // null
u.get('ss', 'all')       // '1' (default, hash priority)

// Get all params
u.toObject()             // { ss: '1', bb: '343' }
u.toObject('search')     // { ss: '1' }
u.toObject('hash')       // { bb: '343' }`"
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
						<code class="code-inline">.get('{{ urlParamsKey }}', '{{ urlParamsScope }}')</code>
						<n-tag type="info" size="small" :bordered="false">{{
							urlParamsResult.get ?? 'null'
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">.has('{{ urlParamsKey }}', '{{ urlParamsScope }}')</code>
						<n-tag :type="urlParamsResult.has ? 'success' : 'default'" size="small" :bordered="false">{{
							urlParamsResult.has
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">.keys('{{ urlParamsScope }}')</code>
						<n-tag type="info" size="small" :bordered="false">{{
							JSON.stringify(urlParamsResult.keys)
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">.toObject('{{ urlParamsScope }}')</code>
						<n-tag type="info" size="small" :bordered="false">{{
							JSON.stringify(urlParamsResult.toObject)
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- Url.toDetailObject() -->
		<FunctionCard
			title="Url.toDetailObject()"
			:description="t.url.toDetailObjectDesc"
			since="6.0.0"
			:code="`const u = new Url('https://a.cn/?ss=1#/path?bb=343')
u.toDetailObject()
// {
//   search: { ss: '1' },
//   hash: { bb: '343' },
//   all: { ss: '1', bb: '343' },
//   source: { ss: 'search', bb: 'hash' }
// }

// Duplicate key tracking
new Url('https://example.com?token=old#/path?token=new')
  .toDetailObject()
// { ..., source: { token: 'both' } }`"
		>
			<template #result>
				<pre class="code-block">{{ JSON.stringify(urlParamsResult.toDetailObject, null, 2) }}</pre>
			</template>
		</FunctionCard>

		<!-- Url chain modification -->
		<FunctionCard
			:title="t.url.chainModifyTitle"
			:description="t.url.chainModifyDesc"
			since="6.0.0"
			:code="`import { Url } from 'js-cool'

const url = new Url('https://api.example.com')
  .set('token', 'abc123')
  .set('page', 1)
  .set('tab', 'profile', 'hash')  // set hash param
  .setHashPath('/user/settings')   // set hash path
  .toURL()
// 'https://api.example.com/?token=abc123&page=1#/user/settings?tab=profile'`"
		>
			<template #input>
				<n-input v-model:value="urlBuilderInput2" style="width: 100%" placeholder="Base URL" />
			</template>
			<template #result>
				<n-space vertical>
					<code class="code-inline">.set('token', 'abc123').set('page', 1).set('tab', 'profile', 'hash').setHashPath('/user/settings')</code>
					<n-tag type="info" size="small" :bordered="false" style="max-width: 100%; overflow-wrap: break-word">{{
						urlBuilderOutput2
					}}</n-tag>
				</n-space>
			</template>
		</FunctionCard>

		<!-- Hash params handling -->
		<FunctionCard
			:title="t.url.hashParamsTitle"
			:description="t.url.hashParamsDesc"
			since="6.0.0"
			:code="`import { Url } from 'js-cool'

const u = new Url('https://example.com#/profile?tab=settings&mode=dark')

// Get hash params
u.get('tab', 'hash')      // 'settings'
u.get('mode', 'hash')     // 'dark'

// Get hash path
u.getHashPath()           // '/profile'

// Get all hash params
u.toObject('hash')        // { tab: 'settings', mode: 'dark' }`"
		>
			<template #input>
				<n-input v-model:value="hashUrlInput" style="width: 100%" />
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">.getHashPath()</code>
						<n-tag type="info" size="small" :bordered="false">{{ hashUrlInstance.getHashPath() }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">.toObject('hash')</code>
						<n-tag type="info" size="small" :bordered="false">{{ JSON.stringify(hashUrlInstance.toObject('hash')) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- Static methods - parse / stringify -->
		<FunctionCard
			:title="t.url.parseStringifyTitle"
			:description="t.url.parseStringifyDesc"
			since="6.0.0"
			:code="`import { Url, parse, stringify } from 'js-cool'

// Parse query string
Url.parse('a=1&b=2&c=true')
// { a: '1', b: '2', c: 'true' }

Url.parse('a=1&b=2&c=true', { convert: true })
// { a: 1, b: 2, c: true }  // auto type conversion

// Build query string
Url.stringify({ name: 'John', age: 25 })
// '?name=John&age=25'

// Standalone functions (recommended)
parse('?a=1&b=true', { convert: true })
// { a: 1, b: true }

stringify({ name: 'John' }, { withQuestionMark: false })
// 'name=John'`"
		>
			<template #input>
				<n-input v-model:value="paramStr" style="width: 300px" />
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">parse(str)</code>
						<n-tag type="info" size="small" :bordered="false">{{
							JSON.stringify(parse(paramStr))
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">parse(str, { convert: true })</code>
						<n-tag type="info" size="small" :bordered="false">{{
							JSON.stringify(parse(paramStr, { convert: true }))
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">stringify(obj)</code>
						<n-tag type="info" size="small" :bordered="false">{{
							stringify(paramObj)
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- URL property extraction -->
		<FunctionCard
			:title="t.url.extractTitle"
			:description="t.url.extractDesc"
			since="6.0.0"
			:code="`import { getOrigin, getHost, getHostname, getPathname, getSearch, getHash } from 'js-cool'

getOrigin('https://example.com:8080/path')
// 'https://example.com:8080'

getHost('https://example.com:8080/path')
// 'example.com:8080'

getHostname('https://example.com:8080/path')
// 'example.com'

getPathname('https://example.com/api/users?id=1')
// '/api/users'

getSearch('https://example.com?key=value')
// '?key=value'

getHash('https://example.com#section')
// '#section'`"
		>
			<template #input>
				<n-input v-model:value="urlInstanceInput" style="width: 100%" />
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">getOrigin(url)</code>
						<n-tag type="info" size="small" :bordered="false">{{ getOrigin(urlInstanceInput) }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">getHost(url)</code>
						<n-tag type="info" size="small" :bordered="false">{{ getHost(urlInstanceInput) }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">getHostname(url)</code>
						<n-tag type="info" size="small" :bordered="false">{{ getHostname(urlInstanceInput) }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">getPathname(url)</code>
						<n-tag type="info" size="small" :bordered="false">{{ getPathname(urlInstanceInput) }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">getSearch(url)</code>
						<n-tag type="info" size="small" :bordered="false">{{ getSearch(urlInstanceInput) }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">getHash(url)</code>
						<n-tag type="info" size="small" :bordered="false">{{ getHash(urlInstanceInput) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- getDirParams -->
		<FunctionCard
			title="getDirParams"
			:description="t.url.getDirParamsDesc"
			since="6.0.0"
			:code="`import { getDirParams } from 'js-cool'

getDirParams('https://example.com/user/123/profile')
// {
//   origin: 'https://example.com',
//   host: 'example.com',
//   hostname: 'example.com',
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

		<!-- Url static factory methods -->
		<FunctionCard
			:title="t.url.staticFactoryTitle"
			:description="t.url.staticFactoryDesc"
			since="6.0.0"
			:code="`import { Url } from 'js-cool'

// Create from current page URL (browser environment)
const currentUrl = Url.current()

// Create from query string
const params = Url.fromQueryString('a=1&b=2')
params.toObject()  // { a: '1', b: '2' }`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">Url.current()</code>
						<n-tag type="info" size="small" :bordered="false">{{ Url.current()?.toString() ?? t.url.notBrowserEnv }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">Url.fromQueryString('a=1&b=2').toObject()</code>
						<n-tag type="info" size="small" :bordered="false">{{ JSON.stringify(Url.fromQueryString('a=1&b=2').toObject()) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- UA Detection -->
		<FunctionCard
			:title="t.url.uaTitle"
			:description="t.url.uaDesc"
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

		<!-- browserVersion / osVersion -->
		<FunctionCard
			title="browserVersion / osVersion / appVersion"
			:description="t.url.browserOsVersionDesc"
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
			:description="t.url.compareVersionDesc"
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
			:description="t.url.nextVersionDesc"
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
