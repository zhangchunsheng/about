<template>
  <div :class="['relative mt-4 mb-12 animate-on-scroll', positionClass]">
    <div class="timeline-dot" style="background: var(--accent);"></div>
    <div class="timeline-card">
      <!-- Header -->
      <div class="flex items-center gap-3 mb-3">
        <span class="timeline-tag !text-[10px]">{{ t.project }}</span>
        <h5 class="font-display text-sm font-bold text-[var(--text-primary)]">
          {{ project.project_name }}
        </h5>
      </div>

      <!-- Time -->
      <div class="font-mono text-[11px] text-[var(--text-muted)] tracking-wider mb-3">
        {{ project.start_time }} — {{ project.end_time }}
      </div>

      <!-- Details -->
      <ul class="space-y-2 text-sm">
        <li v-for="(kv, idx) in project.kv" :key="idx" class="flex items-start gap-2">
          <span class="font-mono text-[11px] text-[var(--accent)] shrink-0 mt-0.5">{{ kv.name }}</span>
          <span class="text-[var(--text-secondary)] break-all" v-html="formatValue(kv.value)"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '../composables/useLocale'

const props = defineProps({
  project: { type: Object, required: true },
  parentIndex: { type: Number, default: 0 },
})

const { t } = useLocale()

const positionClass = computed(() => {
  return props.parentIndex % 2 === 0 ? 'timeline-item-left' : 'timeline-item-right'
})

function formatValue(value) {
  if (!value) return ''
  if (value.indexOf('http') === 0) {
    const blankIndex = value.indexOf(' ')
    if (blankIndex > 0) {
      const url = value.substring(0, blankIndex)
      return `<a href="${url}" class="text-[var(--accent)] hover:underline break-all">${url}</a>${value.substring(blankIndex)}`
    }
    return `<a href="${value}" class="text-[var(--accent)] hover:underline break-all">${value}</a>`
  }
  return value
}
</script>
