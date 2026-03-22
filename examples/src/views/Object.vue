<script setup lang="ts">
import { ref } from 'vue'
import { NH1, NSpace, NInput, NTag, NCode } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import { clone, extend, getProperty, setProperty, omit, pick, safeParse, safeStringify, isEqual } from 'js-cool'
import { useI18n } from '@/locales'

const { t } = useI18n()

const objInput = ref({ a: { b: { c: 1 } } })
const pathInput = ref('a.b.c')
const sourceObj = ref({ a: 1, b: 2, c: 3, d: 4 })

const testJson = '{"a":1}'
const testObj = { a: BigInt(9007199254740993n), b: () => {} }
</script>

<template>
  <div>
    <n-h1>Object</n-h1>
    <p style="color: #666; margin-bottom: 24px;">{{ t.categoriesDesc.Object }}</p>

    <FunctionCard
      title="clone"
      description="Deep clone object"
      :code="`clone({ a: { b: 1 } }) // { a: { b: 1 } }`"
    >
      <template #result>
        <n-space align="center">
          <n-code code="clone({ a: { b: 1 } })" language="javascript" />
          <n-tag type="info">{{ JSON.stringify(clone({ a: { b: 1 } })) }}</n-tag>
        </n-space>
      </template>
    </FunctionCard>

    <FunctionCard
      title="extend"
      description="Deep merge objects (pass true as first arg for deep merge)"
      :code="`// Shallow merge
extend({ a: 1 }, { b: 2 }) // { a: 1, b: 2 }

// Deep merge
extend(true, {}, { a: { x: 1 } }, { a: { y: 2 } })
// { a: { x: 1, y: 2 } }`"
    >
      <template #result>
        <n-space vertical>
          <div>
            <n-code code="extend({ a: { x: 1 } }, { a: { y: 2 } })" language="javascript" />
            <n-tag type="info" size="small" style="margin-top: 4px;">{{ JSON.stringify(extend({ a: { x: 1 } }, { a: { y: 2 } }), null, 2) }}</n-tag>
          </div>
          <div>
            <n-code code="extend(true, {}, { a: { x: 1 } }, { a: { y: 2 } })" language="javascript" />
            <n-tag type="info" size="small" style="margin-top: 4px;">{{ JSON.stringify(extend(true, {}, { a: { x: 1 } }, { a: { y: 2 } }), null, 2) }}</n-tag>
          </div>
        </n-space>
      </template>
    </FunctionCard>

    <FunctionCard
      title="getProperty / setProperty"
      description="Get/set nested property by path"
      :code="`getProperty({ a: { b: { c: 1 } } }, 'a.b.c') // 1
setProperty(obj, 'a.b.c', 100) // sets nested value`"
    >
      <template #input>
        <n-space vertical>
          <n-space align="center">
            <span style="color: #999; font-size: 12px;">obj:</span>
            <n-tag type="info" size="small">{{ JSON.stringify(objInput) }}</n-tag>
          </n-space>
          <n-space align="center">
            <n-input v-model:value="pathInput" style="width: 120px;" />
            <span style="color: #999;">→</span>
            <n-tag type="info">{{ JSON.stringify(getProperty(objInput, pathInput)) }}</n-tag>
          </n-space>
        </n-space>
      </template>
      <template #result>
        <n-space align="center">
          <n-code code="setProperty({}, 'a.b.c', 1)" language="javascript" />
          <n-tag type="info" size="small">{{ JSON.stringify(setProperty({}, 'a.b.c', 1)) }}</n-tag>
        </n-space>
      </template>
    </FunctionCard>

    <FunctionCard
      title="omit / pick"
      description="Filter object properties"
      :tags="['filter']"
      :code="`omit({ a: 1, b: 2, c: 3 }, ['b', 'c']) // { a: 1 }\npick({ a: 1, b: 2, c: 3 }, ['a', 'b']) // { a: 1, b: 2 }`"
    >
      <template #input>
        <n-space align="center">
          <span style="color: #999; font-size: 12px;">source:</span>
          <n-tag type="info" size="small">{{ JSON.stringify(sourceObj) }}</n-tag>
        </n-space>
      </template>
      <template #result>
        <n-space>
          <n-space align="center">
            <n-code code="omit(['b','c'])" language="javascript" />
            <n-tag type="info" size="small">{{ JSON.stringify(omit(sourceObj, ['b', 'c'])) }}</n-tag>
          </n-space>
          <n-space align="center">
            <n-code code="pick(['a','b'])" language="javascript" />
            <n-tag type="info" size="small">{{ JSON.stringify(pick(sourceObj, ['a', 'b'])) }}</n-tag>
          </n-space>
        </n-space>
      </template>
    </FunctionCard>

    <FunctionCard
      title="safeParse / safeStringify"
      description="Safe JSON operations that never throw (handles BigInt, functions, circular refs)"
      :tags="['json']"
      :code="`safeParse('{&quot;a&quot;:1}') // { a: 1 }
safeParse('invalid') // null (no error!)
safeStringify({ a: BigInt(1n) }) // handles BigInt`"
    >
      <template #result>
        <n-space vertical>
          <n-space align="center">
            <n-code :code="`safeParse('${testJson}')`" language="javascript" />
            <n-tag type="info">{{ JSON.stringify(safeParse(testJson)) }}</n-tag>
          </n-space>
          <n-space align="center">
            <n-code code="safeParse('invalid')" language="javascript" />
            <n-tag type="info">{{ JSON.stringify(safeParse('invalid')) }}</n-tag>
          </n-space>
          <n-space align="center">
            <n-code :code="`safeStringify(testObj)`" language="javascript" />
            <n-tag type="info" size="small">{{ safeStringify(testObj) }}</n-tag>
          </n-space>
        </n-space>
      </template>
    </FunctionCard>

    <FunctionCard
      title="isEqual"
      description="Deep equality comparison"
      :code="`isEqual({ a: 1 }, { a: 1 }) // true\nisEqual(NaN, NaN) // true`"
    >
      <template #result>
        <n-space vertical>
          <n-space align="center">
            <n-code code="isEqual({ a: 1 }, { a: 1 })" language="javascript" />
            <n-tag type="info">{{ isEqual({ a: 1 }, { a: 1 }) }}</n-tag>
          </n-space>
          <n-space align="center">
            <n-code code="isEqual({ a: 1 }, { a: 2 })" language="javascript" />
            <n-tag type="info">{{ isEqual({ a: 1 }, { a: 2 }) }}</n-tag>
          </n-space>
          <n-space align="center">
            <n-code code="isEqual(NaN, NaN)" language="javascript" />
            <n-tag type="info">{{ isEqual(NaN, NaN) }}</n-tag>
          </n-space>
        </n-space>
      </template>
    </FunctionCard>
  </div>
</template>
