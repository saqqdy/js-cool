<script setup lang="ts">
import { ref } from 'vue'
import { NH1, NSpace, NInputNumber, NTag, NCode, NButton } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import { shuffle, unique, intersect, union, minus, complement, contains, all, any, chunk, flatten, groupBy, sample, sampleSize, sortPinyin } from 'js-cool'
import { useI18n } from '@/locales'

const { t } = useI18n()

const shuffleInput = ref([1, 2, 3, 4, 5])
const shuffleSize = ref<number | undefined>(undefined)
const shuffleResult = ref<number[]>([])
const doShuffle = () => {
  shuffleResult.value = shuffle([...shuffleInput.value], shuffleSize.value)
}

const sampleResult = ref<number | undefined>()
const doSample = () => {
  sampleResult.value = sample([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
}

const sampleSizeCount = ref(3)
const sampleSizeResult = ref<number[]>([])
const doSampleSize = () => {
  sampleSizeResult.value = sampleSize([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], sampleSizeCount.value)
}

const chunkInput = ref([1, 2, 3, 4, 5, 6, 7, 8])
const chunkSize = ref(3)
const setA = ref([1, 2, 3])
const setB = ref([2, 3, 4])
const pinyinInput = ref(['张三', '李四', '王五', '赵六'])
</script>

<template>
  <div>
    <n-h1>Array</n-h1>
    <p style="color: #666; margin-bottom: 24px;">{{ t.categoriesDesc.Array }}</p>

    <FunctionCard
      title="unique"
      :description="t.array.uniqueDesc"
      :result="JSON.stringify(unique([1, 2, 2, 3, 3, 3, 4, 5]))"
      :code="`unique([1, 2, 2, 3, 3, 3, 4, 5]) // [1, 2, 3, 4, 5]`"
    />

    <FunctionCard
      title="shuffle"
      :description="t.array.shuffleDesc"
      :code="`shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4]
shuffle([1, 2, 3, 4, 5], 3) // [4, 1, 5] (3 elements)
shuffle('hello') // 'lleho'
shuffle('hello', 3) // 'leh'`"
    >
      <template #input>
        <n-space vertical>
          <n-space align="center">
            <n-tag>{{ JSON.stringify(shuffleInput) }}</n-tag>
          </n-space>
          <n-space align="center">
            <code class="code-inline">size:</code>
            <n-input-number v-model:value="shuffleSize" :min="1" :max="shuffleInput.length" style="width: 80px;" placeholder="all" clearable />
            <n-button size="small" @click="doShuffle">Shuffle</n-button>
          </n-space>
        </n-space>
      </template>
      <template #result>
        <n-space vertical>
          <n-tag type="info">{{ JSON.stringify(shuffleResult.length ? shuffleResult : shuffle([...shuffleInput])) }}</n-tag>
          <n-space align="center">
            <code class="code-inline">shuffle('hello')</code>
            <n-tag size="small">{{ shuffle('hello') }}</n-tag>
          </n-space>
          <n-space align="center">
            <code class="code-inline">shuffle('hello', 3)</code>
            <n-tag size="small">{{ shuffle('hello', 3) }}</n-tag>
          </n-space>
        </n-space>
      </template>
    </FunctionCard>

    <FunctionCard
      title="chunk"
      :description="t.array.chunkDesc"
      :code="`chunk([1, 2, 3, 4, 5, 6, 7, 8], ${chunkSize}) // ${JSON.stringify(chunk(chunkInput, chunkSize))}`"
    >
      <template #input>
        <n-space>
          <n-tag>{{ JSON.stringify(chunkInput) }}</n-tag>
          <n-input-number v-model:value="chunkSize" :min="1" style="width: 60px;" />
          <span style="color: #999;">→</span>
          <n-tag type="info">{{ JSON.stringify(chunk(chunkInput, chunkSize)) }}</n-tag>
        </n-space>
      </template>
    </FunctionCard>

    <FunctionCard
      title="flatten"
      :description="t.array.flattenDesc"
      :result="JSON.stringify(flatten([1, [2, 3], [4, [5, 6]]]))"
      :code="`flatten([1, [2, 3], [4, [5, 6]]]) // [1, 2, 3, 4, 5, 6]`"
    />

    <FunctionCard
      title="sample / sampleSize"
      :description="t.array.sampleDesc"
      :code="`sample([1, 2, 3, 4, 5]) // 3 (single random element)
sampleSize([1, 2, 3, 4, 5], 2) // [3, 1] (2 random elements)`"
    >
      <template #input>
        <n-space vertical>
          <n-space align="center">
            <n-tag>[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]</n-tag>
          </n-space>
          <n-space align="center">
            <n-button size="small" @click="doSample">{{ t.array.sampleOne }}</n-button>
            <n-tag type="info" size="small">{{ sampleResult }}</n-tag>
          </n-space>
          <n-space align="center">
            <n-input-number v-model:value="sampleSizeCount" :min="1" :max="10" style="width: 70px;" />
            <n-button size="small" @click="doSampleSize">{{ t.array.sampleSize }}</n-button>
            <n-tag type="info" size="small">{{ JSON.stringify(sampleSizeResult) }}</n-tag>
          </n-space>
        </n-space>
      </template>
    </FunctionCard>

    <FunctionCard
      title="Set Operations"
      :description="t.array.setOpsDesc"
      :tags="[t.set]"
      :code="`intersect([1, 2, 3], [2, 3, 4]) // [2, 3]\nunion([1, 2, 3], [2, 3, 4]) // [1, 2, 3, 4]`"
    >
      <template #input>
        <n-space>
          <n-tag>A: {{ JSON.stringify(setA) }}</n-tag>
          <n-tag>B: {{ JSON.stringify(setB) }}</n-tag>
        </n-space>
      </template>
      <template #result>
        <n-space vertical>
          <n-space align="center">
            <n-code code="intersect" language="javascript" />
            <n-tag type="info">{{ JSON.stringify(intersect(setA, setB)) }}</n-tag>
          </n-space>
          <n-space align="center">
            <n-code code="union" language="javascript" />
            <n-tag type="info">{{ JSON.stringify(union(setA, setB)) }}</n-tag>
          </n-space>
          <n-space align="center">
            <n-code code="minus" language="javascript" />
            <n-tag type="info">{{ JSON.stringify(minus(setA, setB)) }}</n-tag>
          </n-space>
          <n-space align="center">
            <n-code code="complement" language="javascript" />
            <n-tag type="info">{{ JSON.stringify(complement(setA, setB)) }}</n-tag>
          </n-space>
        </n-space>
      </template>
    </FunctionCard>

    <FunctionCard
      title="contains / all / any"
      :description="t.array.checkDesc"
      :tags="[t.predicate]"
      :code="`contains([1, 2, 3], 2) // true\nall([1, 2, 3], x => x > 0) // true`"
    >
      <template #result>
        <n-space vertical>
          <n-space align="center">
            <n-code code="contains([1,2,3], 2)" language="javascript" />
            <n-tag type="info">{{ contains([1, 2, 3], 2) }}</n-tag>
          </n-space>
          <n-space align="center">
            <n-code code="all([1,2,3], x => x > 0)" language="javascript" />
            <n-tag type="info">{{ all([1, 2, 3], x => x > 0) }}</n-tag>
          </n-space>
          <n-space align="center">
            <n-code code="any([1,2,3], x => x > 2)" language="javascript" />
            <n-tag type="info">{{ any([1, 2, 3], x => x > 2) }}</n-tag>
          </n-space>
        </n-space>
      </template>
    </FunctionCard>

    <FunctionCard
      title="groupBy"
      :description="t.array.groupByDesc"
      :code="`groupBy([{ name: 'a', val: 1 }, { name: 'b', val: 2 }, { name: 'a', val: 3 }], 'name')`"
    >
      <template #result>
        <n-code :code="JSON.stringify(groupBy([{ name: 'a', val: 1 }, { name: 'b', val: 2 }, { name: 'a', val: 3 }], 'name'), null, 2)" language="json" />
      </template>
    </FunctionCard>

    <FunctionCard
      title="sortPinyin"
      :description="t.array.sortPinyinDesc"
      :code="`['张三', '李四', '王五'].sort(sortPinyin) // ['李四', '王五', '张三']`"
    >
      <template #input>
        <n-space>
          <n-tag>{{ JSON.stringify(pinyinInput) }}</n-tag>
          <span style="color: #999;">→</span>
          <n-tag type="info">{{ JSON.stringify([...pinyinInput].sort(sortPinyin)) }}</n-tag>
        </n-space>
      </template>
    </FunctionCard>
  </div>
</template>
