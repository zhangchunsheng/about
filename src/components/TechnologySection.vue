<template>
  <section id="technology" class="section">
    <div class="max-w-4xl mx-auto px-4">
      <!-- Info Banner -->
      <div class="info-badge mx-auto mb-8">
        {{ t.skill_info }}
      </div>

      <!-- Skill Diagram -->
      <SkillDiagram />

      <!-- Skill Descriptions -->
      <div class="skill-section-two mt-8 mb-6">
        <div v-for="(item, index) in t.tech_desc" :key="index" class="mb-6 text-center">
          <h3 class="text-[16px] tablet:text-[18px] font-light break-words text-[#333] mb-2">
            {{ item.category }}
          </h3>
          <p class="text-[13px] text-brand-teal shadow-white px-4">
            {{ item.desc }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLocale } from '../composables/useLocale'
import SkillDiagram from './SkillDiagram.vue'

const { t } = useLocale()
</script>
