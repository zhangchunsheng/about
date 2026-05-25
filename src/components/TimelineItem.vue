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

      <!-- Projects -->
      <div v-for="project in experience.projects" :key="project.project_id" class="mt-4 pt-4 border-t border-[var(--border)]">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-2 h-2 rounded-full bg-[var(--accent)] opacity-60"></div>
          <h5 class="font-mono text-xs text-[var(--text-primary)] font-medium">
            {{ project.project_name }}
          </h5>
        </div>

        <div class="project-toggle" @click="toggleProject(project.project_id)" :class="{ active: expandedProjects[project.project_id] }">
          <span class="arrow">›</span>
          {{ expandedProjects[project.project_id] ? t.hide : t.show }}
        </div>

        <div v-show="expandedProjects[project.project_id]" class="mt-3 ml-2 pl-3 border-l border-[var(--border)]">
          <ul class="space-y-2 text-sm">
            <li class="flex items-start gap-2">
              <span class="font-mono text-[11px] text-[var(--text-muted)] shrink-0 mt-0.5">{{ isZh ? '时间' : 'TIME' }}</span>
              <span class="text-[var(--text-secondary)]">{{ project.start_time }} — {{ project.end_time }}</span>
            </li>
            <li v-for="(kv, idx) in project.kv" :key="idx" class="flex items-start gap-2">
              <span class="font-mono text-[11px] text-[var(--accent)] shrink-0 mt-0.5">{{ kv.name }}</span>
              <span class="text-[var(--text-secondary)]" v-html="formatValue(kv.value)"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLocale } from '../composables/useLocale'

const props = defineProps({
  experience: { type: Object, required: true },
  index: { type: Number, required: true },
  total: { type: Number, required: true },
})

const { t, currentLocale } = useLocale()
const isZh = computed(() => currentLocale.value === 'zh')

const expandedProjects = ref({})

function toggleProject(id) {
  expandedProjects.value[id] = !expandedProjects.value[id]
}

function formatValue(value) {
  if (!value) return ''
  if (value.indexOf('http') === 0) {
    const blankIndex = value.indexOf(' ')
    if (blankIndex > 0) {
      const url = value.substring(0, blankIndex)
      return `<a href="${url}" class="text-[var(--accent)] hover:underline">${url}</a>${value.substring(blankIndex)}`
    }
    return `<a href="${value}" class="text-[var(--accent)] hover:underline">${value}</a>`
  }
  return value
}
</script>
