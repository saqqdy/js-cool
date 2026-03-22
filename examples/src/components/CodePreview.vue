<script setup lang="ts">
import { ref } from 'vue'
import { NCode, NButton, NIcon } from 'naive-ui'
import { CopyOutline, CheckmarkOutline } from '@vicons/ionicons5'

interface Props {
  code: string
  language?: string
  showCopy?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  language: 'javascript',
  showCopy: true,
})

const copied = ref(false)

const copyCode = async () => {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div style="position: relative; overflow-x: auto;">
    <n-button
      v-if="showCopy"
      text
      size="tiny"
      style="position: absolute; top: 8px; right: 8px; z-index: 1;"
      @click="copyCode"
    >
      <template #icon>
        <n-icon>
          <CheckmarkOutline v-if="copied" style="color: #18a058;" />
          <CopyOutline v-else />
        </n-icon>
      </template>
    </n-button>
    <n-code :code="code" :language="language" style="display: block; overflow-x: auto;" />
  </div>
</template>
