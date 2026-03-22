<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { NH1, NInput, NButton, NSpace, NCode } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import { stopBubble, stopDefault, copy, windowSize } from 'js-cool'

const copied = ref(false)
const size = ref({ width: 0, height: 0 })
const copyText = ref('Hello from js-cool!')

const handleCopy = async () => {
  const success = await copy(copyText.value)
  if (success) {
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
}

const updateSize = () => { size.value = windowSize() }

onMounted(() => {
  updateSize()
  window.addEventListener('resize', updateSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSize)
})

const bubbleCount = ref(0)
const defaultCount = ref(0)

const handleBubble = (e: MouseEvent) => {
  stopBubble(e)
  bubbleCount.value++
}

const handleDefault = (e: Event) => {
  stopDefault(e)
  defaultCount.value++
}

const incrementBubble = () => { bubbleCount.value++ }
</script>

<template>
  <div>
    <n-h1>DOM</n-h1>
    <p style="color: #666; margin-bottom: 24px;">DOM manipulation helpers</p>

    <!-- copy -->
    <FunctionCard
      title="copy"
      description="Copy text to clipboard"
      :code="`await copy('Hello World') // true`"
    >
      <template #input>
        <n-space align="center">
          <n-input v-model:value="copyText" style="width: 280px;" />
          <n-button @click="handleCopy">{{ copied ? 'Copied!' : 'Copy' }}</n-button>
        </n-space>
      </template>
    </FunctionCard>

    <!-- windowSize -->
    <FunctionCard
      title="windowSize"
      description="Get window dimensions"
      :code="`windowSize() // { width: 1920, height: 1080 }`"
    >
      <template #result>
        <n-code :code="JSON.stringify(size, null, 2)" language="json" />
      </template>
    </FunctionCard>

    <!-- stopBubble -->
    <FunctionCard
      title="stopBubble"
      description="Stop event bubbling"
      :code="`stopBubble(e) // e.stopPropagation()`"
    >
      <template #result>
        <div
          class="demo-box"
          style="cursor: pointer;"
          @click="incrementBubble"
        >
          <p style="margin-bottom: 8px; font-size: 14px;">Outer div (clicks: {{ bubbleCount }})</p>
          <div
            class="demo-box-inner"
            @click="handleBubble"
          >
            Inner div (stopBubble) - clicks won't bubble
          </div>
        </div>
      </template>
    </FunctionCard>

    <!-- stopDefault -->
    <FunctionCard
      title="stopDefault"
      description="Prevent default action"
      :code="`stopDefault(e) // e.preventDefault()`"
    >
      <template #result>
        <a href="https://example.com" @click="handleDefault" style="color: #18a058;">
          Click this link (preventDefault called {{ defaultCount }} times)
        </a>
      </template>
    </FunctionCard>
  </div>
</template>
