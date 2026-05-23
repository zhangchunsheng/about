<template>
  <dd :class="['timeline-item clearfix relative mb-6', positionClass]">
    <div class="circ absolute w-4 h-4 rounded-full bg-brand-blue border-2 border-white z-10 -left-2 top-2"></div>
    <div class="time text-xs text-gray-500 mb-1 ml-4">{{ experience.start_time }}</div>
    <div class="timeline-column ml-4">
      <div class="timeline-column-body">
        <h4 class="timeline-column-heading font-bold text-base mb-2">{{ experience.title }}</h4>

        <div>
          <p v-if="experience.desc" class="mb-2" v-html="experience.desc"></p>
          <ul class="space-y-1">
            <li>{{ t.time }}{{ t.colon }}{{ experience.start_time }} - {{ experience.end_time }}</li>
            <li v-if="experience.address">{{ t.address }}{{ t.colon }}{{ experience.address }}</li>
            <li v-if="experience.job_title">{{ t.job_title }}{{ t.colon }}{{ experience.job_title }}</li>
            <li v-if="experience.responsibility">{{ t.responsibility }}{{ t.colon }}{{ experience.responsibility }}</li>
            <li v-for="(ext, idx) in experience.ext" :key="idx">
              {{ ext.name }}{{ t.colon }}<span v-html="formatValue(ext.value)"></span>
            </li>
          </ul>
        </div>

        <!-- Projects -->
        <div v-for="project in experience.projects" :key="project.project_id" class="mt-2">
          <dd :class="['timeline-item clearfix relative mb-4 ml-4', positionClass]">
            <div class="circ absolute w-3 h-3 rounded-full bg-brand-green border-2 border-white z-10 -left-1.5 top-2"></div>
            <div class="time text-xs text-gray-500 mb-1 ml-4">{{ project.start_time }}</div>
            <div class="timeline-column ml-4">
              <div class="timeline-column-body">
                <h4 class="timeline-column-heading font-bold text-sm mb-2">
                  {{ t.project }} {{ project.project_id }} {{ project.project_name }}
                </h4>

                <div class="project-toggle" @click="toggleProject(project.project_id)" :class="{ 'project-active': expandedProjects[project.project_id] }">
                  {{ expandedProjects[project.project_id] ? t.hide : t.show }}
                </div>

                <div v-show="expandedProjects[project.project_id]" class="project-content transition-all duration-500">
                  <ul class="space-y-1 mt-2">
                    <li>{{ t.time }}{{ t.colon }}{{ project.start_time }} - {{ project.end_time }}</li>
                    <li v-for="(kv, idx) in project.kv" :key="idx">
                      {{ kv.name }}{{ t.colon }}<span v-html="formatValue(kv.value)"></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </dd>
        </div>
      </div>
    </div>
  </dd>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLocale } from '../composables/useLocale'

const props = defineProps({
  experience: { type: Object, required: true },
  index: { type: Number, required: true },
  total: { type: Number, required: true },
})

const { t } = useLocale()

const expandedProjects = ref({})

const positionClass = computed(() =>
  props.index % 2 === 0 ? 'pos-left' : 'pos-right'
)

function toggleProject(id) {
  expandedProjects.value[id] = !expandedProjects.value[id]
}

function formatValue(value) {
  if (!value) return ''
  const httpIndex = value.indexOf('http')
  if (httpIndex === 0) {
    const blankIndex = value.indexOf(' ')
    if (blankIndex > 0) {
      const url = value.substring(0, blankIndex)
      return `<a href="${url}">${url}</a>${value.substring(blankIndex)}`
    }
    return `<a href="${value}">${value}</a>`
  }
  return value
}
</script>
