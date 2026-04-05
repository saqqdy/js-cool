<script setup lang="ts">
import { ref } from 'vue'
import { NH1, NInput, NTag, NSpace, NInputNumber, NButton } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import { hexToRGB, rgbToHSL, RGBToHex, lighten, darken, isLightColor, randomColor } from 'js-cool'
import { useI18n } from '@/locales'

const { t } = useI18n()

const hexInput = ref('#ff0000')
const rgbR = ref(255)
const rgbG = ref(0)
const rgbB = ref(0)
const lightenAmount = ref(20)
const darkenAmount = ref(20)
const colorForShade = ref('#3b82f6')
const colorForCheck = ref('#ffffff')
const randomMin = ref(0)
const randomMax = ref(255)
const randomColorResult = ref(randomColor())
const generateRandom = () => {
	randomColorResult.value = randomColor(randomMin.value, randomMax.value)
}

// Preset colors
const warmColors = ref<string[]>([])
const coolColors = ref<string[]>([])
const pastelColors = ref<string[]>([])
const generatePresets = () => {
	warmColors.value = Array.from({ length: 8 }, () => randomColor([200, 100, 0], [255, 200, 100]))
	coolColors.value = Array.from({ length: 8 }, () => randomColor([0, 100, 200], [100, 200, 255]))
	pastelColors.value = Array.from({ length: 8 }, () => randomColor(150, 230))
}
generatePresets()
</script>

<template>
	<div>
		<n-h1>Color</n-h1>
		<p style="color: #666; margin-bottom: 24px">{{ t.categoriesDesc.Color }}</p>

		<!-- hexToRGB -->
		<FunctionCard
			title="hexToRGB"
			description="Convert hex color to RGB"
			since="6.0.0"
			:code="`hexToRGB('#ff0000') // { r: 255, g: 0, b: 0 }`"
		>
			<template #input>
				<n-space align="center">
					<n-input v-model:value="hexInput" style="width: 100px" />
					<div
						:style="{
							width: '32px',
							height: '32px',
							borderRadius: '4px',
							border: '1px solid #ddd',
							backgroundColor: hexInput,
						}"
					/>
				</n-space>
			</template>
			<template #result>
				<n-tag type="info" size="small" :bordered="false">{{
					JSON.stringify(hexToRGB(hexInput))
				}}</n-tag>
			</template>
		</FunctionCard>

		<!-- RGBToHex -->
		<FunctionCard
			title="RGBToHex"
			description="Convert RGB to hex color"
			since="1.0.9"
			:code="`RGBToHex(255, 0, 0) // '#ff0000'`"
		>
			<template #input>
				<n-space align="center">
					<code class="code-inline">RGB(</code>
					<n-input-number v-model:value="rgbR" :min="0" :max="255" style="width: 70px" />
					<code class="code-inline">,</code>
					<n-input-number v-model:value="rgbG" :min="0" :max="255" style="width: 70px" />
					<code class="code-inline">,</code>
					<n-input-number v-model:value="rgbB" :min="0" :max="255" style="width: 70px" />
					<code class="code-inline">)</code>
				</n-space>
			</template>
			<template #result>
				<n-space align="center">
					<n-tag type="info" size="small" :bordered="false">{{
						RGBToHex(rgbR, rgbG, rgbB)
					}}</n-tag>
					<div
						:style="{
							width: '32px',
							height: '32px',
							borderRadius: '4px',
							border: '1px solid #ddd',
							backgroundColor: RGBToHex(rgbR, rgbG, rgbB),
						}"
					/>
				</n-space>
			</template>
		</FunctionCard>

		<!-- rgbToHSL -->
		<FunctionCard
			title="rgbToHSL"
			description="Convert RGB to HSL"
			since="6.0.0"
			:code="`rgbToHSL(255, 0, 0) // { h: 0, s: 100, l: 50 }`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">rgbToHSL(255, 0, 0)</code>
						<n-tag type="info" size="small" :bordered="false">{{
							JSON.stringify(rgbToHSL(255, 0, 0))
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">rgbToHSL(0, 255, 0)</code>
						<n-tag type="info" size="small" :bordered="false">{{
							JSON.stringify(rgbToHSL(0, 255, 0))
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">rgbToHSL(0, 0, 255)</code>
						<n-tag type="info" size="small" :bordered="false">{{
							JSON.stringify(rgbToHSL(0, 0, 255))
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- lighten / darken -->
		<FunctionCard
			title="lighten / darken"
			description="Lighten or darken a color"
			since="6.0.0"
			:code="`lighten('#3b82f6', 20) // lighter shade
darken('#3b82f6', 20) // darker shade`"
		>
			<template #input>
				<n-space align="center">
					<n-input v-model:value="colorForShade" style="width: 100px" />
					<div
						:style="{
							width: '32px',
							height: '32px',
							borderRadius: '4px',
							border: '1px solid #ddd',
							backgroundColor: colorForShade,
						}"
					/>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">lighten(</code>
						<n-input-number
							v-model:value="lightenAmount"
							:min="0"
							:max="100"
							style="width: 70px"
						/>
						<code class="code-inline">%)</code>
						<n-tag type="info" size="small" :bordered="false">{{
							lighten(colorForShade, lightenAmount)
						}}</n-tag>
						<div
							:style="{
								width: '32px',
								height: '32px',
								borderRadius: '4px',
								border: '1px solid #ddd',
								backgroundColor: lighten(colorForShade, lightenAmount),
							}"
						/>
					</n-space>
					<n-space align="center">
						<code class="code-inline">darken(</code>
						<n-input-number
							v-model:value="darkenAmount"
							:min="0"
							:max="100"
							style="width: 70px"
						/>
						<code class="code-inline">%)</code>
						<n-tag type="info" size="small" :bordered="false">{{
							darken(colorForShade, darkenAmount)
						}}</n-tag>
						<div
							:style="{
								width: '32px',
								height: '32px',
								borderRadius: '4px',
								border: '1px solid #ddd',
								backgroundColor: darken(colorForShade, darkenAmount),
							}"
						/>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- isLightColor -->
		<FunctionCard
			title="isLightColor"
			description="Check if color is light"
			since="6.0.0"
			:code="`isLightColor('#ffffff') // true
isLightColor('#000000') // false`"
		>
			<template #input>
				<n-space align="center">
					<n-input v-model:value="colorForCheck" style="width: 100px" />
					<div
						:style="{
							width: '32px',
							height: '32px',
							borderRadius: '4px',
							border: '1px solid #ddd',
							backgroundColor: colorForCheck,
						}"
					/>
				</n-space>
			</template>
			<template #result>
				<n-space align="center">
					<n-tag size="small" :bordered="false">{{
						isLightColor(colorForCheck) ? 'Light' : 'Dark'
					}}</n-tag>
					<span
						:style="{
							display: 'inline-block',
							padding: '4px 12px',
							borderRadius: '4px',
							color: colorForCheck,
							backgroundColor: isLightColor(colorForCheck) ? '#333' : '#fff',
						}"
					>
						Sample text
					</span>
				</n-space>
			</template>
		</FunctionCard>

		<!-- randomColor -->
		<FunctionCard
			title="randomColor"
			description="Generate random color with various options including alpha support"
			since="5.5.0"
			:code="`randomColor() // '#bf444b'
randomColor(200) // all channels >= 200 (lighter)
randomColor(200, 255) // all channels 200-255
randomColor({ alpha: true }) // with random alpha
randomColor({ alpha: 128 }) // with specific alpha (0-255)`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">range:</code>
						<n-input-number
							v-model:value="randomMin"
							:min="0"
							:max="255"
							style="width: 70px"
						/>
						<code class="code-inline">-</code>
						<n-input-number
							v-model:value="randomMax"
							:min="0"
							:max="255"
							style="width: 70px"
						/>
					</n-space>
					<n-space align="center">
						<n-button size="small" type="primary" @click="generateRandom"
							>Generate</n-button
						>
						<n-tag type="info" size="small" :bordered="false">{{
							randomColorResult
						}}</n-tag>
						<div
							:style="{
								width: '32px',
								height: '32px',
								borderRadius: '4px',
								border: '1px solid #ddd',
								backgroundColor: randomColorResult,
							}"
						/>
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<div>
						<code style="font-size: 11px; color: #666">randomColor() - random</code>
						<n-space style="margin-top: 4px">
							<div
								v-for="i in 8"
								:key="'r' + i"
								:style="{
									width: '32px',
									height: '32px',
									borderRadius: '4px',
									border: '1px solid #ddd',
									backgroundColor: randomColor(),
								}"
							/>
						</n-space>
					</div>
					<div>
						<code style="font-size: 11px; color: #666"
							>randomColor([200, 100, 0], [255, 200, 100]) - warm</code
						>
						<n-space style="margin-top: 4px">
							<div
								v-for="(c, i) in warmColors"
								:key="'w' + i"
								:style="{
									width: '32px',
									height: '32px',
									borderRadius: '4px',
									border: '1px solid #ddd',
									backgroundColor: c,
								}"
							/>
						</n-space>
					</div>
					<div>
						<code style="font-size: 11px; color: #666"
							>randomColor([0, 100, 200], [100, 200, 255]) - cool</code
						>
						<n-space style="margin-top: 4px">
							<div
								v-for="(c, i) in coolColors"
								:key="'c' + i"
								:style="{
									width: '32px',
									height: '32px',
									borderRadius: '4px',
									border: '1px solid #ddd',
									backgroundColor: c,
								}"
							/>
						</n-space>
					</div>
					<div>
						<code style="font-size: 11px; color: #666"
							>randomColor(150, 230) - pastel</code
						>
						<n-space style="margin-top: 4px">
							<div
								v-for="(c, i) in pastelColors"
								:key="'p' + i"
								:style="{
									width: '32px',
									height: '32px',
									borderRadius: '4px',
									border: '1px solid #ddd',
									backgroundColor: c,
								}"
							/>
						</n-space>
					</div>
				</n-space>
			</template>
		</FunctionCard>
	</div>
</template>
