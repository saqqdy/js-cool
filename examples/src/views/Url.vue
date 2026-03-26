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

// Url class examples - 链式构建
const urlBuilderInput = ref('https://api.example.com')
const urlBuilderOutput = computed(() => {
	return new Url(urlBuilderInput.value)
		.path('users', '123')
		.set('fields', 'name,email')
		.setHashPath('section')
		.toString()
})

// Url 实例示例
const urlInstanceInput = ref('https://example.com:8080/api/users?id=123&page=1#section')
const urlInstance = computed(() => new Url(urlInstanceInput.value))

// Url 参数操作示例
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

// Url builder 示例
const urlBuilderInput2 = ref('https://api.example.com')
const urlBuilderOutput2 = computed(() => {
	return new Url(urlBuilderInput2.value)
		.set('token', 'abc123')
		.set('page', 1)
		.set('tab', 'profile', 'hash')
		.setHashPath('/user/settings')
		.toURL()
})

// Hash params 示例
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

		<!-- Url 类 - 链式构建 -->
		<FunctionCard
			title="Url class - 链式构建"
			description="使用 Url 类链式构建 URL，支持参数操作、路径设置、hash 操作"
			since="6.0.0"
			:code="`import { Url } from 'js-cool'

// 链式构建 URL
const url = new Url('https://api.example.com')
  .path('users', '123')
  .set('fields', 'name,email')
  .setHashPath('section')
  .toString()
// 'https://api.example.com/users/123?fields=name,email#section'

// 参数操作
const u = new Url('https://example.com?id=123&token=abc')
u.get('id')           // '123'
u.set('page', 2)      // 链式
u.delete('token')     // 链式
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

		<!-- Url 类 - URL 属性访问 -->
		<FunctionCard
			title="Url 类 - URL 属性访问"
			description="获取 URL 的各个组成部分（origin, host, hostname, pathname, search, hash）"
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

		<!-- Url 类 - search/hash 参数操作 -->
		<FunctionCard
			title="Url 类 - search/hash 参数操作"
			description="同时操作 search（#前）和 hash（#后）参数，支持 scope 控制"
			since="6.0.0"
			:code="`import { Url } from 'js-cool'

const u = new Url('https://a.cn/?ss=1#/path?bb=343')

// 自动从 search + hash 查找（hash 优先）
u.get('ss')              // '1' (from search)
u.get('bb')              // '343' (from hash)

// 指定范围
u.get('ss', 'search')    // '1'
u.get('ss', 'hash')      // null
u.get('ss', 'all')       // '1' (默认，hash 优先)

// 获取所有参数
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
			description="获取详细的参数信息，区分参数来源（search/hash/both）"
			since="6.0.0"
			:code="`const u = new Url('https://a.cn/?ss=1#/path?bb=343')
u.toDetailObject()
// {
//   search: { ss: '1' },
//   hash: { bb: '343' },
//   all: { ss: '1', bb: '343' },
//   source: { ss: 'search', bb: 'hash' }
// }

// 重复 key 追踪
new Url('https://example.com?token=old#/path?token=new')
  .toDetailObject()
// { ..., source: { token: 'both' } }`"
		>
			<template #result>
				<pre class="code-block">{{ JSON.stringify(urlParamsResult.toDetailObject, null, 2) }}</pre>
			</template>
		</FunctionCard>

		<!-- Url 链式修改 -->
		<FunctionCard
			title="Url 链式修改"
			description="链式修改 URL 参数、路径、hash"
			since="6.0.0"
			:code="`import { Url } from 'js-cool'

const url = new Url('https://api.example.com')
  .set('token', 'abc123')
  .set('page', 1)
  .set('tab', 'profile', 'hash')  // 设置 hash 参数
  .setHashPath('/user/settings')   // 设置 hash 路径
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

		<!-- Hash 参数处理 -->
		<FunctionCard
			title="Hash 参数处理"
			description="专门处理 hash（#后）参数的场景"
			since="6.0.0"
			:code="`import { Url } from 'js-cool'

const u = new Url('https://example.com#/profile?tab=settings&mode=dark')

// 获取 hash 参数
u.get('tab', 'hash')      // 'settings'
u.get('mode', 'hash')     // 'dark'

// 获取 hash 路径
u.getHashPath()           // '/profile'

// 获取 hash 下所有参数
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

		<!-- 静态方法 - parse / stringify -->
		<FunctionCard
			title="Url.parse() / Url.stringify()"
			description="解析和构建查询字符串（静态方法或独立函数）"
			since="6.0.0"
			:code="`import { Url, parse, stringify } from 'js-cool'

// 解析查询字符串
Url.parse('a=1&b=2&c=true')
// { a: '1', b: '2', c: 'true' }

Url.parse('a=1&b=2&c=true', { convert: true })
// { a: 1, b: 2, c: true }  // 自动转换类型

// 构建查询字符串
Url.stringify({ name: 'John', age: 25 })
// '?name=John&age=25'

// 独立函数（推荐）
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

		<!-- 静态方法 - URL 属性提取 -->
		<FunctionCard
			title="URL 属性提取函数"
			description="从 URL 字符串中提取各个组成部分"
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
			description="解析 URL 路径信息，返回结构化的组成部分"
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

		<!-- Url 静态工厂方法 -->
		<FunctionCard
			title="Url 静态工厂方法"
			description="从当前页面 URL 或查询字符串创建 Url 实例"
			since="6.0.0"
			:code="`import { Url } from 'js-cool'

// 从当前页面 URL 创建（浏览器环境）
const currentUrl = Url.current()

// 从查询字符串创建
const params = Url.fromQueryString('a=1&b=2')
params.toObject()  // { a: '1', b: '2' }`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">Url.current()</code>
						<n-tag type="info" size="small" :bordered="false">{{ Url.current()?.toString() ?? 'null (非浏览器环境)' }}</n-tag>
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
			title="ua (User Agent Detection)"
			description="全面的 User Agent 检测 - 设备、系统、浏览器、环境"
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
			description="获取浏览器和系统信息"
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
			description="比较版本号"
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
			description="获取下一个版本号"
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
