<template>
  <section id="technology" class="section-divider py-20">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-16 animate-on-scroll">
        <p class="font-mono text-xs text-[var(--text-muted)] tracking-widest uppercase mb-3">01 / SKILLS</p>
        <h2 class="font-display text-4xl sm:text-5xl font-bold mb-4">
          {{ t.skill_info }}
        </h2>
        <div class="w-12 h-[1px] bg-[var(--accent)] mx-auto opacity-40"></div>
      </div>

      <!-- Skill Badges Grid -->
      <div class="flex flex-wrap justify-center gap-2 mb-20 animate-on-scroll">
        <span v-for="skill in skills" :key="skill.name" class="skill-badge" :style="{ borderColor: skill.color + '40', color: skill.color }">
          {{ skill.content }}
        </span>
      </div>

      <!-- Tech Category Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="(item, index) in t.tech_desc"
          :key="index"
          class="tech-card animate-on-scroll"
        >
          <div class="flex items-start gap-4">
            <div class="font-mono text-[10px] text-[var(--text-muted)] opacity-40 mt-1 select-none">
              {{ String(index + 1).padStart(2, '0') }}
            </div>
            <div class="min-w-0">
              <h3 class="font-mono text-sm font-medium text-[var(--text-primary)] mb-3 leading-relaxed break-all">
                {{ item.category }}
              </h3>
              <p class="text-[var(--text-secondary)] text-xs leading-relaxed">
                {{ item.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLocale } from '../composables/useLocale'
import { skillDiagramItems } from '../data/skills'

const { t } = useLocale()
const skills = skillDiagramItems
</script>
