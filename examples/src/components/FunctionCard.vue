<script setup lang="ts">
import { ref, computed } from 'vue'
import { NCard, NTag, NButton, NIcon, NCode } from 'naive-ui'
import { CopyOutline, CheckmarkOutline } from '@vicons/ionicons5'
import { useI18n } from '@/locales'

interface Props {
  title: string
  description?: string
  tags?: string[]
  result?: string | number | object | null
  code?: string
  since?: string
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
  tags: () => [],
  result: null,
  code: '',
  since: '',
})

const { t } = useI18n()
const copied = ref(false)

// Generate anchor ID from title (use first function name)
const anchorId = computed(() => {
  const firstName = props.title.split('/')[0].trim().split(' ')[0].trim()
  return firstName.toLowerCase().replace(/[^a-z0-9]/g, '-')
})

const displayResult = computed(() => {
  if (props.result === null || props.result === undefined) return 'null'
  if (typeof props.result === 'object') return JSON.stringify(props.result, null, 2)
  return String(props.result)
})

const copyCode = async () => {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <n-card :id="anchorId" :title="title" size="small" hoverable style="margin-bottom: 16px; overflow: hidden;">
    <template #header-extra>
      <n-tag v-if="since" size="small" type="success" style="margin-left: 4px;">
        v{{ since }}+
      </n-tag>
      <n-tag v-for="tag in tags" :key="tag" size="small" type="info" style="margin-left: 4px;">
        {{ tag }}
      </n-tag>
    </template>

    <template #default>
      <!-- Description -->
      <p v-if="description" style="color: #666; margin-bottom: 12px;">{{ description }}</p>

      <!-- Input Slot -->
      <div v-if="$slots.input" style="margin-bottom: 12px; overflow-x: auto;">
        <slot name="input" />
      </div>

      <!-- Result Display -->
      <div v-if="result !== null" style="margin-bottom: 12px; overflow-x: auto;">
        <p style="font-size: 12px; color: #999; margin-bottom: 4px;">{{ t.result }}</p>
        <n-code :code="displayResult" language="json" style="display: block; overflow-x: auto;" />
      </div>

      <!-- Result Slot -->
      <div v-if="$slots.result" style="margin-bottom: 12px; overflow-x: auto;">
        <slot name="result" />
      </div>

      <!-- Code Example -->
      <div v-if="code" style="margin-top: 12px; overflow-x: auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span style="font-size: 12px; color: #999;">{{ t.example }}</span>
          <n-button text size="tiny" @click="copyCode">
            <template #icon>
              <n-icon>
                <CheckmarkOutline v-if="copied" style="color: #18a058;" />
                <CopyOutline v-else />
              </n-icon>
            </template>
          </n-button>
        </div>
        <n-code :code="code" language="javascript" style="display: block; overflow-x: auto;" />
      </div>

      <!-- Default Slot -->
      <slot />
    </template>
  </n-card>
</template>
