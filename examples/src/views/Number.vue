<script setup lang="ts">
import { ref } from 'vue'
import { NH1, NInput, NTag, NSpace, NInputNumber, NSelect } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import {
	clamp,
	round,
	sum,
	average,
	inRange,
	toThousands,
	fixNumber,
	getNumber,
	randomNumber,
	randomNumbers,
} from 'js-cool'
import { useI18n } from '@/locales'

const { t } = useI18n()

const clampVal = ref(150)
const clampMin = ref(0)
const clampMax = ref(100)
const roundVal = ref(3.14159)
const roundDecimals = ref(2)
const inRangeVal = ref(5)
const inRangeMin = ref(0)
const inRangeMax = ref(10)
const thousandsVal = ref(1234567.89)
const thousandsSeparator = ref(',')
const thousandsDecimals = ref<number | undefined>(undefined)
const thousandsPrefix = ref('')
const thousandsSuffix = ref('')
const fixVal = ref(3.14159)
const fixDecimals = ref(2)
const getNumInput = ref('Chrome123.45')
const randomMin = ref(1)
const randomMax = ref(100)
const randomNumCount = ref(4)
const randomNumSum = ref(100)

const separatorOptions = [
	{ label: ', (comma)', value: ',' },
	{ label: ' (space)', value: ' ' },
	{ label: "' (apostrophe)", value: "'" },
	{ label: '. (dot)', value: '.' },
	{ label: '_ (underscore)', value: '_' },
]
</script>

<template>
	<div>
		<n-h1>Number</n-h1>
		<p style="color: #666; margin-bottom: 24px">{{ t.categoriesDesc.Number }}</p>

		<!-- clamp -->
		<FunctionCard
			title="clamp"
			:description="t.number.clampDesc"
			since="2.0.0"
			:code="`clamp(150, 0, 100) // 100
clamp(-10, 0, 100) // 0`"
		>
			<template #input>
				<n-space align="center">
					<code class="code-inline">clamp(</code>
					<n-input-number v-model:value="clampVal" style="width: 80px" />
					<code class="code-inline">,</code>
					<n-input-number v-model:value="clampMin" style="width: 70px" />
					<code class="code-inline">,</code>
					<n-input-number v-model:value="clampMax" style="width: 70px" />
					<code class="code-inline">)</code>
				</n-space>
			</template>
			<template #result>
				<n-tag type="info" size="large" :bordered="false">{{
					clamp(clampVal, clampMin, clampMax)
				}}</n-tag>
			</template>
		</FunctionCard>

		<!-- round -->
		<FunctionCard
			title="round"
			:description="t.number.roundDesc"
			since="2.0.0"
			:code="`round(3.14159, 2) // 3.14`"
		>
			<template #input>
				<n-space align="center">
					<code class="code-inline">round(</code>
					<n-input-number v-model:value="roundVal" :step="0.00001" style="width: 100px" />
					<code class="code-inline">,</code>
					<n-input-number
						v-model:value="roundDecimals"
						:min="0"
						:max="10"
						style="width: 70px"
					/>
					<code class="code-inline">)</code>
				</n-space>
			</template>
			<template #result>
				<n-tag type="info" size="large" :bordered="false">{{
					round(roundVal, roundDecimals)
				}}</n-tag>
			</template>
		</FunctionCard>

		<!-- sum / average -->
		<FunctionCard
			title="sum / average"
			:description="t.number.sumAvgDesc"
			since="2.0.0"
			:code="`sum([1, 2, 3, 4, 5]) // 15
average([1, 2, 3, 4, 5]) // 3`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">sum([1,2,3,4,5])</code>
						<n-tag size="small" :bordered="false">{{ sum([1, 2, 3, 4, 5]) }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">average([1,2,3,4,5])</code>
						<n-tag size="small" :bordered="false">{{ average([1, 2, 3, 4, 5]) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- inRange -->
		<FunctionCard
			title="inRange"
			:description="t.number.inRangeDesc"
			since="2.0.0"
			:code="`inRange(5, 0, 10) // true`"
		>
			<template #input>
				<n-space align="center">
					<code class="code-inline">inRange(</code>
					<n-input-number v-model:value="inRangeVal" style="width: 70px" />
					<code class="code-inline">,</code>
					<n-input-number v-model:value="inRangeMin" style="width: 70px" />
					<code class="code-inline">,</code>
					<n-input-number v-model:value="inRangeMax" style="width: 70px" />
					<code class="code-inline">)</code>
				</n-space>
			</template>
			<template #result>
				<n-tag size="small" :bordered="false">{{
					inRange(inRangeVal, inRangeMin, inRangeMax)
				}}</n-tag>
			</template>
		</FunctionCard>

		<!-- toThousands -->
		<FunctionCard
			title="toThousands"
			:description="t.number.toThousandsDesc"
			since="1.0.0"
			:tags="['NEW']"
			:code="`// Basic usage
	toThousands(1234567.89)  // '1,234,567.89'

	// Custom separator
	toThousands(1234567.89, { separator: ' ' })  // '1 234 567.89'

	// With decimals limit
	toThousands(1234.5678, { decimals: 2 })  // '1,234.57'

	// With currency prefix
	toThousands(1234.56, { prefix: '$', decimals: 2 })  // '$1,234.56'

	// With suffix (e.g., percentage)
	toThousands(98.5, { suffix: '%', decimals: 1 })  // '98.5%'

	// Combined options
	toThousands(1234567.89, { prefix: '¥', separator: ' ', decimals: 2 })
	// '¥1 234 567.89'`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center">
						<n-input-number v-model:value="thousandsVal" :step="0.01" style="width: 150px" />
					</n-space>
					<n-space align="center">
						<code class="code-inline" style="font-size: 11px">separator:</code>
						<n-select v-model:value="thousandsSeparator" :options="separatorOptions" style="width: 130px" />
					</n-space>
					<n-space align="center">
						<code class="code-inline" style="font-size: 11px">decimals:</code>
						<n-input-number v-model:value="thousandsDecimals" :min="0" :max="10" placeholder="auto" style="width: 80px" />
					</n-space>
					<n-space align="center">
						<code class="code-inline" style="font-size: 11px">prefix:</code>
						<n-input v-model:value="thousandsPrefix" placeholder="$, ¥, €..." style="width: 80px" />
					</n-space>
					<n-space align="center">
						<code class="code-inline" style="font-size: 11px">suffix:</code>
						<n-input v-model:value="thousandsSuffix" placeholder="%, 元..." style="width: 80px" />
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">toThousands(input, options)</code>
						<n-tag type="info" size="small" :bordered="false">{{
							toThousands(thousandsVal, {
								separator: thousandsSeparator,
								decimals: thousandsDecimals ?? undefined,
								prefix: thousandsPrefix,
								suffix: thousandsSuffix,
							})
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline" style="font-size: 11px">Basic (default)</code>
						<n-tag size="small" :bordered="false">{{ toThousands(thousandsVal) }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline" style="font-size: 11px">Space separator</code>
						<n-tag size="small" :bordered="false">{{ toThousands(thousandsVal, { separator: ' ' }) }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline" style="font-size: 11px">Currency ¥</code>
						<n-tag size="small" :bordered="false">{{ toThousands(thousandsVal, { prefix: '¥', decimals: 2 }) }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline" style="font-size: 11px">Currency $</code>
						<n-tag size="small" :bordered="false">{{ toThousands(thousandsVal, { prefix: '$', decimals: 2 }) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- fixNumber -->
		<FunctionCard
			title="fixNumber"
			:description="t.number.fixNumberDesc"
			since="2.0.0"
			:code="`fixNumber(3.14159, 2) // '3.14'`"
		>
			<template #input>
				<n-space align="center">
					<code class="code-inline">fixNumber(</code>
					<n-input-number v-model:value="fixVal" :step="0.00001" style="width: 100px" />
					<code class="code-inline">,</code>
					<n-input-number
						v-model:value="fixDecimals"
						:min="0"
						:max="10"
						style="width: 70px"
					/>
					<code class="code-inline">)</code>
				</n-space>
			</template>
			<template #result>
				<n-tag type="info" size="small" :bordered="false">{{
					fixNumber(fixVal, fixDecimals)
				}}</n-tag>
			</template>
		</FunctionCard>

		<!-- getNumber -->
		<FunctionCard
			title="getNumber"
			:description="t.number.getNumberDesc"
			since="2.0.0"
			:code="`getNumber('Chrome123.45') // '123.45'`"
		>
			<template #input>
				<n-input v-model:value="getNumInput" style="width: 200px" />
			</template>
			<template #result>
				<n-tag type="info" size="small" :bordered="false">{{
					getNumber(getNumInput)
				}}</n-tag>
			</template>
		</FunctionCard>

		<!-- randomNumber -->
		<FunctionCard
			title="randomNumber"
			:description="t.number.randomNumberDesc"
			since="2.0.0"
			:code="`randomNumber(1, 100) // 42 (random)`"
		>
			<template #input>
				<n-space align="center">
					<code class="code-inline">randomNumber(</code>
					<n-input-number v-model:value="randomMin" style="width: 70px" />
					<code class="code-inline">,</code>
					<n-input-number v-model:value="randomMax" style="width: 70px" />
					<code class="code-inline">)</code>
				</n-space>
			</template>
			<template #result>
				<n-tag size="small" :bordered="false">{{
					randomNumber(randomMin, randomMax)
				}}</n-tag>
			</template>
		</FunctionCard>

		<!-- randomNumbers -->
		<FunctionCard
			title="randomNumbers"
			:description="t.number.randomNumbersDesc"
			since="2.0.0"
			:code="`randomNumbers(4, 100) // [25, 30, 20, 25]`"
		>
			<template #input>
				<n-space align="center">
					<code class="code-inline">randomNumbers(</code>
					<n-input-number v-model:value="randomNumCount" :min="1" style="width: 70px" />
					<code class="code-inline">,</code>
					<n-input-number v-model:value="randomNumSum" style="width: 70px" />
					<code class="code-inline">)</code>
				</n-space>
			</template>
			<template #result>
				<n-space align="center">
					<n-tag type="info" size="small" :bordered="false">{{
						JSON.stringify(randomNumbers(randomNumCount, randomNumSum))
					}}</n-tag>
					<span style="font-size: 12px; color: #666"
						>{{ t.number.sum }}: {{ randomNumSum }}</span
					>
				</n-space>
			</template>
		</FunctionCard>
	</div>
</template>
