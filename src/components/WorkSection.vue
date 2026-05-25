<template>
  <section id="work" class="section-divider py-20">
    <div class="max-w-5xl mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <p class="font-mono text-xs text-[var(--text-muted)] tracking-widest uppercase mb-3">02 / EXPERIENCE</p>
        <h2 class="font-display text-4xl sm:text-5xl font-bold mb-4">
          {{ isZh ? '工作经历' : 'Work Experience' }}
        </h2>
        <div class="w-12 h-[1px] bg-[var(--accent)] mx-auto opacity-40"></div>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <div class="timeline-line"></div>

        <template v-if="loading">
          <div class="flex justify-center py-20">
            <div class="loading-spinner"></div>
          </div>
        </template>
        <template v-else-if="error">
          <div class="text-center py-20 text-[var(--text-muted)] font-mono text-sm">
            {{ isZh ? '加载失败' : 'Failed to load' }}
          </div>
        </template>
        <template v-else>
          <template v-for="(items, key) in orderedGroups" :key="key">
            <!-- Tag -->
            <div class="relative mb-12 animate-on-scroll">
              <div class="timeline-dot" style="top: 0;"></div>
              <div class="text-center">
                <span class="timeline-tag">{{ getTag(key) }}</span>
              </div>
            </div>

            <!-- Items -->
            <template v-for="(exp, idx) in items" :key="`${key}-${idx}`">
              <TimelineItem
                :experience="exp"
                :index="getItemIndex(idx, key)"
                :total="items.length"
              />
              <template v-for="(project, pIdx) in exp.projects" :key="`${key}-${idx}-${pIdx}`">
                <ProjectItem
                  :project="project"
                  :index="getProjectIndex(idx, pIdx, items.length, key)"
                />
              </template>
            </template>
          </template>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '../composables/useLocale'
import { useWorkExperience } from '../composables/useWorkExperience'
import TimelineItem from './TimelineItem.vue'
import ProjectItem from './ProjectItem.vue'

const { t, currentLocale } = useLocale()
const isZh = computed(() => currentLocale.value === 'zh')
const { grouped, loading, error } = useWorkExperience()

const orderedGroups = computed(() => {
  const keys = Object.keys(grouped.value).sort()
  const result = {}
  for (const key of keys) {
    result[key] = grouped.value[key]
  }
  return result
})

// Count items before a given key
function countBeforeKey(targetKey) {
  const keys = Object.keys(grouped.value).sort()
  let count = 0
  for (const key of keys) {
    if (key === targetKey) break
    const items = grouped.value[key]
    for (const exp of items) {
      count += 1 + (exp.projects?.length || 0)
    }
  }
  return count
}

function getItemIndex(idx, key) {
  return countBeforeKey(key) + idx
}

function getProjectIndex(idx, pIdx, expLength, key) {
  return countBeforeKey(key) + idx + 1 + pIdx
}

function getTag(key) {
  const parts = key.split('_')
  parts.shift()
  return parts.join('_')
}
</script>
