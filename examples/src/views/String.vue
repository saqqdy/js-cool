<script setup lang="ts">
import { ref } from 'vue'
import { NH1, NSpace, NInput, NInputNumber, NTag, NCode } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import {
  camel2Dash,
  dash2Camel,
  upperFirst,
  kebabCase,
  snakeCase,
  truncate,
  trim,
  clearHtml,
  clearAttr,
  escape,
  unescape,
  getCHSLength,
  cutCHSString,
  mapTemplate,
} from 'js-cool'

const camelInput = ref('backgroundColor')
const dashInput = ref('background-color')
const upperInput = ref('hello')
const truncateInput = ref('This is a long string that needs to be truncated')
const truncateLen = ref(20)
const trimInput = ref('  hello world  ')
const htmlInput = ref('<div id="test">Hello <b>World</b></div>')
const escapeInput = ref('<div>test & "quote"</div>')
const chsInput = ref('hello世界')
const chsLen = ref(6)
const templateInput = ref('Hello, ${name}! You have ${count} messages.')
const templateData = { name: 'John', count: 5 }
</script>

<template>
  <div>
    <n-h1>String</n-h1>
    <p style="color: #666; margin-bottom: 24px;">String manipulation utilities</p>

    <FunctionCard
      title="camel2Dash / dash2Camel"
      description="Convert between camelCase and kebab-case"
      :tags="['convert']"
      :code="`camel2Dash('backgroundColor') // '${camel2Dash(camelInput)}'\ndash2Camel('background-color') // '${dash2Camel(dashInput)}'`"
    >
      <template #input>
        <n-space vertical>
          <n-space align="center">
            <n-input v-model:value="camelInput" style="width: 200px;" placeholder="camelCase" />
            <span style="color: #999;">→</span>
            <n-tag type="info">{{ camel2Dash(camelInput) }}</n-tag>
          </n-space>
          <n-space align="center">
            <n-input v-model:value="dashInput" style="width: 200px;" placeholder="kebab-case" />
            <span style="color: #999;">→</span>
            <n-tag type="info">{{ dash2Camel(dashInput) }}</n-tag>
          </n-space>
        </n-space>
      </template>
    </FunctionCard>

    <FunctionCard
      title="upperFirst"
      description="Capitalize first letter"
      :result="upperFirst(upperInput)"
      :code="`upperFirst('${upperInput}') // '${upperFirst(upperInput)}'`"
    >
      <template #input>
        <n-space align="center">
          <n-input v-model:value="upperInput" style="width: 200px;" />
          <span style="color: #999;">→</span>
          <n-tag type="info">{{ upperFirst(upperInput) }}</n-tag>
        </n-space>
      </template>
    </FunctionCard>

    <FunctionCard
      title="kebabCase / snakeCase"
      description="Convert strings to kebab-case or snake_case"
      :tags="['convert']"
      :code="`kebabCase('helloWorld') // '${kebabCase('helloWorld')}'\nsnakeCase('helloWorld') // '${snakeCase('helloWorld')}'`"
    >
      <template #result>
        <n-space vertical>
          <n-space align="center">
            <n-code code="kebabCase('helloWorld')" language="javascript" />
            <n-tag type="info">{{ kebabCase('helloWorld') }}</n-tag>
          </n-space>
          <n-space align="center">
            <n-code code="snakeCase('helloWorld')" language="javascript" />
            <n-tag type="info">{{ snakeCase('helloWorld') }}</n-tag>
          </n-space>
        </n-space>
      </template>
    </FunctionCard>

    <FunctionCard
      title="truncate"
      description="Truncate string with multiple options"
      :code="`truncate('hi-diddly-ho there, neighborino')
// 'hi-diddly-ho there, neighbo...'

truncate('hi-diddly-ho there, neighborino', { separator: ' ' })
// 'hi-diddly-ho there,...'`"
    >
      <template #input>
        <n-space vertical>
          <n-input v-model:value="truncateInput" style="width: 300px;" />
          <n-space align="center">
            <code class="code-inline">length:</code>
            <n-input-number v-model:value="truncateLen" :min="1" style="width: 80px;" />
          </n-space>
        </n-space>
      </template>
      <template #result>
        <n-space vertical>
          <n-space align="center">
            <code class="code-inline" style="font-size: 11px;">{ length: {{ truncateLen }} }</code>
            <n-tag type="info" size="small">{{ truncate(truncateInput, { length: truncateLen }) }}</n-tag>
          </n-space>
          <n-space align="center">
            <code class="code-inline" style="font-size: 11px;">{ length: {{ truncateLen }}, omission: '…' }</code>
            <n-tag type="info" size="small">{{ truncate(truncateInput, { length: truncateLen, omission: '…' }) }}</n-tag>
          </n-space>
          <n-space align="center">
            <code class="code-inline" style="font-size: 11px;">{ length: {{ truncateLen }}, separator: ' ' }</code>
            <n-tag type="info" size="small">{{ truncate(truncateInput, { length: truncateLen, separator: ' ' }) }}</n-tag>
          </n-space>
        </n-space>
      </template>
    </FunctionCard>

    <FunctionCard
      title="trim"
      description="Remove whitespace from string ends"
      :code="`trim('${trimInput}') // '${trim(trimInput)}'`"
    >
      <template #input>
        <n-space align="center">
          <n-input v-model:value="trimInput" style="width: 200px;" />
          <span style="color: #999;">→</span>
          <n-tag type="info">"{{ trim(trimInput) }}"</n-tag>
        </n-space>
      </template>
    </FunctionCard>

    <FunctionCard
      title="clearHtml / clearAttr"
      description="Remove HTML tags or attributes"
      :tags="['html']"
      :code="`clearHtml('${htmlInput}') // '${clearHtml(htmlInput)}'\nclearAttr('${htmlInput}') // '${clearAttr(htmlInput)}'`"
    >
      <template #input>
        <n-input v-model:value="htmlInput" style="width: 100%;" />
      </template>
      <template #result>
        <n-space vertical>
          <n-space align="center">
            <n-code code="clearHtml" language="javascript" />
            <n-tag type="info">{{ clearHtml(htmlInput) }}</n-tag>
          </n-space>
          <n-space align="center">
            <n-code code="clearAttr" language="javascript" />
            <n-tag type="info">{{ clearAttr(htmlInput) }}</n-tag>
          </n-space>
        </n-space>
      </template>
    </FunctionCard>

    <FunctionCard
      title="escape / unescape"
      description="Escape/unescape HTML special characters"
      :tags="['html']"
      :code="`escape('${escapeInput}') // '${escape(escapeInput)}'`"
    >
      <template #input>
        <n-input v-model:value="escapeInput" style="width: 100%;" />
      </template>
      <template #result>
        <n-space vertical>
          <n-space align="center">
            <n-code code="escape" language="javascript" />
            <n-tag type="info">{{ escape(escapeInput) }}</n-tag>
          </n-space>
          <n-space align="center">
            <n-code code="unescape" language="javascript" />
            <n-tag type="info">{{ unescape(escape(escapeInput)) }}</n-tag>
          </n-space>
        </n-space>
      </template>
    </FunctionCard>

    <FunctionCard
      title="getCHSLength / cutCHSString"
      description="Handle Chinese characters (Chinese = 2 bytes)"
      :tags="['chinese']"
      :code="`getCHSLength('${chsInput}') // ${getCHSLength(chsInput)}\ncutCHSString('${chsInput}', ${chsLen}) // '${cutCHSString(chsInput, chsLen)}'`"
    >
      <template #input>
        <n-space vertical>
          <n-space align="center">
            <n-input v-model:value="chsInput" style="width: 200px;" />
            <n-tag type="info">length: {{ getCHSLength(chsInput) }}</n-tag>
          </n-space>
          <n-space align="center">
            <n-input-number v-model:value="chsLen" :min="1" style="width: 80px;" />
            <span style="color: #999;">bytes</span>
          </n-space>
        </n-space>
      </template>
      <template #result>
        <n-space>
          <n-tag type="info">{{ cutCHSString(chsInput, chsLen) }}</n-tag>
          <n-tag type="info">{{ cutCHSString(chsInput, chsLen, true) }}</n-tag>
        </n-space>
      </template>
    </FunctionCard>

    <FunctionCard
      title="mapTemplate"
      description="Template string interpolation"
      :result="mapTemplate(templateInput, templateData)"
      :code="`const data = ${JSON.stringify(templateData)}\nmapTemplate('${templateInput}', data) // '${mapTemplate(templateInput, templateData)}'`"
    >
      <template #input>
        <n-space vertical>
          <n-input v-model:value="templateInput" style="width: 100%;" />
          <n-space align="center">
            <span style="color: #999; font-size: 12px;">data:</span>
            <n-tag type="info" size="small">{{ JSON.stringify(templateData) }}</n-tag>
          </n-space>
        </n-space>
      </template>
    </FunctionCard>
  </div>
</template>
