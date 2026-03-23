<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
	NH1,
	NButton,
	NSpace,
	NSlider,
	NSwitch,
	NInputNumber,
	NCode,
	NAlert,
	NRadioGroup,
	NRadio,
} from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import {
	getPosition,
	getProgress,
	createDirectionTracker,
	isInViewport,
	scrollTo,
	scrollToTop,
	scrollToBottom,
	scrollBy,
	lockScroll,
	unlockScroll,
	toggleScroll,
	isScrollLocked,
	getScrollbarWidth,
	type ScrollBehavior,
} from 'js-cool'
import { useI18n } from '@/locales'

const { t } = useI18n()

// getPosition
const scrollPosition = ref<'top' | 'bottom' | undefined>(undefined)
const scrollThreshold = ref(1)

const updateScrollPosition = () => {
	scrollPosition.value = getPosition(window, scrollThreshold.value)
}

// getProgress
const scrollProgress = ref(0)

const updateScrollProgress = () => {
	scrollProgress.value = Math.round(getProgress())
}

// createDirectionTracker
const scrollDirection = ref<'up' | 'down' | null>(null)
let directionTracker: (() => 'up' | 'down' | null) | null = null

const updateDirection = () => {
	if (directionTracker) {
		scrollDirection.value = directionTracker()
	}
}

// isInViewport
const viewportElement = ref<HTMLElement | null>(null)
const isInViewportResult = ref(false)
const fullyInViewport = ref(true)
const viewportOffset = ref(0)

const checkViewport = () => {
	if (viewportElement.value) {
		isInViewportResult.value = !!isInViewport(viewportElement.value, {
			fully: fullyInViewport.value,
			offset: viewportOffset.value,
		})
	}
}

// scrollTo
const scrollOffset = ref(0)
const scrollBehavior = ref<ScrollBehavior>('smooth')

// scrollBy
const scrollAmount = ref(200)

// lockScroll
const locked = ref(false)

const handleLock = () => {
	lockScroll()
	locked.value = isScrollLocked()
}

const handleUnlock = () => {
	unlockScroll()
	locked.value = isScrollLocked()
}

const handleToggle = () => {
	toggleScroll()
	locked.value = isScrollLocked()
}

// getScrollbarWidth
const scrollbarWidth = ref(0)

onMounted(() => {
	// Initialize
	scrollbarWidth.value = getScrollbarWidth()
	directionTracker = createDirectionTracker()

	// Update initial values
	updateScrollPosition()
	updateScrollProgress()

	// Add scroll listener
	window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
	updateScrollPosition()
	updateScrollProgress()
	updateDirection()
	checkViewport()
}
</script>

<template>
	<div>
		<n-h1>Scroll</n-h1>
		<p style="color: #666; margin-bottom: 24px">{{ t.categoriesDesc.Scroll }}</p>

		<!-- getPosition -->
		<FunctionCard
			title="getPosition"
			:description="t.scroll.getPositionDesc"
			since="6.0.0"
			:code="`getPosition(window, ${scrollThreshold})
// 'top' | 'bottom' | undefined`"
		>
			<template #input>
				<n-space align="center" vertical>
					<n-space align="center">
						<span style="font-size: 14px">Threshold:</span>
						<n-input-number
							v-model:value="scrollThreshold"
							:min="0"
							:max="100"
							size="small"
							style="width: 100px"
						/>
						<span style="font-size: 12px; color: #999">px</span>
					</n-space>
					<n-button size="small" @click="updateScrollPosition">Check Position</n-button>
				</n-space>
			</template>
			<template #result>
				<n-code :code="JSON.stringify({ position: scrollPosition })" language="json" />
			</template>
		</FunctionCard>

		<!-- getProgress -->
		<FunctionCard
			title="getProgress"
			:description="t.scroll.getProgressDesc"
			since="6.0.0"
			:code="`getProgress() // 0-100`"
		>
			<template #result>
				<n-space vertical style="width: 100%">
					<n-slider :value="scrollProgress" :step="1" disabled />
					<n-code
						:code="JSON.stringify({ progress: `${scrollProgress}%` })"
						language="json"
					/>
				</n-space>
			</template>
		</FunctionCard>

		<!-- createDirectionTracker -->
		<FunctionCard
			title="createDirectionTracker"
			:description="t.scroll.directionDesc"
			since="6.0.0"
			:code="`const tracker = createDirectionTracker()
window.addEventListener('scroll', () => {
  const dir = tracker() // 'up' | 'down' | null
})`"
		>
			<template #result>
				<n-space align="center">
					<span style="font-size: 14px">Direction:</span>
					<n-button
						:type="
							scrollDirection === 'up'
								? 'success'
								: scrollDirection === 'down'
									? 'warning'
									: 'default'
						"
						size="small"
					>
						{{ scrollDirection || 'none' }}
					</n-button>
					<span style="font-size: 12px; color: #999">(scroll to see changes)</span>
				</n-space>
			</template>
		</FunctionCard>

		<!-- isInViewport -->
		<FunctionCard
			title="isInViewport"
			:description="t.scroll.viewportDesc"
			since="6.0.0"
			:code="`isInViewport(element, { fully: ${fullyInViewport}, offset: ${viewportOffset} })
// true | false`"
		>
			<template #input>
				<n-space align="center" vertical>
					<n-space align="center">
						<span style="font-size: 14px">Fully in viewport:</span>
						<n-switch v-model:value="fullyInViewport" @update:value="checkViewport" />
					</n-space>
					<n-space align="center">
						<span style="font-size: 14px">Offset:</span>
						<n-input-number
							v-model:value="viewportOffset"
							:min="-500"
							:max="500"
							size="small"
							style="width: 100px"
							@update:value="checkViewport"
						/>
						<span style="font-size: 12px; color: #999">px</span>
					</n-space>
				</n-space>
			</template>
			<template #result>
				<div
					ref="viewportElement"
					class="viewport-demo"
					:style="{
						background: isInViewportResult ? '#18a05820' : '#f0f0f0',
						borderColor: isInViewportResult ? '#18a058' : '#ddd',
					}"
				>
					{{ isInViewportResult ? '✓ In viewport' : '✗ Not in viewport' }}
				</div>
			</template>
		</FunctionCard>

		<!-- scrollTo -->
		<FunctionCard
			title="scrollTo"
			:description="t.scroll.scrollToDesc"
			since="6.0.0"
			:code="`scrollTo('#target', { offset: ${scrollOffset}, behavior: '${scrollBehavior}' })`"
		>
			<template #input>
				<n-space align="center" vertical>
					<n-space align="center">
						<span style="font-size: 14px">Offset:</span>
						<n-input-number
							v-model:value="scrollOffset"
							:min="-500"
							:max="500"
							size="small"
							style="width: 100px"
						/>
						<span style="font-size: 12px; color: #999">px</span>
					</n-space>
					<n-space align="center">
						<span style="font-size: 14px">Behavior:</span>
						<n-radio-group v-model:value="scrollBehavior" size="small">
							<n-radio value="smooth">smooth</n-radio>
							<n-radio value="auto">auto</n-radio>
						</n-radio-group>
					</n-space>
					<n-space>
						<n-button
							size="small"
							@click="
								scrollTo('#scroll-demo-target', {
									offset: scrollOffset,
									behavior: scrollBehavior,
								})
							"
						>
							Scroll to Target
						</n-button>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- scrollToTop / scrollToBottom -->
		<FunctionCard
			title="scrollToTop / scrollToBottom"
			:description="t.scroll.topBottomDesc"
			since="6.0.0"
			:code="`scrollToTop({ behavior: 'smooth' })    // Scroll to top
scrollToBottom({ behavior: 'smooth' }) // Scroll to bottom`"
		>
			<template #input>
				<n-space>
					<n-button size="small" @click="scrollToTop({ behavior: scrollBehavior })"
						>Scroll to Top</n-button
					>
					<n-button size="small" @click="scrollToBottom({ behavior: scrollBehavior })"
						>Scroll to Bottom</n-button
					>
				</n-space>
			</template>
		</FunctionCard>

		<!-- scrollBy -->
		<FunctionCard
			title="scrollBy"
			:description="t.scroll.scrollByDesc"
			since="6.0.0"
			:code="`scrollBy(${scrollAmount}, { behavior: '${scrollBehavior}' }) // Scroll down ${scrollAmount}px`"
		>
			<template #input>
				<n-space align="center" vertical>
					<n-space align="center">
						<span style="font-size: 14px">Amount:</span>
						<n-input-number
							v-model:value="scrollAmount"
							:min="-1000"
							:max="1000"
							size="small"
							style="width: 100px"
						/>
						<span style="font-size: 12px; color: #999">px (negative = up)</span>
					</n-space>
					<n-button
						size="small"
						@click="scrollBy(scrollAmount, { behavior: scrollBehavior })"
					>
						Scroll {{ scrollAmount >= 0 ? 'Down' : 'Up' }}
						{{ Math.abs(scrollAmount) }}px
					</n-button>
				</n-space>
			</template>
		</FunctionCard>

		<!-- lockScroll / unlockScroll / toggleScroll -->
		<FunctionCard
			title="lockScroll / unlockScroll / toggleScroll"
			:description="t.scroll.lockDesc"
			since="6.0.0"
			:code="`lockScroll()   // Lock scroll
unlockScroll() // Unlock scroll
toggleScroll() // Toggle lock state
isScrollLocked() // Check status`"
		>
			<template #input>
				<n-space align="center" vertical>
					<n-space>
						<n-button type="error" size="small" :disabled="locked" @click="handleLock">
							Lock Scroll
						</n-button>
						<n-button
							type="success"
							size="small"
							:disabled="!locked"
							@click="handleUnlock"
						>
							Unlock Scroll
						</n-button>
						<n-button type="warning" size="small" @click="handleToggle">
							Toggle Scroll
						</n-button>
					</n-space>
					<span style="font-size: 12px; color: #999">
						Status: {{ locked ? '🔒 Locked' : '🔓 Unlocked' }}
					</span>
				</n-space>
			</template>
			<template #result>
				<n-alert v-if="locked" type="warning" style="margin-top: 8px">
					Scroll is locked! Click Unlock to restore scrolling.
				</n-alert>
			</template>
		</FunctionCard>

		<!-- getScrollbarWidth -->
		<FunctionCard
			title="getScrollbarWidth"
			:description="t.scroll.scrollbarWidthDesc"
			since="6.0.0"
			:code="`getScrollbarWidth() // ${scrollbarWidth}px`"
		>
			<template #result>
				<n-code
					:code="JSON.stringify({ scrollbarWidth: `${scrollbarWidth}px` })"
					language="json"
				/>
			</template>
		</FunctionCard>

		<!-- Target element for scrollTo demo -->
		<div id="scroll-demo-target" class="scroll-target">
			<p>🎯 Scroll Target</p>
			<p style="font-size: 12px; color: rgba(255, 255, 255, 0.8)">
				This is the target element for scrollTo demo
			</p>
		</div>
	</div>
</template>

<style scoped>
.viewport-demo {
	padding: 20px;
	border: 2px dashed;
	border-radius: 8px;
	text-align: center;
	transition: all 0.3s ease;
}

.scroll-target {
	margin-top: 40px;
	padding: 24px;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	border-radius: 12px;
	color: white;
	text-align: center;
}
</style>
