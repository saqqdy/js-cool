<script setup lang="ts">
import { ref } from 'vue'
import { NH1, NInput, NTag, NButton, NSpace } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import { fillIPv6 } from 'js-cool'
import { useI18n } from '@/locales'

const { t } = useI18n()

const ipv6Input = ref('::1')
const ipv6Result = ref('')

const handleFillIPv6 = () => {
  ipv6Result.value = fillIPv6(ipv6Input.value)
}
</script>

<template>
  <div>
    <n-h1>Network</n-h1>
    <p style="color: #666; margin-bottom: 24px;">{{ t.categoriesDesc.Network }}</p>

    <!-- fillIPv6 -->
    <FunctionCard
      title="fillIPv6"
      description="Expand abbreviated IPv6 address to full format"
      :code="`fillIPv6('::1')
// '0000:0000:0000:0000:0000:0000:0000:0001'

fillIPv6('2001:db8::1')
// '2001:0db8:0000:0000:0000:0000:0000:0001'`"
    >
      <template #input>
        <n-space align="center">
          <n-input v-model:value="ipv6Input" style="width: 200px;" placeholder="IPv6 address" />
          <n-button size="small" @click="handleFillIPv6">Fill</n-button>
        </n-space>
      </template>
      <template #result>
        <n-space vertical>
          <n-space v-if="ipv6Result" align="center">
            <n-tag type="info" size="small" :bordered="false">{{ ipv6Result }}</n-tag>
          </n-space>
          <n-space vertical>
            <n-space align="center">
              <code class="code-inline">fillIPv6('::1')</code>
              <n-tag size="small" :bordered="false">{{ fillIPv6('::1') }}</n-tag>
            </n-space>
            <n-space align="center">
              <code class="code-inline">fillIPv6('2001:db8::1')</code>
              <n-tag size="small" :bordered="false">{{ fillIPv6('2001:db8::1') }}</n-tag>
            </n-space>
            <n-space align="center">
              <code class="code-inline">fillIPv6('fe80::')</code>
              <n-tag size="small" :bordered="false">{{ fillIPv6('fe80::') }}</n-tag>
            </n-space>
          </n-space>
        </n-space>
      </template>
    </FunctionCard>
  </div>
</template>
