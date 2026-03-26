<script setup lang="ts">
import { ref, computed } from 'vue'
import { NH1, NInput, NTag, NSpace, NInputNumber, NDatePicker, NSelect } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import {
	date,
	formatDate,
	dateDiff,
	relativeTime,
	isToday,
	isYesterday,
	isTomorrow,
	isWeekend,
	isLeapYear,
	isBefore,
	isAfter,
	isSame,
	isBetween,
	getDaysInMonth,
	getQuarter,
	getDayOfYear,
	getWeekOfYear,
	addDate,
	subtractDate,
	startOf,
	endOf,
	minDate,
	maxDate,
	compareDate,
} from 'js-cool'
import type { DateUnit } from 'js-cool'
import { useI18n } from '@/locales'

const { t } = useI18n()

const formatPattern = ref('YYYY-MM-DD HH:mm:ss')
const diffStart = ref('2024-01-01')
const diffEnd = ref('2024-12-31')
const relativeInput = ref<string>(new Date(Date.now() - 3600000).toISOString().slice(0, 16))
const todayCheck = ref(new Date().toISOString().split('T')[0])
const monthInput = ref(new Date().getMonth() + 1)
const yearInput = ref(new Date().getFullYear())

// New refs for additional functions
const checkDateInput = ref(new Date().getTime())
const compareDate1 = ref(new Date().getTime())
const compareDate2 = ref(new Date().getTime() + 86400000) // tomorrow
const betweenStart = ref(new Date().getTime() - 86400000 * 7) // 7 days ago
const betweenEnd = ref(new Date().getTime() + 86400000 * 7) // 7 days later

const checkDateStr = computed(() => formatDate(checkDateInput.value, 'YYYY-MM-DD'))
const betweenStartStr = computed(() => formatDate(betweenStart.value, 'YYYY-MM-DD'))
const betweenEndStr = computed(() => formatDate(betweenEnd.value, 'YYYY-MM-DD'))

// add/subtract demos
const manipulateDate = ref(Date.now())
const manipulateValue = ref(1)
const manipulateUnit = ref<DateUnit>('day')
const unitOptions = [
	{ label: 'millisecond', value: 'millisecond' },
	{ label: 'second', value: 'second' },
	{ label: 'minute', value: 'minute' },
	{ label: 'hour', value: 'hour' },
	{ label: 'day', value: 'day' },
	{ label: 'week', value: 'week' },
	{ label: 'month', value: 'month' },
	{ label: 'year', value: 'year' },
]

// startOf/endOf demos
const startEndUnit = ref<DateUnit>('day')

// date() chainable API
const chainResult = ref('')
const runChainDemo = () => {
	const result = date()
		.startOf('month')
		.add(1, 'month')
		.subtract(1, 'day')
		.format('YYYY-MM-DD')
	chainResult.value = result
}
runChainDemo()

// min/max dates
const minMaxDates = ref([
	new Date('2024-01-15'),
	new Date('2024-06-20'),
	new Date('2024-03-10'),
])
</script>

<template>
	<div>
		<n-h1>Date</n-h1>
		<p style="color: #666; margin-bottom: 24px">{{ t.categoriesDesc.Date }}</p>

		<!-- formatDate -->
		<FunctionCard
			title="formatDate"
			:description="t.date.formatDesc"
			since="6.0.0"
			:code="`formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
formatDate(new Date(), 'MM/DD/YYYY hh:mm:ss A')`"
		>
			<template #input>
				<n-space align="center">
					<code class="code-inline">formatDate(new Date(), '</code>
					<n-input v-model:value="formatPattern" style="width: 200px" />
					<code class="code-inline">')</code>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-tag type="info" size="small" :bordered="false">{{
						formatDate(new Date(), formatPattern)
					}}</n-tag>
					<n-space wrap>
						<n-space align="center">
							<code class="code-inline" style="font-size: 11px">YYYY-MM-DD</code>
							<n-tag size="small" :bordered="false">{{
								formatDate(new Date(), 'YYYY-MM-DD')
							}}</n-tag>
						</n-space>
						<n-space align="center">
							<code class="code-inline" style="font-size: 11px">hh:mm A</code>
							<n-tag size="small" :bordered="false">{{
								formatDate(new Date(), 'hh:mm A')
							}}</n-tag>
						</n-space>
						<n-space align="center">
							<code class="code-inline" style="font-size: 11px">YYYY/MM/DD</code>
							<n-tag size="small" :bordered="false">{{
								formatDate(new Date(), 'YYYY/MM/DD')
							}}</n-tag>
						</n-space>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- dateDiff -->
		<FunctionCard
			title="dateDiff"
			:description="t.date.diffDesc"
			since="6.0.0"
			:code="`dateDiff('2024-01-01', '2024-12-31')
// { days: 365, months: 11, ... }`"
		>
			<template #input>
				<n-space align="center">
					<input
						v-model="diffStart"
						type="date"
						style="
							padding: 4px 8px;
							border: 1px solid #ddd;
							border-radius: 4px;
							width: 150px;
						"
					/>
					<span style="color: #666">{{ t.date.to }}</span>
					<input
						v-model="diffEnd"
						type="date"
						style="
							padding: 4px 8px;
							border: 1px solid #ddd;
							border-radius: 4px;
							width: 150px;
						"
					/>
				</n-space>
			</template>
			<template #result>
				<pre class="code-block">{{
					JSON.stringify(dateDiff(diffStart, diffEnd), null, 2)
				}}</pre>
			</template>
		</FunctionCard>

		<!-- relativeTime -->
		<FunctionCard
			title="relativeTime"
			:description="t.date.relativeDesc"
			since="6.0.0"
			:code="`relativeTime(new Date(Date.now() - 3600000)) // '1 hour(s) ago'
relativeTime(new Date(Date.now() - 3600000), undefined, 'zh') // '1小时前' (Chinese locale)`"
		>
			<template #input>
				<input
					v-model="relativeInput"
					type="datetime-local"
					style="
						padding: 4px 8px;
						border: 1px solid #ddd;
						border-radius: 4px;
						width: 200px;
					"
				/>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">en</code>
						<n-tag type="info" size="small" :bordered="false">{{
							relativeTime(relativeInput)
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">zh</code>
						<n-tag type="info" size="small" :bordered="false">{{
							relativeTime(relativeInput, new Date(), 'zh')
						}}</n-tag>
					</n-space>
					<n-space wrap>
						<n-space align="center">
							<code class="code-inline" style="font-size: 11px">now - 1min</code>
							<n-tag size="small" :bordered="false">{{
								relativeTime(new Date(Date.now() - 60000))
							}}</n-tag>
						</n-space>
						<n-space align="center">
							<code class="code-inline" style="font-size: 11px">now - 1hr</code>
							<n-tag size="small" :bordered="false">{{
								relativeTime(new Date(Date.now() - 3600000))
							}}</n-tag>
						</n-space>
						<n-space align="center">
							<code class="code-inline" style="font-size: 11px">now - 1day</code>
							<n-tag size="small" :bordered="false">{{
								relativeTime(new Date(Date.now() - 86400000))
							}}</n-tag>
						</n-space>
						<n-space align="center">
							<code class="code-inline" style="font-size: 11px">now + 1hr</code>
							<n-tag size="small" :bordered="false">{{
								relativeTime(new Date(Date.now() + 3600000))
							}}</n-tag>
						</n-space>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- isToday -->
		<FunctionCard
			title="isToday"
			:description="t.date.isTodayDesc"
			since="6.0.0"
			:code="`isToday(new Date()) // true`"
		>
			<template #input>
				<input
					v-model="todayCheck"
					type="date"
					style="
						padding: 4px 8px;
						border: 1px solid #ddd;
						border-radius: 4px;
						width: 150px;
					"
				/>
			</template>
			<template #result>
				<n-tag size="small" :bordered="false">{{ isToday(todayCheck) }}</n-tag>
			</template>
		</FunctionCard>

		<!-- getDaysInMonth -->
		<FunctionCard
			title="getDaysInMonth"
			:description="t.date.daysInMonthDesc"
			since="6.0.0"
			:code="`getDaysInMonth(2024, 2) // 29 (leap year)
getDaysInMonth(2023, 2) // 28`"
		>
			<template #input>
				<n-space align="center">
					<code class="code-inline">{{ t.dateMore.year }}:</code>
					<n-input-number v-model:value="yearInput" style="width: 100px" />
					<code class="code-inline">{{ t.dateMore.month }}:</code>
					<n-input-number v-model:value="monthInput" style="width: 70px" />
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-tag type="info" size="small" :bordered="false"
						>{{ getDaysInMonth(yearInput, monthInput) }} {{ t.number.days }}</n-tag
					>
					<n-space>
						<n-space align="center">
							<code class="code-inline">getDaysInMonth(2024, 2)</code>
							<n-tag size="small" :bordered="false"
								>{{ getDaysInMonth(2024, 2) }} {{ t.number.days }} ({{
									t.number.leapYear
								}})</n-tag
							>
						</n-space>
						<n-space align="center">
							<code class="code-inline">getDaysInMonth(2023, 2)</code>
							<n-tag size="small" :bordered="false"
								>{{ getDaysInMonth(2023, 2) }} {{ t.number.days }}</n-tag
							>
						</n-space>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- isYesterday / isTomorrow -->
		<FunctionCard
			title="isYesterday / isTomorrow"
			:description="t.date.yesterdayTomorrowDesc"
			since="6.0.0"
			:code="`isYesterday(new Date(Date.now() - 86400000)) // true
isTomorrow(new Date(Date.now() + 86400000)) // true`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">isYesterday(yesterday)</code>
						<n-tag type="info" size="small" :bordered="false">{{
							isYesterday(new Date(Date.now() - 86400000))
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">isTomorrow(tomorrow)</code>
						<n-tag type="info" size="small" :bordered="false">{{
							isTomorrow(new Date(Date.now() + 86400000))
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- isWeekend -->
		<FunctionCard
			title="isWeekend"
			:description="t.date.weekendDesc"
			since="6.0.0"
			:code="`isWeekend(new Date()) // true if Saturday or Sunday`"
		>
			<template #input>
				<n-space align="center">
					<code class="code-inline">{{ t.dateMore.selectDate }}:</code>
					<n-date-picker v-model:value="checkDateInput" type="date" style="width: 150px" />
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">isWeekend('{{ checkDateStr }}')</code>
						<n-tag :type="isWeekend(checkDateInput) ? 'success' : 'default'" size="small" :bordered="false">{{
							isWeekend(checkDateInput)
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- isLeapYear -->
		<FunctionCard
			title="isLeapYear"
			:description="t.date.leapYearDesc"
			since="6.0.0"
			:code="`isLeapYear(2024) // true
isLeapYear(2023) // false`"
		>
			<template #input>
				<n-space align="center">
					<code class="code-inline">{{ t.dateMore.year }}:</code>
					<n-input-number v-model:value="yearInput" style="width: 100px" />
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">isLeapYear({{ yearInput }})</code>
						<n-tag :type="isLeapYear(yearInput) ? 'success' : 'default'" size="small" :bordered="false">{{
							isLeapYear(yearInput)
						}}</n-tag>
					</n-space>
					<n-space>
						<n-space align="center">
							<code class="code-inline">isLeapYear(2024)</code>
							<n-tag type="success" size="small" :bordered="false">{{ isLeapYear(2024) }}</n-tag>
						</n-space>
						<n-space align="center">
							<code class="code-inline">isLeapYear(2100)</code>
							<n-tag type="default" size="small" :bordered="false">{{ isLeapYear(2100) }}</n-tag>
						</n-space>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- isBefore / isAfter / isSame -->
		<FunctionCard
			title="isBefore / isAfter / isSame"
			:description="t.date.compareDesc"
			since="6.0.0"
			:code="`isBefore('2024-01-01', '2024-12-31') // true
isAfter('2024-12-31', '2024-01-01') // true
isSame('2024-01-01', '2024-01-01') // true`"
		>
			<template #input>
				<n-space align="center">
					<n-date-picker v-model:value="compareDate1" type="date" style="width: 140px" />
					<span style="color: #666">{{ t.date.to }}</span>
					<n-date-picker v-model:value="compareDate2" type="date" style="width: 140px" />
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">isBefore</code>
						<n-tag type="info" size="small" :bordered="false">{{
							isBefore(compareDate1, compareDate2)
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">isAfter</code>
						<n-tag type="info" size="small" :bordered="false">{{
							isAfter(compareDate2, compareDate1)
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">isSame</code>
						<n-tag type="info" size="small" :bordered="false">{{
							isSame(compareDate1, compareDate2)
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- isBetween -->
		<FunctionCard
			title="isBetween"
			:description="t.date.betweenDesc"
			since="6.0.0"
			:code="`isBetween('2024-06-15', '2024-01-01', '2024-12-31') // true`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">{{ t.dateMore.dateLabel }}:</code>
						<n-date-picker v-model:value="checkDateInput" type="date" style="width: 140px" />
					</n-space>
					<n-space align="center">
						<code class="code-inline">{{ t.dateMore.rangeLabel }}:</code>
						<n-date-picker v-model:value="betweenStart" type="date" style="width: 120px" />
						<span style="color: #666">-</span>
						<n-date-picker v-model:value="betweenEnd" type="date" style="width: 120px" />
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space align="center">
					<code class="code-inline">isBetween('{{ checkDateStr }}', '{{ betweenStartStr }}', '{{ betweenEndStr }}')</code>
					<n-tag :type="isBetween(checkDateInput, betweenStart, betweenEnd) ? 'success' : 'default'" size="small" :bordered="false">{{
						isBetween(checkDateInput, betweenStart, betweenEnd)
					}}</n-tag>
				</n-space>
			</template>
		</FunctionCard>

		<!-- getQuarter / getDayOfYear / getWeekOfYear -->
		<FunctionCard
			title="getQuarter / getDayOfYear / getWeekOfYear"
			:description="t.date.dateInfoDesc"
			since="6.0.0"
			:code="`getQuarter(new Date()) // 1-4
getDayOfYear(new Date()) // 1-366
getWeekOfYear(new Date()) // 1-53`"
		>
			<template #input>
				<n-space align="center">
					<code class="code-inline">{{ t.dateMore.selectDate }}:</code>
					<n-date-picker v-model:value="checkDateInput" type="date" style="width: 150px" />
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">getQuarter</code>
						<n-tag type="info" size="small" :bordered="false">Q{{ getQuarter(checkDateInput) }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">getDayOfYear</code>
						<n-tag type="info" size="small" :bordered="false">{{ getDayOfYear(checkDateInput) }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">getWeekOfYear</code>
						<n-tag type="info" size="small" :bordered="false">W{{ getWeekOfYear(checkDateInput) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- add / subtract -->
		<FunctionCard
			title="addDate / subtractDate"
			:description="t.date.addSubtractDesc || 'Add or subtract time from a date'"
			since="6.0.0"
			:code="`addDate(new Date(), 1, 'day')  // Tomorrow
addDate(new Date(), 2, 'week')  // 2 weeks from now
subtractDate(new Date(), 1, 'month')  // 1 month ago`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center">
						<n-date-picker v-model:value="manipulateDate" type="datetime" style="width: 200px" />
					</n-space>
					<n-space align="center">
						<n-input-number v-model:value="manipulateValue" :min="1" :max="100" style="width: 80px" />
						<n-select v-model:value="manipulateUnit" :options="unitOptions" style="width: 120px" />
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">addDate</code>
						<n-tag type="info" size="small" :bordered="false">{{
							formatDate(addDate(manipulateDate, manipulateValue, manipulateUnit), 'YYYY-MM-DD HH:mm:ss')
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">subtractDate</code>
						<n-tag type="info" size="small" :bordered="false">{{
							formatDate(subtractDate(manipulateDate, manipulateValue, manipulateUnit), 'YYYY-MM-DD HH:mm:ss')
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- startOf / endOf -->
		<FunctionCard
			title="startOf / endOf"
			:description="t.date.startEndDesc || 'Get start or end of a time period'"
			since="6.0.0"
			:code="`startOf(new Date(), 'day')  // Today at 00:00:00
startOf(new Date(), 'month')  // First day of month
endOf(new Date(), 'day')  // Today at 23:59:59.999
endOf(new Date(), 'year')  // December 31st`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">unit:</code>
						<n-select v-model:value="startEndUnit" :options="unitOptions.filter(u => u.value !== 'millisecond' && u.value !== 'second')" style="width: 100px" />
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">startOf(now, '{{ startEndUnit }}')</code>
						<n-tag type="info" size="small" :bordered="false">{{
							formatDate(startOf(new Date(), startEndUnit), 'YYYY-MM-DD HH:mm:ss')
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">endOf(now, '{{ startEndUnit }}')</code>
						<n-tag type="info" size="small" :bordered="false">{{
							formatDate(endOf(new Date(), startEndUnit), 'YYYY-MM-DD HH:mm:ss')
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- date() chainable API -->
		<FunctionCard
			title="date() - Chainable API"
			:description="t.date.chainDesc || 'Chainable date manipulation with DateParser'"
			since="6.0.0"
			:code="`import { date } from 'js-cool'

// Create instance
date()  // now
date('2024-01-01')  // parse string

// Chain operations
date().startOf('month').add(1, 'month').subtract(1, 'day').format()
// Last day of current month

// Getters
date().year, date().month, date().day
date().isToday(), date().isLeapYear()`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">date().startOf('month').add(1, 'month').subtract(1, 'day').format()</code>
					</n-space>
					<n-tag type="info" size="small" :bordered="false">{{ chainResult }}</n-tag>
					<n-space wrap>
						<n-tag size="small" :bordered="false">date().year: {{ date().year }}</n-tag>
						<n-tag size="small" :bordered="false">date().month: {{ date().month }}</n-tag>
						<n-tag size="small" :bordered="false">date().day: {{ date().day }}</n-tag>
						<n-tag size="small" :bordered="false">isToday(): {{ date().isToday() }}</n-tag>
						<n-tag size="small" :bordered="false">isLeapYear(): {{ date().isLeapYear() }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- min / max / compare -->
		<FunctionCard
			title="minDate / maxDate / compareDate"
			:description="t.date.minMaxDesc || 'Compare dates and find min/max'"
			since="6.0.0"
			:code="`minDate(d1, d2, d3)  // Earliest date
maxDate(d1, d2, d3)  // Latest date
compareDate(d1, d2)  // -1, 0, or 1`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">Dates: {{ minMaxDates.map(d => formatDate(d, 'YYYY-MM-DD')).join(', ') }}</code>
					</n-space>
					<n-space align="center">
						<code class="code-inline">minDate</code>
						<n-tag type="success" size="small" :bordered="false">{{
							formatDate(minDate(...minMaxDates), 'YYYY-MM-DD')
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">maxDate</code>
						<n-tag type="warning" size="small" :bordered="false">{{
							formatDate(maxDate(...minMaxDates), 'YYYY-MM-DD')
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">compareDate('{{ formatDate(minMaxDates[0], 'YYYY-MM-DD') }}', '{{ formatDate(minMaxDates[1], 'YYYY-MM-DD') }}')</code>
						<n-tag type="info" size="small" :bordered="false">{{
							compareDate(minMaxDates[0], minMaxDates[1])
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>
	</div>
</template>
