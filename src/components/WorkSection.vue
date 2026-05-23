<template>
  <section id="work" class="section py-4">
    <div class="max-w-5xl mx-auto px-4">
      <div class="timeline">
        <dl class="relative">
          <template v-if="loading">
            <div class="text-center py-12 text-gray-500">Loading...</div>
          </template>
          <template v-else-if="error">
            <div class="text-center py-12 text-red-500">Failed to load work experience.</div>
          </template>
          <template v-else>
            <template v-for="(items, key) in orderedGroups" :key="key">
              <dt class="timeline-tag font-bold text-lg mb-4 text-[#333]">{{ getTag(key) }}</dt>
              <TimelineItem
                v-for="(exp, idx) in items"
                :key="`${key}-${idx}`"
                :experience="exp"
                :index="idx"
                :total="items.length"
              />
            </template>
          </template>
        </dl>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useWorkExperience } from '../composables/useWorkExperience'
import TimelineItem from './TimelineItem.vue'

const { grouped, loading, error } = useWorkExperience()

const orderedGroups = computed(() => {
  const keys = Object.keys(grouped.value).sort()
  const result = {}
  for (const key of keys) {
    result[key] = grouped.value[key]
  }
  return result
})

function getTag(key) {
  const parts = key.split('_')
  parts.shift() // remove order number
  return parts.join('_')
}
</script>
