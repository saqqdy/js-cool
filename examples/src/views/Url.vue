<script setup lang="ts">
import { ref, computed } from 'vue'
import { NH1, NInput, NTag, NSpace, NTabs, NTabPane } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import {
	getUrlParams,
	getUrlParam,
	parseUrlParam,
	spliceUrlParam,
	getDirParams,
	appVersion,
	browserVersion,
	osVersion,
	compareVersion,
	nextVersion,
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

		<!-- getUrlParams / getUrlParam -->
		<FunctionCard
			title="getUrlParams / getUrlParam"
			description="Parse URL parameters from search string"
			since="1.0.0"
			:code="`getUrlParam('name', '?name=John&age=25')
// 'John'

getUrlParams('?name=John&age=25')
// { name: 'John', age: '25' }`"
		>
			<template #input>
				<n-space vertical>
					<n-input v-model:value="urlInput" style="width: 100%" />
					<n-space align="center">
						<n-input v-model:value="paramKey" style="width: 120px" />
						<span style="color: #666">→</span>
						<n-tag type="info" size="small" :bordered="false">{{
							getUrlParam(paramKey, urlInput)
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">getUrlParams(url)</code>
						<n-tag type="info" size="small" :bordered="false">{{
							JSON.stringify(getUrlParams(urlInput))
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">getUrlParams(url, true)</code>
						<n-tag type="info" size="small" :bordered="false">{{
							JSON.stringify(getUrlParams(urlInput, true))
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- parseUrlParam / spliceUrlParam -->
		<FunctionCard
			title="parseUrlParam / spliceUrlParam"
			description="Parse and build URL parameters"
			since="1.0.0"
			:code="`parseUrlParam('a=1&b=2&c=true')
// { a: '1', b: '2', c: 'true' }

spliceUrlParam({ name: 'John', age: 25 })
// 'name=John&age=25'`"
		>
			<template #input>
				<n-input v-model:value="paramStr" style="width: 300px" />
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">parseUrlParam(str)</code>
						<n-tag type="info" size="small" :bordered="false">{{
							JSON.stringify(parseUrlParam(paramStr))
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">parseUrlParam(str, true)</code>
						<n-tag type="info" size="small" :bordered="false">{{
							JSON.stringify(parseUrlParam(paramStr, true))
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">spliceUrlParam</code>
						<n-tag type="info" size="small" :bordered="false">{{
							spliceUrlParam(paramObj)
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
