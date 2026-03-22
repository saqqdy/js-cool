<script setup lang="ts">
import { ref } from 'vue'
import { NH1, NInput, NTag, NSpace, NInputNumber } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import { formatDate, dateDiff, relativeTime, isToday, getDaysInMonth } from 'js-cool'

const formatPattern = ref('YYYY-MM-DD HH:mm:ss')
const diffStart = ref('2024-01-01')
const diffEnd = ref('2024-12-31')
const relativeInput = ref<string>(new Date(Date.now() - 3600000).toISOString().slice(0, 16))
const todayCheck = ref(new Date().toISOString().split('T')[0])
const monthInput = ref(new Date().getMonth() + 1)
const yearInput = ref(new Date().getFullYear())
</script>

<template>
  <div>
    <n-h1>Date</n-h1>
    <p style="color: #666; margin-bottom: 24px;">Date processing utilities</p>

    <!-- formatDate -->
    <FunctionCard
      title="formatDate"
      description="Format date with pattern (supports: YYYY, YY, MM, M, DD, D, HH, H, hh, h, mm, m, ss, s, SSS, A/a)"
      :code="`formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
formatDate(new Date(), 'YYYY年MM月DD日')
formatDate(new Date(), 'MM/DD/YYYY hh:mm:ss A')`"
    >
      <template #input>
        <n-space align="center">
          <code class="code-inline">formatDate(new Date(), '</code>
          <n-input v-model:value="formatPattern" style="width: 200px;" />
          <code class="code-inline">')</code>
        </n-space>
      </template>
      <template #result>
        <n-space vertical>
          <n-tag type="info" size="small" :bordered="false">{{ formatDate(new Date(), formatPattern) }}</n-tag>
          <n-space wrap>
            <n-space align="center">
              <code class="code-inline" style="font-size: 11px;">YYYY-MM-DD</code>
              <n-tag size="small" :bordered="false">{{ formatDate(new Date(), 'YYYY-MM-DD') }}</n-tag>
            </n-space>
            <n-space align="center">
              <code class="code-inline" style="font-size: 11px;">hh:mm A</code>
              <n-tag size="small" :bordered="false">{{ formatDate(new Date(), 'hh:mm A') }}</n-tag>
            </n-space>
            <n-space align="center">
              <code class="code-inline" style="font-size: 11px;">YYYY/MM/DD</code>
              <n-tag size="small" :bordered="false">{{ formatDate(new Date(), 'YYYY/MM/DD') }}</n-tag>
            </n-space>
          </n-space>
        </n-space>
      </template>
    </FunctionCard>

    <!-- dateDiff -->
    <FunctionCard
      title="dateDiff"
      description="Calculate difference between dates"
      :code="`dateDiff('2024-01-01', '2024-12-31')
// { days: 365, months: 11, ... }`"
    >
      <template #input>
        <n-space align="center">
          <input v-model="diffStart" type="date" style="padding: 4px 8px; border: 1px solid #ddd; border-radius: 4px; width: 150px;" />
          <span style="color: #666;">to</span>
          <input v-model="diffEnd" type="date" style="padding: 4px 8px; border: 1px solid #ddd; border-radius: 4px; width: 150px;" />
        </n-space>
      </template>
      <template #result>
        <pre class="code-block">{{ JSON.stringify(dateDiff(diffStart, diffEnd), null, 2) }}</pre>
      </template>
    </FunctionCard>

    <!-- relativeTime -->
    <FunctionCard
      title="relativeTime"
      description="Get relative time string (supports: en, zh locales)"
      :code="`relativeTime(new Date(Date.now() - 3600000)) // '1 hour(s) ago'
relativeTime(new Date(Date.now() - 3600000), new Date(), 'zh') // '1小时前'`"
    >
      <template #input>
        <input v-model="relativeInput" type="datetime-local" style="padding: 4px 8px; border: 1px solid #ddd; border-radius: 4px; width: 200px;" />
      </template>
      <template #result>
        <n-space vertical>
          <n-space align="center">
            <code class="code-inline">en</code>
            <n-tag type="info" size="small" :bordered="false">{{ relativeTime(relativeInput) }}</n-tag>
          </n-space>
          <n-space align="center">
            <code class="code-inline">zh</code>
            <n-tag type="info" size="small" :bordered="false">{{ relativeTime(relativeInput, new Date(), 'zh') }}</n-tag>
          </n-space>
          <n-space wrap>
            <n-space align="center">
              <code class="code-inline" style="font-size: 11px;">now - 1min</code>
              <n-tag size="small" :bordered="false">{{ relativeTime(new Date(Date.now() - 60000)) }}</n-tag>
            </n-space>
            <n-space align="center">
              <code class="code-inline" style="font-size: 11px;">now - 1hr</code>
              <n-tag size="small" :bordered="false">{{ relativeTime(new Date(Date.now() - 3600000)) }}</n-tag>
            </n-space>
            <n-space align="center">
              <code class="code-inline" style="font-size: 11px;">now - 1day</code>
              <n-tag size="small" :bordered="false">{{ relativeTime(new Date(Date.now() - 86400000)) }}</n-tag>
            </n-space>
            <n-space align="center">
              <code class="code-inline" style="font-size: 11px;">now + 1hr</code>
              <n-tag size="small" :bordered="false">{{ relativeTime(new Date(Date.now() + 3600000)) }}</n-tag>
            </n-space>
          </n-space>
        </n-space>
      </template>
    </FunctionCard>

    <!-- isToday -->
    <FunctionCard
      title="isToday"
      description="Check if date is today"
      :code="`isToday(new Date()) // true`"
    >
      <template #input>
        <input v-model="todayCheck" type="date" style="padding: 4px 8px; border: 1px solid #ddd; border-radius: 4px; width: 150px;" />
      </template>
      <template #result>
        <n-tag size="small" :bordered="false">{{ isToday(todayCheck) }}</n-tag>
      </template>
    </FunctionCard>

    <!-- getDaysInMonth -->
    <FunctionCard
      title="getDaysInMonth"
      description="Get number of days in month"
      :code="`getDaysInMonth(2024, 2) // 29 (leap year)
getDaysInMonth(2023, 2) // 28`"
    >
      <template #input>
        <n-space align="center">
          <code class="code-inline">Year:</code>
          <n-input-number v-model:value="yearInput" style="width: 100px;" />
          <code class="code-inline">Month:</code>
          <n-input-number v-model:value="monthInput" style="width: 70px;" />
        </n-space>
      </template>
      <template #result>
        <n-space vertical>
          <n-tag type="info" size="small" :bordered="false">{{ getDaysInMonth(yearInput, monthInput) }} days</n-tag>
          <n-space>
            <n-space align="center">
              <code class="code-inline">getDaysInMonth(2024, 2)</code>
              <n-tag size="small" :bordered="false">{{ getDaysInMonth(2024, 2) }} days (leap year)</n-tag>
            </n-space>
            <n-space align="center">
              <code class="code-inline">getDaysInMonth(2023, 2)</code>
              <n-tag size="small" :bordered="false">{{ getDaysInMonth(2023, 2) }} days</n-tag>
            </n-space>
          </n-space>
        </n-space>
      </template>
    </FunctionCard>
  </div>
</template>
