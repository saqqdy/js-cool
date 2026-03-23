<script setup lang="ts">
import { ref, computed, onMounted, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { darkTheme, NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import {
	HomeOutline,
	TextOutline,
	LayersOutline,
	CubeOutline,
	SearchOutline,
	CheckmarkCircleOutline,
	GlobeOutline,
	FingerPrintOutline,
	SaveOutline,
	SyncOutline,
	RemoveOutline,
	CalendarOutline,
	ColorPaletteOutline,
	BuildOutline,
	FlashOutline,
	LockClosedOutline,
	WifiOutline,
	SunnyOutline,
	MoonOutline,
	LogoGithub,
	ChevronDownOutline,
	LanguageOutline,
	RocketOutline,
	ArrowDownOutline,
} from '@vicons/ionicons5'
import { useI18n } from './locales'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('json', json)
hljs.registerLanguage('js', javascript)

const route = useRoute()
const router = useRouter()
const searchQuery = ref('')
const sidebarCollapsed = ref(false)
const isDark = ref(false)
const { t, locale, toggleLocale } = useI18n()

const renderIcon = (icon: any) => {
	return () => h(NIcon, null, { default: () => h(icon) })
}

const categories = [
	{ name: 'String', path: 'string', icon: TextOutline },
	{ name: 'Array', path: 'array', icon: LayersOutline },
	{ name: 'Object', path: 'object', icon: CubeOutline },
	{ name: 'Typecheck', path: 'typecheck', icon: SearchOutline },
	{ name: 'Validate', path: 'validate', icon: CheckmarkCircleOutline },
	{ name: 'Url', path: 'url', icon: GlobeOutline },
	{ name: 'Dom', path: 'dom', icon: FingerPrintOutline },
	{ name: 'Scroll', path: 'scroll', icon: ArrowDownOutline },
	{ name: 'Storage', path: 'storage', icon: SaveOutline },
	{ name: 'Convert', path: 'convert', icon: SyncOutline },
	{ name: 'Number', path: 'number', icon: RemoveOutline },
	{ name: 'Date', path: 'date', icon: CalendarOutline },
	{ name: 'Color', path: 'color', icon: ColorPaletteOutline },
	{ name: 'Utility', path: 'utility', icon: BuildOutline },
	{ name: 'Async', path: 'async', icon: FlashOutline },
	{ name: 'Encode', path: 'encode', icon: LockClosedOutline },
	{ name: 'Network', path: 'network', icon: WifiOutline },
]

const menuOptions: MenuOption[] = [
	{
		label: () =>
			h(
				'a',
				{
					href: '/js-cool/',
					class: route.path === '/' ? 'n-menu-item-content--selected' : '',
				},
				t.value.home
			),
		key: 'home',
		icon: renderIcon(HomeOutline),
	},
	{
		label: () =>
			h('a', { href: '/js-cool/changelog' }, t.value.categoriesDesc.Changelog || 'Changelog'),
		key: 'changelog',
		icon: renderIcon(RocketOutline),
	},
	{ type: 'divider', key: 'd1' },
	...categories.map(cat => ({
		label: () =>
			h(
				'a',
				{ href: `/js-cool/${cat.path}` },
				t.value.categoriesDesc[cat.name as keyof typeof t.value.categoriesDesc] || cat.name
			),
		key: cat.path,
		icon: renderIcon(cat.icon),
	})),
]

const filteredMenuOptions = computed(() => {
	if (!searchQuery.value) return menuOptions
	return menuOptions.filter(item => {
		if (item.type === 'divider') return true
		const label =
			typeof item.label === 'function'
				? (item.label() as any)?.children?.default?.()?.[0]?.children || ''
				: item.label
		return label.toLowerCase().includes(searchQuery.value.toLowerCase())
	})
})

const dropdownOptions = categories.map(cat => ({
	label: cat.name,
	key: cat.path,
	icon: renderIcon(cat.icon),
}))

const toggleDark = () => {
	isDark.value = !isDark.value
	document.documentElement.classList.toggle('dark', isDark.value)
	localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const handleDropdownSelect = (key: string) => {
	router.push(`/${key}`)
}

onMounted(() => {
	const savedTheme = localStorage.getItem('theme')
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
	isDark.value = savedTheme ? savedTheme === 'dark' : prefersDark
	document.documentElement.classList.toggle('dark', isDark.value)
})
</script>

<template>
	<n-config-provider :theme="isDark ? darkTheme : null" :hljs="hljs">
		<n-layout has-sider style="height: 100vh">
			<!-- Sidebar -->
			<n-layout-sider
				bordered
				collapse-mode="width"
				:collapsed-width="64"
				:width="240"
				:collapsed="sidebarCollapsed"
				show-trigger
				@collapse="sidebarCollapsed = true"
				@expand="sidebarCollapsed = false"
				:native-scrollbar="false"
			>
				<div class="p-4">
					<n-input
						v-model:value="searchQuery"
						:placeholder="t.search"
						size="small"
						clearable
					/>
				</div>
				<n-menu
					:options="filteredMenuOptions"
					:collapsed="sidebarCollapsed"
					:collapsed-width="64"
					:collapsed-icon-size="22"
					:value="route.path.slice(1) || 'home'"
				/>
			</n-layout-sider>

			<n-layout>
				<!-- Header -->
				<n-layout-header
					bordered
					style="
						height: 56px;
						padding: 0 16px;
						display: flex;
						align-items: center;
						justify-content: space-between;
					"
				>
					<div class="flex items-center gap-3">
						<router-link to="/" class="flex items-center gap-2 no-underline">
							<n-tag type="primary" size="small" round><strong>JS</strong></n-tag>
							<span class="font-semibold">js-cool</span>
						</router-link>

						<n-dropdown
							:options="dropdownOptions"
							@select="handleDropdownSelect"
							placement="bottom-start"
						>
							<n-button text>
								{{ t.categories }}
								<template #icon>
									<n-icon><ChevronDownOutline /></n-icon>
								</template>
							</n-button>
						</n-dropdown>
					</div>

					<div class="flex items-center gap-2">
						<n-tooltip trigger="hover">
							<template #trigger>
								<n-button quaternary circle @click="toggleLocale">
									<template #icon>
										<n-icon><LanguageOutline /></n-icon>
									</template>
								</n-button>
							</template>
							{{ locale === 'en' ? '中文' : 'English' }}
						</n-tooltip>
						<n-button quaternary circle @click="toggleDark">
							<template #icon>
								<n-icon
									><MoonOutline v-if="isDark" /><SunnyOutline v-else
								/></n-icon>
							</template>
						</n-button>
						<n-button
							quaternary
							circle
							tag="a"
							href="https://github.com/saqqdy/js-cool"
							target="_blank"
						>
							<template #icon>
								<n-icon><LogoGithub /></n-icon>
							</template>
						</n-button>
					</div>
				</n-layout-header>

				<!-- Content -->
				<n-layout-content :native-scrollbar="false" style="padding: 24px">
					<div style="max-width: 900px; margin: 0 auto">
						<router-view />
					</div>
				</n-layout-content>
			</n-layout>
		</n-layout>
	</n-config-provider>
</template>

<style scoped>
.font-semibold {
	font-weight: 600;
}

.no-underline {
	text-decoration: none;
	color: inherit;
}

.flex {
	display: flex;
}

.items-center {
	align-items: center;
}

.gap-2 {
	gap: 8px;
}

.gap-3 {
	gap: 12px;
}

.p-4 {
	padding: 16px;
}
</style>
