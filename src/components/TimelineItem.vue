<template>
  <div :class="[
    'relative mb-12 animate-on-scroll',
    index % 2 === 0 ? 'timeline-item-left' : 'timeline-item-right'
  ]">
    <div class="timeline-dot"></div>
    <div class="timeline-card">
      <!-- Time -->
      <div class="font-mono text-[11px] text-[var(--text-muted)] tracking-wider mb-3">
        {{ experience.start_time }} — {{ experience.end_time }}
      </div>

      <!-- Title -->
      <h4 class="font-display text-lg font-bold text-[var(--text-primary)] mb-2">
        {{ experience.title }}
      </h4>

      <!-- Description -->
      <p v-if="experience.desc" class="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed" v-html="experience.desc"></p>

      <!-- Meta -->
      <ul class="space-y-2 text-sm">
        <li v-if="experience.address" class="flex items-start gap-2">
          <span class="font-mono text-[11px] text-[var(--accent)] shrink-0 mt-0.5">{{ isZh ? '地点' : 'LOC' }}</span>
          <span class="text-[var(--text-secondary)]">{{ experience.address }}</span>
        </li>
        <li v-if="experience.job_title" class="flex items-start gap-2">
          <span class="font-mono text-[11px] text-[var(--accent)] shrink-0 mt-0.5">{{ isZh ? '职位' : 'ROLE' }}</span>
          <span class="text-[var(--text-secondary)]">{{ experience.job_title }}</span>
        </li>
        <li v-if="experience.responsibility" class="flex items-start gap-2">
          <span class="font-mono text-[11px] text-[var(--accent)] shrink-0 mt-0.5">{{ isZh ? '职责' : 'RESP' }}</span>
          <span class="text-[var(--text-secondary)]">{{ experience.responsibility }}</span>
        </li>
        <li v-for="(ext, idx) in experience.ext" :key="idx" class="flex items-start gap-2">
          <span class="font-mono text-[11px] text-[var(--accent)] shrink-0 mt-0.5">{{ ext.name }}</span>
          <span class="text-[var(--text-secondary)]" v-html="formatValue(ext.value)"></span>
        </li>
      </ul>
    </div>

  </div>
</template>

<script setup>
const props = defineProps({
  experience: { type: Object, required: true },
  index: { type: Number, required: true },
  total: { type: Number, required: true },
  parentIndex: { type: Number, default: 0 },
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
