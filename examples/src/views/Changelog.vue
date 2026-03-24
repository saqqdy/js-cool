<script setup lang="ts">
import { computed } from 'vue'
import { NH1, NTag, NGrid, NGi, NIcon } from 'naive-ui'
import {
	AddCircleOutline,
	BuildOutline,
	BugOutline,
	WarningOutline,
	ArrowForwardOutline,
} from '@vicons/ionicons5'
import { changelog, getChangesByType } from '@/data/changelog'
import { useI18n } from '@/locales'

const { locale } = useI18n()

const typeConfig = {
	new: {
		label: 'New',
		labelZh: '新增',
		color: 'success' as const,
		icon: AddCircleOutline,
	},
	update: {
		label: 'Update',
		labelZh: '更新',
		color: 'info' as const,
		icon: BuildOutline,
	},
	fix: {
		label: 'Fix',
		labelZh: '修复',
		color: 'warning' as const,
		icon: BugOutline,
	},
	breaking: {
		label: 'Breaking',
		labelZh: '破坏性变更',
		color: 'error' as const,
		icon: WarningOutline,
	},
}

const groupedChanges = computed(() =>
	[
		{ type: 'new' as const, items: getChangesByType('new') },
		{ type: 'update' as const, items: getChangesByType('update') },
		{ type: 'fix' as const, items: getChangesByType('fix') },
		{ type: 'breaking' as const, items: getChangesByType('breaking') },
	].filter(g => g.items.length > 0)
)

const categoryPaths: Record<string, string> = {
	String: 'string',
	Array: 'array',
	Object: 'object',
	Typecheck: 'typecheck',
	Validate: 'validate',
	Url: 'url',
	Dom: 'dom',
	Scroll: 'scroll',
	Storage: 'storage',
	Convert: 'convert',
	Number: 'number',
	Date: 'date',
	Color: 'color',
	Utility: 'utility',
	Async: 'async',
	Encode: 'encode',
	Network: 'network',
	Patterns: 'utility',
	Core: '',
}

const getDescription = (item: (typeof changelog.changes)[0]) => {
	return locale.value === 'zh' ? item.descriptionZh : item.description
}
</script>

<template>
	<div>
		<!-- Header -->
		<n-h1 style="display: flex; align-items: center; gap: 12px">
			<span>{{ locale === 'zh' ? '更新日志' : 'Changelog' }}</span>
			<n-tag type="primary" round>v{{ changelog.version }}</n-tag>
		</n-h1>

		<p class="text-muted" style="margin-bottom: 24px">
			{{ locale === 'zh' ? changelog.summaryZh : changelog.summary }}
		</p>

		<!-- Migration Guide Link -->
		<div v-if="changelog.migrationGuide" style="margin-bottom: 24px">
			<a
				:href="changelog.migrationGuide"
				target="_blank"
				style="
					display: inline-flex;
					align-items: center;
					gap: 6px;
					color: var(--primary-color, #2080f0);
					text-decoration: none;
					font-size: 14px;
				"
			>
				<n-icon size="16" :component="ArrowForwardOutline" />
				{{ locale === 'zh' ? '迁移指南 v5 → v6' : 'Migration Guide v5 → v6' }}
			</a>
		</div>

		<!-- Changes by Type -->
		<div v-for="group in groupedChanges" :key="group.type" style="margin-bottom: 32px">
			<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px">
				<n-icon
					size="20"
					:component="typeConfig[group.type].icon"
					:color="
						typeConfig[group.type].color === 'success'
							? '#18a058'
							: typeConfig[group.type].color === 'info'
								? '#2080f0'
								: typeConfig[group.type].color === 'warning'
									? '#f0a020'
									: '#d03050'
					"
				/>
				<h3 style="margin: 0; font-size: 16px; font-weight: 600">
					{{
						locale === 'zh'
							? typeConfig[group.type].labelZh
							: typeConfig[group.type].label
					}}
				</h3>
				<n-tag size="small" :type="typeConfig[group.type].color">{{
					group.items.length
				}}</n-tag>
			</div>

			<n-grid :cols="1" :x-gap="12" :y-gap="12">
				<n-gi v-for="item in group.items" :key="item.name">
					<router-link
						v-if="categoryPaths[item.category]"
						:to="`/${categoryPaths[item.category]}${item.anchor ? '#' + item.anchor : ''}`"
						style="text-decoration: none; color: inherit"
					>
						<div class="changelog-item">
							<div style="flex: 1; min-width: 0">
								<div
									style="
										display: flex;
										align-items: center;
										gap: 8px;
										margin-bottom: 4px;
									"
								>
									<code class="func-name">{{ item.name }}</code>
									<n-tag size="tiny" type="default">{{ item.category }}</n-tag>
								</div>
								<p class="text-muted" style="font-size: 13px; margin: 0">
									{{ getDescription(item) }}
								</p>
							</div>
							<n-icon class="text-muted" style="flex-shrink: 0"
								><ArrowForwardOutline
							/></n-icon>
						</div>
					</router-link>
					<div v-else class="changelog-item" style="cursor: default">
						<div style="flex: 1; min-width: 0">
							<div
								style="
									display: flex;
									align-items: center;
									gap: 8px;
									margin-bottom: 4px;
								"
							>
								<code class="func-name">{{ item.name }}</code>
								<n-tag size="tiny" type="default">{{ item.category }}</n-tag>
							</div>
							<p class="text-muted" style="font-size: 13px; margin: 0">
								{{ getDescription(item) }}
							</p>
						</div>
					</div>
				</n-gi>
			</n-grid>
		</div>

		<!-- Legend -->
		<div class="legend-box">
			<p style="font-size: 12px; margin: 0">
				{{
					locale === 'zh'
						? '提示：点击条目可跳转到对应方法的详细用法'
						: 'Tip: Click on an item to navigate to the function for detailed usage'
				}}
			</p>
		</div>
	</div>
</template>

<style scoped>
.changelog-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px 16px;
	background: var(--item-bg, #f9f9f9);
	border-radius: 8px;
	cursor: pointer;
	transition: background 0.2s;
}

.changelog-item:hover {
	background: var(--item-hover-bg, #f0f0f0);
}

.func-name {
	font-size: 14px;
	font-weight: 500;
	color: var(--text-color, #333);
}

.text-muted {
	color: var(--text-muted, #666);
}

.legend-box {
	margin-top: 32px;
	padding: 16px;
	background: var(--legend-bg, #f5f5f5);
	border-radius: 8px;
	color: var(--text-muted, #999);
}

/* Dark mode */
:global(.dark) .changelog-item {
	--item-bg: #2d2d2d;
	--item-hover-bg: #3d3d3d;
}

:global(.dark) .func-name {
	--text-color: #e0e0e0;
}

:global(.dark) .text-muted {
	--text-muted: #999;
}

:global(.dark) .legend-box {
	--legend-bg: #2d2d2d;
	--text-muted: #888;
}
</style>
