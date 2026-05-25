<template>
  <section id="statement" class="section-divider py-20">
    <div class="max-w-4xl mx-auto px-6">
      <div class="text-center mb-10">
        <p class="font-mono text-xs text-[var(--text-muted)] tracking-widest uppercase mb-3">03 / REFERENCES</p>
        <h2 class="font-display text-3xl sm:text-4xl font-bold">
          {{ t.statement_ref }}
        </h2>
        <div class="w-12 h-[1px] bg-[var(--accent)] mx-auto opacity-40 mt-4"></div>
      </div>
      <ul class="flex justify-center">
        <li>
          <a href="http://www.facebook.com" class="font-mono text-sm text-[var(--accent)] hover:underline">
            http://www.facebook.com
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { useLocale } from '../composables/useLocale'

const { t } = useLocale()
</script>
