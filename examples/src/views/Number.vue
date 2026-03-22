<script setup lang="ts">
import { ref } from 'vue'
import { NH1, NInput, NTag, NSpace, NInputNumber } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import { clamp, round, sum, average, inRange, toThousands, fixNumber, getNumber, randomNumber, randomNumbers } from 'js-cool'

const clampVal = ref(150)
const clampMin = ref(0)
const clampMax = ref(100)
const roundVal = ref(3.14159)
const roundDecimals = ref(2)
const inRangeVal = ref(5)
const inRangeMin = ref(0)
const inRangeMax = ref(10)
const thousandsVal = ref(1234567.89)
const fixVal = ref(3.14159)
const fixDecimals = ref(2)
const getNumInput = ref('Chrome123.45')
const randomMin = ref(1)
const randomMax = ref(100)
const randomNumCount = ref(4)
const randomNumSum = ref(100)
</script>

<template>
  <div>
    <n-h1>Number</n-h1>
    <p style="color: #666; margin-bottom: 24px;">Number processing utilities</p>

    <!-- clamp -->
    <FunctionCard
      title="clamp"
      description="Clamp a number within a range"
      :code="`clamp(150, 0, 100) // 100
clamp(-10, 0, 100) // 0`"
    >
      <template #input>
        <n-space align="center">
          <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">clamp(</code>
          <n-input-number v-model:value="clampVal" style="width: 80px;" />
          <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">,</code>
          <n-input-number v-model:value="clampMin" style="width: 70px;" />
          <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">,</code>
          <n-input-number v-model:value="clampMax" style="width: 70px;" />
          <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">)</code>
        </n-space>
      </template>
      <template #result>
        <n-tag type="info" size="large" :bordered="false">{{ clamp(clampVal, clampMin, clampMax) }}</n-tag>
      </template>
    </FunctionCard>

    <!-- round -->
    <FunctionCard
      title="round"
      description="Round number to specified decimals"
      :code="`round(3.14159, 2) // 3.14`"
    >
      <template #input>
        <n-space align="center">
          <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">round(</code>
          <n-input-number v-model:value="roundVal" :step="0.00001" style="width: 100px;" />
          <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">,</code>
          <n-input-number v-model:value="roundDecimals" :min="0" :max="10" style="width: 70px;" />
          <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">)</code>
        </n-space>
      </template>
      <template #result>
        <n-tag type="info" size="large" :bordered="false">{{ round(roundVal, roundDecimals) }}</n-tag>
      </template>
    </FunctionCard>

    <!-- sum / average -->
    <FunctionCard
      title="sum / average"
      description="Calculate sum and average of array"
      :code="`sum([1, 2, 3, 4, 5]) // 15
average([1, 2, 3, 4, 5]) // 3`"
    >
      <template #result>
        <n-space vertical>
          <n-space align="center">
            <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">sum([1,2,3,4,5])</code>
            <n-tag size="small" :bordered="false">{{ sum([1, 2, 3, 4, 5]) }}</n-tag>
          </n-space>
          <n-space align="center">
            <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">average([1,2,3,4,5])</code>
            <n-tag size="small" :bordered="false">{{ average([1, 2, 3, 4, 5]) }}</n-tag>
          </n-space>
        </n-space>
      </template>
    </FunctionCard>

    <!-- inRange -->
    <FunctionCard
      title="inRange"
      description="Check if number is within range"
      :code="`inRange(5, 0, 10) // true`"
    >
      <template #input>
        <n-space align="center">
          <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">inRange(</code>
          <n-input-number v-model:value="inRangeVal" style="width: 70px;" />
          <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">,</code>
          <n-input-number v-model:value="inRangeMin" style="width: 70px;" />
          <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">,</code>
          <n-input-number v-model:value="inRangeMax" style="width: 70px;" />
          <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">)</code>
        </n-space>
      </template>
      <template #result>
        <n-tag size="small" :bordered="false">{{ inRange(inRangeVal, inRangeMin, inRangeMax) }}</n-tag>
      </template>
    </FunctionCard>

    <!-- toThousands -->
    <FunctionCard
      title="toThousands"
      description="Format number with thousands separator"
      :code="`toThousands(1234567.89) // '1,234,567.89'`"
    >
      <template #input>
        <n-input-number v-model:value="thousandsVal" :step="0.01" style="width: 150px;" />
      </template>
      <template #result>
        <n-tag type="info" size="small" :bordered="false">{{ toThousands(thousandsVal) }}</n-tag>
      </template>
    </FunctionCard>

    <!-- fixNumber -->
    <FunctionCard
      title="fixNumber"
      description="Fix number to decimals without trailing zeros"
      :code="`fixNumber(3.14159, 2) // '3.14'`"
    >
      <template #input>
        <n-space align="center">
          <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">fixNumber(</code>
          <n-input-number v-model:value="fixVal" :step="0.00001" style="width: 100px;" />
          <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">,</code>
          <n-input-number v-model:value="fixDecimals" :min="0" :max="10" style="width: 70px;" />
          <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">)</code>
        </n-space>
      </template>
      <template #result>
        <n-tag type="info" size="small" :bordered="false">{{ fixNumber(fixVal, fixDecimals) }}</n-tag>
      </template>
    </FunctionCard>

    <!-- getNumber -->
    <FunctionCard
      title="getNumber"
      description="Extract number from string"
      :code="`getNumber('Chrome123.45') // '123.45'`"
    >
      <template #input>
        <n-input v-model:value="getNumInput" style="width: 200px;" />
      </template>
      <template #result>
        <n-tag type="info" size="small" :bordered="false">{{ getNumber(getNumInput) }}</n-tag>
      </template>
    </FunctionCard>

    <!-- randomNumber -->
    <FunctionCard
      title="randomNumber"
      description="Generate random number in range"
      :code="`randomNumber(1, 100) // 42 (random)`"
    >
      <template #input>
        <n-space align="center">
          <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">randomNumber(</code>
          <n-input-number v-model:value="randomMin" style="width: 70px;" />
          <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">,</code>
          <n-input-number v-model:value="randomMax" style="width: 70px;" />
          <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">)</code>
        </n-space>
      </template>
      <template #result>
        <n-tag size="small" :bordered="false">{{ randomNumber(randomMin, randomMax) }}</n-tag>
      </template>
    </FunctionCard>

    <!-- randomNumbers -->
    <FunctionCard
      title="randomNumbers"
      description="Generate random numbers with fixed sum"
      :code="`randomNumbers(4, 100) // [25, 30, 20, 25]`"
    >
      <template #input>
        <n-space align="center">
          <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">randomNumbers(</code>
          <n-input-number v-model:value="randomNumCount" :min="1" style="width: 70px;" />
          <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">,</code>
          <n-input-number v-model:value="randomNumSum" style="width: 70px;" />
          <code style="font-size: 12px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">)</code>
        </n-space>
      </template>
      <template #result>
        <n-space align="center">
          <n-tag type="info" size="small" :bordered="false">{{ JSON.stringify(randomNumbers(randomNumCount, randomNumSum)) }}</n-tag>
          <span style="font-size: 12px; color: #666;">sum: {{ randomNumSum }}</span>
        </n-space>
      </template>
    </FunctionCard>
  </div>
</template>
